import API from './api';

export const sliderService = {
  getAll: () => API.get('/sliders'),
  getById: (id) => API.get(`/sliders/${id}`),
  create: (data) => API.post('/sliders', data),
  update: (id, data) => API.put(`/sliders/${id}`, data),
  delete: (id) => API.delete(`/sliders/${id}`),
};