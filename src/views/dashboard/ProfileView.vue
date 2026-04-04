<template>
  <div class="max-w-2xl space-y-6">
    <div v-if="message" class="p-4 rounded-lg" :class="message.type==='success'?'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400':'bg-red-500/10 border border-red-500/30 text-red-400'">
      {{ message.text }}
    </div>

    <!-- Profile Info -->
    <div class="card-glass p-8 glow-border">
      <div class="flex items-center gap-5 mb-8">
        <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-display font-bold text-3xl">
          {{ auth.fullName?.charAt(0) }}
        </div>
        <div>
          <h2 class="font-display font-bold text-2xl text-white">{{ auth.fullName }}</h2>
          <p class="text-slate-400">{{ auth.user?.email }}</p>
          <span class="inline-block mt-1 px-3 py-0.5 text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
            {{ auth.isAdmin ? 'System Admin' : 'User' }}
          </span>
        </div>
      </div>

      <h3 class="font-display font-semibold text-white mb-5">Update Profile</h3>
      <form @submit.prevent="updateProfile" class="space-y-4">
        <div>
          <label class="block text-sm text-slate-400 mb-1.5">Full Name *</label>
          <input v-model="profileForm.fullName" type="text" class="input-field" required />
        </div>
        <div>
          <label class="block text-sm text-slate-400 mb-1.5">Mobile</label>
          <input v-model="profileForm.mobile" type="tel" class="input-field" />
        </div>
        <div>
          <label class="block text-sm text-slate-400 mb-1.5">Email</label>
          <input :value="auth.user?.email" type="email" class="input-field opacity-50" disabled />
          <p class="text-slate-600 text-xs mt-1">Email cannot be changed</p>
        </div>
        <button type="submit" :disabled="saving" class="btn-primary">
          {{ saving ? 'Saving...' : 'Update Profile' }}
        </button>
      </form>
    </div>

    <!-- Change Password -->
    <div class="card-glass p-8">
      <h3 class="font-display font-semibold text-white mb-5">Change Password</h3>
      <form @submit.prevent="changePassword" class="space-y-4">
        <div>
          <label class="block text-sm text-slate-400 mb-1.5">Current Password *</label>
          <input v-model="passForm.currentPassword" type="password" class="input-field" required />
        </div>
        <div>
          <label class="block text-sm text-slate-400 mb-1.5">New Password *</label>
          <input v-model="passForm.newPassword" type="password" class="input-field" required minlength="8" />
        </div>
        <button type="submit" :disabled="changingPass" class="btn-outline">
          {{ changingPass ? 'Changing...' : 'Change Password' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { authAPI } from '@/services/api'

const auth = useAuthStore()
const saving = ref(false), changingPass = ref(false), message = ref(null)

const profileForm = ref({ fullName: auth.fullName, mobile: auth.user?.mobile })
const passForm = ref({ currentPassword: '', newPassword: '' })

const showMsg = (text, type='success') => {
  message.value = { text, type }
  setTimeout(() => message.value = null, 3000)
}

const updateProfile = async () => {
  saving.value = true
  try {
    await authAPI.updateProfile(profileForm.value)
    await auth.fetchMe()
    showMsg('Profile updated successfully!')
  } catch(e) {
    showMsg(e.response?.data?.message || 'Failed to update', 'error')
  } finally { saving.value = false }
}

const changePassword = async () => {
  changingPass.value = true
  try {
    await authAPI.changePassword(passForm.value)
    passForm.value = { currentPassword: '', newPassword: '' }
    showMsg('Password changed successfully!')
  } catch(e) {
    showMsg(e.response?.data?.message || 'Failed to change password', 'error')
  } finally { changingPass.value = false }
}
</script>