<template>
  <CommonWireframeCard title="Document Control Settings">
    <div class="space-y-2 text-sm">
      <div><label class="text-xs text-gray-500">Prefix</label><input v-model="settings.prefix" class="w-full border border-gray-300 rounded px-2 py-1 text-sm" /></div>
      <div><label class="text-xs text-gray-500">Current Sequence</label><input v-model.number="settings.currentSequence" type="number" class="w-full border border-gray-300 rounded px-2 py-1 text-sm" /></div>
      <div class="flex items-center gap-2"><input type="checkbox" v-model="settings.enableQrCode" /><span class="text-xs text-gray-600">Enable QR Code</span></div>
      <div class="flex items-center gap-2"><input type="checkbox" v-model="settings.enableVerificationCode" /><span class="text-xs text-gray-600">Enable Verification Code</span></div>
      <button class="border border-gray-300 px-3 py-1 rounded text-xs hover:bg-gray-100">Save Settings</button>
    </div>
  </CommonWireframeCard>
</template>

<script setup lang="ts">
import { mockDocumentControl } from '~/data/mockDocumentControl'
const settings = reactive({ ...mockDocumentControl })
</script>
