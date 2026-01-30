import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./AllProducts.css";

// Product data
const productsData = [
  {
    id: 1,
    name: "Thanh Long Ruột Đỏ",
    location: "Bình Thuận • Hợp tác xã Hòa Thắng",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-vLpNdor8DKSgqHomkxImMx_43Ejmmj2yCoH1n1KNl6lkERwj36G_F-H7IPs6bXQ8RtSKfN6gap4ykTeFULKPX4NRXVEBn1xl6jjPw2aEz_773t_EL8OMOaJtHiLh5TobVERWsNOy-1Tu1r3FVKD17RHmTAYl1hQMpW5DfPm7O2Ki48hfDZsr86QAT2u83h8i4blctmTzU-Cr1kkBm6Gfxu9nF3mnFgdW1JpmU9jmSXPLec75d_f3kSDI95Qkfp6D_oBGuNo0Sk8",
    price: "15.000đ",
    expectedDate: "Dự kiến: 15/10/2024",
    progress: 75,
    note: "Còn lại 5 tấn cần cam kết",
    hasBadge: true
  },
  {
    id: 2,
    name: "Cà Phê Robusta Loại 1",
    location: "Đắk Lắk • Farm H'Hen Niê",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzif4gA-ZasvPEZoiebLuiSUOzoytEpH8cvgYC12oFWAJXKJByBVhhiNTq4_o3ETqb5fuFSk4HXu6fie7JIJ9_hCeO8tuv3EzHCBygBJI8Z8XpF-H_lOdKIly88NZbB4PqO03jSWLgiNWTK7fzZdGRfm66T3DmFIkqgGFMUV0Cr4Y7tt9--4VShE6TOZKtDxcGCxoak2Qh5I8tD0j5nyd32ZXKzjL4_DGewcOgTSfBhbMQFPPA21Md0RHwOiRGlbiOebQbHl5ml88",
    price: "45.000đ",
    expectedDate: "Dự kiến: 12/11/2024",
    progress: 30,
    note: "Cần tìm doanh nghiệp thu mua lớn",
    hasBadge: true
  },
  {
    id: 3,
    name: "Gạo ST25 (Lúa tôm)",
    location: "Sóc Trăng • HTX Lúa Vàng",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0_R2ivJTYXLX4efRiHwLnwAzALyVp8f1fjZLTJn2IbCwR4o7sckHqfKb-ABGrLFWmd69RsM2sjZCycGTQPdtw-e7sYKnSu8z3Eo-maNv3gz7i2teP9hbZHb0fnN8ItvmCwRjXqVuzgEKPImHlEmUFCCELUDpflBDtTiSKX6cOOMsPYFzMejamdWSG1y1oVPO1F3S9nyOWmudrT1UhprGiUaibEDsCoQBHei9C6EVedgFUkLnHt6WmSrhxk3zBH4jZcOyGy_jjOms",
    price: "28.000đ",
    expectedDate: "Dự kiến: 05/10/2024",
    progress: 92,
    note: "Chỉ còn 500kg cuối cùng",
    hasBadge: true
  },
  {
    id: 4,
    name: "Ớt Chuông Đà Lạt",
    location: "Lâm Đồng • Đà Lạt Fresh Farm",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw4a3bpVS_2wDA6frxx-4wt8GhpUSlImbZA8UflG-0wAs5xewLOWFHRXWxo-ulqKU3PvEFgYyZXVsvOqNLKc0oBzhbSX3iTOEb45lZASyj3yu_6f1zLtAxJ2zcsM6ntcNtbiMAtTlhSTNmgNZsT8rktZLzmZFpGnfc-jYkTYs0cs4d9S5s7945E61JLEIo24F0-MN2Gt1D9yhBZHHxoXPJjDbpXFuxBSWnjrc70Axnbnyq9mJE0VP5ngCX2uHSHTPeFPgo8X5d2j8",
    price: "32.000đ",
    expectedDate: "Dự kiến: Sẵn có",
    progress: 55,
    note: "Đang sản xuất ổn định",
    hasBadge: true
  },
  {
    id: 5,
    name: "Xoài Cát Hòa Lộc",
    location: "Tiền Giang • Vườn Ông Bảy",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhY3i5BijOfEGV2eX4NEWp3iZ-uFt3w1Hd5ILsX8MBpU6si1X8oBjLXgs_aAf58hptwtEr_M4pra3FomKSdD-yLslQL7EkoppDPhB5SaeumShVERhfgCJyGFIu9yyt_z63tmw4F6pluikp4i4BugJr1JLjF_y5ZDO-T6DT9Pd2h5Jde0iQ5GdGptRPSVgE5Xua1WUZPRnK5lvoD9_8X7p-5MplC_WJ0yYAopZO_VKtxxLnYKIhkJGedhu5ThrwQlN2ta8953qHTxE",
    price: "60.000đ",
    expectedDate: "Dự kiến: 20/12/2024",
    progress: 20,
    note: "Mới mở đăng ký bao tiêu",
    hasBadge: true
  },
  {
    id: 6,
    name: "Hạt Tiêu Chư Sê",
    location: "Gia Lai • Nông trường Chư Sê",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBk2dFImFF7ZSgrqv70x0zWvmTNcM8B0RU4iFyLaaDqPfMJS7ON8mpm5-JK_fKU47Ryv9MzDW72yA8ZZpM8kF86LhNE3W9Lq-4xB91u_CefCdJiufbMkWeLqvHAm3qOh3LTblsD2MOvAoLWu5j_NLWalFXjjfz-iZVrqzwxWPQesiqLwIBbjSf9ga9QrcAmqFXepP2eWF2EWm1icF4oLdZgqo_10L1k7NblpBRBeeT4vFq2yF93ZPV84q4K7bGx6EBUoMwGIVRmb-g",
    price: "85.000đ",
    expectedDate: "Dự kiến: 01/01/2025",
    progress: 62,
    note: "Chất lượng xuất khẩu Châu Âu",
    hasBadge: true
  }
];

