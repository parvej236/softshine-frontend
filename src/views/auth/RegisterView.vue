<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-16">
    <div class="fixed inset-0 pointer-events-none">
      <div class="absolute top-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div class="absolute inset-0 opacity-[0.02]"
           style="background-image:linear-gradient(rgba(6,182,212,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.8) 1px,transparent 1px);background-size:40px 40px"></div>
    </div>

    <div class="relative w-full max-w-lg">
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
        <h1 class="font-display font-bold text-2xl text-white mb-2">Create Account</h1>
        <p class="text-slate-400 text-sm mb-8">Join SoftShine. Verification required after registration.</p>

        <Transition name="alert">
          <div v-if="successMsg" class="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
            ✅ {{ successMsg }}
          </div>
          <div v-else-if="error" class="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {{ error }}
          </div>
        </Transition>

        <form v-if="!successMsg" @submit.prevent="handleRegister" class="space-y-5">
          <div>
            <label class="block text-sm text-slate-400 mb-1.5">Full Name *</label>
            <input v-model="form.fullName" type="text" class="input-field" placeholder="M Parvej Alam" required />
          </div>
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-slate-400 mb-1.5">Mobile *</label>
              <input v-model="form.mobile" type="tel" class="input-field" placeholder="+8801..." required />
            </div>
            <div>
              <label class="block text-sm text-slate-400 mb-1.5">Email *</label>
              <input v-model="form.email" type="email" class="input-field" placeholder="you@example.com" required />
            </div>
          </div>
          <div>
            <label class="block text-sm text-slate-400 mb-1.5">Password *</label>
            <input v-model="form.password" type="password" class="input-field"
                   placeholder="Min 8 chars, 1 uppercase, 1 number, 1 symbol" required />
            <p class="text-slate-600 text-xs mt-1">Must contain uppercase, number, and special character</p>
          </div>
          <button type="submit" :disabled="auth.loading" class="btn-primary w-full justify-center py-3.5 text-base">
            <svg v-if="auth.loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ auth.loading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <p class="text-center text-slate-500 text-sm mt-6">
          Already have an account?
          <RouterLink to="/login" class="text-cyan-400 hover:text-cyan-300 font-medium ml-1">Sign in</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
const form = ref({ fullName:'', mobile:'', email:'', password:'' })
const error = ref(''), successMsg = ref('')

const handleRegister = async () => {
  error.value = ''
  try {
    const result = await auth.register(form.value)
    successMsg.value = result.message
  } catch(e) {
    const data = e.response?.data
    if (data?.errors) {
      error.value = Object.values(data.errors).join(' | ')
    } else {
      error.value = data?.message || 'Registration failed'
    }
  }
}
</script>