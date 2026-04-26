<template>
  <CommonDecisionPanel :options="options" @decide="handleDecision" />
</template>

<script setup lang="ts">
const emit = defineEmits(['decide'])
const options = [
  { label: 'Approve', value: 'approve', class: 'border-gray-800 bg-gray-800 text-white hover:bg-gray-700' },
  { label: 'Return for Revision', value: 'revise', class: 'border-gray-400 hover:bg-gray-100' },
  { label: 'Disapprove', value: 'disapprove', class: 'border-gray-400 hover:bg-gray-100' },
]
function handleDecision(decision: string, remarks: string) { emit('decide', decision, remarks) }
</script>
