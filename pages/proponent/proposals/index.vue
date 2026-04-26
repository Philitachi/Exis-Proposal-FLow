<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="My Proposals">
      <template #actions>
        <NuxtLink to="/proponent/proposals/new" class="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">+ New Proposal</NuxtLink>
      </template>
    </LayoutPageHeader>
    <CommonDataTable :columns="cols" :data="myProposals" has-actions>
      <template #status="{ value }"><CommonStatusBadge :status="value" /></template>
      <template #actions="{ row }">
        <NuxtLink :to="`/proponent/proposals/${row.id}`" class="text-xs border border-gray-300 px-2 py-0.5 rounded hover:bg-gray-100">View</NuxtLink>
      </template>
    </CommonDataTable>
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const { user } = useAuth()
if (!user.value) navigateTo('/login')
const { getProposalsByProponent } = useProposals()
const myProposals = computed(() => getProposalsByProponent(user.value?.id || ''))
const cols = [
  { key: 'proposalCode', label: 'Code' },
  { key: 'title', label: 'Title' },
  { key: 'status', label: 'Status' },
  { key: 'updatedAt', label: 'Updated' },
]
</script>
