<template>
  <section id="projects" class="py-8 bg-[#020617] relative overflow-hidden" @mousemove="handleGlobalMouseMove">
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#1e293b,transparent)] opacity-40"></div>
      <div class="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]"></div>
    </div>
    
    <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
      
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-4 border-b border-white/5 pb-2">
  <div class="max-w-2xl">
    <div class="flex items-center gap-2 mb-4">
      <span class="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
      <span class="text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em]">Engineering Portfolio</span>
    </div>
    
    <h2 class="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-4">
      Selected <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 pe-2">Works</span>
    </h2>
    
    <p class="text-slate-400 text-base font-medium max-w-lg leading-relaxed opacity-80">
      Full-stack deployments and hardware integrations optimized for performance.
    </p>
  </div>

  <div class="flex flex-wrap items-center gap-1 p-1 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-xl shrink-0">
    <button v-for="tab in ['All', 'Ecommerce', 'Web', 'Embedded']" :key="tab"
      @click="activeFilter = tab"
      :class="[
        'px-5 py-2.5 rounded-xl text-[13px] font-black uppercase tracking-widest transition-all duration-300 relative group',
        activeFilter === tab ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-white'
      ]">
      <span class="relative z-10">{{ tab }}</span>
    </button>
  </div>
</div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TransitionGroup name="project-grid">
          <div v-for="project in filteredProjects" :key="project.id" 
               @mousemove="handleCardMove($event, project.id)"
               @mouseleave="handleCardLeave(project.id)"
               :id="`card-${project.id}`"
               class="project-card group relative flex flex-col bg-[#0f172a]/40 border border-white/[0.05] rounded-[3.5rem] overflow-hidden transition-all duration-500 hover:border-cyan-500/30 hover:-translate-y-4">
            
            <div class="glow-layer absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                 :style="cardGlows[project.id]"></div>

            <div class="relative aspect-[16/11] overflow-hidden m-5 rounded-[2.5rem] bg-slate-800">
              <img :src="project.image" :alt="project.title" 
                   class="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
              
              <div class="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>
              
              <div class="absolute top-6 left-6 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span class="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-[9px] font-black text-white uppercase tracking-widest">
                  {{ project.category }}
                </span>
              </div>
            </div>

            <div class="px-10 pb-12 flex flex-col flex-1 relative z-10">
              <div class="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 class="text-3xl font-black text-white tracking-tighter mb-2 group-hover:text-cyan-400 transition-colors duration-500">
                    {{ project.title }}
                  </h3>
                  <div class="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                    {{ project.status }}
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <button @click="openZoom(project)" 
                          class="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all active:scale-90">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  </button>
                  <a :href="project.liveUrl" target="_blank"
                     class="w-12 h-12 flex items-center justify-center rounded-2xl bg-cyan-500 text-black hover:bg-white hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all active:scale-90">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              </div>

              <p class="text-slate-400 text-sm font-medium leading-relaxed mb-10 opacity-70 group-hover:opacity-100 transition-opacity">
                {{ project.description }}
              </p>

              <div class="mt-auto flex flex-wrap gap-2">
                <span v-for="tag in project.tags" :key="tag" 
                      class="text-[9px] font-black uppercase tracking-widest px-3.5 py-2 rounded-xl bg-white/[0.03] text-slate-500 border border-white/[0.05] group-hover:border-cyan-500/20 group-hover:text-cyan-400 transition-all duration-500">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <Transition name="modal-premium">
      <div v-if="activeProject" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <div @click="closeModal" class="absolute inset-0 bg-[#020617]/95 backdrop-blur-3xl"></div>
        
        <div class="relative bg-[#0f172a] border border-white/10 rounded-[4rem] max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col lg:flex-row">
          <div class="w-full lg:w-[65%] bg-black/40 flex flex-col relative group/gallery">
            <div class="flex-1 flex items-center justify-center p-12">
               <Transition name="gallery-fade" mode="out-in">
                  <img :key="currentImageIndex" :src="activeProject.gallery[currentImageIndex]" 
                       class="max-w-full max-h-[50vh] object-contain rounded-3xl shadow-2xl" />
               </Transition>
            </div>
            
            <div class="absolute inset-y-0 inset-x-8 flex items-center justify-between pointer-events-none">
              <button @click="prevImage" class="p-5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all pointer-events-auto backdrop-blur-xl opacity-0 group-hover/gallery:opacity-100">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="3" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button @click="nextImage" class="p-5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-cyan-500 hover:text-black transition-all pointer-events-auto backdrop-blur-xl opacity-0 group-hover/gallery:opacity-100">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="3" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>

            <div class="p-8 border-t border-white/5 bg-black/20 flex justify-center gap-3">
              <button v-for="(img, idx) in activeProject.gallery" :key="idx"
                @click="currentImageIndex = idx"
                :class="['w-16 h-16 rounded-2xl border-2 transition-all overflow-hidden', 
                currentImageIndex === idx ? 'border-cyan-500 scale-110' : 'border-transparent opacity-30 hover:opacity-100']">
                <img :src="img" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>
          
          <div class="w-full lg:w-[35%] p-12 lg:p-20 overflow-y-auto custom-scrollbar bg-slate-900/50">
            <button @click="closeModal" class="absolute top-10 right-10 text-slate-500 hover:text-white transition-colors">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2"/></svg>
            </button>
            
            <h2 class="text-5xl font-black text-white mb-8 tracking-tightest leading-none">{{ activeProject.title }}</h2>
            
            <div class="flex gap-3 mb-12">
              <span class="px-5 py-2 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                {{ activeProject.category }}
              </span>
            </div>
            
            <p class="text-slate-400 text-lg leading-relaxed font-medium mb-12">
              {{ activeProject.description }}
            </p>
            
            <div class="space-y-8 mb-16">
              <h4 class="text-white text-[10px] font-black uppercase tracking-[0.4em] opacity-50">Tech Architecture</h4>
              <div class="flex flex-wrap gap-3">
                <span v-for="tag in activeProject.tags" :key="tag" class="px-5 py-3 bg-white/5 rounded-2xl text-[11px] text-slate-300 border border-white/10 font-black tracking-widest">
                  {{ tag }}
                </span>
              </div>
            </div>

            <a :href="activeProject.liveUrl" target="_blank" 
               class="flex items-center justify-center gap-4 w-full py-6 bg-white text-black font-black rounded-3xl text-xs tracking-widest uppercase hover:bg-cyan-400 transition-all shadow-2xl">
              <span>View Live Case Study</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const activeFilter = ref('All')
