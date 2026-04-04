<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg-[#020617] relative overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
      <div class="absolute inset-0 opacity-[0.02]" 
           style="background-image: radial-gradient(#06b6d4 1px, transparent 1px); background-size: 40px 40px;"></div>
    </div>

    <div class="relative z-10 w-full max-w-lg">
      <div class="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-2xl text-center relative overflow-hidden">
        <div :class="[
          'absolute top-0 left-0 h-1 transition-all duration-1000',
          loading ? 'w-full bg-slate-800' : (success ? 'w-full bg-emerald-500' : 'w-full bg-red-500')
        ]"></div>

        <div v-if="loading" class="space-y-8 animate-in fade-in zoom-in duration-700">
          <div class="relative w-24 h-24 mx-auto">
            <div class="absolute inset-0 rounded-full border-4 border-cyan-500/10 animate-ping"></div>
            <div class="absolute inset-0 rounded-full border-t-4 border-cyan-500 animate-spin"></div>
            <div class="absolute inset-4 bg-white/5 rounded-full flex items-center justify-center">
               <svg class="w-8 h-8 text-cyan-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
               </svg>
            </div>
          </div>
          <div>
            <h2 class="text-2xl font-black text-white tracking-tight mb-2">Syncing Credentials</h2>
            <p class="text-slate-500 font-medium text-sm">Validating your security token with our servers...</p>
          </div>
        </div>

        <div v-else-if="success" class="animate-in slide-in-from-bottom-8 duration-1000">
          <div class="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-10 relative">
            <div class="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping scale-125"></div>
            <svg class="w-12 h-12 text-emerald-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 class="text-3xl font-black text-white tracking-tighter mb-4">Email Confirmed</h1>
          <div class="space-y-4 mb-10">
            <p class="text-slate-400 text-sm leading-relaxed font-medium">
              Your identity has been verified. To maintain network integrity, your account is now in the <span class="text-cyan-400 font-bold">Admin Queue</span> for final approval.
            </p>
            <p class="text-[10px] text-slate-500 uppercase tracking-widest font-black">Average Approval: 1-4 Hours</p>
          </div>

          <RouterLink to="/login" 
            class="group relative inline-flex items-center justify-center gap-3 w-full py-4 bg-emerald-500 text-black font-black rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] overflow-hidden">
            <span class="tracking-widest text-xs uppercase relative z-10">Proceed to Dashboard</span>
            <svg class="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
          </RouterLink>
        </div>

        <div v-else class="animate-in slide-in-from-bottom-8 duration-700">
          <div class="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-10">
            <svg class="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <h1 class="text-3xl font-black text-white tracking-tighter mb-4">Link Expired</h1>
          <p class="text-slate-400 text-sm leading-relaxed mb-10 font-medium px-4">
            {{ errorMsg }}. Security tokens expire after 24 hours for your protection.
          </p>

          <div class="flex flex-col gap-3">
            <RouterLink to="/register" class="w-full py-4 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all text-xs tracking-widest uppercase">
              Restart Registration
            </RouterLink>
            <RouterLink to="/" class="text-slate-500 hover:text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] transition-colors mt-4">
              ← Back to Home
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { authAPI } from '@/services/api'

const route = useRoute()
const loading = ref(true)
const success = ref(false)
const errorMsg = ref('')

onMounted(async () => {
  // Ensure we have a token before hitting the API
  const token = route.query.token
  if (!token) {
    errorMsg.value = "Security token is missing from the URL."
    loading.value = false
    return
  }

  try {
    // Artificial delay for UX "Smoothness" (Optional)
    await new Promise(resolve => setTimeout(resolve, 1500))
    await authAPI.verifyEmail(token)
    success.value = true
  } catch(e) {
    errorMsg.value = e.response?.data?.message || 'The verification link is invalid or has already been used.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Utility for smooth animations */
.animate-in {
  animation-delay: 0ms;
  animation-fill-mode: both;
}

@keyframes slide-in-bottom {
  from { transform: translateY(2rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.slide-in-from-bottom-8 {
  animation: slide-in-bottom 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes zoom-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.zoom-in {
  animation: zoom-in 0.5s ease-out;
}
</style>