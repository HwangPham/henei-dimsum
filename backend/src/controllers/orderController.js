// src/controllers/orderController.js
const Order = require('../models/Order');
const Menu = require('../models/Menu');

// GET /api/orders – Lấy tất cả đơn hàng
exports.getOrders = async (req, res) => {
  try {
    // populate thông tin món trong đơn hàng nếu cần
    const orders = await Order.find().populate('items.menuItem');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy đơn hàng', error });
  }
};

// POST /api/orders – Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body; // items là mảng { menuItem: id, quantity }
    // Tính tổng tiền
    let totalPrice = 0;
    // Lấy thông tin tất cả món trong đơn
    const menuIds = items.map(item => item.menuItem);
    const menuDocs = await Menu.find({ _id: { $in: menuIds } });

    // Tính tổng dựa trên giá của từng món
    items.forEach(item => {
      const menuDoc = menuDocs.find(m => m.id === item.menuItem);
      if (menuDoc) {
        totalPrice += menuDoc.price * item.quantity;
      }
    });

    // Tạo đơn hàng mới
    const newOrder = new Order({ items, totalPrice });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo đơn hàng', error });
  }
};
