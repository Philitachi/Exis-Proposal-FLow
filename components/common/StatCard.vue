<template>
  <div class="bg-white border border-gray-300 p-4 rounded">
    <div class="text-xs text-gray-500 uppercase">{{ label }}</div>
    <div class="text-2xl font-bold text-gray-900 mt-1">{{ value }}</div>
    <div v-if="description" class="text-xs text-gray-400 mt-1">{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: string | number; description?: string }>()
</script>
