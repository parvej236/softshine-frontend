<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <div v-if="loading" class="space-y-4">
        <div class="w-16 h-16 mx-auto rounded-full border-4 border-cyan-500/30 border-t-cyan-500 animate-spin"></div>
        <p class="text-slate-400">Verifying your email...</p>
      </div>
      <div v-else-if="success" class="card-glass p-10 glow-border">
        <div class="text-6xl mb-4">✅</div>
        <h1 class="font-display font-bold text-2xl text-white mb-3">Email Verified!</h1>
        <p class="text-slate-400 mb-8">Your account is pending admin approval. You'll receive an email once approved.</p>
        <RouterLink to="/login" class="btn-primary">Go to Login</RouterLink>
      </div>
      <div v-else class="card-glass p-10">
        <div class="text-6xl mb-4">❌</div>
        <h1 class="font-display font-bold text-2xl text-white mb-3">Verification Failed</h1>
        <p class="text-slate-400 mb-8">{{ errorMsg }}</p>
        <RouterLink to="/register" class="btn-outline">Register Again</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { authAPI } from '@/services/api'

const route = useRoute()
const loading = ref(true), success = ref(false), errorMsg = ref('')

onMounted(async () => {
  try {
    await authAPI.verifyEmail(route.query.token)
    success.value = true
  } catch(e) {
    errorMsg.value = e.response?.data?.message || 'Invalid or expired token'
  } finally { loading.value = false }
})
</script>