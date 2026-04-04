<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12 bg-[#020617] relative overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div class="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      <div class="absolute inset-0 opacity-[0.03]" 
           style="background-image: radial-gradient(#06b6d4 1px, transparent 1px); background-size: 32px 32px;"></div>
    </div>

    <div class="relative z-10 w-full max-w-[480px]">
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

      <div class="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

        <div class="mb-10">
          <h1 class="text-3xl font-black text-white tracking-tight mb-2">Welcome Back</h1>
          <p class="text-slate-400 text-sm font-medium">Enter your credentials to access your portal.</p>
        </div>

        <Transition name="slide-up">
          <div v-if="error" class="mb-8 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-4">
            <div class="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <p class="text-red-400 text-xs font-medium self-center">{{ error }}</p>
          </div>
        </Transition>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="group">
            <label class="block text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-cyan-400 transition-colors">Email or Mobile</label>
            <div class="relative">
              <input v-model="form.login" type="text" 
                     class="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all placeholder:text-slate-600" 
                     placeholder="name@company.com" required />
              <svg class="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
              </svg>
            </div>
          </div>

          <div class="group">
            <div class="flex justify-between items-center mb-2">
              <label class="text-[11px] font-black uppercase tracking-widest text-slate-500 group-focus-within:text-cyan-400 transition-colors">Password</label>
              <RouterLink to="/forgot-password" class="text-[10px] font-bold text-cyan-500/80 hover:text-cyan-400 uppercase tracking-tighter">Forgot Password?</RouterLink>
            </div>
            <div class="relative">
              <input v-model="form.password" :type="showPass ? 'text' : 'password'" 
                     class="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 pr-14 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.05] transition-all placeholder:text-slate-600" 
                     placeholder="••••••••" required />
              
              <button type="button" @click="showPass = !showPass"
                      class="absolute right-5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-cyan-400 transition-colors">
                <svg v-if="!showPass" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
              </button>
            </div>
          </div>

          <div class="flex items-center">
            <label class="flex items-center cursor-pointer group/check">
              <input type="checkbox" class="hidden peer" />
              <div class="w-5 h-5 border-2 border-white/10 rounded-md bg-white/5 peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-all flex items-center justify-center">
                <svg class="w-3 h-3 text-black opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="4"><path d="M5 13l4 4L19 7"/></svg>
              </div>
              <span class="ml-3 text-xs font-bold text-slate-500 group-hover/check:text-slate-300 transition-colors uppercase tracking-tighter">Remember Session</span>
            </label>
          </div>

          <button type="submit" :disabled="auth.loading" 
                  class="group/btn relative w-full bg-cyan-500 hover:bg-white text-black font-black py-4 rounded-2xl transition-all duration-500 shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:shadow-cyan-500/40 flex items-center justify-center gap-3 overflow-hidden">
            <div class="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            
            <svg v-if="auth.loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <span v-else class="tracking-[0.2em] text-xs uppercase">Authenticate</span>
          </button>
        </form>

        <div class="mt-10 pt-8 border-t border-white/5 text-center">
          <p class="text-slate-500 text-xs font-medium">
            New to the ecosystem?
            <RouterLink to="/register" class="text-white hover:text-cyan-400 transition-colors font-black ml-1 uppercase tracking-tighter">Create Account</RouterLink>
          </p>
        </div>
      </div>

      <div class="text-center mt-8">
        <RouterLink to="/" class="group inline-flex items-center gap-2 text-slate-600 hover:text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
          <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>
          Return to Hub
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const auth = useAuthStore()
const form = ref({ login: '', password: '' })
const error = ref(''), showPass = ref(false)

const handleLogin = async () => {
  error.value = ''
  try {
    await auth.login(form.value)
    // Professional delay or immediate push
    router.push('/dashboard')
  } catch(e) {
    // Handling Spring Boot typical error response
    error.value = e.response?.data?.message || 'Access denied. Please check your credentials.'
  }
}
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.4s ease; }
.slide-up-enter-from { opacity: 0; transform: translateY(10px); }
</style>