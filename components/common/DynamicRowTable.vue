<template>
  <div>
    <table class="w-full text-sm border border-gray-300">
      <thead class="bg-gray-100">
        <tr>
          <th v-for="col in columns" :key="col.key" class="text-left px-2 py-1.5 text-xs font-medium text-gray-600 border-b border-gray-300">{{ col.label }}</th>
          <th class="px-2 py-1.5 text-xs border-b border-gray-300 w-16">—</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in modelValue" :key="i" class="border-b border-gray-200">
          <td v-for="col in columns" :key="col.key" class="px-2 py-1">
            <input v-model="row[col.key]" :type="col.type || 'text'" class="border border-gray-200 rounded px-1.5 py-0.5 text-sm w-full" />
          </td>
          <td class="px-2 py-1 text-center">
            <button @click="removeRow(i)" class="text-gray-400 hover:text-gray-700"><X class="w-3 h-3 mx-auto" /></button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="addRow" class="mt-2 text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">+ Add Row</button>
  </div>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
const props = defineProps<{
  columns: Array<{ key: string; label: string; type?: string }>
  modelValue: any[]
  emptyRow: () => Record<string, any>
}>()
const emit = defineEmits(['update:modelValue'])

function addRow() {
  emit('update:modelValue', [...props.modelValue, props.emptyRow()])
}
function removeRow(index: number) {
  const arr = [...props.modelValue]
  arr.splice(index, 1)
  emit('update:modelValue', arr)
}
</script>
