// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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
          to="/reservation"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Đặt Bàn
        </NavLink>

        <NavLink
          to="/preorder"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Đặt Hàng
        </NavLink>

        <NavLink
          to="/promotions"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Ưu Đãi
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Giới Thiệu
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
