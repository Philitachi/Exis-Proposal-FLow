<template>
  <div class="bg-white border border-gray-300 rounded p-4 mb-4">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h2 class="text-lg font-bold text-gray-900">{{ proposal.title }}</h2>
        <div class="text-xs text-gray-500 mt-1">{{ proposal.proposalCode }} · {{ proposal.typeOfScholarlyWork || 'Extension' }}</div>
        <div class="text-sm text-gray-600 mt-1">Proponent: {{ proposal.proponentName }}</div>
      </div>
      <div class="text-right">
        <CommonStatusBadge :status="proposal.status" />
        <div class="text-xs text-gray-500 mt-1">Stage: {{ proposal.currentStage }}</div>
        <div v-if="proposal.return_to_stage" class="text-xs text-gray-400 mt-0.5">Return to: {{ proposal.return_to_stage }}</div>
      </div>
    </div>
    <div v-if="nextAction" class="mt-3 text-xs bg-gray-100 border border-gray-200 rounded px-3 py-1.5">
      <span class="font-medium">Next Action:</span> {{ nextAction }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ proposal: any }>()
const { user } = useAuth()
const { getNextAction } = useStatusTransition()
const nextAction = computed(() => getNextAction(props.proposal.status, user.value?.role || ''))
</script>
