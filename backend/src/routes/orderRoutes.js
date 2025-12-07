// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders - Tạo đơn hàng mới
router.post('/', async (req, res) => {
  try {
    const { items, customer, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Giỏ hàng rỗng.' });
    }

    if (!customer || !customer.name || !customer.phone) {
      return res.status(400).json({ message: 'Thông tin khách hàng không đầy đủ.' });
    }

    const order = new Order({
      items,
      customer,
      totalPrice
      // status sẽ mặc định là "pending"
    });

    await order.save();

    res.status(201).json({
      message: 'Đặt hàng thành công!',
      orderId: order._id,
      order
    });
  } catch (error) {
    console.error('Lỗi tạo đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
});

// GET /api/orders/:id - Lấy thông tin đơn hàng
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
    }
    res.json(order);
  } catch (error) {
    console.error('Lỗi lấy đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

// GET /api/orders - Lấy tất cả đơn hàng (cho admin) + có thể lọc status
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Lỗi lấy danh sách đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

// PATCH /api/orders/:id/status - Cập nhật trạng thái đơn hàng
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Thiếu trạng thái mới.' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
    }

    res.json(order);
  } catch (error) {
    console.error('Lỗi cập nhật đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

module.exports = router;
