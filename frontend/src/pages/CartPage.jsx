import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "./CartPage.css";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate(); // ✅ Đảm bảo navigate được khai báo đúng

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>🛒 Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <p>Chưa có món nào trong giỏ.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Món</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price.toLocaleString()} đ</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                  </td>
                  <td>{(item.price * item.quantity).toLocaleString()} đ</td>
                  <td>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Tổng cộng: {total.toLocaleString()} đ</h3>
            <button className="checkout-button" onClick={() => navigate("/checkout")}>
              ➡️ Tiến hành thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );    
};

export default CartPage;
