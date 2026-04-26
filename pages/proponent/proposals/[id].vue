<template>
  <LayoutAppLayout>
    <div v-if="!proposal">
      <CommonEmptyState message="Proposal not found." />
    </div>
    <div v-else>
      <ProposalSummaryHeader :proposal="proposal" />

      <!-- Action buttons based on status -->
      <div class="flex gap-2 mb-4 flex-wrap">
        <NuxtLink v-if="proposal.status === 'Draft'" :to="`/proponent/proposals/${proposal.id}/edit`" class="border border-gray-300 px-3 py-1.5 rounded text-sm hover:bg-gray-100">Edit Draft</NuxtLink>
        <NuxtLink v-if="proposal.status === 'Submitted' || proposal.status === 'Draft'" :to="`/proponent/proposals/${proposal.id}/evaluators`" class="border border-gray-300 px-3 py-1.5 rounded text-sm hover:bg-gray-100">Nominate Evaluators</NuxtLink>
        <button v-if="proposal.status === 'Evaluation Completed'" @click="handleSubmitToDirector" class="bg-gray-800 text-white px-3 py-1.5 rounded text-sm hover:bg-gray-700">Submit to Director</button>
        <NuxtLink v-if="proposal.status === 'For Revision'" :to="`/proponent/proposals/${proposal.id}/revision`" class="border border-gray-300 px-3 py-1.5 rounded text-sm hover:bg-gray-100">Revise Proposal</NuxtLink>
        <NuxtLink v-if="proposal.status === 'Approved'" :to="`/proponent/proposals/${proposal.id}/final`" class="border border-gray-300 px-3 py-1.5 rounded text-sm hover:bg-gray-100">View Final PDF</NuxtLink>
        <NuxtLink v-if="proposal.status === 'Archived'" :to="`/proponent/proposals/${proposal.id}/final`" class="border border-gray-300 px-3 py-1.5 rounded text-sm hover:bg-gray-100">View Archived</NuxtLink>
      </div>

      <!-- Read-only form view -->
      <ProposalFormWizard :form-data="proposal.forms" :readonly="true" />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <!-- Evaluators -->
        <CommonWireframeCard title="Evaluators">
          <div v-if="proposal.confirmedEvaluators?.length">
            <div v-for="ev in proposal.confirmedEvaluators" :key="ev.userId" class="text-sm text-gray-700 py-1 border-b border-gray-100">{{ ev.name }}</div>
          </div>
          <div v-else-if="proposal.nominatedEvaluators?.length">
            <div class="text-xs text-gray-400 mb-1">Nominated (pending confirmation):</div>
            <div v-for="ev in proposal.nominatedEvaluators" :key="ev.userId" class="text-sm text-gray-700 py-1 border-b border-gray-100">{{ ev.name }} ({{ ev.type }})</div>
          </div>
          <div v-else class="text-xs text-gray-400">No evaluators assigned yet.</div>
        </CommonWireframeCard>

        <!-- Evaluation Results -->
        <EvaluationResultSummary :evaluations="relatedEvals" />
      </div>

      <!-- Comments, Revision Matrix, Timeline -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <CommonCommentPanel :comments="relatedComments" :allow-add="true" @add="handleAddComment" />
        <ReviewRevisionMatrixViewer :matrix="proposal.revisionMatrix || []" />
      </div>

      <div class="mt-4">
        <ProposalStatusTimeline :history="proposal.statusHistory" />
      </div>
    </div>
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const { user } = useAuth()
if (!user.value) navigateTo('/login')

const { getProposal, submitToDirector, evaluations } = useProposals()
const { comments, addComment } = useMockStorage()

const proposalId = route.params.id as string
const proposal = computed(() => getProposal(proposalId))
const relatedEvals = computed(() => evaluations.value.filter(e => e.proposalId === proposalId))
const relatedComments = computed(() => comments.value.filter((c: any) => c.proposalId === proposalId))

function handleSubmitToDirector() {
  submitToDirector(proposalId)
}

function handleAddComment(content: string) {
  addComment(proposalId, user.value?.id || '', user.value?.name || '', user.value?.role || '', content)
}
</script>
