<template><LayoutAppLayout><LayoutPageHeader title="Audit Logs" subtitle="System activity log" /><AdminAuditLogTable /></LayoutAppLayout></template>
<script setup lang="ts">const { user } = useAuth(); if (!user.value) navigateTo('/login')</script>
