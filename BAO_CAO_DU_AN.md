# BÁO CÁO DỰ ÁN
## WEBSITE ĐẶT MÓN DIMSUM HONG KONG - HENEI DIMSUM

---

## CHƯƠNG 1: TỔNG QUAN DỰ ÁN

### 1.1. Giới thiệu
Henei Dimsum là một website đặt món dimsum trực tuyến với giao diện hiện đại, cho phép khách hàng xem thực đơn, đặt bàn, đặt món trước và quản lý đơn hàng một cách dễ dàng. Hệ thống được xây dựng theo mô hình Full-Stack Web Application với kiến trúc Client-Server, tách biệt giữa Frontend và Backend.

### 1.2. Mục tiêu dự án
- Xây dựng nền tảng đặt món dimsum trực tuyến chuyên nghiệp
- Tối ưu hóa trải nghiệm người dùng với giao diện thân thiện, dễ sử dụng
- Cung cấp hệ thống quản lý đơn hàng hiệu quả cho nhà hàng
- Hỗ trợ đặt bàn và đặt món trước
- Quản lý chương trình khuyến mãi

### 1.3. Phạm vi dự án
**Đối tượng sử dụng:**
- Khách hàng: Xem menu, đặt món, đặt bàn, theo dõi khuyến mãi
- Quản trị viên (Admin): Quản lý món ăn, đơn hàng, đặt bàn, khuyến mãi

**Chức năng chính:**
- Hiển thị thực đơn với hình ảnh và thông tin chi tiết
- Tìm kiếm và lọc món ăn theo danh mục
- Đặt bàn trực tuyến
- Đặt món trước
- Quản lý khuyến mãi
- Hệ thống quản trị admin

---

## CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG

### 2.1. Kiến trúc hệ thống

Dự án được thiết kế theo kiến trúc **MVC (Model-View-Controller)** kết hợp với **Client-Server Architecture**:

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT SIDE                             │
│                    (React Frontend)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pages      │  │  Components  │  │   Services   │      │
│  │  - HomePage  │  │  - Navbar    │  │   - API      │      │
│  │  - MenuPage  │  │  - DishCard  │  │   - Axios    │      │
│  │  - AdminPage │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│                    Context API (State Management)           │
└─────────────────────────────────────────────────────────────┘
                              ↕ HTTP/HTTPS (REST API)
┌─────────────────────────────────────────────────────────────┐
│                      SERVER SIDE                             │
│                  (Node.js + Express)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Routes     │  │ Controllers  │  │    Models    │      │
│  │ - dishRoutes │  │ - dishCtrl   │  │  - Dish      │      │
│  │ - authRoutes │  │ - authCtrl   │  │  - Order     │      │
│  │ - orderRoute │  │ - orderCtrl  │  │  - Admin     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                           ↕                                  │
│                    Middleware                                │
│                  (Auth, CORS, etc.)                         │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                            │
│                   MongoDB Atlas (Cloud)                      │
│  Collections: dishes, orders, reservations,                  │
│  preorders, promotions, admins                               │
└─────────────────────────────────────────────────────────────┘
```

### 2.2. Công nghệ sử dụng

#### 2.2.1. Frontend
- **React 19.2.0**: Thư viện JavaScript để xây dựng giao diện người dùng
- **React Router DOM 7.9.5**: Quản lý routing và điều hướng
- **Axios 1.13.2**: HTTP client để gọi API
- **Context API**: Quản lý state toàn cục (giỏ hàng, authentication)
- **CSS3**: Styling và responsive design

**Lý do lựa chọn:**
- React có performance cao, component-based architecture dễ bảo trì
- React Router DOM giúp tạo SPA (Single Page Application) mượt mà
- Context API đơn giản, không cần thư viện ngoài như Redux

#### 2.2.2. Backend
- **Node.js**: Runtime environment cho JavaScript phía server
- **Express 5.1.0**: Web framework cho Node.js
- **MongoDB**: NoSQL database
- **Mongoose 8.19.3**: ODM (Object Data Modeling) cho MongoDB
- **JWT (jsonwebtoken 9.0.3)**: Xác thực và phân quyền
- **bcryptjs 3.0.3**: Mã hóa mật khẩu
- **cors 2.8.5**: Xử lý Cross-Origin Resource Sharing
- **dotenv 17.2.3**: Quản lý biến môi trường

**Lý do lựa chọn:**
- Node.js cho phép sử dụng JavaScript full-stack
- Express đơn giản, linh hoạt, có ecosystem lớn
- MongoDB phù hợp với dữ liệu JSON, dễ scale

#### 2.2.3. DevOps & Deployment
- **Vercel**: Platform deploy cho frontend và backend (serverless)
- **MongoDB Atlas**: Database cloud hosting
- **Git**: Version control
- **nodemon**: Auto-restart server khi development

### 2.3. Cơ sở dữ liệu

#### 2.3.1. Sơ đồ ERD (Entity Relationship Diagram)

```
┌─────────────────┐
│     ADMIN       │
├─────────────────┤
│ _id             │
│ username        │
│ email           │
│ password (hash) │
│ role            │
└─────────────────┘

