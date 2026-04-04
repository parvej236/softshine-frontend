<template>
  <section id="vision" class="py-24 lg:py-32 relative overflow-hidden bg-[#020617]">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
      <div class="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px]" style="animation-delay: 2s"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        <div class="reveal">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m12 8-4 4 4 4M16 12H8"/></svg>
            Our Vision
          </div>
          
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8">
            Building the <br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Future of Software
            </span>
          </h2>
          
          <p class="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            At SoftShine, we believe technology should empower people, not complicate their lives.
            Our mission is to craft digital experiences that are <span class="text-white font-medium">beautiful, performant, and meaningful.</span>
          </p>

          <div class="space-y-4">
            <div v-for="item in visionPoints" :key="item.title"
                 class="group flex gap-5 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-300">
              <div class="flex-shrink-0 w-14 h-14 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:text-white group-hover:bg-cyan-600 transition-all duration-300 shadow-xl">
                <component :is="item.icon" class="w-7 h-7" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-white mb-1">{{ item.title }}</h3>
                <p class="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="relative z-10 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
            <div class="grid grid-cols-2 gap-4 mb-8">
              <div v-for="metric in metrics" :key="metric.label"
                   class="relative overflow-hidden group bg-slate-950/50 border border-white/5 p-6 rounded-3xl hover:border-cyan-500/50 transition-all">
                <div class="absolute -right-2 -top-2 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/20 transition-all"></div>
                <div class="text-3xl md:text-4xl font-black text-white mb-1">{{ metric.value }}</div>
                <div class="text-cyan-500/80 text-[10px] uppercase tracking-widest font-bold">{{ metric.label }}</div>
              </div>
            </div>

            <div class="space-y-6 bg-slate-950/40 p-6 rounded-3xl border border-white/5">
              <div v-for="stat in performance" :key="stat.name">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-slate-300 text-sm font-medium">{{ stat.name }}</span>
                  <span class="text-cyan-400 font-mono font-bold">{{ stat.percent }}%</span>
                </div>
                <div class="h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <div class="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-1000" 
                       :style="{ width: stat.percent + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-[80px]"></div>
          <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-[80px]"></div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { h } from 'vue'

// Functional components for SVG Icons (Lucide style)
const IconInnovation = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'm12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z' })
])
const IconPrecision = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('circle', { cx: '12', cy: '12', r: '10' }),
  h('circle', { cx: '12', cy: '12', r: '6' }),
  h('circle', { cx: '12', cy: '12', r: '2' })
])
const IconPartnership = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
  h('circle', { cx: '9', cy: '7', r: '4' }),
  h('path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87' }),
  h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
])

const visionPoints = [
  { icon: IconInnovation, title: 'Innovation First', desc: 'We leverage cutting-edge technologies to deliver solutions that stand the test of time.' },
  { icon: IconPrecision, title: 'Precision Craftsmanship', desc: 'Every line of code is written with intention, every pixel placed with purpose.' },
  { icon: IconPartnership, title: 'Partnership Mindset', desc: "We don't just build software — we build relationships and grow with our clients." }
]

const metrics = [
  { value: '50+', label: 'Projects Shipped' },
  { value: '30+', label: 'Global Clients' },
  { value: '5+', label: 'Years Active' },
  { value: '12', label: 'Experts' }
]

const performance = [
  { name: 'Client Satisfaction', percent: 99 },
  { name: 'On-Time Delivery', percent: 95 }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

section {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.reveal {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>