// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import ReservationPage from "./pages/ReservationPage";
import PreOrderPage from "./pages/PreOrderPage";
import PromotionsPage from "./pages/PromotionsPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminReservationsPage from "./pages/AdminReservationsPage";
import AdminPreOrdersPage from "./pages/AdminPreOrdersPage";
import AdminDishesPage from "./pages/AdminDishesPage";
import AdminPromotionsPage from "./pages/AdminPromotionsPage";

import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes với Navbar */}
        <Route path="/" element={<><Navbar /><HomePage /></>} />
        <Route path="/menu" element={<><Navbar /><MenuPage /></>} />
        <Route path="/reservation" element={<><Navbar /><ReservationPage /></>} />
        <Route path="/preorder" element={<><Navbar /><PreOrderPage /></>} />
        <Route path="/promotions" element={<><Navbar /><PromotionsPage /></>} />
        <Route path="/about" element={<><Navbar /><AboutPage /></>} />

        {/* Admin routes không có Navbar */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/reservations" element={<AdminReservationsPage />} />
        <Route path="/admin/preorders" element={<AdminPreOrdersPage />} />
        <Route path="/admin/dishes" element={<AdminDishesPage />} />
        <Route path="/admin/promotions" element={<AdminPromotionsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
