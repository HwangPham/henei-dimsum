// src/routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const {
  getMenus,
  createMenu,
  updateMenu,
  deleteMenu
} = require('../controllers/menuController');
const auth = require('../middleware/auth');
// Định nghĩa các route cho thực đơn
router.get('/', getMenus);
router.post('/', auth, createMenu);
router.put('/:id', auth, updateMenu);
router.delete('/:id', auth, deleteMenu);

module.exports = router;
