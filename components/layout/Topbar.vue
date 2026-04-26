<template>
  <header class="h-16 bg-white border-b border-gray-300 px-6 flex items-center justify-between">
    <!-- Left-aligned Search -->
    <div class="flex-1 flex items-center">
      <div class="relative w-full max-w-md">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search class="w-4 h-4 text-gray-400" />
        </div>
        <input type="text" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500" placeholder="Global search...">
      </div>
    </div>

    <div class="flex items-center justify-end gap-4">
      <!-- Notifications -->
      <NuxtLink to="/notifications" class="relative text-gray-600 hover:text-gray-900">
        <Bell class="w-5 h-5" />
        <span v-if="unreadCount > 0" class="absolute -top-1 -right-2 bg-gray-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{{ unreadCount }}</span>
      </NuxtLink>
      <!-- User -->
      <div class="text-sm text-gray-700">{{ user?.name }}</div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Bell, Search } from 'lucide-vue-next'
const { user } = useAuth()
const { unreadCount } = useNotifications()
</script>
