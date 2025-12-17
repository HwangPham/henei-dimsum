import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDishesPage.css';

function AdminDishesPage() {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Chiên',
    description: '',
    image: ''
  });

  const categories = ['Chiên', 'Hấp', 'Xào', 'Mỳ', 'Nước'];

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchDishes();
  }, [navigate]);

  const fetchDishes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dishes');
      const data = await response.json();
      setDishes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dishes:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId 
        ? `http://localhost:5000/api/dishes/${editingId}`
        : 'http://localhost:5000/api/dishes';
      
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        }),
      });

      if (response.ok) {
        alert(editingId ? 'Cập nhật món ăn thành công!' : 'Thêm món ăn mới thành công!');
        resetForm();
        fetchDishes();
      }
    } catch (error) {
      console.error('Error saving dish:', error);
      alert('Có lỗi xảy ra!');
    }
  };

  const handleEdit = (dish) => {
    setFormData({
      name: dish.name,
      price: dish.price,
      category: dish.category,
      description: dish.description || '',
      image: dish.image || ''
    });
    setEditingId(dish._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa món ăn này?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/dishes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Xóa món ăn thành công!');
        fetchDishes();
      }
    } catch (error) {
      console.error('Error deleting dish:', error);
      alert('Có lỗi xảy ra!');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: 'Chiên',
      description: '',
      image: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const filteredDishes = filter === 'all' 
    ? dishes 
    : dishes.filter(d => d.category === filter);

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <button className="btn-back" onClick={() => navigate('/admin/dashboard')}>
            ← Quay lại Dashboard
          </button>
          <h1>🍜 Quản Lý Thực Đơn</h1>
        </div>
        <div className="header-actions">
          <button 
            className="btn-add-new"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Đóng Form' : '+ Thêm Món Mới'}
          </button>
          <button className="btn-logout" onClick={() => {
            localStorage.clear();
            navigate('/admin/login');
          }}>
            Đăng Xuất
          </button>
        </div>
      </div>

      {showForm && (
        <div className="dish-form-card">
          <h2>{editingId ? 'Chỉnh Sửa Món Ăn' : 'Thêm Món Ăn Mới'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Tên món *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="VD: Há cảo tôm"
                />
              </div>

              <div className="form-group">
                <label>Giá *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  placeholder="VD: 45000"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Danh mục *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Mô tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Mô tả món ăn..."
              />
            </div>

            <div className="form-group">
              <label>Link ảnh</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="/images/chien/chien_1.webp"
              />
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

      <div className="filter-tabs">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Tất cả ({dishes.length})
        </button>
        {categories.map(cat => (
          <button 
            key={cat}
            className={filter === cat ? 'active' : ''}
            onClick={() => setFilter(cat)}
          >
            {cat} ({dishes.filter(d => d.category === cat).length})
          </button>
        ))}
      </div>

      {filteredDishes.length === 0 ? (
        <div className="no-data">Không có món ăn nào.</div>
      ) : (
        <div className="dishes-grid">
          {filteredDishes.map((dish) => (
            <div key={dish._id} className="dish-card">
              {dish.image && (
                <div className="dish-image">
                  <img src={dish.image} alt={dish.name} />
                </div>
              )}
              <div className="dish-info">
                <h3>{dish.name}</h3>
                <p className="dish-category">{dish.category}</p>
                {dish.description && (
                  <p className="dish-description">{dish.description}</p>
                )}
                <p className="dish-price">{dish.price.toLocaleString()}đ</p>
              </div>
              <div className="dish-actions">
                <button className="btn-edit" onClick={() => handleEdit(dish)}>
                  Sửa
                </button>
                <button className="btn-delete" onClick={() => handleDelete(dish._id)}>
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDishesPage;
