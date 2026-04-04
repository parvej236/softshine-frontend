<template>
  <div class="space-y-8">
    <!-- Welcome -->
    <div class="card-glass p-6 glow-border">
      <h2 class="font-display font-bold text-2xl text-white mb-1">
        Welcome back, <span class="gradient-text">{{ auth.fullName }}</span> 👋
      </h2>
      <p class="text-slate-400">Here's what's happening at SoftShine today.</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.label"
           class="card-glass p-6 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" :class="stat.bg">
            {{ stat.icon }}
          </div>
          <span class="text-xs font-medium px-2 py-1 rounded-full" :class="stat.badgeClass">
            {{ stat.change }}
          </span>
        </div>
        <div class="font-display font-bold text-3xl text-white mb-1">{{ stat.value }}</div>
        <div class="text-slate-400 text-sm">{{ stat.label }}</div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <RouterLink to="/dashboard/projects/create"
                  class="card-glass p-6 flex items-center gap-4 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1">
        <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
        </div>
        <div>
          <div class="font-display font-semibold text-white">New Project</div>
          <div class="text-slate-400 text-sm">Add to portfolio</div>
        </div>
      </RouterLink>

      <RouterLink v-if="auth.isAdmin" to="/dashboard/users"
                  class="card-glass p-6 flex items-center gap-4 hover:border-violet-500/40 transition-all duration-300 group hover:-translate-y-1">
        <div class="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20 transition-colors">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/>
          </svg>
        </div>
        <div>
          <div class="font-display font-semibold text-white">Manage Users</div>
          <div class="text-slate-400 text-sm">Approve & assign roles</div>
        </div>
      </RouterLink>

      <RouterLink v-if="auth.isAdmin" to="/dashboard/messages"
                  class="card-glass p-6 flex items-center gap-4 hover:border-emerald-500/40 transition-all duration-300 group hover:-translate-y-1">
        <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>
        <div>
          <div class="font-display font-semibold text-white">Messages</div>
          <div class="text-slate-400 text-sm">View contact messages</div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { projectAPI, adminAPI } from '@/services/api'

const auth = useAuthStore()
const stats = ref([
  { icon:'🚀', label:'Total Projects', value:'0', change:'+2 this month', bg:'bg-cyan-500/10', badgeClass:'bg-cyan-500/10 text-cyan-400' },
  { icon:'👥', label:'Total Users', value:'0', change:'Active', bg:'bg-violet-500/10', badgeClass:'bg-violet-500/10 text-violet-400' },
  { icon:'📧', label:'Messages', value:'0', change:'Unread', bg:'bg-emerald-500/10', badgeClass:'bg-emerald-500/10 text-emerald-400' },
  { icon:'⏳', label:'Pending Approvals', value:'0', change:'Needs review', bg:'bg-amber-500/10', badgeClass:'bg-amber-500/10 text-amber-400' }
])

onMounted(async () => {
  try {
    const [projRes] = await Promise.all([projectAPI.getAll(0, 1)])
    stats.value[0].value = projRes.data.data.totalElements || '0'
    if (auth.isAdmin) {
      const [usersRes, msgStats, pending] = await Promise.all([
        adminAPI.getUsers(), adminAPI.getMessageStats(), adminAPI.getPending()
      ])
      stats.value[1].value = usersRes.data.data.length || '0'
      stats.value[2].value = msgStats.data.data.unread || '0'
      stats.value[3].value = pending.data.data.length || '0'
    }
  } catch(e) { console.error(e) }
})
</script>