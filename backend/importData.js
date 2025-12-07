const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Dish = require("./src/models/Dish");
const fs = require("fs");
const path = require("path");

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const loadData = async () => {
  try {
    await Dish.deleteMany();

    const files = [
      "menuData_chien.json",
      "menuData_hap.json",
      "menuData_xao.json",
      "menuData_my.json",
      "menuData_nuoc.json",
    ];

    for (const file of files) {
      const filePath = path.join(__dirname, "src", "data", file);
      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      await Dish.insertMany(jsonData);
    }

    console.log("✅ Dữ liệu đã được import thành công.");
    process.exit();
  } catch (error) {
    console.error("❌ Lỗi khi import dữ liệu:", error);
    process.exit(1);
  }
};

loadData();
