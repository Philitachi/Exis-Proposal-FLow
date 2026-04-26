<template>
  <nav class="flex items-center gap-1 text-sm text-gray-500">
    <NuxtLink to="/" class="hover:text-gray-800">Home</NuxtLink>
    <template v-for="(crumb, i) in crumbs" :key="i">
      <span>/</span>
      <NuxtLink v-if="crumb.to" :to="crumb.to" class="hover:text-gray-800">{{ crumb.label }}</NuxtLink>
      <span v-else class="text-gray-800">{{ crumb.label }}</span>
    </template>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const crumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments.map((seg, i) => ({
    label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '),
    to: i < segments.length - 1 ? '/' + segments.slice(0, i + 1).join('/') : null,
  }))
})
</script>
