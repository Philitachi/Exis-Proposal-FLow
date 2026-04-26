<template>
  <LayoutAppLayout>
    <LayoutPageHeader title="Notifications" subtitle="All your notifications" />
    <div class="space-y-1">
      <CommonNotificationItem v-for="n in userNotifications" :key="n.id" :item="n" @click="markRead(n.id)" />
      <CommonEmptyState v-if="!userNotifications.length" message="No notifications." icon="Bell" />
    </div>
  </LayoutAppLayout>
</template>

<script setup lang="ts">
const { user } = useAuth()
if (!user.value) navigateTo('/login')

const { userNotifications, markRead } = useNotifications()
</script>
