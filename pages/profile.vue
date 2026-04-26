<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="Profile" subtitle="Your account information" />
    <CommonWireframeCard title="User Information">
      <div class="space-y-2" v-if="user">
        <CommonReadOnlyField label="Name" :value="user.name" />
        <CommonReadOnlyField label="Email" :value="user.email" />
        <CommonReadOnlyField label="Role" :value="user.role" />
        <CommonReadOnlyField label="University ID" :value="user.universityId" />
        <CommonReadOnlyField label="College" :value="user.college" />
        <CommonReadOnlyField label="Department" :value="user.department" />
      </div>
    </CommonWireframeCard>
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const { user } = useAuth()
if (!user.value) navigateTo('/login')
</script>
