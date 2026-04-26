<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="Extension Director Dashboard" subtitle="Overview of proposals for review" />
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <CommonStatCard label="Evaluator Confirmations" :value="pendingConfirmation.length" />
      <CommonStatCard label="Submitted for Review" :value="submittedForReview.length" />
      <CommonStatCard label="Resubmitted" :value="resubmitted.length" />
      <CommonStatCard label="Under Review" :value="underReview.length" />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <CommonWireframeCard title="Evaluator Confirmation Requests">
        <div v-for="p in pendingConfirmation" :key="p.id" class="flex items-center justify-between py-2 border-b border-gray-200">
          <div><div class="text-sm">{{ p.title }}</div><div class="text-xs text-gray-500">{{ p.proposalCode }}</div></div>
          <NuxtLink :to="`/director/evaluator-confirmation/${p.id}`" class="text-xs border border-gray-300 px-2 py-0.5 rounded hover:bg-gray-100">Review</NuxtLink>
        </div>
        <CommonEmptyState v-if="!pendingConfirmation.length" message="No pending confirmations." />
      </CommonWireframeCard>
      <CommonWireframeCard title="Proposals for Review">
        <div v-for="p in [...submittedForReview, ...underReview]" :key="p.id" class="flex items-center justify-between py-2 border-b border-gray-200">
          <div><div class="text-sm">{{ p.title }}</div><CommonStatusBadge :status="p.status" /></div>
          <NuxtLink :to="`/director/review/${p.id}`" class="text-xs border border-gray-300 px-2 py-0.5 rounded hover:bg-gray-100">Review</NuxtLink>
        </div>
        <CommonEmptyState v-if="!submittedForReview.length && !underReview.length" message="No proposals to review." />
      </CommonWireframeCard>
    </div>
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { getProposalsByStatus } = useProposals()
const pendingConfirmation = computed(() => getProposalsByStatus('Pending Evaluator Confirmation'))
const submittedForReview = computed(() => getProposalsByStatus('Submitted to Extension Director'))
const underReview = computed(() => getProposalsByStatus('Under Initial Review'))
const resubmitted = computed(() => getProposalsByStatus('Resubmitted').filter(p => p.return_to_stage === null))
</script>
