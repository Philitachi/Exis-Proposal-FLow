<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="Confirm Evaluators" :subtitle="proposal?.title" />
    <div v-if="proposal">
      <ProposalSummaryHeader :proposal="proposal" />
      <CommonWireframeCard title="Nominated Evaluators" class="mb-4">
        <div v-for="ev in proposal.nominatedEvaluators" :key="ev.userId" class="py-2 border-b border-gray-200">
          <div class="text-sm font-medium">{{ ev.name }}</div>
          <div class="text-xs text-gray-500">Type: {{ ev.type }} · Notes: {{ ev.notes }}</div>
        </div>
        <div v-if="proposal.nominatedEvaluators.length < 2" class="text-xs text-gray-700 mt-2 bg-gray-100 p-2 rounded">⚠ Must have at least 2 evaluators.</div>
      </CommonWireframeCard>
      <button @click="handleConfirm" class="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700" :disabled="proposal.nominatedEvaluators.length < 2">Confirm Evaluator Assignments</button>
    </div>
    <CommonEmptyState v-else message="Proposal not found." />
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { getProposal, confirmEvaluators } = useProposals()
const proposalId = route.params.proposalId as string
const proposal = computed(() => getProposal(proposalId))

function handleConfirm() {
  confirmEvaluators(proposalId)
  alert('Evaluators confirmed!')
  navigateTo('/director')
}
</script>
