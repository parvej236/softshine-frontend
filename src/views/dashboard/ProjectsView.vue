<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="font-display font-bold text-xl text-white">Projects</h2>
      <RouterLink to="/dashboard/projects/create" class="btn-primary text-sm py-2">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        New Project
      </RouterLink>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="card-glass h-60 animate-pulse rounded-2xl">
        <div class="h-36 bg-slate-800 rounded-t-2xl"></div>
        <div class="p-4 space-y-2">
          <div class="h-4 bg-slate-800 rounded w-3/4"></div>
          <div class="h-3 bg-slate-800 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Projects grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="project in projects" :key="project.id"
           class="card-glass overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 group">
        <!-- Thumbnail -->
        <div class="relative h-40 bg-slate-800">
          <img v-if="project.images?.[0]?.fileUrl" :src="project.images[0].fileUrl"
               :alt="project.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg class="w-10 h-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <!-- Status badges -->
          <div class="absolute top-2 left-2 flex gap-1.5">
            <span v-if="project.featured" class="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded backdrop-blur-sm">⭐ Featured</span>
            <span :class="project.published ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-slate-700/80 text-slate-400 border-slate-600'"
                  class="px-2 py-0.5 text-xs border rounded backdrop-blur-sm">
              {{ project.published ? '✓ Live' : '○ Draft' }}
            </span>
          </div>
        </div>

        <div class="p-4">
          <h3 class="font-display font-semibold text-white mb-1 truncate">{{ project.title }}</h3>
          <p class="text-slate-400 text-xs line-clamp-2 mb-3">{{ project.shortDescription || project.description }}</p>

          <div class="flex items-center justify-between">
            <span v-if="project.category" class="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              {{ project.category }}
            </span>
            <div class="flex items-center gap-2 ml-auto">
              <RouterLink :to="`/dashboard/projects/${project.id}/edit`"
                          class="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-all">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </RouterLink>
              <button @click="confirmDelete(project)"
                      class="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading && projects.length === 0" class="text-center py-16 card-glass rounded-2xl">
      <div class="text-6xl mb-4">📁</div>
      <p class="text-slate-400 mb-6">No projects yet. Create your first one!</p>
      <RouterLink to="/dashboard/projects/create" class="btn-primary">Create Project</RouterLink>
    </div>

    <!-- Delete confirm modal -->
    <div v-if="deleteTarget" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div class="card-glass p-8 max-w-sm w-full glow-border">
        <h3 class="font-display font-bold text-xl text-white mb-2">Delete Project?</h3>
        <p class="text-slate-400 mb-6">This will permanently delete "<strong class="text-white">{{ deleteTarget.title }}</strong>". This cannot be undone.</p>
        <div class="flex gap-3">
          <button @click="deleteTarget=null" class="btn-outline flex-1 justify-center">Cancel</button>
          <button @click="doDelete" :disabled="deleting" class="flex-1 py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors font-display font-semibold">
            {{ deleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { projectAPI } from '@/services/api'

const projects = ref([]), loading = ref(true)
const deleteTarget = ref(null), deleting = ref(false)

const load = async () => {
  loading.value = true
  try { const { data } = await projectAPI.getAll(0, 100); projects.value = data.data.content || [] }
  catch(e) { console.error(e) }
  finally { loading.value = false }
}

const confirmDelete = p => deleteTarget.value = p
const doDelete = async () => {
  deleting.value = true
  try { await projectAPI.delete(deleteTarget.value.id); deleteTarget.value = null; await load() }
  catch(e) { console.error(e) }
  finally { deleting.value = false }
}

onMounted(load)
</script>