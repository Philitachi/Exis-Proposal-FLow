<template>
  <aside class="w-64 bg-white border-r border-gray-200 flex flex-col h-full flex-shrink-0">
    <!-- Logo / Title -->
    <div class="h-16 px-6 border-b border-gray-200 flex items-center">
      <div class="text-xl font-bold text-gray-900">ExSIS</div>
    </div>

    <!-- Role indicator -->
    <div class="px-6 py-5 border-b border-gray-100">
      <div class="text-[15px] font-semibold text-slate-800 truncate">{{ user?.role }}</div>
      <div class="text-sm text-slate-500 mt-0.5">Role View</div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-4 overflow-y-auto px-3">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-4 px-3 py-3 my-0.5 rounded-lg text-[15px] text-slate-700 hover:bg-slate-50 transition-colors"
        :class="{ 'bg-slate-100 text-slate-900 font-semibold': isActive(item.to) }"
      >
        <component :is="getIcon(item.icon)" class="w-5 h-5" :class="{ 'text-slate-800': isActive(item.to), 'text-slate-500': !isActive(item.to) }" />
        <span class="leading-tight">{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <!-- Logout -->
    <div class="border-t border-gray-200 p-4 px-3">
      <button @click="handleLogout" class="flex items-center gap-4 px-3 py-3 rounded-lg text-[15px] text-slate-700 hover:bg-slate-50 w-full transition-colors">
        <LogOut class="w-5 h-5 text-slate-500" />
        <span>Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { getSidebarItems } from '~/utils/roleRules'
import { LogOut } from 'lucide-vue-next'
import * as icons from 'lucide-vue-next'

const { user, logout } = useAuth()
const route = useRoute()

const menuItems = computed(() => user.value ? getSidebarItems(user.value.role) : [])

const activeRoute = computed(() => {
  let match = ''
  for (const item of menuItems.value) {
    if (route.path === item.to || route.path.startsWith(item.to + '/')) {
      if (item.to.length > match.length) {
        match = item.to
      }
    }
  }
  return match
})

function isActive(to: string) {
  return activeRoute.value === to
}

function handleLogout() {
  logout()
}

function getIcon(name: string) {
  return (icons as any)[name]
}
</script>
