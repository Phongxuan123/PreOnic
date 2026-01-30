import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FarmerDashboard.css";

export default function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState("muavu");
  const navigate = useNavigate();

  return (
    <div className="fd-wrapper">
      {/* SIDEBAR */}
      <aside className="fd-sidebar">
        <div className="fd-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <div className="logo-icon">🌱</div>
          <div className="logo-text">
            <h1>PreOnic</h1>
            <p>Nông dân</p>
          </div>
        </div>

        <nav className="fd-nav">
          <button 
            className={activeTab === "muavu" ? "active" : ""}
            onClick={() => setActiveTab("muavu")}
          >
            <span>Mùa vụ của tôi</span>
          </button>
          <button 
            className={activeTab === "hopdong" ? "active" : ""}
            onClick={() => setActiveTab("hopdong")}
          >
            <span>Hợp đồng</span>
          </button>
          <button 
            className={activeTab === "donhang" ? "active" : ""}
            onClick={() => setActiveTab("donhang")}
          >
            <span>Đơn hàng</span>
          </button>
          <button 
            className={activeTab === "taichinh" ? "active" : ""}
            onClick={() => setActiveTab("taichinh")}
          >
            <span>Tài chính</span>
          </button>
          <button 
            className={activeTab === "thitruong" ? "active" : ""}
            onClick={() => setActiveTab("thitruong")}
          >
            <span>Thông tin thị trường</span>
          </button>
        </nav>

        <button className="fd-create" onClick={() => setActiveTab("dangban")}>+ Đăng bán nông sản mới</button>
      </aside>

      {/* MAIN */}
      <main className="fd-main">
        {activeTab === "muavu" && <MuaVuContent />}
        {activeTab === "hopdong" && <HopDongContent />}
        {activeTab === "donhang" && <DonHangContent />}
        {activeTab === "taichinh" && <TaiChinhContent />}
        {activeTab === "thitruong" && <ThiTruongContent />}
        {activeTab === "dangban" && <DangBanContent />}
      </main>
    </div>
  );
}

// MÙA VỤ CONTENT
function MuaVuContent() {
  return (
    <>
      {/* HEADER */}
      <header className="fd-header">
        <div className="header-left">
          <h1>Chào mừng trở lại, Johnathan!</h1>
          <p>
            Dưới đây là tổng kết các cánh đồng và cam kết hôm nay, ngày 12 tháng 6.
          </p>
        </div>

        <div className="header-actions">
          <div className="fd-search">
            <input placeholder="Tìm kiếm mùa vụ, hợp đồng..." />
          </div>
          <button className="notification-btn">
            <span className="notif-dot"></span>
          </button>
          <div className="user-profile">
            <div className="user-avatar">JG</div>
            <span>Johnathan</span>
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="fd-stats">
        <div className="fd-stat-card">
          <div className="stat-icon contract-icon"></div>
          <div className="stat-content">
            <span className="stat-label">Tổng giá trị hợp đồng</span>
            <h3 className="stat-value">$42,850.00</h3>
            <small className="stat-change positive">+12% so với tháng trước</small>
          </div>
        </div>

        <div className="fd-stat-card">
          <div className="stat-icon shipment-icon"></div>
          <div className="stat-content">
            <span className="stat-label">Chuyến hàng sắp tới</span>
            <h3 className="stat-value">6 Chuyến</h3>
            <small className="stat-info">Tiếp theo: 8:00 AM</small>
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

      {/* SEASON OVERVIEW */}
      <section className="fd-section">
        <div className="fd-section-header">
          <h2>Tổng quan mùa vụ</h2>
          <span className="link">Xem tất cả</span>
        </div>

        <div className="fd-season">
          <div className="season-item">
            <div className="season-header">
              <div className="crop-badge corn"></div>
              <div>
                <strong className="season-title">Ngô hữu cơ – Lô phía Bắc</strong>
                <p className="season-target">Mục tiêu thu hoạch: 7/2024</p>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "75%" }}>
                <span className="progress-label">75%</span>
              </div>
            </div>
          </div>

          <div className="season-item">
            <div className="season-header">
              <div className="crop-badge soybean"></div>
              <div>
                <strong className="season-title">Đậu nành – Cánh đồng phía Nam</strong>
                <p className="season-target">Mục tiêu thu hoạch: 10/2024</p>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "40%" }}>
                <span className="progress-label">40%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTRACT TABLE */}
      <section className="fd-section">
        <h2>Cam kết đang hoạt động</h2>

        <table className="fd-table">
          <thead>
            <tr>
              <th>Đối tác</th>
              <th>Nông sản</th>
              <th>Giá trị</th>
              <th>Ngày giao</th>
              <th>Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>WholeFoods Coop</td>
              <td>Ngô hữu cơ</td>
              <td>$12,400</td>
              <td>15/08/2024</td>
              <td>
                <span className="badge green">Sắp giao</span>
              </td>
            </tr>

            <tr>
              <td>Midwest Processing</td>
              <td>Đậu nành</td>
              <td>$30,450</td>
              <td>02/09/2024</td>
              <td>
                <span className="badge yellow">Thanh toán một phần</span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}

