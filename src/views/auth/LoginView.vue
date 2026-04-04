<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-16">
    <!-- Background -->
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-1/3 left-1/3 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/3 right-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div class="absolute inset-0 opacity-[0.02]"
           style="background-image:linear-gradient(rgba(6,182,212,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.8) 1px,transparent 1px);background-size:40px 40px"></div>
    </div>

    <div class="relative w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <RouterLink to="/" class="inline-flex items-center gap-3">
          <div class="relative w-10 h-10">
            <div class="absolute inset-0 bg-cyan-500 rounded-xl rotate-45"></div>
            <div class="absolute inset-1.5 bg-slate-950 rounded-lg rotate-45"></div>
            <span class="absolute inset-0 flex items-center justify-center text-cyan-400 font-display font-bold">S</span>
          </div>
          <span class="font-display font-bold text-2xl text-white">Soft<span class="text-cyan-400">Shine</span></span>
        </RouterLink>
      </div>

      <div class="card-glass p-8 glow-border">
        <h1 class="font-display font-bold text-2xl text-white mb-2">Welcome back</h1>
        <p class="text-slate-400 text-sm mb-8">Sign in with your email or mobile number</p>

        <Transition name="alert">
          <div v-if="error" class="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {{ error }}
          </div>
        </Transition>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-sm text-slate-400 mb-1.5">Email or Mobile *</label>
            <input v-model="form.login" type="text" class="input-field"
                   placeholder="email@example.com or +8801..." required />
          </div>
          <div>
            <label class="block text-sm text-slate-400 mb-1.5">Password *</label>
            <div class="relative">
              <input v-model="form.password" :type="showPass ? 'text' : 'password'"
                     class="input-field pr-12" placeholder="••••••••" required />
              <button type="button" @click="showPass = !showPass"
                      class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path v-if="!showPass" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
          </div>

          <button type="submit" :disabled="auth.loading" class="btn-primary w-full justify-center py-3.5 text-base">
            <svg v-if="auth.loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ auth.loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p class="text-center text-slate-500 text-sm mt-6">
          Don't have an account?
          <RouterLink to="/register" class="text-cyan-400 hover:text-cyan-300 font-medium ml-1">Create one</RouterLink>
        </p>
      </div>

      <div class="text-center mt-4">
        <RouterLink to="/" class="text-slate-500 hover:text-slate-400 text-sm transition-colors">← Back to website</RouterLink>
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
    router.push('/dashboard')
  } catch(e) {
    error.value = e.response?.data?.message || 'Login failed'
  }
}
</script>