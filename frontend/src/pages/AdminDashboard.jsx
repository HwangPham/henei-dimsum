import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { statsAPI } from '../services/api';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');
  const [stats, setStats] = useState({
    reservations: 0,
    preorders: 0,
    promotions: 0,
    dishes: 0
  });

  useEffect(() => {
    const name = localStorage.getItem('adminName');
    setAdminName(name || 'Admin');
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const dashboardStats = await statsAPI.getDashboardStats();
      setStats(dashboardStats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    navigate('/admin/login');
  };

  const menuItems = [
    {
      title: 'Quản Lý Đặt Bàn',
      icon: '🍽️',
      path: '/admin/reservations',
      count: stats.reservations,
      color: '#2196f3'
    },
    {
      title: 'Quản Lý Đặt Hàng',
      icon: '📦',
      path: '/admin/preorders',
      count: stats.preorders,
      color: '#4caf50'
    },
    {
      title: 'Quản Lý Thực Đơn',
      icon: '🍜',
      path: '/admin/dishes',
      count: stats.dishes,
      color: '#ff9800'
    },
    {
      title: 'Quản Lý Ưu Đãi',
      icon: '🎁',
      path: '/admin/promotions',
      count: stats.promotions,
      color: '#e91e63'
    }
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-grid">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="dashboard-card"
            onClick={() => navigate(item.path)}
            style={{ borderTopColor: item.color }}
          >
            <div className="card-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <div className="card-count" style={{ color: item.color }}>
              {item.count}
            </div>
            <button className="btn-manage" style={{ background: item.color }}>
              Quản Lý →
            </button>
          </div>
        ))}
      </div>

      <div className="quick-actions">
        <h2>Thao Tác Nhanh</h2>
        <div className="actions-grid">
          <button onClick={() => navigate('/')}>
            🌐 Xem Website
          </button>
          <button onClick={() => navigate('/admin/promotions')}>
            ➕ Thêm Ưu Đãi
          </button>
          <button onClick={() => navigate('/admin/dishes')}>
            ➕ Thêm Món Ăn
          </button>
          <button onClick={() => fetchStats()}>
            🔄 Làm Mới Thống Kê
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
