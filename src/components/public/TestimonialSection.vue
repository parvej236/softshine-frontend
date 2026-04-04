<template>
  <section id="testimonials" class="py-24 bg-[#020617] overflow-hidden">
    <div class="max-w-[100vw] mx-auto">
      
      <div class="mb-20 text-center px-4">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/10 text-cyan-400 text-[10px] font-bold tracking-[0.4em] uppercase mb-6 backdrop-blur-3xl">
          Wall of Love
        </div>
        <h2 class="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
          What <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">People Say</span>
        </h2>
        <p class="mt-6 text-slate-400 max-w-xl mx-auto text-lg font-medium">
          Hear from the teams building the future with SoftShine.
        </p>
      </div>

      <div class="flex flex-col gap-10 relative">
        <div class="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none"></div>
        <div class="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none"></div>

        <div class="marquee-row group/row overflow-hidden flex">
          <div class="flex gap-8 animate-marquee-left">
            <div v-for="n in 2" :key="'r1-' + n" class="flex gap-8 items-center">
              <div 
                v-for="(t, i) in row1" :key="i"
                :style="{ width: getDynamicWidth(t.comment) }"
                class="testimonial-card group/card"
              >
                <div class="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                
                <div class="relative z-10">
                  <p class="text-slate-300 text-[15px] leading-relaxed mb-8 font-medium group-hover/card:text-white transition-colors duration-300">
                    "{{ t.comment }}"
                  </p>
                  
                  <div class="flex items-center gap-4">
                    <div class="relative">
                      <img :src="t.image" class="w-11 h-11 rounded-full grayscale group-hover/card:grayscale-0 transition-all duration-700 border-2 border-white/5 group-hover/card:border-cyan-500/50" />
                      <div class="absolute inset-0 rounded-full shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]"></div>
                    </div>
                    <div>
                      <h4 class="text-white font-bold text-sm tracking-tight group-hover/card:text-cyan-400 transition-colors">{{ t.name }}</h4>
                      <p class="text-slate-500 text-[10px] font-bold uppercase tracking-[0.15em] mt-0.5">{{ t.role }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="marquee-row group/row overflow-hidden flex">
          <div class="flex gap-8 animate-marquee-right">
            <div v-for="n in 2" :key="'r2-' + n" class="flex gap-8 items-center">
              <div 
                v-for="(t, i) in row2" :key="i"
                :style="{ width: getDynamicWidth(t.comment) }"
                class="testimonial-card group/card"
              >
                <div class="absolute -bottom-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>

                <div class="relative z-10">
                  <p class="text-slate-300 text-[15px] leading-relaxed mb-8 font-medium group-hover/card:text-white transition-colors duration-300">
                    "{{ t.comment }}"
                  </p>
                  <div class="flex items-center gap-4">
                    <div class="relative">
                      <img :src="t.image" class="w-11 h-11 rounded-full grayscale group-hover/card:grayscale-0 transition-all duration-700 border-2 border-white/5 group-hover/card:border-blue-500/50" />
                    </div>
                    <div>
                      <h4 class="text-white font-bold text-sm tracking-tight group-hover/card:text-blue-400 transition-colors">{{ t.name }}</h4>
                      <p class="text-slate-500 text-[10px] font-bold uppercase tracking-[0.15em] mt-0.5">{{ t.role }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Data remains the same as your previous set
const allTestimonials = [
  { name: 'Sarah Jenkins', role: 'CEO at TechFlow', comment: 'SoftShine transformed our digital presence. Their attention to detail was second to none.', image: 'https://i.pravatar.cc/150?u=1' },
  { name: 'David Chen', role: 'Founder of BizDesk', comment: 'The modular components they built saved us months of development time.', image: 'https://i.pravatar.cc/150?u=2' },
  { name: 'Alex Rivera', role: 'Product Manager', comment: 'Exceptional UI/UX work. They managed to balance a minimalist aesthetic perfectly.', image: 'https://i.pravatar.cc/150?u=3' },
  { name: 'Mahim Ahmed', role: 'Full Stack Dev', comment: 'Integrating their solutions was incredibly easy. The clean code architecture is top-tier.', image: 'https://i.pravatar.cc/150?u=4' },
  { name: 'Jessica Wong', role: 'Marketing Director', comment: 'Our conversion rates increased by 40% after the redesign.', image: 'https://i.pravatar.cc/150?u=5' },
  { name: 'Michael Smith', role: 'E-commerce Owner', comment: 'Best agency we have worked with. They actually listen to our needs.', image: 'https://i.pravatar.cc/150?u=6' },
  { name: 'Fatima Al-Sayed', role: 'App Developer', comment: 'The API integration was flawless. Their technical depth is impressive.', image: 'https://i.pravatar.cc/150?u=7' },
  { name: 'Chris Evans', role: 'Project Lead', comment: 'Delivery was on time and exceeded expectations. Will definitely hire again.', image: 'https://i.pravatar.cc/150?u=8' },
  { name: 'Linda Park', role: 'Creative Director', comment: 'Beautifully crafted animations and smooth transitions. My team loved it.', image: 'https://i.pravatar.cc/150?u=9' },
  { name: 'Omar Bakri', role: 'Start-up Founder', comment: 'Scalability was our main concern, but they built a foundation that handles growth.', image: 'https://i.pravatar.cc/150?u=10' },
  { name: 'Sophia Loren', role: 'UX Researcher', comment: 'User-centric design at its finest. The feedback has been amazing.', image: 'https://i.pravatar.cc/150?u=11' },
  { name: 'James Wilson', role: 'CTO', comment: 'High performance, low latency, and secure. Everything a CTO looks for.', image: 'https://i.pravatar.cc/150?u=12' }
]

const row1 = allTestimonials.slice(0, 6)
const row2 = allTestimonials.slice(6, 12)

const getDynamicWidth = (text) => {
  if (text.length < 60) return '320px'
  if (text.length < 90) return '380px'
  return '440px'
}
</script>

<style scoped>
@reference "../../assets/main.css";

.testimonial-card {
  @apply flex-shrink-0 relative p-8 rounded-[2rem] 
         bg-gradient-to-b from-white/[0.05] to-transparent 
         border border-white/5 transition-all duration-500 
         cursor-default flex flex-col justify-between overflow-hidden;
}

.testimonial-card:hover {
  @apply border-white/20 -translate-y-2 z-50 bg-white/[0.08] backdrop-blur-xl
         shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(34,211,238,0.1)];
}

.animate-marquee-left {
  display: flex;
  width: max-content;
  animation: marquee-l 80s linear infinite;
}

.animate-marquee-right {
  display: flex;
  width: max-content;
  animation: marquee-r 80s linear infinite;
}

/* Pause the row when hovered */
.marquee-row:hover .animate-marquee-left,
.marquee-row:hover .animate-marquee-right {
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