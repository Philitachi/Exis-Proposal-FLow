<template>
  <div>
    <CommonFormSection title="F-EXT-002: Project Proposal Form">
      <div><label class="block text-xs text-gray-500 mb-1">Project Title</label><input v-model="form.projectTitle" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" /></div>
      <div><label class="block text-xs text-gray-500 mb-1">Proposal Type</label><input v-model="form.proposalType" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" placeholder="e.g. Extension Program" /></div>
      <div><label class="block text-xs text-gray-500 mb-1">Project Rationale / Nature and Significance</label><textarea v-model="form.rationale" :readonly="readonly" rows="4" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"></textarea></div>
      <div><label class="block text-xs text-gray-500 mb-1">Objectives</label><textarea v-model="form.objectives" :readonly="readonly" rows="3" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"></textarea></div>
      <div><label class="block text-xs text-gray-500 mb-1">Target Beneficiaries</label><input v-model="form.targetBeneficiaries" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" /></div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="block text-xs text-gray-500 mb-1">Implementation Address</label><input v-model="form.implementationAddress" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" /></div>
        <div><label class="block text-xs text-gray-500 mb-1">Implementation Date</label><input v-model="form.implementationDate" type="date" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" /></div>
        <div><label class="block text-xs text-gray-500 mb-1">Project Duration</label><input v-model="form.projectDuration" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" /></div>
        <div><label class="block text-xs text-gray-500 mb-1">Completion Date</label><input v-model="form.completionDate" type="date" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" /></div>
      </div>
      <div><label class="block text-xs text-gray-500 mb-1">Methodology / Implementation Details</label><textarea v-model="form.methodology" :readonly="readonly" rows="3" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"></textarea></div>
      <div><label class="block text-xs text-gray-500 mb-1">Expected Outputs</label><textarea v-model="form.expectedOutputs" :readonly="readonly" rows="2" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"></textarea></div>
      <div><label class="block text-xs text-gray-500 mb-1">Sustainability Plan</label><textarea v-model="form.sustainabilityPlan" :readonly="readonly" rows="2" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"></textarea></div>
      <div><label class="block text-xs text-gray-500 mb-1">Monitoring Plan</label><textarea v-model="form.monitoringPlan" :readonly="readonly" rows="2" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"></textarea></div>
      <div><label class="block text-xs text-gray-500 mb-1">Remarks</label><textarea v-model="form.remarks" :readonly="readonly" rows="2" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"></textarea></div>
    </CommonFormSection>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: any; readonly?: boolean }>()
const emit = defineEmits(['update:modelValue'])
const form = computed({
  get: () => props.modelValue || {},
  set: (v) => emit('update:modelValue', v),
})
</script>
