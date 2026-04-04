<template>
  <div class="min-h-screen flex items-center justify-center px-4 text-center">
    <div>
      <div class="font-display font-black text-9xl text-slate-800 mb-4 select-none">404</div>
      <h1 class="font-display font-bold text-3xl text-white mb-4">Page Not Found</h1>
      <p class="text-slate-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <RouterLink to="/" class="btn-primary">← Back to Home</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>