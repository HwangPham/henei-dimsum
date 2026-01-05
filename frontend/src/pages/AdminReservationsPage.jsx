import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reservationsAPI } from '../services/api';
import './AdminReservationsPage.css';

function AdminReservationsPage() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, cancelled

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const data = await reservationsAPI.getAll();
      setReservations(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await reservationsAPI.updateStatus(id, newStatus);
      alert('Cập nhật trạng thái thành công!');
      fetchReservations();
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
      confirmed: '#4caf50',
      cancelled: '#f44336',
      completed: '#2196f3'
    };
    return colors[status] || '#999';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Chờ xác nhận',
      confirmed: 'Đã xác nhận',
      cancelled: 'Đã hủy',
      completed: 'Hoàn thành'
    };
    return texts[status] || status;
  };

  const filteredReservations = filter === 'all'
    ? reservations
    : reservations.filter(r => r.status === filter);

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
          Tất cả ({reservations.length})
        </button>
        <button
          className={filter === 'pending' ? 'active' : ''}
          onClick={() => setFilter('pending')}
        >
          Chờ xác nhận ({reservations.filter(r => r.status === 'pending').length})
        </button>
        <button
          className={filter === 'confirmed' ? 'active' : ''}
          onClick={() => setFilter('confirmed')}
        >
          Đã xác nhận ({reservations.filter(r => r.status === 'confirmed').length})
        </button>
        <button
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Hoàn thành ({reservations.filter(r => r.status === 'completed').length})
        </button>
      </div>

      {filteredReservations.length === 0 ? (
        <div className="no-data">Không có đặt bàn nào.</div>
      ) : (
        <div className="reservations-table">
          {filteredReservations.map((reservation) => (
            <div key={reservation._id} className="reservation-card">
              <div className="card-header">
                <div>
                  <h3>{reservation.customer.name}</h3>
                  <p className="reservation-id">ID: {reservation._id.slice(-8)}</p>
                </div>
                <div
                  className="status-badge"
                  style={{ background: getStatusColor(reservation.status) }}
                >
                  {getStatusText(reservation.status)}
                </div>
              </div>

              <div className="card-body">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">📞 Điện thoại:</span>
                    <span>{reservation.customer.phone}</span>
                  </div>
                  {reservation.customer.email && (
                    <div className="info-item">
                      <span className="label">📧 Email:</span>
                      <span>{reservation.customer.email}</span>
                    </div>
                  )}
                  <div className="info-item">
                    <span className="label">📅 Ngày:</span>
                    <span>{formatDate(reservation.reservationDate)}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">⏰ Giờ:</span>
                    <span>{reservation.reservationTime}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">👥 Số khách:</span>
                    <span>{reservation.numberOfGuests} người</span>
                  </div>
                  <div className="info-item">
                    <span className="label">🪑 Loại bàn:</span>
                    <span>{reservation.tablePreference}</span>
                  </div>
                </div>

                {reservation.specialRequests && (
                  <div className="special-requests">
                    <strong>📝 Yêu cầu đặc biệt:</strong>
                    <p>{reservation.specialRequests}</p>
                  </div>
                )}
              </div>

              <div className="card-actions">
                {reservation.status === 'pending' && (
                  <>
                    <button
                      className="btn-action btn-confirm"
                      onClick={() => updateStatus(reservation._id, 'confirmed')}
                    >
                      ✓ Xác nhận
                    </button>
                    <button
                      className="btn-action btn-cancel"
                      onClick={() => updateStatus(reservation._id, 'cancelled')}
                    >
                      ✗ Hủy
                    </button>
                  </>
                )}
                {reservation.status === 'confirmed' && (
                  <button
                    className="btn-action btn-complete"
                    onClick={() => updateStatus(reservation._id, 'completed')}
                  >
                    ✓ Hoàn thành
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

export default AdminReservationsPage;
