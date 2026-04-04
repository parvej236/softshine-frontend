<template>
  <section id="services" class="min-h-screen lg:h-screen flex items-center justify-center bg-[#020617] relative py-16 lg:py-0 overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
      <div class="mb-10 lg:mb-14 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[8px] sm:text-[10px] font-black tracking-[0.3em] uppercase mb-4">
          Expertise & Solutions
        </div>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
          Professional <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Service Suite</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        <div v-for="(service, idx) in services" :key="service.title"
             class="group relative bg-white/[0.02] border border-white/5 rounded-[2rem] p-5 lg:p-7 transition-all duration-500 hover:bg-white/[0.04] hover:border-cyan-500/30 hover:-translate-y-1">
          
          <div class="flex items-start justify-between mb-5 lg:mb-8">
            <div class="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500 shadow-lg">
              <component :is="service.icon" class="w-5 h-5 lg:w-6 lg:h-6" />
            </div>
            <span class="text-2xl lg:text-3xl font-black text-white/[0.03] group-hover:text-cyan-500/10 transition-colors pointer-events-none select-none">
              0{{ idx + 1 }}
            </span>
          </div>

          <h4 class="text-lg lg:text-xl font-black text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors">
            {{ service.title }}
          </h4>
          
          <p class="text-slate-400 text-[11px] lg:text-xs leading-relaxed mb-6 font-medium line-clamp-2 lg:line-clamp-3">
            {{ service.desc }}
          </p>
          
          <div class="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
            <span v-for="tag in service.tags" :key="tag" 
                  class="text-[7px] lg:text-[9px] font-black uppercase tracking-widest text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded-md group-hover:text-cyan-400 group-hover:bg-cyan-400/5 transition-all">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <div class="mt-12 lg:mt-16 flex items-center justify-center gap-4 sm:gap-6 opacity-20">
        <div class="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-white"></div>
        <span class="text-[8px] lg:text-[10px] font-black text-white uppercase tracking-[0.5em] whitespace-nowrap">Engineered for Excellence</span>
        <div class="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-white"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h } from 'vue'

/**
 * Functional SVG Components for light overhead
 * stroke-width: 1.5 for a more "modern/thin" aesthetic
 */
const IconWeb = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10' }), h('path', { d: 'M12 8v4' }), h('path', { d: 'M12 16h.01' })])
const IconMobile = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [h('rect', { x: '5', y: '2', width: '14', height: '20', rx: '2' }), h('path', { d: 'M12 18h.01' })])
const IconCloud = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [h('path', { d: 'M17.5 19a5.5 5.5 0 0 0 2.5-10.5 8.5 8.5 0 1 0-16 3' }), h('path', { d: 'M12 13v6m-3-3l3 3 3-3' })])
const IconUI = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [h('circle', { cx: '12', cy: '12', r: '10' }), h('path', { d: 'M12 8l4 4-4 4M8 12h8' })])
const IconAI = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [h('path', { d: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' })])
const IconSecurity = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [h('rect', { x: '3', y: '11', width: '18', height: '11', rx: '2' }), h('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' })])

const services = [
  { title: 'Web Architectures', icon: IconWeb, desc: 'Enterprise-grade PWAs and custom web platforms optimized for sub-second load times.', tags: ['Vue 3', 'TypeScript'] },
  { title: 'Mobile Solutions', icon: IconMobile, desc: 'Performance-driven mobile applications delivering native experiences across iOS and Android.', tags: ['Flutter', 'Firebase'] },
  { title: 'Cloud & DevOps', icon: IconCloud, desc: 'Modern CI/CD pipelines and infrastructure management for secure, scalable deployments.', tags: ['AWS', 'Docker'] },
  { title: 'UI/UX Design', icon: IconUI, desc: 'Conversion-focused design systems that bridge the gap between complexity and intuition.', tags: ['Figma', 'Prototyping'] },
  { title: 'AI Integration', icon: IconAI, desc: 'Leveraging machine learning and LLMs to automate workflows and drive intelligence.', tags: ['OpenAI', 'Python'] },
  { title: 'Cyber Security', icon: IconSecurity, desc: 'Security-by-design approach protecting data integrity across every digital touchpoint.', tags: ['OAuth', 'SSL'] }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.font-plus { 
  font-family: 'Plus Jakarta Sans', sans-serif; 
}

/* Force 100vh on desktop only when screen height is sufficient */
@media (min-width: 1024px) and (min-height: 700px) {
  #services {
    height: 100vh;
    padding: 0;
  }
}

/* Smooth transition for modern browsers */
.group {
  backface-visibility: hidden;
  transform: translateZ(0);
}
</style>