import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { preordersAPI } from '../services/api';
import './AdminPreOrdersPage.css';

function AdminPreOrdersPage() {
  const navigate = useNavigate();
  const [preorders, setPreorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchPreOrders();
  }, []);

  const fetchPreOrders = async () => {
    try {
      const data = await preordersAPI.getAll();
      setPreorders(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching preorders:', error);
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await preordersAPI.updateStatus(id, newStatus);
      alert('Cập nhật trạng thái thành công!');
      fetchPreOrders();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Có lỗi xảy ra: ' + (error.response?.data?.message || error.message));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ff9800',
      confirmed: '#2196f3',
      preparing: '#9c27b0',
      ready: '#4caf50',
      completed: '#607d8b',
      cancelled: '#f44336'
    };
    return colors[status] || '#999';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Chờ xác nhận',
      confirmed: 'Đã xác nhận',
      preparing: 'Đang chuẩn bị',
      ready: 'Sẵn sàng lấy',
      completed: 'Hoàn thành',
      cancelled: 'Đã hủy'
    };
    return texts[status] || status;
  };

  const filteredPreOrders = filter === 'all'
    ? preorders
    : preorders.filter(p => p.status === filter);

  if (loading) {
    return <div className="admin-loading">Đang tải...</div>;
  }

  return (
    <div className="admin-page">
      <div className="filter-tabs">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Tất cả ({preorders.length})
        </button>
        <button
          className={filter === 'pending' ? 'active' : ''}
          onClick={() => setFilter('pending')}
        >
          Chờ xác nhận ({preorders.filter(p => p.status === 'pending').length})
        </button>
        <button
          className={filter === 'preparing' ? 'active' : ''}
          onClick={() => setFilter('preparing')}
        >
          Đang làm ({preorders.filter(p => p.status === 'preparing').length})
        </button>
        <button
          className={filter === 'ready' ? 'active' : ''}
          onClick={() => setFilter('ready')}
        >
          Sẵn sàng ({preorders.filter(p => p.status === 'ready').length})
        </button>
      </div>

      {filteredPreOrders.length === 0 ? (
        <div className="no-data">Không có đơn hàng nào.</div>
      ) : (
        <div className="preorders-table">
          {filteredPreOrders.map((order) => (
            <div key={order._id} className="preorder-card">
              <div className="card-header">
                <div>
                  <h3>{order.customer.name}</h3>
                  <p className="order-id">ID: {order._id.slice(-8)}</p>
                </div>
                <div
                  className="status-badge"
                  style={{ background: getStatusColor(order.status) }}
                >
                  {getStatusText(order.status)}
                </div>
              </div>

              <div className="card-body">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">📞 Điện thoại:</span>
                    <span>{order.customer.phone}</span>
                  </div>
                  {order.customer.email && (
                    <div className="info-item">
                      <span className="label">📧 Email:</span>
                      <span>{order.customer.email}</span>
                    </div>
                  )}
                  <div className="info-item">
                    <span className="label">� Địa chỉ giao:</span>
                    <span>{order.deliveryAddress}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">💳 Thanh toán:</span>
                    <span>{order.paymentMethod === 'cash' ? 'Tiền mặt' :
                      order.paymentMethod === 'card' ? 'Thẻ' : 'Chuyển khoản'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">💰 Tổng tiền:</span>
                    <span className="total-price">{(order.totalAmount || 0).toLocaleString()}đ</span>
                  </div>
                </div>

                <div className="order-items">
                  <h4>Chi tiết đơn hàng:</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                      <span>{(item.price || 0).toLocaleString()}đ</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-actions">
                {order.status === 'pending' && (
                  <>
                    <button
                      className="btn-action btn-confirm"
                      onClick={() => updateStatus(order._id, 'confirmed')}
                    >
                      ✓ Xác nhận
                    </button>
                    <button
                      className="btn-action btn-cancel"
                      onClick={() => updateStatus(order._id, 'cancelled')}
                    >
                      ✗ Hủy
                    </button>
                  </>
                )}
                {order.status === 'confirmed' && (
                  <button
                    className="btn-action btn-preparing"
                    onClick={() => updateStatus(order._id, 'preparing')}
                  >
                    👨‍🍳 Bắt đầu làm
                  </button>
                )}
                {order.status === 'preparing' && (
                  <button
                    className="btn-action btn-ready"
                    onClick={() => updateStatus(order._id, 'ready')}
                  >
                    ✓ Sẵn sàng
                  </button>
                )}
                {order.status === 'ready' && (
                  <button
                    className="btn-action btn-complete"
                    onClick={() => updateStatus(order._id, 'completed')}
                  >
                    ✓ Đã lấy
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPreOrdersPage;
