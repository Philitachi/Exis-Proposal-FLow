<template>
  <LayoutAppLayout>
    <div v-if="proposal">
      <ProposalSummaryHeader :proposal="proposal" />
      <div class="flex gap-2 mb-4">
        <NuxtLink :to="`/evaluations/${proposalId}/form`" class="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700" v-if="myEval && myEval.status !== 'Completed'">Fill Evaluation Form</NuxtLink>
        <span v-else-if="myEval" class="text-sm text-gray-500">Evaluation already submitted.</span>
      </div>
      <ProposalFormWizard :form-data="proposal.forms" :readonly="true" />
    </div>
    <CommonEmptyState v-else message="Proposal not found." />
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { user } = useAuth()
if (!user.value) navigateTo('/login')
const { getProposal, evaluations } = useProposals()
const proposalId = route.params.proposalId as string
const proposal = computed(() => getProposal(proposalId))
const myEval = computed(() => evaluations.value.find(e => e.proposalId === proposalId && e.evaluatorUserId === user.value?.id))
</script>
