<template>
  <section id="contact" class="py-5 lg:py-8 relative overflow-hidden bg-[#020617]">
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px]"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      <div class="text-center mb-16 lg:mb-20 reveal">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
          Get In Touch
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
          Start Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Project</span>
        </h2>
        <p class="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
          Have an idea? Let's make it real. Tell us about your project and we'll get back to you within 24 hours.
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-12 items-start max-w-6xl mx-auto">
        <div class="lg:col-span-2 space-y-4 reveal">
          <div v-for="info in contactItems" :key="info.label"
               class="group flex items-center gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/40 hover:bg-white/[0.05] transition-all duration-300">
            <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition-all shadow-lg">
              <component :is="info.icon" class="w-6 h-6" />
            </div>
            <div>
              <p class="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-1">{{ info.label }}</p>
              <p class="text-slate-200 font-medium group-hover:text-cyan-400 transition-colors">{{ info.value }}</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3 reveal stagger-2">
          <form @submit.prevent="submitForm" class="relative p-8 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
            
            <Transition name="alert">
              <div v-if="successMsg || errorMsg" 
                   :class="successMsg ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'"
                   class="p-4 rounded-xl border text-sm flex items-center gap-3">
                <span class="text-lg">{{ successMsg ? '✓' : '✕' }}</span>
                {{ successMsg || errorMsg }}
              </div>
            </Transition>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name *</label>
                <input v-model="form.name" type="text" required placeholder="John Doe"
                       class="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Email *</label>
                <input v-model="form.email" type="email" required placeholder="john@example.com"
                       class="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all" />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Phone</label>
                <input v-model="form.phone" type="tel" placeholder="+880..."
                       class="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Subject</label>
                <input v-model="form.subject" type="text" placeholder="Project Inquiry"
                       class="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all" />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">Message *</label>
              <textarea v-model="form.message" rows="4" required placeholder="Tell us about your project..."
                        class="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"></textarea>
            </div>

            <button type="submit" :disabled="submitting" 
                    class="group relative w-full overflow-hidden px-8 py-4 bg-cyan-500 text-black font-extrabold rounded-xl md:rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50">
              <span v-if="!submitting" class="relative z-10 flex items-center gap-2">
                Send Message
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </span>
              <span v-else class="relative z-10 flex items-center gap-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Processing...
              </span>
              <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, h } from 'vue'

const form = ref({ name:'', email:'', phone:'', subject:'', message:'' })
const submitting = ref(false)
const successMsg = ref(''), errorMsg = ref('')

// Lucide-style SVG Icons
const IconLocation = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' }), h('circle', { cx: '12', cy: '10', r: '3' })])
const IconEmail = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }), h('polyline', { points: '22,6 12,13 2,6' })])
const IconPhone = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' })])
const IconWhatsApp = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14h.1c4.6 0 8.4 3.8 8.4 8.4z' }), h('path', { d: 'M17.4 14.6l-1.5-1.5a.7.7 0 0 0-1 0l-.6.6a1 1 0 0 1-1.4 0l-2.1-2.1a1 1 0 0 1 0-1.4l.6-.6a.7.7 0 0 0 0-1L9.9 7.1a.7.7 0 0 0-1 0l-1.2 1.2a2 2 0 0 0-.4 2.2 11.8 11.8 0 0 0 6.9 6.9 2 2 0 0 0 2.2-.4l1.2-1.2a.7.7 0 0 0 0-1z' })])

const contactItems = [
  { icon: IconLocation, label: 'Location', value: 'Banashree, Dhaka, Bangladesh' },
  { icon: IconEmail, label: 'Email', value: 'alamparvej2024@gmail.com' },
  { icon: IconPhone, label: 'Mobile', value: '+880 1604-490060' },
  { icon: IconWhatsApp, label: 'WhatsApp', value: '+880 1604-490060' },
]

const submitForm = async () => {
  submitting.value = true; successMsg.value = ''; errorMsg.value = ''
  // Replace with actual API call logic
  setTimeout(() => {
    successMsg.value = "Message received! We'll be in touch shortly."
    form.value = { name:'', email:'', phone:'', subject:'', message:'' }
    submitting.value = false
    setTimeout(() => successMsg.value = '', 5000)
  }, 1500)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

section { font-family: 'Plus Jakarta Sans', sans-serif; }

.alert-enter-active, .alert-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.alert-enter-from, .alert-leave-to { opacity: 0; transform: translateY(-10px); }

@keyframes shimmer { 100% { transform: translateX(100%); } }
.animate-shimmer { animation: shimmer 2s infinite; }

input:focus, textarea:focus {
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.1);
}

.reveal {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>