// HỢP ĐỒNG CONTENT
function HopDongContent() {
  const [signatureMode, setSignatureMode] = useState("draw");
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="contract-header">
        <h1>Quy trình Hợp đồng</h1>
        <div className="header-actions">
          <button className="notification-btn">
            <span className="notification-badge"></span>
          </button>
          <div className="user-info">
            <span>Johnathan G.</span>
            <div className="user-avatar">JG</div>
          </div>
        </div>
      </header>

      {/* ALERT */}
      <div className="contract-alert">
        <div className="alert-content">
          <div className="alert-icon warning"></div>
          <div>
            <h4>Hợp đồng chờ ký</h4>
            <p>
              Bạn có 2 cam kết thu mua mới từ <strong>Healthy Harvest Co.</strong> và{" "}
              <strong>Global Grains</strong> đang chờ ký điện tử.
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
              <span>Hợp đồng #PRE-2024-0892</span>
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
                <h3>THỎA THUẬN MUA BÁN NÔNG SẢN</h3>
                <p>Hệ sinh thái thị trường PreOnic</p>
              </div>

              <div className="doc-content">
                <section className="doc-section">
                  <h4>1. CÁC BÊN LIÊN QUAN</h4>
                  <p>
                    Thỏa thuận này được lập giữa <strong>Johnathan G. (Bên bán)</strong> và{" "}
                    <strong>Healthy Harvest Co. (Bên mua)</strong> nhằm mục đích thu mua nông sản
                    thông qua nền tảng PreOnic.
                  </p>
                </section>

                <section className="doc-section">
                  <h4>2. HÀNG HÓA & SẢN LƯỢNG</h4>
                  <p>
                    Bên bán đồng ý cung cấp <mark>Ngô hữu cơ loại A</mark> với tổng sản lượng cam
                    kết là <mark>500 Tấn</mark>. Tất cả sản phẩm phải đáp ứng các tiêu chuẩn chứng
                    nhận như được nêu trong Hướng dẫn chất lượng PreOnic.
                  </p>
                </section>

                <section className="doc-section">
                  <h4>3. GIÁ CẢ & THANH TOÁN</h4>
                  <p>
                    Giá mua thỏa thuận được ấn định là <mark>248.00 USD/Tấn</mark>, tổng giá trị
                    hợp đồng ước tính là <mark>124,000.00 USD</mark>. Thanh toán sẽ được giải ngân
                    từ Tài khoản đảm bảo PreOnic sau khi xác nhận kỹ thuật số về giao hàng và kiểm
                    định chất lượng.
                  </p>
                </section>

                <section className="doc-section">
                  <h4>4. LỊCH TRÌNH GIAO HÀNG</h4>
                  <p>
                    Giao hàng dự kiến diễn ra từ ngày 15 tháng 8 năm 2024 đến ngày 25 tháng 8 năm
                    2024. Logistics sẽ được điều phối thông qua mô-đun điều vận PreOnic.
                  </p>
                </section>

                <section className="doc-section">
                  <h4>5. TÍNH PHÁP LÝ</h4>
                  <p>
                    Bằng cách ký tên dưới đây, cả hai bên thừa nhận các điều khoản của hợp đồng
                    thông minh kỹ thuật số này. Thỏa thuận này có tính ràng buộc pháp lý theo Luật
                    Giao dịch Điện tử.
                  </p>
                </section>

                <div className="doc-signatures">
                  <div className="signature-box buyer-signed">Chữ ký Bên mua (Số hóa)</div>
                  <div className="signature-box seller-pending">Chờ chữ ký Bên bán</div>
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
              <h4>Ký điện tử bảo mật</h4>
              <p>Chọn phương thức ký ưa thích của bạn</p>
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
                <p className="canvas-hint">Ký tại đây bằng chuột hoặc cảm ứng</p>
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
                    Tôi xác nhận đã đọc các điều khoản hợp đồng được tô đậm trong tài liệu và đồng ý
                    với mức giá <strong>248.00 USD/Tấn</strong> và sản lượng{" "}
                    <strong>500 Tấn</strong>.
                  </span>
                </label>
              </div>
            </div>

            <div className="panel-footer">
              <button className="sign-btn" disabled={!agreed}>
                ✓ Ký ngay
              </button>
              <p className="security-note">Được mã hóa bảo mật với SSL 256-bit</p>
            </div>
          </div>

          {/* SUPPORT PANEL */}
          <div className="support-panel">
            <h5>HỖ TRỢ KÝ KẾT</h5>
            <p>
              Cần hỗ trợ hiểu rõ các điều khoản này? Hãy kết nối với Cố vấn Pháp lý PreOnic để được
              tư vấn miễn phí 15 phút.
            </p>
            <button>Yêu cầu gọi lại từ Cố vấn</button>
          </div>
        </div>
      </div>

      {/* ACTIVITY LOG */}
      <div className="activity-log">
        <div className="activity-header">
          <h4>Hoạt động gần đây</h4>
          <span className="update-time">Cập nhật 2 phút trước</span>
        </div>

        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon success">✓</div>
            <div className="activity-details">
              <p className="activity-title">Đã ký hợp đồng: Global Grains</p>
              <p className="activity-desc">
                Lúa mì - 200 Tấn @ $210.00/Tấn • <span className="status-active">Đang hoạt động</span>
              </p>
            </div>
            <span className="activity-time">Hôm qua, 4:30 CH</span>
          </div>

          <div className="activity-item">
            <div className="activity-icon pending"></div>
            <div className="activity-details">
              <p className="activity-title">Chờ ký: Midwest Processing</p>
              <p className="activity-desc">Đậu nành - 150 Tấn @ $420.00/Tấn</p>
            </div>
            <span className="activity-time">Hôm nay, 9:15 SA</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ĐơN HÀNG CONTENT
function DonHangContent() {
  const [orderStatus, setOrderStatus] = useState("tatca");

  const orders = [
    {
      id: "PRE-ORD-2024-1145",
      shop: "Langfarm - Đặc Sản Chất Lượng",
      product: "Khoai lang tím sấy giòn đặc sản Langfarm",
      variant: "Bịch mawashi 350g",
      quantity: 1,
      price: 102200,
      image: "/product1.jpg",
      status: "delivered",
      deliveryDate: "15/01/2024",
      paymentStatus: "paid"
    },
    {
      id: "PRE-ORD-2024-1089",
      shop: "Gia dụng mart",
      product: "Lưới dao máy xay osaka nắp đóng mẫu 2022",
      variant: "Loại 1",
      quantity: 2,
      price: 85300,
      image: "/product2.jpg",
      status: "completed",
      deliveryDate: "10/01/2024",
      paymentStatus: "paid"
    },
    {
      id: "PRE-ORD-2024-0998",
      shop: "FreshHarvest Co.",
      product: "Thanh long ruột đỏ hữu cơ",
      variant: "Thùng 5kg",
      quantity: 3,
      price: 450000,
      image: "/product3.jpg",
      status: "shipping",
      deliveryDate: "Dự kiến 05/02/2024",
      paymentStatus: "paid"
    },
    {
      id: "PRE-ORD-2024-0887",
      shop: "Green Valley Farm",
      product: "Cam Vinh sạch",
      variant: "Kg",
      quantity: 10,
      price: 280000,
      image: "/product4.jpg",
      status: "pending",
      deliveryDate: "Chờ xác nhận",
      paymentStatus: "pending"
    }
  ];

  const tabs = [
    { key: "tatca", label: "Tất cả", count: orders.length },
    { key: "pending", label: "Chờ xác nhận", count: 1 },
    { key: "shipping", label: "Đang vận chuyển", count: 1 },
    { key: "delivered", label: "Chờ giao hàng", count: 1 },
    { key: "completed", label: "Hoàn thành", count: 1 },
    { key: "cancelled", label: "Đã hủy", count: 0 },
    { key: "return", label: "Trả hàng/Hoàn tiền", count: 0 }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="order-status pending">Chờ xác nhận</span>;
      case "shipping":
        return <span className="order-status shipping">Đang giao hàng</span>;
      case "delivered":
        return <span className="order-status delivered">Giao hàng thành công</span>;
      case "completed":
        return <span className="order-status completed">Hoàn thành</span>;
      case "cancelled":
        return <span className="order-status cancelled">Đã hủy</span>;
      default:
        return null;
    }
  };

  const filteredOrders = orderStatus === "tatca" 
    ? orders 
    : orders.filter(order => order.status === orderStatus);

  return (
    <>
      {/* HEADER */}
      <header className="order-header">
        <h1>Đơn Hàng của Tôi</h1>
        <div className="order-search">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
          />
        </div>
      </header>

      {/* TABS */}
      <div className="order-tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`order-tab ${orderStatus === tab.key ? "active" : ""}`}
            onClick={() => setOrderStatus(tab.key)}
          >
            {tab.label}
            {tab.count > 0 && <span className="tab-count">({tab.count})</span>}
          </button>
        ))}
      </div>

      {/* ORDERS LIST */}
      <div className="orders-container">
        {filteredOrders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon"></div>
            <h3>Chưa có đơn hàng nào</h3>
            <p>Bạn chưa có đơn hàng nào trong trạng thái này</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="order-card">
              {/* ORDER HEADER */}
              <div className="order-card-header">
                <div className="shop-info">
                  <span className="shop-badge"></span>
                  <span className="shop-name">{order.shop}</span>
                </div>
                <div className="order-actions">
                  <button className="btn-chat">Chat</button>
                  <button className="btn-view-shop">Xem Shop</button>
                  {getStatusBadge(order.status)}
                </div>
              </div>

              {/* ORDER CONTENT */}
              <div className="order-card-body">
                <div className="product-info">
                  <div className="product-image">
                    <img src={order.image} alt={order.product} />
                  </div>
                  <div className="product-details">
                    <h4 className="product-name">{order.product}</h4>
                    <p className="product-variant">Phân loại hàng: {order.variant}</p>
                    <p className="product-quantity">x{order.quantity}</p>
                  </div>
                </div>
                <div className="product-price">
                  {order.price.toLocaleString('vi-VN')}₫
                </div>
              </div>

              {/* ORDER FOOTER */}
              <div className="order-card-footer">
                <div className="order-meta">
                  <p className="order-id">Mã đơn: {order.id}</p>
                  <p className="order-delivery">
                    {order.status === "delivered" || order.status === "completed" 
                      ? `Đã giao: ${order.deliveryDate}`
                      : `Giao hàng: ${order.deliveryDate}`
                    }
                  </p>
                </div>
                <div className="order-total">
                  <span className="total-label">Thành tiền:</span>
                  <span className="total-amount">
                    {(order.price * order.quantity).toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="order-card-actions">
                {order.status === "delivered" && (
                  <>
                    <button className="btn-secondary">Đã Nhận Hàng</button>
                    <button className="btn-secondary">Yêu Cầu Trả Hàng/Hoàn Tiền</button>
                    <button className="btn-primary">Liên Hệ Người Bán</button>
                  </>
                )}
                {order.status === "completed" && (
                  <>
                    <button className="btn-secondary">Mua Lại</button>
                    <button className="btn-primary">Đánh Giá</button>
                  </>
                )}
                {order.status === "shipping" && (
                  <>
                    <button className="btn-secondary">Liên Hệ Người Bán</button>
                    <button className="btn-primary">Xem Chi Tiết</button>
                  </>
                )}
                {order.status === "pending" && (
                  <>
                    <button className="btn-secondary">Hủy Đơn</button>
                    <button className="btn-primary">Thanh Toán</button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

// TÀI CHÍNH CONTENT
function TaiChinhContent() {
  const [filterPeriod, setFilterPeriod] = useState("thang");

  const transactions = [
    {
      id: "TX-2024-1234",
      type: "income",
      description: "Thanh toán hợp đồng - Healthy Harvest Co.",
      category: "Bán nông sản",
      amount: 124000,
      date: "28/01/2024",
      status: "completed"
    },
    {
      id: "TX-2024-1189",
      type: "income",
      description: "Thanh toán hợp đồng - Global Grains",
      category: "Bán nông sản",
      amount: 42000,
      date: "25/01/2024",
      status: "completed"
    },
    {
      id: "TX-2024-1156",
      type: "expense",
      description: "Mua phân bón hữu cơ",
      category: "Vật tư canh tác",
      amount: -15000,
      date: "22/01/2024",
      status: "completed"
    },
    {
      id: "TX-2024-1102",
      type: "expense",
      description: "Chi phí vận chuyển",
      category: "Logistics",
      amount: -3500,
      date: "20/01/2024",
      status: "completed"
    },
    {
      id: "TX-2024-1089",
      type: "income",
      description: "Thanh toán đơn hàng #PRE-ORD-1089",
      category: "Bán lẻ",
      amount: 85300,
      date: "18/01/2024",
      status: "pending"
    }
  ];

  const stats = {
    totalIncome: 251300,
    totalExpense: 18500,
    netProfit: 232800,
    pendingAmount: 85300
  };

  return (
    <>
      {/* HEADER */}
      <header className="finance-header">
        <h1>Quản Lý Tài Chính</h1>
        <p>Theo dõi doanh thu, chi phí và lợi nhuận của bạn</p>
      </header>

      {/* STATS CARDS */}
      <div className="finance-stats">
        <div className="finance-card income">
          <div className="card-icon">💰</div>
          <div className="card-content">
            <span className="card-label">Tổng Thu Nhập</span>
            <h2 className="card-value">
              ${stats.totalIncome.toLocaleString('vi-VN')}
            </h2>
            <span className="card-trend positive">+18.5% so với tháng trước</span>
          </div>
        </div>

        <div className="finance-card expense">
          <div className="card-icon">📤</div>
          <div className="card-content">
            <span className="card-label">Tổng Chi Phí</span>
            <h2 className="card-value">
              ${stats.totalExpense.toLocaleString('vi-VN')}
            </h2>
            <span className="card-trend negative">+5.2% so với tháng trước</span>
          </div>
        </div>

        <div className="finance-card profit">
          <div className="card-icon chart-icon"></div>
          <div className="card-content">
            <span className="card-label">Lợi Nhuận Ròng</span>
            <h2 className="card-value">
              ${stats.netProfit.toLocaleString('vi-VN')}
            </h2>
            <span className="card-trend positive">+22.1% so với tháng trước</span>
          </div>
        </div>

        <div className="finance-card pending">
          <div className="card-icon clock-icon"></div>
          <div className="card-content">
            <span className="card-label">Chờ Thanh Toán</span>
            <h2 className="card-value">
              ${stats.pendingAmount.toLocaleString('vi-VN')}
            </h2>
            <span className="card-note">2 giao dịch đang chờ</span>
          </div>
        </div>
      </div>

      {/* CHART & TRANSACTIONS */}
      <div className="finance-content">
        {/* CHART SECTION */}
        <div className="chart-section">
          <div className="section-header">
            <h3>Biểu Đồ Doanh Thu</h3>
            <div className="period-filter">
              <button 
                className={filterPeriod === "tuan" ? "active" : ""}
                onClick={() => setFilterPeriod("tuan")}
              >
                Tuần
              </button>
              <button 
                className={filterPeriod === "thang" ? "active" : ""}
                onClick={() => setFilterPeriod("thang")}
              >
                Tháng
              </button>
              <button 
                className={filterPeriod === "nam" ? "active" : ""}
                onClick={() => setFilterPeriod("nam")}
              >
                Năm
              </button>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-bars">
              {[65, 78, 52, 88, 95, 70, 82, 75, 90, 68, 85, 92].map((value, index) => (
                <div className="bar-wrapper" key={index}>
                  <div className="bar income-bar" style={{ height: `${value}%` }}>
                    <span className="bar-tooltip">${value * 10}k</span>
                  </div>
                  <span className="bar-label">T{index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-dot income-dot"></span>
              <span>Thu nhập</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot expense-dot"></span>
              <span>Chi phí</span>
            </div>
          </div>
        </div>

        {/* TRANSACTIONS SECTION */}
        <div className="transactions-section">
          <div className="section-header">
            <h3>Lịch Sử Giao Dịch</h3>
            <button className="export-btn">📥 Xuất Excel</button>
          </div>

          <div className="transactions-list">
            {transactions.map(tx => (
              <div key={tx.id} className={`transaction-item ${tx.type}`}>
                <div className="tx-icon">
                  {tx.type === "income" ? "📥" : "📤"}
                </div>
                <div className="tx-details">
                  <h4>{tx.description}</h4>
                  <p className="tx-meta">
                    <span className="tx-category">{tx.category}</span>
                    <span className="tx-separator">•</span>
                    <span className="tx-date">{tx.date}</span>
                    <span className="tx-separator">•</span>
                    <span className="tx-id">{tx.id}</span>
                  </p>
                </div>
                <div className="tx-amount">
                  <span className={`amount ${tx.type}`}>
                    {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString('vi-VN')}
                  </span>
                  <span className={`tx-status ${tx.status}`}>
                    {tx.status === "completed" ? "✓ Hoàn thành" : "⏳ Chờ xử lý"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="load-more-btn">Xem thêm giao dịch</button>
        </div>
      </div>
    </>
  );
}

// THÔNG TIN THỊ TRƯỜNG CONTENT
function ThiTruongContent() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const marketPrices = [
    {
      id: 1,
      name: "Ngô hữu cơ",
      category: "grain",
      currentPrice: 248,
      unit: "USD/Tấn",
      change: +12.5,
      trend: "up",
      demand: "high"
    },
    {
      id: 2,
      name: "Đậu nành",
      category: "grain",
      currentPrice: 420,
      unit: "USD/Tấn",
      change: -3.2,
      trend: "down",
      demand: "medium"
    },
    {
      id: 3,
      name: "Lúa mì",
      category: "grain",
      currentPrice: 210,
      unit: "USD/Tấn",
      change: +8.7,
      trend: "up",
      demand: "high"
    },
    {
      id: 4,
      name: "Thanh long ruột đỏ",
      category: "fruit",
      currentPrice: 35,
      unit: "USD/Kg",
      change: +5.3,
      trend: "up",
      demand: "high"
    },
    {
      id: 5,
      name: "Cam Vinh",
      category: "fruit",
      currentPrice: 28,
      unit: "USD/Kg",
      change: -1.8,
      trend: "down",
      demand: "medium",
      icon: "🍊"
    },
    {
      id: 6,
      name: "Bưởi da xanh",
      category: "fruit",
      currentPrice: 22,
      unit: "USD/Kg",
      change: +15.2,
      trend: "up",
      demand: "high",
      icon: "🍋"
    },
    {
      id: 7,
      name: "Cà phê Arabica",
      category: "beverage",
      currentPrice: 3200,
      unit: "USD/Tấn",
      change: +22.4,
      trend: "up",
      demand: "very-high",
      icon: "☕"
    },
    {
      id: 8,
      name: "Rau hữu cơ",
      category: "vegetable",
      currentPrice: 45,
      unit: "USD/Kg",
      change: +3.1,
      trend: "up",
      demand: "high",
      icon: "🥬"
    }
  ];

  const categories = [
    { key: "all", label: "Tất cả" },
    { key: "grain", label: "Ngũ cốc" },
    { key: "fruit", label: "Trái cây" },
    { key: "vegetable", label: "Rau củ" },
    { key: "beverage", label: "Đồ uống" }
  ];

  const filteredPrices = selectedCategory === "all" 
    ? marketPrices 
    : marketPrices.filter(item => item.category === selectedCategory);

  const getDemandLabel = (demand) => {
    switch (demand) {
      case "very-high":
        return <span className="demand very-high">Rất cao</span>;
      case "high":
        return <span className="demand high">Cao</span>;
      case "medium":
        return <span className="demand medium">Trung bình</span>;
      case "low":
        return <span className="demand low">Thấp</span>;
      default:
        return null;
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="market-header">
        <h1>Thông Tin Thị Trường</h1>
        <p>Cập nhật giá cả và xu hướng thị trường nông sản theo thời gian thực</p>
      </header>

      {/* ALERT BANNER */}
      <div className="market-alert">
        <div className="alert-icon news"></div>
        <div className="alert-text">
          <strong>Cập nhật mới:</strong> Giá Cà phê Arabica tăng 22.4% do nhu cầu xuất khẩu cao
        </div>
        <button className="alert-close">×</button>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="category-filters">
        {categories.map(cat => (
          <button
            key={cat.key}
            className={`category-btn ${selectedCategory === cat.key ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.key)}
          >
            <span className="cat-label">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* MARKET GRID */}
      <div className="market-grid">
        {filteredPrices.map(item => (
          <div key={item.id} className="market-card">
            <div className="market-card-header">
              <div className="product-icon">{item.icon}</div>
              <div className="product-info">
                <h3>{item.name}</h3>
                <span className="product-unit">{item.unit}</span>
              </div>
            </div>

            <div className="market-card-body">
              <div className="price-info">
                <span className="current-price">
                  ${item.currentPrice.toLocaleString('vi-VN')}
                </span>
                <span className={`price-change ${item.trend}`}>
                  {item.change > 0 ? "↑" : "↓"} {Math.abs(item.change)}%
                </span>
              </div>

              <div className="demand-info">
                {getDemandLabel(item.demand)}
              </div>
            </div>

            <div className="market-card-footer">
              <button className="view-chart-btn">Xem biểu đồ</button>
              <button className="set-alert-btn">Đặt cảnh báo</button>
            </div>

            {/* MINI CHART */}
            <div className="mini-chart">
              {[45, 52, 48, 65, 58, 72, 68, 75, item.trend === "up" ? 85 : 70].map((val, idx) => (
                <div 
                  key={idx} 
                  className={`mini-bar ${item.trend}`} 
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* MARKET NEWS */}
      <div className="market-news">
        <h3>Tin Tức Thị Trường</h3>
        <div className="news-list">
          <div className="news-item">
            <div className="news-badge hot">🔥 Hot</div>
            <div className="news-content">
              <h4>Nhu cầu nông sản hữu cơ tăng mạnh tại các thị trường châu Âu</h4>
              <p className="news-meta">PreOnic Market Insights • 2 giờ trước</p>
            </div>
          </div>

          <div className="news-item">
            <div className="news-badge new">✨ Mới</div>
            <div className="news-content">
              <h4>Giá lúa mì dự báo tăng 15% trong quý tới do hạn hán</h4>
              <p className="news-meta">Global Agriculture Report • 5 giờ trước</p>
            </div>
          </div>

          <div className="news-item">
            <div className="news-badge">📊</div>
            <div className="news-content">
              <h4>Chính sách mới hỗ trợ xuất khẩu trái cây sang thị trường Mỹ</h4>
              <p className="news-meta">Ministry of Agriculture • Hôm qua</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ĐĂNG BÁN NÔNG SẢN CONTENT
function DangBanContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    cropType: "",
    variety: "",
    area: "",
    plantDate: "",
    harvestDate: "",
    estimatedYield: "",
    desiredPrice: "",
    minBuyoutPercent: "",
    certificates: [],
    photos: []
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const stepLabels = ["Sản phẩm", "Mùa vụ", "Giá & Bao tiêu", "Chứng chỉ"];
  const stepTitles = [
    "Thông tin nông sản",
    "Thông tin mùa vụ",
    "Giá và Bao tiêu",
    "Chứng chỉ & Hình ảnh"
  ];

  return (
    <>
      {/* HEADER */}
      <header className="fd-header">
        <div className="header-left">
          <h1>Đăng ký Bán Nông sản Mới</h1>
          <p>Điền đầy đủ thông tin bên dưới để kết nối nhanh chóng với các nhà bao tiêu uy tín.</p>
        </div>
      </header>

      <div className="dangban-container">
        {/* STEPPER PROGRESS */}
        <div className="stepper-card">
          <div className="stepper-header">
            <div className="stepper-info">
              <span className="step-label">BƯỚC {currentStep} / 4</span>
              <p className="step-title">{stepTitles[currentStep - 1]}</p>
            </div>
            {currentStep < 4 && (
              <p className="next-step">Tiếp theo: {stepTitles[currentStep]}</p>
            )}
          </div>
          
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
          </div>
          
          <div className="step-labels">
            {stepLabels.map((label, idx) => (
              <span key={idx} className={idx < currentStep ? "active" : ""}>{label}</span>
            ))}
          </div>
        </div>

        {/* FORM SECTION 1: THÔNG TIN NÔNG SẢN */}
        {currentStep >= 1 && (
          <div className="form-section">
            <div className="form-section-header">
              <h2><span className="icon">🌾</span> 1. Thông tin nông sản</h2>
            </div>
            <div className="form-section-body">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Loại cây trồng</label>
                  <select 
                    value={formData.cropType}
                    onChange={(e) => handleInputChange("cropType", e.target.value)}
                    className="form-input"
                  >
                    <option value="">Chọn loại cây (vd: Thanh long, Lúa...)</option>
                    <option value="thanhlong">Thanh long</option>
                    <option value="lua">Lúa</option>
                    <option value="caphe">Cà phê</option>
                    <option value="saurieng">Sầu riêng</option>
                    <option value="xoai">Xoài</option>
                    <option value="chom-chom">Chôm chôm</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Giống cây trồng</label>
                  <input 
                    type="text"
                    value={formData.variety}
                    onChange={(e) => handleInputChange("variety", e.target.value)}
                    placeholder="Nhập tên giống (vd: ST25, Ruột đỏ...)"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Diện tích canh tác</label>
                  <div className="input-with-suffix">
                    <input 
                      type="number"
                      value={formData.area}
                      onChange={(e) => handleInputChange("area", e.target.value)}
                      placeholder="0.0"
                      className="form-input"
                    />
                    <span className="input-suffix">m² / ha</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FORM SECTION 2: THÔNG TIN MÙA VỤ */}
        {currentStep >= 2 && (
          <div className="form-section">
            <div className="form-section-header">
              <h2><span className="icon">📅</span> 2. Thông tin mùa vụ</h2>
            </div>
            <div className="form-section-body">
              <div className="form-grid-3">
                <div className="form-group">
                  <label>Ngày gieo sạ dự kiến</label>
                  <input 
                    type="date"
                    value={formData.plantDate}
                    onChange={(e) => handleInputChange("plantDate", e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Ngày thu hoạch dự kiến</label>
                  <input 
                    type="date"
                    value={formData.harvestDate}
                    onChange={(e) => handleInputChange("harvestDate", e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Sản lượng ước tính</label>
                  <div className="input-with-suffix">
                    <input 
                      type="number"
                      value={formData.estimatedYield}
                      onChange={(e) => handleInputChange("estimatedYield", e.target.value)}
                      placeholder="0.0"
                      className="form-input"
                    />
                    <span className="input-suffix">tấn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FORM SECTION 3: GIÁ VÀ BAO TIÊU */}
        {currentStep >= 3 && (
          <div className="form-section">
            <div className="form-section-header">
              <h2><span className="icon">💰</span> 3. Giá và Bao tiêu</h2>
            </div>
            <div className="form-section-body">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Mức giá mong muốn</label>
                  <div className="input-with-suffix">
                    <input 
                      type="text"
                      value={formData.desiredPrice}
                      onChange={(e) => handleInputChange("desiredPrice", e.target.value)}
                      placeholder="50,000"
                      className="form-input"
                    />
                    <span className="input-suffix">VNĐ/kg</span>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Tỷ lệ bao tiêu tối thiểu</label>
                  <div className="input-with-suffix">
                    <input 
                      type="number"
                      value={formData.minBuyoutPercent}
                      onChange={(e) => handleInputChange("minBuyoutPercent", e.target.value)}
                      placeholder="50"
                      className="form-input"
                    />
                    <span className="input-suffix">%</span>
                  </div>
                  <p className="form-hint">Mức bao tiêu tối thiểu bạn sẵn sàng chấp nhận từ nhà mua.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FORM SECTION 4: CHỨNG CHỈ & HÌNH ẢNH */}
        {currentStep >= 4 && (
          <div className="form-section">
            <div className="form-section-header">
              <h2><span className="icon">✓</span> 4. Chứng chỉ & Hình ảnh</h2>
            </div>
            <div className="form-section-body">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Chứng nhận VietGAP / GlobalGAP</label>
                  <div className="upload-box">
                    <span className="upload-icon">📄</span>
                    <div className="upload-text">
                      <p className="upload-title">Tải lên chứng chỉ (PDF, JPG)</p>
                      <p className="upload-subtitle">Hoặc kéo và thả tệp vào đây</p>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Ảnh chụp thực tế cánh đồng</label>
                  <div className="upload-box">
                    <span className="upload-icon">📷</span>
                    <div className="upload-text">
                      <p className="upload-title">Tải lên ít nhất 3 ảnh</p>
                      <p className="upload-subtitle">Ảnh rõ nét, bao quát diện tích trồng</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FORM ACTIONS */}
        <div className="form-actions">
          <button 
            className="btn-secondary-action"
            onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
          >
            {currentStep === 1 ? "Hủy" : "Quay lại"}
          </button>
          <button 
            className="btn-primary-action"
            onClick={() => currentStep < 4 ? setCurrentStep(currentStep + 1) : alert("Gửi đăng ký thành công!")}
          >
            {currentStep === 4 ? "Gửi đăng ký" : "Tiếp theo"}
          </button>
        </div>
      </div>
    </>
  );
}
