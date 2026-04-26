<template>
  <div class="border border-dashed border-gray-400 rounded p-4 bg-gray-50 text-center">
    <div class="text-gray-500 text-sm mb-2">{{ label || 'Upload File' }}</div>
    <div class="text-xs text-gray-400">[Mock upload — click to simulate]</div>
    <button @click="handleUpload" class="mt-2 text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">Choose File</button>
    <div v-if="files.length" class="mt-2 text-left">
      <div v-for="(f, i) in files" :key="i" class="flex items-center justify-between text-xs text-gray-600 py-0.5">
        <span class="flex items-center gap-1"><Paperclip class="w-3 h-3" /> {{ f }}</span>
        <button @click="removeFile(i)" class="text-gray-400 hover:text-gray-700"><X class="w-3 h-3" /></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Paperclip, X } from 'lucide-vue-next'
const props = defineProps<{ label?: string; modelValue?: string[] }>()
const emit = defineEmits(['update:modelValue'])
const files = ref<string[]>(props.modelValue || [])

function handleUpload() {
  const mockName = `mock_file_${Date.now().toString(36)}.pdf`
  files.value.push(mockName)
  emit('update:modelValue', files.value)
}
function removeFile(i: number) {
  files.value.splice(i, 1)
  emit('update:modelValue', files.value)
}
</script>
