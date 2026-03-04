# Frontend - PreOnic Platform

React-based frontend for PreOnic agricultural marketplace connecting farmers and enterprises.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Default configuration:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### 3. Start Development Server
```bash
npm start
```

App will run on [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
fe/
├── public/               # Static files
│   ├── images/          # Product images
│   └── index.html       # HTML template
├── src/
│   ├── Component/       # React components
│   │   ├── Auth/        # Login form
│   │   ├── Register/    # Registration page
│   │   ├── Navbar/      # Navigation bar
│   │   ├── FarmerDashboard/
│   │   ├── EnterpriseDashboard/
│   │   ├── ProtectedRoute/  # Route protection
│   │   └── ...
│   ├── contexts/        # React contexts
│   │   └── AuthContext.jsx  # Auth state management
│   ├── pages/           # Page components
│   │   └── Home.jsx
│   ├── services/        # API services
│   │   ├── api.js       # Axios instance
│   │   └── auth.service.js  # Auth API calls
│   ├── App.js           # Main app component
│   └── index.js         # Entry point
├── .env                 # Environment variables (not in git)
├── .env.example         # Environment template
└── package.json         # Dependencies
```

---

## 🔗 Backend Connection

### API Base URL
Set in `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Authentication Flow

1. **Registration**: `/register` → POST to `/api/auth/register`
2. **Login**: `/auth` → POST to `/api/auth/login`
3. **Token Storage**:
   - Access token → `localStorage` (for API requests)
   - Refresh token → `httpOnly cookie` (automatic)
4. **Auto Token Refresh**: Axios interceptor handles expired tokens
5. **Protected Routes**: `<ProtectedRoute>` checks authentication

### Using Auth in Components

```jsx
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <div>
      {isLoggedIn && <p>Welcome, {user.fullName}!</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## 📦 Key Dependencies

- **react** ^19.2.3 - UI library
- **react-router-dom** ^7.13.0 - Routing
- **axios** ^1.7.9 - HTTP client
- **framer-motion** ^12.29.2 - Animations
- **bootstrap** ^5.3.8 - UI components
- **recharts** ^3.7.0 - Charts for dashboards

---

## 🧪 Available Scripts

### `npm start`
Run development server on port 3000

### `npm run build`
Build production bundle to `/build`

### `npm test`
Run test suite

---

## 🎨 Features

### Current Features
- ✅ User registration with role selection (Farmer/Enterprise)
- ✅ Login with email or phone
- ✅ JWT authentication with auto token refresh
- ✅ Protected routes based on user role
- ✅ Responsive design with animations
- ✅ Dashboard for farmers and enterprises

### In Progress
- 🔄 Product listing and search
- 🔄 Contract management
- 🔄 Order processing
- 🔄 Profile management
- 🔄 Real-time notifications

---

## 🔒 Security

- Access tokens stored in `localStorage` (short-lived)
- Refresh tokens in `httpOnly` cookies (more secure)
- Automatic token refresh on expiration
- Protected routes with role-based access
- Input validation on forms

---

## 🐛 Troubleshooting

### Issue: API calls fail with CORS error
**Solution**: 
- Check backend is running on port 5000
- Verify `CORS_ORIGIN=http://localhost:3000` in backend `.env`

### Issue: Login redirects but shows "unauthorized"
**Solution**:
- Clear browser localStorage and cookies
- Re-login with valid credentials
- Check JWT secrets match between requests

### Issue: "Module not found" errors
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Documentation

- [Frontend-Backend Connection Guide](../FE_BE_CONNECTION_GUIDE.md)
- [Project Setup Guide](../README.md)
- [Backend API Documentation](../be/README.md)

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and test locally
3. Commit: `git commit -m "Add my feature"`
4. Push: `git push origin feature/my-feature`
5. Create Pull Request

---

## 📄 License

Private project for PreOnic platform.
