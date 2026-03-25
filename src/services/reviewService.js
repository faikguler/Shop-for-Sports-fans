import API from './api';

export const reviewService = {
  getByProduct: (productId) => API.get(`/reviews/product/${productId}`),
  create: (data) => API.post('/reviews', data),
  getAll: () => API.get('/reviews'),
  delete: (id) => API.delete(`/reviews/${id}`),
};