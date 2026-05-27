# 🛡️ Zalo Clone — Admin Dashboard

Admin Dashboard for managing users, groups, and monitoring real-time statistics.  
Built with React + Vite. Uses the same authentication system as the main app — only users with `admin` role can access.

📦 **Repo:** [github.com/truongvd05/zalo-clone-admin](https://github.com/truongvd05/zalo-clone-admin)

---

## ✨ Features

### 👤 User Management

- Xem danh sách tất cả user
- Ban / Unban user
- Đổi thông tin tên user

### 👥 Group Management

- Xem danh sách tất cả group
- Ban / Unban group
- Đổi tên group

### 📊 Statistics

- Thống kê người dùng hoạt động hằng ngày
- Cập nhật real-time qua Socket.IO

---

## 🧰 Tech Stack

| Layer            | Technology               |
| ---------------- | ------------------------ |
| UI Framework     | React + Vite             |
| State Management | Redux Toolkit, RTK Query |
| Styling          | TailwindCSS              |
| Real-time        | Socket.IO client         |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Backend server đang chạy — xem [chatdemo backend](https://github.com/truongvd05/chatdemo)

### Installation

```bash
# 1. Clone repository
git clone https://github.com/truongvd05/zalo-clone-admin.git
cd zalo-clone-admin

# 2. Install dependencies
npm install

# 3. Tạo file .env
cp .env.example .env
# Chỉnh sửa .env theo hướng dẫn bên dưới

# 4. Chạy development server
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## ⚙️ Environment Variables

Tạo file `.env` ở root project:

```env
VITE_API_URL=https://your-api-url.com
VITE_SOCKET_URL=https://your-socket-url.com
```

| Biến              | Mô tả                |
| ----------------- | -------------------- |
| `VITE_API_URL`    | URL backend API      |
| `VITE_SOCKET_URL` | URL Socket.IO server |

> ⚠️ Restart dev server sau khi thay đổi `.env`.

---

## 🔐 Authentication

Dashboard có endpoint login **riêng** dành cho admin. Sau khi login thành công, BE trả về JWT — các request tiếp theo đều gắn token này vào header. Middleware BE kiểm tra `role` trong payload, chặn ngay nếu không phải `admin`.

|                | App chính              | Admin Dashboard         |
| -------------- | ---------------------- | ----------------------- |
| Login endpoint | `POST /api/auth/login` | `POST /api/admin/login` |
| Token type     | JWT Access + Refresh   | JWT Access + Refresh    |
| Role required  | `user`                 | `admin`                 |

```
POST /api/admin/login
  │
  ▼
BE kiểm tra role trong JWT payload
  │
  ├─ role = admin ──► Truy cập Dashboard
  │
  └─ role khác   ──► 403 Forbidden
```

---

## 📌 Notes

- Đảm bảo backend đang chạy trước khi start dashboard
- Tài khoản phải có `role = admin` mới đăng nhập được
- Kiểm tra đúng `VITE_API_URL` trong `.env` trỏ về backend

---

## 👤 Author

**Vũ Đình Trường**  
📧 truongbk444@gmail.com  
🐙 [github.com/truongvd05](https://github.com/truongvd05)
