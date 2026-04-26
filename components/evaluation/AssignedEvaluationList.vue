<template>
  <div>
    <CommonEmptyState v-if="!evaluations.length" message="No assigned evaluations." icon="ClipboardEdit" />
    <div v-else class="space-y-3">
      <div v-for="ev in evaluations" :key="ev.id" class="border border-gray-300 rounded p-4 bg-white flex items-center justify-between">
        <div>
          <div class="text-sm font-medium text-gray-800">{{ getProposalTitle(ev.proposalId) }}</div>
          <div class="text-xs text-gray-500">Proposal: {{ ev.proposalId }} · Status: {{ ev.status }}</div>
        </div>
        <NuxtLink :to="`/evaluations/${ev.proposalId}`" class="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">
          {{ ev.status === 'Completed' ? 'View' : 'Evaluate' }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ evaluations: any[] }>()
const { proposals } = useProposals()
function getProposalTitle(id: string) {
  return proposals.value.find(p => p.id === id)?.title || id
}
</script>
