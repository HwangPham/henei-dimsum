import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-container">
      <img src="/quang_cao_1.webp" alt="Dimsum HongKong" className="home-banner" />

      <section className="home-intro">
        <h2>Trải nghiệm dimsum chuẩn vị Hong Kong</h2>
        <p>
          HENEI DIMSUM – nơi những hương vị Hồng Kông tinh tế được tái hiện trong từng xửng dimsum nóng hổi.
          Một buổi ăn trọn vẹn không chỉ là món ngon, mà là khoảng lặng ấm áp giữa nhịp sống vội vã.
        </p>
        <p>📍 63 Tô Hiến Thành, Hai Bà Trưng, Hà Nội</p>
        <p>📞 Hotline: <a href="tel:0967582566">0967.582.566</a></p>

        <Link to="/menu" className="home-button">🍽 Xem thực đơn</Link>
      </section>

      <img src="/quang_cao_2.webp" alt="Dimsum trải nghiệm" className="home-banner" />
    </div>
  );
};

export default HomePage;
