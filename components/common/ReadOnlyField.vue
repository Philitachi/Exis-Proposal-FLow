<template>
  <div class="mb-2">
    <div class="text-xs text-gray-500">{{ label }}</div>
    <div class="text-sm text-gray-800 border-b border-gray-200 py-1">{{ value || '—' }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: any }>()
</script>
