<template><LayoutAppLayout><LayoutPageHeader title="User Management" subtitle="Mock university user directory" /><AdminMockUserDirectory /></LayoutAppLayout></template>
<script setup lang="ts">const { user } = useAuth(); if (!user.value) navigateTo('/login')</script>
