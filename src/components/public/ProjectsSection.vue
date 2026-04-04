<template>
  <section id="projects" class="py-5 lg:py-8 relative bg-[#020617] overflow-hidden">
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
        <div class="max-w-2xl text-left">
          <h2 class="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            Explore our
            <span class="text-transparent pe-2 bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">
              Projects
            </span>
          </h2>
          <p class="text-slate-400 text-base md:text-lg font-light leading-relaxed">
            From complex enterprise systems to elegant brand experiences. 
            Filtered by industry excellence.
          </p>
        </div>

        <div class="flex flex-wrap gap-2 p-1.5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
          <button 
            v-for="cat in categories" :key="cat"
            @click="setCategory(cat)"
            :class="[
              'px-3 md:px-5 py-2 md:py-2.5 rounded-xl text-[10px] md:text-xs font-bold transition-all duration-500 uppercase tracking-tighter',
              activeCategory === cat 
                ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
        <TransitionGroup name="project-card">
          <article
            v-for="(project, i) in paginatedProjects"
            :key="project.id || i"
            class="group relative bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:border-cyan-500/50"
          >
            <div class="relative h-32 sm:h-48 md:h-64 overflow-hidden m-1.5 md:m-3 rounded-[1rem] md:rounded-[1.8rem]">
              <img :src="project.imageUrl" :alt="project.title"
                   class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              
              <div class="absolute inset-0 bg-[#020617]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-2 md:gap-4">
                <button @click="openLightbox(project)" class="p-2 md:p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-cyan-500 hover:text-black transition-all">
                  <svg class="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                </button>
                <a :href="project.projectLink" target="_blank" class="p-2 md:p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-cyan-500 hover:text-black transition-all">
                  <svg class="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </a>
              </div>

              <div class="absolute top-2 left-2 md:top-4 md:left-4">
                <span class="px-2 md:px-4 py-1 text-[8px] md:text-[10px] font-black tracking-widest bg-[#020617]/80 backdrop-blur-md text-cyan-400 border border-white/10 rounded-full uppercase">
                  {{ project.category }}
                </span>
              </div>
            </div>

            <div class="p-4 md:p-8 pt-2 md:pt-4">
              <div class="flex justify-between items-start mb-2 md:mb-4">
                <h3 class="text-sm md:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {{ project.title }}
                </h3>
              </div>
              
              <p class="hidden md:block text-slate-400 text-sm leading-relaxed mb-8 line-clamp-2">
                {{ project.description }}
              </p>

              <div class="hidden md:flex flex-wrap gap-2 mb-8">
                <span v-for="tech in project.techStack?.split(',')" :key="tech"
                      class="text-[10px] font-bold text-slate-500 border border-white/5 px-3 py-1 rounded-lg">
                  {{ tech.trim() }}
                </span>
              </div>
              
              <div class="flex items-center gap-2 md:gap-4">
                <a :href="project.projectLink" target="_blank"
                   class="flex-1 flex items-center justify-center gap-2 py-2.5 md:py-4 bg-white text-black text-[10px] md:text-xs font-black rounded-xl md:rounded-2xl hover:bg-cyan-400 transition-all active:scale-95">
                  LIVE
                </a>
                <a :href="project.githubLink" target="_blank"
                   class="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center border border-white/10 rounded-xl md:rounded-2xl text-white hover:bg-white/5 transition-all">
                  <svg class="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </a>
              </div>
            </div>
          </article>
        </TransitionGroup>
      </div>

      <div v-if="hasMore" class="mt-12 text-center">
        <button @click="visibleCount += 4" 
                class="inline-flex items-center gap-4 px-8 md:px-12 py-4 md:py-5 bg-transparent border border-white/10 text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-500">
          EXPLORE MORE
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </button>
      </div>
    </div>

    <Transition name="zoom">
      <div v-if="lightbox.isOpen" class="fixed inset-0 z-[1000] bg-[#020617]/95 backdrop-blur-2xl flex items-center justify-center p-6" @click="lightbox.isOpen = false">
        <div class="relative max-w-6xl w-full flex flex-col md:flex-row gap-8 items-center" @click.stop>
          <div class="flex-1 relative">
            <img :src="lightbox.currentImage" class="w-full h-auto rounded-[2rem] shadow-2xl border border-white/10" />
            <button @click="prevImg" class="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 rounded-full hover:bg-cyan-500 transition-all">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button @click="nextImg" class="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 rounded-full hover:bg-cyan-500 transition-all">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
          <div class="w-full md:w-80 text-left">
            <h4 class="text-3xl font-black text-white mb-2">{{ lightbox.project?.title }}</h4>
            <p class="text-cyan-400 font-bold uppercase text-xs mb-6">{{ lightbox.project?.category }}</p>
            <div class="flex gap-2 overflow-x-auto pb-4">
              <img v-for="(img, idx) in lightbox.project?.allImages" :key="idx"
                   :src="img" @click="lightbox.currentImage = img"
                   :class="['w-16 h-16 rounded-xl object-cover cursor-pointer border-2 transition-all', lightbox.currentImage === img ? 'border-cyan-500' : 'border-transparent opacity-40']" />
            </div>
            <a :href="lightbox.project?.projectLink" target="_blank" class="block w-full py-4 bg-cyan-500 text-black text-center font-black rounded-xl mt-6">VISIT WEBSITE</a>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useProjectStore } from '@/store/projects'
import { storeToRefs } from 'pinia'

const store = useProjectStore()
const { projects, loading } = storeToRefs(store)

const activeCategory = ref('All')
const visibleCount = ref(6)
const categories = ['All', 'Web App', 'SaaS', 'E-Commerce', 'Portfolio']

const setCategory = (cat) => {
  activeCategory.value = cat
  visibleCount.value = 6 
}

const lightbox = reactive({ isOpen: false, currentImage: '', project: null })
const openLightbox = (project) => {
  lightbox.project = project
  lightbox.currentImage = project.allImages[0]
  lightbox.isOpen = true
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

const dummyProjects = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  title: ['Finova Dashboard', 'Cyber Mart', 'Quantum LMS', 'Aura Fitness'][i % 4],
  category: categories[i % 4 + 1],
  description: 'Building high-scale infrastructure with focus on accessibility and raw performance.',
  techStack: 'Vue 3, Tailwind, Node.js, AWS',
  imageUrl: `https://picsum.photos/seed/${i + 50}/800/800`,
  allImages: [
    `https://picsum.photos/seed/${i + 50}/800/800`,
    `https://picsum.photos/seed/${i + 60}/800/800`,
    `https://picsum.photos/seed/${i + 70}/800/800`
  ],
  projectLink: 'https://softshine.io',
  githubLink: 'https://github.com'
}))

const filteredProjects = computed(() => {
  const data = projects.value.length > 0 ? projects.value : dummyProjects
  if (activeCategory.value === 'All') return data
  return data.filter(p => p.category === activeCategory.value)
})

const paginatedProjects = computed(() => filteredProjects.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < filteredProjects.value.length)

onMounted(() => store.fetchPublic())
</script>

<style scoped>
.project-card-enter-active, .project-card-leave-active {
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}
.project-card-enter-from { opacity: 0; transform: translateY(40px) scale(0.95); }
.project-card-leave-to { opacity: 0; transform: scale(0.9); }
.project-card-move { transition: transform 0.6s ease; }

.zoom-enter-active, .zoom-leave-active { transition: opacity 0.4s ease; }
.zoom-enter-from .relative, .zoom-leave-to .relative { transform: scale(0.8); opacity: 0; }
.zoom-enter-active .relative, .zoom-leave-active .relative { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
</style>