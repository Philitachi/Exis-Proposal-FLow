<template>
  <LayoutAppLayout>
    <div v-if="proposal">
      <ReviewReviewPackageViewer :proposal="proposal" />
      <ReviewRevisionMatrixViewer :matrix="proposal.revisionMatrix || []" class="mt-4" />
      <div class="mt-4"><ReviewPresidentDecisionPanel @decide="handleDecision" /></div>
    </div>
    <CommonEmptyState v-else message="Proposal not found." />
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const route = useRoute(); const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { getProposal, presidentDecision } = useProposals()
const proposalId = route.params.proposalId as string
const proposal = computed(() => getProposal(proposalId))
function handleDecision(decision: string, remarks: string) {
  presidentDecision(proposalId, decision as any, remarks); alert(`Decision: ${decision}`); navigateTo('/president')
}
</script>
