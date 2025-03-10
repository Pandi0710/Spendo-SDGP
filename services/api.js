import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        config.headers.Authorization = `Bearer ${userData._id}`;
      }
    } catch (error) {
      console.error('Error setting auth header:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          // Handle unauthorized error
          await AsyncStorage.removeItem('user');
          break;
        case 503:
          console.error('Service temporarily unavailable');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    } else if (error.request) {
      console.error('Network Error:', error.request);
    }
    return Promise.reject(error);
  }
);

// User API calls
export const userAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getUser: (userId) => api.get(`/users/${userId}`),
  updateUser: (userId, userData) => api.put(`/users/${userId}`, userData)
};

// Transaction API calls
export const transactionAPI = {
  getTransactions: (userId) => api.get(`/transactions/user/${userId}`),
  getTransaction: (id) => api.get(`/transactions/${id}`),
  createTransaction: (transactionData) => api.post('/transactions', transactionData),
  updateTransaction: (id, transactionData) => api.put(`/transactions/${id}`, transactionData),
  deleteTransaction: (id) => api.delete(`/transactions/${id}`),
  getStats: (userId, period = 'week') => api.get(`/transactions/stats/user/${userId}?period=${period}`)
};

// Category API calls
export const categoryAPI = {
  getCategories: (userId) => api.get(`/categories/user/${userId}`),
  getCategory: (id) => api.get(`/categories/${id}`),
  createCategory: (categoryData) => api.post('/categories', categoryData),
  updateCategory: (id, categoryData) => api.put(`/categories/${id}`, categoryData),
  deleteCategory: (id) => api.delete(`/categories/${id}`),
  createDefaults: () => api.post('/categories/defaults')
};

export default {
  user: userAPI,
  transaction: transactionAPI,
  category: categoryAPI
};