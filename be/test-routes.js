// Script để kiểm tra tất cả routes đã được đăng ký
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Định nghĩa tất cả routes từ code
const routes = {
  '🟢 WORKING - Auth Routes (Public)': [
    { method: 'POST', path: '/api/v1/auth/register', desc: 'Đăng ký tài khoản' },
    { method: 'POST', path: '/api/v1/auth/login', desc: 'Đăng nhập' },
    { method: 'POST', path: '/api/v1/auth/refresh-token', desc: 'Refresh token' },
    { method: 'POST', path: '/api/v1/auth/forgot-password', desc: 'Quên mật khẩu' },
    { method: 'POST', path: '/api/v1/auth/reset-password', desc: 'Reset mật khẩu' },
  ],
  
  '🔒 PROTECTED - Auth Routes (Cần login)': [
    { method: 'GET', path: '/api/v1/auth/me', desc: 'Lấy thông tin user' },
    { method: 'POST', path: '/api/v1/auth/logout', desc: 'Đăng xuất' },
    { method: 'PUT', path: '/api/v1/auth/update-password', desc: 'Đổi mật khẩu' },
    { method: 'PUT', path: '/api/v1/auth/update-profile', desc: 'Cập nhật profile' },
    { method: 'DELETE', path: '/api/v1/auth/deactivate', desc: 'Vô hiệu hóa tài khoản' },
  ],

  '🌾 FARMER Routes (Farmer only)': [
    { method: 'GET', path: '/api/v1/farmer/dashboard', desc: 'Dashboard nông dân' },
    { method: 'GET', path: '/api/v1/farmer/crops', desc: 'Danh sách cây trồng' },
    { method: 'GET', path: '/api/v1/farmer/contracts', desc: 'Hợp đồng' },
    { method: 'GET', path: '/api/v1/farmer/orders', desc: 'Đơn hàng' },
    { method: 'GET', path: '/api/v1/farmer/finances', desc: 'Tài chính' },
  ],

  '🏢 ENTERPRISE Routes (Enterprise only)': [
    { method: 'GET', path: '/api/v1/enterprise/dashboard', desc: 'Dashboard doanh nghiệp' },
    { method: 'GET', path: '/api/v1/enterprise/suppliers', desc: 'Nhà cung cấp' },
    { method: 'GET', path: '/api/v1/enterprise/contracts', desc: 'Hợp đồng' },
    { method: 'GET', path: '/api/v1/enterprise/warehouse', desc: 'Kho hàng' },
    { method: 'GET', path: '/api/v1/enterprise/analytics', desc: 'Phân tích' },
  ],

  '📦 PRODUCT Routes (Public/Protected)': [
    { method: 'GET', path: '/api/v1/products', desc: 'Danh sách sản phẩm (Public)' },
    { method: 'GET', path: '/api/v1/products/:id', desc: 'Chi tiết sản phẩm (Public)' },
    { method: 'POST', path: '/api/v1/products', desc: 'Tạo sản phẩm (Protected)' },
    { method: 'PUT', path: '/api/v1/products/:id', desc: 'Cập nhật sản phẩm (Protected)' },
    { method: 'DELETE', path: '/api/v1/products/:id', desc: 'Xóa sản phẩm (Protected)' },
  ],
};

async function testRoute(method, path) {
  try {
    const url = `${BASE_URL}${path}`;
    
    if (method === 'GET') {
      await axios.get(url, { timeout: 1000 });
    } else if (method === 'POST') {
      await axios.post(url, {}, { timeout: 1000 });
    } else if (method === 'PUT') {
      await axios.put(url, {}, { timeout: 1000 });
    } else if (method === 'DELETE') {
      await axios.delete(url, { timeout: 1000 });
    }
    
    return { status: 'OK', code: 200 };
  } catch (error) {
    if (error.response) {
      // Server responded with error (route exists!)
      return { status: 'EXISTS', code: error.response.status };
    } else if (error.code === 'ECONNREFUSED') {
      return { status: 'SERVER_OFF', code: null };
    } else {
      return { status: 'ERROR', code: null };
    }
  }
}

async function checkAllRoutes() {
  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║                                                           ║');
  console.log('║           PREOONIC ROUTES CHECKER                         ║');
  console.log('║                                                           ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  console.log(`🔍 Kiểm tra server tại: ${BASE_URL}\n`);

  // Test health check first
  try {
    await axios.get(`${BASE_URL}/health`, { timeout: 2000 });
    console.log('✅ Server đang chạy\n');
  } catch (error) {
    console.log('❌ Server KHÔNG chạy hoặc không response!');
    console.log('   → Chạy lệnh: npm run dev\n');
    return;
  }

  // Test all routes
  for (const [category, routeList] of Object.entries(routes)) {
    console.log(`\n${category}`);
    console.log('─'.repeat(60));
    
    for (const route of routeList) {
      const result = await testRoute(route.method, route.path);
      
      let icon = '';
      let status = '';
      
      if (result.status === 'OK' || result.status === 'EXISTS') {
        icon = '✅';
        status = `[${result.code}]`;
      } else if (result.status === 'SERVER_OFF') {
        icon = '❌';
        status = '[SERVER OFF]';
      } else {
        icon = '❌';
        status = '[NOT FOUND]';
      }
      
      console.log(`  ${icon} ${route.method.padEnd(6)} ${route.path.padEnd(40)} ${status}`);
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log('\n💡 LƯU Ý:');
  console.log('   • Routes trả về 4xx/5xx = Route TỒN TẠI (validation/auth error)');
  console.log('   • Routes trả về 404 = Route KHÔNG tồn tại');
  console.log('   • Đúng URL: /api/v1/auth/register (có /v1)');
  console.log('   • Sai URL: /api/auth/register (thiếu /v1)');
  console.log('\n');
}

// Run the checker
checkAllRoutes().catch(console.error);
