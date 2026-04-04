<template>
  <section id="hero" class="relative min-h-[100svh] flex items-center bg-[#020617] overflow-hidden py-12 md:py-20 lg:py-0">
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div class="absolute top-[-5%] right-[-5%] w-[300px] md:w-[700px] h-[300px] md:h-[700px] bg-blue-600/15 rounded-full blur-[80px] md:blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-[-10%] left-[-5%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[80px] md:blur-[100px]" style="animation-delay: 3s"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        <div class="text-left order-1 flex flex-col items-start">
          
          <h1 class="text-3xl sm:text-4xl xl:text-6xl font-black text-white leading-[1.1] tracking-tighter mb-6 md:mb-8">
            Grow up your ideas
            <br class="hidden sm:block"/>
            with
            <span class="text-transparent pe-2 bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 italic">
              Softshine
            </span>
          </h1>

          <p class="text-slate-400 text-base md:text-xl font-light leading-relaxed max-w-xl mb-8 md:mb-12">
            Experience a frictionless path from ideation to deployment. We build robust digital ecosystems using a <span class="text-white font-medium underline decoration-cyan-500/30">streamlined workflow</span>.
          </p>

          <div class="flex flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <button @click="scrollTo('#projects')" class="flex-1 sm:flex-none group relative overflow-hidden px-4 sm:px-8 py-4 bg-cyan-500 text-black text-sm sm:text-base font-extrabold rounded-xl md:rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] active:scale-95 flex items-center justify-center gap-2 sm:gap-3">
              <span class="relative z-10">Projects</span>
              <svg class="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
              <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            </button>

            <button @click="scrollTo('#contact')" class="flex-1 sm:flex-none px-4 sm:px-8 py-4 bg-white/5 border border-white/10 text-white text-sm sm:text-base font-bold rounded-xl md:rounded-2xl backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all active:scale-95 flex items-center justify-center">
              Contact
            </button>
          </div>
        </div>

        <div class="relative order-2 w-full max-w-xl mx-auto lg:max-w-none lg:pl-10">
          <div class="space-y-4 md:space-y-6">
            <div v-for="(step, index) in steps" :key="index" 
                 class="group relative flex items-center gap-4 md:gap-6 p-5 md:p-6 rounded-2xl md:rounded-[2rem] bg-white/[0.03] border border-white/[0.06] backdrop-blur-3xl hover:bg-white/[0.08] hover:border-cyan-500/40 transition-all duration-500 lg:hover:-translate-y-2">
              
              <div class="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-[#0f172a] border border-white/10 flex items-center justify-center font-black text-xl md:text-2xl text-white group-hover:text-cyan-400 group-hover:border-cyan-500/50 transition-all">
                0{{ index + 1 }}
              </div>

              <div class="flex-1">
                <h3 class="text-white font-bold text-lg md:text-xl mb-1">{{ step.title }}</h3>
                <p class="text-slate-500 text-sm leading-relaxed">{{ step.desc }}</p>
              </div>

              <div v-if="index !== steps.length - 1" class="hidden lg:block absolute left-[47px] top-[90px] w-[2px] h-10 bg-gradient-to-b from-cyan-500/40 to-transparent"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  { title: "Consultation", desc: "Collaborative strategy to define your project DNA." },
  { title: "Development", desc: "High-velocity coding with modern tech stacks." },
  { title: "Deployment", desc: "Seamless launch with continuous cloud scaling." }
]

const scrollTo = (id) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');

section {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

@keyframes shimmer {
  100% { transform: translateX(100%); }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

h1, p, .flex-row, .group {
  opacity: 0;
  animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

h1 { animation-delay: 0.1s; }
p { animation-delay: 0.2s; }
.flex-row { animation-delay: 0.3s; }

.group:nth-child(1) { animation-delay: 0.4s; }
.group:nth-child(2) { animation-delay: 0.5s; }
.group:nth-child(3) { animation-delay: 0.6s; }
</style>