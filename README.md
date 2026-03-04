# PreOnic - Agricultural Marketplace Platform

Nền tảng kết nối nông dân và doanh nghiệp trong lĩnh vực nông nghiệp.

## 📁 Cấu trúc Project

```
PreOnic/
├── fe/          # Frontend - React App (Port 3000)
└── be/          # Backend - Node.js API (Port 5000)
```

## 🚀 Hướng dẫn chạy Project

### Yêu cầu hệ thống
- **Node.js** v16+ 
- **MongoDB** (local hoặc Atlas)
- **npm** hoặc **yarn**

---

## 📦 Setup lần đầu

### 1. Setup Backend

```bash
# Terminal 1: Backend
cd be
npm install
```

**Cấu hình MongoDB:**
- Nếu dùng MongoDB local: Đảm bảo MongoDB đang chạy
- Nếu dùng MongoDB Atlas: Cập nhật `MONGODB_URI` trong `be/.env`

### 2. Setup Frontend

```bash
# Terminal 2: Frontend
cd fe
npm install
```

---

## ▶️ Chạy Development

**Cần mở 2 terminal riêng biệt:**

### Terminal 1 - Backend (Port 5000)
```bash
cd be
npm run dev
```
✅ Backend API sẽ chạy tại: http://localhost:5000

### Terminal 2 - Frontend (Port 3000)
```bash
cd fe
npm start
```
✅ Frontend sẽ chạy tại: http://localhost:3000

---

## 🔄 Luồng hoạt động

```
User Browser (localhost:3000)
    ↓
Frontend React App
    ↓ HTTP Requests
Backend API (localhost:5000)
    ↓
MongoDB Database
```

---

## 🛠️ Scripts hữu ích

### Backend (`cd be`)
- `npm run dev` - Chạy dev server với hot reload
- `npm run build` - Build TypeScript
- `npm start` - Chạy production server
- `npm test` - Chạy tests

### Frontend (`cd fe`)
- `npm start` - Chạy dev server
- `npm run build` - Build production
- `npm test` - Chạy tests

---

## 📡 API Endpoints

Base URL: `http://localhost:5000/api/v1`

### Authentication
- `POST /auth/register` - Đăng ký
- `POST /auth/login` - Đăng nhập
- `GET /auth/me` - Thông tin user

### Farmer
- `GET /farmer/dashboard`
- `GET /farmer/crops`
- `GET /farmer/contracts`
- `GET /farmer/orders`
- `GET /farmer/finances`

### Enterprise
- `GET /enterprise/dashboard`
- `GET /enterprise/suppliers`
- `GET /enterprise/contracts`
- `GET /enterprise/warehouse`
- `GET /enterprise/analytics`

### Products
- `GET /products`
- `GET /products/:id`
- `POST /products` (Protected)
- `PUT /products/:id` (Protected)
- `DELETE /products/:id` (Protected)

---

## 🔐 Environment Variables

### Backend (`be/.env`)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/preoonic
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

### Frontend (nếu cần)
```env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

---

## 🏗️ Tech Stack

**Frontend:**
- React 19.2.3
- React Router DOM
- Bootstrap + React Bootstrap
- Framer Motion
- Recharts

**Backend:**
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt

---

## 📝 Development Notes

- Backend chạy trên port **5000**
- Frontend chạy trên port **3000**
- CORS đã được cấu hình cho development
- JWT tokens dùng cho authentication
- File uploads lưu tại `be/uploads/`

---

## 🐛 Troubleshooting

### MongoDB connection failed
```bash
# Kiểm tra MongoDB đang chạy
# Windows: services.msc → MongoDB Server
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Port already in use
```bash
# Kill process đang dùng port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### Frontend không call được API
- Kiểm tra Backend đã chạy chưa
- Kiểm tra CORS configuration
- Check console browser để xem error

---

## 📞 Support

Liên hệ team dev nếu có vấn đề!
