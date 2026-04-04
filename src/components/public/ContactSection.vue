<template>
  <section id="contact" class="py-12 lg:py-24 relative overflow-hidden bg-[#020617]">
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px]"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      <div class="text-center mb-16 lg:mb-20">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black tracking-[0.2em] uppercase mb-4">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
          Connect With Us
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
          Ready to <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Order?</span>
        </h2>
      </div>

      <div class="grid lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
        <div class="lg:col-span-5 space-y-8">
          <div class="grid gap-4">
            <div v-for="info in contactItems" :key="info.label"
                 class="group flex items-center gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/40 hover:bg-white/[0.04] transition-all duration-500">
              <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500">
                <component :is="info.icon" class="w-6 h-6" />
              </div>
              <div>
                <p class="text-slate-500 text-[10px] uppercase tracking-widest font-black mb-1 opacity-60">{{ info.label }}</p>
                <p class="text-slate-200 font-bold text-sm md:text-base transition-colors">{{ info.value }}</p>
              </div>
            </div>
          </div>

          <div class="p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 shadow-2xl relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full transition-all group-hover:bg-cyan-500/10"></div>
            
            <p class="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-center flex items-center justify-center gap-3">
              <span class="w-8 h-[1px] bg-white/10"></span>
              Instant Reach
              <span class="w-8 h-[1px] bg-white/10"></span>
            </p>

            <div class="grid grid-cols-3 gap-6">
              <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank"
                 class="flex flex-col items-center gap-4 group/btn">
                <div class="w-16 h-16 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-center transition-all duration-500 group-hover/btn:border-cyan-500/50 group-hover/btn:shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover/btn:-translate-y-1">
                  <component :is="social.icon" :class="['w-8 h-8 transition-colors duration-500', social.colorClass]" />
                </div>
                <span class="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover/btn:text-cyan-400 transition-colors">{{ social.name }}</span>
              </a>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7">
          <form @submit.prevent="submitForm" class="relative p-8 md:p-12 rounded-[3rem] bg-white/[0.01] border border-white/10 backdrop-blur-3xl shadow-2xl space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                <input v-model="form.name" type="text" required placeholder="John Doe"
                       class="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Email</label>
                <input v-model="form.email" type="email" required placeholder="john@company.com"
                       class="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Project Details</label>
              <textarea v-model="form.message" rows="5" required placeholder="How can we help you?"
                        class="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-all resize-none"></textarea>
            </div>

            <button type="submit" :disabled="submitting" 
                    class="group relative w-full overflow-hidden px-8 py-5 bg-cyan-500 text-black font-black text-sm rounded-2xl transition-all duration-300 hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] active:scale-[0.98] flex items-center justify-center gap-3">
              <span class="relative z-10 flex items-center gap-3 tracking-widest uppercase">
                {{ submitting ? 'Sending...' : 'Send Inquiry' }}
                <svg v-if="!submitting" class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </span>
              <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, h } from 'vue'

const form = ref({ name:'', email:'', message:'' })
const submitting = ref(false)

// Brand Specific Icons (SVG Paths for Messenger, WhatsApp, LinkedIn)
const IconWhatsApp = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [h('path', { d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.123.553 4.197 1.604 6.01L0 24l6.117-1.604a11.803 11.803 0 005.927 1.598h.005c6.637 0 12.032-5.395 12.034-12.03a11.772 11.772 0 00-3.489-8.506' })])

const IconMessenger = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [h('path', { d: 'M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.012.28 2.089.431 3.205.431 6.627 0 12-4.975 12-11.111C23.762 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.544-6.954 3.133 3.26 5.885-3.26-6.544 6.954z' })])

const IconLinkedin = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [h('path', { d: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' })])

const IconLocation = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' }), h('circle', { cx: '12', cy: '10', r: '3' })])
const IconEmail = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }), h('polyline', { points: '22,6 12,13 2,6' })])

const contactItems = [
  { icon: IconLocation, label: 'Headquarters', value: 'Banashree, Dhaka, BD' },
  { icon: IconEmail, label: 'Email Us', value: 'alamparvej2024@gmail.com' },
]

const socialLinks = [
  { name: 'WhatsApp', icon: IconWhatsApp, url: 'https://wa.me/8801604490060', colorClass: 'text-emerald-500 group-hover/btn:text-emerald-400' },
  { name: 'Messenger', icon: IconMessenger, url: '#', colorClass: 'text-blue-500 group-hover/btn:text-blue-400' },
  { name: 'LinkedIn', icon: IconLinkedin, url: '#', colorClass: 'text-sky-600 group-hover/btn:text-sky-400' },
]

const submitForm = async () => {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    form.value = { name:'', email:'', message:'' }
    alert('Message sent successfully!')
  }, 2000)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
section { font-family: 'Plus Jakarta Sans', sans-serif; }

@keyframes shimmer { 100% { transform: translateX(100%); } }
.animate-shimmer { animation: shimmer 2.5s infinite; }

input:focus, textarea:focus {
  background-color: rgba(2, 6, 23, 0.8);
  box-shadow: 0 0 40px rgba(6, 182, 212, 0.05);
}
</style>