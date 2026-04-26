<template><LayoutAppLayout><LayoutPageHeader title="CEC Evaluations" /><EvaluationAssignedEvaluationList :evaluations="myEvals" /></LayoutAppLayout></template>
<script setup lang="ts">
const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { evaluations } = useProposals()
const myEvals = computed(() => evaluations.value.filter(e => e.evaluatorUserId === user.value?.id))
</script>
