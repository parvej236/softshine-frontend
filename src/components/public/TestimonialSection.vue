<template>
  <section id="testimonials" class="py-12 md:py-24 bg-[#020617] overflow-hidden">
    <div class="max-w-[100vw] mx-auto">
      
      <div class="mb-12 md:mb-20 text-center px-6">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/10 text-cyan-400 text-[9px] md:text-[10px] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase mb-6 backdrop-blur-3xl">
          Wall of Love
        </div>
        <h2 class="text-3xl md:text-6xl font-black text-white tracking-tight leading-tight">
          Trusted by <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">Industry Leaders</span>
        </h2>
        <p class="mt-4 md:mt-6 text-slate-400 max-w-xl mx-auto text-base md:text-lg font-medium">
          Hear from the teams building the future with SoftShine.
        </p>
      </div>

      <div class="flex flex-col gap-6 md:gap-10 relative">
        <div class="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none"></div>
        <div class="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none"></div>

        <div class="marquee-row group/row overflow-hidden flex touch-pan-y">
          <div class="flex gap-4 md:gap-8 animate-marquee-left">
            <div v-for="n in 2" :key="'r1-' + n" class="flex gap-4 md:gap-8 items-center">
              <div 
                v-for="(t, i) in row1" :key="i"
                :class="['testimonial-card group/card', getResponsiveWidth(t.comment)]"
              >
                <div class="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                
                <div class="relative z-10 h-full flex flex-col justify-between">
                  <p class="text-slate-300 text-sm md:text-[15px] leading-relaxed mb-6 md:mb-8 font-medium group-hover/card:text-white transition-colors duration-300">
                    "{{ t.comment }}"
                  </p>
                  
                  <div class="flex items-center gap-3 md:gap-4">
                    <img :src="t.image" class="w-9 h-9 md:w-11 md:h-11 rounded-full grayscale md:group-hover/card:grayscale-0 transition-all duration-700 border border-white/10 group-hover/card:border-cyan-500/50" />
                    <div class="min-w-0">
                      <h4 class="text-white font-bold text-[12px] md:text-sm tracking-tight truncate">{{ t.name }}</h4>
                      <p class="text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-wider truncate">{{ t.role }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="marquee-row group/row overflow-hidden flex touch-pan-y">
          <div class="flex gap-4 md:gap-8 animate-marquee-right">
            <div v-for="n in 2" :key="'r2-' + n" class="flex gap-4 md:gap-8 items-center">
              <div 
                v-for="(t, i) in row2" :key="i"
                :class="['testimonial-card group/card', getResponsiveWidth(t.comment)]"
              >
                <div class="absolute -bottom-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>

                <div class="relative z-10 h-full flex flex-col justify-between">
                  <p class="text-slate-300 text-sm md:text-[15px] leading-relaxed mb-6 md:mb-8 font-medium group-hover/card:text-white transition-colors duration-300">
                    "{{ t.comment }}"
                  </p>
                  <div class="flex items-center gap-3 md:gap-4">
                    <img :src="t.image" class="w-9 h-9 md:w-11 md:h-11 rounded-full grayscale md:group-hover/card:grayscale-0 transition-all duration-700 border border-white/10 group-hover/card:border-blue-500/50" />
                    <div class="min-w-0">
                      <h4 class="text-white font-bold text-[12px] md:text-sm tracking-tight truncate">{{ t.name }}</h4>
                      <p class="text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-wider truncate">{{ t.role }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-8 flex justify-center md:hidden">
        <span class="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
          Hold to read
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
const allTestimonials = [
  { name: 'Sarah Jenkins', role: 'CEO at TechFlow', comment: 'SoftShine transformed our digital presence. Their attention to detail was second to none.', image: 'https://i.pravatar.cc/150?u=1' },
  { name: 'David Chen', role: 'Founder of BizDesk', comment: 'The modular components they built saved us months of development time.', image: 'https://i.pravatar.cc/150?u=2' },
  { name: 'Alex Rivera', role: 'Product Manager', comment: 'Exceptional UI/UX work. They balanced minimalism perfectly.', image: 'https://i.pravatar.cc/150?u=3' },
  { name: 'Mahim Ahmed', role: 'Full Stack Dev', comment: 'Integrating their solutions was incredibly easy. Top-tier architecture.', image: 'https://i.pravatar.cc/150?u=4' },
  { name: 'Jessica Wong', role: 'Marketing Director', comment: 'Our conversion rates increased by 40% after the redesign.', image: 'https://i.pravatar.cc/150?u=5' },
  { name: 'Michael Smith', role: 'E-commerce Owner', comment: 'Best agency we have worked with. They actually listen.', image: 'https://i.pravatar.cc/150?u=6' },
  { name: 'Fatima Al-Sayed', role: 'App Developer', comment: 'The API integration was flawless. Technical depth is impressive.', image: 'https://i.pravatar.cc/150?u=7' },
  { name: 'Chris Evans', role: 'Project Lead', comment: 'Delivery was on time and exceeded expectations. Will hire again.', image: 'https://i.pravatar.cc/150?u=8' },
  { name: 'Linda Park', role: 'Creative Director', comment: 'Beautifully crafted animations and smooth transitions. Loved it.', image: 'https://i.pravatar.cc/150?u=9' },
  { name: 'Omar Bakri', role: 'Start-up Founder', comment: 'Scalability was our concern, but they built a solid foundation.', image: 'https://i.pravatar.cc/150?u=10' },
  { name: 'Sophia Loren', role: 'UX Researcher', comment: 'User-centric design at its finest. The feedback has been amazing.', image: 'https://i.pravatar.cc/150?u=11' },
  { name: 'James Wilson', role: 'CTO', comment: 'High performance, low latency, and secure. Everything we need.', image: 'https://i.pravatar.cc/150?u=12' }
]

const row1 = allTestimonials.slice(0, 6)
const row2 = allTestimonials.slice(6, 12)

const getResponsiveWidth = (text) => {
  // Mobile widths vs Desktop widths
  if (text.length < 60) return 'w-[260px] md:w-[320px]'
  if (text.length < 90) return 'w-[300px] md:w-[380px]'
  return 'w-[340px] md:w-[440px]'
}
</script>

<style scoped>
@reference "../../assets/main.css";

.testimonial-card {
  @apply flex-shrink-0 relative p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] 
         bg-gradient-to-b from-white/[0.05] to-transparent 
         border border-white/5 transition-all duration-500 
         cursor-default overflow-hidden;
}

/* Hover/Active states */
.testimonial-card:hover, .testimonial-card:active {
  @apply border-white/20 -translate-y-1 md:-translate-y-2 z-50 bg-white/[0.08] backdrop-blur-xl
         shadow-[0_20px_50px_rgba(0,0,0,0.5)];
}

/* Marquee Logic */
.animate-marquee-left {
  display: flex;
  width: max-content;
  animation: marquee-l 40s linear infinite;
}

.animate-marquee-right {
  display: flex;
  width: max-content;
  animation: marquee-r 40s linear infinite;
}

/* Increase speed on mobile for better flow since the screen is narrower */
@media (max-width: 768px) {
  .animate-marquee-left, .animate-marquee-right {
    animation-duration: 25s;
  }
}

.marquee-row:hover .animate-marquee-left,
.marquee-row:hover .animate-marquee-right,
.marquee-row:active .animate-marquee-left,
.marquee-row:active .animate-marquee-right {
  animation-play-state: paused !important;
}

@keyframes marquee-l {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-r {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
</style>