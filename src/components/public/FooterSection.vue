<template>
  <footer class="relative border-t border-white/5 bg-[#020617] overflow-hidden">
    <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
        
        <div class="lg:col-span-5 space-y-8">
          <div class="flex items-center gap-3">
            <div class="relative group">
              <div class="absolute -inset-1 bg-cyan-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <img src="/logo_softshine.png" alt="SoftShine Logo" class="relative w-10 h-10 rounded-xl shadow-2xl">
            </div>
            <span class="font-black text-2xl tracking-tighter text-white">
              Soft<span class="text-cyan-500">Shine</span>
            </span>
          </div>
          
          <p class="text-slate-400 text-base leading-relaxed max-w-sm font-medium">
            We engineer high-performance digital experiences. From startups to scale-ups, we turn complex visions into elegant software.
          </p>

          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Available for new projects</span>
          </div>
        </div>

        <div class="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
          <div>
            <h3 class="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-8 opacity-50">Navigation</h3>
            <ul class="space-y-4">
              <li v-for="link in companyLinks" :key="link.label">
                <a :href="link.href" class="group flex items-center text-slate-400 hover:text-cyan-400 text-sm font-bold transition-all">
                  <span class="w-0 group-hover:w-4 h-[1px] bg-cyan-500 transition-all mr-0 group-hover:mr-2"></span>
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-8 opacity-50">Expertise</h3>
            <ul class="space-y-4">
              <li v-for="service in services" :key="service" class="text-slate-400 text-sm font-bold flex items-center gap-2">
                <span class="w-1 h-1 rounded-full bg-slate-700"></span>
                {{ service }}
              </li>
            </ul>
          </div>

          <div class="col-span-2 md:col-span-1">
            <h3 class="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-8 opacity-50">Follow Us</h3>
            <div class="flex flex-wrap gap-3">
              <a v-for="social in socials" :key="social.name" :href="social.href"
                 :aria-label="social.name"
                 class="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-cyan-500 hover:border-cyan-400 transition-all duration-500 shadow-xl group">
                <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" v-html="social.icon"></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <p class="text-slate-500 text-[11px] font-bold tracking-wider">
            © {{ new Date().getFullYear() }} SOFTSHINE.
          </p>
          <div class="hidden md:block w-1 h-1 rounded-full bg-slate-800"></div>
          <p class="text-slate-500 text-[11px] font-bold tracking-wider uppercase">
            Crafted with Precision in Chittagong
          </p>
        </div>

        <div class="flex items-center gap-8">
          <a href="#" class="text-slate-600 hover:text-slate-400 text-[10px] font-black uppercase tracking-widest transition-colors">Privacy Policy</a>
          <a href="#" class="text-slate-600 hover:text-slate-400 text-[10px] font-black uppercase tracking-widest transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const socials = [
  { name: 'GitHub', href: '#', icon: '<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>' },
  { name: 'LinkedIn', href: '#', icon: '<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>' },
  { name: 'Twitter', href: '#', icon: '<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>' }
]
const companyLinks = [
  { label: 'Our Story', href: '#vision' }, { label: 'Case Studies', href: '#projects' },
  { label: 'Our Talent', href: '#team' }, { label: 'Start Project', href: '#contact' }
]
const services = ['Web Engineering', 'Mobile Architecture', 'Scalable Cloud', 'Brand Strategy', 'Product Design']
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

footer {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>