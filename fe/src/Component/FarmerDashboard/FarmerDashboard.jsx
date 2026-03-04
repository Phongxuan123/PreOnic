import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES, COMPANY, CONTRACT_STATUS } from "../../constants";
import "./FarmerDashboard.css";

export default function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState("muavu");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { key: "muavu", label: "Mùa vụ của tôi", cls: "nav-season" },
    { key: "hopdong", label: "Hợp đồng", cls: "nav-contract" },
    { key: "donhang", label: "Đơn hàng", cls: "nav-order" },
    { key: "taichinh", label: "Tài chính", cls: "nav-finance" },
    { key: "danhba", label: "Danh bạ đối tác", cls: "nav-contacts" },
    { key: "thitruong", label: "Thông tin thị trường", cls: "nav-market" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="fd-wrapper">
      {/* SIDEBAR */}
      <aside className="fd-sidebar">
        <div className="fd-logo" onClick={() => navigate(ROUTES.HOME)} style={{ cursor: "pointer" }}>
          <div className="logo-icon"><span className="logo-leaf" /></div>
          <div className="logo-text"><h1>PreOnic</h1><p>Nông dân</p></div>
        </div>

        <nav className="fd-nav">
          {navItems.map(item => (
            <button key={item.key} className={`${item.cls} ${activeTab === item.key ? "active" : ""}`} onClick={() => setActiveTab(item.key)}>
              <span className={`nav-icon ${item.cls}-icon`} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="fd-create" onClick={() => setActiveTab("dangban")}>+ Đăng bán nông sản mới</button>

        <div className="fd-sidebar-footer">
          <button className="messaging-btn" onClick={() => navigate(ROUTES.MESSAGING)}>
            <span className="nav-icon msg-sidebar-icon" /> Nhắn tin
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon logout-sidebar-icon" /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="fd-main">
        {activeTab === "muavu" && <MuaVuContent user={user} />}
        {activeTab === "hopdong" && <HopDongContent />}
        {activeTab === "donhang" && <DonHangContent />}
        {activeTab === "taichinh" && <TaiChinhContent />}
        {activeTab === "danhba" && <DanhBaContent />}
        {activeTab === "thitruong" && <ThiTruongContent />}
        {activeTab === "dangban" && <DangBanContent />}
      </main>
    </div>
  );
}

/* =========================================
   MÙA VỤ — Season overview
   ========================================= */
function MuaVuContent({ user }) {
  return (
    <>
      <header className="fd-header">
        <div className="header-left">
          <h1>Chào mừng trở lại, {user?.fullName || "Nông dân"}!</h1>
          <p>Dưới đây là tổng kết các cánh đồng và cam kết hôm nay.</p>
        </div>
        <div className="header-actions">
          <div className="fd-search"><span className="search-input-icon" /><input placeholder="Tìm kiếm mùa vụ, hợp đồng..." /></div>
          <button className="notification-btn"><span className="notif-dot"></span></button>
          <div className="user-profile">
            <div className="user-avatar">{(user?.fullName || "ND").slice(0, 2).toUpperCase()}</div>
            <span>{user?.fullName || "Nông dân"}</span>
          </div>
        </div>
      </header>

      <section className="fd-stats">
        <div className="fd-stat-card">
          <div className="stat-icon contract-icon"></div>
          <div className="stat-content">
            <span className="stat-label">Tổng giá trị hợp đồng</span>
            <h3 className="stat-value">1,285,500,000 VND</h3>
            <small className="stat-change positive">+12% so với tháng trước</small>
          </div>
        </div>
        <div className="fd-stat-card">
          <div className="stat-icon shipment-icon"></div>
          <div className="stat-content">
            <span className="stat-label">Chuyến hàng sắp tới</span>
            <h3 className="stat-value">6 Chuyến</h3>
            <small className="stat-info">Tiếp theo: 08:00 sáng</small>
          </div>
        </div>
        <div className="fd-stat-card">
          <div className="stat-icon health-icon"></div>
          <div className="stat-content">
            <span className="stat-label">Sức khỏe cây trồng</span>
            <h3 className="stat-value">94%</h3>
            <small className="stat-info success">Điều kiện tốt</small>
          </div>
        </div>
      </section>

      <section className="fd-section">
        <div className="fd-section-header"><h2>Tổng quan mùa vụ</h2><span className="link">Xem tất cả</span></div>
        <div className="fd-season">
          {[
            { title: "Thanh Long - Lô phía Nam", target: "Thu hoạch: 10/2025", pct: 75, cls: "corn" },
            { title: "Cà Phê Robusta - Tây Nguyên", target: "Thu hoạch: 12/2025", pct: 40, cls: "soybean" },
            { title: "Rau sạch - Đà Lạt", target: "Thu hoạch: Quanh năm", pct: 85, cls: "wheat" },
          ].map((s, i) => (
            <div key={i} className="season-item">
              <div className="season-header">
                <div className={`crop-badge ${s.cls}`}></div>
                <div><strong className="season-title">{s.title}</strong><p className="season-target">Mục tiêu {s.target}</p></div>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${s.pct}%` }}><span className="progress-label">{s.pct}%</span></div></div>
            </div>
          ))}
        </div>
      </section>

      <section className="fd-section">
        <h2>Cam kết đang hoạt động</h2>
        <table className="fd-table">
          <thead><tr><th>Đối tác</th><th>Nông sản</th><th>Giá trị</th><th>Ngày giao</th><th>Trạng thái</th></tr></thead>
          <tbody>
            <tr><td>Healthy Harvest Co.</td><td>Thanh Long Ruột Đỏ</td><td>360,000,000 VND</td><td>15/10/2025</td><td><span className="badge green">Sắp giao</span></td></tr>
            <tr><td>Global Grains</td><td>Cà Phê Robusta</td><td>900,000,000 VND</td><td>30/12/2025</td><td><span className="badge yellow">Đang thực hiện</span></td></tr>
            <tr><td>FreshMart VN</td><td>Rau sạch Đà Lạt</td><td>25,500,000 VND</td><td>Hàng tháng</td><td><span className="badge green">Đang hoạt động</span></td></tr>
          </tbody>
        </table>
      </section>
    </>
  );
}

/* =========================================
   HỢP ĐỒNG — Contract management
   ========================================= */
function HopDongContent() {
  const [signatureMode, setSignatureMode] = useState("draw");
  const [agreed, setAgreed] = useState(false);
  const [activeContractTab, setActiveContractTab] = useState("pending");

  const contracts = [
    { id: "PRE-2026-0892", buyer: "Healthy Harvest Co.", product: "Thanh Long Ruột Đỏ", quantity: "5 Tấn", value: "90,000,000 VND", status: CONTRACT_STATUS.PENDING, date: "28/01/2026" },
    { id: "PRE-2026-0865", buyer: "Global Grains", product: "Cà Phê Robusta", quantity: "10 Tấn", value: "450,000,000 VND", status: CONTRACT_STATUS.PENDING, date: "25/01/2026" },
    { id: "PRE-2026-0810", buyer: "FreshMart VN", product: "Rau sạch Đà Lạt", quantity: "2 Tấn/tháng", value: "25,500,000 VND/tháng", status: CONTRACT_STATUS.ACTIVE, date: "01/01/2026" },
    { id: "PRE-2025-0750", buyer: "Midwest Processing", product: "Đậu nành", quantity: "150 Tấn", value: "2,800,000,000 VND", status: CONTRACT_STATUS.COMPLETED, date: "20/11/2025" },
  ];

  const tabs = [
    { key: "pending", label: "Chờ ký", count: contracts.filter(c => c.status === CONTRACT_STATUS.PENDING).length },
    { key: "active", label: "Đang hoạt động", count: contracts.filter(c => c.status === CONTRACT_STATUS.ACTIVE).length },
    { key: "completed", label: "Hoàn thành", count: contracts.filter(c => c.status === CONTRACT_STATUS.COMPLETED).length },
    { key: "sign", label: "Ký hợp đồng", count: 0 },
  ];

  const filteredContracts = activeContractTab === "sign" ? [] : contracts.filter(c => {
    if (activeContractTab === "pending") return c.status === CONTRACT_STATUS.PENDING;
    if (activeContractTab === "active") return c.status === CONTRACT_STATUS.ACTIVE;
    if (activeContractTab === "completed") return c.status === CONTRACT_STATUS.COMPLETED;
    return true;
  });

  return (
    <>
      <header className="contract-header">
        <h1>Quy trình Hợp đồng</h1>
        <p className="page-subtitle">Phí dịch vụ trung gian {COMPANY.NAME}: <strong>{COMPANY.COMMISSION_RATE}%</strong></p>
      </header>

      <div className="contract-tabs">
        {tabs.map(t => (
          <button key={t.key} className={`contract-tab ${activeContractTab === t.key ? "active" : ""}`} onClick={() => setActiveContractTab(t.key)}>
            {t.label} {t.count > 0 && <span className="tab-badge">{t.count}</span>}
          </button>
        ))}
      </div>

      {activeContractTab !== "sign" && (
        <div className="contracts-list">
          {filteredContracts.map(contract => (
            <div key={contract.id} className="contract-card-item">
              <div className="contract-main">
                <div className="contract-left">
                  <h4>{contract.buyer}</h4>
                  <p className="contract-meta">{contract.product} / {contract.quantity} / Mã: {contract.id}</p>
                </div>
                <div className="contract-right">
                  <span className="contract-value">{contract.value}</span>
                  <span className={`status-badge ${contract.status}`}>
                    {contract.status === CONTRACT_STATUS.PENDING && "Chờ ký"}
                    {contract.status === CONTRACT_STATUS.ACTIVE && "Đang hoạt động"}
                    {contract.status === CONTRACT_STATUS.COMPLETED && "Hoàn thành"}
                  </span>
                </div>
              </div>
              <div className="contract-actions-row">
                <span className="contract-date">{contract.date}</span>
                {contract.status === CONTRACT_STATUS.PENDING && (
                  <>
                    <button className="approve-btn" onClick={() => setActiveContractTab("sign")}>Ký ngay</button>
                    <button className="review-btn">Xem chi tiết</button>
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
              <div className="preview-title"><span className="doc-icon" /><span>Hợp đồng mới</span></div>
            </div>
            <div className="preview-body">
              <div className="contract-document">
                <div className="doc-header"><h3>THỎA THUẬN MUA BÁN NÔNG SẢN</h3><p>Hệ sinh thái {COMPANY.NAME}</p></div>
                <div className="doc-content">
                  <section className="doc-section"><h4>1. CÁC BÊN</h4><p>Bên bán (Nông dân) và Bên mua (Doanh nghiệp) thông qua nền tảng {COMPANY.NAME}.</p></section>
                  <section className="doc-section"><h4>2. SẢN PHẨM</h4><p>Bên bán cam kết cung cấp nông sản đạt tiêu chuẩn chất lượng.</p></section>
                  <section className="doc-section"><h4>3. THANH TOÁN</h4><p>Thanh toán qua Ký quỹ {COMPANY.NAME} Escrow. Phí dịch vụ: <mark>{COMPANY.COMMISSION_RATE}%</mark>.</p></section>
                  <section className="doc-section"><h4>4. BẢO VỆ</h4><p>{COMPANY.NAME} đóng vai trò trung gian bảo đảm quyền lợi cả hai bên.</p></section>
                  <div className="doc-signatures">
                    <div className="signature-box buyer-signed">Chữ ký Bên mua (Đã ký)</div>
                    <div className="signature-box seller-pending">Chờ chữ ký Bên bán</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contract-sidebar">
            <div className="signature-panel">
              <div className="panel-header"><h4>Ký điện tử bảo mật</h4><p>Chọn phương thức ký</p></div>
              <div className="panel-body">
                <div className="signature-modes">
                  {["draw", "upload", "otp"].map(m => (
                    <button key={m} className={signatureMode === m ? "active" : ""} onClick={() => setSignatureMode(m)}>
                      <span className={`mode-icon ${m}-icon`}></span><span>{m === "draw" ? "Vẽ" : m === "upload" ? "Tải lên" : "OTP"}</span>
                    </button>
                  ))}
                </div>
                <div className="signature-canvas">
                  <p className="canvas-hint">Ký tại đây bằng chuột hoặc cảm ứng</p>
                  <svg className="signature-svg" viewBox="0 0 400 300">
                    <path d="M50,150 C70,140 120,130 150,150 S200,180 250,160 S300,120 350,140" fill="none" stroke="#111812" strokeLinecap="round" strokeWidth="3" />
                  </svg>
                  <button className="clear-btn">Xóa</button>
                </div>
                <div className="agreement-box">
                  <label>
                    <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                    <span>Tôi xác nhận đã đọc các điều khoản và đồng ý ký kết. Phí trung gian {COMPANY.NAME}: <strong>{COMPANY.COMMISSION_RATE}%</strong>.</span>
                  </label>
                </div>
              </div>
              <div className="panel-footer">
                <button className="sign-btn" disabled={!agreed}>Ký ngay</button>
                <p className="security-note">Mã hóa SSL 256-bit</p>
              </div>
            </div>
            <div className="support-panel">
              <h5>HỖ TRỢ KÝ KẾT</h5>
              <p>Cần hỗ trợ? Kết nối với Cố vấn Pháp lý {COMPANY.NAME} để được tư vấn miễn phí.</p>
              <button>Yêu cầu gọi lại</button>
            </div>
          </div>
        </div>
      )}

      <div className="activity-log">
        <div className="activity-header"><h4>Hoạt động gần đây</h4><span className="update-time">Cập nhật 2 phút trước</span></div>
        <div className="activity-list">
          {[
            { cls: "success", title: "Đã ký: Global Grains", desc: "Cà phê - 10 Tấn", time: "Hôm qua" },
            { cls: "pending", title: "Chờ ký: Midwest Processing", desc: "Đậu nành - 150 Tấn", time: "Hôm nay" },
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
   ĐƠN HÀNG — Order management
   ========================================= */
function DonHangContent() {
  const [orderStatus, setOrderStatus] = useState("tatca");

  const orders = [
    { id: "PRE-ORD-2026-1145", shop: "Healthy Harvest Co.", product: "Thanh Long Ruột Đỏ", variant: "Thùng 10kg", quantity: 500, price: 180000, status: "delivered", deliveryDate: "20/01/2026", paymentStatus: "paid" },
    { id: "PRE-ORD-2026-1089", shop: "Global Grains", product: "Cà Phê Robusta Loại 1", variant: "Bao 60kg", quantity: 50, price: 2700000, status: "shipping", deliveryDate: "Dự kiến 05/02/2026", paymentStatus: "paid" },
    { id: "PRE-ORD-2026-0998", shop: "FreshMart VN", product: "Rau sạch Đà Lạt", variant: "Thùng 5kg", quantity: 100, price: 125000, status: "pending", deliveryDate: "Chờ xác nhận", paymentStatus: "pending" },
  ];

  const tabs = [
    { key: "tatca", label: "Tất cả", count: orders.length },
    { key: "pending", label: "Chờ xác nhận", count: 1 },
    { key: "shipping", label: "Đang vận chuyển", count: 1 },
    { key: "delivered", label: "Đã giao", count: 1 },
  ];

  const getStatusBadge = (s) => {
    const m = { pending: "Chờ xác nhận", shipping: "Đang giao hàng", delivered: "Giao thành công", completed: "Hoàn thành" };
    return <span className={`order-status ${s}`}>{m[s] || s}</span>;
  };

  const filtered = orderStatus === "tatca" ? orders : orders.filter(o => o.status === orderStatus);

  return (
    <>
      <header className="order-header"><h1>Đơn Hàng của Tôi</h1></header>
      <div className="order-tabs">
        {tabs.map(t => (
          <button key={t.key} className={`order-tab ${orderStatus === t.key ? "active" : ""}`} onClick={() => setOrderStatus(t.key)}>
            {t.label} {t.count > 0 && <span className="tab-count">({t.count})</span>}
          </button>
        ))}
      </div>
      <div className="orders-container">
        {filtered.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <div className="shop-info"><span className="shop-badge"></span><span className="shop-name">{order.shop}</span></div>
              <div className="order-actions">{getStatusBadge(order.status)}</div>
            </div>
            <div className="order-card-body">
              <div className="product-details"><h4 className="product-name">{order.product}</h4><p className="product-variant">Phân loại: {order.variant}</p><p className="product-quantity">x{order.quantity}</p></div>
              <div className="product-price">{(order.price * order.quantity).toLocaleString('vi-VN')} VND</div>
            </div>
            <div className="order-card-footer">
              <p className="order-id">Mã đơn: {order.id}</p>
              <p className="order-delivery">Giao hàng: {order.deliveryDate}</p>
            </div>
            <div className="order-card-actions">
              {order.status === "delivered" && <><button className="btn-primary">Đã Nhận Hàng</button><button className="btn-secondary">Liên Hệ Người Mua</button></>}
              {order.status === "shipping" && <button className="btn-primary">Xem Chi Tiết</button>}
              {order.status === "pending" && <><button className="btn-secondary">Hủy Đơn</button><button className="btn-primary">Xác Nhận</button></>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================
   TÀI CHÍNH — Finance overview
   ========================================= */
function TaiChinhContent() {
  const stats = { totalIncome: 1285500000, totalExpense: 185000000, netProfit: 1100500000, pendingAmount: 90000000 };

  const transactions = [
    { id: "TX-2026-1234", type: "income", desc: "Thanh toán HĐ - Healthy Harvest Co.", amount: 360000000, date: "28/01/2026", status: "completed" },
    { id: "TX-2026-1189", type: "income", desc: "Thanh toán HĐ - Global Grains", amount: 900000000, date: "25/01/2026", status: "completed" },
    { id: "TX-2026-1156", type: "expense", desc: "Mua phân bón hữu cơ", amount: -85000000, date: "22/01/2026", status: "completed" },
    { id: "TX-2026-1102", type: "expense", desc: "Chi phí vận chuyển", amount: -35000000, date: "20/01/2026", status: "completed" },
    { id: "TX-2026-1089", type: "income", desc: "Thanh toán FreshMart VN", amount: 25500000, date: "18/01/2026", status: "pending" },
  ];

  const fmt = (v) => v.toLocaleString('vi-VN') + " VND";

  return (
    <>
      <header className="finance-header"><h1>Quản Lý Tài Chính</h1><p>Theo dõi doanh thu, chi phí và lợi nhuận</p></header>

      <div className="finance-stats">
        <div className="finance-card income"><div className="card-icon finance-income-icon"></div><div className="card-content"><span className="card-label">Tổng Thu Nhập</span><h2 className="card-value">{fmt(stats.totalIncome)}</h2><span className="card-trend positive">+18.5%</span></div></div>
        <div className="finance-card expense"><div className="card-icon finance-expense-icon"></div><div className="card-content"><span className="card-label">Tổng Chi Phí</span><h2 className="card-value">{fmt(stats.totalExpense)}</h2><span className="card-trend negative">+5.2%</span></div></div>
        <div className="finance-card profit"><div className="card-icon finance-profit-icon"></div><div className="card-content"><span className="card-label">Lợi Nhuận Ròng</span><h2 className="card-value">{fmt(stats.netProfit)}</h2><span className="card-trend positive">+22.1%</span></div></div>
        <div className="finance-card pending"><div className="card-icon finance-pending-icon"></div><div className="card-content"><span className="card-label">Chờ Thanh Toán</span><h2 className="card-value">{fmt(stats.pendingAmount)}</h2><span className="card-note">1 giao dịch</span></div></div>
      </div>

      <div className="finance-content">
        <div className="chart-section">
          <div className="section-header"><h3>Biểu Đồ Doanh Thu</h3></div>
          <div className="chart-container">
            <div className="chart-bars">
              {[65, 78, 52, 88, 95, 70, 82, 75, 90, 68, 85, 92].map((v, i) => (
                <div className="bar-wrapper" key={i}>
                  <div className="bar income-bar" style={{ height: `${v}%` }}><span className="bar-tooltip">{v * 10}tr</span></div>
                  <span className="bar-label">T{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="transactions-section">
          <div className="section-header"><h3>Lịch Sử Giao Dịch</h3><button className="export-btn">Xuất Excel</button></div>
          <div className="transactions-list">
            {transactions.map(tx => (
              <div key={tx.id} className={`transaction-item ${tx.type}`}>
                <div className={`tx-icon ${tx.type}-tx-icon`} />
                <div className="tx-details"><h4>{tx.desc}</h4><p className="tx-meta"><span>{tx.date}</span> &middot; <span>{tx.id}</span></p></div>
                <div className="tx-amount">
                  <span className={`amount ${tx.type}`}>{tx.amount > 0 ? "+" : ""}{fmt(Math.abs(tx.amount))}</span>
                  <span className={`tx-status ${tx.status}`}>{tx.status === "completed" ? "Hoàn thành" : "Chờ xử lý"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================
   DANH BẠ ĐỐI TÁC — Enterprise contacts
   ========================================= */
function DanhBaContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const partners = [
    { id: 1, name: "Healthy Harvest Co.", type: "Doanh nghiệp thực phẩm", location: "TP. Hồ Chí Minh", rating: 4.8, totalContracts: 12, avatar: "HH", phone: "028-1234-5678", email: "thu-mua@healthyharvest.vn" },
    { id: 2, name: "Global Grains", type: "Xuất nhập khẩu", location: "Hà Nội", rating: 4.7, totalContracts: 8, avatar: "GG", phone: "024-8765-4321", email: "sourcing@globalgrains.vn" },
    { id: 3, name: "FreshMart VN", type: "Siêu thị", location: "Đà Nẵng", rating: 4.5, totalContracts: 15, avatar: "FM", phone: "0236-111-2222", email: "ncc@freshmart.vn" },
    { id: 4, name: "Midwest Processing", type: "Chế biến nông sản", location: "Bình Dương", rating: 4.6, totalContracts: 5, avatar: "MP", phone: "0274-333-4444", email: "supply@midwest.vn" },
  ];

  const filtered = partners.filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <header className="fd-header"><div className="header-left"><h1>Danh Bạ Đối Tác</h1><p>Quản lý và kết nối với các doanh nghiệp thu mua</p></div></header>

      <div className="filters-bar">
        <div className="search-box"><span className="search-input-icon" /><input type="text" placeholder="Tìm kiếm đối tác..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /></div>
      </div>

      <div className="suppliers-grid">
        {filtered.map(p => (
          <div key={p.id} className="supplier-card">
            <div className="supplier-header">
              <div className="supplier-avatar">{p.avatar}</div>
              <div className="supplier-info">
                <h3>{p.name}</h3>
                <p className="supplier-location">{p.type} &middot; {p.location}</p>
              </div>
            </div>
            <div className="supplier-stats">
              <div className="stat-item"><span className="stat-label">Đánh giá</span><span className="stat-value">{p.rating} / 5</span></div>
              <div className="stat-item"><span className="stat-label">Hợp đồng</span><span className="stat-value">{p.totalContracts}</span></div>
            </div>
            <div className="supplier-contact"><p>{p.phone}</p><p>{p.email}</p></div>
            <div className="supplier-actions">
              <button className="btn-message" onClick={() => navigate(ROUTES.MESSAGING)}>Nhắn tin</button>
              <button className="btn-primary">Xem chi tiết</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================
   THÔNG TIN THỊ TRƯỜNG — Market info
   ========================================= */
function ThiTruongContent() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const marketPrices = [
    { id: 1, name: "Thanh long ruột đỏ", category: "fruit", currentPrice: 15000, unit: "VND/kg", change: +12.5, trend: "up", demand: "high" },
    { id: 2, name: "Cà phê Robusta", category: "beverage", currentPrice: 45000, unit: "VND/kg", change: -5.2, trend: "down", demand: "medium" },
    { id: 3, name: "Gạo ST25", category: "grain", currentPrice: 28000, unit: "VND/kg", change: +3.8, trend: "up", demand: "high" },
    { id: 4, name: "Xoài Cát Hòa Lộc", category: "fruit", currentPrice: 60000, unit: "VND/kg", change: +18.5, trend: "up", demand: "very-high" },
    { id: 5, name: "Hạt tiêu Gia Lai", category: "spice", currentPrice: 85000, unit: "VND/kg", change: +7.3, trend: "up", demand: "high" },
    { id: 6, name: "Rau hữu cơ", category: "vegetable", currentPrice: 20000, unit: "VND/kg", change: +3.1, trend: "up", demand: "high" },
  ];

  const categories = [
    { key: "all", label: "Tất cả" }, { key: "fruit", label: "Trái cây" }, { key: "grain", label: "Ngũ cốc" },
    { key: "vegetable", label: "Rau củ" }, { key: "beverage", label: "Đồ uống" }, { key: "spice", label: "Gia vị" },
  ];

  const filtered = selectedCategory === "all" ? marketPrices : marketPrices.filter(i => i.category === selectedCategory);

  const getDemandLabel = (d) => {
    const m = { "very-high": "Rất cao", high: "Cao", medium: "Trung bình", low: "Thấp" };
    return <span className={`demand ${d}`}>{m[d]}</span>;
  };

  return (
    <>
      <header className="market-header"><h1>Thông Tin Thị Trường</h1><p>Cập nhật giá cả và xu hướng nông sản</p></header>

      <div className="market-alert">
        <div className="alert-icon news"></div>
        <div className="alert-text"><strong>Cập nhật mới:</strong> Giá Xoài Cát Hòa Lộc tăng 18.5% do nhu cầu xuất khẩu</div>
      </div>

      <div className="category-filters">
        {categories.map(c => (
          <button key={c.key} className={`category-btn ${selectedCategory === c.key ? "active" : ""}`} onClick={() => setSelectedCategory(c.key)}>{c.label}</button>
        ))}
      </div>

      <div className="market-grid">
        {filtered.map(item => (
          <div key={item.id} className="market-card">
            <div className="market-card-header">
              <div className={`product-icon-dot ${item.category}`} />
              <div className="product-info"><h3>{item.name}</h3><span className="product-unit">{item.unit}</span></div>
            </div>
            <div className="market-card-body">
              <div className="price-info">
                <span className="current-price">{item.currentPrice.toLocaleString('vi-VN')} VND</span>
                <span className={`price-change ${item.trend}`}>{item.change > 0 ? "+" : ""}{item.change}%</span>
              </div>
              <div className="demand-info">{getDemandLabel(item.demand)}</div>
            </div>
            <div className="mini-chart">
              {[45, 52, 48, 65, 58, 72, 68, 75, item.trend === "up" ? 85 : 70].map((v, i) => (
                <div key={i} className={`mini-bar ${item.trend}`} style={{ height: `${v}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="market-news">
        <h3>Tin Tức Thị Trường</h3>
        <div className="news-list">
          {[
            { badge: "Nổi bật", cls: "hot", title: "Nhu cầu nông sản hữu cơ tăng mạnh tại châu Âu", meta: "2 giờ trước" },
            { badge: "Mới nhất", cls: "new", title: "Chính sách mới hỗ trợ xuất khẩu trái cây sang thị trường Mỹ", meta: "5 giờ trước" },
          ].map((n, i) => (
            <div key={i} className="news-item">
              <div className={`news-badge ${n.cls}`}>{n.badge}</div>
              <div className="news-content"><h4>{n.title}</h4><p className="news-meta">PreOnic Insights &middot; {n.meta}</p></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* =========================================
   ĐĂNG BÁN — Post new product
   ========================================= */
function DangBanContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ cropType: "", variety: "", area: "", plantDate: "", harvestDate: "", estimatedYield: "", desiredPrice: "", minBuyoutPercent: "" });

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const stepLabels = ["Sản phẩm", "Mùa vụ", "Giá và Bao tiêu", "Chứng chỉ"];

  return (
    <>
      <header className="fd-header"><div className="header-left"><h1>Đăng ký Bán Nông sản Mới</h1><p>Điền thông tin để kết nối với nhà bao tiêu uy tín.</p></div></header>

      <div className="dangban-container">
        <div className="stepper-card">
          <div className="stepper-header">
            <span className="step-label">BƯỚC {currentStep} / 4</span>
            {currentStep < 4 && <p className="next-step">Tiếp: {stepLabels[currentStep]}</p>}
          </div>
          <div className="progress-bar-container"><div className="progress-bar-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div></div>
          <div className="step-labels">{stepLabels.map((l, i) => <span key={i} className={i < currentStep ? "active" : ""}>{l}</span>)}</div>
        </div>

        {currentStep >= 1 && (
          <div className="form-section">
            <h2>1. Thông tin nông sản</h2>
            <div className="form-grid-2">
              <div className="form-group">
                <label>Loại cây trồng</label>
                <select value={formData.cropType} onChange={e => handleInputChange("cropType", e.target.value)} className="form-input">
                  <option value="">Chọn loại cây</option><option value="thanhlong">Thanh long</option><option value="lua">Lúa</option><option value="caphe">Cà phê</option><option value="xoai">Xoài</option>
                </select>
              </div>
              <div className="form-group"><label>Giống cây</label><input type="text" value={formData.variety} onChange={e => handleInputChange("variety", e.target.value)} placeholder="VD: ST25, Ruột đỏ..." className="form-input" /></div>
              <div className="form-group"><label>Diện tích (ha)</label><input type="number" value={formData.area} onChange={e => handleInputChange("area", e.target.value)} placeholder="0.0" className="form-input" /></div>
            </div>
          </div>
        )}

        {currentStep >= 2 && (
          <div className="form-section">
            <h2>2. Thông tin mùa vụ</h2>
            <div className="form-grid-3">
              <div className="form-group"><label>Ngày gieo sạ</label><input type="date" value={formData.plantDate} onChange={e => handleInputChange("plantDate", e.target.value)} className="form-input" /></div>
              <div className="form-group"><label>Ngày thu hoạch</label><input type="date" value={formData.harvestDate} onChange={e => handleInputChange("harvestDate", e.target.value)} className="form-input" /></div>
              <div className="form-group"><label>Sản lượng ước tính (tấn)</label><input type="number" value={formData.estimatedYield} onChange={e => handleInputChange("estimatedYield", e.target.value)} placeholder="0.0" className="form-input" /></div>
            </div>
          </div>
        )}

        {currentStep >= 3 && (
          <div className="form-section">
            <h2>3. Giá và Bao tiêu</h2>
            <div className="form-grid-2">
              <div className="form-group"><label>Mức giá mong muốn (VND/kg)</label><input type="text" value={formData.desiredPrice} onChange={e => handleInputChange("desiredPrice", e.target.value)} placeholder="50,000" className="form-input" /></div>
              <div className="form-group"><label>Tỷ lệ bao tiêu tối thiểu (%)</label><input type="number" value={formData.minBuyoutPercent} onChange={e => handleInputChange("minBuyoutPercent", e.target.value)} placeholder="50" className="form-input" /><p className="form-hint">Mức bao tiêu tối thiểu chấp nhận.</p></div>
            </div>
          </div>
        )}

        {currentStep >= 4 && (
          <div className="form-section">
            <h2>4. Chứng chỉ và Hình ảnh</h2>
            <div className="form-grid-2">
              <div className="form-group"><label>Chứng nhận VietGAP / GlobalGAP</label><div className="upload-box"><span className="upload-icon cert-upload-icon" /><p>Tải lên chứng chỉ (PDF, JPG)</p></div></div>
              <div className="form-group"><label>Ảnh thực tế</label><div className="upload-box"><span className="upload-icon photo-upload-icon" /><p>Tải lên ít nhất 3 ảnh</p></div></div>
            </div>
          </div>
        )}

        <div className="form-actions">
          <button className="btn-secondary-action" onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)} disabled={currentStep === 1}>{currentStep === 1 ? "Hủy" : "Quay lại"}</button>
          <button className="btn-primary-action" onClick={() => currentStep < 4 ? setCurrentStep(currentStep + 1) : alert("Gửi đăng ký thành công!")}>{currentStep === 4 ? "Gửi đăng ký" : "Tiếp theo"}</button>
        </div>
      </div>
    </>
  );
}
