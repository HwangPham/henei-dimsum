import React, { useState, useEffect } from "react";
import DishCard from "../components/DishCard";
import "./MenuPage.css";
import { dishesAPI } from "../services/api";

const categories = ["Tất cả", "Chiên", "Hấp", "Xào", "Mỳ", "Nước"];

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dishes từ backend khi component mount
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);
        const dishes = await dishesAPI.getAllDishes();
        setMenuData(dishes);
        setError(null);
      } catch (err) {
        setError("Không thể tải dữ liệu món ăn. Vui lòng thử lại sau.");
        console.error("Error loading dishes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  const filteredMenu = menuData.filter((dish) => {
    const matchesCategory =
      selectedCategory === "Tất cả" || dish.category === selectedCategory;
    const matchesSearch =
      dish.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-container">
        <h2 className="menu-heading">Thực đơn Henei Dimsum</h2>

        <div className="menu-nav">
        {categories.map((cat) => (
            <button
                key={cat}
                className={selectedCategory === cat ? "active" : ""}
                onClick={() => setSelectedCategory(cat)}
            >
                {cat}
            </button>
        ))}
        </div>

        <div className="menu-search">
            <input
                type="text"
                placeholder="Tìm món theo tên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {loading && <div className="loading">Đang tải món ăn...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && !error && (
          <div className="menu-grid">
              {filteredMenu.map((dish) => (
                <DishCard key={dish._id} dish={dish} />
              ))}
          </div>
        )}
    </div>

    );
};

export default MenuPage;
