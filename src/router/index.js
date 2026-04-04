import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/public/HomeView.vue') },
  { path: '/login', name: 'Login', component: () => import('@/views/auth/LoginView.vue'), meta: { guest: true } },
  { path: '/register', name: 'Register', component: () => import('@/views/auth/RegisterView.vue'), meta: { guest: true } },
  { path: '/verify-email', name: 'VerifyEmail', component: () => import('@/views/auth/VerifyEmailView.vue') },
  {
    path: '/dashboard',
    component: () => import('@/views/dashboard/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'Dashboard', component: () => import('@/views/dashboard/DashboardHome.vue') },
      { path: 'projects', name: 'DashProjects', component: () => import('@/views/dashboard/ProjectsView.vue') },
      { path: 'projects/create', name: 'CreateProject', component: () => import('@/views/dashboard/ProjectFormView.vue') },
      { path: 'projects/:id/edit', name: 'EditProject', component: () => import('@/views/dashboard/ProjectFormView.vue') },
      { path: 'users', name: 'Users', component: () => import('@/views/dashboard/UsersView.vue'), meta: { requiresAdmin: true } },
      { path: 'messages', name: 'Messages', component: () => import('@/views/dashboard/MessagesView.vue'), meta: { requiresAdmin: true } },
      { path: 'profile', name: 'Profile', component: () => import('@/views/dashboard/ProfileView.vue') }
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/public/NotFoundView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) return next('/login')
  if (to.meta.requiresAdmin && !auth.isAdmin) return next('/dashboard')
  if (to.meta.guest && auth.isAuthenticated) return next('/dashboard')
  next()
})

export default router