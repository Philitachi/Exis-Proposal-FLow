<template>
  <LayoutAppLayout>
    <div v-if="proposal">
      <ReviewReviewPackageViewer :proposal="proposal" />
      <ReviewRevisionMatrixViewer :matrix="proposal.revisionMatrix || []" class="mt-4" />
      <div class="mt-4">
        <ReviewDirectorDecisionPanel @decide="handleDecision" />
      </div>
    </div>
    <CommonEmptyState v-else message="Proposal not found." />
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { getProposal, directorDecision, changeStatus } = useProposals()
const proposalId = route.params.proposalId as string
const proposal = computed(() => getProposal(proposalId))

// Auto-transition to Under Initial Review when Director opens it
onMounted(() => {
  if (proposal.value?.status === 'Submitted to Extension Director') {
    changeStatus(proposalId, 'Under Initial Review', user.value?.name || '')
  }
})

function handleDecision(decision: string, remarks: string) {
  directorDecision(proposalId, decision as any, remarks)
  alert(`Decision: ${decision}`)
  navigateTo('/director')
}
</script>
