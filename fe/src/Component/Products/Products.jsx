import { Container, Row, Col, Card, Button, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ROUTES } from "../../constants";
import "./Products.css";

const products = [
  {
    id: 1,
    name: "Thanh long ruột đỏ",
    location: "HTX Hòa Bình, Long An",
    progress: 75,
    harvest: "Tháng 10/2025",
    tag: "GLOBALGAP",
    image: "/PD1.jpg"
  },
  {
    id: 2,
    name: "Cam Vinh",
    location: "Xã Minh Hợp, Quỳ Hợp, Nghệ An",
    progress: 40,
    harvest: "Tháng 12/2025",
    tag: "VIETGAP",
    image: "/PD2.jpg"
  },
  {
    id: 3,
    name: "Bưởi da xanh",
    location: "Nhà vườn Sông Tiền, Bến Tre",
    progress: 92,
    harvest: "Tháng 09/2025",
    tag: "HỮU CƠ",
    image: "/PD3.jpg"
  }
];

function Products() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="products-section">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* HEADER */}
          <motion.div className="products-header" variants={headerVariants}>
            <div>
              <h2>Mùa vụ đang mở đăng ký</h2>
              <p>Cơ hội đầu tư và bao tiêu sản phẩm chất lượng cao</p>
            </div>
            <motion.span 
              className="view-all" 
              onClick={() => navigate(ROUTES.PRODUCTS)}
              whileHover={{ x: 5, color: "#13ec37" }}
              transition={{ duration: 0.2 }}
            >
              Xem tất cả →
            </motion.span>
          </motion.div>

          {/* PRODUCTS */}
          <Row>
            {products.map((product, index) => (
              <Col md={4} key={product.id} className="mb-4">
                <motion.div
                  variants={cardVariants}
                  whileHover={{ 
                    y: -12,
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="product-card">
                    {/* IMAGE */}
                    <motion.div 
                      className="product-img-wrapper"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card.Img
                        src={product.image}
                        alt={product.name}
                        className="product-img"
                      />
                      <motion.span 
                        className="product-badge"
                        initial={{ scale: 0, rotate: -10 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200,
                          delay: 0.3 + index * 0.1
                        }}
                      >
                        {product.tag}
                      </motion.span>
                    </motion.div>

                    {/* CONTENT */}
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>

                      <p className="product-location">
                        📍 {product.location}
                      </p>

                      {/* PROGRESS */}
                      <div className="progress-label">
                        <span>TIẾN ĐỘ BAO TIÊU</span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 }}
                        >
                          {product.progress}%
                        </motion.span>
                      </div>

                      <ProgressBar
                        now={product.progress}
                        className="custom-progress"
                      />

                      <small className="text-muted d-block mt-2">
                        Dự kiến thu hoạch: {product.harvest}
                      </small>

                      {/* BUTTON */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="w-100 mt-3 btn-register">
                          Đăng ký bao tiêu
                        </Button>
                      </motion.div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </section>
  );
}

export default Products;
