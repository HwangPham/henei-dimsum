import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to inject the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

// Orders API (Pre-orders from customers)
export const preordersAPI = {
  getAll: async () => {
    const response = await api.get('/preorders');
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await api.put(`/preorders/${id}/status`, { status });
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/preorders', data);
    return response.data;
  }
};

// Reservations API
export const reservationsAPI = {
  getAll: async () => {
    const response = await api.get('/reservations');
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await api.put(`/reservations/${id}/status`, { status });
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/reservations', data);
    return response.data;
  }
};

// Promotions API
export const promotionsAPI = {
  getAll: async () => {
    const response = await api.get('/promotions');
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/promotions', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/promotions/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/promotions/${id}`);
    return response.data;
  }
};

// Stats API
export const statsAPI = {
  getDashboardStats: async () => {
    const [reservations, preorders, promotions, dishes] = await Promise.all([
      api.get('/reservations'),
      api.get('/preorders'),
      api.get('/promotions'),
      api.get('/dishes')
    ]);
    return {
      reservations: Array.isArray(reservations.data) ? reservations.data.length : 0,
      preorders: Array.isArray(preorders.data) ? preorders.data.length : 0,
      promotions: Array.isArray(promotions.data) ? promotions.data.length : 0,
      dishes: Array.isArray(dishes.data) ? dishes.data.length : 0
    };
  }
};

export default api;
