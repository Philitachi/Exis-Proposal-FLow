<template>
  <CommonWireframeCard title="Evaluation Results Summary">
    <div v-if="!evaluations.length" class="text-sm text-gray-400">No evaluations available.</div>
    <div v-for="ev in evaluations" :key="ev.id" class="border-b border-gray-200 py-3 last:border-b-0">
      <div class="flex items-center justify-between">
        <div class="text-sm font-medium text-gray-800">{{ ev.evaluatorName }}</div>
        <CommonStatusBadge :status="ev.status" />
      </div>
      <div v-if="ev.status === 'Completed'" class="mt-1 text-xs text-gray-600">
        Score: {{ ev.totalScore }} · Rating: {{ ev.adjectivalRating }} · Recommendation: {{ ev.recommendation }}
      </div>
      <div v-if="ev.overallRemarks" class="mt-1 text-xs text-gray-500 italic">{{ ev.overallRemarks }}</div>
    </div>
  </CommonWireframeCard>
</template>

<script setup lang="ts">
defineProps<{ evaluations: any[] }>()
</script>
