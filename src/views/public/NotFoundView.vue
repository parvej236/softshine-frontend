<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-[#020617] relative overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]"></div>
      <div class="absolute top-20 left-20 w-1 h-1 bg-cyan-500 rounded-full animate-ping opacity-20"></div>
      <div class="absolute bottom-40 right-20 w-1 h-1 bg-blue-500 rounded-full animate-ping opacity-20 [animation-delay:1s]"></div>
    </div>

    <div class="relative z-10 text-center max-w-2xl">
      <div class="relative inline-block mb-8">
        <div class="text-[12rem] md:text-[16rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-white/5 select-none opacity-20">
          404
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-8xl md:text-9xl font-black text-white tracking-widest animate-glitch">
            404
          </span>
        </div>
      </div>

      <div class="space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black tracking-widest uppercase mb-4">
          Route Terminated
        </div>
        
        <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight">
          The page <span class="text-cyan-400">Not Found</span>
        </h1>
        
        <p class="max-w-md mx-auto text-slate-400 text-sm md:text-base leading-relaxed font-medium">
          The coordinates you entered don't match any existing sector in the SoftShine network. It may have been moved or deleted.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <RouterLink to="/" 
            class="group relative flex items-center justify-center gap-3 px-8 py-4 bg-cyan-500 text-black font-black rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] overflow-hidden w-full sm:w-auto">
            <div class="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            <span class="tracking-widest text-xs uppercase">Return to Hub</span>
          </RouterLink>

          <button @click="$router.go(-1)"
            class="px-8 py-4 text-slate-500 hover:text-white font-black text-xs tracking-widest uppercase transition-colors">
            Go Back
          </button>
        </div>
      </div>
    </div>
    
    <div class="absolute inset-0 pointer-events-none opacity-[0.03]" 
         style="background-image: linear-gradient(rgba(6,182,212,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.8) 1px, transparent 1px); background-size: 60px 60px;">
    </div>
  </div>
</template>

<style scoped>
@keyframes glitch {
  0% { transform: translate(0); text-shadow: -2px 0 #06b6d4, 2px 0 #3b82f6; }
  25% { transform: translate(-2px, 2px); }
  50% { transform: translate(2px, -2px); text-shadow: 2px 0 #06b6d4, -2px 0 #3b82f6; }
  75% { transform: translate(-2px, -2px); }
  100% { transform: translate(0); }
}

.animate-glitch {
  animation: glitch 3s infinite linear alternate-reverse;
}

/* Optional: Soft pulse for the background radial gradient */
@keyframes pulse-bg {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}
</style>