<template>
  <CommonWireframeCard title="Mock User Directory">
    <CommonDataTable :columns="cols" :data="users" has-actions>
      <template #actions="{ row }">
        <button @click="toggleActive(row)" class="text-xs border border-gray-300 px-2 py-0.5 rounded hover:bg-gray-100">{{ row.active ? 'Deactivate' : 'Activate' }}</button>
      </template>
    </CommonDataTable>
  </CommonWireframeCard>
</template>

<script setup lang="ts">
const { users, saveUsers } = useMockStorage()
const cols = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'college', label: 'College' },
  { key: 'active', label: 'Active' },
]
function toggleActive(row: any) {
  row.active = !row.active
  saveUsers()
}
</script>
