<template>
  <div class="space-y-4">
    <ProposalSummaryHeader :proposal="proposal" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <CommonWireframeCard title="F-EXT-001 Summary">
        <div class="text-xs text-gray-500 space-y-1">
          <CommonReadOnlyField label="Type" :value="proposal.forms?.fext001?.typeOfScholarlyWork" />
          <CommonReadOnlyField label="Budget" :value="'PHP ' + (proposal.forms?.fext001?.totalBudget || 0).toLocaleString()" />
          <CommonReadOnlyField label="Project Leader" :value="proposal.forms?.fext001?.projectLeader" />
        </div>
      </CommonWireframeCard>
      <CommonWireframeCard title="F-EXT-002 Summary">
        <div class="text-xs text-gray-500 space-y-1">
          <CommonReadOnlyField label="Title" :value="proposal.forms?.fext002?.projectTitle" />
          <CommonReadOnlyField label="Beneficiaries" :value="proposal.forms?.fext002?.targetBeneficiaries" />
          <CommonReadOnlyField label="Duration" :value="proposal.forms?.fext002?.projectDuration" />
        </div>
      </CommonWireframeCard>
    </div>
    <EvaluationResultSummary :evaluations="relatedEvals" />
    <ProposalStatusTimeline :history="proposal.statusHistory" />
    <CommonCommentPanel :comments="relatedComments" :allow-add="false" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ proposal: any }>()
const { evaluations } = useProposals()
const { comments } = useMockStorage()

const relatedEvals = computed(() => evaluations.value.filter(e => e.proposalId === props.proposal.id))
const relatedComments = computed(() => comments.value.filter((c: any) => c.proposalId === props.proposal.id))
</script>
