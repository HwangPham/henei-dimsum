import React, { useState, useEffect } from 'react';
import './PromotionsPage.css';

function PromotionsPage() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/promotions');
      const data = await response.json();
      setPromotions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching promotions:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const getDiscountDisplay = (promotion) => {
    if (promotion.discountType === 'percentage') {
      return `${promotion.discountValue}%`;
    } else if (promotion.discountType === 'fixed') {
      return `${promotion.discountValue.toLocaleString()}đ`;
    }
    return 'Combo Đặc Biệt';
  };

  if (loading) {
    return <div className="promotions-loading">Đang tải ưu đãi...</div>;
  }

  return (
    <div className="promotions-container">
      <div className="promotions-header">
        <h1>Ưu Đãi & Khuyến Mãi</h1>
        <p>Những chương trình ưu đãi hấp dẫn dành cho bạn</p>
      </div>

      {promotions.length === 0 ? (
        <div className="no-promotions">
          <p>Hiện tại chưa có chương trình ưu đãi nào.</p>
        </div>
      ) : (
        <div className="promotions-grid">
          {promotions.map((promotion) => (
            <div key={promotion._id} className="promotion-card">
              <div className="promotion-badge">
                <span className="discount-value">{getDiscountDisplay(promotion)}</span>
                <span className="discount-label">GIẢM GIÁ</span>
              </div>
              
              <div className="promotion-content">
                <h3>{promotion.title}</h3>
                <p className="promotion-description">{promotion.description}</p>
                
                <div className="promotion-dates">
                  <div className="date-item">
                    <span className="date-label">Từ:</span>
                    <span className="date-value">{formatDate(promotion.validFrom)}</span>
                  </div>
                  <div className="date-item">
                    <span className="date-label">Đến:</span>
                    <span className="date-value">{formatDate(promotion.validTo)}</span>
                  </div>
                </div>

                {promotion.terms && (
                  <div className="promotion-terms">
                    <h4>Điều kiện áp dụng:</h4>
                    <p>{promotion.terms}</p>
                  </div>
                )}

                {promotion.code && (
                  <div className="promotion-code">
                    <span>Mã: </span>
                    <strong>{promotion.code}</strong>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PromotionsPage;
