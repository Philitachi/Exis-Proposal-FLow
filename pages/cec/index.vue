<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="CEC Dashboard" subtitle="College Extension Coordinator Overview" />
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <CommonStatCard label="Attestation Requests" :value="attestationRequests.length" />
      <CommonStatCard label="Assigned Evaluations" :value="myEvals.length" />
      <CommonStatCard label="Coordination Notices" value="2" />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <CommonWireframeCard title="Personnel Attestation Requests">
        <div v-for="p in attestationRequests" :key="p.id" class="flex items-center justify-between py-2 border-b border-gray-200">
          <div class="text-sm">{{ p.title }}</div>
          <NuxtLink :to="`/cec/attestation/${p.id}`" class="text-xs border border-gray-300 px-2 py-0.5 rounded hover:bg-gray-100">Review</NuxtLink>
        </div>
        <CommonEmptyState v-if="!attestationRequests.length" message="No attestation requests." />
      </CommonWireframeCard>
      <CommonWireframeCard title="Assigned Evaluations">
        <div v-for="ev in myEvals" :key="ev.id" class="flex items-center justify-between py-2 border-b border-gray-200">
          <div class="text-sm">{{ ev.evaluatorName }} — {{ ev.proposalId }}</div>
          <NuxtLink :to="`/evaluations/${ev.proposalId}`" class="text-xs border border-gray-300 px-2 py-0.5 rounded hover:bg-gray-100">View</NuxtLink>
        </div>
        <CommonEmptyState v-if="!myEvals.length" message="No assigned evaluations." />
      </CommonWireframeCard>
    </div>
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const { user } = useAuth()
if (!user.value) navigateTo('/login')
const { proposals, evaluations } = useProposals()
const attestationRequests = computed(() => proposals.value.filter(p => p.forms?.fext004?.personnel?.length > 0 && !p.forms?.fext004?.attestedByCoordinator))
const myEvals = computed(() => evaluations.value.filter(e => e.evaluatorUserId === user.value?.id))
</script>
