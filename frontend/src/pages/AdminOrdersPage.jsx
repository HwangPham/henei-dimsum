// src/pages/AdminOrdersPage.jsx
import React, { useEffect, useState } from "react";
import "./AdminOrdersPage.css";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const STATUS_OPTIONS = ["pending", "confirmed", "done", "cancelled"];

const STATUS_LABEL = {
  pending: "⏳ Chờ xử lý",
  confirmed: "✅ Đã xác nhận",
  done: "🍽 Đã hoàn thành",
  cancelled: "❌ Đã hủy",
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE}/orders`);
      if (!res.ok) throw new Error("Không lấy được danh sách đơn");

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Không tải được danh sách đơn hàng. Hãy thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // 👇 khớp với route PATCH /api/orders/:id/status
      const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Lỗi cập nhật trạng thái");

      const updated = await res.json();

      setOrders((prev) =>
        prev.map((o) => (o._id === updated._id ? updated : o))
      );
    } catch (err) {
      console.error(err);
      alert("Cập nhật trạng thái thất bại, hãy thử lại.");
    }
  };

  return (
    <div className="admin-orders-container">
      <h2>📋 Quản lý đơn hàng</h2>

      {loading && <p>Đang tải đơn hàng...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p>Hiện chưa có đơn hàng nào.</p>
      )}

      {!loading && !error && orders.length > 0 && (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Thời gian</th>
              <th>Khách hàng</th>
              <th>Món</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString("vi-VN", {
                        hour12: false,
                      })
                    : "-"}
                </td>

                <td>
                  <div className="customer-info">
                    <strong>{order.customer?.name || "Không rõ tên"}</strong>
                    <div>SĐT: {order.customer?.phone || "—"}</div>
                    {order.customer?.note && (
                      <div>Ghi chú: {order.customer.note}</div>
                    )}
                  </div>
                </td>

                <td>
                  <ul className="items-list">
                    {order.items?.map((item, idx) => (
                      <li key={idx}>
                        {item.name} x {item.quantity} (
                        {(item.price || 0).toLocaleString()} đ)
                      </li>
                    ))}
                  </ul>
                </td>

                <td>
                  <strong>
                    {(order.totalPrice || 0).toLocaleString()} đ
                  </strong>
                </td>

                <td>
                  <select
                    value={order.status || "pending"}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABEL[s]}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrdersPage;
