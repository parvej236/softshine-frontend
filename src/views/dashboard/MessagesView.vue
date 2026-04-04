<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="font-display font-bold text-xl text-white">Contact Messages</h2>
      <div class="flex gap-4 text-sm">
        <span class="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg">
          {{ stats.unread || 0 }} Unread
        </span>
        <span class="px-3 py-1 bg-slate-700/50 text-slate-400 border border-slate-700 rounded-lg">
          {{ stats.total || 0 }} Total
        </span>
      </div>
    </div>

    <div v-if="loading" class="space-y-3">
      <div v-for="i in 5" :key="i" class="card-glass h-20 animate-pulse rounded-xl"></div>
    </div>

    <div v-else class="space-y-3">
      <div v-for="msg in messages" :key="msg.id"
           class="card-glass p-5 hover:border-slate-700 transition-all duration-200 cursor-pointer"
           :class="msg.status==='UNREAD'?'border-cyan-500/20':''"
           @click="selected = selected?.id === msg.id ? null : msg">
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-3 min-w-0">
            <div :class="msg.status==='UNREAD'?'bg-cyan-400':'bg-slate-600'"
                 class="flex-shrink-0 w-2 h-2 rounded-full mt-2"></div>
            <div class="min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-medium text-white text-sm">{{ msg.name }}</span>
                <span class="text-slate-500 text-xs">{{ msg.email }}</span>
                <span v-if="msg.subject" class="text-cyan-400 text-xs">— {{ msg.subject }}</span>
              </div>
              <p class="text-slate-400 text-sm mt-0.5 truncate">{{ msg.message }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <span class="text-slate-600 text-xs">{{ formatDate(msg.createdAt) }}</span>
            <select @click.stop @change="e => updateStatus(msg.id, e.target.value)"
                    :value="msg.status"
                    class="text-xs bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-500">
              <option>UNREAD</option>
              <option>READ</option>
              <option>REPLIED</option>
            </select>
          </div>
        </div>
        <!-- Expanded -->
        <Transition name="expand">
          <div v-if="selected?.id === msg.id" class="mt-4 pt-4 border-t border-slate-800">
            <p class="text-slate-300 text-sm leading-relaxed">{{ msg.message }}</p>
            <div v-if="msg.phone" class="mt-2 text-slate-500 text-xs">📞 {{ msg.phone }}</div>
          </div>
        </Transition>
      </div>
    </div>

    <div v-if="!loading && messages.length === 0" class="text-center py-16 card-glass rounded-2xl">
      <div class="text-6xl mb-4">📭</div>
      <p class="text-slate-400">No messages yet</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { adminAPI } from '@/services/api'

const messages = ref([]), stats = ref({}), loading = ref(true), selected = ref(null)

const formatDate = d => new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })

const load = async () => {
  loading.value = true
  try {
    const [msgs, s] = await Promise.all([adminAPI.getMessages(), adminAPI.getMessageStats()])
    messages.value = msgs.data.data.content || []
    stats.value = s.data.data
  } finally { loading.value = false }
}

const updateStatus = async (id, status) => {
  try { await adminAPI.updateMessageStatus(id, status); await load() }
  catch(e) { console.error(e) }
}

onMounted(load)
</script>

<style scoped>
.expand-enter-active, .expand-leave-active { transition: all 0.3s ease; overflow: hidden; }
.expand-enter-from, .expand-leave-to { opacity: 0; max-height: 0; }
.expand-enter-to, .expand-leave-from { opacity: 1; max-height: 200px; }
</style>