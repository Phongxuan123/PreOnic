import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Auth.css";

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const heroVariants = {
  initial: { x: -100, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const formSideVariants = {
  initial: { x: 100, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
  }
};

const formContainerVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    boxShadow: "0 8px 25px rgba(19, 236, 55, 0.3)"
  },
  tap: { scale: 0.98 }
};

const socialButtonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    y: -2,
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
  },
  tap: { scale: 0.95 }
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    name: "",
    phone: "",
    email: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert("Đăng nhập thành công!");
      navigate("/farmer");
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
      }
      alert("Đăng ký thành công!");
      navigate("/farmer");
    }
  };

  return (
    <motion.div 
      className="auth-page-v2"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="auth-container-split">
        {/* LEFT SIDE - HERO */}
        <motion.div 
          className="auth-hero"
          variants={heroVariants}
          initial="initial"
          animate="animate"
        >
          <div className="hero-overlay"></div>
          
          {/* Floating decorative elements */}
          <motion.div 
            className="auth-float-element auth-float-1"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div 
            className="auth-float-element auth-float-2"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "1s" }}
          />
          
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.div 
              className="hero-brand"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="brand-icon"></div>
              <h2>PreOnic</h2>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Chào mừng bạn trở lại với PreOnic
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              Nền tảng nông nghiệp hiện đại, kết nối công nghệ và tương lai xanh.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE - FORM */}
        <motion.div 
          className="auth-form-side"
          variants={formSideVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="auth-form-container"
            variants={formContainerVariants}
            initial="initial"
            animate="animate"
          >
            {/* Mobile Logo */}
            <motion.div 
              className="mobile-brand"
              variants={itemVariants}
            >
              <div className="brand-icon-mobile"></div>
              <h2>PreOnic</h2>
            </motion.div>

            {/* Header */}
            <motion.div 
              className="auth-form-header"
              variants={itemVariants}
            >
              <AnimatePresence mode="wait">
                <motion.h2
                  key={isLogin ? "login" : "register"}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {isLogin ? "Đăng nhập" : "Đăng ký tài khoản"}
                </motion.h2>
              </AnimatePresence>
              <p>{isLogin ? "Vui lòng nhập thông tin tài khoản của bạn" : "Tạo tài khoản mới để bắt đầu"}</p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="auth-form-main">
              <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.div
                    key="login-fields"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Login Fields */}
                    <motion.div 
                      className="form-group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label>Email hoặc Số điện thoại</label>
                      <motion.input
                        type="text"
                        name="emailOrPhone"
                        value={formData.emailOrPhone}
                        onChange={handleChange}
                        placeholder="Nhập email hoặc số điện thoại"
                        required
                        className="form-input"
                        whileFocus={{ scale: 1.01, borderColor: "#13ec37" }}
                      />
                    </motion.div>

                    <motion.div 
                      className="form-group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label>Mật khẩu</label>
                      <div className="password-input-wrapper">
                        <motion.input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Nhập mật khẩu"
                          required
                          className="form-input"
                          whileFocus={{ scale: 1.01 }}
                        />
                        <motion.button
                          type="button"
                          className="toggle-password"
                          onClick={() => setShowPassword(!showPassword)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <span className={`icon-eye ${showPassword ? "active" : ""}`}></span>
                        </motion.button>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="form-extras"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="remember-me">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                        />
                        <span>Ghi nhớ đăng nhập</span>
                      </label>
                      <motion.a 
                        href="#" 
                        className="forgot-password"
                        whileHover={{ color: "#13ec37", x: 3 }}
                      >
                        Quên mật khẩu?
                      </motion.a>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="register-fields"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Register Fields */}
                    <motion.div 
                      className="form-group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label>Họ và tên</label>
                      <div className="input-with-icon">
                        <span className="input-icon icon-person"></span>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Nguyễn Văn A"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div 
                      className="form-group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <label>Email</label>
                      <div className="input-with-icon">
                        <span className="input-icon icon-email"></span>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="email@example.com"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div 
                      className="form-group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label>Số điện thoại</label>
                      <div className="input-with-icon">
                        <span className="input-icon icon-phone"></span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="0987654321"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div 
                      className="form-group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <label>Mật khẩu</label>
                      <div className="input-with-icon">
                        <span className="input-icon icon-lock"></span>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Tối thiểu 8 ký tự"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div 
                      className="form-group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label>Xác nhận mật khẩu</label>
                      <div className="input-with-icon">
                        <span className="input-icon icon-lock"></span>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Nhập lại mật khẩu"
                          required
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button 
                type="submit" 
                className="btn-submit-main"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                {isLogin ? "Đăng nhập" : "Đăng ký ngay"}
              </motion.button>

              {/* Divider */}
              <motion.div 
                className="divider"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span>Hoặc đăng nhập với</span>
              </motion.div>

              {/* Social Login */}
              <motion.div 
                className="social-buttons"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button 
                  type="button" 
                  className="social-btn"
                  variants={socialButtonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23EA4335' d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'/%3E%3Cpath fill='%234285F4' d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'/%3E%3Cpath fill='%23FBBC05' d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'/%3E%3Cpath fill='%2334A853' d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'/%3E%3Cpath fill='none' d='M0 0h48v48H0z'/%3E%3C/svg%3E" alt="Google" />
                  <span>Google</span>
                </motion.button>
                <motion.button 
                  type="button" 
                  className="social-btn"
                  variants={socialButtonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <svg viewBox="0 0 24 24" className="facebook-svg">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </motion.button>
              </motion.div>
            </form>

            {/* Footer */}
            <motion.div 
              className="auth-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p>
                {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
                <motion.button 
                  type="button" 
                  onClick={() => isLogin ? navigate('/register') : setIsLogin(true)} 
                  className="toggle-mode"
                  whileHover={{ color: "#13ec37", scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
                </motion.button>
              </p>
            </motion.div>

            {/* Back to Home */}
            <motion.button 
              className="back-home" 
              onClick={() => navigate("/")}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ x: -5, color: "#13ec37" }}
            >
              ← Quay lại trang chủ
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Auth;
