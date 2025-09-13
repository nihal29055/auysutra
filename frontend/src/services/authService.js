
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('token');
    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor to add token to headers
    axios.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle auth errors
    axios.interceptors.response.use(
      (response) => {
        return response; // Return full response to handle both response.data and response structure
      },
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          this.setToken(null);
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  async login(email, password) {
    try {
      // For demo purposes, simulate successful login
      // In production, this will make actual API call
      if (email === 'demo@ayursutra.com' && password === 'demo123') {
        const mockResponse = {
          success: true,
          data: {
            token: 'demo-token-' + Date.now(),
            user: {
              id: 1,
              name: 'Demo User',
              email: 'demo@ayursutra.com',
              role: 'patient'
            }
          }
        };
        
        if (mockResponse.data.token) {
          this.setToken(mockResponse.data.token);
        }
        
        return mockResponse;
      }
      
      // Actual API call (uncomment when backend is ready)
      /*
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      if (response.data.token) {
        this.setToken(response.data.token);
      }
      
      return response.data;
      */
      
      // If not demo credentials, return error
      throw new Error('Invalid email or password');
    } catch (error) {
      throw error;
    }
  }

  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      
      if (response.data.token) {
        this.setToken(response.data.token);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getProfile() {
    try {
      // For demo purposes, return mock user data
      if (this.token && this.token.startsWith('demo-token-')) {
        return {
          success: true,
          data: {
            user: {
              id: 1,
              name: 'Demo User',
              email: 'demo@ayursutra.com',
              role: 'patient',
              phone: '+91 9876543210',
              avatar: null
            }
          }
        };
      }
      
      // Actual API call (uncomment when backend is ready)
      /*
      const response = await axios.get(`${API_URL}/auth/profile`);
      return response.data;
      */
      
      throw new Error('Not authenticated');
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(userData) {
    try {
      const response = await axios.put(`${API_URL}/auth/profile`, userData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(currentPassword, newPassword) {
    try {
      const response = await axios.put(`${API_URL}/auth/change-password`, {
        currentPassword,
        newPassword
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getPractitioners(page = 1, limit = 10, specialization = '') {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });

      if (specialization) {
        params.append('specialization', specialization);
      }

      const response = await axios.get(`${API_URL}/auth/practitioners?${params}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    this.setToken(null);
  }
}

export const authService = new AuthService();