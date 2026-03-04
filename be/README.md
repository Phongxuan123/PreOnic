# PreOnic Backend API

Backend API cho nền tảng kết nối nông dân và doanh nghiệp PreOnic.

## 🚀 Công nghệ sử dụng

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 📁 Cấu trúc thư mục

```
be/
├── src/
│   ├── config/          # Cấu hình (database, etc.)
│   ├── controllers/     # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middlewares/    # Custom middlewares
│   ├── services/       # Business logic
│   ├── utils/          # Helper functions
│   ├── types/          # TypeScript types
│   ├── app.ts          # Express app setup
│   └── server.ts       # Server entry point
├── dist/               # Compiled JavaScript
├── uploads/            # File uploads
├── package.json
├── tsconfig.json
└── .env
```

## 🛠️ Setup và Installation

### 1. Cài đặt dependencies

```bash
cd be
npm install
```

### 2. Cấu hình môi trường

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Cập nhật các biến môi trường trong `.env`:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/preoonic
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

### 3. Cài đặt MongoDB

**Option 1: MongoDB Local**
- Download và cài đặt MongoDB từ [mongodb.com](https://www.mongodb.com/try/download/community)
- Chạy MongoDB service

**Option 2: MongoDB Atlas (Cloud)**
- Tạo free cluster tại [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
- Copy connection string vào `MONGODB_URI`

### 4. Chạy server

**Development mode:**
```bash
npm run dev
```

**Production build:**
```bash
npm run build
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Đăng ký user mới
- `POST /api/v1/auth/login` - Đăng nhập
- `GET /api/v1/auth/me` - Lấy thông tin user hiện tại

### Farmer Routes
- `GET /api/v1/farmer/dashboard` - Dashboard nông dân
- `GET /api/v1/farmer/crops` - Mùa vụ/cánh đồng
- `GET /api/v1/farmer/contracts` - Hợp đồng
- `GET /api/v1/farmer/orders` - Đơn hàng
- `GET /api/v1/farmer/finances` - Tài chính

### Enterprise Routes
- `GET /api/v1/enterprise/dashboard` - Dashboard doanh nghiệp
- `GET /api/v1/enterprise/suppliers` - Danh bạ nhà cung cấp
- `GET /api/v1/enterprise/contracts` - Hợp đồng
- `GET /api/v1/enterprise/warehouse` - Kho bãi
- `GET /api/v1/enterprise/analytics` - Phân tích thị trường

### Products
- `GET /api/v1/products` - Danh sách sản phẩm
- `GET /api/v1/products/:id` - Chi tiết sản phẩm
- `POST /api/v1/products` - Tạo sản phẩm mới
- `PUT /api/v1/products/:id` - Cập nhật sản phẩm
- `DELETE /api/v1/products/:id` - Xóa sản phẩm

## 🔐 Authentication

API sử dụng JWT tokens. Include token trong header:

```
Authorization: Bearer <your_jwt_token>
```

## 🧪 Testing

```bash
npm test
```

## 📝 Scripts

- `npm run dev` - Chạy development server với nodemon
- `npm run build` - Build TypeScript sang JavaScript
- `npm start` - Chạy production server
- `npm run lint` - Lint code
- `npm run format` - Format code với Prettier

## 🌱 Development Status

✅ Setup hoàn tất
✅ Cấu trúc cơ bản
✅ Authentication middleware
✅ Error handling
⏳ Database models (đang phát triển)
⏳ Controllers implementation (đang phát triển)
⏳ Business logic (đang phát triển)

## 📞 Support

Liên hệ team phát triển nếu có vấn đề.
