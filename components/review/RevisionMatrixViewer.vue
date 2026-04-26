<template>
  <CommonWireframeCard title="Revision Matrix">
    <div v-if="!matrix.length" class="text-sm text-gray-400">No revision matrix entries.</div>
    <table v-else class="w-full text-xs border border-gray-300">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-2 py-1 text-left border-b border-gray-300">Comment</th>
          <th class="px-2 py-1 text-left border-b border-gray-300">By</th>
          <th class="px-2 py-1 text-left border-b border-gray-300">Level</th>
          <th class="px-2 py-1 text-left border-b border-gray-300">Action Taken</th>
          <th class="px-2 py-1 text-left border-b border-gray-300">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(r, i) in matrix" :key="i" class="border-b border-gray-200">
          <td class="px-2 py-1">{{ r.comment }}</td>
          <td class="px-2 py-1">{{ r.commentedBy }}</td>
          <td class="px-2 py-1">{{ r.reviewLevel }}</td>
          <td class="px-2 py-1">{{ r.actionTaken }}</td>
          <td class="px-2 py-1">{{ r.status }}</td>
        </tr>
      </tbody>
    </table>
  </CommonWireframeCard>
</template>

<script setup lang="ts">
defineProps<{ matrix: any[] }>()
</script>
