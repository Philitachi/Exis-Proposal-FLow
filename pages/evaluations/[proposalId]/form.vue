<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="F-EXT-003 Evaluation Form" :subtitle="proposal?.title" />
    <div v-if="proposal && myEval">
      <EvaluationFormFext003
        :proponent-name="proposal.proponentName"
        :project-title="proposal.title"
        @submit="handleSubmit"
      />
    </div>
    <CommonEmptyState v-else message="Evaluation not found or already completed." />
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { user } = useAuth()
if (!user.value) navigateTo('/login')
const { getProposal, submitEvaluation, evaluations } = useProposals()
const proposalId = route.params.proposalId as string
const proposal = computed(() => getProposal(proposalId))
const myEval = computed(() => evaluations.value.find(e => e.proposalId === proposalId && e.evaluatorUserId === user.value?.id && e.status !== 'Completed'))

function handleSubmit(data: any) {
  if (!myEval.value) return
  submitEvaluation(myEval.value.id, data)
  alert('Evaluation submitted!')
  navigateTo('/evaluations')
}
</script>
