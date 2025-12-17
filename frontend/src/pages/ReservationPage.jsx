import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReservationPage.css";

const ReservationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    reservationDate: "",
    reservationTime: "",
    numberOfGuests: 2,
    tablePreference: "Không yêu cầu",
    specialRequests: ""
  });

  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "17:30", "18:00", "18:30",
    "19:00", "19:30", "20:00", "20:30", "21:00"
  ];

  const tablePreferences = [
    "Không yêu cầu",
    "Bàn VIP",
    "Bàn gần cửa sổ",
    "Bàn riêng tư",
    "Bàn ngoài trời",
    "Bàn có ghế trẻ em"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.reservationDate || !formData.reservationTime) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email
          },
          reservationDate: formData.reservationDate,
          reservationTime: formData.reservationTime,
          numberOfGuests: formData.numberOfGuests,
          tablePreference: formData.tablePreference,
          specialRequests: formData.specialRequests
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert(`🎉 Đặt bàn thành công!\n\nMã đặt bàn: ${data.reservationId}\n\nChúng tôi sẽ gọi xác nhận trong thời gian sớm nhất.`);
        navigate("/");
      } else {
        const error = await response.json();
        alert("❌ Lỗi: " + error.message);
      }
    } catch (err) {
      alert("❌ Không thể kết nối đến server.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Tính ngày tối thiểu (hôm nay)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="reservation-container">
      <div className="reservation-header">
        <h1>🍽️ Đặt Bàn</h1>
        <p>Đặt bàn trước để đảm bảo chỗ ngồi tốt nhất</p>
      </div>

      <form onSubmit={handleSubmit} className="reservation-form">
        <div className="form-section">
          <h3>Thông tin khách hàng</h3>
          
          <div className="form-group">
            <label>Họ tên <span className="required">*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              required
            />
          </div>

          <div className="form-group">
            <label>Số điện thoại <span className="required">*</span></label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0912345678"
              required
            />
          </div>

          <div className="form-group">
            <label>Email (không bắt buộc)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Thông tin đặt bàn</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Ngày đến <span className="required">*</span></label>
              <input
                type="date"
                name="reservationDate"
                value={formData.reservationDate}
                onChange={handleChange}
                min={today}
                required
              />
            </div>

            <div className="form-group">
              <label>Giờ đến <span className="required">*</span></label>
              <select
                name="reservationTime"
                value={formData.reservationTime}
                onChange={handleChange}
                required
              >
                <option value="">Chọn giờ</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Số lượng khách <span className="required">*</span></label>
              <input
                type="number"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleChange}
                min="1"
                max="20"
                required
              />
            </div>

            <div className="form-group">
              <label>Loại bàn mong muốn</label>
              <select
                name="tablePreference"
                value={formData.tablePreference}
                onChange={handleChange}
              >
                {tablePreferences.map(pref => (
                  <option key={pref} value={pref}>{pref}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Yêu cầu đặc biệt</label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Sinh nhật, ăn chay, dị ứng thực phẩm..."
              rows="4"
            />
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Đang xử lý..." : "✅ Xác nhận đặt bàn"}
        </button>

        <div className="reservation-note">
          <p>📌 Lưu ý:</p>
          <ul>
            <li>Vui lòng đến đúng giờ, chúng tôi chỉ giữ bàn trong 15 phút</li>
            <li>Nếu cần hủy hoặc thay đổi, vui lòng liên hệ: <a href="tel:0967582566">0967.582.566</a></li>
            <li>Đặt bàn từ 10 người trở lên vui lòng gọi trực tiếp</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default ReservationPage;
