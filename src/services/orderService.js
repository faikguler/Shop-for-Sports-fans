import API from './api';

export const orderService = {
  create: (orderData) => API.post('/orders', orderData),
  getUserOrders: () => API.get('/orders/me'),
  getById: (id) => API.get(`/orders/${id}`),

  
  // Admin only
  getAllOrders: () => API.get('/admin/orders'),
  updateStatus: (id, status) => API.put(`/admin/orders/${id}`, { status }),
};