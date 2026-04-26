<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="Dashboard" />
    <p class="text-sm text-gray-500">Redirecting based on role...</p>
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const { user, getRedirectRoute } = useAuth()
onMounted(() => {
  if (!user.value) { navigateTo('/login'); return }
  navigateTo(getRedirectRoute())
})
</script>
