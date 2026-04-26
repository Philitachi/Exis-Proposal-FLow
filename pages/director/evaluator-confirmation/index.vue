<template><LayoutAppLayout><LayoutPageHeader title="Evaluator Confirmation" /><div v-for="p in proposals" :key="p.id" class="border border-gray-300 rounded p-3 mb-3 bg-white flex items-center justify-between"><div><div class="text-sm font-medium">{{ p.title }}</div><div class="text-xs text-gray-500">{{ p.nominatedEvaluators?.length || 0 }} evaluator(s) nominated</div></div><NuxtLink :to="`/director/evaluator-confirmation/${p.id}`" class="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">Confirm</NuxtLink></div><CommonEmptyState v-if="!proposals.length" message="No confirmations pending." /></LayoutAppLayout></template>
<script setup lang="ts">
const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { getProposalsByStatus } = useProposals()
const proposals = computed(() => getProposalsByStatus('Pending Evaluator Confirmation'))
</script>
