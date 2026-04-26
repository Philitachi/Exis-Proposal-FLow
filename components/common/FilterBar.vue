<template>
  <div class="flex items-center gap-3 mb-4 flex-wrap">
    <select v-if="statusOptions.length" v-model="selectedStatus" class="border border-gray-300 rounded px-2 py-1 text-sm">
      <option value="">All Statuses</option>
      <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
    </select>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ statusOptions?: string[] }>()
const selectedStatus = defineModel<string>('modelValue', { default: '' })
</script>
