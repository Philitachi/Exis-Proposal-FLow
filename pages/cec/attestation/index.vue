<template><LayoutAppLayout><LayoutPageHeader title="Personnel Attestation" subtitle="F-EXT-004 attestation requests" /><div v-for="p in proposals" :key="p.id" class="border border-gray-300 rounded p-3 mb-3 bg-white flex items-center justify-between"><div><div class="text-sm font-medium">{{ p.title }}</div><div class="text-xs text-gray-500">{{ p.proposalCode }}</div></div><NuxtLink :to="`/cec/attestation/${p.id}`" class="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">Review</NuxtLink></div></LayoutAppLayout></template>
<script setup lang="ts">
const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { proposals } = useProposals()
</script>
