<template><CommonWireframeCard title="RBAC Settings"><div class="text-xs text-gray-500" v-for="r in permissions.roles" :key="r.role"><div class="font-medium text-gray-700 mt-2">{{ r.role }}</div><div>{{ r.permissions.join(', ') }}</div></div></CommonWireframeCard></template>
<script setup lang="ts">
import { mockPermissions } from '~/data/mockPermissions'
const permissions = mockPermissions
</script>
