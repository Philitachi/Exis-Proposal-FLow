<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="Proposal Finalization" :subtitle="proposal?.title" />
    <div v-if="proposal">
      <ProposalSummaryHeader :proposal="proposal" />
      <CommonWireframeCard title="Finalization Checklist" class="mb-4">
        <div class="space-y-1 text-sm">
          <div class="flex items-center gap-1"><CheckSquare class="w-4 h-4 text-green-600" /> All forms completed</div>
          <div class="flex items-center gap-1"><CheckSquare class="w-4 h-4 text-green-600" /> Evaluations completed</div>
          <div class="flex items-center gap-1"><CheckSquare class="w-4 h-4 text-green-600" /> Director endorsed</div>
          <div class="flex items-center gap-1"><CheckSquare class="w-4 h-4 text-green-600" /> VPRIE endorsed</div>
          <div class="flex items-center gap-1"><CheckSquare class="w-4 h-4 text-green-600" /> President approved</div>
          <div class="flex items-center gap-1">
            <component :is="proposal.documentControl ? icons.CheckSquare : icons.Square" class="w-4 h-4" :class="proposal.documentControl ? 'text-green-600' : 'text-gray-400'" />
            Final PDF generated
          </div>
        </div>
      </CommonWireframeCard>

      <div v-if="!proposal.documentControl">
        <button @click="handleFinalize" class="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">Generate Final PDF & Archive</button>
      </div>
      <div v-else>
        <ProposalFinalPdfPreview :doc="proposal.documentControl" />
        <div class="mt-4 text-sm text-gray-500 flex items-center gap-1"><CheckSquare class="w-4 h-4 text-green-600" /> This proposal has been finalized and archived.</div>
      </div>
    </div>
    <CommonEmptyState v-else message="Proposal not found." />
  </LayoutAppLayout>
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'
import { CheckSquare, Square } from 'lucide-vue-next'

const route = useRoute()
const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { getProposal, finalizeProposal } = useProposals()
const proposalId = route.params.proposalId as string
const proposal = computed(() => getProposal(proposalId))

function handleFinalize() {
  finalizeProposal(proposalId)
  alert('Proposal finalized and archived!')
}
</script>