const activeProject = ref(null)
const currentImageIndex = ref(0)
const cardGlows = reactive({})

const handleCardMove = (e, id) => {
  const card = document.getElementById(`card-${id}`)
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  cardGlows[id] = {
    background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(6, 182, 212, 0.15), transparent 40%)`
  }
}

const handleCardLeave = (id) => {
  cardGlows[id] = { background: 'transparent' }
}

const projects = ref([
  {
    id: 1,
    title: 'LuxeCart Global',
    category: 'Ecommerce',
    status: 'Production Live',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200'
    ],
    description: 'A premium headless e-commerce engine utilizing MedusaJS. Features include real-time inventory, global tax calculation, and specialized 1-click checkout flows.',
    tags: ['MedusaJS', 'Next.js 14', 'Stripe', 'Redis'],
    liveUrl: '#'
  },
  {
    id: 2,
    title: 'BizDesk ERP v2',
    category: 'Web',
    status: 'Active Dev',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
      'https://images.unsplash.com/photo-1504868584819-f8eec7b61a77?q=80&w=1200',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200'
    ],
    description: 'High-scale multi-tenant enterprise resource planning system with modular billing, marketplace logistics, and automated management for institutions.',
    tags: ['Vue 3', 'Spring Boot', 'PostgreSQL', 'PWA'],
    liveUrl: '#'
  },
  {
    id: 3,
    title: 'Smart Attendance',
    category: 'Embedded',
    status: 'Field Testing',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200',
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1200',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1200'
    ],
    description: 'IoT hardware ecosystem utilizing Arduino and biometric sensors. Integrated with a cloud dashboard for real-time institutional oversight.',
    tags: ['Arduino', 'C++', 'IoT', 'PlatformIO'],
    liveUrl: '#'
  },
  {
    id: 4,
    title: 'Pulse Analytics',
    category: 'Web',
    status: 'Production Live',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200'
    ],
    description: 'Real-time data visualization platform for SaaS metrics. Features custom dashboard builders and automated PDF reporting with high-speed processing.',
    tags: ['React', 'D3.js', 'Node.js', 'Redis'],
    liveUrl: '#'
  },
  {
    id: 5,
    title: 'MarketMaster B2B',
    category: 'Ecommerce',
    status: 'Active Dev',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200',
      'https://images.unsplash.com/photo-1534452203294-49c8913721b2?q=80&w=1200'
    ],
    description: 'Wholesale marketplace engine with tiered pricing logic, supplier onboarding workflows, and bulk order management systems.',
    tags: ['Next.js 14', 'Prisma', 'Tailwind', 'PostgreSQL'],
    liveUrl: '#'
  },
  {
    id: 6,
    title: 'GravityBox SDK',
    category: 'Embedded',
    status: 'Archived',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200'
    ],
    description: 'Proprietary physics sandbox engine for rigid-body simulations. Optimized for public exhibitions with 144Hz refresh rate support.',
    tags: ['Matter.js', 'Canvas API', 'Electron', 'C++'],
    liveUrl: '#'
  },
  {
    id: 7,
    title: 'Amra Pari Portal',
    category: 'Web',
    status: 'Production Live',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200'
    ],
    description: 'Social impact platform managing educational resources and student lifecycle management for the Amra Pari school initiative.',
    tags: ['MERN Stack', 'Redux', 'AWS S3', 'MongoDB'],
    liveUrl: '#'
  },
  {
    id: 8,
    title: 'CryptoFlux Wallet',
    category: 'Web',
    status: 'Beta Demo',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200'
    ],
    description: 'A non-custodial cryptocurrency wallet dashboard with real-time price tracking, gas fee estimation, and multi-chain support.',
    tags: ['Vue 3', 'Web3.js', 'Ether.js', 'Pinia'],
    liveUrl: '#'
  },
  {
    id: 9,
    title: 'Gemini SQL Agent',
    category: 'Web',
    status: 'Active Dev',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200',
      'https://images.unsplash.com/photo-1684369585053-29478e87f17b?q=80&w=1200'
    ],
    description: 'Advanced AI system that interprets natural language to generate production-ready SQL schemas and optimized database triggers.',
    tags: ['Gemini 2.0', 'Python', 'FastAPI', 'Vector DB'],
    liveUrl: '#'
  },
  {
    id: 10,
    title: 'Zenith Logistics',
    category: 'Web',
    status: 'Field Testing',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200',
      'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=1200'
    ],
    description: 'Fleet management and supply chain tracking system with real-time GPS integration and automated route optimization.',
    tags: ['Nuxt 3', 'Leaflet.js', 'NestJS', 'Docker'],
    liveUrl: '#'
  }
])

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return projects.value
  return projects.value.filter(p => p.category === activeFilter.value)
})

const openZoom = (project) => {
  activeProject.value = project
  currentImageIndex.value = 0
}

const closeModal = () => { activeProject.value = null }
const nextImage = () => { currentImageIndex.value = (currentImageIndex.value + 1) % activeProject.value.gallery.length }
const prevImage = () => { currentImageIndex.value = (currentImageIndex.value - 1 + activeProject.value.gallery.length) % activeProject.value.gallery.length }
</script>

<style scoped>
/* Project Grid Staggered Reveal */
.project-grid-enter-active {
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.project-grid-enter-from {
  opacity: 0;
  transform: translateY(100px) skewY(5deg);
}

/* Premium Modal Animation */
.modal-premium-enter-active { transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-premium-leave-active { transition: all 0.5s ease; }
.modal-premium-enter-from { opacity: 0; transform: scale(1.1) translateY(20px); filter: blur(20px); }

/* Gallery Transition */
.gallery-fade-enter-active, .gallery-fade-leave-active { transition: all 0.5s ease; }
.gallery-fade-enter-from { opacity: 0; transform: translateX(20px); }
.gallery-fade-leave-to { opacity: 0; transform: translateX(-20px); }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

h2 { letter-spacing: -0.07em; }
</style>