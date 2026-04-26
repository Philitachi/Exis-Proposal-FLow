<template>
  <div class="mb-6">
    <h1 class="text-xl font-bold text-gray-900">{{ title }}</h1>
    <p v-if="subtitle" class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
    <div v-if="$slots.actions" class="mt-3">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
</script>
