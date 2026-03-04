# Environment Variables Documentation

Tài liệu hướng dẫn cấu hình các biến môi trường cho PreOnic Backend.

## 📋 Mục lục

1. [Server Configuration](#server-configuration)
2. [Database](#database)
3. [Authentication](#authentication)
4. [Email Service](#email-service)
5. [File Upload](#file-upload)
6. [Cloud Storage](#cloud-storage)
7. [Redis Cache](#redis-cache)
8. [Rate Limiting](#rate-limiting)
9. [Logging](#logging)
10. [Notifications](#notifications)
11. [Payment Gateways](#payment-gateways)
12. [External APIs](#external-apis)
13. [Social Auth](#social-auth)
14. [Security](#security)
15. [Development Tools](#development-tools)
16. [Business Logic](#business-logic)

---

## Server Configuration

### `NODE_ENV`
- **Giá trị:** `development` | `production` | `test`
- **Mặc định:** `development`
- **Mô tả:** Môi trường chạy của server

### `PORT`
- **Giá trị:** Số nguyên (1024-65535)
- **Mặc định:** `5000`
- **Mô tả:** Cổng mà server sẽ lắng nghe

### `API_PREFIX`
- **Giá trị:** String
- **Mặc định:** `/api/v1`
- **Mô tả:** Tiền tố cho tất cả API endpoints

---

## Database

### `MONGODB_URI`
- **Bắt buộc:** ✅
- **Ví dụ local:** `mongodb://localhost:27017/preoonic`
- **Ví dụ Atlas:** `mongodb+srv://user:pass@cluster.mongodb.net/preoonic`
- **Mô tả:** Connection string của MongoDB

### `MONGODB_URI_TEST`
- **Tùy chọn**
- **Mô tả:** Database riêng cho testing

---

## Authentication

### `JWT_SECRET`
- **Bắt buộc:** ✅
- **Mô tả:** Secret key để ký JWT access tokens
- **⚠️ Lưu ý:** Đổi giá trị mới trong production!

### `JWT_EXPIRE`
- **Mặc định:** `7d`
- **Giá trị:** `1h`, `1d`, `7d`, `30d`
- **Mô tả:** Thời gian hết hạn của access token

### `JWT_REFRESH_SECRET`
- **Bắt buộc:** ✅
- **Mô tả:** Secret key riêng cho refresh tokens
- **⚠️ Lưu ý:** Phải khác với `JWT_SECRET`

### `JWT_REFRESH_EXPIRE`
- **Mặc định:** `30d`
- **Mô tả:** Thời gian hết hạn của refresh token

### `PASSWORD_RESET_EXPIRE`
- **Mặc định:** `10` (phút)
- **Mô tả:** Thời gian hiệu lực của reset password token

### `MAX_LOGIN_ATTEMPTS`
- **Mặc định:** `5`
- **Mô tả:** Số lần đăng nhập sai tối đa trước khi khóa tài khoản

### `LOCK_TIME`
- **Mặc định:** `15` (phút)
- **Mô tả:** Thời gian khóa tài khoản sau khi vượt quá số lần đăng nhập sai

---

## Email Service

### `SMTP_HOST`
- **Ví dụ:** `smtp.gmail.com`, `smtp.sendgrid.net`
- **Mô tả:** SMTP server host

### `SMTP_PORT`
- **Giá trị:** `587` (TLS) | `465` (SSL)
- **Mô tả:** SMTP port

### `SMTP_USER`
- **Mô tả:** Email hoặc username để authenticate

### `SMTP_PASS`
- **Mô tả:** Mật khẩu hoặc app password
- **⚠️ Gmail:** Phải tạo App Password, không dùng mật khẩu thường

### `SMTP_FROM_NAME`
- **Mặc định:** `PreOnic Platform`
- **Mô tả:** Tên người gửi hiển thị trong email

### `SMTP_FROM_EMAIL`
- **Mặc định:** `noreply@preoonic.com`
- **Mô tả:** Email người gửi

### `ENABLE_EMAIL`
- **Giá trị:** `true` | `false`
- **Mặc định:** `false`
- **Mô tả:** Bật/tắt gửi email

---

## File Upload

### `MAX_FILE_SIZE`
- **Mặc định:** `5242880` (5MB)
- **Đơn vị:** Bytes
- **Mô tả:** Kích thước file upload tối đa

### `UPLOAD_PATH`
- **Mặc định:** `./uploads`
- **Mô tả:** Đường dẫn lưu file upload (local storage)

### `ALLOWED_FILE_TYPES`
- **Mặc định:** `image/jpeg,image/png,image/jpg,image/webp,application/pdf`
- **Mô tả:** MIME types được phép upload

### Image Processing
- `IMAGE_MAX_WIDTH`: Chiều rộng tối đa (2000px)
- `IMAGE_MAX_HEIGHT`: Chiều cao tối đa (2000px)
- `THUMBNAIL_WIDTH`: Chiều rộng thumbnail (300px)
- `THUMBNAIL_HEIGHT`: Chiều cao thumbnail (300px)

---

## Cloud Storage

### `USE_CLOUD_STORAGE`
- **Giá trị:** `true` | `false`
- **Mặc định:** `false`
- **Mô tả:** Dùng cloud storage thay vì local

### AWS S3 / CloudFlare R2
- `AWS_ACCESS_KEY_ID`: Access key
- `AWS_SECRET_ACCESS_KEY`: Secret key
- `AWS_BUCKET_NAME`: Tên bucket
- `AWS_REGION`: Vùng (vd: `ap-southeast-1`)
- `AWS_S3_ENDPOINT`: Custom endpoint (cho R2)
- `CDN_URL`: URL CDN nếu có

---

## Redis Cache

### `REDIS_ENABLED`
- **Giá trị:** `true` | `false`
- **Mặc định:** `false`
- **Mô tả:** Bật/tắt Redis caching

### `REDIS_URL`
- **Ví dụ:** `redis://localhost:6379`
- **Mô tả:** Connection URL (ưu tiên dùng thay vì host/port)

### `CACHE_TTL`
- **Mặc định:** `3600` (1 giờ)
- **Đơn vị:** Giây
- **Mô tả:** Time to live của cache

---

## Rate Limiting

### `RATE_LIMIT_ENABLED`
- **Mặc định:** `true`
- **Mô tả:** Bật/tắt rate limiting

### `RATE_LIMIT_WINDOW_MS`
- **Mặc định:** `900000` (15 phút)
- **Đơn vị:** Milliseconds
- **Mô tả:** Thời gian window để đếm requests

### `RATE_LIMIT_MAX_REQUESTS`
- **Mặc định:** `100`
- **Mô tả:** Số requests tối đa trong 1 window

### Auth Rate Limits
- `AUTH_RATE_LIMIT_MAX_REQUESTS`: Mặc định `5` requests
- Áp dụng riêng cho login/register endpoints

---

## Logging

### `LOG_LEVEL`
- **Giá trị:** `error` | `warn` | `info` | `debug`
- **Mặc định:** `debug`
- **Mô tả:** Level log tối thiểu

### `LOG_FILE`
- **Mặc định:** `logs/app.log`
- **Mô tả:** Đường dẫn file log

### `ENABLE_CONSOLE_LOG`
- **Mặc định:** `true`
- **Mô tả:** Hiển thị log ra console

### `ENABLE_FILE_LOG`
- **Mặc định:** `false`
- **Mô tả:** Ghi log vào file

---

## Notifications

### Firebase Cloud Messaging (FCM)
- `FCM_SERVER_KEY`: Server key từ Firebase Console
- `FCM_SENDER_ID`: Sender ID từ Firebase

### Twilio SMS
- `TWILIO_ACCOUNT_SID`: Account SID
- `TWILIO_AUTH_TOKEN`: Auth token
- `TWILIO_PHONE_NUMBER`: Số điện thoại Twilio

---

## Payment Gateways

### VNPay (Việt Nam)
- `VNPAY_TMN_CODE`: Mã TMN
- `VNPAY_HASH_SECRET`: Hash secret
- `VNPAY_URL`: API URL
- `VNPAY_RETURN_URL`: URL callback sau thanh toán

### Stripe (Quốc tế)
- `STRIPE_SECRET_KEY`: Secret key
- `STRIPE_PUBLISHABLE_KEY`: Publishable key (cho frontend)
- `STRIPE_WEBHOOK_SECRET`: Webhook signing secret

---

## External APIs

### `GOOGLE_MAPS_API_KEY`
- **Dùng cho:** Hiển thị bản đồ, geocoding, địa chỉ
- **Lấy tại:** [Google Cloud Console](https://console.cloud.google.com/)

### `WEATHER_API_KEY`
- **Dùng cho:** Dự báo thời tiết cho nông nghiệp
- **Providers:** OpenWeatherMap, WeatherAPI

---

## Social Auth (OAuth)

### Google OAuth
```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback
```

### Facebook OAuth
```env
FACEBOOK_APP_ID=your-app-id
FACEBOOK_APP_SECRET=your-secret
FACEBOOK_CALLBACK_URL=http://localhost:5000/api/v1/auth/facebook/callback
```

---

## Security

### `SESSION_SECRET`
- **Bắt buộc nếu dùng sessions**
- **Mô tả:** Secret để ký session cookies

### `ENCRYPTION_KEY`
- **Tùy chọn**
- **Mô tả:** Key để mã hóa dữ liệu nhạy cảm (credit cards, etc.)

### `FORCE_HTTPS`
- **Mặc định:** `false`
- **Mô tả:** Redirect tất cả HTTP requests sang HTTPS (production only)

---

## Development Tools

### `SEED_DATABASE`
- **Giá trị:** `true` | `false`
- **Mặc định:** `false`
- **Mô tả:** Tự động seed dữ liệu mẫu khi khởi động

### `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`
- **Mô tả:** Thông tin admin mặc định khi seed

### `DEBUG_MODE`
- **Mặc định:** `true`
- **Mô tả:** Hiển thị thông tin debug chi tiết

### `PRINT_QUERIES`
- **Mặc định:** `false`
- **Mô tả:** In ra tất cả MongoDB queries (debugging)

---

## Business Logic

### Contract Settings
- `MIN_CONTRACT_DURATION_DAYS`: Thời hạn hợp đồng tối thiểu (30 ngày)
- `MAX_CONTRACT_DURATION_DAYS`: Thời hạn tối đa (365 ngày)
- `CONTRACT_DEPOSIT_PERCENTAGE`: % tiền cọc (20%)

### Product Listing
- `PRODUCT_APPROVAL_REQUIRED`: Sản phẩm cần duyệt trước khi hiển thị?
- `MAX_PRODUCTS_PER_FARMER`: Số sản phẩm tối đa mỗi nông dân (100)

### Commission & Fees
- `PLATFORM_COMMISSION_RATE`: % hoa hồng nền tảng (5%)
- `TRANSACTION_FEE_PERCENTAGE`: % phí giao dịch (2%)

---

## 🚀 Quick Start

### 1. Copy file example
```bash
cp .env.example .env
```

### 2. Cấu hình tối thiểu (bắt buộc)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/preoonic
JWT_SECRET=your_strong_secret_here_min_32_chars
JWT_REFRESH_SECRET=another_strong_secret_here
FRONTEND_URL=http://localhost:3000
```

### 3. Kiểm tra cấu hình
```bash
npm run dev
```

Nếu thấy: `✅ MongoDB Connected` → Cấu hình thành công!

---

## 🔒 Security Best Practices

### Production Checklist

- [ ] Đổi tất cả `SECRET` keys
- [ ] Dùng MongoDB Atlas (không dùng localhost)
- [ ] Bật `FORCE_HTTPS=true`
- [ ] Set `NODE_ENV=production`
- [ ] Disable `DEBUG_MODE=false`
- [ ] Bật Rate Limiting
- [ ] Cấu hình CORS chính xác
- [ ] Không commit file `.env` lên Git
- [ ] Dùng environment variables trên hosting platform

### Generate Strong Secrets

```bash
# Trên Linux/Mac
openssl rand -base64 32

# Trên Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 📞 Support

Có vấn đề với cấu hình? Tham khảo:
- [MongoDB Docs](https://docs.mongodb.com/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Express Security](https://expressjs.com/en/advanced/best-practice-security.html)
