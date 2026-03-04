# Toast Notification System

## 📋 Tổng quan

Hệ thống thông báo Toast được tích hợp vào PreOnic để cung cấp feedback tức thì cho người dùng. Sử dụng Framer Motion cho animations mượt mà.

## 🎨 Các loại Toast

### 1. **Success** (Thành công)
```javascript
toast.success("Đăng ký thành công!");
```
- Màu xanh lá
- Icon: CheckCircle ✓
- Dùng cho: Đăng ký thành công, đăng nhập thành công, lưu dữ liệu, gửi form

### 2. **Error** (Lỗi)
```javascript
toast.error("Email đã được sử dụng!");
```
- Màu đỏ
- Icon: XCircle ✗
- Dùng cho: Lỗi validation, lỗi API, lỗi network

### 3. **Warning** (Cảnh báo)
```javascript
toast.warning("Mật khẩu sắp hết hạn!");
```
- Màu vàng/cam
- Icon: AlertTriangle ⚠
- Dùng cho: Cảnh báo, nhắc nhở

### 4. **Info** (Thông tin)
```javascript
toast.info("Hệ thống đang bảo trì vào 2h sáng");
```
- Màu xanh dương
- Icon: Info ℹ
- Dùng cho: Thông tin chung, hướng dẫn

## 📝 Cách sử dụng

### 1. Import Toast Hook
```javascript
import { useToast } from '../../contexts/ToastContext';

function MyComponent() {
  const toast = useToast();
  
  // ... your code
}
```

### 2. Hiển thị Toast
```javascript
// Cơ bản
toast.success("Thao tác thành công!");

// Tùy chỉnh duration (ms)
toast.error("Có lỗi xảy ra!", 6000); // Hiển thị 6 giây

// Không tự đóng (duration = 0 hoặc null)
toast.info("Thông báo quan trọng", 0);
```

### 3. Đóng Toast thủ công
```javascript
const toastId = toast.success("Processing...", 0);

// Sau khi xử lý xong
setTimeout(() => {
  toast.removeToast(toastId);
}, 3000);
```

## 🎯 Các trường hợp sử dụng

### Authentication
```javascript
// Đăng ký thành công
toast.success(`🎉 Chào mừng ${user.fullName}! Tài khoản của bạn đã được tạo thành công.`, 5000);

// Đăng nhập thành công
toast.success(`Chào mừng ${user.fullName}! Đăng nhập thành công.`, 4000);

// Lỗi đăng nhập
toast.error("Email hoặc mật khẩu không chính xác!");

// Đăng xuất
toast.info("Bạn đã đăng xuất thành công. Hẹn gặp lại!", 3000);
```

### Form Validation
```javascript
// Thiếu thông tin
toast.warning("Vui lòng điền đầy đủ thông tin bắt buộc!");

// Email không hợp lệ
toast.error("Email không đúng định dạng!");

// Submit thành công
toast.success("Form đã được gửi thành công!");
```

### Data Operations
```javascript
// Lưu thành công
toast.success("Đã lưu thay đổi!");

// Xóa thành công
toast.success("Đã xóa thành công!");

// Cập nhật thành công
toast.success("Cập nhật thông tin thành công!");

// Lỗi khi lưu
toast.error("Không thể lưu. Vui lòng thử lại!");
```

### Network/Loading
```javascript
// Bắt đầu tải
const loadingId = toast.info("Đang tải dữ liệu...", 0);

// Hoàn thành
toast.removeToast(loadingId);
toast.success("Tải dữ liệu thành công!");

// Lỗi network
toast.error("Không thể kết nối đến server. Vui lòng kiểm tra mạng!");
```

## 🎨 Tùy chỉnh

### CSS Classes
Toast component sử dụng các class sau:
- `.toast-container` - Container chứa tất cả toasts
- `.toast-notification` - Toast item
- `.toast-success` - Success style
- `.toast-error` - Error style
- `.toast-warning` - Warning style
- `.toast-info` - Info style

### Animation
Toast sử dụng Framer Motion với animations:
- **Enter**: Fade in + slide down từ trên
- **Exit**: Fade out + scale down
- **Spring physics**: Smooth bouncy effect

## 📍 Vị trí

Toasts hiển thị ở **top center** của màn hình, stack từ trên xuống dưới.

## ⏱️ Duration mặc định

- **Success**: 4000ms (4 giây)
- **Error**: 4000ms (4 giây)
- **Warning**: 4000ms (4 giây)
- **Info**: 4000ms (4 giây)

## 📱 Responsive

Toast tự động responsive:
- Desktop: 500px width
- Tablet/Mobile: Full width với padding

## 🌙 Dark Mode

Toast hỗ trợ dark mode tự động dựa trên system preferences.

## 🔧 Technical Details

### Files
- `fe/src/contexts/ToastContext.jsx` - Context provider
- `fe/src/Component/Toast/Toast.jsx` - Toast component
- `fe/src/Component/Toast/Toast.css` - Styling

### Dependencies
- `framer-motion` - Animations
- `react-bootstrap-icons` - Icons

### Integration
App được wrap với `ToastProvider` trong `App.js`:
```javascript
<ToastProvider>
  <BrowserRouter>
    <ToastContainer />
    {/* Your routes */}
  </BrowserRouter>
</ToastProvider>
```

## 📊 Đã tích hợp

✅ **Register.jsx** - Đăng ký thành công/thất bại
✅ **Auth.jsx** - Đăng nhập thành công/thất bại
✅ **Contact.jsx** - Gửi form liên hệ thành công

## 🚀 Tính năng tương lai

- [ ] Multiple toasts stacking
- [ ] Toast with actions (Undo, Retry)
- [ ] Progress bar for duration
- [ ] Sound effects (optional)
- [ ] Toast history/queue
- [ ] Global toast state persistence
- [ ] Custom icons
- [ ] Rich content support (images, links)

## 💡 Best Practices

1. **Ngắn gọn**: Message nên rõ ràng, không quá dài
2. **Meaningful**: Cung cấp thông tin hữu ích cho user
3. **Actionable**: Khi cần, cung cấp hướng dẫn tiếp theo
4. **Consistent**: Dùng đúng type cho đúng context
5. **Duration**: Adjust dựa trên độ quan trọng của message

## ❌ Tránh

- ❌ Hiển thị quá nhiều toast cùng lúc
- ❌ Message quá dài (>100 ký tự)
- ❌ Dùng sai type (info cho error, etc.)
- ❌ Duration quá ngắn (<2s cho message dài)
- ❌ Spam toast cho mỗi action nhỏ

---

**Created**: 2026-02-24
**Version**: 1.0.0
