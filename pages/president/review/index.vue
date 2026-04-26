<template><LayoutAppLayout><LayoutPageHeader title="President Review Queue" /><div v-for="p in proposals" :key="p.id" class="border border-gray-300 rounded p-3 mb-3 bg-white flex items-center justify-between"><div><div class="text-sm font-medium">{{ p.title }}</div><CommonStatusBadge :status="p.status" /></div><NuxtLink :to="`/president/review/${p.id}`" class="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">Review</NuxtLink></div><CommonEmptyState v-if="!proposals.length" message="No proposals." /></LayoutAppLayout></template>
<script setup lang="ts">
const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { getProposalsByStatus } = useProposals()
const proposals = computed(() => getProposalsByStatus('For President Review'))
</script>
