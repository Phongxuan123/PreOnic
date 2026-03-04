import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUTES, COMPANY } from "../../constants";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const linkVariants = {
    hover: {
      x: 5,
      color: "#13ec37",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.footer 
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <Container>
        <Row>
          <Col md={4}>
            <motion.div variants={itemVariants}>
              <motion.h5
                whileHover={{ scale: 1.02 }}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(ROUTES.HOME)}
              >
                <span className="footer-logo-icon"></span> PreOnic
              </motion.h5>
              <p>Nền tảng bao tiêu nông sản minh bạch.</p>
            </motion.div>
          </Col>

          <Col md={4}>
            <motion.div variants={itemVariants}>
              <h6>Liên kết</h6>
              <ul>
                {[
                  { label: "Trang chủ", path: ROUTES.HOME },
                  { label: "Giải pháp", path: ROUTES.SOLUTIONS }
                ].map((link, index) => (
                  <motion.li 
                    key={index}
                    variants={linkVariants}
                    whileHover="hover"
                    onClick={() => navigate(link.path)}
                    style={{ cursor: "pointer" }}
                  >
                    {link.label}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </Col>

          <Col md={4}>
            <motion.div variants={itemVariants}>
              <h6>Liên hệ</h6>
              <motion.p whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                Email: {COMPANY.SUPPORT_EMAIL}
              </motion.p>
              <motion.p whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                Hotline: {COMPANY.HOTLINE}
              </motion.p>
            </motion.div>
          </Col>
        </Row>

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          © {COMPANY.COPYRIGHT_YEAR} PreOnic. All rights reserved.
        </motion.div>
      </Container>
    </motion.footer>
  );
};

export default Footer;
