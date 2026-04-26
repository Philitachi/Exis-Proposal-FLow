<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="System Administrator Dashboard" subtitle="ExSIS Administration" />
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <CommonStatCard label="Users" :value="users.length" />
      <CommonStatCard label="Active Users" :value="users.filter(u => u.active).length" />
      <CommonStatCard label="Proposals" :value="proposals.length" />
      <CommonStatCard label="Audit Logs" :value="logs.length" />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <CommonWireframeCard title="Quick Links">
        <div class="space-y-1">
          <NuxtLink to="/admin/users" class="flex items-center gap-2 text-sm text-gray-700 hover:underline py-1"><Users class="w-4 h-4 text-gray-500" /> User Management</NuxtLink>
          <NuxtLink to="/admin/rbac" class="flex items-center gap-2 text-sm text-gray-700 hover:underline py-1"><Shield class="w-4 h-4 text-gray-500" /> RBAC Settings</NuxtLink>
          <NuxtLink to="/admin/evaluator-access" class="flex items-center gap-2 text-sm text-gray-700 hover:underline py-1"><ClipboardEdit class="w-4 h-4 text-gray-500" /> Evaluator Access</NuxtLink>
          <NuxtLink to="/admin/proposal-access" class="flex items-center gap-2 text-sm text-gray-700 hover:underline py-1"><FileText class="w-4 h-4 text-gray-500" /> Proposal Access</NuxtLink>
          <NuxtLink to="/admin/document-repository" class="flex items-center gap-2 text-sm text-gray-700 hover:underline py-1"><Folder class="w-4 h-4 text-gray-500" /> Document Repository</NuxtLink>
          <NuxtLink to="/admin/document-control" class="flex items-center gap-2 text-sm text-gray-700 hover:underline py-1"><Settings class="w-4 h-4 text-gray-500" /> Document Control</NuxtLink>
          <NuxtLink to="/admin/logs" class="flex items-center gap-2 text-sm text-gray-700 hover:underline py-1"><ScrollText class="w-4 h-4 text-gray-500" /> Audit Logs</NuxtLink>
        </div>
      </CommonWireframeCard>
      <CommonWireframeCard title="Recent Activity">
        <div v-for="log in logs.slice(-5).reverse()" :key="log.id" class="text-xs text-gray-600 py-1 border-b border-gray-100">
          {{ log.action }} — {{ log.userName }} — {{ log.details }}
        </div>
      </CommonWireframeCard>
    </div>
    <div class="mt-4">
      <button @click="handleReset" class="border border-gray-400 px-3 py-1.5 rounded text-sm text-gray-600 hover:bg-gray-100">Reset All Mock Data</button>
    </div>
  </LayoutAppLayout>
</template>

<script setup lang="ts">
import { Users, Shield, ClipboardEdit, FileText, Folder, Settings, ScrollText } from 'lucide-vue-next'
const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { proposals, logs, users, resetAll } = useMockStorage()

function handleReset() {
  if (confirm('Reset all mock data to defaults?')) {
    resetAll()
    alert('Mock data reset!')
  }
}
</script>
