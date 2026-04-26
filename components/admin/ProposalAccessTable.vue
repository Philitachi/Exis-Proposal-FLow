<template><CommonWireframeCard title="Proposal Access"><CommonDataTable :columns="[{key:'proposalCode',label:'Code'},{key:'title',label:'Title'},{key:'status',label:'Status'},{key:'proponentName',label:'Proponent'}]" :data="proposals" /></CommonWireframeCard></template>
<script setup lang="ts">
const { proposals } = useMockStorage()
</script>
