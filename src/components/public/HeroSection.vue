<template>
  <section id="hero" class="relative min-h-screen flex items-center bg-[#020617] overflow-hidden pt-[80px] lg:pt-0">
    
    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute top-[-10%] right-[-10%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-cyan-500/10 rounded-full blur-[100px]" style="animation-delay: 3s"></div>
      
      <div class="absolute inset-0 opacity-[0.03]" 
           style="background-image: linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px); background-size: 50px 50px;">
      </div>
      
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-12 lg:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        
        <div class="text-left flex flex-col items-start space-y-8 md:space-y-10">
          
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black tracking-[0.2em] uppercase animate-fade-in-down">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Available for new projects
          </div>

          <h1 class="text-4xl sm:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tightest">
            Grow your ideas <br/>
            with <span class="relative inline-block">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic">Softshine</span>
              <svg class="absolute -bottom-2 left-0 w-full h-2 text-cyan-500/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" stroke-width="2" /></svg>
            </span>
          </h1>

          <p class="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
            Experience a frictionless path from ideation to deployment. We build robust digital ecosystems using a 
            <span class="text-white border-b border-cyan-500/50">streamlined workflow</span> tailored for scale.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
            <button @click="scrollTo('#projects')" class="group relative px-8 py-5 bg-cyan-500 text-black font-black rounded-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(6,182,212,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3 overflow-hidden">
              <span class="relative z-10 uppercase tracking-widest text-xs">View Projects</span>
              <svg class="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            </button>

            <button @click="scrollTo('#contact')" class="px-8 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl backdrop-blur-xl hover:bg-white/10 hover:border-cyan-500/50 transition-all text-xs tracking-widest uppercase">
              Get in Touch
            </button>
          </div>
        </div>

        <div class="relative w-full max-w-xl mx-auto lg:max-w-none lg:pl-16">
          <div class="absolute -inset-4 bg-cyan-500/5 blur-[60px] rounded-full"></div>
          
          <div class="space-y-6 relative z-10">
            <div v-for="(step, index) in steps" :key="index" 
                 class="group flex items-start gap-6 p-6 md:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-3xl hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-700 hover:-translate-y-2">
              
              <div class="relative shrink-0">
                <div class="w-14 h-14 md:w-20 md:h-20 rounded-[1.5rem] bg-[#020617] border border-white/10 flex items-center justify-center font-black text-2xl md:text-3xl text-slate-700 group-hover:text-cyan-400 group-hover:border-cyan-500/50 transition-all duration-500">
                  {{ index + 1 }}
                </div>
                <div v-if="index !== steps.length - 1" class="absolute left-1/2 top-[110%] w-[1px] h-10 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
              </div>

              <div class="pt-2">
                <h3 class="text-white font-black text-xl md:text-2xl mb-2 tracking-tight group-hover:text-cyan-400 transition-colors">{{ step.title }}</h3>
                <p class="text-slate-500 text-sm md:text-base font-medium leading-relaxed">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block">
      <div class="w-[2px] h-12 bg-gradient-to-b from-cyan-500 to-transparent animate-bounce"></div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  { title: "Consultation", desc: "We deep-dive into your vision to build a bulletproof roadmap." },
  { title: "Development", desc: "Agile, high-velocity engineering using the latest MERN & Spring stacks." },
  { title: "Scaling", desc: "Zero-downtime deployment with performance-first cloud architecture." }
]

const scrollTo = (id) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
</script>

<style scoped>
/* Sharp Typography */
h1 {
  letter-spacing: -0.04em;
}

/* Animations */
@keyframes shimmer {
  100% { transform: translateX(100%); }
}

.animate-shimmer {
  animation: shimmer 1.5s infinite;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Staggered load-in */
h1, p, .flex-col, .group {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

h1 { animation-delay: 0.1s; }
p { animation-delay: 0.2s; }
.flex-col { animation-delay: 0.3s; }
.group:nth-child(2) { animation-delay: 0.4s; }
.group:nth-child(3) { animation-delay: 0.5s; }
.group:nth-child(4) { animation-delay: 0.6s; }

/* Mobile optimization: No-scrollbar for small screens */
::-webkit-scrollbar {
  display: none;
}
</style>