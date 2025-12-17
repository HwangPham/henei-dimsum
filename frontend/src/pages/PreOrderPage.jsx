import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PreOrderPage.css";

const PreOrderPage = () => {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    paymentMethod: "Thanh toán khi nhận",
    specialRequests: ""
  });

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dishes");
      const data = await response.json();
      setDishes(data);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = (dish) => {
    const existingItem = selectedItems.find(item => item._id === dish._id);
    if (existingItem) {
      setSelectedItems(selectedItems.map(item =>
        item._id === dish._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setSelectedItems([...selectedItems, { ...dish, quantity: 1 }]);
    }
  };

  const removeItem = (dishId) => {
    setSelectedItems(selectedItems.filter(item => item._id !== dishId));
  };

  const updateQuantity = (dishId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(dishId);
      return;
    }
    setSelectedItems(selectedItems.map(item =>
      item._id === dishId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một món.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/preorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email
          },
          deliveryAddress: formData.address,
          items: selectedItems.map(item => ({
            dishId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          totalPrice,
          paymentMethod: formData.paymentMethod,
          specialRequests: formData.specialRequests
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert(`🎉 Đặt hàng thành công!\n\nMã đơn: ${data.preOrderId}\nTổng tiền: ${totalPrice.toLocaleString()}đ\n\nVui lòng đến nhận hàng đúng giờ!`);
        navigate("/");
      } else {
        const error = await response.json();
        alert("❌ Lỗi: " + error.message);
      }
    } catch (err) {
      alert("❌ Không thể kết nối đến server.");
      console.error(err);
    }
  };

  return (
    <div className="preorder-container">
      <div className="preorder-header">
        <h1>📦 Đặt Hàng Trước</h1>
        <p>Đặt món trước, nhận hàng nhanh - không cần chờ đợi</p>
      </div>

      <div className="preorder-content">
        <div className="menu-selection">
          <h2>Chọn món</h2>
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            <div className="dishes-grid">
              {dishes.map(dish => (
                <div key={dish._id} className="dish-item">
                  <img src={dish.image} alt={dish.name} />
                  <div className="dish-info">
                    <h4>{dish.name}</h4>
                    <p className="dish-price">{dish.price.toLocaleString()}đ</p>
                    <button onClick={() => addItem(dish)} className="add-btn">+ Thêm</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="order-summary">
          <h2>Đơn hàng của bạn</h2>
          
          {selectedItems.length === 0 ? (
            <p className="empty-cart">Chưa có món nào được chọn</p>
          ) : (
            <>
              <div className="selected-items">
                {selectedItems.map(item => (
                  <div key={item._id} className="cart-item">
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>{item.price.toLocaleString()}đ</p>
                    </div>
                    <div className="item-controls">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                      <button onClick={() => removeItem(item._id)} className="remove-btn">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="total-price">
                <strong>Tổng cộng:</strong>
                <strong>{totalPrice.toLocaleString()}đ</strong>
              </div>

              <form onSubmit={handleSubmit} className="order-form">
                <h3>Thông tin nhận hàng</h3>
                
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Họ tên *"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Số điện thoại *"
                  required
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email (không bắt buộc)"
                />

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Địa chỉ giao hàng *"
                  rows="3"
                  required
                />

                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="Thanh toán khi nhận">Thanh toán khi nhận</option>
                  <option value="Chuyển khoản">Chuyển khoản</option>
                  <option value="Tiền mặt">Tiền mặt</option>
                </select>

                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Ghi chú (không cay, thêm rau...)"
                  rows="3"
                />

                <button type="submit" className="submit-btn">✅ Xác nhận đặt hàng</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreOrderPage;
