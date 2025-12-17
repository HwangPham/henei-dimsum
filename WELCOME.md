# 🥢 Chào Mừng Đến Với Henei Dimsum!

---

## 👋 Xin Chào!

Cảm ơn bạn đã quan tâm đến dự án **Henei Dimsum** - Website đặt món Dimsum Hong Kong!

---

## 🎯 Bạn Muốn Làm Gì?

### 🚀 1. Deploy Website Lên Vercel (Production)

**➡️ BẮT ĐẦU NGAY:**
- **Quick (10 phút)**: [QUICKSTART_VERCEL.md](./QUICKSTART_VERCEL.md)
- **Đầy đủ (30 phút)**: [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) ⭐ KHUYÊN DÙNG
- **In ra giấy**: [DEPLOY_PRINT.md](./DEPLOY_PRINT.md)

**✅ Bạn sẽ có:**
- Website live trên internet
- URL chia sẻ được: `https://henei-dimsum.vercel.app`
- Backend API: `https://henei-dimsum-backend.vercel.app`

---

### 💻 2. Chạy Local (Development)

**➡️ XEM HƯỚNG DẪN:**
[README.md](./README.md) - Phần "Cài đặt" và "Chạy dự án"

**Tóm tắt:**
```bash
# 1. Install dependencies
npm run install:all

# 2. Setup MongoDB (local hoặc Atlas)
# Copy .env.example -> .env trong backend/ và frontend/

# 3. Import data
cd backend
node importData.js

# 4. Run backend
npm start

# 5. Run frontend (terminal mới)
cd ../frontend
npm start
```

Website sẽ chạy tại: `http://localhost:3000`

---

### 📚 3. Tìm Hiểu Dự Án

**➡️ ĐỌC:**
- [README.md](./README.md) - Tổng quan project
- [STRUCTURE.md](./STRUCTURE.md) - Cấu trúc code
- [DOCS_INDEX.md](./DOCS_INDEX.md) - Danh mục tất cả tài liệu

---

### 🤝 4. Đóng Góp Code

**➡️ XEM:**
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Hướng dẫn contribute
- [GITHUB_SETUP.md](./GITHUB_SETUP.md) - Setup repository

---

### 🆘 5. Gặp Lỗi / Cần Giúp Đỡ

**➡️ KIỂM TRA:**
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Xử lý lỗi
- [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md) - Checklist deploy

**📞 Liên hệ:**
- Email: heneidimsum@gmail.com
- Hotline: 0967.582.566

---

## 📖 Tài Liệu Nhanh

| Tôi muốn... | Xem file... |
|-------------|-------------|
| Deploy nhanh lên Vercel | [QUICKSTART_VERCEL.md](./QUICKSTART_VERCEL.md) |
| Hướng dẫn deploy đầy đủ | [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) |
| Chạy local development | [README.md](./README.md) |
| Xử lý lỗi deploy | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| Track tiến độ deploy | [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md) |
| Deploy platforms khác | [DEPLOY.md](./DEPLOY.md) |
| Hiểu cấu trúc project | [STRUCTURE.md](./STRUCTURE.md) |
| Đóng góp code | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| Xem tất cả docs | [DOCS_INDEX.md](./DOCS_INDEX.md) |

---

## 🎓 Recommended Path

### 🥇 Cho Người Mới Bắt Đầu

1. **Đọc** [README.md](./README.md) (5 phút) - Hiểu project
2. **Chạy local** theo README (30 phút) - Test trước
3. **Deploy** theo [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) (30 phút)
4. **Track** với [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md)
5. **Fix lỗi** với [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) nếu cần

**Tổng thời gian:** ~1.5 giờ

---

### 🥈 Cho Người Có Kinh Nghiệm

1. **Skim** [QUICKSTART_VERCEL.md](./QUICKSTART_VERCEL.md) (2 phút)
2. **Deploy** luôn (10 phút)
3. **Reference** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) nếu cần

**Tổng thời gian:** ~15 phút

---

### 🥉 Cho Developer Muốn Contribute

1. **Đọc** [README.md](./README.md)
2. **Đọc** [STRUCTURE.md](./STRUCTURE.md)
3. **Đọc** [CONTRIBUTING.md](./CONTRIBUTING.md)
4. **Setup local** development
5. **Code** & submit PR

