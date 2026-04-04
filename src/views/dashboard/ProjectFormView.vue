<template>
  <div class="max-w-3xl space-y-6">
    <div class="flex items-center gap-3">
      <RouterLink to="/dashboard/projects" class="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </RouterLink>
      <h2 class="font-display font-bold text-xl text-white">{{ isEdit ? 'Edit Project' : 'New Project' }}</h2>
    </div>

    <div v-if="success" class="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
      ✅ Project {{ isEdit ? 'updated' : 'created' }} successfully!
      <RouterLink to="/dashboard/projects" class="ml-2 underline">View all projects</RouterLink>
    </div>
    <div v-if="error" class="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">{{ error }}</div>

    <form @submit.prevent="handleSubmit" class="card-glass p-8 space-y-6">
      <div class="grid sm:grid-cols-2 gap-5">
        <div class="sm:col-span-2">
          <label class="block text-sm text-slate-400 mb-1.5">Title *</label>
          <input v-model="form.title" type="text" class="input-field" placeholder="Project Title" required />
        </div>
        <div>
          <label class="block text-sm text-slate-400 mb-1.5">Category</label>
          <input v-model="form.category" type="text" class="input-field" placeholder="Web App, Mobile, SaaS..." />
        </div>
        <div>
          <label class="block text-sm text-slate-400 mb-1.5">Tech Stack</label>
          <input v-model="form.techStack" type="text" class="input-field" placeholder="Vue.js, Spring Boot, PostgreSQL" />
        </div>
        <div>
          <label class="block text-sm text-slate-400 mb-1.5">Project Link</label>
          <input v-model="form.projectLink" type="url" class="input-field" placeholder="https://..." />
        </div>
        <div>
          <label class="block text-sm text-slate-400 mb-1.5">GitHub Link</label>
          <input v-model="form.githubLink" type="url" class="input-field" placeholder="https://github.com/..." />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-sm text-slate-400 mb-1.5">Short Description</label>
          <input v-model="form.shortDescription" type="text" class="input-field" placeholder="One-liner summary..." />
        </div>
        <div class="sm:col-span-2">
          <label class="block text-sm text-slate-400 mb-1.5">Full Description</label>
          <textarea v-model="form.description" rows="5" class="input-field resize-none"
                    placeholder="Detailed project description..."></textarea>
        </div>
        <div>
          <label class="block text-sm text-slate-400 mb-1.5">Display Order</label>
          <input v-model.number="form.displayOrder" type="number" class="input-field" placeholder="1" />
        </div>
        <div class="flex gap-6 items-center pt-6">
          <label class="flex items-center gap-2 cursor-pointer">
            <input v-model="form.featured" type="checkbox" class="w-4 h-4 accent-cyan-500" />
            <span class="text-slate-300 text-sm">Featured</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input v-model="form.published" type="checkbox" class="w-4 h-4 accent-cyan-500" />
            <span class="text-slate-300 text-sm">Published</span>
          </label>
        </div>
      </div>

      <!-- Image Upload -->
      <div>
        <label class="block text-sm text-slate-400 mb-3">Project Images</label>
        <div
          @dragover.prevent @drop.prevent="handleDrop"
          @click="$refs.fileInput.click()"
          class="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:bg-slate-800/30">
          <svg class="w-10 h-10 text-slate-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <p class="text-slate-400 text-sm">Click or drag images here</p>
          <p class="text-slate-600 text-xs mt-1">PNG, JPG, WEBP up to 10MB each</p>
          <input ref="fileInput" type="file" multiple accept="image/*" @change="handleFileChange" class="hidden" />
        </div>

        <!-- Preview -->
        <div v-if="previewImages.length" class="grid grid-cols-4 gap-3 mt-4">
          <div v-for="(img, i) in previewImages" :key="i" class="relative group rounded-lg overflow-hidden aspect-square bg-slate-800">
            <img :src="img.url" class="w-full h-full object-cover" />
            <button @click.prevent="removeImage(i)"
                    class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-red-400">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Existing images (edit mode) -->
        <div v-if="existingImages.length" class="mt-4">
          <p class="text-slate-500 text-xs mb-2">Existing images:</p>
          <div class="grid grid-cols-4 gap-3">
            <div v-for="img in existingImages" :key="img.id" class="relative rounded-lg overflow-hidden aspect-square bg-slate-800">
              <img :src="img.fileUrl" class="w-full h-full object-cover" />
              <span v-if="img.isPrimary" class="absolute top-1 left-1 text-xs bg-cyan-500/80 text-white px-1.5 py-0.5 rounded">Primary</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-4 pt-2">
        <RouterLink to="/dashboard/projects" class="btn-outline flex-1 justify-center">Cancel</RouterLink>
        <button type="submit" :disabled="submitting" class="btn-primary flex-1 justify-center">
          <svg v-if="submitting" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          {{ submitting ? 'Saving...' : (isEdit ? 'Update Project' : 'Create Project') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { projectAPI } from '@/services/api'

const route = useRoute()
const isEdit = computed(() => !!route.params.id)
const form = ref({ title:'', description:'', shortDescription:'', projectLink:'', githubLink:'', category:'', techStack:'', featured:false, published:true, displayOrder:null })
const selectedFiles = ref([]), previewImages = ref([])
const existingImages = ref([])
const submitting = ref(false), success = ref(false), error = ref('')
const fileInput = ref(null)

onMounted(async () => {
  if (isEdit.value) {
    try {
      const { data } = await projectAPI.getById(route.params.id)
      const p = data.data
      Object.assign(form.value, { title:p.title, description:p.description, shortDescription:p.shortDescription,
        projectLink:p.projectLink, githubLink:p.githubLink, category:p.category, techStack:p.techStack,
        featured:p.featured, published:p.published, displayOrder:p.displayOrder })
      existingImages.value = p.images || []
    } catch(e) { error.value = 'Failed to load project' }
  }
})

const handleFileChange = e => addFiles(Array.from(e.target.files))
const handleDrop = e => addFiles(Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/')))
const addFiles = files => {
  files.forEach(file => {
    selectedFiles.value.push(file)
    const reader = new FileReader()
    reader.onload = e => previewImages.value.push({ url: e.target.result, name: file.name })
    reader.readAsDataURL(file)
  })
}
const removeImage = i => { selectedFiles.value.splice(i, 1); previewImages.value.splice(i, 1) }

const handleSubmit = async () => {
  submitting.value = true; error.value = ''
  try {
    const formData = new FormData()
    formData.append('data', new Blob([JSON.stringify(form.value)], { type: 'application/json' }))
    selectedFiles.value.forEach(f => formData.append('images', f))
    if (isEdit.value) await projectAPI.update(route.params.id, formData)
    else await projectAPI.create(formData)
    success.value = true
  } catch(e) {
    error.value = e.response?.data?.message || 'Failed to save project'
  } finally { submitting.value = false }
}
</script>