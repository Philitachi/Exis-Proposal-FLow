<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="Final Proposal" :subtitle="proposal?.title" />
    <div v-if="proposal">
      <ProposalSummaryHeader :proposal="proposal" />
      <ProposalFinalPdfPreview :doc="proposal.documentControl" />
      <div class="mt-4" v-if="proposal.status === 'Approved' && !proposal.documentControl">
        <NuxtLink :to="`/finalization/${proposal.id}`" class="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">Go to Finalization</NuxtLink>
      </div>
    </div>
    <CommonEmptyState v-else message="Proposal not found." />
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { user } = useAuth()
if (!user.value) navigateTo('/login')
const { getProposal } = useProposals()
const proposalId = route.params.id as string
const proposal = computed(() => getProposal(proposalId))
</script>
