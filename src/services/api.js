import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' }
})

// Request interceptor - attach JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, error => Promise.reject(error))

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

// Auth
export const authAPI = {
  register: data => api.post('/auth/register', data),
  login: data => api.post('/auth/login', data),
  verifyEmail: token => api.get(`/auth/verify-email?token=${token}`),
  me: () => api.get('/auth/me'),
  updateProfile: data => api.put('/auth/profile', data),
  changePassword: data => api.put('/auth/change-password', data)
}

// Projects
export const projectAPI = {
  getPublic: () => api.get('/projects/public'),
  getFeatured: () => api.get('/projects/public/featured'),
  getById: id => api.get(`/projects/public/${id}`),
  getAll: (page=0, size=10) => api.get(`/projects?page=${page}&size=${size}`),
  create: formData => api.post('/projects', formData, { headers:{'Content-Type':'multipart/form-data'} }),
  update: (id, formData) => api.put(`/projects/${id}`, formData, { headers:{'Content-Type':'multipart/form-data'} }),
  delete: id => api.delete(`/projects/${id}`)
}

// Admin
export const adminAPI = {
  getUsers: () => api.get('/admin/users'),
  getPending: () => api.get('/admin/users/pending'),
  approveUser: id => api.put(`/admin/users/${id}/approve`),
  rejectUser: id => api.put(`/admin/users/${id}/reject`),
  assignRole: (id, role) => api.put(`/admin/users/${id}/role?role=${role}`),
  toggleStatus: id => api.put(`/admin/users/${id}/toggle-status`),
  getMessages: (page=0, size=20) => api.get(`/admin/messages?page=${page}&size=${size}`),
  getMessageStats: () => api.get('/admin/messages/stats'),
  updateMessageStatus: (id, status) => api.put(`/admin/messages/${id}/status?status=${status}`)
}

// Contact
export const contactAPI = {
  send: data => api.post('/contact', data)
}