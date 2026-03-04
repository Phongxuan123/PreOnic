import { Request } from 'express';

// Extend Express Request to include user
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'farmer' | 'enterprise';
    fullName: string;
  };
}

// User roles
export enum UserRole {
  FARMER = 'farmer',
  ENTERPRISE = 'enterprise',
}

// ===== AUTH TYPES =====

// Register request body - matches FE Register.jsx form
export interface RegisterBody {
  fullName: string;        // From FE: formData.fullName
  email: string;           // From FE: formData.email
  phone: string;           // From FE: formData.phone
  password: string;        // From FE: formData.password
  confirmPassword: string; // From FE: formData.confirmPassword
  role: 'farmer' | 'enterprise'; // From FE: selectedRole
  agreeTerms: boolean | string;  // From FE: formData.agreeTerms (boolean or string "true"/"on")
}

// Login request body - matches FE Auth.jsx form
export interface LoginBody {
  emailOrPhone: string;    // From FE: formData.emailOrPhone (can be email or phone)
  password: string;        // From FE: formData.password
  rememberMe?: boolean;    // From FE: formData.rememberMe
}

// Forgot password request body
export interface ForgotPasswordBody {
  email: string;
}

// Reset password request body
export interface ResetPasswordBody {
  token: string;
  password: string;
  confirmPassword: string;
}

// Update password request body (authenticated user)
export interface UpdatePasswordBody {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

// Update profile request body
export interface UpdateProfileBody {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phone?: string;
  avatar?: string;
}

// Auth response with tokens
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// ===== GENERIC TYPES =====

// Response types
export interface ApiResponse<T = any> {
  success?: boolean;
  status: 'success' | 'error';
  message?: string;
  data?: T;
  error?: string;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  status: 'success';
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
