<template>
  <div class="min-h-screen bg-slate-950 flex">
    <!-- Sidebar -->
    <aside :class="['fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300',
                   sidebarOpen ? 'w-64' : 'w-16', 'lg:relative lg:translate-x-0',
                   mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']">

      <!-- Logo -->
      <div class="flex items-center gap-3 px-4 py-5 border-b border-slate-800 h-16">
        <div class="relative flex-shrink-0 w-8 h-8">
          <div class="absolute inset-0 bg-cyan-500 rounded-lg rotate-45"></div>
          <div class="absolute inset-1 bg-slate-900 rounded-md rotate-45"></div>
          <span class="absolute inset-0 flex items-center justify-center text-cyan-400 font-display font-bold text-xs">S</span>
        </div>
        <span v-if="sidebarOpen" class="font-display font-bold text-lg text-white whitespace-nowrap">
          Soft<span class="text-cyan-400">Shine</span>
        </span>
      </div>

      <!-- Nav -->
      <nav class="flex-1 py-4 overflow-y-auto">
        <ul class="space-y-1 px-2">
          <li v-for="item in navItems" :key="item.to">
            <template v-if="!item.adminOnly || auth.isAdmin">
              <RouterLink :to="item.to"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 group"
                :class="{'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20': isActive(item.to)}">
                <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-html="item.icon"></svg>
                <span v-if="sidebarOpen" class="text-sm font-medium whitespace-nowrap">{{ item.label }}</span>
              </RouterLink>
            </template>
          </li>
        </ul>
      </nav>

      <!-- User Info & Logout -->
      <div class="p-4 border-t border-slate-800">
        <div v-if="sidebarOpen" class="flex items-center gap-3 mb-3 p-2 rounded-lg bg-slate-800/50">
          <div class="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-sm font-display font-semibold flex-shrink-0">
            {{ auth.fullName.charAt(0) }}
          </div>
          <div class="min-w-0">
            <div class="text-white text-sm font-medium truncate">{{ auth.fullName }}</div>
            <div class="text-slate-500 text-xs truncate">{{ auth.isAdmin ? 'System Admin' : 'User' }}</div>
          </div>
        </div>
        <button @click="handleLogout"
                class="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          <span v-if="sidebarOpen" class="text-sm">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Mobile overlay -->
    <div v-if="mobileOpen" @click="mobileOpen=false" class="fixed inset-0 bg-black/60 z-40 lg:hidden"></div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Top bar -->
      <header class="h-16 bg-slate-900/80 backdrop-blur border-b border-slate-800 flex items-center gap-4 px-4 sticky top-0 z-30">
        <button @click="mobileOpen = !mobileOpen" class="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <button @click="sidebarOpen = !sidebarOpen" class="hidden lg:flex p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <div class="flex-1">
          <h1 class="font-display font-semibold text-white text-base">{{ currentPageTitle }}</h1>
        </div>
        <RouterLink to="/" class="btn-ghost text-sm hidden sm:flex">← View Site</RouterLink>
      </header>

      <!-- Page content -->
      <main class="flex-1 p-6 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const sidebarOpen = ref(true)
const mobileOpen = ref(false)

const navItems = [
  { to:'/dashboard', label:'Dashboard', icon:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"/>' },
  { to:'/dashboard/projects', label:'Projects', icon:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0l-7 7m7-7l-7-7"/>' },
  { to:'/dashboard/users', label:'Users', adminOnly:true, icon:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"/>' },
  { to:'/dashboard/messages', label:'Messages', adminOnly:true, icon:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>' },
  { to:'/dashboard/profile', label:'Profile', icon:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>'}
]

const pageTitles = { '/dashboard':'Overview', '/dashboard/projects':'Projects', '/dashboard/projects/create':'New Project', '/dashboard/users':'User Management', '/dashboard/messages':'Messages', '/dashboard/profile':'Profile' }
const currentPageTitle = computed(() => {
  for (const [path, title] of Object.entries(pageTitles)) {
    if (route.path === path || route.path.startsWith(path + '/')) return title
  }
  return 'Dashboard'
})

const isActive = to => {
  if (to === '/dashboard') return route.path === '/dashboard'
  return route.path.startsWith(to)
}

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>