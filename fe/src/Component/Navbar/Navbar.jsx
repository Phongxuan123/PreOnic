import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";

const NavbarComponent = () => {
  const navigate = useNavigate();

  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const navLinkVariants = {
    hover: {
      y: -2,
      color: "#13ec37",
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div
      className="navbar-wrapper"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Navbar expand="lg" className="navbar-custom">
        <Container>
          <motion.div
            variants={logoVariants}
            whileHover="hover"
          >
            <Navbar.Brand 
              className="fw-bold navbar-logo" 
              onClick={() => navigate("/")} 
              style={{ cursor: "pointer" }}
            >
              PreOnic
            </Navbar.Brand>
          </motion.div>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mx-auto">
              {[
                { path: "/", label: "Trang chủ" },
                { path: "/products", label: "Sản phẩm" },
                { path: "/solutions", label: "Giải pháp" },
                { path: "/contact", label: "Liên hệ" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={navLinkVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Nav.Link onClick={() => navigate(item.path)}>
                    {item.label}
                  </Nav.Link>
                </motion.div>
              ))}
            </Nav>

            <div className="d-flex gap-2">
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button className="navbar-login-btn" onClick={() => navigate("/auth")}>
                  Đăng nhập
                </Button>
              </motion.div>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button className="navbar-register-btn" onClick={() => navigate("/register")}>
                  Đăng ký
                </Button>
              </motion.div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default NavbarComponent;

