<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white border border-gray-300 rounded p-8 w-full max-w-sm">
      <h1 class="text-2xl font-bold text-gray-900 mb-1 text-center">ExSIS</h1>
      <p class="text-xs text-gray-500 mb-6 text-center">Extension Services Information System — Prototype</p>

      <div v-if="error" class="mb-4 p-2 border border-gray-400 bg-gray-100 rounded text-xs text-gray-700 flex items-center gap-1"><AlertTriangle class="w-4 h-4 text-red-600" /> {{ error }}</div>

      <div class="space-y-4">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Email</label>
          <input v-model="email" type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="test.com" />
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Password</label>
          <input v-model="password" type="password" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="test" />
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Role</label>
          <select v-model="role" class="w-full border border-gray-300 rounded px-3 py-2 text-sm">
            <option value="">Select role...</option>
            <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
          </select>
        </div>
        <button @click="handleLogin" class="w-full bg-gray-800 text-white py-2 rounded text-sm hover:bg-gray-700">Login</button>
      </div>

      <p class="text-xs text-gray-400 mt-4 text-center">Use: test.com / test — then select a role</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ROLES, ROLE_ROUTES } from '~/utils/constants'
import { AlertTriangle } from 'lucide-vue-next'

definePageMeta({ layout: false })

const { login } = useAuth()
const email = ref('test.com')
const password = ref('test')
const role = ref('')
const error = ref('')
const roles = Object.values(ROLES)

function handleLogin() {
  if (!role.value) { error.value = 'Please select a role.'; return }
  const result = login(email.value, password.value, role.value)
  if (!result.success) { error.value = result.error || 'Login failed.'; return }
  error.value = ''
  navigateTo(ROLE_ROUTES[role.value] || '/dashboard')
}
</script>