┌─────────────────┐         ┌──────────────────┐
│      DISH       │         │   PROMOTION      │
├─────────────────┤         ├──────────────────┤
│ _id             │         │ _id              │
│ name            │         │ title            │
│ description     │         │ description      │
│ price           │         │ discountPercent  │
│ category        │         │ validFrom        │
│ image           │         │ validTo          │
└─────────────────┘         │ isActive         │
                            └──────────────────┘

┌─────────────────────┐
│    RESERVATION      │
├─────────────────────┤
│ _id                 │
│ customerName        │
│ phone               │
│ email               │
│ date                │
│ time                │
│ numberOfGuests      │
│ specialRequests     │
│ status              │
└─────────────────────┘

┌─────────────────────┐
│     PRE-ORDER       │
├─────────────────────┤
│ _id                 │
│ customerName        │
│ phone               │
│ email               │
│ pickupDate          │
│ pickupTime          │
│ items []            │
│ totalAmount         │
│ status              │
└─────────────────────┘
```

#### 2.3.2. Mô tả các Collection

**1. Dishes Collection**
```javascript
{
  _id: ObjectId,
  name: String (required),        // Tên món ăn
  description: String,            // Mô tả
  price: Number (required),       // Giá
  category: String (required),    // Danh mục: chiên, hấp, xào, mỳ, nước
  image: String                   // URL hình ảnh
}
```

**2. Reservations Collection**
```javascript
{
  _id: ObjectId,
  customerName: String (required),
  phone: String (required),
  email: String,
  date: Date (required),
  time: String (required),
  numberOfGuests: Number (required),
  specialRequests: String,
  status: String,                 // pending, confirmed, cancelled
  createdAt: Date
}
```

**3. PreOrders Collection**
```javascript
{
  _id: ObjectId,
  customerName: String (required),
  phone: String (required),
  email: String,
  pickupDate: Date (required),
  pickupTime: String (required),
  items: [
    {
      dishId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: Number (required),
  status: String,                 // pending, confirmed, ready, completed
  createdAt: Date
}
```

**4. Promotions Collection**
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  discountPercent: Number,
  validFrom: Date,
  validTo: Date,
  isActive: Boolean,
  createdAt: Date
}
```

**5. Admins Collection**
```javascript
{
  _id: ObjectId,
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),  // Mã hóa bằng bcryptjs
  role: String,                         // admin, super-admin
  createdAt: Date
}
```

### 2.4. API Endpoints

#### 2.4.1. Dishes API
```
GET    /api/dishes              - Lấy danh sách tất cả món ăn
GET    /api/dishes/:id          - Lấy chi tiết món ăn theo ID
POST   /api/dishes              - Tạo món ăn mới (Admin)
PUT    /api/dishes/:id          - Cập nhật món ăn (Admin)
DELETE /api/dishes/:id          - Xóa món ăn (Admin)
```

#### 2.4.2. Reservations API
```
GET    /api/reservations        - Lấy danh sách đặt bàn (Admin)
GET    /api/reservations/:id    - Lấy chi tiết đặt bàn
POST   /api/reservations        - Tạo đặt bàn mới
PUT    /api/reservations/:id    - Cập nhật trạng thái (Admin)
DELETE /api/reservations/:id    - Hủy đặt bàn
```

#### 2.4.3. Pre-Orders API
```
GET    /api/preorders           - Lấy danh sách đặt món trước (Admin)
GET    /api/preorders/:id       - Lấy chi tiết đặt món
POST   /api/preorders           - Tạo đơn đặt món trước
PUT    /api/preorders/:id       - Cập nhật trạng thái (Admin)
DELETE /api/preorders/:id       - Hủy đơn đặt món
```

#### 2.4.4. Promotions API
```
GET    /api/promotions          - Lấy danh sách khuyến mãi
GET    /api/promotions/active   - Lấy khuyến mãi đang hoạt động
POST   /api/promotions          - Tạo khuyến mãi (Admin)
PUT    /api/promotions/:id      - Cập nhật khuyến mãi (Admin)
DELETE /api/promotions/:id      - Xóa khuyến mãi (Admin)
```

#### 2.4.5. Authentication API
```
POST   /api/auth/login          - Đăng nhập admin
POST   /api/auth/logout         - Đăng xuất
GET    /api/auth/verify         - Xác thực token
```

---

## CHƯƠNG 3: TRIỂN KHAI HỆ THỐNG

### 3.1. Cấu trúc thư mục dự án

```
henei-dimsum/
├── backend/                    # Backend API Server
│   ├── src/
│   │   ├── config/            # Cấu hình
│   │   │   └── db.js          # Kết nối MongoDB
│   │   ├── controllers/       # Business logic
│   │   │   ├── adminController.js
│   │   │   ├── authController.js
│   │   │   ├── menuController.js
│   │   │   └── orderController.js
│   │   ├── models/            # Mongoose schemas
│   │   │   ├── Admin.js
│   │   │   ├── Dish.js
│   │   │   ├── Order.js
│   │   │   ├── PreOrder.js
│   │   │   ├── Promotion.js
│   │   │   └── Reservation.js
│   │   ├── routes/            # API routes
│   │   │   ├── adminRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── dishRoutes.js
│   │   │   ├── preOrderRoutes.js
│   │   │   ├── promotionRoutes.js
│   │   │   └── reservationRoutes.js
│   │   ├── middleware/        # Custom middleware
│   │   │   └── auth.js        # JWT authentication
│   │   └── data/              # Dữ liệu mẫu
│   │       ├── menuData.json
│   │       ├── menuData_chien.json
│   │       ├── menuData_hap.json
│   │       ├── menuData_my.json
│   │       ├── menuData_nuoc.json
│   │       └── menuData_xao.json
│   ├── scripts/
│   │   └── seedAdmin.js       # Tạo admin mặc định
│   ├── .env                   # Biến môi trường
│   ├── server.js              # Entry point
│   ├── importData.js          # Import dữ liệu mẫu
│   ├── package.json
│   └── vercel.json            # Cấu hình Vercel
│
├── frontend/                  # React Frontend
│   ├── public/
│   │   ├── images/           # Hình ảnh món ăn
│   │   │   ├── chien/        # Món chiên
│   │   │   ├── hap/          # Món hấp
│   │   │   ├── my/           # Món mỳ
│   │   │   ├── nuoc/         # Đồ uống
│   │   │   └── xao/          # Món xào
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── DishCard.jsx
│   │   │   └── DishCard.css
│   │   ├── contexts/         # Context API
│   │   │   └── CartContext.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── MenuPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ReservationPage.jsx
│   │   │   ├── PreOrderPage.jsx
│   │   │   ├── PromotionsPage.jsx
│   │   │   ├── AdminLoginPage.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminDishesPage.jsx
│   │   │   ├── AdminOrdersPage.jsx
│   │   │   ├── AdminPreOrdersPage.jsx
│   │   │   ├── AdminPromotionsPage.jsx
│   │   │   └── AdminReservationsPage.jsx
│   │   ├── services/         # API services
│   │   │   └── api.js
│   │   ├── App.js            # Main app component
│   │   ├── App.css
│   │   ├── index.js          # Entry point
│   │   └── index.css
│   ├── package.json
│   └── vercel.json
│
├── .env                       # Environment variables
├── package.json              # Root package.json
├── README.md                 # Tài liệu dự án
└── STRUCTURE.md              # Cấu trúc chi tiết
```

### 3.2. Các tính năng đã triển khai

#### 3.2.1. Phía khách hàng (Customer Features)

**1. Trang chủ (HomePage)**
- Banner chào mừng với hình ảnh bắt mắt
- Giới thiệu ngắn gọn về nhà hàng
- Call-to-action buttons dẫn đến menu và đặt bàn

**2. Trang thực đơn (MenuPage)**
- Hiển thị danh sách món ăn với hình ảnh
- Tìm kiếm món ăn theo tên
- Lọc theo danh mục: Chiên, Hấp, Xào, Mỳ, Nước
- Hiển thị giá và mô tả chi tiết
- Responsive design cho mobile

**3. Đặt bàn (ReservationPage)**
- Form đặt bàn với validation
- Chọn ngày, giờ, số lượng khách
- Ghi chú yêu cầu đặc biệt
- Xác nhận qua email/SMS (tương lai)

**4. Đặt món trước (PreOrderPage)**
- Chọn món từ menu
- Tính tổng tiền tự động
- Chọn thời gian lấy món
- Thanh toán online (tương lai)

**5. Khuyến mãi (PromotionsPage)**
- Hiển thị các chương trình khuyến mãi
- Lọc theo thời gian còn hiệu lực
- Áp dụng mã giảm giá

**6. Giới thiệu (AboutPage)**
- Thông tin nhà hàng
- Địa chỉ, bản đồ
- Giờ mở cửa
- Liên hệ

#### 3.2.2. Phía quản trị (Admin Features)

**1. Đăng nhập Admin (AdminLoginPage)**
- Form đăng nhập với username/password
- JWT authentication
- Session management
- Protected routes

**2. Dashboard (AdminDashboard)**
- Tổng quan thống kê
- Số đơn đặt bàn hôm nay
- Số đơn đặt món trước
- Doanh thu (tương lai)

**3. Quản lý món ăn (AdminDishesPage)**
- CRUD operations: Create, Read, Update, Delete
- Upload hình ảnh
- Phân loại theo category
- Cập nhật giá

**4. Quản lý đặt bàn (AdminReservationsPage)**
- Danh sách đặt bàn
- Cập nhật trạng thái: pending → confirmed → done
- Hủy đặt bàn
- Tìm kiếm theo ngày/tên

**5. Quản lý đặt món trước (AdminPreOrdersPage)**
- Danh sách đơn đặt trước
- Cập nhật trạng thái: pending → confirmed → ready → completed
- Chi tiết đơn hàng
- In hóa đơn

**6. Quản lý khuyến mãi (AdminPromotionsPage)**
- Tạo/sửa/xóa khuyến mãi
- Thiết lập thời gian hiệu lực
- Bật/tắt khuyến mãi

### 3.3. Authentication & Authorization

#### 3.3.1. Quy trình đăng nhập
```
1. User nhập username + password
2. Frontend gửi POST /api/auth/login
3. Backend kiểm tra credentials
4. Nếu hợp lệ: bcrypt.compare(password, hashedPassword)
5. Tạo JWT token với payload: { id, username, role }
6. Trả về token cho client
7. Client lưu token vào localStorage
8. Các request sau gửi kèm header: Authorization: Bearer <token>
```

#### 3.3.2. Middleware Authentication
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
```

### 3.4. Xử lý CORS

Backend được cấu hình CORS để chấp nhận requests từ frontend:

```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

---

## CHƯƠNG 4: DEPLOYMENT & PRODUCTION

### 4.1. Môi trường Development

**Backend:**
```bash
cd backend
npm install
npm run dev          # Chạy với nodemon
```

**Frontend:**
```bash
cd frontend
npm install
npm start           # Chạy React dev server
```

**Import dữ liệu mẫu:**
```bash
npm run import:data
```

**Tạo admin mặc định:**
```bash
cd backend
npm run seed:admin
```

### 4.2. Môi trường Production

#### 4.2.1. Deployment trên Vercel

**Backend Deployment:**
- Serverless Functions
- vercel.json configuration:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

**Frontend Deployment:**
- Static site generation
- Automatic builds on git push
- Environment variables trên Vercel dashboard

#### 4.2.2. Database - MongoDB Atlas

**Connection String:**
```
mongodb+srv://<username>:<password>@cluster.mongodb.net/heneidimsum
```

**Security Features:**
- IP Whitelist
- Database user authentication
- Encryption at rest
- Automated backups

### 4.3. Environment Variables

**Backend (.env):**
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=henei_dimsum_secret_key
PORT=5000
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@henei.com
ADMIN_PASSWORD=Henei@2024
```

**Frontend (.env):**
```
REACT_APP_API_URL=https://api.heneidimsum.com
```

---

## CHƯƠNG 5: TESTING & QUALITY ASSURANCE

### 5.1. Unit Testing
- Jest & React Testing Library cho frontend
- Mocha/Chai cho backend (tương lai)

### 5.2. Integration Testing
- Test API endpoints
- Test database operations
- Test authentication flow

### 5.3. Manual Testing Checklist

**Frontend:**
- [ ] Responsive trên mobile, tablet, desktop
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari)
- [ ] Form validation
- [ ] Navigation links
- [ ] Image loading
- [ ] API error handling

**Backend:**
- [ ] CRUD operations cho tất cả models
- [ ] Authentication & authorization
- [ ] Error handling
- [ ] Data validation
- [ ] CORS configuration

---

## CHƯƠNG 6: BẢO MẬT & PERFORMANCE

### 6.1. Bảo mật

**Implemented:**
- ✅ JWT authentication
- ✅ bcryptjs password hashing
- ✅ Environment variables cho sensitive data
- ✅ CORS configuration
- ✅ Input validation

**To be implemented:**
- ⏳ Rate limiting
- ⏳ HTTPS enforcement
- ⏳ SQL injection prevention (NoSQL)
- ⏳ XSS protection
- ⏳ CSRF tokens

### 6.2. Performance Optimization

**Frontend:**
- React.memo cho components
- Lazy loading cho images
- Code splitting
- Minification & bundling

**Backend:**
- Database indexing
- Caching với Redis (tương lai)
- Query optimization
- Compression middleware

---

## CHƯƠNG 7: KẾT LUẬN

### 7.1. Kết quả đạt được

Dự án Henei Dimsum đã hoàn thành các mục tiêu chính:

1. ✅ **Xây dựng hệ thống Full-Stack hoàn chỉnh**
   - Frontend React với UI/UX hiện đại
   - Backend RESTful API với Node.js/Express
   - Database MongoDB với schemas được thiết kế tốt

2. ✅ **Triển khai các tính năng cốt lõi**
   - Hiển thị menu với tìm kiếm và lọc
   - Đặt bàn trực tuyến
   - Đặt món trước
   - Quản lý khuyến mãi
   - Hệ thống admin đầy đủ

3. ✅ **Security & Authentication**
   - JWT-based authentication
   - Password encryption
   - Protected admin routes

4. ✅ **Deployment**
   - Deploy thành công lên Vercel
   - MongoDB Atlas cloud database
   - Environment configuration

### 7.2. Hạn chế và cải tiến

**Hạn chế hiện tại:**
- Chưa có payment gateway
- Chưa có email/SMS notification
- Chưa có real-time updates (WebSocket)
- Chưa có analytics/reporting dashboard
- Chưa có review & rating system

**Kế hoạch phát triển tương lai:**

**Phase 1 (1-2 tháng):**
- [ ] Tích hợp payment gateway (Stripe/PayPal)
- [ ] Email notification với SendGrid
- [ ] SMS notification với Twilio
- [ ] Unit tests coverage > 80%

**Phase 2 (3-4 tháng):**
- [ ] Real-time order tracking với Socket.io
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Customer review system

**Phase 3 (5-6 tháng):**
- [ ] AI chatbot customer support
- [ ] Recommendation engine
- [ ] Loyalty program
- [ ] Multi-language support

### 7.3. Kinh nghiệm rút ra

**Technical:**
- Kiến trúc MVC giúp code dễ maintain và scale
- MongoDB phù hợp với dữ liệu flexible
- React Context API đủ cho state management đơn giản
- Vercel deployment rất nhanh và tiện lợi

**Teamwork:**
- Git workflow quan trọng
- Documentation cần được update thường xuyên
- Code review giúp quality code tốt hơn

**Project Management:**
- Chia nhỏ features thành tasks
- Daily standup giúp sync tiến độ
- Testing sớm giúp phát hiện bugs

### 7.4. Đánh giá tổng quan

Dự án Henei Dimsum là một hệ thống đặt món dimsum trực tuyến hoàn chỉnh, được xây dựng với các công nghệ hiện đại và best practices. Hệ thống có khả năng mở rộng tốt, bảo mật, và đáp ứng được nhu cầu thực tế của một nhà hàng dimsum.

Mã nguồn được tổ chức rõ ràng, dễ bảo trì, và có thể phát triển thêm nhiều tính năng trong tương lai. Dự án là nền tảng tốt để học tập về Full-Stack Development và có thể ứng dụng thực tế trong kinh doanh.

---

## PHỤ LỤC

### A. Tài liệu tham khảo
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [Vercel Documentation](https://vercel.com/docs)

### B. Dependencies chính
```json
{
  "backend": {
    "express": "^5.1.0",
    "mongoose": "^8.19.3",
    "jsonwebtoken": "^9.0.3",
    "bcryptjs": "^3.0.3",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3"
  },
  "frontend": {
    "react": "^19.2.0",
    "react-router-dom": "^7.9.5",
    "axios": "^1.13.2"
  }
}
```

### C. Thông tin liên hệ
- **Email**: admin@henei.com
- **GitHub**: https://github.com/your-username/henei-dimsum
- **Website**: https://heneidimsum.com

---

*Báo cáo được hoàn thành ngày: 20/12/2025*
*Phiên bản: 1.0*
