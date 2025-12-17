import React, { useState, useEffect } from 'react';
import './AdminPromotionsPage.css';

function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    validFrom: '',
    validTo: '',
    terms: '',
    code: '',
    isActive: true
  });

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId 
        ? `http://localhost:5000/api/promotions/${editingId}`
        : 'http://localhost:5000/api/promotions';
      
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(editingId ? 'Cập nhật thành công!' : 'Thêm mới thành công!');
        resetForm();
        fetchPromotions();
      }
    } catch (error) {
      console.error('Error saving promotion:', error);
      alert('Có lỗi xảy ra!');
    }
  };

  const handleEdit = (promotion) => {
    setFormData({
      title: promotion.title,
      description: promotion.description,
      discountType: promotion.discountType,
      discountValue: promotion.discountValue,
      validFrom: promotion.validFrom.split('T')[0],
      validTo: promotion.validTo.split('T')[0],
      terms: promotion.terms || '',
      code: promotion.code || '',
      isActive: promotion.isActive
    });
    setEditingId(promotion._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa ưu đãi này?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/promotions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Xóa thành công!');
        fetchPromotions();
      }
    } catch (error) {
      console.error('Error deleting promotion:', error);
      alert('Có lỗi xảy ra!');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      discountType: 'percentage',
      discountValue: '',
      validFrom: '',
      validTo: '',
      terms: '',
      code: '',
      isActive: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>;
  }

  return (
    <div className="admin-promotions-container">
      <div className="admin-header">
        <h1>Quản Lý Ưu Đãi & Khuyến Mãi</h1>
        <button 
          className="btn-add-new"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Đóng Form' : '+ Thêm Ưu Đãi Mới'}
        </button>
      </div>

      {showForm && (
        <div className="promotion-form-card">
          <h2>{editingId ? 'Chỉnh Sửa Ưu Đãi' : 'Thêm Ưu Đãi Mới'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Tiêu đề *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="VD: Giảm 20% cho khách hàng mới"
                />
              </div>

              <div className="form-group">
                <label>Mã khuyến mãi</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="VD: HENEI20"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Mô tả *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="3"
                placeholder="Mô tả chi tiết về chương trình ưu đãi..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Loại giảm giá *</label>
                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="percentage">Phần trăm (%)</option>
                  <option value="fixed">Số tiền cố định (đ)</option>
                  <option value="combo">Combo đặc biệt</option>
                </select>
              </div>

              <div className="form-group">
                <label>Giá trị giảm *</label>
                <input
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  required
                  placeholder={formData.discountType === 'percentage' ? 'VD: 20' : 'VD: 50000'}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ngày bắt đầu *</label>
                <input
                  type="date"
                  name="validFrom"
                  value={formData.validFrom}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Ngày kết thúc *</label>
                <input
                  type="date"
                  name="validTo"
                  value={formData.validTo}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Điều kiện áp dụng</label>
              <textarea
                name="terms"
                value={formData.terms}
                onChange={handleInputChange}
                rows="2"
                placeholder="VD: Áp dụng cho hóa đơn từ 200.000đ..."
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                />
                Kích hoạt hiển thị
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                {editingId ? 'Cập Nhật' : 'Thêm Mới'}
              </button>
              <button type="button" className="btn-cancel" onClick={resetForm}>
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="promotions-list">
        <h2>Danh Sách Ưu Đãi ({promotions.length})</h2>
        {promotions.length === 0 ? (
          <p className="no-data">Chưa có ưu đãi nào.</p>
        ) : (
          <div className="promotions-table">
            {promotions.map((promo) => (
              <div key={promo._id} className={`promo-card ${!promo.isActive ? 'inactive' : ''}`}>
                <div className="promo-header">
                  <h3>{promo.title}</h3>
                  <span className={`status-badge ${promo.isActive ? 'active' : 'inactive'}`}>
                    {promo.isActive ? 'Đang hiển thị' : 'Đã ẩn'}
                  </span>
                </div>
                
                <p className="promo-description">{promo.description}</p>
                
                <div className="promo-details">
                  <div className="detail-item">
                    <strong>Giảm:</strong> 
                    {promo.discountType === 'percentage' 
                      ? ` ${promo.discountValue}%`
                      : promo.discountType === 'fixed'
                      ? ` ${promo.discountValue.toLocaleString()}đ`
                      : ' Combo đặc biệt'}
                  </div>
                  
                  {promo.code && (
                    <div className="detail-item">
                      <strong>Mã:</strong> {promo.code}
                    </div>
                  )}
                  
                  <div className="detail-item">
                    <strong>Thời gian:</strong> {new Date(promo.validFrom).toLocaleDateString('vi-VN')} 
                    {' → '} 
                    {new Date(promo.validTo).toLocaleDateString('vi-VN')}
                  </div>
                </div>

                {promo.terms && (
                  <div className="promo-terms">
                    <strong>Điều kiện:</strong> {promo.terms}
                  </div>
                )}

                <div className="promo-actions">
                  <button className="btn-edit" onClick={() => handleEdit(promo)}>
                    Sửa
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(promo._id)}>
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPromotionsPage;
