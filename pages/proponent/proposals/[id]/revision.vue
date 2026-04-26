<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="Revise Proposal" :subtitle="proposal?.title" />
    <div v-if="proposal">
      <div class="mb-4 p-3 border border-gray-300 rounded bg-gray-50 text-sm text-gray-600">
        Return Stage: <strong>{{ proposal.return_to_stage }}</strong>
      </div>
      <ProposalFormWizard :form-data="proposal.forms" @save="handleSave" />
      <div class="mt-6">
        <ProposalRevisionMatrix
          :model-value="proposal.revisionMatrix || []"
          @save="handleSaveMatrix"
          @resubmit="handleResubmit"
        />
      </div>
    </div>
    <CommonEmptyState v-else message="Proposal not found." />
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { user } = useAuth()
if (!user.value) navigateTo('/login')

const { getProposal, updateProposal, resubmit } = useProposals()
const proposalId = route.params.id as string
const proposal = computed(() => getProposal(proposalId))

function handleSave() {
  if (!proposal.value) return
  updateProposal(proposalId, { forms: proposal.value.forms })
  alert('Changes saved!')
}

function handleSaveMatrix(matrix: any[]) {
  updateProposal(proposalId, { revisionMatrix: matrix })
  alert('Revision matrix saved!')
}

function handleResubmit(matrix: any[]) {
  updateProposal(proposalId, { revisionMatrix: matrix })
  resubmit(proposalId)
  alert('Proposal resubmitted!')
  navigateTo(`/proponent/proposals/${proposalId}`)
}
</script>
