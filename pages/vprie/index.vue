<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="VPRIE Dashboard" subtitle="Vice President for Research, Innovation, and Extension" />
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <CommonStatCard label="For Review" :value="forReview.length" />
      <CommonStatCard label="Resubmitted" :value="resubmitted.length" />
      <CommonStatCard label="Endorsed" :value="endorsed.length" />
    </div>
    <CommonWireframeCard title="Proposals for VPRIE Review">
      <div v-for="p in forReview" :key="p.id" class="flex items-center justify-between py-2 border-b border-gray-200">
        <div><div class="text-sm">{{ p.title }}</div><CommonStatusBadge :status="p.status" /></div>
        <NuxtLink :to="`/vprie/review/${p.id}`" class="text-xs border border-gray-300 px-2 py-0.5 rounded hover:bg-gray-100">Review</NuxtLink>
      </div>
      <CommonEmptyState v-if="!forReview.length" message="No proposals to review." />
    </CommonWireframeCard>
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { getProposalsByStatus } = useProposals()
const forReview = computed(() => getProposalsByStatus('Under VPRIE Review'))
const resubmitted = computed(() => getProposalsByStatus('Resubmitted'))
const endorsed = computed(() => getProposalsByStatus('For President Review'))
</script>
