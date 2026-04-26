<template>
  <div class="border-l-2 border-gray-300 ml-4 pl-4 space-y-3">
    <div v-for="(item, i) in items" :key="i" class="relative">
      <div class="absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 border-gray-400 bg-white"></div>
      <div class="text-xs text-gray-500">{{ formatDate(item.date) }}</div>
      <div class="text-sm text-gray-800">{{ item.status }}</div>
      <div class="text-xs text-gray-400">by {{ item.actor }}</div>
      <div v-if="item.remarks" class="text-xs text-gray-500 italic mt-0.5">{{ item.remarks }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatters'
defineProps<{ items: Array<{ status: string; date: string; actor: string; remarks?: string }> }>()
</script>
