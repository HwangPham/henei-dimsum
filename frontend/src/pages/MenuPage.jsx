import React, { useState, useEffect } from "react";
import "./MenuPage.css";

const menuCategories = [
  {
    id: "chien",
    name: "MÓN CHIÊN - FRIED DISHES",
    images: [
      "/images/chien/chien-new-1.webp",
      "/images/chien/chien-new-2.webp"
    ]
  },
  {
    id: "hap",
    name: "MÓN HẤP - STEAMED DISHES",
    images: [
      "/images/hap/hap-new-1.webp",
      "/images/hap/hap-new-2.webp"
    ]
  },
  {
    id: "xao",
    name: "MÓN XÀO - STIR-FRIED DISHES",
    images: [
      "/images/xao/xao-com.webp",
      "/images/xao/xao-new.webp"
    ]
  },
  {
    id: "my",
    name: "MÓN MỲ - NOODLES",
    images: [
      "/images/my/my-new.webp"
    ]
  },
  {
    id: "nuoc",
    name: "MÓN NƯỚC - DRINKS AND DESSERTS",
    images: [
      "/images/nuoc/drink.webp"
    ]
  }
];

const MenuPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const nextImage = (categoryId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [categoryId]: ((prev[categoryId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (categoryId, totalImages) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [categoryId]: ((prev[categoryId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>THỰC ĐƠN</h1>
        <p>Menu đặc sắc với hương vị Hồng Kông chính gốc</p>
      </div>

      <div className="menu-sidebar">
        {menuCategories.map((category) => (
          <a key={category.id} href={`#${category.id}`} className="sidebar-link">
            {category.name.split(' - ')[0]}
          </a>
        ))}
      </div>

      <div className="menu-content">
        {menuCategories.map((category) => {
          const currentIndex = currentImageIndex[category.id] || 0;
          return (
            <div key={category.id} id={category.id} className="menu-category">
              <h2>{category.name}</h2>
              <div className="menu-image-container">
                <img 
                  src={category.images[currentIndex]} 
                  alt={category.name}
                  className="menu-image"
                />
                {category.images.length > 1 && (
                  <>
                    <button 
                      className="nav-btn prev-btn"
                      onClick={() => prevImage(category.id, category.images.length)}
                    >
                      ‹
                    </button>
                    <button 
                      className="nav-btn next-btn"
                      onClick={() => nextImage(category.id, category.images.length)}
                    >
                      ›
                    </button>
                    <div className="image-dots">
                      {category.images.map((_, index) => (
                        <span 
                          key={index}
                          className={`dot ${index === currentIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImageIndex(prev => ({
                            ...prev,
                            [category.id]: index
                          }))}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
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
