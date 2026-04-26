<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="Create New Proposal" subtitle="Start a new extension proposal" />
    <div class="max-w-2xl">
      <div class="mb-4">
        <label class="block text-xs text-gray-500 mb-1">Proposal Title</label>
        <input v-model="title" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="Enter proposal title..." />
      </div>
      <button @click="handleCreate" class="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">Create Draft</button>
    </div>
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const { user } = useAuth()
if (!user.value) navigateTo('/login')

const { createProposal } = useProposals()
const title = ref('')

function handleCreate() {
  if (!title.value.trim()) return
  const p = createProposal(title.value.trim())
  navigateTo(`/proponent/proposals/${p.id}/edit`)
}
</script>
