<template>
  <div class="border border-gray-300 rounded bg-white p-4">
    <h4 class="text-sm font-semibold text-gray-700 mb-3">Decision</h4>
    <div class="space-y-3">
      <div>
        <label class="block text-xs text-gray-500 mb-1">Remarks / Comments</label>
        <textarea v-model="remarks" rows="3" class="w-full border border-gray-300 rounded px-2 py-1 text-sm"></textarea>
      </div>
      <div class="flex gap-2 flex-wrap">
        <button v-for="opt in options" :key="opt.value" @click="$emit('decide', opt.value, remarks)"
          class="border rounded px-3 py-1.5 text-sm" :class="opt.class || 'border-gray-300 hover:bg-gray-100'">
          {{ opt.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ options: Array<{ label: string; value: string; class?: string }> }>()
defineEmits(['decide'])
const remarks = ref('')
</script>
