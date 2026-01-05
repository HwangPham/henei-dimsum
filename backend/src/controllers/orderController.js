const Order = require('../models/Order');
const Dish = require('../models/Dish');

// GET /api/orders – Lấy tất cả đơn hàng
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy đơn hàng', error });
  }
};

// POST /api/orders – Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  try {
    const { items, customer, totalPrice } = req.body;

    // Kiểm tra tính hợp lệ của items
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Giỏ hàng trống!' });
    }

    // Tạo đơn hàng mới theo đúng schema trong Order.js
    const newOrder = new Order({
      items,
      customer,
      totalPrice
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi khi tạo đơn hàng', error: error.message });
  }
};

