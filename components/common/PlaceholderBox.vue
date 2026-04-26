<template>
  <div class="border border-dashed border-gray-400 rounded p-6 bg-gray-50 flex items-center justify-center text-center" :style="{ minHeight: height || '120px' }">
    <div class="text-sm text-gray-400">{{ label || 'Placeholder' }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label?: string; height?: string }>()
</script>
