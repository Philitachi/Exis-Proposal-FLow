<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="Attest F-EXT-004" :subtitle="proposal?.title" />
    <div v-if="proposal">
      <ProposalFext004PersonnelForm :model-value="proposal.forms.fext004" :readonly="true" />
      <div class="flex gap-2 mt-4">
        <button @click="attest" class="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">Attest</button>
        <button @click="returnToProponent" class="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100">Return to Proponent</button>
      </div>
    </div>
    <CommonEmptyState v-else message="Proposal not found." />
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { getProposal, updateProposal } = useProposals()
const proposalId = route.params.proposalId as string
const proposal = computed(() => getProposal(proposalId))

function attest() {
  if (!proposal.value) return
  proposal.value.forms.fext004.attestedByCoordinator = true
  proposal.value.forms.fext004.dateAttested = new Date().toISOString().split('T')[0]
  updateProposal(proposalId, { forms: proposal.value.forms })
  alert('F-EXT-004 attested!')
  navigateTo('/cec/attestation')
}
function returnToProponent() {
  alert('Returned to proponent for correction.')
  navigateTo('/cec/attestation')
}
</script>
