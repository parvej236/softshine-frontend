<template>
  <section id="team" class="py-10 lg:py-16 relative overflow-hidden bg-[#020617]">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
      <div class="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/5 rounded-full blur-[80px] md:blur-[120px]"></div>
      <div class="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/5 rounded-full blur-[80px] md:blur-[120px]"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
      <div class="text-center mb-12 md:mb-20">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4">
          <svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          The Crew
        </div>
        <h2 class="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 md:mb-6">
          Meet Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Team</span>
        </h2>
        <p class="text-slate-400 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed px-4">
          Brilliant minds united by a passion for technology and a relentless drive for digital excellence.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        <div v-for="(member, i) in team" :key="member.name"
             class="group relative p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.05] hover:border-cyan-500/40 hover:-translate-y-2 md:hover:-translate-y-3 transition-all duration-500 shadow-2xl">
          
          <div class="relative w-20 h-20 md:w-32 md:h-32 mx-auto mb-4 md:mb-8">
            <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="padding: 2px;">
              <div class="w-full h-full rounded-full bg-[#020617]"></div>
            </div>
            <img :src="member.image" :alt="member.name" 
                 class="relative z-10 w-full h-full object-cover rounded-full border-2 md:border-4 border-slate-900 group-hover:scale-95 transition-transform duration-500 grayscale group-hover:grayscale-0" />
            
            <div class="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-3 h-3 md:w-5 md:h-5 bg-cyan-500 rounded-full border-2 md:border-4 border-[#020617] z-20 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
          </div>

          <div class="text-center mb-4 md:mb-6">
            <h3 class="text-sm md:text-xl font-bold text-white mb-0.5 md:mb-1 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {{ member.name }}
            </h3>
            <p class="text-cyan-500/80 text-[8px] md:text-xs font-black uppercase tracking-widest mb-2 md:mb-4">
              {{ member.role }}
            </p>
            <p class="hidden md:block text-slate-500 text-sm leading-relaxed line-clamp-3 group-hover:text-slate-300 transition-colors">
              {{ member.bio }}
            </p>
          </div>

          <div class="flex flex-wrap gap-1 md:gap-2 justify-center">
            <span v-for="skill in member.skills" :key="skill"
                  class="px-1.5 py-0.5 md:px-3 md:py-1 text-[7px] md:text-[10px] font-bold bg-white/5 text-slate-400 rounded md:rounded-lg border border-white/5 group-hover:border-cyan-500/20 group-hover:text-cyan-400 transition-all">
              {{ skill }}
            </span>
          </div>

          <div class="absolute inset-0 rounded-[1.5rem] md:rounded-[2.5rem] bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const team = [
  {
    name: 'M Parvej Alam',
    role: 'Founder & CEO',
    image: '/images/me.jpg',
    bio: 'Full-stack architect with 5+ years of enterprise software experience. CUET graduate.',
    skills: ['Vue.js', 'Spring Boot', 'AWS']
  },
  {
    name: 'Nurun Nobi Rayhan',
    role: 'Marketing Lead',
    image: '/images/nur.jpg',
    bio: 'Growth hacker and brand strategist. Turns data into compelling stories that drive engagement.',
    skills: ['SEO', 'Strategy', 'Ads']
  },
  {
    name: 'M Badshah Faisal',
    role: 'DevOps Engineer',
    image: '/images/badshah.png',
    bio: 'CI/CD pipeline specialist. Keeps our infrastructure reliable and scalable.',
    skills: ['Docker', 'CI/CD', 'Linux']
  },
  {
    name: 'Mongthuinu Marma',
    role: 'UI/UX Designer',
    image: '/images/mongthuinu.png',
    bio: 'Crafts intuitive interfaces and delightful user experiences. Passionate about design systems.',
    skills: ['Figma', 'UX', 'Design']
  }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

section {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.animate-spin-slow {
  animation: spin 6s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.group {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Staggered animation for grid items */
.group:nth-child(1) { animation-delay: 0.1s; }
.group:nth-child(2) { animation-delay: 0.2s; }
.group:nth-child(3) { animation-delay: 0.3s; }
.group:nth-child(4) { animation-delay: 0.4s; }
.group:nth-child(5) { animation-delay: 0.5s; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>