<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="Archive" subtitle="Approved and archived proposals" />
    <div v-for="p in archived" :key="p.id" class="border border-gray-300 rounded p-3 mb-3 bg-white flex items-center justify-between">
      <div><div class="text-sm font-medium">{{ p.title }}</div><div class="text-xs text-gray-500">{{ p.proposalCode }} · {{ p.documentControl?.documentControlNumber || '—' }}</div></div>
      <NuxtLink :to="`/archive/${p.id}`" class="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">View</NuxtLink>
    </div>
    <CommonEmptyState v-if="!archived.length" message="No archived proposals." />
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { getProposalsByStatus } = useProposals()
const archived = computed(() => getProposalsByStatus('Archived'))
</script>
