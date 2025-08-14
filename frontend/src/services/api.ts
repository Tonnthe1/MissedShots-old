// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This allows the browser to send cookies with requests
});

// Add this interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication endpoints
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in', error);
    throw error;
  }
};

export const signup = async (formData: FormData) => {
  try {
    console.log("Sending signup request with data:", Object.fromEntries(formData));
    const response = await api.post('/auth/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("Signup response:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
};

// No changes to logout function
export const logout = async () => {
  try {
    const response = await api.post('/api/logout');
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    console.error('Error logging out', error);
    throw error;
  }
};

export const getNetworkConnections = async () => {
  try {
    const response = await api.get('/network-connections');
    return response.data;
  } catch (error) {
    console.error('Error fetching network connections:', error);
    throw error;
  }
};

export const addNetworkConnection = async (connectionData: { name: string; email: string; phone: string }) => {
  try {
    const response = await api.post('/network-connections', connectionData);
    return response.data;
  } catch (error) {
    console.error('Error adding network connection', error);
    throw error;
  }
};

export const updateNetworkConnectionNote = async (connectionId: string, note: string) => {
  try {
    const response = await api.patch(`/network-connections/${connectionId}`, { note });
    return response.data;
  } catch (error) {
    console.error('Error updating network connection note', error);
    throw error;
  }
};

export const getPersonalInfo = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}/personal-info`);
    return response.data;
  } catch (error) {
    console.error('Error fetching personal info:', error);
    throw error;
  }
};

export const generateQRCode = async () => {
  try {
    const response = await api.get('/auth/generate-qr');
    return response.data.qrCode;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

export const updateUserPreferences = async (preferences: {
  email: boolean;
  linkedin: boolean;
  whatsapp: boolean;
  instagram: boolean;
  twitter: boolean;
  github: boolean;
  facebook: boolean;
  wechat: boolean;
  youtube: boolean;
}) => {
  try {
    const response = await api.put('/network-connections/preferences', preferences);
    return response.data;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
};

export default api;
