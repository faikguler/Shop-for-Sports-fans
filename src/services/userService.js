import API from './api';

export const userService = {
  // Login
  login: (email, password) => API.post('/users/login', { email, password }),

  // Register
  register: (userData) => API.post('/users', userData),

  // Profil information (token need)
  getProfile: () => API.get('/users/me'),

  // All User (admin)
  getAllUsers: () => API.get('/users'),

  // get 1 user
  getUserById: (id) => API.get(`/users/${id}`),

  // User Update
  updateUser: (id, userData) => API.put(`/users/${id}`, userData),

  // delete user (admin)
  deleteUser: (id) => API.delete(`/users/${id}`),
};