// src/controllers/menuController.js
const Menu = require('../models/Menu');

// GET /api/menu – Lấy danh sách món
exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách món', error });
  }
};

// POST /api/menu – Thêm món mới
exports.createMenu = async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;
    const newMenu = new Menu({ name, price, description, imageUrl });
    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm món', error });
  }
};

// PUT /api/menu/:id – Cập nhật món
exports.updateMenu = async (req, res) => {
  try {
    const menuId = req.params.id;
    const { name, price, description, imageUrl } = req.body;
    const updatedMenu = await Menu.findByIdAndUpdate(
      menuId,
      { name, price, description, imageUrl },
      { new: true }
    );
    if (!updatedMenu) {
      return res.status(404).json({ message: 'Không tìm thấy món' });
    }
    res.json(updatedMenu);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật món', error });
  }
};

// DELETE /api/menu/:id – Xóa món
exports.deleteMenu = async (req, res) => {
  try {
    const menuId = req.params.id;
    const deletedMenu = await Menu.findByIdAndDelete(menuId);
    if (!deletedMenu) {
      return res.status(404).json({ message: 'Không tìm thấy món để xóa' });
    }
    res.json({ message: 'Xóa món thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa món', error });
  }
};
