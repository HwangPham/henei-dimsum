import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { ordersAPI } from "../services/api";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    note: ""
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customer.name || !customer.phone) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const orderData = {
      items: cartItems.map(item => ({
        dishId: item._id || item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      customer,
      totalPrice: totalPrice
    };

    try {
      await ordersAPI.createOrder(orderData);
      alert("🎉 Đơn hàng của bạn đã được ghi nhận!\nChúng tôi sẽ liên hệ sớm nhất.");
      clearCart();
      navigate("/");
    } catch (err) {
      alert("❌ Không thể gửi đơn hàng. Vui lòng thử lại.");
      console.error("Order error:", err);
    }
  };

  return (
    <div className="checkout-container">
      <h2>🧾 Xác nhận đơn hàng</h2>

      <div className="order-summary">
        {cartItems.map((item) => (
          <div key={item.id} className="order-item">
            <span>{item.name}</span>
            <span>{item.quantity} × {item.price.toLocaleString()} đ</span>
          </div>
        ))}
        <hr />
        <strong>Tổng cộng: {totalPrice.toLocaleString()} đ</strong>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <input
          type="text"
          name="name"
          placeholder="Họ tên"
          value={customer.name}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Số điện thoại"
          value={customer.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="note"
          placeholder="Ghi chú (nếu có)..."
          value={customer.note}
          onChange={handleChange}
        ></textarea>
        <button type="submit">✅ Gửi đơn hàng</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
