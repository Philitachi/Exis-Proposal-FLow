<template><LayoutAppLayout><LayoutPageHeader title="Document Control Settings" subtitle="Configure document control parameters" /><AdminDocumentControlSettings /></LayoutAppLayout></template>
<script setup lang="ts">const { user } = useAuth(); if (!user.value) navigateTo('/login')</script>
