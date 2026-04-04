<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12 bg-[#020617] relative overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div class="absolute inset-0 opacity-[0.03]" 
           style="background-image: radial-gradient(#06b6d4 1px, transparent 1px); background-size: 32px 32px;"></div>
    </div>

    <div class="relative z-10 w-full max-w-[540px]">
      <div class="text-center mb-10">
        <RouterLink to="/" class="inline-flex items-center gap-3 group">
          <div class="relative w-12 h-12 transition-transform duration-500 group-hover:rotate-[135deg]">
            <div class="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl rotate-45 shadow-[0_0_20px_rgba(6,182,212,0.3)]"></div>
            <div class="absolute inset-1.5 bg-slate-950 rounded-lg rotate-45"></div>
            <span class="absolute inset-0 flex items-center justify-center text-cyan-400 font-black text-xl select-none">S</span>
          </div>
          <span class="font-black text-3xl text-white tracking-tighter">Soft<span class="text-cyan-400">Shine</span></span>
        </RouterLink>
      </div>

      <div class="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden relative">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

        <div class="mb-10">
          <h1 class="text-3xl font-black text-white tracking-tight mb-2">Join the Community</h1>
          <p class="text-slate-400 text-sm font-medium">Create your account to start building with SoftShine.</p>
        </div>

        <Transition name="slide-up">
          <div v-if="successMsg" class="mb-8 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            </div>
            <div>
              <p class="text-emerald-400 font-bold text-sm">Success!</p>
              <p class="text-emerald-400/80 text-xs">{{ successMsg }}</p>
            </div>
          </div>
          <div v-else-if="error" class="mb-8 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-4">
            <div class="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <p class="text-red-400 text-xs font-medium self-center">{{ error }}</p>
          </div>
        </Transition>

        <form v-if="!successMsg" @submit.prevent="handleRegister" class="space-y-6">
          <div class="group">
            <label class="block text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-cyan-400 transition-colors">Full Name</label>
            <div class="relative">
              <input v-model="form.fullName" type="text" 
                     class="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all placeholder:text-slate-600" 
                     placeholder="M Parvej Alam" required />
              <svg class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke-width="2" /></svg>
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div class="group">
              <label class="block text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-cyan-400 transition-colors">Mobile</label>
              <input v-model="form.mobile" type="tel" 
                     class="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all placeholder:text-slate-600" 
                     placeholder="+880..." required />
            </div>
            <div class="group">
              <label class="block text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-cyan-400 transition-colors">Email</label>
              <input v-model="form.email" type="email" 
                     class="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all placeholder:text-slate-600" 
                     placeholder="name@company.com" required />
            </div>
          </div>

          <div class="group">
            <label class="block text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-cyan-400 transition-colors">Security Password</label>
            <input v-model="form.password" type="password" 
                   class="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all placeholder:text-slate-600" 
                   placeholder="••••••••" required />
            
            <div class="mt-4 flex gap-1">
               <div v-for="i in 4" :key="i" :class="['h-1 flex-1 rounded-full transition-all duration-500', i <= passwordStrength ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-white/10']"></div>
            </div>
            <p class="text-[10px] text-slate-500 mt-2 font-medium">Complexity: Use uppercase, numbers, and symbols.</p>
          </div>

          <button type="submit" :disabled="auth.loading" 
                  class="group/btn relative w-full bg-cyan-500 hover:bg-white text-black font-black py-4 rounded-2xl transition-all duration-500 shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:shadow-cyan-500/40 flex items-center justify-center gap-3 overflow-hidden">
            <div class="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            
            <svg v-if="auth.loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <span v-else class="tracking-widest text-xs uppercase">Initialize Account</span>
          </button>
        </form>

        <div v-if="successMsg" class="text-center">
            <RouterLink to="/login" class="inline-flex items-center gap-2 text-cyan-400 font-bold hover:text-white transition-colors">
                PROCEED TO LOGIN <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </RouterLink>
        </div>

        <div class="mt-10 pt-8 border-t border-white/5 text-center">
          <p class="text-slate-500 text-xs font-medium">
            Already a member?
            <RouterLink to="/login" class="text-white hover:text-cyan-400 transition-colors font-black ml-1 uppercase tracking-tighter">Sign In</RouterLink>
          </p>
        </div>
      </div>

      <p class="text-center text-slate-600 text-[10px] mt-8 uppercase tracking-[0.2em] font-medium">
        Secure Encryption • Privacy Protected • SoftShine © 2026
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
const form = ref({ fullName:'', mobile:'', email:'', password:'' })
const error = ref(''), successMsg = ref('')

// Basic UX: Password Strength Estimator
const passwordStrength = computed(() => {
    let s = 0
    if (form.value.password.length > 7) s++
    if (/[A-Z]/.test(form.value.password)) s++
    if (/[0-9]/.test(form.value.password)) s++
    if (/[^A-Za-z0-9]/.test(form.value.password)) s++
    return s
})

const handleRegister = async () => {
  error.value = ''
  try {
    const result = await auth.register(form.value)
    successMsg.value = result.message || 'Registration successful! Please check your email.'
  } catch(e) {
    const data = e.response?.data
    error.value = data?.message || 'The registration request could not be processed.'
    if (data?.errors) {
       // Specifically handle Spring Boot Validation Errors
       error.value = Object.values(data.errors)[0] 
    }
  }
}
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.4s ease; }
.slide-up-enter-from { opacity: 0; transform: translateY(10px); }

/* Hide scrollbar for the container */
.no-scrollbar::-webkit-scrollbar { display: none; }
</style>