import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES, COMPANY, CONTRACT_STATUS } from "../../constants";
import { productsData, formatPriceRange } from "../../data/products";
import "./EnterpriseDashboard.css";

export default function EnterpriseDashboard() {
  const [activeNav, setActiveNav] = useState("tongguan");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { key: "tongguan", label: "Tổng quan", cls: "nav-overview" },
    { key: "hopdong", label: "Hợp đồng", cls: "nav-contract" },
    { key: "sanpham", label: "Danh sách sản phẩm", cls: "nav-product" },
    { key: "donhang", label: "Theo dõi đơn hàng", cls: "nav-order" },
    { key: "danhba", label: "Danh bạ nhà cung cấp", cls: "nav-contacts" },
    { key: "khobai", label: "Kho bãi", cls: "nav-warehouse" },
    { key: "phantich", label: "Phân tích thị trường", cls: "nav-analytics" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="ed-layout">
      {/* SIDEBAR */}
      <aside className="ed-sidebar">
        <div className="ed-logo" onClick={() => navigate(ROUTES.HOME)} style={{ cursor: "pointer" }}>
          <div className="logo-icon"><span className="logo-leaf" /></div>
          <div className="logo-text"><h1>PreOnic</h1><p>Cổng Doanh nghiệp</p></div>
        </div>

        <nav className="ed-nav">
          {navItems.map(item => (
            <button key={item.key} className={`${item.cls} ${activeNav === item.key ? "active" : ""}`} onClick={() => setActiveNav(item.key)}>
              <span className={`nav-icon ${item.cls}-icon`} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="ed-sidebar-footer">
          <button className="messaging-btn" onClick={() => navigate(ROUTES.MESSAGING)}>
            <span className="nav-icon msg-sidebar-icon" /> Nhắn tin
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon logout-sidebar-icon" /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="ed-main">
        <header className="ed-header">
          <div className="header-search">
            <span className="search-input-icon" />
            <input type="text" placeholder="Tìm kiếm nông dân, nông sản, hoặc hợp đồng..." />
          </div>
          <div className="header-actions">
            <button className="notification-btn"><span className="notif-dot"></span></button>
            <div className="divider"></div>
            <div className="user-profile">
              <div className="user-info">
                <p className="user-name">{user?.fullName || "Doanh nghiệp"}</p>
                <p className="user-role">Quản lý thu mua</p>
              </div>
              <div className="user-avatar">{(user?.fullName || "DN").slice(0, 2).toUpperCase()}</div>
            </div>
          </div>
        </header>

        <div className="ed-content">
          {activeNav === "tongguan" && <TongQuanContent />}
          {activeNav === "hopdong" && <HopDongContent />}
          {activeNav === "sanpham" && <SanPhamContent />}
          {activeNav === "donhang" && <DonHangContent />}
          {activeNav === "danhba" && <DanhBaContent />}
          {activeNav === "khobai" && <KhoBaiContent />}
          {activeNav === "phantich" && <PhanTichContent />}
        </div>
      </main>
    </div>
  );
}

/* =========================================
   TỔNG QUAN — Overview
   ========================================= */
function TongQuanContent() {
  const [viewMode, setViewMode] = useState("map");
  return (
    <>
      <div className="breadcrumb"><span>Trang chủ</span><span className="arrow">&gt;</span><span>Tóm tắt thu mua</span></div>
      <h1 className="page-title">Tổng quan Doanh nghiệp</h1>

      <section className="ed-stats">
        <div className="stat-card"><p className="stat-label">Tổng sản lượng cam kết</p><div className="stat-value-row"><h2 className="stat-value">14.500 Tấn</h2><span className="stat-change positive">+12,5%</span></div></div>
        <div className="stat-card"><p className="stat-label">Hợp đồng đang hoạt động</p><div className="stat-value-row"><h2 className="stat-value">124</h2><span className="stat-change positive">+5%</span></div></div>
        <div className="stat-card"><p className="stat-label">Điểm ổn định nguồn cung</p><div className="stat-value-row"><h2 className="stat-value">92%</h2><span className="stat-change negative">-2,1%</span></div></div>
        <div className="stat-card"><p className="stat-label">Tổng giá trị hợp đồng</p><div className="stat-value-row"><h2 className="stat-value">4,8 Tỷ VND</h2><span className="stat-change positive">+18%</span></div></div>
      </section>

      <section className="main-grid">
        <div className="farmer-network">
          <div className="card-header">
            <h3>Mạng lưới nông dân</h3>
            <div className="view-toggle">
              <button className={viewMode === "map" ? "active" : ""} onClick={() => setViewMode("map")}>Bản đồ</button>
              <button className={viewMode === "list" ? "active" : ""} onClick={() => setViewMode("list")}>Danh sách</button>
            </div>
          </div>
          <div className="map-container">
            <img src="/farmerDasB.jpg" alt="Farmer Network Map" className="map-image" />
            <div className="map-badge"><span className="pulse-dot"></span><span>1.240 Nông dân đã xác thực</span></div>
          </div>
        </div>

        <div className="approval-section">
          <div className="card-header"><h3>Trạng thái nhanh</h3></div>
          <div className="quick-stats-list">
            <div className="quick-stat"><span className="qs-icon qs-pending"></span><div><p className="qs-num">18</p><p className="qs-label">Chờ phê duyệt</p></div></div>
            <div className="quick-stat"><span className="qs-icon qs-active"></span><div><p className="qs-num">96</p><p className="qs-label">Đang thực hiện</p></div></div>
            <div className="quick-stat"><span className="qs-icon qs-shipping"></span><div><p className="qs-num">12</p><p className="qs-label">Đơn hàng sắp giao</p></div></div>
            <div className="quick-stat"><span className="qs-icon qs-urgent"></span><div><p className="qs-num">3</p><p className="qs-label">Cần xử lý gấp</p></div></div>
          </div>
        </div>
      </section>

      <section className="bottom-grid">
        <div className="price-chart-card">
          <div className="card-header"><h3>So sánh giá</h3><span className="chart-period">12 tháng qua</span></div>
          <div className="chart-container">
            <div className="chart-bars">
              {[40, 60, 50, 75, 90, 85, 45, 65, 70, 55, 80, 88].map((v, i) => (
                <div className="chart-bar-wrapper" key={i}><div className="chart-bar" style={{ height: `${v}%` }} /></div>
              ))}
            </div>
          </div>
          <div className="chart-labels"><span>T1</span><span>T3</span><span>T5</span><span>T7</span><span>T9</span><span>T11</span></div>
        </div>

        <div className="stability-card">
          <div className="card-header"><h3>Sự ổn định chuỗi cung ứng</h3><span className="check-mark-icon"></span></div>
          <div className="circular-progress">
            <svg className="progress-ring" viewBox="0 0 200 200">
              <circle className="progress-ring-bg" cx="100" cy="100" r="85" />
              <circle className="progress-ring-fill" cx="100" cy="100" r="85" style={{ strokeDasharray: '534', strokeDashoffset: '42' }} />
            </svg>
            <div className="progress-value"><span className="value">92%</span><span className="label">Tối ưu</span></div>
          </div>
          <p className="stability-note">Chuỗi cung ứng đang hoạt động trên mức trung bình cho giai đoạn trước vụ mùa.</p>
        </div>
      </section>

      <section className="farmer-table-section">
        <div className="table-header"><h3>Mạng lưới nông dân đã xác thực</h3><button className="filter-btn"><span className="filter-icon" /> Lọc</button></div>
        <div className="table-container">
          <table className="farmer-table">
            <thead><tr><th>Nông dân / Tên trang trại</th><th>Loại nông sản</th><th>Diện tích</th><th>Trạng thái</th><th className="text-right">Thao tác</th></tr></thead>
            <tbody>
              {[
                { avatar: "HT", name: "HTX Hoa Thắng", loc: "Bình Thuận", crop: "Thanh long", area: "120 ha" },
                { avatar: "HN", name: "Farm H'Hen Niê", loc: "Đắk Lắk", crop: "Cà phê Robusta", area: "80 ha" },
                { avatar: "LV", name: "HTX Lúa Vàng", loc: "Sóc Trăng", crop: "Gạo ST25", area: "200 ha" },
              ].map((f, i) => (
                <tr key={i}>
                  <td><div className="farmer-cell"><div className="farmer-avatar">{f.avatar}</div><div className="farmer-info"><p className="farmer-name">{f.name}</p><p className="farmer-location">{f.loc}</p></div></div></td>
                  <td>{f.crop}</td><td>{f.area}</td>
                  <td><span className="status-badge verified"><span className="check-inline" /> Đã xác thực</span></td>
                  <td className="text-right"><button className="profile-link">Xem hồ sơ</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

/* =========================================
   HỢP ĐỒNG — Contracts
   ========================================= */
function HopDongContent() {
  const [signatureMode, setSignatureMode] = useState("draw");
  const [agreed, setAgreed] = useState(false);
  const [activeContractTab, setActiveContractTab] = useState("pending");

  const contracts = [
    { id: "PRE-ENT-2024-1523", supplier: "Nông trại Green Valley", product: "Ngô hữu cơ", quantity: "500 Tấn", value: "620.000.000 VND", status: CONTRACT_STATUS.PENDING, date: "28/01/2026" },
    { id: "PRE-ENT-2024-1498", supplier: "HTX Oasis Farms", product: "Lúa mì đông", quantity: "1.200 Tấn", value: "1.260.000.000 VND", status: CONTRACT_STATUS.PENDING, date: "25/01/2026" },
    { id: "PRE-ENT-2024-1475", supplier: "Trang trại Sunshine", product: "Cam sành", quantity: "300 Tấn", value: "540.000.000 VND", status: CONTRACT_STATUS.PENDING, date: "22/01/2026" },
    { id: "PRE-ENT-2024-1320", supplier: "Farm H'Hen Niê", product: "Cà phê Robusta", quantity: "800 Tấn", value: "3.200.000.000 VND", status: CONTRACT_STATUS.ACTIVE, date: "10/01/2026" },
    { id: "PRE-ENT-2024-1210", supplier: "HTX Lúa Vàng", product: "Gạo ST25", quantity: "2.000 Tấn", value: "1.400.000.000 VND", status: CONTRACT_STATUS.COMPLETED, date: "01/12/2025" },
  ];

  const tabs = [
    { key: "pending", label: "Chờ phê duyệt", count: contracts.filter(c => c.status === CONTRACT_STATUS.PENDING).length },
    { key: "active", label: "Đang hoạt động", count: contracts.filter(c => c.status === CONTRACT_STATUS.ACTIVE).length },
    { key: "completed", label: "Hoàn thành", count: contracts.filter(c => c.status === CONTRACT_STATUS.COMPLETED).length },
    { key: "sign", label: "Ký hợp đồng mới", count: 0 },
  ];

  const filteredContracts = activeContractTab === "sign" ? [] : contracts.filter(c => {
    if (activeContractTab === "pending") return c.status === CONTRACT_STATUS.PENDING;
    if (activeContractTab === "active") return c.status === CONTRACT_STATUS.ACTIVE;
    if (activeContractTab === "completed") return c.status === CONTRACT_STATUS.COMPLETED;
    return true;
  });

  return (
    <>
      <div className="breadcrumb"><span>Trang chủ</span><span className="arrow">&gt;</span><span>Hợp đồng</span></div>

      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý Hợp đồng Thu mua</h1>
          <p className="page-subtitle">Tổng giá trị hợp đồng: <strong>7,02 Tỷ VND</strong> -- Phí dịch vụ {COMPANY.NAME}: <strong>{COMPANY.COMMISSION_RATE}%</strong></p>
        </div>
      </div>

      <div className="contract-tabs">
        {tabs.map(tab => (
          <button key={tab.key} className={`contract-tab ${activeContractTab === tab.key ? "active" : ""}`} onClick={() => setActiveContractTab(tab.key)}>
            {tab.label} {tab.count > 0 && <span className="tab-badge">{tab.count}</span>}
          </button>
        ))}
      </div>

      {activeContractTab !== "sign" && (
        <div className="contracts-list">
          {filteredContracts.map(contract => (
            <div key={contract.id} className="contract-card-item">
              <div className="contract-main">
                <div className="contract-left">
                  <h4>{contract.supplier}</h4>
                  <p className="contract-meta">{contract.product} / {contract.quantity} / Mã: {contract.id}</p>
                </div>
                <div className="contract-right">
                  <span className="contract-value">{contract.value}</span>
                  <span className={`status-badge ${contract.status}`}>
                    {contract.status === CONTRACT_STATUS.PENDING && "Chờ duyệt"}
                    {contract.status === CONTRACT_STATUS.ACTIVE && "Đang hoạt động"}
                    {contract.status === CONTRACT_STATUS.COMPLETED && "Hoàn thành"}
                  </span>
                </div>
              </div>
              <div className="contract-actions-row">
                <span className="contract-date">{contract.date}</span>
                {contract.status === CONTRACT_STATUS.PENDING && (
                  <>
                    <button className="approve-btn">Phê duyệt</button>
                    <button className="review-btn">Xem chi tiết</button>
                    <button className="reject-btn">Từ chối</button>
                  </>
                )}
                {contract.status === CONTRACT_STATUS.ACTIVE && <button className="review-btn">Xem tiến độ</button>}
                {contract.status === CONTRACT_STATUS.COMPLETED && <button className="review-btn">Xem báo cáo</button>}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeContractTab === "sign" && (
        <div className="contract-grid">
          <div className="contract-preview">
            <div className="preview-header">
              <div className="preview-title"><span className="doc-icon" /><span>Hợp đồng mới #PRE-ENT-2026-XXXX</span></div>
            </div>
            <div className="preview-body">
              <div className="contract-document">
                <div className="doc-header"><h3>HỢP ĐỒNG THU MUA NÔNG SẢN</h3><p>Nền tảng {COMPANY.NAME} - Kết nối Doanh nghiệp và Nông dân</p></div>
                <div className="doc-content">
                  <section className="doc-section"><h4>1. CÁC BÊN THAM GIA</h4><p>Bên mua (Doanh nghiệp) và Bên bán (Nhà cung cấp) thông qua hệ thống {COMPANY.NAME} nhằm đảm bảo quyền lợi và trách nhiệm hai bên.</p></section>
                  <section className="doc-section"><h4>2. SẢN PHẨM VÀ KHỐI LƯỢNG CAM KẾT</h4><p>Bên bán cam kết cung cấp nông sản đạt tiêu chuẩn chất lượng theo Quy chuẩn {COMPANY.NAME} Quality Standards.</p></section>
                  <section className="doc-section"><h4>3. GIÁ TRỊ VÀ THANH TOÁN</h4><p>Thanh toán qua Hệ thống Ký quỹ {COMPANY.NAME} Escrow. Phí dịch vụ trung gian: <mark>{COMPANY.COMMISSION_RATE}%</mark> giá trị hợp đồng.</p></section>
                  <section className="doc-section"><h4>4. ĐIỀU KHOẢN BẢO VỆ</h4><p>{COMPANY.NAME} đóng vai trò trung gian bảo đảm, bảo vệ quyền lợi cả hai bên từ đặt cọc đến hoàn tất giao hàng.</p></section>
                  <div className="doc-signatures">
                    <div className="signature-box seller-signed">Chữ ký Nhà cung cấp (Đã ký)</div>
                    <div className="signature-box buyer-pending">Chờ Doanh nghiệp phê duyệt và ký</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contract-sidebar">
            <div className="signature-panel">
              <div className="panel-header"><h4>Xác thực và Ký điện tử</h4><p>Phê duyệt và ký kết hợp đồng</p></div>
              <div className="panel-body">
                <div className="signature-modes">
                  {["draw", "upload", "otp"].map(mode => (
                    <button key={mode} className={signatureMode === mode ? "active" : ""} onClick={() => setSignatureMode(mode)}>
                      <span className={`mode-icon ${mode}-icon`}></span><span>{mode === "draw" ? "Vẽ" : mode === "upload" ? "Tải lên" : "OTP"}</span>
                    </button>
                  ))}
                </div>
                <div className="signature-canvas">
                  <p className="canvas-hint">Ký xác nhận phê duyệt hợp đồng</p>
                  <svg className="signature-svg" viewBox="0 0 400 300">
                    <path d="M50,150 C70,140 120,130 150,150 S200,180 250,160 S300,120 350,140" fill="none" stroke="#111812" strokeLinecap="round" strokeWidth="3" />
                  </svg>
                  <button className="clear-btn">Xóa</button>
                </div>
                <div className="agreement-box">
                  <label>
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                    <span>Tôi xác nhận đã đọc kỹ các điều khoản hợp đồng và đồng ý ký kết. Phí trung gian {COMPANY.NAME}: <strong>{COMPANY.COMMISSION_RATE}%</strong>.</span>
                  </label>
                </div>
              </div>
              <div className="panel-footer">
                <button className="sign-btn" disabled={!agreed}>Phê duyệt và Ký kết</button>
                <p className="security-note">Bảo mật SSL 256-bit và Blockchain verified</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="activity-log">
        <div className="activity-header"><h4>Lịch sử giao dịch</h4><span className="update-time">Cập nhật 5 phút trước</span></div>
        <div className="activity-list">
          {[
            { cls: "success", title: "Đã ký kết: HTX Oasis Farms", desc: "Lúa mì đông - 1.200 Tấn", time: "Hôm qua" },
            { cls: "pending", title: "Chờ duyệt: Trang trại Sunshine", desc: "Cam sành - 300 Tấn", time: "Hôm nay" },
            { cls: "success", title: "Hoàn thành: Golden Fields", desc: "Đậu nành - 800 Tấn", time: "3 ngày trước" },
          ].map((a, i) => (
            <div key={i} className="activity-item">
              <div className={`activity-icon ${a.cls}`}><span className={`ai-dot ${a.cls}`} /></div>
              <div className="activity-details"><p className="activity-title">{a.title}</p><p className="activity-desc">{a.desc}</p></div>
              <span className="activity-time">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* =========================================
   SẢN PHẨM — Product catalog
   ========================================= */
function SanPhamContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRegion, setFilterRegion] = useState("all");

  const filtered = productsData.filter(p => {
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRegion = filterRegion === "all" || p.region === filterRegion;
    return matchSearch && matchRegion;
  });

  return (
    <>
      <div className="breadcrumb"><span>Trang chủ</span><span className="arrow">&gt;</span><span>Danh sách sản phẩm</span></div>

      <div className="page-header">
        <div><h1 className="page-title">Danh Sách Sản Phẩm</h1><p className="page-subtitle">Duyệt và tìm kiếm nguồn nông sản chất lượng để thu mua</p></div>
      </div>

      <div className="filters-bar">
        <div className="search-box"><span className="search-input-icon" /><input type="text" placeholder="Tìm kiếm sản phẩm, vùng miền..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /></div>
        <select className="filter-select" value={filterRegion} onChange={e => setFilterRegion(e.target.value)}>
          <option value="all">Tất cả vùng</option>
          <option value="north">Miền Bắc</option>
          <option value="central">Miền Trung</option>
          <option value="south">Miền Nam</option>
        </select>
      </div>

      <div className="product-catalog-grid">
        {filtered.map(product => (
          <div key={product.id} className="product-catalog-card">
            <div className="pcc-img"><img src={product.image} alt={product.name} /><span className="pcc-badge">{product.badge}</span></div>
            <div className="pcc-body">
              <div className="pcc-location"><span className="loc-dot" /> {product.location} -- {product.farm}</div>
              <h3 className="pcc-name">{product.name}</h3>
              <div className="pcc-price">{formatPriceRange(product.priceMin, product.priceMax)}/{product.unit}</div>
              <div className="pcc-meta">
                <span className="pcc-rating">{product.rating} ({product.reviewCount})</span>
                <span className="pcc-stock">Còn {product.remaining.toLocaleString()} {product.unit}</span>
              </div>
              <div className="pcc-progress">
                <div className="pcc-progress-bar"><div className="pcc-progress-fill" style={{ width: `${product.progress}%` }}></div></div>
                <span>{product.progress}% đã cam kết</span>
              </div>
              <div className="pcc-actions">
                <button className="btn-outline">Xem chi tiết</button>
                <button className="btn-primary">Tạo hợp đồng</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================
   \u0110\u01a0N H\u00c0NG \u2014 Order tracking (Enhanced)
   ========================================= */
function DonHangContent() {
  const [orderTab, setOrderTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    { id: "PRE-ORD-2026-0102", supplier: "HTX Hoa Th\u1eafng", product: "Thanh Long Ru\u1ed9t \u0110\u1ecf", quantity: "5 t\u1ea5n", value: "90.000.000 VND", rawValue: 90000000, status: "shipping", eta: "05/02/2026", tracking: "VNP-123456", orderDate: "28/01/2026", origin: "B\u00ecnh Thu\u1eadn", destination: "TP. H\u1ed3 Ch\u00ed Minh", warehouse: "Kho Mi\u1ec1n Nam", notes: "Y\u00eau c\u1ea7u b\u1ea3o qu\u1ea3n l\u1ea1nh 2-8 \u0111\u1ed9 C" },
    { id: "PRE-ORD-2026-0098", supplier: "Farm H'Hen Ni\u00ea", product: "C\u00e0 Ph\u00ea Robusta", quantity: "10 t\u1ea5n", value: "450.000.000 VND", rawValue: 450000000, status: "confirmed", eta: "15/02/2026", tracking: "", orderDate: "25/01/2026", origin: "\u0110\u1eafk L\u1eafk", destination: "\u0110\u00e0 N\u1eb5ng", warehouse: "Kho Mi\u1ec1n Trung", notes: "\u0110\u00f3ng bao 60kg, ti\u00eau chu\u1ea9n xu\u1ea5t kh\u1ea9u" },
    { id: "PRE-ORD-2026-0085", supplier: "HTX L\u00faa V\u00e0ng", product: "G\u1ea1o ST25", quantity: "20 t\u1ea5n", value: "560.000.000 VND", rawValue: 560000000, status: "delivered", eta: "25/01/2026", tracking: "VNP-112233", orderDate: "10/01/2026", origin: "S\u00f3c Tr\u0103ng", destination: "TP. H\u1ed3 Ch\u00ed Minh", warehouse: "Kho Mi\u1ec1n Nam", notes: "G\u1ea1o m\u00f9a m\u1edbi 2026, \u0111\u00e3 ki\u1ec3m \u0111\u1ecbnh ch\u1ea5t l\u01b0\u1ee3ng" },
    { id: "PRE-ORD-2026-0072", supplier: "\u0110\u00e0 L\u1ea1t Fresh Farm", product: "\u1edat Chu\u00f4ng \u0110\u00e0 L\u1ea1t", quantity: "2 t\u1ea5n", value: "64.000.000 VND", rawValue: 64000000, status: "quality_check", eta: "28/01/2026", tracking: "VNP-998877", orderDate: "20/01/2026", origin: "L\u00e2m \u0110\u1ed3ng", destination: "H\u00e0 N\u1ed9i", warehouse: "Kho Mi\u1ec1n B\u1eafc", notes: "Ki\u1ec3m tra d\u01b0 l\u01b0\u1ee3ng thu\u1ed1c BVTV" },
    { id: "PRE-ORD-2026-0065", supplier: "N\u00f4ng Tr\u01b0\u1eddng Ch\u01b0 S\u00ea", product: "H\u1ea1t Ti\u00eau \u0110en", quantity: "3 t\u1ea5n", value: "255.000.000 VND", rawValue: 255000000, status: "processing", eta: "10/02/2026", tracking: "", orderDate: "26/01/2026", origin: "Gia Lai", destination: "TP. H\u1ed3 Ch\u00ed Minh", warehouse: "Kho Mi\u1ec1n Nam", notes: "Ti\u00eau s\u1ea1ch, s\u1ea5y kh\u00f4 t\u1ef1 nhi\u00ean" },
    { id: "PRE-ORD-2026-0058", supplier: "V\u01b0\u1eddn \u00d4ng B\u1ea3y", product: "Xo\u00e0i C\u00e1t H\u00f2a L\u1ed9c", quantity: "4 t\u1ea5n", value: "240.000.000 VND", rawValue: 240000000, status: "delivered", eta: "22/01/2026", tracking: "VNP-556677", orderDate: "08/01/2026", origin: "Ti\u1ec1n Giang", destination: "TP. H\u1ed3 Ch\u00ed Minh", warehouse: "Kho Mi\u1ec1n Nam", notes: "Xo\u00e0i lo\u1ea1i 1, \u0111\u00f3ng th\u00f9ng carton" },
  ];

  const statusLabels = {
    confirmed: { label: "\u0110\u00e3 x\u00e1c nh\u1eadn", cls: "confirmed" },
    processing: { label: "\u0110ang x\u1eed l\u00fd", cls: "processing" },
    shipping: { label: "\u0110ang v\u1eadn chuy\u1ec3n", cls: "shipping" },
    quality_check: { label: "Ki\u1ec3m tra ch\u1ea5t l\u01b0\u1ee3ng", cls: "quality" },
    delivered: { label: "\u0110\u00e3 giao h\u00e0ng", cls: "delivered" },
  };

  const orderTabs = [
    { key: "all", label: "T\u1ea5t c\u1ea3", count: orders.length },
    { key: "confirmed", label: "\u0110\u00e3 x\u00e1c nh\u1eadn", count: orders.filter(o => o.status === "confirmed").length },
    { key: "processing", label: "\u0110ang x\u1eed l\u00fd", count: orders.filter(o => o.status === "processing").length },
    { key: "shipping", label: "\u0110ang v\u1eadn chuy\u1ec3n", count: orders.filter(o => o.status === "shipping").length },
    { key: "quality_check", label: "Ki\u1ec3m tra CL", count: orders.filter(o => o.status === "quality_check").length },
    { key: "delivered", label: "\u0110\u00e3 giao", count: orders.filter(o => o.status === "delivered").length },
  ];

  const filtered = orderTab === "all" ? orders : orders.filter(o => o.status === orderTab);

  const totalValue = orders.reduce((sum, o) => sum + o.rawValue, 0);
  const shippingCount = orders.filter(o => o.status === "shipping").length;
  const deliveredCount = orders.filter(o => o.status === "delivered").length;
  const pendingCount = orders.filter(o => ["confirmed", "processing"].includes(o.status)).length;

  return (
    <>
      <div className="breadcrumb"><span>Trang ch\u1ee7</span><span className="arrow">&gt;</span><span>Theo d\u00f5i \u0111\u01a1n h\u00e0ng</span></div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Theo D\u00f5i \u0110\u01a1n H\u00e0ng</h1>
          <p className="page-subtitle">Qu\u1ea3n l\u00fd v\u00e0 gi\u00e1m s\u00e1t to\u00e0n b\u1ed9 \u0111\u01a1n h\u00e0ng thu mua n\u00f4ng s\u1ea3n</p>
        </div>
        <button className="primary-btn">+ T\u1ea1o \u0111\u01a1n h\u00e0ng m\u1edbi</button>
      </div>

      {/* Order Summary Stats */}
      <section className="order-summary-stats">
        <div className="order-stat-card">
          <div className="order-stat-icon total-icon"></div>
          <div className="order-stat-content">
            <span className="order-stat-label">T\u1ed5ng \u0111\u01a1n h\u00e0ng</span>
            <h3 className="order-stat-value">{orders.length}</h3>
          </div>
        </div>
        <div className="order-stat-card">
          <div className="order-stat-icon pending-icon"></div>
          <div className="order-stat-content">
            <span className="order-stat-label">Ch\u1edd x\u1eed l\u00fd</span>
            <h3 className="order-stat-value">{pendingCount}</h3>
          </div>
        </div>
        <div className="order-stat-card">
          <div className="order-stat-icon shipping-stat-icon"></div>
          <div className="order-stat-content">
            <span className="order-stat-label">\u0110ang v\u1eadn chuy\u1ec3n</span>
            <h3 className="order-stat-value">{shippingCount}</h3>
          </div>
        </div>
        <div className="order-stat-card">
          <div className="order-stat-icon delivered-icon"></div>
          <div className="order-stat-content">
            <span className="order-stat-label">\u0110\u00e3 giao h\u00e0ng</span>
            <h3 className="order-stat-value">{deliveredCount}</h3>
          </div>
        </div>
        <div className="order-stat-card wide">
          <div className="order-stat-icon value-icon"></div>
          <div className="order-stat-content">
            <span className="order-stat-label">T\u1ed5ng gi\u00e1 tr\u1ecb \u0111\u01a1n h\u00e0ng</span>
            <h3 className="order-stat-value">{totalValue.toLocaleString('vi-VN')} VND</h3>
          </div>
        </div>
      </section>

      {/* Order Tabs */}
      <div className="order-tabs">
        {orderTabs.map(t => (
          <button key={t.key} className={`order-tab ${orderTab === t.key ? "active" : ""}`} onClick={() => setOrderTab(t.key)}>
            {t.label} {t.count > 0 && <span className="tab-count">({t.count})</span>}
          </button>
        ))}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="order-detail-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="order-detail-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chi ti\u1ebft \u0111\u01a1n h\u00e0ng #{selectedOrder.id}</h3>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>x</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-section">
                  <h4>Th\u00f4ng tin \u0111\u01a1n h\u00e0ng</h4>
                  <div className="detail-row"><span className="detail-label">S\u1ea3n ph\u1ea9m:</span><span>{selectedOrder.product}</span></div>
                  <div className="detail-row"><span className="detail-label">Nh\u00e0 cung c\u1ea5p:</span><span>{selectedOrder.supplier}</span></div>
                  <div className="detail-row"><span className="detail-label">S\u1ed1 l\u01b0\u1ee3ng:</span><span>{selectedOrder.quantity}</span></div>
                  <div className="detail-row"><span className="detail-label">Gi\u00e1 tr\u1ecb:</span><span className="detail-value-highlight">{selectedOrder.value}</span></div>
                  <div className="detail-row"><span className="detail-label">Ng\u00e0y \u0111\u1eb7t:</span><span>{selectedOrder.orderDate}</span></div>
                </div>
                <div className="detail-section">
                  <h4>Th\u00f4ng tin v\u1eadn chuy\u1ec3n</h4>
                  <div className="detail-row"><span className="detail-label">Xu\u1ea5t ph\u00e1t:</span><span>{selectedOrder.origin}</span></div>
                  <div className="detail-row"><span className="detail-label">\u0110i\u1ec3m \u0111\u1ebfn:</span><span>{selectedOrder.destination}</span></div>
                  <div className="detail-row"><span className="detail-label">Kho nh\u1eadn:</span><span>{selectedOrder.warehouse}</span></div>
                  <div className="detail-row"><span className="detail-label">D\u1ef1 ki\u1ebfn giao:</span><span>{selectedOrder.eta}</span></div>
                  {selectedOrder.tracking && <div className="detail-row"><span className="detail-label">M\u00e3 v\u1eadn \u0111\u01a1n:</span><span className="tracking-code">{selectedOrder.tracking}</span></div>}
                </div>
              </div>
              {selectedOrder.notes && (
                <div className="detail-notes">
                  <h4>Ghi ch\u00fa</h4>
                  <p>{selectedOrder.notes}</p>
                </div>
              )}
              <div className="detail-progress">
                <h4>Ti\u1ebfn tr\u00ecnh \u0111\u01a1n h\u00e0ng</h4>
                <div className="detail-steps">
                  {[
                    { label: "X\u00e1c nh\u1eadn \u0111\u01a1n", desc: "\u0110\u01a1n h\u00e0ng \u0111\u00e3 \u0111\u01b0\u1ee3c x\u00e1c nh\u1eadn" },
                    { label: "\u0110ang x\u1eed l\u00fd", desc: "Nh\u00e0 cung c\u1ea5p \u0111ang chu\u1ea9n b\u1ecb h\u00e0ng" },
                    { label: "V\u1eadn chuy\u1ec3n", desc: "H\u00e0ng \u0111ang tr\u00ean \u0111\u01b0\u1eddng v\u1eadn chuy\u1ec3n" },
                    { label: "Ki\u1ec3m tra CL", desc: "Ki\u1ec3m tra ch\u1ea5t l\u01b0\u1ee3ng t\u1ea1i kho" },
                    { label: "Ho\u00e0n th\u00e0nh", desc: "\u0110\u00e3 giao h\u00e0ng th\u00e0nh c\u00f4ng" },
                  ].map((step, i) => {
                    const stepMap = { confirmed: 1, processing: 2, shipping: 3, quality_check: 4, delivered: 5 };
                    const currentStep = stepMap[selectedOrder.status] || 0;
                    return (
                      <div key={i} className={`detail-step ${i < currentStep ? "done" : ""} ${i === currentStep - 1 ? "current" : ""}`}>
                        <div className="detail-step-marker">{i < currentStep ? <span className="check-inline" /> : i + 1}</div>
                        <div className="detail-step-info"><span className="detail-step-label">{step.label}</span><span className="detail-step-desc">{step.desc}</span></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {selectedOrder.status === "shipping" && <button className="btn-primary">X\u00e1c nh\u1eadn \u0111\u00e3 nh\u1eadn h\u00e0ng</button>}
              {selectedOrder.status === "quality_check" && <button className="btn-primary">Duy\u1ec7t ch\u1ea5t l\u01b0\u1ee3ng</button>}
              {selectedOrder.status === "delivered" && <button className="btn-primary">Xu\u1ea5t b\u00e1o c\u00e1o</button>}
              <button className="btn-outline" onClick={() => setSelectedOrder(null)}>\u0110\u00f3ng</button>
            </div>
          </div>
        </div>
      )}

      {/* Orders List */}
      <div className="orders-timeline">
        {filtered.length === 0 && (
          <div className="empty-orders">
            <div className="empty-icon"></div>
            <h3>Kh\u00f4ng c\u00f3 \u0111\u01a1n h\u00e0ng n\u00e0o</h3>
            <p>Ch\u01b0a c\u00f3 \u0111\u01a1n h\u00e0ng n\u00e0o trong m\u1ee5c n\u00e0y</p>
          </div>
        )}
        {filtered.map(order => {
          const st = statusLabels[order.status];
          return (
            <div key={order.id} className="order-timeline-card">
              <div className="otc-header">
                <div className="otc-header-left">
                  <h4>{order.product}</h4>
                  <span className="otc-supplier">{order.supplier}</span>
                </div>
                <span className={`status-badge ${st.cls}`}>{st.label}</span>
              </div>
              <div className="otc-details">
                <div className="otc-detail"><span className="otc-label">M\u00e3 \u0111\u01a1n</span><span className="otc-code">{order.id}</span></div>
                <div className="otc-detail"><span className="otc-label">S\u1ed1 l\u01b0\u1ee3ng</span><span>{order.quantity}</span></div>
                <div className="otc-detail"><span className="otc-label">Gi\u00e1 tr\u1ecb</span><span className="otc-value">{order.value}</span></div>
                <div className="otc-detail"><span className="otc-label">D\u1ef1 ki\u1ebfn</span><span>{order.eta}</span></div>
                {order.tracking && <div className="otc-detail"><span className="otc-label">V\u1eadn \u0111\u01a1n</span><span className="tracking-code">{order.tracking}</span></div>}
              </div>

              <div className="otc-route">
                <div className="route-point"><span className="route-dot origin"></span><span>{order.origin}</span></div>
                <div className="route-line"></div>
                <div className="route-point"><span className="route-dot dest"></span><span>{order.destination}</span></div>
              </div>

              <div className="otc-steps">
                {["X\u00e1c nh\u1eadn", "X\u1eed l\u00fd", "V\u1eadn chuy\u1ec3n", "Ki\u1ec3m tra CL", "Ho\u00e0n th\u00e0nh"].map((step, i) => {
                  const stepMap = { confirmed: 1, processing: 2, shipping: 3, quality_check: 4, delivered: 5 };
                  const currentStep = stepMap[order.status] || 0;
                  return (
                    <div key={i} className={`otc-step ${i < currentStep ? "done" : ""} ${i === currentStep - 1 ? "current" : ""}`}>
                      <div className="step-dot">{i < currentStep ? <span className="check-inline" /> : i + 1}</div>
                      <span>{step}</span>
                    </div>
                  );
                })}
              </div>

              <div className="otc-footer">
                <span className="otc-date">Ng\u00e0y \u0111\u1eb7t: {order.orderDate}</span>
                <div className="otc-actions">
                  <button className="btn-detail" onClick={() => setSelectedOrder(order)}>Xem chi ti\u1ebft</button>
                  {order.status === "shipping" && <button className="btn-track">Theo d\u00f5i</button>}
                  {order.status === "delivered" && <button className="btn-report">B\u00e1o c\u00e1o</button>}
                  {order.status === "quality_check" && <button className="btn-check">Ki\u1ec3m tra</button>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* =========================================
   DANH BẠ — Supplier contacts
   ========================================= */
function DanhBaContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const suppliers = [
    { id: 1, name: "HTX Nông Nghiệp Hoa Thắng", category: "Trái cây", location: "Bình Thuận", rating: 4.8, products: ["Thanh long", "Xoài", "Dưa"], totalContracts: 45, completionRate: 98, avatar: "HT", verified: true, phone: "0901234567", email: "hoathang@htx.vn" },
    { id: 2, name: "Farm H'Hen Niê", category: "Cà phê", location: "Đắk Lắk", rating: 4.9, products: ["Cà phê Robusta", "Cà phê Arabica"], totalContracts: 62, completionRate: 99, avatar: "HN", verified: true, phone: "0912345678", email: "hhen@farm.vn" },
    { id: 3, name: "HTX Lúa Vàng", category: "Lúa gạo", location: "Sóc Trăng", rating: 4.7, products: ["Gạo ST25", "Gạo Jasmine"], totalContracts: 38, completionRate: 96, avatar: "LV", verified: true, phone: "0923456789", email: "luavang@htx.vn" },
    { id: 4, name: "Đà Lạt Fresh Farm", category: "Rau củ", location: "Lâm Đồng", rating: 4.6, products: ["Ớt chuông", "Cà chua", "Xà lách"], totalContracts: 28, completionRate: 94, avatar: "DF", verified: true, phone: "0934567890", email: "dalat@fresh.vn" },
    { id: 5, name: "Vườn Ông Bảy", category: "Trái cây", location: "Tiền Giang", rating: 4.5, products: ["Xoài Cát Hòa Lộc"], totalContracts: 22, completionRate: 92, avatar: "VB", verified: false, phone: "0945678901", email: "ongbay@vuon.vn" },
    { id: 6, name: "Nông Trường Chư Sê", category: "Gia vị", location: "Gia Lai", rating: 4.8, products: ["Hạt tiêu", "Điều"], totalContracts: 31, completionRate: 97, avatar: "CS", verified: true, phone: "0956789012", email: "chuse@nongtruong.vn" },
  ];

  const filtered = suppliers.filter(s =>
    !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="breadcrumb"><span>Trang chủ</span><span className="arrow">&gt;</span><span>Danh bạ nhà cung cấp</span></div>

      <div className="page-header">
        <div>
          <h1 className="page-title">Danh bạ Nhà cung cấp</h1>
          <p className="page-subtitle">Quản lý và kết nối với {suppliers.length} nhà cung cấp uy tín</p>
        </div>
        <button className="primary-btn">+ Thêm nhà cung cấp</button>
      </div>

      <div className="filters-bar">
        <div className="search-box"><span className="search-input-icon" /><input type="text" placeholder="Tìm kiếm theo tên, địa điểm..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /></div>
      </div>

      <div className="suppliers-grid">
        {filtered.map(supplier => (
          <div key={supplier.id} className="supplier-card">
            <div className="supplier-header">
              <div className="supplier-avatar">{supplier.avatar}</div>
              <div className="supplier-info">
                <div className="supplier-name-row">
                  <h3>{supplier.name}</h3>
                  {supplier.verified && <span className="verified-badge"><span className="check-inline" /></span>}
                </div>
                <p className="supplier-location"><span className="loc-dot" /> {supplier.location} -- {supplier.category}</p>
              </div>
            </div>

            <div className="supplier-stats">
              <div className="stat-item"><span className="stat-label">Đánh giá</span><span className="stat-value">{supplier.rating}</span></div>
              <div className="stat-item"><span className="stat-label">Hợp đồng</span><span className="stat-value">{supplier.totalContracts}</span></div>
              <div className="stat-item"><span className="stat-label">Hoàn thành</span><span className="stat-value">{supplier.completionRate}%</span></div>
            </div>

            <div className="supplier-products">
              <div className="products-tags">
                {supplier.products.map((product, idx) => <span key={idx} className="product-tag">{product}</span>)}
              </div>
            </div>

            <div className="supplier-contact"><p>{supplier.phone}</p><p>{supplier.email}</p></div>

            <div className="supplier-actions">
              <button className="btn-message" onClick={() => navigate(ROUTES.MESSAGING)}>Nhắn tin</button>
              <button className="btn-outline">Xem chi tiết</button>
              <button className="btn-primary">Tạo hợp đồng</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================
   KHO BÃI — Warehouse management
   ========================================= */
function KhoBaiContent() {
  const [selectedWarehouse, setSelectedWarehouse] = useState("all");

  const warehouses = [
    { id: 1, name: "Kho Miền Nam", location: "TP. Hồ Chí Minh", capacity: 5000, current: 3200, temperature: "2-8 độ C", humidity: "60-70%" },
    { id: 2, name: "Kho Miền Trung", location: "Đà Nẵng", capacity: 3000, current: 1800, temperature: "2-8 độ C", humidity: "60-70%" },
    { id: 3, name: "Kho Miền Bắc", location: "Hà Nội", capacity: 4000, current: 2500, temperature: "2-8 độ C", humidity: "60-70%" },
  ];

  const inventory = [
    { id: 1, product: "Thanh Long Ruột Đỏ", warehouse: "Kho Miền Nam", quantity: 450, unit: "tấn", expiry: "15/02/2026", status: "Tốt" },
    { id: 2, product: "Cà Phê Robusta", warehouse: "Kho Miền Trung", quantity: 320, unit: "tấn", expiry: "30/06/2026", status: "Tốt" },
    { id: 3, product: "Gạo ST25", warehouse: "Kho Miền Nam", quantity: 890, unit: "tấn", expiry: "20/03/2026", status: "Tốt" },
    { id: 4, product: "Ớt Chuông", warehouse: "Kho Miền Bắc", quantity: 120, unit: "tấn", expiry: "10/02/2026", status: "Sắp hết hạn" },
    { id: 5, product: "Xoài Cát", warehouse: "Kho Miền Nam", quantity: 280, unit: "tấn", expiry: "25/02/2026", status: "Tốt" },
    { id: 6, product: "Hạt Tiêu", warehouse: "Kho Miền Trung", quantity: 150, unit: "tấn", expiry: "15/12/2026", status: "Tốt" },
  ];

  return (
    <>
      <div className="breadcrumb"><span>Trang chủ</span><span className="arrow">&gt;</span><span>Kho bãi</span></div>
      <h1 className="page-title">Quản lý Kho bãi</h1>

      <div className="warehouse-stats">
        {warehouses.map(w => {
          const pct = ((w.current / w.capacity) * 100).toFixed(1);
          return (
            <div key={w.id} className="warehouse-card">
              <div className="warehouse-header"><h3>{w.name}</h3><span className="status-badge active">Hoạt động</span></div>
              <p className="warehouse-location"><span className="loc-dot" /> {w.location}</p>
              <div className="capacity-bar">
                <div className="capacity-info"><span>Sức chứa</span><span>{w.current} / {w.capacity} tấn</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }}></div></div>
                <span className="capacity-percent">{pct}% đã sử dụng</span>
              </div>
              <div className="warehouse-conditions">
                <div className="condition-item"><span className="cond-icon temp-icon" /><span>{w.temperature}</span></div>
                <div className="condition-item"><span className="cond-icon humid-icon" /><span>{w.humidity}</span></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="inventory-section">
        <div className="section-header">
          <h2>Tồn kho hiện tại</h2>
          <div className="header-actions">
            <select className="filter-select" value={selectedWarehouse} onChange={e => setSelectedWarehouse(e.target.value)}>
              <option value="all">Tất cả kho</option>
              {warehouses.map(w => <option key={w.id} value={w.name}>{w.name}</option>)}
            </select>
            <button className="primary-btn">Nhập kho</button>
            <button className="secondary-btn">Xuất kho</button>
          </div>
        </div>
        <table className="inventory-table">
          <thead><tr><th>Sản phẩm</th><th>Kho</th><th>Số lượng</th><th>Hạn sử dụng</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id}>
                <td className="product-name">{item.product}</td>
                <td>{item.warehouse}</td>
                <td>{item.quantity} {item.unit}</td>
                <td>{item.expiry}</td>
                <td><span className={`status-badge ${item.status === 'Tốt' ? 'good' : 'warning'}`}>{item.status}</span></td>
                <td><button className="action-btn">Chi tiết</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* =========================================
   PHÂN TÍCH — Market analysis
   ========================================= */
function PhanTichContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const priceData = [
    { product: "Thanh Long", currentPrice: 15000, change: +12.5, trend: "up", forecast: "+8%" },
    { product: "Cà Phê Robusta", currentPrice: 45000, change: -5.2, trend: "down", forecast: "-3%" },
    { product: "Gạo ST25", currentPrice: 28000, change: +3.8, trend: "up", forecast: "+5%" },
    { product: "Ớt Chuông", currentPrice: 32000, change: -2.1, trend: "down", forecast: "+2%" },
    { product: "Xoài Cát", currentPrice: 60000, change: +18.5, trend: "up", forecast: "+12%" },
    { product: "Hạt Tiêu", currentPrice: 85000, change: +7.3, trend: "up", forecast: "+10%" },
  ];

  const insights = [
    { title: "Nhu cầu Thanh Long tăng mạnh", desc: "Thị trường xuất khẩu Trung Quốc tăng 45%", impact: "high", date: "31/01/2026" },
    { title: "Giá Cà Phê có xu hướng giảm", desc: "Nguồn cung dồi dào từ Tây Nguyên", impact: "medium", date: "30/01/2026" },
    { title: "Gạo ST25 tiếp tục được ưa chuộng", desc: "Đơn hàng từ châu Âu tăng 28%", impact: "high", date: "29/01/2026" },
  ];

  return (
    <>
      <div className="breadcrumb"><span>Trang chủ</span><span className="arrow">&gt;</span><span>Phân tích thị trường</span></div>
      <div className="page-header">
        <div><h1 className="page-title">Phân tích Thị trường</h1><p className="page-subtitle">Theo dõi xu hướng giá và dự báo</p></div>
        <div className="period-selector">
          {["week", "month", "quarter"].map(p => (
            <button key={p} className={selectedPeriod === p ? "active" : ""} onClick={() => setSelectedPeriod(p)}>
              {p === "week" ? "Tuần" : p === "month" ? "Tháng" : "Quý"}
            </button>
          ))}
        </div>
      </div>

      <div className="market-overview">
        {[
          { title: "Chỉ số thị trường", value: "1.245", sub: "+5,8%", label: "Agricultural Index" },
          { title: "Khối lượng giao dịch", value: "45.230 tấn", sub: "", label: "Tháng này" },
          { title: "Giá trị giao dịch", value: "2.380 Tỷ VND", sub: "", label: "Tháng này" },
          { title: "Sản phẩm HOT", value: "Xoài Cát", sub: "+18,5%", label: "Tăng trưởng" },
        ].map((o, i) => (
          <div key={i} className="overview-card">
            <h3>{o.title}</h3>
            <div className="index-value"><span className="value">{o.value}</span>{o.sub && <span className="change positive">{o.sub}</span>}</div>
            <p className="index-label">{o.label}</p>
          </div>
        ))}
      </div>

      <div className="price-analysis-section">
        <h2>Xu hướng giá sản phẩm</h2>
        <table className="price-table">
          <thead><tr><th>Sản phẩm</th><th>Giá hiện tại</th><th>Biến động</th><th>Xu hướng</th><th>Dự báo 30 ngày</th></tr></thead>
          <tbody>
            {priceData.map((item, idx) => (
              <tr key={idx}>
                <td className="product-name">{item.product}</td>
                <td className="price">{item.currentPrice.toLocaleString()} VND/kg</td>
                <td><span className={`change ${item.change > 0 ? 'positive' : 'negative'}`}>{item.change > 0 ? '+' : ''}{item.change}%</span></td>
                <td><span className={`trend-indicator ${item.trend}`}>{item.trend === 'up' ? 'Tăng' : 'Giảm'}</span></td>
                <td><span className={`forecast ${item.forecast.includes('+') ? 'positive' : 'negative'}`}>{item.forecast}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="insights-section">
        <h2>Thông tin thị trường</h2>
        <div className="insights-grid">
          {insights.map((ins, idx) => (
            <div key={idx} className="insight-card">
              <div className="insight-header">
                <span className={`impact-badge ${ins.impact}`}>{ins.impact === 'high' ? 'Quan trọng' : 'Trung bình'}</span>
                <span className="insight-date">{ins.date}</span>
              </div>
              <h3>{ins.title}</h3>
              <p>{ins.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
