// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// POST /api/reservations - Tạo đặt bàn mới
router.post('/', async (req, res) => {
  try {
    const { customer, reservationDate, reservationTime, numberOfGuests, tablePreference, specialRequests } = req.body;

    if (!customer || !customer.name || !customer.phone) {
      return res.status(400).json({ message: 'Thông tin khách hàng không đầy đủ.' });
    }

    if (!reservationDate || !reservationTime || !numberOfGuests) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin đặt bàn.' });
    }

    const reservation = new Reservation({
      customer,
      reservationDate,
      reservationTime,
      numberOfGuests,
      tablePreference: tablePreference || 'Không yêu cầu',
      specialRequests
    });

    await reservation.save();

    res.status(201).json({
      message: 'Đặt bàn thành công! Chúng tôi sẽ liên hệ xác nhận sớm nhất.',
      reservationId: reservation._id,
      reservation
    });
  } catch (error) {
    console.error('Lỗi tạo đặt bàn:', error);
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
});

// GET /api/reservations/:id - Lấy thông tin đặt bàn
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Không tìm thấy đặt bàn.' });
    }
    res.json(reservation);
  } catch (error) {
    console.error('Lỗi lấy đặt bàn:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

// GET /api/reservations - Lấy tất cả đặt bàn (cho admin)
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ reservationDate: -1 });
    res.json(reservations);
  } catch (error) {
    console.error('Lỗi lấy danh sách đặt bàn:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

// PUT /api/reservations/:id/status - Cập nhật trạng thái đặt bàn
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!reservation) {
      return res.status(404).json({ message: 'Không tìm thấy đặt bàn.' });
    }
    res.json(reservation);
  } catch (error) {
    console.error('Lỗi cập nhật trạng thái:', error);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

module.exports = router;
