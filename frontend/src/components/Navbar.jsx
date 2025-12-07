// src/components/Navbar.jsx
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="navbar-logo">
          <img src="/icon.webp" alt="Henei Dimsum" />
        </NavLink>
      </div>

      <div className={`navbar-center ${menuOpen ? "open" : ""}`}>
        <NavLink
          to="/menu"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Thực Đơn
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Giới Thiệu
        </NavLink>

        {/* 👇 Link quản lý đơn cho admin */}
        <NavLink
          to="/admin/orders"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Quản Lý Đơn
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "active-link cart-link" : "cart-link"
          }
        >
          🛒
          {totalItems > 0 && (
            <span className="cart-count">{totalItems}</span>
          )}
        </NavLink>
      </div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen((open) => !open)}
      >
        ☰
      </button>
    </nav>
  );
};

export default Navbar;
