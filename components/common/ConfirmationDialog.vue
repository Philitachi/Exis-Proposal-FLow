<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50" @click.self="$emit('cancel')">
      <div class="bg-white border border-gray-300 rounded p-6 max-w-md w-full mx-4">
        <h3 class="text-sm font-semibold text-gray-800 mb-2">{{ title }}</h3>
        <p class="text-sm text-gray-600 mb-4">{{ message }}</p>
        <div class="flex justify-end gap-2">
          <button @click="$emit('cancel')" class="border border-gray-300 px-3 py-1.5 rounded text-sm hover:bg-gray-100">Cancel</button>
          <button @click="$emit('confirm')" class="bg-gray-800 text-white px-3 py-1.5 rounded text-sm hover:bg-gray-700">{{ confirmLabel || 'Confirm' }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ show: boolean; title: string; message: string; confirmLabel?: string }>()
defineEmits(['confirm', 'cancel'])
</script>
