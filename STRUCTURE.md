# Cấu trúc dự án HeneiDimsum

## Tổng quan
Dự án web đặt món dimsum với backend Node.js + MongoDB và frontend React.

## Cấu trúc thư mục

```
HeneiDimsum/
├── backend/                    # Backend Node.js + Express
│   ├── .env                   # Biến môi trường (MONGO_URI, PORT)
│   ├── server.js              # File khởi động server
│   ├── importData.js          # Script import dữ liệu vào MongoDB
│   ├── package.json
│   └── src/
│       ├── config/
│       │   └── db.js         # Kết nối MongoDB
│       ├── models/
│       │   ├── Dish.js       # Model món ăn
│       │   ├── Order.js      # Model đơn hàng
│       │   ├── Menu.js
│       │   └── Admin.js
│       ├── routes/
│       │   ├── dishRoutes.js # API routes món ăn
│       │   ├── orderRoutes.js # API routes đơn hàng
│       │   ├── menuRoutes.js
│       │   └── adminRoutes.js
│       ├── controllers/
│       │   ├── menuController.js
│       │   ├── orderController.js
│       │   └── adminController.js
│       ├── middleware/
│       │   └── auth.js
│       └── data/              # Dữ liệu JSON để import
│           ├── menuData_chien.json
│           ├── menuData_hap.json
│           ├── menuData_xao.json
│           ├── menuData_my.json
│           └── menuData_nuoc.json
│
├── frontend/                   # Frontend React
│   ├── .env                   # REACT_APP_API_URL=http://localhost:5000/api
│   ├── package.json
│   ├── public/
│   │   ├── index.html
│   │   ├── quang_cao_1.webp  # Banner homepage
│   │   ├── quang_cao_2.webp
│   │   └── images/           # Hình ảnh món ăn
│   │       ├── chien/
│   │       ├── hap/
│   │       ├── xao/
│   │       ├── my/
│   │       └── nuoc/
│   └── src/
│       ├── App.js            # Component chính, routing
│       ├── index.js          # Entry point
│       ├── components/
│       │   ├── Navbar.jsx    # Thanh điều hướng
│       │   ├── Navbar.css
│       │   ├── DishCard.jsx  # Card hiển thị món ăn
│       │   └── DishCard.css
│       ├── contexts/
│       │   └── CartContext.jsx # Context quản lý giỏ hàng
│       ├── pages/
│       │   ├── HomePage.jsx   # Trang chủ
│       │   ├── MenuPage.jsx   # Trang menu (fetch từ API)
│       │   ├── CartPage.jsx   # Trang giỏ hàng
│       │   ├── CheckoutPage.jsx # Trang thanh toán
│       │   ├── AboutPage.jsx  # Trang giới thiệu
│       │   └── *.css
│       └── services/
│           └── api.js        # Axios API service (dishesAPI, ordersAPI)
│
└── assets/                    # Tài nguyên khác
```

## API Endpoints

### Backend (http://localhost:5000)

#### Dishes
- `GET /api/dishes` - Lấy tất cả món ăn
- `POST /api/dishes` - Thêm món mới (admin)
- `PUT /api/dishes/:id` - Cập nhật món
- `DELETE /api/dishes/:id` - Xóa món

#### Orders
- `POST /api/orders` - Tạo đơn hàng mới
- `GET /api/orders/:id` - Lấy thông tin đơn hàng
- `GET /api/orders` - Lấy tất cả đơn hàng (admin)

## Chạy dự án

### Backend
```bash
cd backend
npm install
npm start
# Server chạy tại http://localhost:5000
```

### Import dữ liệu vào MongoDB
```bash
cd backend
node importData.js
```

### Frontend
```bash
cd frontend
npm install
npm start
# App chạy tại http://localhost:3000
```

## Biến môi trường

### backend/.env
```
MONGO_URI=mongodb+srv://henei_dimsum:n5SgqeprO2Cbjz3C@heneidimsum.41e5xpv.mongodb.net/?appName=HeneiDimsum
PORT=5000
JWT_SECRET=your_secret_key
```

### frontend/.env
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Luồng dữ liệu

1. **Xem menu**: Frontend → `GET /api/dishes` → MongoDB → Hiển thị MenuPage
2. **Thêm vào giỏ**: Client-side (CartContext) → LocalStorage
3. **Đặt hàng**: CartPage → CheckoutPage → `POST /api/orders` → MongoDB
4. **Admin**: Import data → MongoDB → API → Frontend

## Công nghệ sử dụng

### Backend
- Node.js + Express
- MongoDB + Mongoose
- dotenv
- cors
- bcryptjs (authentication)
- jsonwebtoken (JWT)

### Frontend
- React 19
- React Router DOM
- Axios
- Context API (Cart management)
- CSS modules

## Lưu ý

- Hình ảnh món ăn nằm trong `frontend/public/images/`
- Banner homepage: `quang_cao_1.webp`, `quang_cao_2.webp` trong `public/`
- API URL được config qua `.env` file
- CORS đã được enable cho cross-origin requests
