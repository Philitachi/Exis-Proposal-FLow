<template>
  <input type="text" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" :placeholder="placeholder" class="border border-gray-300 rounded px-3 py-1.5 text-sm w-full max-w-xs" />
</template>

<script setup lang="ts">
defineProps<{ modelValue: string; placeholder?: string }>()
defineEmits(['update:modelValue'])
</script>
