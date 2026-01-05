import React, { useState, useEffect } from "react";
import "./MenuPage.css";

const categories = [
  { id: "chien", name: "Món Chiên", images: ["/images/chien/chien-new-1.webp", "/images/chien/chien-new-2.webp"] },
  { id: "hap", name: "Món Hấp", images: ["/images/hap/hap-new-1.webp", "/images/hap/hap-new-2.webp"] },
  { id: "xao", name: "Món Xào & Cơm", images: ["/images/xao/xao-com.webp", "/images/xao/xao-new.webp"] },
  { id: "my", name: "Món Mỳ", images: ["/images/my/my-new.webp"] },
  { id: "nuoc", name: "Đồ Uống", images: ["/images/nuoc/drink.webp"] },
];

const CategorySection = ({ cat }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % cat.images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? cat.images.length - 1 : prev - 1));
  };

  return (
    <div id={cat.id} className="menu-category">
      <h2>{cat.name}</h2>
      <div className="menu-image-container">
        <img src={cat.images[currentIndex]} alt={cat.name} className="menu-image" />

        {cat.images.length > 1 && (
          <>
            <button className="nav-btn prev-btn" onClick={prevImage}>❮</button>
            <button className="nav-btn next-btn" onClick={nextImage}>❯</button>
            <div className="image-dots">
              {cat.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`dot ${idx === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const MenuPage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>THỰC ĐƠN</h1>
        <p>Menu đặc sắc với hương vị Hồng Kông chính gốc</p>
      </div>

      <div className="menu-sidebar">
        {categories.map((cat) => (
          <a key={cat.id} href={`#${cat.id}`} className="sidebar-link">
            {cat.name}
          </a>
        ))}
      </div>

      <div className="menu-content">
        {categories.map((cat) => (
          <CategorySection key={cat.id} cat={cat} />
        ))}
      </div>

      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default MenuPage;
