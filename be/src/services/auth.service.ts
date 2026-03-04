import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User, { IUser } from '../models/User.model';
import { AppError } from '../middlewares/error.middleware';
import {
  RegisterBody,
  LoginBody,
  AuthTokens,
  ForgotPasswordBody,
  ResetPasswordBody,
  UpdatePasswordBody,
  UpdateProfileBody,
} from '../types';
import {
  MAX_LOGIN_ATTEMPTS,
  LOCK_DURATION_MS,
  PASSWORD_MIN_LENGTH,
} from '../constants';
import { isTruthy, parseFullName } from '../utils/validation.util';

export class AuthService {
  /**
   * Generate access & refresh tokens for a user
   */
  static generateTokens(user: IUser): AuthTokens {
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    } as any);

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d' } as any
    );

    return { accessToken, refreshToken };
  }

  /**
   * REGISTER - Create new user
   * Maps to FE Register.jsx: formData { fullName, email, phone, password, confirmPassword }
   * and selectedRole ('farmer' | 'enterprise')
   */
  static async register(body: RegisterBody): Promise<{ user: IUser; tokens: AuthTokens }> {
    const { fullName, email, phone, password, confirmPassword, role, agreeTerms } = body;

    if (password !== confirmPassword) {
      throw new AppError('Mật khẩu xác nhận không khớp', 400);
    }

    if (!isTruthy(agreeTerms)) {
      throw new AppError('Vui lòng đồng ý với điều khoản sử dụng', 400);
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new AppError('Email đã được sử dụng', 400);
    }

    if (phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        throw new AppError('Số điện thoại đã được sử dụng', 400);
      }
    }

    const { firstName, lastName } = parseFullName(fullName);

    // Create user
    const user = await User.create({
      email: email.toLowerCase(),
      password,
      role,
      firstName,
      lastName,
      fullName: fullName.trim(),
      phone,
    });

    // Generate tokens
    const tokens = AuthService.generateTokens(user);

    // Save refresh token
    user.refreshToken = tokens.refreshToken;
    await user.save({ validateBeforeSave: false });

    // Remove sensitive data
    user.password = undefined as any;

    return { user, tokens };
  }

  /**
   * LOGIN - Authenticate user
   * Maps to FE Auth.jsx: formData { emailOrPhone, password, rememberMe }
   * emailOrPhone can be email or phone number
   */
  static async login(body: LoginBody): Promise<{ user: IUser; tokens: AuthTokens }> {
    const { emailOrPhone, password, rememberMe } = body;

    if (!emailOrPhone || !password) {
      throw new AppError('Vui lòng nhập email/số điện thoại và mật khẩu', 400);
    }

    const isEmail = emailOrPhone.includes('@');
    const query = isEmail
      ? { email: emailOrPhone.toLowerCase() }
      : { phone: emailOrPhone };

    const user = await User.findOne(query).select(
      '+password +refreshToken +loginAttempts +lockUntil'
    );

    if (!user) {
      throw new AppError('Email/Số điện thoại hoặc mật khẩu không đúng', 401);
    }

    if (!user.isActive) {
      throw new AppError('Tài khoản đã bị vô hiệu hóa. Liên hệ hỗ trợ.', 403);
    }

    if (user.isLocked()) {
      throw new AppError(
        'Tài khoản đã bị khóa tạm thời do đăng nhập sai nhiều lần. Vui lòng thử lại sau 15 phút.',
        423
      );
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      user.loginAttempts = (user.loginAttempts || 0) + 1;
      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lockUntil = new Date(Date.now() + LOCK_DURATION_MS);
      }
      await user.save({ validateBeforeSave: false });

      const remainingAttempts = MAX_LOGIN_ATTEMPTS - user.loginAttempts;
      if (remainingAttempts > 0) {
        throw new AppError(
          `Email/Số điện thoại hoặc mật khẩu không đúng. Còn ${remainingAttempts} lần thử.`,
          401
        );
      } else {
        throw new AppError(
          'Tài khoản đã bị khóa tạm thời do đăng nhập sai nhiều lần.',
          423
        );
      }
    }

    const tokens = AuthService.generateTokens(user);

    user.loginAttempts = 0;
    user.lockUntil = undefined;
    user.lastLogin = new Date();
    user.refreshToken = tokens.refreshToken;
    await user.save({ validateBeforeSave: false });

    // Remove sensitive data
    user.password = undefined as any;

    return { user, tokens };
  }

  /**
   * LOGOUT - Invalidate refresh token
   */
  static async logout(userId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, {
      refreshToken: undefined,
    });
  }

  /**
   * REFRESH TOKEN - Generate new access token from refresh token
   */
  static async refreshToken(token: string): Promise<AuthTokens> {
    if (!token) {
      throw new AppError('Refresh token is required', 400);
    }

    // Verify refresh token
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    } catch {
      throw new AppError('Invalid or expired refresh token', 401);
    }

    // Find user with matching refresh token
    const user = await User.findById(decoded.id).select('+refreshToken');
    if (!user || user.refreshToken !== token) {
      throw new AppError('Invalid refresh token', 401);
    }

    // Generate new tokens
    const tokens = AuthService.generateTokens(user);

    // Update refresh token
    user.refreshToken = tokens.refreshToken;
    await user.save({ validateBeforeSave: false });

    return tokens;
  }

  /**
   * FORGOT PASSWORD - Generate reset token and return it
   * In production: send via email. Here we return the token in response.
   */
  static async forgotPassword(
    body: ForgotPasswordBody
  ): Promise<{ resetToken: string; message: string }> {
    const { email } = body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new AppError('Không tìm thấy tài khoản với email này', 404);
    }

    if (!user.isActive) {
      throw new AppError('Tài khoản đã bị vô hiệu hóa', 403);
    }

    // Generate reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // In production, send email with reset link:
    // const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    // await sendEmail({ to: user.email, subject: 'Reset Password', html: ... });

    return {
      resetToken,
      message:
        'Token đặt lại mật khẩu đã được tạo. Token có hiệu lực trong 10 phút.',
    };
  }

  /**
   * RESET PASSWORD - Set new password using reset token
   */
  static async resetPassword(body: ResetPasswordBody): Promise<IUser> {
    const { token, password, confirmPassword } = body;

    if (password !== confirmPassword) {
      throw new AppError('Mật khẩu xác nhận không khớp', 400);
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      throw new AppError(`Mật khẩu phải có ít nhất ${PASSWORD_MIN_LENGTH} ký tự`, 400);
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    }).select('+passwordResetToken +passwordResetExpires');

    if (!user) {
      throw new AppError(
        'Token không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu đặt lại mật khẩu mới.',
        400
      );
    }

    // Update password and clear reset fields
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.loginAttempts = 0;
    user.lockUntil = undefined;

    await user.save();

    return user;
  }

  /**
   * UPDATE PASSWORD - Change password for authenticated user
   */
  static async updatePassword(
    userId: string,
    body: UpdatePasswordBody
  ): Promise<{ user: IUser; tokens: AuthTokens }> {
    const { currentPassword, newPassword, confirmNewPassword } = body;

    if (newPassword !== confirmNewPassword) {
      throw new AppError('Mật khẩu mới xác nhận không khớp', 400);
    }

    if (newPassword.length < PASSWORD_MIN_LENGTH) {
      throw new AppError(`Mật khẩu mới phải có ít nhất ${PASSWORD_MIN_LENGTH} ký tự`, 400);
    }

    if (currentPassword === newPassword) {
      throw new AppError('Mật khẩu mới không được trùng với mật khẩu hiện tại', 400);
    }

    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new AppError('Không tìm thấy người dùng', 404);
    }

    const isCorrect = await user.comparePassword(currentPassword);
    if (!isCorrect) {
      throw new AppError('Mật khẩu hiện tại không đúng', 401);
    }

    user.password = newPassword;
    await user.save();

    const tokens = AuthService.generateTokens(user);
    user.refreshToken = tokens.refreshToken;
    await user.save({ validateBeforeSave: false });

    user.password = undefined as any;

    return { user, tokens };
  }

  /**
   * GET ME - Get current user profile
   */
  static async getMe(userId: string): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('Không tìm thấy người dùng', 404);
    }
    return user;
  }

  /**
   * UPDATE PROFILE - Update user profile info (not password)
   */
  static async updateProfile(
    userId: string,
    body: UpdateProfileBody
  ): Promise<IUser> {
    const ALLOWED_PROFILE_FIELDS: (keyof UpdateProfileBody)[] = [
      'firstName', 'lastName', 'fullName', 'phone', 'avatar',
    ];

    const updateData: Partial<UpdateProfileBody> = {};
    for (const field of ALLOWED_PROFILE_FIELDS) {
      if (body[field] !== undefined) {
        (updateData as any)[field] = body[field];
      }
    }

    if (updateData.fullName) {
      const { firstName, lastName } = parseFullName(updateData.fullName);
      (updateData as any).firstName = firstName;
      (updateData as any).lastName = lastName;
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new AppError('Không tìm thấy người dùng', 404);
    }

    return user;
  }

  /**
   * DEACTIVATE ACCOUNT - Soft delete
   */
  static async deactivateAccount(userId: string): Promise<void> {
    const user = await User.findByIdAndUpdate(userId, {
      isActive: false,
      refreshToken: undefined,
    });

    if (!user) {
      throw new AppError('Không tìm thấy người dùng', 404);
    }
  }
}
