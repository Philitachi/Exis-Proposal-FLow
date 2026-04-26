<template>
  <span class="inline-block px-2 py-0.5 text-xs font-medium rounded border" :class="colorClass">{{ status }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{ status: string }>()
const { getStatusColor } = useStatusTransition()
const colorClass = computed(() => getStatusColor(props.status))
</script>
