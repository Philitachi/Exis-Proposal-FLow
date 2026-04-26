<template><LayoutAppLayout><LayoutPageHeader title="RBAC Settings" subtitle="Role-Based Access Control configuration" /><AdminRbacSettings /></LayoutAppLayout></template>
<script setup lang="ts">const { user } = useAuth(); if (!user.value) navigateTo('/login')</script>
