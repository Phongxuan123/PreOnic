import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import { ROUTES } from "../../constants";
import "./Solutions.css";

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
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  },
  hover: {
    y: -10,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    transition: { type: "spring", stiffness: 400, damping: 20 }
  }
};

const featureVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 }
};

const ctaVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 10px 30px rgba(19, 236, 55, 0.3)" },
  tap: { scale: 0.95 }
};

const Solutions = () => {
  const navigate = useNavigate();

  const solutions = [
    {
      id: 1,
      title: "Giải pháp cho Nông dân",
      subtitle: "Cam kết bao tiêu, Giá cả minh bạch",
      features: [
        "Ký hợp đồng bao tiêu trước mùa vụ",
        "Giá cả cam kết công khai minh bạch",
        "Hỗ trợ kỹ thuật canh tác",
        "Thanh toán nhanh chóng, an toàn",
      ],
      icon: "farmer",
      color: "#13ec37",
    },
    {
      id: 2,
      title: "Giải pháp cho Doanh nghiệp",
      subtitle: "Nguồn cung ổn định, Chất lượng đảm bảo",
      features: [
        "Nguồn nông sản ổn định theo yêu cầu",
        "Truy xuất nguồn gốc 100%",
        "Quản lý hợp đồng số hóa",
        "Phân tích dữ liệu thị trường",
      ],
      icon: "enterprise",
      color: "#2563eb",
    },
    {
      id: 3,
      title: "Nền tảng Công nghệ",
      subtitle: "Số hóa toàn diện chuỗi cung ứng",
      features: [
        "Blockchain cho truy xuất nguồn gốc",
        "IoT giám sát chất lượng",
        "AI dự báo giá và sản lượng",
        "Dashboard quản lý thời gian thực",
      ],
      icon: "tech",
      color: "#8b5cf6",
    },
  ];

  return (
    <motion.div 
      className="solutions-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="sol-hero">
        <Container>
          <motion.div 
            className="sol-hero-content"
            variants={heroVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h1 variants={itemVariants}>Giải pháp toàn diện</motion.h1>
            <motion.h2 variants={itemVariants}>Kết nối Nông dân - Doanh nghiệp</motion.h2>
            <motion.p variants={itemVariants}>
              Nền tảng số hóa chuỗi cung ứng nông sản với công nghệ tiên tiến,
              mang lại lợi ích cho tất cả các bên tham gia.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* SOLUTIONS */}
      <section className="sol-content">
        <Container>
          <Row>
            {solutions.map((solution, index) => (
              <Col lg={4} md={6} key={solution.id} className="mb-4">
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  whileInView="animate"
                  whileHover="hover"
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Card className="solution-card">
                    <motion.div
                      className={`solution-icon icon-${solution.icon}`}
                      style={{ backgroundColor: solution.color + "20" }}
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div
                        className={`icon-svg icon-${solution.icon}-svg`}
                        style={{ filter: `drop-shadow(0 0 8px ${solution.color})` }}
                      ></div>
                    </motion.div>
                    <Card.Body>
                      <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {solution.title}
                      </motion.h3>
                      <motion.p 
                        className="subtitle"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {solution.subtitle}
                      </motion.p>
                      <ul className="feature-list">
                        {solution.features.map((feature, idx) => (
                          <motion.li 
                            key={idx}
                            variants={featureVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                          >
                            <span className="check-icon"></span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="sol-cta">
        <Container>
          <motion.div 
            className="cta-box"
            variants={ctaVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Sẵn sàng bắt đầu?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Tham gia cùng hàng nghìn nông dân và doanh nghiệp đã tin dùng PreOnic
            </motion.p>
            <motion.div 
              className="cta-buttons"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button 
                className="btn-primary" 
                onClick={() => navigate(ROUTES.CONTACT)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Liên hệ ngay
              </motion.button>
              <motion.button 
                className="btn-secondary" 
                onClick={() => navigate(ROUTES.CONTACT)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Liên hệ tư vấn
              </motion.button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* FOOTER */}
      <motion.footer 
        className="sol-footer"
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
                    onClick={() => navigate(ROUTES.HOME)}
                    whileHover={{ x: 5, color: "#13ec37" }}
                  >
                    Trang chủ
                  </motion.li>
                  <motion.li 
                    onClick={() => navigate(ROUTES.SOLUTIONS)}
                    whileHover={{ x: 5, color: "#13ec37" }}
                  >
                    Giải pháp
                  </motion.li>
                  <motion.li 
                    onClick={() => navigate(ROUTES.CONTACT)}
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

export default Solutions;
