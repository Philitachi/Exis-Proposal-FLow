<template><LayoutAppLayout><LayoutPageHeader title="Evaluator Access" subtitle="Manage evaluator access to proposals" /><CommonWireframeCard title="Evaluator Assignments"><CommonDataTable :columns="[{key:'evaluatorName',label:'Evaluator'},{key:'proposalId',label:'Proposal'},{key:'status',label:'Status'}]" :data="evaluations" /></CommonWireframeCard></LayoutAppLayout></template>
<script setup lang="ts">
const { user } = useAuth(); if (!user.value) navigateTo('/login')
const { evaluations } = useMockStorage()
</script>
