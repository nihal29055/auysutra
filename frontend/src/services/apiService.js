import axios from 'axios';

// Base API URL - change this if your backend runs on a different port
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============ AUTHENTICATION ============
export const authAPI = {
  // Login user
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};

// ============ THERAPIES ============
export const therapiesAPI = {
  // Get all therapies
  getAll: async (page = 1, limit = 10, category = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (category) params.append('category', category);
    
    const response = await api.get(`/therapies?${params}`);
    return response.data;
  },

  // Get single therapy by ID
  getById: async (id) => {
    const response = await api.get(`/therapies/${id}`);
    return response.data;
  },

  // Create new therapy (admin only)
  create: async (therapyData) => {
    const response = await api.post('/therapies', therapyData);
    return response.data;
  },

  // Update therapy (admin only)
  update: async (id, therapyData) => {
    const response = await api.put(`/therapies/${id}`, therapyData);
    return response.data;
  },

  // Delete therapy (admin only)
  delete: async (id) => {
    const response = await api.delete(`/therapies/${id}`);
    return response.data;
  },

  // Search therapies
  search: async (query) => {
    const response = await api.get(`/therapies/search?q=${query}`);
    return response.data;
  },
};

// ============ APPOINTMENTS ============
export const appointmentsAPI = {
  // Get all appointments (with filters)
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
    
    const response = await api.get(`/appointments?${params}`);
    return response.data;
  },

  // Get single appointment
  getById: async (id) => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  // Create new appointment
  create: async (appointmentData) => {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },

  // Update appointment
  update: async (id, appointmentData) => {
    const response = await api.put(`/appointments/${id}`, appointmentData);
    return response.data;
  },

  // Cancel appointment
  cancel: async (id, reason) => {
    const response = await api.put(`/appointments/${id}/cancel`, { reason });
    return response.data;
  },

  // Get available slots
  getAvailableSlots: async (practitionerId, date) => {
    const response = await api.get(
      `/appointments/slots?practitioner=${practitionerId}&date=${date}`
    );
    return response.data;
  },

  // Get user's appointments
  getUserAppointments: async (status = '') => {
    const params = status ? `?status=${status}` : '';
    const response = await api.get(`/appointments/my-appointments${params}`);
    return response.data;
  },
};

// ============ NOTIFICATIONS ============
export const notificationsAPI = {
  // Get all notifications
  getAll: async (page = 1, limit = 20) => {
    const response = await api.get(
      `/notifications?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  // Mark all as read
  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all');
    return response.data;
  },

  // Delete notification
  delete: async (id) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },

  // Get unread count
  getUnreadCount: async () => {
    const response = await api.get('/notifications/unread-count');
    return response.data;
  },
};

// ============ GENERIC CRUD OPERATIONS ============
export const createAPIService = (endpoint) => ({
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`${endpoint}${queryString ? `?${queryString}` : ''}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`${endpoint}/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post(endpoint, data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`${endpoint}/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`${endpoint}/${id}`);
    return response.data;
  },
});

// Export the axios instance for custom requests
export default api;