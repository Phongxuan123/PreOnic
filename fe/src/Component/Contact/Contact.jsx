import { Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import "./Contact.css";

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } }
};

const heroVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.2 }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const cardVariants = {
  initial: { opacity: 0, x: -30 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const infoCardVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
  }
};

const infoItemVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  hover: { x: 5, transition: { duration: 0.2 } }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02, boxShadow: "0 10px 30px rgba(19, 236, 55, 0.3)" },
  tap: { scale: 0.98 }
};

const socialIconVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.15, y: -5, transition: { type: "spring", stiffness: 400 } }
};

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.");
    setFormData({ name: "", email: "", phone: "", company: "", message: "" });
  };

  return (
    <motion.div 
      className="contact-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="ct-hero">
        <Container>
          <motion.div 
            className="ct-hero-content"
            variants={heroVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h1 variants={itemVariants}>Liên hệ với chúng tôi</motion.h1>
            <motion.p variants={itemVariants}>
              Đội ngũ PreOnic luôn sẵn sàng hỗ trợ bạn. Hãy để lại thông tin, chúng tôi sẽ liên hệ ngay!
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* CONTENT */}
      <section className="ct-content">
        <Container>
          <Row>
            {/* FORM */}
            <Col lg={7} className="mb-4">
              <motion.div 
                className="contact-form-card"
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Gửi tin nhắn
                </motion.h2>
                <motion.p 
                  className="form-subtitle"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Điền thông tin bên dưới để chúng tôi có thể hỗ trợ bạn tốt nhất
                </motion.p>
                
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label>Họ và tên *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nguyễn Văn A"
                            required
                          />
                        </Form.Group>
                      </motion.div>
                    </Col>
                    <Col md={6}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label>Email *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="email@example.com"
                            required
                          />
                        </Form.Group>
                      </motion.div>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label>Số điện thoại *</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="0987654321"
                            required
                          />
                        </Form.Group>
                      </motion.div>
                    </Col>
                    <Col md={6}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Form.Group className="mb-3">
                          <Form.Label>Công ty / Tổ chức</Form.Label>
                          <Form.Control
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Tên công ty (nếu có)"
                          />
                        </Form.Group>
                      </motion.div>
                    </Col>
                  </Row>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                  >
                    <Form.Group className="mb-4">
                      <Form.Label>Nội dung tin nhắn *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Nhập nội dung bạn muốn trao đổi..."
                      required
                    />
                    </Form.Group>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.button 
                      type="submit" 
                      className="submit-btn"
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Gửi tin nhắn
                    </motion.button>
                  </motion.div>
                </Form>
              </motion.div>
            </Col>

            {/* INFO */}
            <Col lg={5}>
              <motion.div 
                className="contact-info-card"
                variants={infoCardVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Thông tin liên hệ
                </motion.h3>
                
                {[
                  { icon: "icon-location", title: "Địa chỉ", content: "Số 123, Đường ABC, Quận Cầu Giấy<br />Hà Nội, Việt Nam" },
                  { icon: "icon-phone", title: "Hotline", content: "1900 xxxx<br />024.xxxx.xxxx" },
                  { icon: "icon-email", title: "Email", content: "contact@preonic.vn<br />support@preonic.vn" },
                  { icon: "icon-clock", title: "Giờ làm việc", content: "Thứ 2 - Thứ 6: 8:00 - 17:30<br />Thứ 7: 8:00 - 12:00" }
                ].map((item, idx) => (
                  <motion.div 
                    className="info-item"
                    key={idx}
                    variants={infoItemVariants}
                    initial="initial"
                    whileInView="animate"
                    whileHover="hover"
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                  >
                    <motion.div 
                      className={`info-icon ${item.icon}`}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    ></motion.div>
                    <div>
                      <h4>{item.title}</h4>
                      <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="social-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.h4
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Kết nối với chúng tôi
                </motion.h4>
                <div className="social-icons">
                  {["facebook", "zalo", "linkedin", "youtube"].map((social, idx) => (
                    <motion.div 
                      className={`social-icon ${social}`}
                      key={social}
                      variants={socialIconVariants}
                      initial="initial"
                      whileHover="hover"
                      custom={idx}
                    ></motion.div>
                  ))}
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FOOTER */}
      <motion.footer 
        className="ct-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <Row>
            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h4>PreOnic</h4>
                <p>Nền tảng kết nối và bao tiêu nông sản hàng đầu Việt Nam</p>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4>Liên kết</h4>
                <ul>
                  <motion.li 
                    onClick={() => navigate("/")}
                    whileHover={{ x: 5, color: "#13ec37" }}
                  >
                    Trang chủ
                  </motion.li>
                  <motion.li 
                    onClick={() => navigate("/solutions")}
                    whileHover={{ x: 5, color: "#13ec37" }}
                  >
                    Giải pháp
                  </motion.li>
                  <motion.li 
                    onClick={() => navigate("/contact")}
                    whileHover={{ x: 5, color: "#13ec37" }}
                  >
                    Liên hệ
                  </motion.li>
                </ul>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h4>Liên hệ</h4>
                <ul>
                  <li>Email: contact@preonic.vn</li>
                  <li>Hotline: 1900 xxxx</li>
                  <li>Địa chỉ: Hà Nội, Việt Nam</li>
                </ul>
              </motion.div>
            </Col>
          </Row>
          <motion.div 
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p>&copy; 2026 PreOnic. All rights reserved.</p>
          </motion.div>
        </Container>
      </motion.footer>
    </motion.div>
  );
};

export default Contact;
