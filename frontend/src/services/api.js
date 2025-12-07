import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dishes API
export const dishesAPI = {
  // Lấy tất cả món ăn
  getAllDishes: async () => {
    try {
      const response = await api.get('/dishes');
      return response.data;
    } catch (error) {
      console.error('Error fetching dishes:', error);
      throw error;
    }
  },

  // Lấy món ăn theo category
  getDishesByCategory: async (category) => {
    try {
      const response = await api.get('/dishes');
      if (category === 'Tất cả') {
        return response.data;
      }
      return response.data.filter(dish => dish.category === category);
    } catch (error) {
      console.error('Error fetching dishes by category:', error);
      throw error;
    }
  },

  // Thêm món ăn mới (dành cho admin)
  createDish: async (dishData) => {
    try {
      const response = await api.post('/dishes', dishData);
      return response.data;
    } catch (error) {
      console.error('Error creating dish:', error);
      throw error;
    }
  },

  // Cập nhật món ăn (dành cho admin)
  updateDish: async (id, dishData) => {
    try {
      const response = await api.put(`/dishes/${id}`, dishData);
      return response.data;
    } catch (error) {
      console.error('Error updating dish:', error);
      throw error;
    }
  },

  // Xóa món ăn (dành cho admin)
  deleteDish: async (id) => {
    try {
      const response = await api.delete(`/dishes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting dish:', error);
      throw error;
    }
  },
};

// Orders API
export const ordersAPI = {
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  getOrderById: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },
};

export default api;
