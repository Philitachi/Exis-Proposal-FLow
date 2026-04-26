<template>
  <div class="bg-white border border-gray-300 rounded p-4">
    <h4 v-if="title" class="text-sm font-semibold text-gray-700 mb-2">{{ title }}</h4>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>()
</script>
