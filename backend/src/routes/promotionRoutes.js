// routes/promotionRoutes.js
const express = require('express');
const router = express.Router();
const Promotion = require('../models/Promotion');

// GET /api/promotions - Lấy tất cả khuyến mãi đang hoạt động
router.get('/', async (req, res) => {
  try {
    const now = new Date();
    const promotions = await Promotion.find({
      isActive: true,
      validFrom: { $lte: now },
      validTo: { $gte: now }
    }).sort({ createdAt: -1 });
    res.json(promotions);
  } catch (error) {
    console.error('Lỗi lấy khuyến mãi:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

// GET /api/promotions/:id - Lấy chi tiết khuyến mãi
router.get('/:id', async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: 'Không tìm thấy khuyến mãi.' });
    }
    res.json(promotion);
  } catch (error) {
    console.error('Lỗi lấy khuyến mãi:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

// POST /api/promotions - Tạo khuyến mãi mới (admin)
router.post('/', async (req, res) => {
  try {
    const promotion = new Promotion(req.body);
    await promotion.save();
    res.status(201).json({
      message: 'Tạo khuyến mãi thành công!',
      promotion
    });
  } catch (error) {
    console.error('Lỗi tạo khuyến mãi:', error);
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
});

// PUT /api/promotions/:id - Cập nhật khuyến mãi (admin)
router.put('/:id', async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!promotion) {
      return res.status(404).json({ message: 'Không tìm thấy khuyến mãi.' });
    }
    res.json(promotion);
  } catch (error) {
    console.error('Lỗi cập nhật khuyến mãi:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

// DELETE /api/promotions/:id - Xóa khuyến mãi (admin)
router.delete('/:id', async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) {
      return res.status(404).json({ message: 'Không tìm thấy khuyến mãi.' });
    }
    res.json({ message: 'Đã xóa khuyến mãi thành công.' });
  } catch (error) {
    console.error('Lỗi xóa khuyến mãi:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

module.exports = router;
