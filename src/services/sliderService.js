import API from './api';

export const sliderService = {
  getAll: () => API.get('/Sliders'),
  getById: (id) => API.get(`/Sliders/${id}`),
  create: (data) => API.post('/Sliders', data),
  update: (id, data) => API.put(`/Sliders/${id}`, data),
  delete: (id) => API.delete(`/Sliders/${id}`),
  
};