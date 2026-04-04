<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="font-display font-bold text-xl text-white">User Management</h2>
      <div class="flex gap-2">
        <button @click="tab='all'" :class="['px-4 py-2 rounded-lg text-sm font-medium transition-all', tab==='all'?'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30':'text-slate-400 hover:text-white hover:bg-slate-800']">
          All Users ({{ users.length }})
        </button>
        <button @click="tab='pending'" :class="['px-4 py-2 rounded-lg text-sm font-medium transition-all', tab==='pending'?'bg-amber-500/20 text-amber-400 border border-amber-500/30':'text-slate-400 hover:text-white hover:bg-slate-800']">
          Pending ({{ pending.length }})
        </button>
      </div>
    </div>

    <div v-if="message" class="p-3 rounded-lg" :class="message.type==='success'?'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400':'bg-red-500/10 border border-red-500/30 text-red-400'">
      {{ message.text }}
    </div>

    <div v-if="loading" class="space-y-3">
      <div v-for="i in 5" :key="i" class="card-glass h-16 animate-pulse rounded-xl"></div>
    </div>

    <div v-else class="card-glass overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-800">
            <th class="text-left py-4 px-6 text-slate-400 text-sm font-medium">User</th>
            <th class="text-left py-4 px-6 text-slate-400 text-sm font-medium hidden sm:table-cell">Mobile</th>
            <th class="text-left py-4 px-6 text-slate-400 text-sm font-medium hidden md:table-cell">Role</th>
            <th class="text-left py-4 px-6 text-slate-400 text-sm font-medium">Status</th>
            <th class="text-right py-4 px-6 text-slate-400 text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800">
          <tr v-for="user in displayedUsers" :key="user.id"
              class="hover:bg-slate-800/30 transition-colors">
            <td class="py-4 px-6">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-display font-semibold text-sm flex-shrink-0">
                  {{ user.fullName?.charAt(0) }}
                </div>
                <div>
                  <div class="text-white text-sm font-medium">{{ user.fullName }}</div>
                  <div class="text-slate-500 text-xs">{{ user.email }}</div>
                </div>
              </div>
            </td>
            <td class="py-4 px-6 text-slate-400 text-sm hidden sm:table-cell">{{ user.mobile }}</td>
            <td class="py-4 px-6 hidden md:table-cell">
              <select @change="e => assignRole(user.id, e.target.value)"
                      :value="user.roles?.[0]"
                      class="text-xs bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-500">
                <option value="USER">USER</option>
                <option value="SYSTEM_ADMIN">SYSTEM_ADMIN</option>
              </select>
            </td>
            <td class="py-4 px-6">
              <div class="flex flex-col gap-1">
                <span :class="user.emailVerified?'bg-emerald-500/10 text-emerald-400 border-emerald-500/20':'bg-slate-700/50 text-slate-500 border-slate-700'"
                      class="inline-flex items-center px-2 py-0.5 text-xs rounded border w-fit">
                  {{ user.emailVerified ? '✓ Verified' : '○ Unverified' }}
                </span>
                <span :class="user.adminApproved?'bg-cyan-500/10 text-cyan-400 border-cyan-500/20':'bg-amber-500/10 text-amber-400 border-amber-500/20'"
                      class="inline-flex items-center px-2 py-0.5 text-xs rounded border w-fit">
                  {{ user.adminApproved ? '✓ Approved' : '⏳ Pending' }}
                </span>
              </div>
            </td>
            <td class="py-4 px-6">
              <div class="flex items-center justify-end gap-2">
                <button v-if="!user.adminApproved && user.emailVerified" @click="approve(user.id)"
                        class="px-3 py-1.5 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/20 transition-colors font-medium">
                  Approve
                </button>
                <button v-if="!user.adminApproved" @click="reject(user.id)"
                        class="px-3 py-1.5 text-xs bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-colors font-medium">
                  Reject
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="displayedUsers.length === 0" class="py-12 text-center text-slate-500">
        No users found
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { adminAPI } from '@/services/api'

const users = ref([]), pending = ref([]), loading = ref(true)
const tab = ref('all'), message = ref(null)

const displayedUsers = computed(() => tab.value === 'pending' ? pending.value : users.value)

const showMsg = (text, type='success') => {
  message.value = { text, type }
  setTimeout(() => message.value = null, 3000)
}

const load = async () => {
  loading.value = true
  try {
    const [all, pend] = await Promise.all([adminAPI.getUsers(), adminAPI.getPending()])
    users.value = all.data.data; pending.value = pend.data.data
  } finally { loading.value = false }
}

const approve = async id => {
  try { await adminAPI.approveUser(id); showMsg('User approved!'); await load() }
  catch { showMsg('Failed', 'error') }
}
const reject = async id => {
  try { await adminAPI.rejectUser(id); showMsg('User rejected'); await load() }
  catch { showMsg('Failed', 'error') }
}
const assignRole = async (id, role) => {
  try { await adminAPI.assignRole(id, role); showMsg('Role updated') }
  catch { showMsg('Failed', 'error') }
}

onMounted(load)
</script>