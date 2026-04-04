<template>
  <section id="projects" class="py-20 lg:py-32 relative bg-[#020617] overflow-hidden">
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black tracking-widest uppercase mb-6">
            Portfolio
          </div>
          <h2 class="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Our Selected <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Works</span>
          </h2>
          <p class="text-slate-400 text-lg font-medium leading-relaxed">
            A curation of high-performance applications and digital experiences built for global impact.
          </p>
        </div>

        <div class="flex flex-wrap gap-2 p-1.5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 self-start">
          <button 
            v-for="cat in categories" :key="cat"
            @click="activeCategory = cat"
            :class="[
              'px-5 py-2.5 rounded-xl text-[10px] font-black transition-all duration-500 uppercase tracking-widest',
              activeCategory === cat 
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/40' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TransitionGroup name="project-card">
          <article
            v-for="project in filteredProjects"
            :key="project.id"
            class="group relative bg-white/[0.02] border border-white/10 rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-cyan-500/50 hover:bg-white/[0.04]"
          >
            <div class="relative h-64 overflow-hidden m-3 rounded-[1.8rem] bg-slate-900">
              <img :src="project.imageUrl" :alt="project.title"
                   class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
              
              <div class="absolute inset-0 bg-[#020617]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 backdrop-blur-sm">
                <button @click="openLightbox(project)" class="p-4 bg-white text-black rounded-full hover:bg-cyan-500 transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                </button>
                <a :href="project.projectLink" target="_blank" class="p-4 bg-white/10 border border-white/20 text-white rounded-full hover:bg-cyan-500 hover:text-black transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </a>
              </div>

              <div class="absolute top-4 left-4">
                <span class="px-4 py-1.5 text-[9px] font-black tracking-widest bg-black/60 backdrop-blur-md text-white border border-white/10 rounded-full uppercase">
                  {{ project.category }}
                </span>
              </div>
            </div>

            <div class="p-8 pt-4">
              <h3 class="text-2xl font-black text-white tracking-tight group-hover:text-cyan-400 transition-colors mb-3">
                {{ project.title }}
              </h3>
              <p class="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 font-medium">
                {{ project.description }}
              </p>

              <div class="flex flex-wrap gap-2">
                <span v-for="tech in project.techStack" :key="tech"
                      class="text-[9px] font-black text-cyan-400/70 border border-cyan-500/10 bg-cyan-500/5 px-3 py-1 rounded-lg uppercase tracking-tighter">
                  {{ tech }}
                </span>
              </div>
            </div>
          </article>
        </TransitionGroup>
      </div>
    </div>

    <Transition name="zoom">
      <div v-if="lightbox.isOpen" class="fixed inset-0 z-[1000] bg-[#020617]/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-10" @click="closeLightbox">
        
        <button @click="closeLightbox" class="absolute top-6 right-6 md:top-10 md:right-10 z-[1010] p-4 bg-white/10 hover:bg-red-500 text-white rounded-full transition-all group">
          <svg class="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div class="relative max-w-6xl w-full flex flex-col lg:flex-row gap-10 items-center" @click.stop>
          <div class="flex-1 relative group/gallery w-full">
            <div class="aspect-video overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
              <img :src="lightbox.currentImage" class="w-full h-full object-cover" />
            </div>
            
            <button @click="prevImg" class="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition-all opacity-0 group-hover/gallery:opacity-100">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button @click="nextImg" class="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition-all opacity-0 group-hover/gallery:opacity-100">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>

          <div class="w-full lg:w-96 text-left shrink-0">
            <h4 class="text-4xl font-black text-white mb-2 tracking-tighter">{{ lightbox.project?.title }}</h4>
            <p class="text-cyan-400 font-black uppercase text-[10px] tracking-[0.3em] mb-6">{{ lightbox.project?.category }}</p>
            
            <p class="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
              {{ lightbox.project?.description }}
            </p>

            <div class="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
              <img v-for="(img, idx) in lightbox.project?.allImages" :key="idx"
                   :src="img" @click="lightbox.currentImage = img"
                   :class="['w-20 h-20 rounded-2xl object-cover cursor-pointer border-2 transition-all shrink-0', lightbox.currentImage === img ? 'border-cyan-500 scale-95' : 'border-transparent opacity-30 hover:opacity-100']" />
            </div>

            <a :href="lightbox.project?.projectLink" target="_blank" 
               class="flex items-center justify-center gap-3 w-full py-5 bg-cyan-500 text-black font-black rounded-2xl hover:bg-white transition-all">
              LIVE PREVIEW
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const activeCategory = ref('All')
const categories = ['All', 'Web App', 'FinTech', 'SaaS', 'E-Commerce', 'Branding']

