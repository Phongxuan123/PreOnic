# 🔄 HƯỚNG DẪN RESTART SERVER

## Cách 1: Nếu đang chạy `npm run dev` (nodemon)
1. Nhấn `Ctrl + C` trong terminal đang chạy server
2. Chạy lại: `npm run dev`

## Cách 2: Nếu server đang chạy background
1. Tìm process: `Get-Process -Name node`
2. Kill process: `Stop-Process -Name node -Force`
3. Start lại: `npm run dev`

## Cách 3: Nhanh nhất
Trong terminal đang chạy server, gõ: `rs` (nodemon restart)

---

**Sau khi restart, test lại đăng ký và xem logs:**
```
📥 Register Request Body: { ... }
🔍 Service - agreeTerms value: ??? Type: ???
```

Nếu vẫn lỗi, gửi logs cho tôi!
