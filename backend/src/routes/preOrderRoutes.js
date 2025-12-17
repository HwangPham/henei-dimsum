// routes/preOrderRoutes.js
const express = require('express');
const router = express.Router();
const PreOrder = require('../models/PreOrder');

// POST /api/preorders - Tạo đặt hàng trước mới
router.post('/', async (req, res) => {
  try {
    const { customer, pickupDate, pickupTime, items, totalPrice, paymentMethod, specialRequests } = req.body;

    if (!customer || !customer.name || !customer.phone) {
      return res.status(400).json({ message: 'Thông tin khách hàng không đầy đủ.' });
    }

    if (!pickupDate || !pickupTime) {
      return res.status(400).json({ message: 'Vui lòng chọn ngày và giờ nhận hàng.' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Vui lòng chọn món ăn.' });
    }

    const preOrder = new PreOrder({
      customer,
      pickupDate,
      pickupTime,
      items,
      totalPrice,
      paymentMethod: paymentMethod || 'Thanh toán khi nhận',
      specialRequests
    });

    await preOrder.save();

    res.status(201).json({
      message: 'Đặt hàng thành công! Vui lòng đến nhận hàng đúng giờ.',
      preOrderId: preOrder._id,
      preOrder
    });
  } catch (error) {
    console.error('Lỗi tạo đặt hàng:', error);
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
});

// GET /api/preorders/:id - Lấy thông tin đặt hàng
router.get('/:id', async (req, res) => {
  try {
    const preOrder = await PreOrder.findById(req.params.id);
    if (!preOrder) {
      return res.status(404).json({ message: 'Không tìm thấy đơn đặt hàng.' });
    }
    res.json(preOrder);
  } catch (error) {
    console.error('Lỗi lấy đơn đặt hàng:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

// GET /api/preorders - Lấy tất cả đơn đặt hàng (cho admin)
router.get('/', async (req, res) => {
  try {
    const preOrders = await PreOrder.find().sort({ pickupDate: -1 });
    res.json(preOrders);
  } catch (error) {
    console.error('Lỗi lấy danh sách đặt hàng:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

// PUT /api/preorders/:id/status - Cập nhật trạng thái đơn hàng
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const preOrder = await PreOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!preOrder) {
      return res.status(404).json({ message: 'Không tìm thấy đơn đặt hàng.' });
    }
    res.json(preOrder);
  } catch (error) {
    console.error('Lỗi cập nhật trạng thái:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

module.exports = router;
