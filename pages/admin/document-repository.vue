<template><LayoutAppLayout><LayoutPageHeader title="Document Repository" subtitle="Mock document storage" /><CommonWireframeCard title="Stored Documents"><div v-for="p in proposals.filter(p => p.finalPdf)" :key="p.id" class="py-2 border-b border-gray-200 text-sm"><span class="font-medium">{{ p.proposalCode }}</span> — {{ p.finalPdf?.filename || 'N/A' }}</div><CommonEmptyState v-if="!proposals.filter(p => p.finalPdf).length" message="No documents stored." /></CommonWireframeCard></LayoutAppLayout></template>
<script setup lang="ts">
const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { proposals } = useMockStorage()
</script>
