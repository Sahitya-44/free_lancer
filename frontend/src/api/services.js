import api from '../api/axios';

export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
};

export const profileAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
  selectTemplate: (templateId) => api.put(`/profile/template/${templateId}`),
};

export const skillAPI = {
  getSkills: () => api.get('/skills'),
  addSkill: (data) => api.post('/skills', data),
  updateSkill: (id, data) => api.put(`/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/skills/${id}`),
};

export const projectAPI = {
  getProjects: () => api.get('/projects'),
  addProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`),
};

export const experienceAPI = {
  getExperiences: () => api.get('/experience'),
  addExperience: (data) => api.post('/experience', data),
  updateExperience: (id, data) => api.put(`/experience/${id}`, data),
  deleteExperience: (id) => api.delete(`/experience/${id}`),
};

export const templateAPI = {
  getTemplates: () => api.get('/templates'),
  getTemplate: (id) => api.get(`/templates/${id}`),
};

export const portfolioAPI = {
  getPortfolio: (portfolioUrl) => api.get(`/portfolio/${portfolioUrl}`),
};
