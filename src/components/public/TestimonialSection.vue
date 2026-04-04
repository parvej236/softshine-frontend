<template>
  <section id="testimonials" class="py-24 bg-[#020617] overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      
      <div class="mb-12 lg:mb-16 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[8px] sm:text-[10px] font-black tracking-[0.3em] uppercase mb-4">
          Client Success Stories
        </div>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
          What Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Clients Say</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div 
          v-for="(testimonial, index) in testimonials" 
          :key="index"
          class="group relative p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col"
        >
          <div class="absolute top-6 right-8 text-cyan-500/10 group-hover:text-cyan-500/20 transition-colors">
            <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H11.017V4H21.017V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V11C3.017 11.5523 2.56928 12 2.017 12H0.017V4H10.017V15C10.017 18.3137 7.33072 21 4.017 21H3.017Z" />
            </svg>
          </div>

          <div class="flex gap-1 mb-5">
            <svg v-for="i in 5" :key="i" class="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>

          <p class="text-slate-300 text-sm md:text-base leading-relaxed mb-8 flex-grow font-medium italic">
            "{{ testimonial.comment }}"
          </p>

          <div class="w-full h-px bg-white/5 mb-6"></div>

          <div class="flex items-center gap-3">
            <div class="relative flex-shrink-0">
              <div class="absolute -inset-1 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-full blur-[4px] opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <img :src="testimonial.image" :alt="testimonial.name" class="relative w-10 h-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <div>
              <h4 class="text-white font-bold text-xs tracking-tight">{{ testimonial.name }}</h4>
              <p class="text-slate-500 text-[9px] font-black uppercase tracking-widest">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'CEO at TechFlow',
    comment: 'SoftShine transformed our digital presence. Their attention to detail in the PWA development was second to none. Truly a professional experience.',
    image: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    name: 'David Chen',
    role: 'Founder of BizDesk',
    comment: 'The modular components they built for our system saved us months of development time. Communication was seamless throughout the project.',
    image: 'https://i.pravatar.cc/150?u=david'
  },
  {
    name: 'Alex Rivera',
    role: 'Product Manager',
    comment: 'Exceptional UI/UX work. They managed to balance a minimalist aesthetic with powerful functionality perfectly. Highly recommended.',
    image: 'https://i.pravatar.cc/150?u=alex'
  }
]
</script>