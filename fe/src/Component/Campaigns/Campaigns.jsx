import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Campaigns.css";

const campaigns = [
  {
    id: 1,
    name: "Thanh long ruột đỏ",
    location: "HTX Hòa Bình, Long An",
    image: "/images/products/thanh-long.jpg",
    progress: 75,
    harvest: "Dự kiến thu hoạch: Tháng 10/2025",
    tag: "GLOBALGAP"
  },
  {
    id: 2,
    name: "Cam Vinh",
    location: "Xã Minh Hợp, Quỳ Hợp, Nghệ An",
    image: "/images/products/xoai-cat.jpg",
    progress: 40,
    harvest: "Dự kiến thu hoạch: Tháng 12/2025",
    tag: "VIETGAP"
  },
  {
    id: 3,
    name: "Bưởi da xanh",
    location: "Nhà vườn Sông Tiền, Bến Tre",
    image: "/images/products/ot-chuong.jpg",
    progress: 92,
    harvest: "Dự kiến thu hoạch: Tháng 09/2025",
    tag: "HỮU CƠ"
  }
];

function Campaigns() {
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
    <section className="campaigns-section">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* HEADER */}
          <motion.div className="campaigns-header" variants={headerVariants}>
            <div className="header-left">
              <h2>Mùa vụ đang mở đăng ký</h2>
              <p>Cơ hội đầu tư và bao tiêu sản phẩm chất lượng cao</p>
            </div>
            <span className="view-all" onClick={() => navigate("/products")} style={{ cursor: "pointer" }}>Xem tất cả →</span>
          </motion.div>

          {/* CAMPAIGNS CARDS */}
          <Row>
            {campaigns.map((campaign, index) => (
              <Col md={4} key={campaign.id} className="mb-4">
                <motion.div
                  variants={cardVariants}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 20px 40px rgba(19, 236, 55, 0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="campaign-card">
                    <div className="campaign-image-wrapper">
                      <Card.Img variant="top" src={campaign.image} alt={campaign.name} />
                      <span className="campaign-tag">{campaign.tag}</span>
                    </div>
                    <Card.Body>
                      <Card.Title className="campaign-name">{campaign.name}</Card.Title>
                      <p className="campaign-location">📍 {campaign.location}</p>
                      
                      <div className="campaign-progress-section">
                        <div className="progress-header">
                          <span className="progress-label">TIẾN ĐỘ BAO TIÊU</span>
                          <span className="progress-percent">{campaign.progress}%</span>
                        </div>
                        <div className="progress-bar-custom">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${campaign.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <p className="campaign-harvest">{campaign.harvest}</p>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="campaign-btn">
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

export default Campaigns;
