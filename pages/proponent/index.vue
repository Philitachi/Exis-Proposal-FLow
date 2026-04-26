<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="Proponent Dashboard" subtitle="Overview of your proposals">
      <template #actions>
        <NuxtLink to="/proponent/proposals/new" class="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">+ Create New Proposal</NuxtLink>
      </template>
    </LayoutPageHeader>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <CommonStatCard label="Draft" :value="byStatus('Draft').length" />
      <CommonStatCard label="Submitted" :value="byStatus('Submitted', 'Pending Evaluator Confirmation').length" />
      <CommonStatCard label="Under Evaluation" :value="byStatus('Under Evaluation').length" />
      <CommonStatCard label="Eval Completed" :value="byStatus('Evaluation Completed').length" />
      <CommonStatCard label="For Revision" :value="byStatus('For Revision').length" />
      <CommonStatCard label="In Review" :value="byStatus('Submitted to Extension Director', 'Under Initial Review', 'Under VPRIE Review', 'For President Review').length" />
      <CommonStatCard label="Approved" :value="byStatus('Approved').length" />
      <CommonStatCard label="Archived" :value="byStatus('Archived').length" />
    </div>

    <CommonWireframeCard title="Recent Proposals">
      <div class="space-y-2">
        <div v-for="p in myProposals" :key="p.id" class="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
          <div>
            <NuxtLink :to="`/proponent/proposals/${p.id}`" class="text-sm font-medium text-gray-800 hover:underline">{{ p.title }}</NuxtLink>
            <div class="text-xs text-gray-500">{{ p.proposalCode }} · {{ formatDate(p.updatedAt) }}</div>
          </div>
          <CommonStatusBadge :status="p.status" />
        </div>
        <CommonEmptyState v-if="!myProposals.length" message="No proposals yet. Create your first proposal!" />
      </div>
    </CommonWireframeCard>
  </LayoutAppLayout>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatters'

const { user } = useAuth()
if (!user.value) navigateTo('/login')

const { getProposalsByProponent } = useProposals()
const myProposals = computed(() => getProposalsByProponent(user.value?.id || ''))

function byStatus(...statuses: string[]) {
  return myProposals.value.filter(p => statuses.includes(p.status))
}
</script>
