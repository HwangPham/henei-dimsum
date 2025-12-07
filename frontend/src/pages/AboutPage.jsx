import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-image" />
      
      <div className="about-content">
        <h2>🥢 Giới thiệu</h2>
        <h3>📍 HENEI DIMSUM</h3>
        <p>
          Thưởng thức Dimsum chuẩn vị Hong Kong giữa lòng Hà Nội!
        </p>

        <ul>
          <li>🍜 Không gian <strong>sang trọng – ấm cúng</strong>, phù hợp cho cả hẹn hò, gặp gỡ bạn bè, hay bữa ăn gia đình.</li>
          <li>💰 <strong>Giá cả bình dân</strong> – chất lượng chuẩn nhà hàng.</li>
          <li>📞 <strong>Đặt bàn ngay:</strong> <a href="tel:0967582566">0967 582 566</a></li>
        </ul>

        <div className="about-divider" />

        <div className="about-info">
          <p>🏠 Địa chỉ: số 63 Tô Hiến Thành, Hai Bà Trưng, Hà Nội</p>
          <p>📧 Email: <a href="mailto:heneidimsum@gmail.com">heneidimsum@gmail.com</a></p>
          <p>☎️ Điện thoại: <a href="tel:0967582566">096 758 25 66</a></p>

          <p>📱 Mạng xã hội:</p>
          <ul>
            <li>
              Facebook:{" "}
              <a href="https://www.facebook.com/profile.php?id=61580212877418" target="_blank" rel="noopener noreferrer">
                Fanpage Henei Dimsum
              </a>
            </li>
            <li>
              TikTok:{" "}
              <a href="https://tiktok.com/@heneidimsum" target="_blank" rel="noopener noreferrer">
                @heneidimsum
              </a>
            </li>
          </ul>

          <p>💬 Trang · Nhà hàng Dimsum · Nhà hàng Quảng Đông · Nhà hàng</p>
        </div>

        <div className="about-actions">
          <a href="tel:0967582566" className="book-button">
            📞 Gọi đặt bàn ngay
          </a>
        </div>

        <div className="about-map">
            <iframe
                title="Henei Dimsum Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.456551410957!2d105.849179!3d21.013019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8ba2db53ad%3A0x2fa589c64c926fa5!2zNjMgVMO0IEjhuqVuIFRow6BuaCwgSGFpIELDoCBUcsawbmcsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1701951655055!5m2!1svi!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
