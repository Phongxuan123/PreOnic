# Frontend-Backend Connection Guide

## ✅ Đã hoàn thành

### 1. Dependencies
- ✅ Installed `axios` for API calls
- ✅ Created `.env` file with `REACT_APP_API_URL=http://localhost:5000/api`

### 2. API Service Layer
- ✅ **fe/src/services/api.js**: Axios instance với interceptors
  - Request interceptor: Tự động thêm access token vào headers
  - Response interceptor: Tự động refresh token khi hết hạn (401)
  - `withCredentials: true`: Enable cookies cho refresh token

- ✅ **fe/src/services/auth.service.js**: 10 auth methods
  - `register()` - Đăng ký
  - `login()` - Đăng nhập
  - `logout()` - Đăng xuất
  - `refreshToken()` - Làm mới token
  - `forgotPassword()` - Quên mật khẩu
  - `resetPassword()` - Đặt lại mật khẩu
  - `updatePassword()` - Cập nhật mật khẩu
  - `getMe()` - Lấy thông tin user
  - `updateProfile()` - Cập nhật profile
  - `deactivateAccount()` - Hủy tài khoản

### 3. Updated Components
- ✅ **fe/src/Component/Auth/Auth.jsx**
  - Import `authService`
  - Added loading & error states
  - `handleSubmit` gọi `authService.login()`
  - Navigate based on user role (farmer/enterprise)
  - Error message display với animations

- ✅ **fe/src/Component/Register/Register.jsx**
  - Import `authService`
  - Added loading & error states
  - `handleSubmit` gọi `authService.register()`
  - Navigate based on selected role
  - Error message display với animations

### 4. Protected Routes & Context
- ✅ **fe/src/Component/ProtectedRoute/ProtectedRoute.jsx**
  - Protect routes cần authentication
  - Role-based access control
  - Auto redirect to /auth if not logged in

- ✅ **fe/src/contexts/AuthContext.jsx**
  - Global auth state management
  - `useAuth()` hook for easy access
  - Methods: login, register, logout, updateUser

---

## 🚀 Cách sử dụng

### Setup App.js với AuthProvider

```jsx
// fe/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';

// Import components
import Home from './pages/Home';
import Auth from './Component/Auth/Auth';
import Register from './Component/Register/Register';
import FarmerDashboard from './Component/FarmerDashboard/FarmerDashboard';
import EnterpriseDashboard from './Component/EnterpriseDashboard/EnterpriseDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes - Farmer only */}
          <Route 
            path="/farmer" 
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Protected Routes - Enterprise only */}
          <Route 
            path="/enterprise" 
            element={
              <ProtectedRoute allowedRoles={['enterprise']}>
                <EnterpriseDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

### Sử dụng useAuth() hook trong components

```jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const SomeComponent = () => {
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // User will be redirected to /auth
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <p>Welcome, {user.fullName}!</p>
          <p>Role: {user.role}</p>
          <button onClick={handleLogout}>Đăng xuất</button>
        </>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
};
```

### Gọi API trong components

```jsx
import authService from '../services/auth.service';

// Get current user
const user = authService.getCurrentUser();

// Check if logged in
const isLoggedIn = authService.isLoggedIn();

// Update password
try {
  await authService.updatePassword({
    currentPassword: 'old123',
    newPassword: 'new456',
    confirmPassword: 'new456'
  });
  alert('Cập nhật mật khẩu thành công!');
} catch (error) {
  alert(error.message);
}
```

---

## 🔄 Token Flow

1. **Login/Register**:
   - User submit form → API call → Receive access token & refresh token
   - Access token saved to `localStorage`
   - Refresh token saved to `httpOnly cookie` (automatic)
   - User data saved to `localStorage`

2. **Authenticated Requests**:
   - Axios interceptor tự động thêm `Authorization: Bearer <accessToken>`
   - Backend verify token → Return data

3. **Token Expired (401)**:
   - Response interceptor catch 401
   - Automatically call `/auth/refresh-token` với httpOnly cookie
   - Receive new access token
   - Retry original request
   - If refresh fails → Clear tokens & redirect to /auth

4. **Logout**:
   - Call `/auth/logout` → Backend xóa refresh token
   - Clear localStorage (accessToken, user)
   - Redirect to /auth

---

## 🧪 Testing Connection

### Step 1: Start Backend
```bash
cd be
npm run dev
# Server running on http://localhost:5000
```

### Step 2: Start Frontend
```bash
cd fe
npm start
# App running on http://localhost:3000
```

### Step 3: Test Flow
1. Go to http://localhost:3000/register
2. Fill form and submit
3. Check browser DevTools → Network tab
4. Should see POST request to http://localhost:5000/api/auth/register
5. Response should contain access token and user data
6. localStorage should have `accessToken` and `user`
7. Should redirect to /farmer or /enterprise

### Step 4: Test Login
1. Go to http://localhost:3000/auth
2. Login with registered credentials
3. Check Network tab → POST to /api/auth/login
4. Should redirect to dashboard

### Step 5: Test Protected Routes
1. Clear localStorage (logout)
2. Try to access http://localhost:3000/farmer
3. Should redirect to /auth

---

## ⚠️ Important Notes

### CORS Configuration
Backend already configured CORS for `http://localhost:3000`:

```javascript
// be/src/app.ts
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
```

### Cookie Settings
Refresh token cookie uses:
- `httpOnly: true` - Cannot access via JavaScript (security)
- `secure: false` in dev, `true` in production
- `sameSite: 'lax'` - CSRF protection
- `maxAge` based on `rememberMe` (7 days or 1 day)

### Environment Variables
**Frontend** (.env):
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

**Backend** (.env):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/preonicdb
JWT_ACCESS_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret
CORS_ORIGIN=http://localhost:3000
```

---

## 🐛 Troubleshooting

### Issue: "Network Error" khi gọi API
**Solution**: 
- Check backend đã chạy chưa (`npm run dev` in be folder)
- Check CORS_ORIGIN trong be/.env = http://localhost:3000
- Check REACT_APP_API_URL trong fe/.env = http://localhost:5000/api

### Issue: "401 Unauthorized" liên tục
**Solution**:
- Clear localStorage và cookies
- Check JWT_ACCESS_SECRET và JWT_REFRESH_SECRET trong be/.env
- Re-login

### Issue: Refresh token không work
**Solution**:
- Check `withCredentials: true` trong axios config
- Check cookie được set trong browser DevTools → Application → Cookies
- Check backend cookie settings trong auth.controller.ts

### Issue: MongoDB connection error
**Solution**:
- Install MongoDB: https://www.mongodb.com/try/download/community
- Start MongoDB service
- Or use MongoDB Atlas (cloud): Update MONGODB_URI in be/.env

---

## 📦 Next Steps

1. ✅ **Done**: Frontend connected to Backend
2. 🔄 **Testing**: Start both servers and test auth flow
3. 📝 **TODO**: Implement remaining features
   - Product CRUD APIs
   - Contract management
   - Order processing
   - File upload for images
   - Dashboard data endpoints
   - Real-time notifications
   - Payment integration

---

## 🆘 Need Help?

If you encounter any issues:
1. Check browser console for errors
2. Check backend terminal for errors
3. Verify MongoDB is running
4. Check Network tab in DevTools
5. Verify all environment variables are set correctly
