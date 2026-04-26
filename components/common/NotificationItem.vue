<template>
  <div class="flex items-start gap-3 py-2 border-b border-gray-100" :class="{ 'opacity-60': item.read }">
    <div class="text-gray-500 flex-shrink-0 mt-0.5">
      <component :is="icons[typeIcon as keyof typeof icons]" class="w-5 h-5" />
    </div>
    <div class="flex-1 min-w-0">
      <div class="text-sm font-medium text-gray-800">{{ item.title }}</div>
      <div class="text-xs text-gray-500 truncate">{{ item.message }}</div>
      <div class="text-xs text-gray-400 mt-0.5">{{ formatDate(item.createdAt) }}</div>
    </div>
    <NuxtLink v-if="item.link" :to="item.link" class="text-xs text-gray-500 hover:text-gray-800 border border-gray-300 px-2 py-0.5 rounded">View</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatters'
import * as icons from 'lucide-vue-next'

const props = defineProps<{ item: any }>()
const typeIcon = computed(() => {
  const map: Record<string, string> = { info: 'Info', task: 'ClipboardList', success: 'CheckCircle', warning: 'AlertTriangle' }
  return map[props.item.type] || 'Info'
})
</script>
