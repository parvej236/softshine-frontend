<template>
  <section id="projects" class="py-12 bg-[#020617] relative overflow-hidden">
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div
        class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#1e293b,transparent)] opacity-40">
      </div>
      <div class="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 border-b border-white/5 pb-8">
        <div class="max-w-2xl">
          <div class="flex items-center gap-2 mb-3">
            <span class="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
            <span class="text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em]">Engineering Portfolio</span>
          </div>
          <h2 class="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-4">
            Selected <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 pe-2">Works</span>
          </h2>
        </div>

        <div
          class="flex flex-wrap items-center gap-1 p-1 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-xl">
          <button v-for="tab in ['All', 'Ecommerce', 'LMS', 'Blog', 'Portfolio', 'Other']" :key="tab"
            @click="activeFilter = tab" :class="[
              'px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300',
              activeFilter === tab ? 'bg-cyan-500 text-black' : 'text-slate-500 hover:text-white'
            ]">
            {{ tab }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TransitionGroup name="project-grid">
          <div v-for="project in filteredProjects" :key="project.id" @mousemove="handleCardMove($event, project.id)"
            @mouseleave="handleCardLeave(project.id)" :id="`card-${project.id}`"
            class="project-card group relative flex flex-col bg-[#0f172a]/40 border border-white/[0.05] rounded-[3rem] overflow-hidden transition-all duration-500 hover:border-cyan-500/30 hover:-translate-y-3">

            <div class="glow-layer absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
              :style="cardGlows[project.id]"></div>

            <div class="relative aspect-[16/11] overflow-hidden m-4 rounded-[2.2rem] bg-slate-800">
              <img :src="project.image" :alt="project.title"
                class="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80">
              </div>
            </div>

            <div class="px-8 pb-10 flex flex-col flex-1 relative z-10">
              <div class="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 class="text-2xl font-black text-white tracking-tighter mb-1">{{ project.title }}</h3>
                  <div class="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> {{ project.status }}
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <button @click="openZoom(project)" title="View Gallery"
                    class="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-width="2.5"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </button>
                  <a :href="project.liveUrl" target="_blank" title="Live Preview"
                    class="w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-500 text-black hover:bg-white transition-all shadow-lg shadow-cyan-500/20">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-width="3"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
              <p class="text-slate-400 text-xs leading-relaxed mb-6 opacity-80">{{ project.description }}</p>
              <div class="mt-auto flex flex-wrap gap-2">
                <span v-for="tag in project.tags" :key="tag"
                  class="text-[8px] font-black uppercase px-2.5 py-1.5 rounded-lg bg-white/[0.03] text-slate-500 border border-white/[0.05]">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <Transition name="modal-premium">
      <div v-if="activeProject" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div @click="closeModal" class="absolute inset-0 bg-[#020617]/95 backdrop-blur-2xl"></div>

        <div
          class="relative bg-[#0f172a] border border-white/10 rounded-[3rem] max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col">
          <div class="relative group/gallery aspect-video bg-black flex items-center justify-center overflow-hidden">
            <Transition name="gallery-fade" mode="out-in">
              <div :key="currentImageIndex"
                class="relative cursor-zoom-in group/zoom w-full h-full flex items-center justify-center">
                <img :src="activeProject.gallery[currentImageIndex]"
                  class="max-w-[90%] max-h-[85%] object-contain transition-transform duration-700 ease-out group-hover/zoom:scale-[1.8]"
                  @mousemove="handleImageZoom" />
              </div>
            </Transition>

            <button @click="prevImage"
              class="absolute left-6 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-width="3" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button @click="nextImage"
              class="absolute right-6 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-width="3" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button @click="closeModal" class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" stroke-width="2.5" />
              </svg>
            </button>
          </div>

          <div class="p-6 bg-slate-900/50 flex justify-center gap-3">
            <button v-for="(img, idx) in activeProject.gallery" :key="idx" @click="currentImageIndex = idx"
              :class="['w-16 h-12 rounded-lg border-2 transition-all overflow-hidden shrink-0',
                currentImageIndex === idx ? 'border-cyan-500 scale-110 shadow-lg shadow-cyan-500/20' : 'border-transparent opacity-40']">
              <img :src="img" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'

const activeFilter = ref('All')
const activeProject = ref(null)
const currentImageIndex = ref(0)
const cardGlows = reactive({})

