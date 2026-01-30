import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EnterpriseDashboard.css";

export default function EnterpriseDashboard() {
  const [activeNav, setActiveNav] = useState("tongguan");
  const [viewMode, setViewMode] = useState("map"); // map or list
  const navigate = useNavigate();

  return (
    <div className="ed-layout">
      {/* SIDEBAR */}
      <aside className="ed-sidebar">
        <div className="ed-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <div className="logo-icon">🌱</div>
          <div className="logo-text">
            <h1>PreOnic</h1>
            <p>Cổng Doanh nghiệp</p>
          </div>
        </div>

        <nav className="ed-nav">
          <button 
            className={activeNav === "tongguan" ? "active" : ""}
            onClick={() => setActiveNav("tongguan")}
          >
            <span>Tổng quan</span>
          </button>
          <button 
            className={activeNav === "timkiem" ? "active" : ""}
            onClick={() => setActiveNav("timkiem")}
          >
            <span>Tìm kiếm nguồn hàng</span>
          </button>
          <button 
            className={activeNav === "danhba" ? "active" : ""}
            onClick={() => setActiveNav("danhba")}
          >
            <span>Danh bạ nhà cung cấp</span>
          </button>
          <button 
            className={activeNav === "hopdong" ? "active" : ""}
            onClick={() => setActiveNav("hopdong")}
          >
            <span>Hợp đồng</span>
          </button>
          <button 
            className={activeNav === "khobai" ? "active" : ""}
            onClick={() => setActiveNav("khobai")}
          >
            <span>Kho bãi</span>
          </button>
          <button 
            className={activeNav === "phantich" ? "active" : ""}
            onClick={() => setActiveNav("phantich")}
          >
            <span>Phân tích thị trường</span>
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="ed-main">
        {/* HEADER */}
        <header className="ed-header">
          <div className="header-search">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Tìm kiếm nông dân, nông sản, hoặc hợp đồng..."
            />
          </div>

          <div className="header-actions">
            <button className="notification-btn">
              🔔
              <span className="notification-badge"></span>
            </button>
            <div className="divider"></div>
            <div className="user-profile">
              <div className="user-info">
                <p className="user-name">Alex Sterling</p>
                <p className="user-role">Quản lý thu mua</p>
              </div>
              <div className="user-avatar">AS</div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="ed-content">
          {activeNav === "tongguan" && <TongQuanContent viewMode={viewMode} setViewMode={setViewMode} />}
          {activeNav === "hopdong" && <HopDongContent />}
        </div>
      </main>
    </div>
  );
}

