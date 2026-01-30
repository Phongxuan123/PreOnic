import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Navbar/Navbar';
import './Register.css';

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const containerVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
      delayChildren: 0.2
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

const cardVariants = {
  initial: { opacity: 1, scale: 1 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: { type: "spring", stiffness: 400, damping: 20 }
  },
  tap: { scale: 0.98 },
  selected: {
    opacity: 1,
    scale: 1,
    boxShadow: "0 0 0 3px #13ec37",
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
};

const formGroupVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(19, 236, 55, 0.3)"
  },
  tap: { scale: 0.98 }
};

const checkBadgeVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { type: "spring", stiffness: 500, damping: 20 }
  },
  exit: { 
    scale: 0, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const Register = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('farmer'); // 'farmer' or 'enterprise'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp');
      return;
    }

    if (!formData.agreeTerms) {
      alert('Vui lòng đồng ý với điều khoản sử dụng');
      return;
    }

    // Navigate based on selected role
    if (selectedRole === 'farmer') {
      navigate('/farmer');
    } else {
      navigate('/enterprise');
    }
  };

  return (
    <motion.div 
      className="register-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <Navbar />
      
      <main className="register-main">
        <motion.div 
          className="register-container"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Header */}
          <motion.div 
            className="register-header"
            variants={itemVariants}
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Đăng ký tài khoản PreOnic
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              Bắt đầu hành trình kết nối nông nghiệp bền vững cùng hàng ngàn đối tác.
            </motion.p>
          </motion.div>

          {/* Role Selection */}
          <motion.div 
            className="role-selection"
            variants={itemVariants}
          >
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Bạn muốn tham gia với vai trò nào?
            </motion.h3>
            <div className="role-cards">
              {/* Farmer Card */}
              <motion.div 
                className={`role-card ${selectedRole === 'farmer' ? 'selected' : ''}`}
                onClick={() => setSelectedRole('farmer')}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="role-card-bg farmer-bg">
                  <div className="role-card-content">
                    <div className="role-title">
                      <span className="role-icon">🌱</span>
                      <p>Tôi là Nông dân</p>
                    </div>
                    <p className="role-desc">Tìm kiếm thị trường và quản lý sản xuất hiệu quả.</p>
                  </div>
                </div>
                {selectedRole === 'farmer' && (
                  <div className="check-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                )}
              </motion.div>

              {/* Enterprise Card */}
              <motion.div 
                className={`role-card ${selectedRole === 'enterprise' ? 'selected' : ''}`}
                onClick={() => setSelectedRole('enterprise')}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="role-card-bg enterprise-bg">
                  <div className="role-card-content">
                    <div className="role-title">
                      <span className="role-icon">🏢</span>
                      <p>Tôi là Doanh nghiệp</p>
                    </div>
                    <p className="role-desc">Kết nối nguồn cung nông sản chất lượng và bền vững.</p>
                  </div>
                </div>
                {selectedRole === 'enterprise' && (
                  <div className="check-badge">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Registration Form */}
          <motion.form 
            className="register-form" 
            onSubmit={handleSubmit}
            variants={itemVariants}
          >
            <div className="form-fields">
              {/* Full Name */}
              <motion.div 
                className="form-group full-width"
                variants={formGroupVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.5 }}
              >
                <label>Họ và tên</label>
                <motion.input
                  type="text"
                  name="fullName"
                  placeholder="Nhập họ và tên của bạn"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.01, borderColor: "#13ec37" }}
                />
              </motion.div>

              {/* Email and Phone */}
              <div className="form-row">
                <motion.div 
                  className="form-group"
                  variants={formGroupVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.55 }}
                >
                  <label>Email</label>
                  <motion.input
                    type="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    whileFocus={{ scale: 1.01, borderColor: "#13ec37" }}
                  />
                </motion.div>
                <motion.div 
                  className="form-group"
                  variants={formGroupVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.6 }}
                >
                  <label>Số điện thoại</label>
                  <motion.input
                    type="tel"
                    name="phone"
                    placeholder="09xx xxx xxx"
                    value={formData.phone}
                    onChange={handleInputChange}
                    whileFocus={{ scale: 1.01, borderColor: "#13ec37" }}
                  />
                </motion.div>
              </div>

              {/* Password and Confirm Password */}
              <div className="form-row">
                <motion.div 
                  className="form-group"
                  variants={formGroupVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.65 }}
                >
                  <label>Mật khẩu</label>
                  <div className="password-input">
                    <motion.input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      whileFocus={{ scale: 1.01 }}
                    />
                    <motion.button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        {showPassword ? (
                          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                        ) : (
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        )}
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
                <motion.div 
                  className="form-group"
                  variants={formGroupVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.7 }}
                >
                  <label>Xác nhận mật khẩu</label>
                  <div className="password-input">
                    <motion.input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      whileFocus={{ scale: 1.01 }}
                    />
                    <motion.button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        {showConfirmPassword ? (
                          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                        ) : (
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        )}
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <motion.div 
              className="terms-checkbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
            >
              <input
                type="checkbox"
                id="terms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
              />
              <label htmlFor="terms">
                Tôi đồng ý với <motion.a href="#terms" whileHover={{ color: "#13ec37" }}>Điều khoản sử dụng</motion.a> và <motion.a href="#privacy" whileHover={{ color: "#13ec37" }}>Chính sách bảo mật</motion.a> của PreOnic.
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.button 
              type="submit" 
              className="btn-submit"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              Tạo tài khoản
            </motion.button>

            {/* Login Link */}
            <motion.p 
              className="login-link"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
            >
              Đã có tài khoản? 
              <motion.button 
                type="button" 
                onClick={() => navigate('/auth')}
                whileHover={{ color: "#13ec37", scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Đăng nhập ngay
              </motion.button>
            </motion.p>
          </motion.form>
        </motion.div>

        <motion.footer 
          className="register-footer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          © 2024 PreOnic. Nền tảng kết nối nông nghiệp bền vững.
        </motion.footer>
      </main>
    </motion.div>
  );
};

export default Register;