const projects = ref([
  { id: 1, title: 'Taraban', category: 'Ecommerce', status: 'Dev', image: new URL('@/assets/projects/taraban-main.png', import.meta.url).href, gallery: [new URL('@/assets/projects/taraban-main.png', import.meta.url).href, new URL('@/assets/projects/taraban-1.png', import.meta.url).href, new URL('@/assets/projects/taraban-2.png', import.meta.url).href], description: 'The Safe Food Movement Platform connects consumers with farmers who produce fresh, nutritious, and chemical-free food. Farmers can sell their products online while ensuring transparency and quality. It also features blogs where farmers share knowledge about healthy living and sustainable agriculture.', tags: ['Spring Boot', 'Vue.js', 'Tailwind CSS', 'Spring Security', 'JWT'], liveUrl: 'https://taraban.netlify.app' },
  { id: 2, title: 'Amrapari', category: 'LMS', status: 'Active', image: new URL('@/assets/projects/amrapari-main.png', import.meta.url).href, gallery: [new URL('@/assets/projects/amrapari-main.png', import.meta.url).href, new URL('@/assets/projects/amrapari-1.png', import.meta.url).href, new URL('@/assets/projects/amrapari-2.png', import.meta.url).href, new URL('@/assets/projects/amrapari-3.png', import.meta.url).href], description: 'Amrapari is a platform for Quantum Cosmo School and College students where they can showcase their expertise, achievements, and success stories while also exploring academic classes and skill development courses; it highlights various extracurricular activities and beautifully presents the campus environment, creating an inspiring and engaging space for both students and visitors.', tags: ['Vue 3', 'Spring Boot', 'PostgreSQL', 'LMS'], liveUrl: 'https://amrapari2-qcsc.netlify.app' },
  { id: 3, title: 'Robotest', category: 'Other', status: 'Archive', image: new URL('@/assets/projects/robotest-main.png', import.meta.url).href, gallery: [new URL('@/assets/projects/robotest-main.png', import.meta.url).href, new URL('@/assets/projects/robotest-1.png', import.meta.url).href], description: 'Rigid-body physics engine for exhibition displays.', tags: ['Matter.js', 'Canvas', 'Electron'], liveUrl: 'https://robo236.netlify.app' },
  { id: 4, title: 'Softshine', category: 'Portfolio', status: 'Dev', image: new URL('@/assets/projects/softshine-main.png', import.meta.url).href, gallery: [new URL('@/assets/projects/softshine-main.png', import.meta.url).href, new URL('@/assets/projects/softshine-1.png', import.meta.url).href], description: 'Wholesale B2B platform with tiered pricing logic.', tags: ['Next.js', 'Prisma', 'PostgreSQL'], liveUrl: 'https://softshine-frontend.netlify.app' },
  { id: 5, title: 'Grab All', category: 'Ecommerce', status: 'Testing', image: new URL('@/assets/projects/graball-main.png', import.meta.url).href, gallery: [new URL('@/assets/projects/graball-main.png', import.meta.url).href, new URL('@/assets/projects/graball-1.png', import.meta.url).href], description: 'IoT biometric system with real-time cloud dashboard.', tags: ['Arduino', 'C++', 'IoT'], liveUrl: 'https://graball.sellbd.shop' },
  { id: 6, title: 'Vue Jobs', category: 'Other', status: 'Live', image: new URL('@/assets/projects/vue-jobs-main.png', import.meta.url).href, gallery: [new URL('@/assets/projects/vue-jobs-main.png', import.meta.url).href, new URL('@/assets/projects/vue-jobs-1.png', import.meta.url).href], description: 'Job board for Vue developers.', tags: ['Vue 3', 'Node.js', 'Express'], liveUrl: 'https://vuecrudproject.netlify.app' },
  { id: 7, title: 'Drop Bangla', category: 'Ecommerce', status: 'Beta', image: new URL('@/assets/projects/drop-bangla-main.png', import.meta.url).href, gallery: [new URL('@/assets/projects/drop-bangla-main.png', import.meta.url).href], description: 'Non-custodial wallet with multi-chain price tracking.', tags: ['Vue 3', 'Web3.js', 'Ether.js'], liveUrl: 'https://storied-pothos-dd65e2.netlify.app' },
  { id: 8, title: 'Devloper Portfolio', category: 'Portfolio', status: 'Active', image: new URL('@/assets/projects/developer-portfolio-main.png', import.meta.url).href, gallery: [new URL('@/assets/projects/developer-portfolio-main.png', import.meta.url).href], description: 'AI agent converting Natural Language to SQL schemas.', tags: ['Gemini 2.0', 'FastAPI'], liveUrl: 'https://dropbangla.netlify.app' },
])

const filteredProjects = computed(() => activeFilter.value === 'All' ? projects.value : projects.value.filter(p => p.category === activeFilter.value))

const handleCardMove = (e, id) => {
  const rect = document.getElementById(`card-${id}`).getBoundingClientRect()
  cardGlows[id] = { background: `radial-gradient(600px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(6,182,212,0.15), transparent 40%)` }
}
const handleCardLeave = (id) => cardGlows[id] = { background: 'transparent' }

const handleImageZoom = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.querySelector('img').style.transformOrigin = `${((e.clientX - rect.left) / rect.width) * 100}% ${((e.clientY - rect.top) / rect.height) * 100}%`
}

const openZoom = (p) => { activeProject.value = p; currentImageIndex.value = 0 }
const closeModal = () => activeProject.value = null
const nextImage = () => currentImageIndex.value = (currentImageIndex.value + 1) % activeProject.value.gallery.length
const prevImage = () => currentImageIndex.value = (currentImageIndex.value - 1 + activeProject.value.gallery.length) % activeProject.value.gallery.length

const handleKey = (e) => {
  if (!activeProject.value) return
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}
onMounted(() => window.addEventListener('keydown', handleKey))
onUnmounted(() => window.removeEventListener('keydown', handleKey))
</script>

<style scoped>
.project-grid-enter-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-grid-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.modal-premium-enter-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-premium-enter-from {
  opacity: 0;
  transform: scale(0.9);
  filter: blur(10px);
}

.gallery-fade-enter-active,
.gallery-fade-leave-active {
  transition: all 0.3s ease;
}

.gallery-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.gallery-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

h2 {
  letter-spacing: -0.05em;
}
</style>