// TỔNG QUAN CONTENT
function TongQuanContent({ viewMode, setViewMode }) {
  return (
    <>
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <span>Trang chủ</span>
        <span className="arrow">›</span>
        <span>Tóm tắt thu mua</span>
      </div>

      <h1 className="page-title">Tổng quan Doanh nghiệp</h1>

          {/* STATS */}
          <section className="ed-stats">
            <div className="stat-card">
              <p className="stat-label">Tổng sản lượng cam kết</p>
              <div className="stat-value-row">
                <h2 className="stat-value">14,500 Tấn</h2>
                <span className="stat-change positive">+12.5%</span>
              </div>
            </div>

            <div className="stat-card">
              <p className="stat-label">Hợp đồng đang hoạt động</p>
              <div className="stat-value-row">
                <h2 className="stat-value">124</h2>
                <span className="stat-change positive">+5%</span>
              </div>
            </div>

            <div className="stat-card">
              <p className="stat-label">Điểm ổn định nguồn cung</p>
              <div className="stat-value-row">
                <h2 className="stat-value">92%</h2>
                <span className="stat-change negative">-2.1%</span>
              </div>
            </div>

            <div className="stat-card">
              <p className="stat-label">Phê duyệt đang chờ</p>
              <div className="stat-value-row">
                <h2 className="stat-value">18</h2>
                <span className="stat-note">Đang xem xét</span>
              </div>
            </div>
          </section>

          {/* MAIN GRID */}
          <section className="main-grid">
            {/* FARMER NETWORK */}
            <div className="farmer-network">
              <div className="card-header">
                <h3>Mạng lưới nông dân</h3>
                <div className="view-toggle">
                  <button 
                    className={viewMode === "map" ? "active" : ""}
                    onClick={() => setViewMode("map")}
                  >
                    Bản đồ
                  </button>
                  <button 
                    className={viewMode === "list" ? "active" : ""}
                    onClick={() => setViewMode("list")}
                  >
                    Danh sách
                  </button>
                </div>
              </div>

              <div className="map-container">
                <img 
                  src="/farmerDasB.jpg" 
                  alt="Farmer Network Map" 
                  className="map-image"
                />
                <div className="map-badge">
                  <span className="pulse-dot"></span>
                  <span>1,240 Nông dân đã xác thực</span>
                </div>
              </div>
            </div>

            {/* APPROVAL SECTION */}
            <div className="approval-section">
              <div className="card-header">
                <h3>Phê duyệt hợp đồng</h3>
                <button className="view-all-btn">Tất cả</button>
              </div>

              <div className="approval-list">
                <div className="approval-card">
                  <div className="approval-info">
                    <div className="approval-details">
                      <p className="approval-name">Nông trại Green Valley</p>
                      <p className="approval-product">Ngô hữu cơ • 500 Tấn</p>
                    </div>
                    <span className="approval-badge pending">Chờ duyệt</span>
                  </div>
                  <div className="approval-actions">
                    <button className="approve-btn">Duyệt</button>
                    <button className="review-btn">Xem lại</button>
                  </div>
                </div>

                <div className="approval-card">
                  <div className="approval-info">
                    <div className="approval-details">
                      <p className="approval-name">Hợp tác xã Oasis Farms</p>
                      <p className="approval-product">Lúa mì đông • 1,200 Tấn</p>
                    </div>
                    <span className="approval-badge pending">Chờ duyệt</span>
                  </div>
                  <div className="approval-actions">
                    <button className="approve-btn">Duyệt</button>
                    <button className="review-btn">Xem lại</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BOTTOM GRID */}
          <section className="bottom-grid">
            {/* PRICE CHART */}
            <div className="price-chart-card">
              <div className="card-header">
                <h3>So sánh giá</h3>
                <span className="chart-period">12 tháng qua</span>
              </div>

              <div className="chart-container">
                <div className="chart-bars">
                  {[40, 60, 50, 75, 90, 85, 45, 65, 70, 55, 80, 88].map((value, index) => (
                    <div className="chart-bar-wrapper" key={index}>
                      <div 
                        className="chart-bar" 
                        style={{ height: `${value}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="chart-labels">
                <span>Tháng 1</span>
                <span>Tháng 3</span>
                <span>Tháng 5</span>
                <span>Tháng 7</span>
                <span>Tháng 9</span>
                <span>Tháng 11</span>
              </div>
            </div>

            {/* STABILITY CHART */}
            <div className="stability-card">
              <div className="card-header">
                <h3>Sự ổn định của chuỗi cung ứng</h3>
                <span className="status-icon">✓</span>
              </div>

              <div className="circular-progress">
                <svg className="progress-ring" viewBox="0 0 200 200">
                  <circle
                    className="progress-ring-bg"
                    cx="100"
                    cy="100"
                    r="85"
                  />
                  <circle
                    className="progress-ring-fill"
                    cx="100"
                    cy="100"
                    r="85"
                    style={{
                      strokeDasharray: '534',
                      strokeDashoffset: '42'
                    }}
                  />
                </svg>
                <div className="progress-value">
                  <span className="value">92%</span>
                  <span className="label">Tối ưu</span>
                </div>
              </div>

              <p className="stability-note">
                Chuỗi cung ứng của bạn đang hoạt động trên mức trung bình cho giai đoạn trước vụ mùa.
              </p>
            </div>
          </section>

          {/* FARMER TABLE */}
          <section className="farmer-table-section">
            <div className="table-header">
              <h3>Mạng lưới nông dân đã xác thực</h3>
              <button className="filter-btn">
                <span>⚙️</span>
                <span>Lọc nông sản</span>
              </button>
            </div>

            <div className="table-container">
              <table className="farmer-table">
                <thead>
                  <tr>
                    <th>Nông dân / Tên trang trại</th>
                    <th>Loại nông sản</th>
                    <th>Diện tích (Mẫu)</th>
                    <th>Trạng thái</th>
                    <th className="text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="farmer-cell">
                        <div className="farmer-avatar">TM</div>
                        <div className="farmer-info">
                          <p className="farmer-name">Thomas Miller</p>
                          <p className="farmer-location">Central Valley</p>
                        </div>
                      </div>
                    </td>
                    <td>Ngô vàng</td>
                    <td>450 Mẫu</td>
                    <td>
                      <span className="status-badge verified">
                        <span>✓</span> Đã xác thực
                      </span>
                    </td>
                    <td className="text-right">
                      <button className="profile-link">Hồ sơ nguồn hàng</button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="farmer-cell">
                        <div className="farmer-avatar">SJ</div>
                        <div className="farmer-info">
                          <p className="farmer-name">Sarah Jenkins</p>
                          <p className="farmer-location">North Ridge</p>
                        </div>
                      </div>
                    </td>
                    <td>Đậu nành</td>
                    <td>320 Mẫu</td>
                    <td>
                      <span className="status-badge verified">
                        <span>✓</span> Đã xác thực
                      </span>
                    </td>
                    <td className="text-right">
                      <button className="profile-link">Hồ sơ nguồn hàng</button>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="farmer-cell">
                        <div className="farmer-avatar">AB</div>
                        <div className="farmer-info">
                          <p className="farmer-name">Alex Brown</p>
                          <p className="farmer-location">South Plains</p>
                        </div>
                      </div>
                    </td>
                    <td>Cam</td>
                    <td>280 Mẫu</td>
                    <td>
                      <span className="status-badge verified">
                        <span>✓</span> Đã xác thực
                      </span>
                    </td>
                    <td className="text-right">
                      <button className="profile-link">Hồ sơ nguồn hàng</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </>
      );
}

// HỢP ĐỒNG CONTENT (DOANH NGHIỆP)
function HopDongContent() {
  const [signatureMode, setSignatureMode] = useState("draw");
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="contract-header">
        <h1>Quản lý Hợp đồng Thu mua</h1>
        <div className="header-actions">
          <button className="notification-btn">
            <span className="notification-badge"></span>
          </button>
          <div className="user-info">
            <span>Alex Sterling</span>
            <div className="user-avatar">AS</div>
          </div>
        </div>
      </header>

      {/* ALERT */}
      <div className="contract-alert">
        <div className="alert-content">
          <div className="alert-icon warning"></div>
          <div>
            <h4>Hợp đồng chờ xử lý</h4>
            <p>
              Bạn có 3 đề xuất hợp đồng từ <strong>Nông trại Green Valley</strong>,{" "}
              <strong>HTX Oasis Farms</strong> và <strong>Trang trại Sunshine</strong> đang chờ phê duyệt và ký điện tử.
            </p>
          </div>
        </div>
        <button className="alert-btn">Xem ngay</button>
      </div>

      {/* MAIN GRID */}
      <div className="contract-grid">
        {/* CONTRACT PREVIEW */}
        <div className="contract-preview">
          <div className="preview-header">
            <div className="preview-title">
              <span className="doc-icon"></span>
              <span>Hợp đồng #PRE-ENT-2024-1523</span>
            </div>
            <div className="preview-actions">
              <button title="Phóng to" className="btn-zoom-in"></button>
              <button title="Thu nhỏ" className="btn-zoom-out"></button>
              <button title="In" className="btn-print"></button>
            </div>
          </div>

          <div className="preview-body">
            <div className="contract-document">
              <div className="doc-header">
                <h3>HỢP ĐỒNG THU MUA NÔNG SẢN</h3>
                <p>Nền tảng PreOnic - Kết nối Doanh nghiệp & Nông dân</p>
              </div>

              <div className="doc-content">
                <section className="doc-section">
                  <h4>1. CÁC BÊN THAM GIA</h4>
                  <p>
                    Hợp đồng này được ký kết giữa <strong>Healthy Harvest Co. (Bên mua - Doanh nghiệp)</strong> và{" "}
                    <strong>Nông trại Green Valley (Bên bán - Nhà cung cấp)</strong> thông qua hệ thống PreOnic 
                    nhằm đảm bảo quyền lợi và trách nhiệm của hai bên trong giao dịch nông sản.
                  </p>
                </section>

                <section className="doc-section">
                  <h4>2. SẢN PHẨM & KHỐ LƯỢNG CAM KẾT</h4>
                  <p>
                    Bên bán cam kết cung cấp <mark>Ngô hữu cơ loại A - Chứng nhận USDA Organic</mark> 
                    với tổng khối lượng <mark>500 Tấn</mark> đạt tiêu chuẩn chất lượng theo Quy chuẩn 
                    PreOnic Quality Standards và đáp ứng yêu cầu xuất khẩu của Bên mua.
                  </p>
                </section>

                <section className="doc-section">
                  <h4>3. GIÁ TRỊ HỢP ĐỒNG & THANH TOÁN</h4>
                  <p>
                    Giá thu mua thỏa thuận: <mark>248.00 USD/Tấn</mark>. Tổng giá trị hợp đồng:{" "}
                    <mark>124,000.00 USD</mark>. Phương thức thanh toán: Chuyển khoản qua Hệ thống 
                    Ký quỹ PreOnic Escrow với lịch trình: 30% đặt cọc khi ký, 40% sau kiểm tra chất 
                    lượng, 30% còn lại sau giao hàng hoàn tất.
                  </p>
                </section>

                <section className="doc-section">
                  <h4>4. VẬN CHUYỂN & NGHIỆM THU</h4>
                  <p>
                    Thời gian giao hàng: Từ <mark>15/08/2024 đến 25/08/2024</mark>. Địa điểm nhận hàng: 
                    Kho trung tâm Healthy Harvest Co., địa chỉ được chỉ định qua hệ thống. Vận chuyển 
                    được điều phối bởi PreOnic Logistics. Nghiệm thu chất lượng thực hiện bởi đơn vị 
                    kiểm định độc lập được hai bên thống nhất.
                  </p>
                </section>

                <section className="doc-section">
                  <h4>5. ĐIỀU KHOẢN PHÁP LÝ</h4>
                  <p>
                    Hợp đồng điện tử này có giá trị pháp lý theo Luật Giao dịch Điện tử và được bảo vệ 
                    bởi Hệ thống Blockchain PreOnic. Mọi tranh chấp sẽ được giải quyết thông qua Trọng 
                    tài Thương mại. Hai bên cam kết thực hiện đúng các điều khoản đã ký kết.
                  </p>
                </section>

                <div className="doc-signatures">
                  <div className="signature-box seller-signed">Chữ ký Nhà cung cấp (Đã ký)</div>
                  <div className="signature-box buyer-pending">Chờ Doanh nghiệp phê duyệt & ký</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="contract-sidebar">
          {/* SIGNATURE PANEL */}
          <div className="signature-panel">
            <div className="panel-header">
              <h4>Xác thực & Ký điện tử</h4>
              <p>Phê duyệt và ký kết hợp đồng với nhà cung cấp</p>
            </div>

            <div className="panel-body">
              {/* MODE SELECTOR */}
              <div className="signature-modes">
                <button
                  className={signatureMode === "draw" ? "active" : ""}
                  onClick={() => setSignatureMode("draw")}
                >
                  <span className="mode-icon draw-icon"></span><span>Vẽ</span>
                </button>
                <button
                  className={signatureMode === "upload" ? "active" : ""}
                  onClick={() => setSignatureMode("upload")}
                >
                  <span className="mode-icon upload-icon"></span><span>Tải lên</span>
                </button>
                <button
                  className={signatureMode === "otp" ? "active" : ""}
                  onClick={() => setSignatureMode("otp")}
                >
                  <span className="mode-icon otp-icon"></span><span>OTP</span>
                </button>
              </div>

              {/* SIGNATURE CANVAS */}
              <div className="signature-canvas">
                <p className="canvas-hint">Ký xác nhận phê duyệt hợp đồng</p>
                <svg className="signature-svg" viewBox="0 0 400 300">
                  <path
                    d="M50,150 C70,140 120,130 150,150 S200,180 250,160 S300,120 350,140"
                    fill="none"
                    stroke="#111812"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
                <button className="clear-btn">Xóa</button>
              </div>

              {/* AGREEMENT CHECKBOX */}
              <div className="agreement-box">
                <label>
                  <input 
                    type="checkbox" 
                    checked={agreed} 
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <span>
                    Tôi, với tư cách đại diện Healthy Harvest Co., xác nhận đã xem xét kỹ lưỡng 
                    các điều khoản và đồng ý mua <strong>500 Tấn</strong> Ngô hữu cơ với giá{" "}
                    <strong>248.00 USD/Tấn</strong>. Công ty cam kết thực hiện thanh toán đúng 
                    lịch trình đã thỏa thuận.
                  </span>
                </label>
              </div>
            </div>

            <div className="panel-footer">
              <button className="sign-btn" disabled={!agreed}>
                ✓ Phê duyệt & Ký kết
              </button>
              <p className="security-note">Bảo mật SSL 256-bit & Blockchain verified</p>
            </div>
          </div>

          {/* SUPPORT PANEL */}
          <div className="support-panel">
            <h5>HỖ TRỢ PHÁP LÝ DOANH NGHIỆP</h5>
            <p>
              Cần tư vấn về điều khoản hợp đồng hoặc đánh giá rủi ro? Đội ngũ Tư vấn Pháp lý 
              PreOnic Business sẵn sàng hỗ trợ bạn với dịch vụ tư vấn chuyên nghiệp.
            </p>
            <button>Kết nối với Chuyên gia</button>
          </div>
        </div>
      </div>

      {/* ACTIVITY LOG */}
      <div className="activity-log">
        <div className="activity-header">
          <h4>Lịch sử giao dịch hợp đồng</h4>
          <span className="update-time">Cập nhật 5 phút trước</span>
        </div>

        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon success">✓</div>
            <div className="activity-details">
              <p className="activity-title">Đã ký kết: HTX Oasis Farms</p>
              <p className="activity-desc">
                Lúa mì đông - 1,200 Tấn @ $210.00/Tấn • <span className="status-active">Đang giao hàng</span>
              </p>
            </div>
            <span className="activity-time">Hôm qua, 2:45 CH</span>
          </div>

          <div className="activity-item">
            <div className="activity-icon pending"></div>
            <div className="activity-details">
              <p className="activity-title">Chờ duyệt: Trang trại Sunshine</p>
              <p className="activity-desc">Cam sành - 300 Tấn @ $180.00/Tấn</p>
            </div>
            <span className="activity-time">Hôm nay, 10:30 SA</span>
          </div>

          <div className="activity-item">
            <div className="activity-icon success">✓</div>
            <div className="activity-details">
              <p className="activity-title">Hoàn thành: Nông trại Golden Fields</p>
              <p className="activity-desc">
                Đậu nành - 800 Tấn @ $420.00/Tấn • <span className="status-completed">Đã thanh toán</span>
              </p>
            </div>
            <span className="activity-time">3 ngày trước</span>
          </div>
        </div>
      </div>
    </>
  );
}
