<template>
  <nav :class="[
    'fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out px-4 md:px-8 py-4',
    isScrolled ? 'bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl' : 'bg-transparent'
  ]">
    <div class="max-w-7xl mx-auto flex items-center justify-between relative z-[110]">
      
      <router-link to="/" class="flex items-center gap-3 group" @click="isMobileMenuOpen = false">
        <div class="relative">
          <div class="absolute -inset-1 bg-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <img src="/logo_softshine.png" alt="SoftShine Logo"
            class="relative w-9 h-9 rounded-xl shadow-lg transition-all duration-300">
        </div>
        <span class="text-white font-black text-xl md:text-2xl tracking-tighter">
          Soft<span class="text-cyan-500">Shine</span>
        </span>
      </router-link>

      <div class="hidden md:flex items-center gap-10">
        <a v-for="link in navLinks" :key="link.name" :href="link.href" @click.prevent="scrollTo(link.href)"
          class="text-[11px] font-bold text-slate-400 hover:text-white transition-all tracking-[0.2em] uppercase relative group">
          {{ link.name }}
          <span class="absolute -bottom-2 left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      <div class="flex items-center gap-3 md:gap-6">
        <router-link to="/login"
          class="px-5 py-2 md:px-6 md:py-2.5 bg-cyan-500 text-black text-[10px] md:text-xs font-black rounded-xl hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.3)] uppercase tracking-widest">
          Login
        </router-link>

        <button @click="toggleMenu" class="md:hidden text-white p-2 focus:outline-none" aria-label="Toggle Menu">
          <div class="w-6 flex flex-col items-end gap-1.5">
            <span :class="['h-0.5 bg-white transition-all duration-300 origin-right', isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[1px]' : 'w-6']"></span>
            <span :class="['h-0.5 bg-white transition-all duration-300', isMobileMenuOpen ? 'opacity-0' : 'w-4']"></span>
            <span :class="['h-0.5 bg-white transition-all duration-300 origin-right', isMobileMenuOpen ? 'w-6 rotate-45 translate-y-[1px]' : 'w-5']"></span>
          </div>
        </button>
      </div>
    </div>

    <transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 w-full h-screen bg-[#020617] z-[105] md:hidden flex flex-col">
        <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div class="relative flex flex-col h-full px-8 pt-28 pb-12">
          <p class="text-cyan-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8 opacity-50">Navigation</p>
          
          <nav class="flex flex-col gap-6">
            <div v-for="(link, i) in navLinks" :key="link.name" class="stagger-item">
              <a :href="link.href" @click.prevent="scrollTo(link.href)"
                 class="text-3xl font-black text-white hover:text-cyan-400 transition-colors inline-block tracking-tighter">
                {{ link.name }}
              </a>
            </div>
          </nav>

          <div class="mt-auto pt-8 border-t border-white/5 stagger-item">
            <p class="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Get in touch</p>
            <a href="tel:+8801604490060" class="flex items-center gap-4 mb-8">
              <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                <svg class="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <span class="text-white font-bold text-sm">+880 1604 490060</span>
            </a>

            <div class="flex gap-3">
              <div v-for="social in ['FB', 'LI', 'TW']" :key="social" 
                   class="flex-1 py-3 rounded-xl border border-white/10 flex items-center justify-center text-[10px] font-black text-slate-400">
                {{ social }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' }
]

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

watch(isMobileMenuOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const scrollTo = (id) => {
  isMobileMenuOpen.value = false 
  const element = document.querySelector(id)
  if (element) {
    const offset = 80
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    })
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

nav { font-family: 'Plus Jakarta Sans', sans-serif; }

/* Simple, Reliable Mobile Transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.4s ease-in-out, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px); /* Slides down slightly as it fades in */
}

/* Internal staggered items */
.mobile-menu-enter-active .stagger-item {
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.stagger-item:nth-child(1) { animation-delay: 0.1s; }
.stagger-item:nth-child(2) { animation-delay: 0.2s; }
.stagger-item:nth-child(3) { animation-delay: 0.3s; }
.stagger-item:nth-child(4) { animation-delay: 0.4s; }
.stagger-item:nth-child(5) { animation-delay: 0.5s; }
</style>