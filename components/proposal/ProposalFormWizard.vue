<template>
  <div>
    <!-- Step indicator -->
    <div class="flex gap-1 mb-6">
      <div v-for="(step, i) in steps" :key="i"
        @click="currentStep = i"
        class="flex-1 text-center py-2 text-xs border cursor-pointer"
        :class="i === currentStep ? 'bg-gray-800 text-white border-gray-800' : 'bg-gray-100 text-gray-600 border-gray-300'">
        {{ step }}
      </div>
    </div>

    <!-- Step content -->
    <div v-show="currentStep === 0"><ProposalFext001Form v-model="formData.fext001" :readonly="readonly" /></div>
    <div v-show="currentStep === 1"><ProposalFext002Form v-model="formData.fext002" :readonly="readonly" /></div>
    <div v-show="currentStep === 2"><ProposalWorkFinancialPlanForm v-model="formData.workFinancialPlan" :readonly="readonly" /></div>
    <div v-show="currentStep === 3"><ProposalFext004PersonnelForm v-model="formData.fext004" :readonly="readonly" /></div>
    <div v-show="currentStep === 4">
      <CommonFormSection title="Supporting Attachments">
        <CommonMockFileUpload label="CV File" v-model="formData.attachments" />
        <CommonMockFileUpload label="Supporting Documents" class="mt-3" />
      </CommonFormSection>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between mt-6">
      <button v-if="currentStep > 0" @click="currentStep--" class="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100">← Previous</button>
      <div v-else></div>
      <div class="flex gap-2">
        <button v-if="!readonly" @click="$emit('save')" class="border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100">Save Draft</button>
        <button v-if="currentStep < steps.length - 1" @click="currentStep++" class="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">Next →</button>
        <button v-else-if="!readonly" @click="$emit('submit')" class="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">Submit Proposal</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ formData: any; readonly?: boolean }>()
defineEmits(['save', 'submit'])
const currentStep = ref(0)
const steps = ['F-EXT-001', 'F-EXT-002', 'Work & Financial Plan', 'F-EXT-004 Personnel', 'Attachments']
</script>
