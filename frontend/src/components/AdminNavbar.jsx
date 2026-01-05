import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
    const navigate = useNavigate();
    const adminName = localStorage.getItem("adminName") || "Admin";

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminName");
        navigate("/admin/login");
    };

    return (
        <nav className="admin-navbar">
            <div className="admin-navbar-brand">
                <NavLink to="/admin/dashboard" className="brand-link">
                    <img src="/icon.webp" alt="Henei Dimsum" />
                    <span>Henei Admin</span>
                </NavLink>
            </div>

            <div className="admin-navbar-links">
                <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
                    🏠 Dashboard
                </NavLink>
                <NavLink to="/admin/reservations" className={({ isActive }) => isActive ? "active" : ""}>
                    🍽️ Đặt bàn
                </NavLink>
                <NavLink to="/admin/preorders" className={({ isActive }) => isActive ? "active" : ""}>
                    📦 Đặt hàng
                </NavLink>
                <NavLink to="/admin/dishes" className={({ isActive }) => isActive ? "active" : ""}>
                    🍜 Thực đơn
                </NavLink>
                <NavLink to="/admin/promotions" className={({ isActive }) => isActive ? "active" : ""}>
                    🎁 Ưu đãi
                </NavLink>
            </div>

            <div className="admin-navbar-user">
                <span className="user-name">Chào, {adminName}</span>
                <button onClick={handleLogout} className="btn-logout-small">Đăng xuất</button>
            </div>
        </nav>
    );
};

export default AdminNavbar;
