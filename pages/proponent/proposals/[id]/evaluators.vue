<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="Nominate Evaluators" :subtitle="proposal?.title" />
    <div v-if="proposal">
      <ProposalEvaluatorNominationForm
        :proposal-id="proposalId"
        :proponent-id="proposal.proponentId"
        :existing-nominations="proposal.nominatedEvaluators"
        @submit="handleSubmit"
      />
    </div>
    <CommonEmptyState v-else message="Proposal not found." />
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { user } = useAuth()
if (!user.value) navigateTo('/login')

const { getProposal, updateProposal, nominateEvaluators } = useProposals()
const proposalId = route.params.id as string
const proposal = computed(() => getProposal(proposalId))

function handleSubmit(evaluators: any[]) {
  updateProposal(proposalId, { nominatedEvaluators: evaluators, confirmedEvaluators: evaluators })
  nominateEvaluators(proposalId)
  alert('Evaluator nominations submitted!')
  navigateTo(`/proponent/proposals/${proposalId}`)
}
</script>
