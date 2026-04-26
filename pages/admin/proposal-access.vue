<template><LayoutAppLayout><LayoutPageHeader title="Proposal Access" subtitle="View and manage proposal record access" /><AdminProposalAccessTable /></LayoutAppLayout></template>
<script setup lang="ts">const { user } = useAuth(); if (!user.value) navigateTo('/login')</script>
