<template>
  <div class="mb-6">
    <h3 class="text-sm font-semibold text-gray-700 uppercase border-b border-gray-300 pb-1 mb-3">{{ title }}</h3>
    <div class="space-y-3">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>
