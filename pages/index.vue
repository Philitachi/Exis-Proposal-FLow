<template>
  <div></div>
</template>

<script setup lang="ts">
// Root page redirects to login or dashboard based on auth state
const { user } = useAuth()
onMounted(() => {
  if (user.value) {
    navigateTo('/dashboard')
  } else {
    navigateTo('/login')
  }
})
</script>