const categories = [
  { id: "all", label: "Tất cả", active: true },
  { id: "fruit", label: "Trái cây", hasDropdown: true },
  { id: "coffee", label: "Cà phê", hasDropdown: true },
  { id: "rice", label: "Lúa gạo", hasDropdown: true },
  { id: "vegetable", label: "Rau củ", hasDropdown: true }
];

const regions = ["Bình Thuận", "Đắk Lắk", "Đà Lạt"];

export default function AllProducts() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState(66);

  return (
    <div className="all-products-page">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="ap-main">
        <div className="ap-container">
          {/* Breadcrumb */}
          <nav className="ap-breadcrumb">
            <span className="ap-breadcrumb-link" onClick={() => navigate("/")}>Trang chủ</span>
            <span className="ap-breadcrumb-sep">/</span>
            <span className="ap-breadcrumb-current">Sản phẩm nông sản</span>
          </nav>

          {/* Page Heading */}
          <div className="ap-heading">
            <div className="ap-heading-left">
              <h1>Danh sách Sản phẩm Nông sản</h1>
              <p>Hệ thống nông sản minh bạch với cam kết bao tiêu trực tiếp từ doanh nghiệp.</p>
            </div>
            <button className="ap-report-btn">
              <span className="ap-report-icon">📊</span>
              <span>Báo cáo thị trường</span>
            </button>
          </div>

          {/* Quick Filters / Chips */}
          <div className="ap-chips">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`ap-chip ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                {cat.hasDropdown && <span className="ap-chip-arrow">▼</span>}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="ap-content">
            {/* Sidebar */}
            <aside className="ap-sidebar">
              <div className="ap-sidebar-header">
                <h3>Bộ lọc tìm kiếm</h3>
                <p>TÙY CHỈNH DANH SÁCH</p>
              </div>

              {/* Category Filter */}
              <div className="ap-filter-section">
                <label className="ap-filter-label">Loại nông sản</label>
                <div className="ap-filter-item active">
                  <span className="ap-filter-icon">📦</span>
                  <span>Tất cả sản phẩm</span>
                </div>
                <div className="ap-filter-item">
                  <span className="ap-filter-icon">🌿</span>
                  <span>Nông sản sạch</span>
                </div>
              </div>

              {/* Region Filter */}
              <div className="ap-filter-section">
                <label className="ap-filter-label">Khu vực</label>
                {regions.map((region, index) => (
                  <div key={index} className="ap-filter-item">
                    <span className="ap-filter-icon">📍</span>
                    <span>{region}</span>
                  </div>
                ))}
              </div>

              {/* Status Filter */}
              <div className="ap-filter-section">
                <label className="ap-filter-label">Trạng thái bao tiêu</label>
                <div className="ap-filter-item">
                  <span className="ap-filter-icon">✓</span>
                  <span>Sắp đủ sản lượng</span>
                </div>
                <div className="ap-filter-item">
                  <span className="ap-filter-icon">⏳</span>
                  <span>Đang tìm doanh nghiệp</span>
                </div>
              </div>

              {/* Price Range */}
              <div className="ap-filter-section">
                <label className="ap-filter-label">Mức giá dự kiến (VNĐ/kg)</label>
                <div className="ap-price-slider">
                  <div className="ap-slider-track">
                    <div className="ap-slider-fill" style={{ width: `${priceRange}%` }}></div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="ap-slider-input"
                  />
                </div>
                <div className="ap-price-labels">
                  <span>0đ</span>
                  <span>500.000đ</span>
                </div>
              </div>

              <button className="ap-apply-btn">Áp dụng bộ lọc</button>
            </aside>

            {/* Product Grid */}
            <div className="ap-products-grid">
              {productsData.map((product) => (
                <div key={product.id} className="ap-product-card">
                  {product.hasBadge && (
                    <div className="ap-product-badge">
                      <span className="badge-icon">✓</span>
                      <span>Bao tiêu trước</span>
                    </div>
                  )}
                  <div className="ap-product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="ap-product-content">
                    <div className="ap-product-info">
                      <h3 className="ap-product-name">{product.name}</h3>
                      <div className="ap-product-location">
                        <span className="location-icon">📍</span>
                        <span>{product.location}</span>
                      </div>
                    </div>

                    <div className="ap-product-price-row">
                      <p className="ap-product-price">
                        {product.price}<span className="price-unit"> / kg</span>
                      </p>
                      <p className="ap-product-date">{product.expectedDate}</p>
                    </div>

                    <div className="ap-product-progress">
                      <div className="progress-header">
                        <span className="progress-label">Tiến độ bao tiêu</span>
                        <span className="progress-value">{product.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${product.progress}%` }}
                        ></div>
                      </div>
                      <p className="progress-note">{product.note}</p>
                    </div>

                    <div className="ap-product-actions">
                      <button className="btn-detail">Xem chi tiết</button>
                      <button className="btn-commit">Cam kết</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="ap-pagination">
            <button className="ap-page-btn nav">
              <span>‹</span>
            </button>
            <button 
              className={`ap-page-btn ${currentPage === 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            <button 
              className={`ap-page-btn ${currentPage === 2 ? "active" : ""}`}
              onClick={() => setCurrentPage(2)}
            >
              2
            </button>
            <button 
              className={`ap-page-btn ${currentPage === 3 ? "active" : ""}`}
              onClick={() => setCurrentPage(3)}
            >
              3
            </button>
            <button className="ap-page-btn nav">
              <span>›</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="ap-footer">
        <div className="ap-footer-container">
          <div className="ap-footer-top">
            <div className="ap-footer-brand">
              <div className="ap-footer-logo">
                <span className="footer-logo-icon">🌾</span>
                <h2>PreOnic</h2>
              </div>
              <p>Nền tảng kết nối trực tiếp Nông dân &amp; Doanh nghiệp. Đảm bảo đầu ra bền vững cho nông sản Việt Nam thông qua mô hình bao tiêu minh bạch.</p>
            </div>

            <div className="ap-footer-links">
              <div className="ap-footer-col">
                <h4>Dịch vụ</h4>
                <span onClick={() => navigate("/farmer")}>Dành cho Nông dân</span>
                <span onClick={() => navigate("/enterprise")}>Dành cho Doanh nghiệp</span>
                <span>Bản đồ Nông sản</span>
              </div>
              <div className="ap-footer-col">
                <h4>Công ty</h4>
                <span onClick={() => navigate("/solutions")}>Về chúng tôi</span>
                <span>Tin tức</span>
                <span onClick={() => navigate("/contact")}>Liên hệ</span>
              </div>
              <div className="ap-footer-col">
                <h4>Kết nối</h4>
                <div className="ap-social-icons">
                  <span className="social-icon">🌐</span>
                  <span className="social-icon">@</span>
                  <span className="social-icon">📞</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ap-footer-bottom">
            <p>© 2024 PreOnic Platform. Bảo lưu mọi quyền.</p>
            <div className="ap-footer-legal">
              <span>Điều khoản</span>
              <span>Bảo mật</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
