import { defineStore } from 'pinia'
import { authAPI } from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  }),
  getters: {
    isAuthenticated: s => !!s.token && !!s.user,
    isAdmin: s => s.user?.roles?.includes('SYSTEM_ADMIN'),
    fullName: s => s.user?.fullName || ''
  },
  actions: {
    async login(credentials) {
      this.loading = true; this.error = null
      try {
        const { data } = await authAPI.login(credentials)
        this.token = data.data.token
        this.user = data.data.user
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))
        return data.data
      } catch (e) {
        this.error = e.response?.data?.message || 'Login failed'
        throw e
      } finally { this.loading = false }
    },
    async register(payload) {
      this.loading = true; this.error = null
      try {
        const { data } = await authAPI.register(payload)
        return data
      } catch (e) {
        this.error = e.response?.data?.message || 'Registration failed'
        throw e
      } finally { this.loading = false }
    },
    async fetchMe() {
      try {
        const { data } = await authAPI.me()
        this.user = data.data
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (e) { this.logout() }
    },
    logout() {
      this.user = null; this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})