---

## ⚡ Quick Commands

### Deploy Scripts
```bash
# Windows
deploy-vercel.bat

# Linux/Mac  
bash deploy-vercel.sh
```

### Development
```bash
# Install all
npm run install:all

# Run both (backend + frontend)
npm run dev

# Run backend only
npm run dev:backend

# Run frontend only
npm run dev:frontend

# Import data
npm run import:data
```

---

## 📦 Project Structure

```
henei-dimsum/
├── 📱 frontend/        → React app (port 3000)
├── 🔧 backend/         → Express API (port 5000)
├── 📚 Documentation files:
│   ├── README.md               → Main docs
│   ├── VERCEL_DEPLOY.md        → Deploy guide ⭐
│   ├── QUICKSTART_VERCEL.md    → Quick deploy
│   ├── TROUBLESHOOTING.md      → Error fixes
│   ├── DEPLOY_CHECKLIST.md     → Progress tracker
│   └── [more...]
└── 🛠️ Scripts:
    ├── deploy-vercel.bat       → Auto deploy (Win)
    └── deploy-vercel.sh        → Auto deploy (Unix)
```

---

## 🎯 Mục Tiêu Của Project

**Henei Dimsum** là website đặt món dimsum trực tuyến với:
- 🍜 Menu dimsum Hong Kong đa dạng
- 🛒 Giỏ hàng thông minh
- 📦 Đặt hàng online
- 📅 Đặt bàn trước
- 🎁 Quản lý khuyến mãi
- 👨‍💼 Admin dashboard

---

## 🌟 Features

### Khách Hàng
- Xem menu với hình ảnh đẹp
- Tìm kiếm & lọc món theo category
- Thêm món vào giỏ hàng
- Đặt hàng online
- Đặt bàn trước
- Xem khuyến mãi

### Admin (Coming Soon)
- Quản lý món ăn
- Quản lý đơn hàng
- Quản lý đặt bàn
- Dashboard thống kê

---

## 🔧 Tech Stack

**Frontend:**
- React 19
- React Router
- Axios
- Context API

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

**Deployment:**
- Vercel (Frontend + Backend)
- MongoDB Atlas (Database)

---

## 📊 Project Status

- ✅ Backend API: Complete
- ✅ Frontend UI: Complete
- ✅ Database Models: Complete
- ✅ Documentation: Complete
- ✅ Deploy Config: Complete
- 🔄 Admin Dashboard: In Progress
- 📝 Testing: Pending

---

## 💡 Tips

1. **Lần đầu deploy?** → Follow [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) từng bước
2. **Gặp lỗi?** → Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) trước
3. **Cần deploy nhanh?** → Use [QUICKSTART_VERCEL.md](./QUICKSTART_VERCEL.md)
4. **Muốn in ra?** → Print [DEPLOY_PRINT.md](./DEPLOY_PRINT.md)
5. **Track progress?** → Use [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md)

---

## 🎉 Ready to Start?

### Option A: Deploy Ngay (Khuyên Dùng)
```
➡️ Mở: VERCEL_DEPLOY.md
```

### Option B: Chạy Local Trước
```
➡️ Mở: README.md > Phần "Cài đặt"
```

### Option C: Tìm Hiểu Trước
```
➡️ Mở: README.md
```

---

## 📞 Contact & Support

**Henei Dimsum**
- 📍 63 Tô Hiến Thành, Hai Bà Trưng, Hà Nội
- 📱 0967.582.566
- 📧 heneidimsum@gmail.com
- 🔗 [Facebook](https://www.facebook.com/profile.php?id=61580212877418)
- 🎵 [TikTok](https://tiktok.com/@heneidimsum)

---

## ⭐ Important Links

- **Main Docs**: [README.md](./README.md)
- **Deploy Guide**: [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)
- **Quick Start**: [QUICKSTART_VERCEL.md](./QUICKSTART_VERCEL.md)
- **All Docs**: [DOCS_INDEX.md](./DOCS_INDEX.md)
- **Troubleshoot**: [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

**🚀 Chúc bạn thành công!**

Made with ❤️ by Henei Dimsum Team

---

**Next Step:** Choose your path above and let's go! 🎯
