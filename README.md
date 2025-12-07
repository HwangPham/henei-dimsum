# 🥢 Henei Dimsum - Website đặt món Dimsum Hong Kong

Website đặt món dimsum trực tuyến với giao diện hiện đại, cho phép khách hàng xem thực đơn, thêm món vào giỏ hàng và đặt hàng dễ dàng.

![Henei Dimsum](https://img.shields.io/badge/Dimsum-Hong%20Kong-red)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-19.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## 📋 Mục lục

- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cài đặt](#-cài-đặt)
- [Chạy dự án](#-chạy-dự-án)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Đóng góp](#-đóng-góp)
- [Liên hệ](#-liên-hệ)

## ✨ Tính năng

### Khách hàng
- 🏠 **Trang chủ**: Giới thiệu nhà hàng với banner hấp dẫn
- 📖 **Thực đơn**: Xem danh sách món ăn với hình ảnh, mô tả và giá
- 🔍 **Tìm kiếm & Lọc**: Tìm kiếm món ăn theo tên, lọc theo danh mục (Chiên, Hấp, Xào, Mỳ, Nước)
- 🛒 **Giỏ hàng**: Thêm/xóa món, điều chỉnh số lượng, tính tổng tiền tự động
- 📦 **Đặt hàng**: Điền thông tin khách hàng và gửi đơn hàng
- ℹ️ **Giới thiệu**: Thông tin nhà hàng, địa chỉ, liên hệ

### Admin (Tương lai)
- 📊 Quản lý đơn hàng
- 🍽️ Quản lý món ăn (CRUD)
- 👥 Quản lý khách hàng

## 🚀 Công nghệ sử dụng

### Backend
- **Node.js** & **Express.js** - Server-side framework
- **MongoDB** & **Mongoose** - Database
- **dotenv** - Quản lý biến môi trường
- **cors** - Cross-Origin Resource Sharing
- **bcryptjs** & **jsonwebtoken** - Authentication (dự phòng)

### Frontend
- **React 19** - UI Library
- **React Router DOM** - Routing
- **Axios** - HTTP Client
- **Context API** - State Management (giỏ hàng)
- **CSS3** - Styling

## 📦 Cài đặt

### Yêu cầu hệ thống
- **Node.js** >= 18.x
- **npm** hoặc **yarn**
- **MongoDB Atlas** account (hoặc MongoDB local)
- **Git**

### Clone repository

```bash
git clone https://github.com/your-username/henei-dimsum.git
cd henei-dimsum
```

### Cài đặt dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

## ⚙️ Cấu hình

### Backend Environment Variables

Tạo file `.env` trong thư mục `backend/`:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/heneidimsum?retryWrites=true&w=majority

# Server Port
PORT=5000

# JWT Secret (optional - for future authentication)
JWT_SECRET=your_super_secret_key_here
```

### Frontend Environment Variables

Tạo file `.env` trong thư mục `frontend/`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎯 Chạy dự án

### 1. Import dữ liệu vào MongoDB (Chỉ lần đầu)

```bash
cd backend
node importData.js
```

Kết quả mong đợi:
```
✅ Dữ liệu đã được import thành công.
```

### 2. Chạy Backend Server

```bash
cd backend
npm start
```

Server sẽ chạy tại: `http://localhost:5000`

```
Server đang chạy ở http://localhost:5000
MongoDB connected successfully
```

### 3. Chạy Frontend Development Server

Mở terminal mới:

```bash
cd frontend
npm start
```

App sẽ tự động mở tại: `http://localhost:3000`

```
Compiled successfully!

You can now view heinei-frontend in the browser.
  Local:            http://localhost:3000
```

### 4. Truy cập ứng dụng

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Docs**: http://localhost:5000/api/dishes (test endpoint)

## 📁 Cấu trúc dự án

```
henei-dimsum/
├── backend/                    # Backend Node.js + Express
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js          # MongoDB connection
│   │   ├── models/
│   │   │   ├── Dish.js        # Model món ăn
│   │   │   └── Order.js       # Model đơn hàng
│   │   ├── routes/
│   │   │   ├── dishRoutes.js  # API routes món ăn
│   │   │   └── orderRoutes.js # API routes đơn hàng
│   │   └── data/              # JSON data files
│   ├── .env                   # Environment variables
│   ├── server.js              # Entry point
│   ├── importData.js          # Data seeding script
│   └── package.json
│
├── frontend/                   # Frontend React
│   ├── public/
│   │   ├── images/            # Hình ảnh món ăn
│   │   │   ├── chien/
│   │   │   ├── hap/
│   │   │   ├── xao/
│   │   │   ├── my/
│   │   │   └── nuoc/
│   │   ├── quang_cao_1.webp
│   │   └── quang_cao_2.webp
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Navigation bar
│   │   │   └── DishCard.jsx   # Card hiển thị món ăn
│   │   ├── contexts/
│   │   │   └── CartContext.jsx # Cart state management
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── MenuPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   └── AboutPage.jsx
│   │   ├── services/
│   │   │   └── api.js         # Axios API client
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
│
├── README.md
└── .gitignore
```

## 🔌 API Endpoints

### Dishes (Món ăn)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dishes` | Lấy tất cả món ăn |
| POST | `/api/dishes` | Thêm món mới (Admin) |
| PUT | `/api/dishes/:id` | Cập nhật món |
| DELETE | `/api/dishes/:id` | Xóa món |

### Orders (Đơn hàng)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Tạo đơn hàng mới |
| GET | `/api/orders/:id` | Lấy thông tin đơn hàng |
| GET | `/api/orders` | Lấy tất cả đơn hàng |

### Ví dụ Request

#### Tạo đơn hàng mới

```bash
POST http://localhost:5000/api/orders
Content-Type: application/json

{
  "items": [
    {
      "dishId": "69352e1cf4f6ee26dc437c12",
      "name": "Hoành thánh tứ xuyên",
      "price": 59000,
      "quantity": 2
    }
  ],
  "customer": {
    "name": "Nguyễn Văn A",
    "phone": "0123456789",
    "note": "Không cay"
  },
  "totalPrice": 118000
}
```

#### Response

```json
{
  "message": "Đặt hàng thành công!",
  "orderId": "69354217564b898a74297e91",
  "order": {
    "items": [...],
    "customer": {...},
    "totalPrice": 118000,
    "createdAt": "2025-12-07T09:00:07.335Z"
  }
}
```

## 📸 Screenshots

### Trang chủ
![Homepage](docs/screenshots/homepage.png)

### Thực đơn
![Menu](docs/screenshots/menu.png)

### Giỏ hàng
![Cart](docs/screenshots/cart.png)

### Thanh toán
![Checkout](docs/screenshots/checkout.png)

## 🛠️ Scripts

### Backend

```bash
npm start        # Chạy server (production)
npm run dev      # Chạy server với nodemon (development)
node importData.js  # Import dữ liệu vào MongoDB
```

### Frontend

```bash
npm start        # Chạy development server
npm run build    # Build production
npm test         # Chạy tests
```

## 🐛 Troubleshooting

### Lỗi kết nối MongoDB

```
MongoServerError: Authentication failed
```

**Giải pháp**: Kiểm tra lại `MONGO_URI` trong file `.env`, đảm bảo username, password và database name đúng.

### Port đã được sử dụng

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Giải pháp**: 
- Đổi PORT trong `.env` backend sang port khác (ví dụ: 5001)
- Hoặc kill process đang dùng port 5000:

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### Frontend không load được dữ liệu

**Giải pháp**: 
1. Kiểm tra backend đã chạy chưa
2. Kiểm tra `REACT_APP_API_URL` trong frontend/.env
3. Mở DevTools > Network để xem request/response
4. Kiểm tra CORS đã được enable trong backend

## 📝 Git & GitHub

### Tạo .gitignore

Tạo file `.gitignore` ở thư mục root:

```gitignore
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build
/frontend/build

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Misc
*.log
.cache
```

### Upload lên GitHub

```bash
# Khởi tạo git repository
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Initial commit: Henei Dimsum website"

# Thêm remote repository (thay your-username/henei-dimsum bằng repo của bạn)
git remote add origin https://github.com/your-username/henei-dimsum.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

### Tạo GitHub Repository

1. Đăng nhập vào GitHub
2. Click **New repository**
3. Đặt tên: `henei-dimsum`
4. Chọn **Public** hoặc **Private**
5. **Không** chọn "Initialize with README" (vì đã có rồi)
6. Click **Create repository**
7. Copy URL và chạy lệnh git ở trên

## 🚀 Deploy lên Production

### Deploy Backend (Render/Railway/Heroku)

1. Tạo account trên [Render.com](https://render.com)
2. Connect GitHub repository
3. Thêm environment variables:
   - `MONGO_URI`
   - `PORT` (Render tự động set)
   - `JWT_SECRET`
4. Deploy!

### Deploy Frontend (Vercel/Netlify)

```bash
# Build production
cd frontend
npm run build

# Deploy lên Vercel
npm i -g vercel
vercel --prod
```

Hoặc connect GitHub repo với Vercel/Netlify để auto-deploy.

**Lưu ý**: Cập nhật `REACT_APP_API_URL` trong frontend environment variables trỏ đến backend production URL.

## 🤝 Đóng góp

Contributions, issues và feature requests đều được chào đón!

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Dự án này được phát triển cho mục đích học tập và thương mại. © 2025 Henei Dimsum.

## 📞 Liên hệ

**Henei Dimsum**
- 📍 Địa chỉ: 63 Tô Hiến Thành, Hai Bà Trưng, Hà Nội
- 📱 Hotline: 0967.582.566
- 📧 Email: heneidimsum@gmail.com
- 🔗 Facebook: [Henei Dimsum](https://www.facebook.com/profile.php?id=61580212877418)
- 🎵 TikTok: [@heneidimsum](https://tiktok.com/@heneidimsum)

---

⭐ **Nếu bạn thấy project hữu ích, hãy cho một star nhé!** ⭐

Made with ❤️ by Henei Dimsum Team
