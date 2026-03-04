import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import { useToast } from "../../contexts/ToastContext";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES, TOAST_DURATION, REGIONS } from "../../constants";
import { getProductById, getSimilarProducts, formatPrice, formatPriceRange } from "../../data/products";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { isLoggedIn } = useAuth();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [quantity, setQuantity] = useState(1000);
  const [showCommitModal, setShowCommitModal] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const p = getProductById(id);
    if (!p) { navigate(ROUTES.PRODUCTS); return; }
    setProduct(p);
    setSimilar(getSimilarProducts(p));
    window.scrollTo(0, 0);
  }, [id, navigate]);

  // Countdown timer (simulated: next harvest date)
  useEffect(() => {
    if (!product?.expectedDate || product.expectedDate === "Quanh năm") return;
    const parts = product.expectedDate.split("/");
    const target = new Date(parts[2], parts[1] - 1, parts[0]);
    const timer = setInterval(() => {
      const now = new Date();
      const diff = Math.max(0, target - now);
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [product]);

  if (!product) return null;

  const region = REGIONS[product.region.toUpperCase()] || REGIONS.SOUTH;
  const remainPercent = ((product.remaining / product.totalQuantity) * 100).toFixed(1);

  const handleCommit = () => {
    if (!isLoggedIn) {
      toast.warning("Vui lòng đăng nhập để cam kết mua hàng", TOAST_DURATION.DEFAULT);
      navigate(ROUTES.AUTH);
      return;
    }
    setShowCommitModal(true);
  };

  const confirmCommit = () => {
    toast.success(`Đã gửi yêu cầu cam kết ${quantity}kg ${product.name}! PreOnic sẽ liên hệ trong 24h.`, TOAST_DURATION.LONG);
    setShowCommitModal(false);
  };

  return (
    <motion.div className="product-detail-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Navbar />

      <div className="pd-container">
        {/* BREADCRUMB */}
        <div className="pd-breadcrumb">
          <span onClick={() => navigate(ROUTES.HOME)}>Trang chủ</span>
          <span className="sep">›</span>
          <span onClick={() => navigate(ROUTES.PRODUCTS)}>Sản phẩm</span>
          <span className="sep">›</span>
          <span className="current">{product.name}</span>
        </div>

        {/* MAIN CONTENT */}
        <div className="pd-main">
          {/* LEFT: IMAGE + INFO */}
          <div className="pd-left">
            <motion.div className="pd-image-wrap" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <img src={product.image} alt={product.name} />
              {product.badge && <span className="pd-badge">{product.badge}</span>}
              <span className="pd-region-tag" style={{ background: region.color }}>
                {region.icon} {region.label}
              </span>
            </motion.div>

            {/* DESCRIPTION */}
            <div className="pd-description">
              <h3>Mô tả sản phẩm</h3>
              <p>{product.description}</p>
              <h4>Thông tin dinh dưỡng</h4>
              <p>{product.nutritionInfo}</p>
              <h4>Chứng nhận</h4>
              <div className="pd-certs">
                {product.certifications.map((c, i) => (
                  <span key={i} className="cert-tag">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: PURCHASE PANEL */}
          <div className="pd-right">
            <motion.div className="pd-purchase" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <h1 className="pd-name">{product.name}</h1>
              <p className="pd-location">📍 {product.location} • {product.farm}</p>

              {/* RATING */}
              <div className="pd-rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map(s => (
                    <span key={s} className={s <= Math.round(product.rating) ? "star filled" : "star"}>★</span>
                  ))}
                </div>
                <span className="rating-num">{product.rating}</span>
                <span className="review-count">({product.reviewCount} đánh giá)</span>
              </div>

              {/* PRICE */}
              <div className="pd-price">
                <span className="price-range">{formatPriceRange(product.priceMin, product.priceMax)}</span>
                <span className="price-unit">/{product.unit}</span>
              </div>

              {/* PROGRESS BAR — Purchase overview */}
              <div className="pd-progress-section">
                <div className="progress-header">
                  <span>Đã cam kết</span>
                  <span>{(100 - parseFloat(remainPercent)).toFixed(1)}%</span>
                </div>
                <div className="pd-progress-bar">
                  <div className="pd-progress-fill" style={{ width: `${100 - parseFloat(remainPercent)}%` }} />
                </div>
                <div className="progress-stats">
                  <span>🟢 Còn lại: <strong>{product.remaining.toLocaleString()} {product.unit}</strong></span>
                  <span>Tổng: {product.totalQuantity.toLocaleString()} {product.unit}</span>
                </div>
              </div>

              {/* COUNTDOWN */}
              {product.expectedDate !== "Quanh năm" && (
                <div className="pd-countdown">
                  <p className="countdown-label">⏳ Thu hoạch dự kiến: {product.expectedDate}</p>
                  <div className="countdown-boxes">
                    <div className="cd-box"><span className="cd-num">{countdown.days}</span><span className="cd-label">Ngày</span></div>
                    <div className="cd-box"><span className="cd-num">{countdown.hours}</span><span className="cd-label">Giờ</span></div>
                    <div className="cd-box"><span className="cd-num">{countdown.mins}</span><span className="cd-label">Phút</span></div>
                    <div className="cd-box"><span className="cd-num">{countdown.secs}</span><span className="cd-label">Giây</span></div>
                  </div>
                </div>
              )}

              {/* QUANTITY */}
              <div className="pd-quantity">
                <label>Số lượng cam kết ({product.unit})</label>
                <div className="qty-input">
                  <button onClick={() => setQuantity(Math.max(100, quantity - 500))}>−</button>
                  <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(100, Number(e.target.value)))} />
                  <button onClick={() => setQuantity(Math.min(product.remaining, quantity + 500))}>+</button>
                </div>
                <p className="qty-estimate">
                  Giá ước tính: <strong>{formatPrice(quantity * product.priceMin)} – {formatPrice(quantity * product.priceMax)}</strong>
                </p>
              </div>

              {/* SELLER */}
              <div className="pd-seller">
                <div className="seller-avatar">{product.seller.avatar}</div>
                <div className="seller-info">
                  <p className="seller-name">{product.seller.name}</p>
                  <p className="seller-meta">⭐ {product.seller.rating} • {product.seller.totalContracts} hợp đồng</p>
                </div>
                <button className="btn-message" onClick={() => navigate(ROUTES.MESSAGING)}>💬 Nhắn tin</button>
              </div>

              {/* BUTTONS */}
              <button className="btn-commit" onClick={handleCommit}>🤝 Cam kết mua hàng</button>
              <button className="btn-commitment-info" onClick={() => setShowCommitModal(true)}>
                📋 Xem cam kết của nhà sản xuất
              </button>
            </motion.div>
          </div>
        </div>

        {/* COMMITMENTS SECTION */}
        <div className="pd-commitments">
          <h2>🛡️ Cam kết từ nhà sản xuất</h2>
          <div className="commitments-grid">
            {product.commitments.map((c, i) => (
              <motion.div key={i} className="commitment-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <span className="commit-icon">✅</span>
                <p>{c}</p>
              </motion.div>
            ))}
          </div>
          <div className="preonc-guarantee">
            <span className="guarantee-icon">🏛️</span>
            <div>
              <h4>Bảo đảm bởi PreOnic</h4>
              <p>Mọi giao dịch trên PreOnic đều được bảo vệ bởi hệ thống ký quỹ. Nếu nhà sản xuất vi phạm cam kết, bạn sẽ được hoàn tiền 100% qua PreOnic Escrow.</p>
            </div>
          </div>
        </div>

        {/* RATING SECTION */}
        <div className="pd-reviews">
          <h2>⭐ Đánh giá từ người mua ({product.reviewCount})</h2>
          <div className="rating-overview">
            <div className="rating-big">
              <span className="rating-number">{product.rating}</span>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map(s => (
                  <span key={s} className={s <= Math.round(product.rating) ? "star filled" : "star"}>★</span>
                ))}
              </div>
              <span className="total-reviews">{product.reviewCount} đánh giá</span>
            </div>
            <div className="rating-bars">
              {[
                { star: 5, percent: 72 },
                { star: 4, percent: 18 },
                { star: 3, percent: 6 },
                { star: 2, percent: 3 },
                { star: 1, percent: 1 },
              ].map(r => (
                <div key={r.star} className="rating-bar-row">
                  <span>{r.star}★</span>
                  <div className="rbar">
                    <div className="rbar-fill" style={{ width: `${r.percent}%` }} />
                  </div>
                  <span>{r.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample reviews */}
          <div className="reviews-list">
            {[
              { user: "Nguyễn Văn An", date: "20/01/2026", rating: 5, text: "Chất lượng rất tốt, đúng như cam kết. Giao hàng nhanh, đóng gói cẩn thận. Sẽ đặt tiếp!" },
              { user: "Trần Thị Bình", date: "15/01/2026", rating: 4, text: "Sản phẩm ngon nhưng giao hơi chậm 1 ngày. Nhìn chung vẫn hài lòng." },
              { user: "Lê Hoàng Cường", date: "10/01/2026", rating: 5, text: "Đã mua nhiều lần, lần nào chất lượng cũng ổn định. Nhà cung cấp uy tín." },
            ].map((review, i) => (
              <div key={i} className="review-card">
                <div className="review-header">
                  <div className="review-user">
                    <div className="review-avatar">{review.user.charAt(0)}</div>
                    <div>
                      <p className="review-name">{review.user}</p>
                      <p className="review-date">{review.date}</p>
                    </div>
                  </div>
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map(s => (
                      <span key={s} className={s <= review.rating ? "star filled" : "star"}>★</span>
                    ))}
                  </div>
                </div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SIMILAR PRODUCTS */}
        {similar.length > 0 && (
          <div className="pd-similar">
            <h2>🔄 Sản phẩm tương tự</h2>
            <div className="similar-grid">
              {similar.map(p => (
                <motion.div key={p.id} className="similar-card" whileHover={{ y: -5 }}
                  onClick={() => navigate(`/products/${p.id}`)}>
                  <img src={p.image} alt={p.name} />
                  <div className="similar-info">
                    <h4>{p.name}</h4>
                    <p className="sim-location">📍 {p.location}</p>
                    <p className="sim-price">{formatPriceRange(p.priceMin, p.priceMax)}/{p.unit}</p>
                    <div className="sim-rating">⭐ {p.rating} ({p.reviewCount})</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* COMMIT MODAL */}
      {showCommitModal && (
        <div className="modal-overlay" onClick={() => setShowCommitModal(false)}>
          <motion.div className="commit-modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()}>
            <h2>🤝 Xác nhận cam kết mua hàng</h2>
            <div className="modal-details">
              <div className="modal-row"><span>Sản phẩm:</span><strong>{product.name}</strong></div>
              <div className="modal-row"><span>Nhà cung cấp:</span><strong>{product.seller.name}</strong></div>
              <div className="modal-row"><span>Số lượng:</span><strong>{quantity.toLocaleString()} {product.unit}</strong></div>
              <div className="modal-row"><span>Giá ước tính:</span><strong>{formatPrice(quantity * product.priceMin)} – {formatPrice(quantity * product.priceMax)}</strong></div>
              <div className="modal-row"><span>Phí trung gian PreOnic:</span><strong>3% giá trị hợp đồng</strong></div>
            </div>
            <div className="modal-note">
              <p>⚠️ Sau khi xác nhận, PreOnic sẽ làm trung gian kết nối bạn với nhà sản xuất. Hợp đồng sẽ được tạo và gửi để hai bên phê duyệt.</p>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowCommitModal(false)}>Hủy</button>
              <button className="btn-confirm" onClick={confirmCommit}>✅ Xác nhận cam kết</button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductDetail;
