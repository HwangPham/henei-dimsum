// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/create-admin (chỉ dùng lần đầu)
router.post('/create-admin', authController.createDefaultAdmin);

module.exports = router;
