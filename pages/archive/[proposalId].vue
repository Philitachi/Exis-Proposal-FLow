<template>
  <LayoutAppLayout>
    <div v-if="proposal">
      <ProposalSummaryHeader :proposal="proposal" />
      <ProposalFinalPdfPreview :doc="proposal.documentControl" />
      <ProposalStatusTimeline :history="proposal.statusHistory" class="mt-4" />
    </div>
    <CommonEmptyState v-else message="Archived proposal not found." />
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const route = useRoute(); const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { getProposal } = useProposals()
const proposalId = route.params.proposalId as string
const proposal = computed(() => getProposal(proposalId))
</script>
