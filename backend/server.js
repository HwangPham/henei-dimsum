// server.js
const express = require('express');
const connectDB = require('./src/config/db');
const menuRoutes = require('./src/routes/menuRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const dishRoutes = require("./src/routes/dishRoutes");
const cors = require('cors');

require('dotenv').config();
const app = express();

// Kết nối database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Xử lý body JSON

// Định nghĩa routes
app.use("/api/dishes", dishRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);


// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy ở http://localhost:${PORT}`);
});
