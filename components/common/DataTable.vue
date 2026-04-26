<template>
  <div class="bg-white border border-gray-300 rounded overflow-hidden">
    <table class="w-full text-sm">
      <thead class="bg-gray-100 border-b border-gray-300">
        <tr>
          <th v-for="col in columns" :key="col.key" class="text-left px-3 py-2 text-xs font-medium text-gray-600 uppercase">{{ col.label }}</th>
          <th v-if="hasActions" class="text-left px-3 py-2 text-xs font-medium text-gray-600 uppercase">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in data" :key="i" class="border-b border-gray-200 hover:bg-gray-50">
          <td v-for="col in columns" :key="col.key" class="px-3 py-2 text-gray-800">
            <slot :name="col.key" :row="row" :value="row[col.key]">{{ row[col.key] }}</slot>
          </td>
          <td v-if="hasActions" class="px-3 py-2">
            <slot name="actions" :row="row" />
          </td>
        </tr>
        <tr v-if="!data.length">
          <td :colspan="columns.length + (hasActions ? 1 : 0)" class="px-3 py-6 text-center text-gray-400">No data available</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  columns: Array<{ key: string; label: string }>
  data: any[]
  hasActions?: boolean
}>()
</script>
