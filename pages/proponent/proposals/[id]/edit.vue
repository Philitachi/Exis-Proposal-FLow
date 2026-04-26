<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="Edit Proposal" :subtitle="proposal?.title" />
    <div v-if="proposal">
      <ProposalFormWizard :form-data="proposal.forms" @save="handleSave" @submit="handleSubmit" />
    </div>
    <CommonEmptyState v-else message="Proposal not found." />
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { user } = useAuth()
if (!user.value) navigateTo('/login')

const { getProposal, updateProposal, submitProposal } = useProposals()
const proposalId = route.params.id as string
const proposal = computed(() => getProposal(proposalId))

function handleSave() {
  if (!proposal.value) return
  updateProposal(proposalId, { forms: proposal.value.forms })
  alert('Draft saved!')
}

function handleSubmit() {
  if (!proposal.value) return
  updateProposal(proposalId, { forms: proposal.value.forms })
  submitProposal(proposalId)
  alert('Proposal submitted!')
  navigateTo(`/proponent/proposals/${proposalId}`)
}
</script>
