<template>
  <LayoutAppLayout>
    <div v-if="proposal">
      <LayoutPageHeader title="Resubmitted Proposal" :subtitle="proposal.title" />
      <ReviewReviewPackageViewer :proposal="proposal" />
      <ReviewRevisionMatrixViewer :matrix="proposal.revisionMatrix || []" class="mt-4" />
      <div class="mt-4"><ReviewVprieDecisionPanel @decide="handleDecision" /></div>
    </div>
    <CommonEmptyState v-else message="Proposal not found." />
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const route = useRoute(); const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { getProposal, vprieDecision } = useProposals()
const proposalId = route.params.proposalId as string
const proposal = computed(() => getProposal(proposalId))
function handleDecision(decision: string, remarks: string) {
  vprieDecision(proposalId, decision as any, remarks); alert(`Decision: ${decision}`); navigateTo('/vprie')
}
</script>
