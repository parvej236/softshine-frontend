<template>
  <nav :class="[
    'fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out px-4 md:px-6 py-4',
    isScrolled ? 'bg-[#020617]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl' : 'bg-transparent'
  ]">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div @click="scrollTo('#hero')" class="flex items-center gap-2 group cursor-pointer">
        <div
          class="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:rotate-12 transition-transform duration-300">
          <span class="text-black font-black text-xl">S</span>
        </div>
        <span class="text-white font-black text-2xl tracking-tighter group-hover:text-cyan-400 transition-colors">
          Soft<span class="text-cyan-500">Shine</span>
        </span>
      </div>

      <div class="hidden md:flex items-center gap-8">
        <a v-for="link in navLinks" :key="link.name" :href="link.href" @click.prevent="scrollTo(link.href)"
          class="text-[11px] font-bold text-slate-400 hover:text-white transition-colors tracking-[0.2em] uppercase relative group">
          {{ link.name }}
          <span
            class="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      <div class="hidden md:flex items-center gap-4">
        <a href="tel:+8801604490060"
          class="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm font-bold mr-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Us
        </a>
        <button @click="scrollTo('#contact')"
          class="px-6 py-2.5 bg-cyan-500 text-black text-xs font-black rounded-xl hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all active:scale-95">
          GET STARTED
        </button>
      </div>

      <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden text-white p-2 focus:outline-none">
        <div class="w-6 flex flex-col items-end gap-1.5">
          <span
            :class="['h-0.5 bg-white transition-all duration-300', isMobileMenuOpen ? 'w-6 -rotate-45 translate-y-2' : 'w-6']"></span>
          <span :class="['h-0.5 bg-white transition-all duration-300', isMobileMenuOpen ? 'opacity-0' : 'w-4']"></span>
          <span
            :class="['h-0.5 bg-white transition-all duration-300', isMobileMenuOpen ? 'w-6 rotate-45 -translate-y-2' : 'w-5']"></span>
        </div>
      </button>
    </div>

    <transition name="fade">
      <div v-if="isMobileMenuOpen"
        class="fixed inset-0 top-0 bg-[#020617] z-[-1] md:hidden flex flex-col justify-center p-8 space-y-8">
        <div class="flex flex-col space-y-6">
          <a v-for="link in navLinks" :key="link.name" :href="link.href" @click.prevent="scrollTo(link.href)"
            class="text-4xl font-black text-white hover:text-cyan-400 transition-colors">
            {{ link.name }}
          </a>
        </div>

        <div class="pt-8 flex flex-col gap-4 border-t border-white/10">
          <a href="tel:+8801604490060"
            class="w-full py-4 bg-white/5 text-white font-bold rounded-2xl flex items-center justify-center gap-3">
            Call Now
          </a>
          <a href="https://wa.me/8801604490060" target="_blank"
            class="w-full py-4 bg-emerald-500 text-black font-black rounded-2xl flex items-center justify-center gap-3">
            WhatsApp Us
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
]

// Smooth Scroll Logic
const scrollTo = (id) => {
  isMobileMenuOpen.value = false // Close mobile menu if open

  const element = document.querySelector(id)
  if (element) {
    const offset = 80 // Height of your sticky navbar
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = element.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
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
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

nav {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>