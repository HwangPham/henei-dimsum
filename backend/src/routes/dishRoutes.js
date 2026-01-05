// routes/dishRoutes.js
const express = require("express");
const router = express.Router();
const Dish = require("../models/Dish");
const auth = require("../middleware/auth");

// GET tất cả món ăn
router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find().sort({ createdAt: -1 });
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST thêm món ăn (Admin only)
router.post("/", auth, async (req, res) => {
  try {
    const newDish = new Dish(req.body);
    const saved = await newDish.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT cập nhật món (Admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy món ăn" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE món (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Dish.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy món ăn" });
    }
    res.json({ message: "Đã xóa món." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
