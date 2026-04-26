<template>
  <div class="text-center py-10 text-gray-400">
    <div class="flex justify-center mb-2">
      <component :is="icons[(icon as keyof typeof icons) || 'Inbox']" class="w-8 h-8 text-gray-300" />
    </div>
    <div class="text-sm">{{ message || 'No items found.' }}</div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'

defineProps<{ message?: string; icon?: string }>()
</script>
