<template>
  <CommonWireframeCard title="Audit Logs">
    <CommonDataTable :columns="[{key:'timestamp',label:'Time'},{key:'action',label:'Action'},{key:'userName',label:'User'},{key:'details',label:'Details'}]" :data="logs" />
  </CommonWireframeCard>
</template>

<script setup lang="ts">
const { logs } = useMockStorage()
</script>
