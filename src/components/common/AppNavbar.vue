<template>
  <nav :class="[
    'fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out px-4 md:px-8 py-4',
    isScrolled ? 'bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl' : 'bg-transparent'
  ]">
    <div class="max-w-7xl mx-auto flex items-center justify-between relative z-[110]">

      <router-link to="/" class="flex items-center gap-3 group" @click="isMobileMenuOpen = false">
        <div class="relative">
          <div
            class="absolute -inset-1 bg-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500">
          </div>
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
          <span
            class="absolute -bottom-2 left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      <div class="flex items-center gap-3 md:gap-6">
        <router-link to="/login"
          class="px-5 py-2 md:px-6 md:py-2.5 bg-cyan-500 text-black text-[10px] md:text-xs font-black rounded-xl hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.3)] uppercase tracking-widest">
          Login
        </router-link>

        <button @click="toggleMenu" class="md:hidden text-white p-2 focus:outline-none" aria-label="Toggle Menu">
          <div class="w-6 flex flex-col items-end gap-1.5">
            <span
              :class="['h-0.5 bg-white transition-all duration-300 origin-right', isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[1px]' : 'w-6']"></span>
            <span
              :class="['h-0.5 bg-white transition-all duration-300', isMobileMenuOpen ? 'opacity-0' : 'w-4']"></span>
            <span
              :class="['h-0.5 bg-white transition-all duration-300 origin-right', isMobileMenuOpen ? 'w-6 rotate-45 translate-y-[1px]' : 'w-5']"></span>
          </div>
        </button>
      </div>
    </div>

    <transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 w-full h-screen bg-[#020617] z-[105] md:hidden flex flex-col">
        <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div class="relative flex flex-col h-full px-8 pt-28 pb-12">
          <p class="text-cyan-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8 opacity-50">Navigation</p>

          <nav class="flex flex-col gap-4">
            <div v-for="(link, i) in navLinks" :key="link.name" class="stagger-item">
              <a :href="link.href" @click.prevent="scrollTo(link.href)"
                class="text-3xl font-black text-white hover:text-cyan-400 transition-colors inline-block tracking-tighter">
                {{ link.name }}
              </a>
            </div>
          </nav>
          <div class="mt-auto pt-2 border-t border-white/5 stagger-item">
            <p class="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Get in touch</p>

            <div class="grid grid-cols-3 gap-3 mb-6">
              <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank"
                class="group flex flex-col items-center justify-center py-5 rounded-[2rem] bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 active:scale-95 transition-all duration-300">

                <div class="mb-2 transition-transform duration-300 group-hover:scale-110" v-html="social.icon"></div>

                <span
                  class="text-[8px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                  {{ social.name }}
                </span>
              </a>
            </div>

            <a href="tel:+8801604490060"
              class="flex items-center justify-center gap-3 py-4 rounded-2xl bg-cyan-500 text-black font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.72 11.72 0 003.7.59 1 1 0 011 1V20a1 1 0 01-1 1A15 15 0 013 6a1 1 0 011-1h3.41a1 1 0 011 1 11.72 11.72 0 00.59 3.7 1 1 0 01-.27 1.1l-2.11 2.09z" />
              </svg>
              Call Directly
            </a>
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
  { name: 'Services', href: '#' },
  { name: 'Contact', href: '#contact' }
]

const socialLinks = [
  {
    name: 'WhatsApp',
    url: 'https://wa.me/8801604490060',
    icon: `<svg class="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`
  },
  {
    name: 'Messenger',
    url: 'https://m.me/yourusername',
    icon: `<svg class="w-6 h-6 text-[#0084FF]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.303 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.291 14.194l-3.047-3.243-5.942 3.243 6.536-6.941 3.125 3.243 5.864-3.243-6.536 6.941z"/></svg>`
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/mparvejalam',
    icon: `<svg class="w-6 h-6 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`
  }
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

nav {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Simple, Reliable Mobile Transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.4s ease-in-out, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  /* Slides down slightly as it fades in */
}

/* Internal staggered items */
.mobile-menu-enter-active .stagger-item {
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stagger-item:nth-child(1) {
  animation-delay: 0.1s;
}

.stagger-item:nth-child(2) {
  animation-delay: 0.2s;
}

.stagger-item:nth-child(3) {
  animation-delay: 0.3s;
}

.stagger-item:nth-child(4) {
  animation-delay: 0.4s;
}

.stagger-item:nth-child(5) {
  animation-delay: 0.5s;
}
</style>