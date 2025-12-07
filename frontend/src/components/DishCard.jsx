import React, { useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import "./DishCard.css";

const DishCard = ({ dish }) => {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useContext(CartContext);

  return (
    <div
      className={`dish-card ${hovered ? "hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
        <img src={dish.image} alt={dish.name} className="dish-image" />

        <div className="dish-info">
            <div className="dish-name">{dish.name}</div>
            <div className="dish-desc">{dish.description}</div>

            <div className="dish-bottom">
                <div className="dish-price">{dish.price.toLocaleString()} đ</div>
                <button onClick={() => addToCart(dish)} className="add-button">
                    + Thêm vào giỏ
                </button>
            </div>
        </div>

    </div>
  );
};

export default DishCard;