import API from './api';

export const pageService = {
  getAll: () => API.get('/pages'),
  getById: (id) => API.get(`/pages/${id}`),
  create: (data) => API.post('/pages', data),
  update: (id, data) => API.put(`/pages/${id}`, data),
  delete: (id) => API.delete(`/pages/${id}`),
  getByName: (name) => API.get(`/pages/by-name/${name}`),
};