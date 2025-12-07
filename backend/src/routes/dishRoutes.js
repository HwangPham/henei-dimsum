// routes/dishRoutes.js
const express = require("express");
const router = express.Router();
const Dish = require("../models/Dish");

// GET tất cả món ăn
router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST thêm món ăn
router.post("/", async (req, res) => {
  try {
    const newDish = new Dish(req.body);
    const saved = await newDish.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT cập nhật món
router.put("/:id", async (req, res) => {
  try {
    const updated = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE món
router.delete("/:id", async (req, res) => {
  try {
    await Dish.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa món." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