const allProjects = [
  { id: 1, title: 'Taraban', category: 'E-Commerce', description: 'Real-time transaction tracking and AI-driven spending insights for modern banking.', techStack: ['Vue 3', 'Chart.js', 'Firebase'], imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', allImages: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'], projectLink: '#' },
  { id: 2, title: 'Robotest', category: 'Web App', description: 'Scaleable learning management system supporting 10k+ concurrent users.', techStack: ['Node.js', 'Tailwind', 'PostgreSQL'], imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800', allImages: ['https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'], projectLink: '#' },
  { id: 3, title: 'Amra Pari', category: 'Web App', description: 'Luxury fashion marketplace featuring AR try-on and high-speed checkout.', techStack: ['Shopify', 'Three.js', 'Vue'], imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800', allImages: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800'], projectLink: '#' },
  { id: 4, title: 'Soft Shine', category: 'SaaS', description: 'Enterprise-grade CRM with automated lead scoring and deep integrations.', techStack: ['React', 'Supabase', 'Express'], imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800', allImages: ['https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'], projectLink: '#' },
  { id: 5, title: 'Grab All', category: 'E-Commerce', description: 'Full brand identity for a cybersecurity startup, including 3D logo guidelines.', techStack: ['Figma', 'Blender'], imageUrl: 'https://images.unsplash.com/photo-1634942537034-2531766767d7?auto=format&fit=crop&q=80&w=800', allImages: ['https://images.unsplash.com/photo-1634942537034-2531766767d7?auto=format&fit=crop&q=80&w=800'], projectLink: '#' },
  { id: 6, title: 'HealthPulse Tracker', category: 'Web App', description: 'Wellness application syncing with wearable devices for real-time alerts.', techStack: ['Vue 3', 'WebBluetooth'], imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800', allImages: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'], projectLink: '#' },
  { id: 7, title: 'Ether Real Estate', category: 'SaaS', description: 'Property management system with virtual 360 tours and smart contracts.', techStack: ['Web3', 'Vue', 'Pinia'], imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800', allImages: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800'], projectLink: '#' },
  { id: 8, title: 'Swift Delivery App', category: 'Web App', description: 'On-demand delivery platform with complex route optimization.', techStack: ['Maps API', 'Socket.io'], imageUrl: 'https://images.unsplash.com/photo-1586864387917-f539470e680b?auto=format&fit=crop&q=80&w=800', allImages: ['https://images.unsplash.com/photo-1586864387917-f539470e680b?auto=format&fit=crop&q=80&w=800'], projectLink: '#' },
  { id: 9, title: 'Zenit Meditation', category: 'SaaS', description: 'Wellness subscription platform with high-fidelity audio engine.', techStack: ['Next.js', 'Stripe'], imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800', allImages: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800'], projectLink: '#' },
  { id: 10, title: 'CryptoVault Wallet', category: 'FinTech', description: 'Non-custodial multi-chain wallet focused on security and simplicity.', techStack: ['Ethereum.js', 'Rust'], imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800', allImages: ['https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800'], projectLink: '#' }
]

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') return allProjects
  return allProjects.filter(p => p.category === activeCategory.value)
})

const lightbox = reactive({ isOpen: false, currentImage: '', project: null })

const openLightbox = (project) => {
  lightbox.project = project
  lightbox.currentImage = project.allImages[0]
  lightbox.isOpen = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightbox.isOpen = false
  document.body.style.overflow = 'auto'
}

const nextImg = () => {
  const imgs = lightbox.project.allImages
  const idx = imgs.indexOf(lightbox.currentImage)
  lightbox.currentImage = imgs[(idx + 1) % imgs.length]
}

const prevImg = () => {
  const imgs = lightbox.project.allImages
  const idx = imgs.indexOf(lightbox.currentImage)
  lightbox.currentImage = imgs[(idx - 1 + imgs.length) % imgs.length]
}
</script>

<style scoped>
.project-card-enter-active, .project-card-leave-active { transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
.project-card-enter-from { opacity: 0; transform: translateY(30px) scale(0.95); }
.project-card-leave-to { opacity: 0; transform: scale(0.9); }
.project-card-move { transition: transform 0.6s ease; }

.zoom-enter-active, .zoom-leave-active { transition: opacity 0.4s ease; }
.zoom-enter-from .relative, .zoom-leave-to .relative { transform: scale(0.9) translateY(20px); opacity: 0; }
.zoom-enter-active .relative, .zoom-leave-active .relative { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>