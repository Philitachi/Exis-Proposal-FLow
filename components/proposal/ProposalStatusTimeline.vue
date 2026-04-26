<template>
  <CommonWireframeCard title="Status History">
    <CommonTimeline :items="history" />
  </CommonWireframeCard>
</template>

<script setup lang="ts">
defineProps<{ history: Array<{ status: string; date: string; actor: string; remarks?: string }> }>()
</script>
