<template>
  <div>
    <CommonFormSection title="Work and Financial Plan">
      <CommonDynamicRowTable
        v-model="rows"
        :columns="columns"
        :empty-row="emptyRow"
      />
      <div class="mt-3 text-sm font-medium text-gray-700 text-right">
        Total Budget: PHP {{ totalBudget.toLocaleString() }}
      </div>
    </CommonFormSection>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: any[]; readonly?: boolean }>()
const emit = defineEmits(['update:modelValue'])
const rows = computed({
  get: () => props.modelValue || [],
  set: (v) => emit('update:modelValue', v),
})
const columns = [
  { key: 'activity', label: 'Activity' },
  { key: 'startDate', label: 'Start', type: 'date' },
  { key: 'endDate', label: 'End', type: 'date' },
  { key: 'expectedOutput', label: 'Output' },
  { key: 'responsiblePerson', label: 'Responsible' },
  { key: 'budgetItem', label: 'Budget Item' },
  { key: 'quantity', label: 'Qty', type: 'number' },
  { key: 'unitCost', label: 'Unit Cost', type: 'number' },
  { key: 'totalCost', label: 'Total', type: 'number' },
  { key: 'fundingSource', label: 'Source' },
]
const emptyRow = () => ({ activity: '', startDate: '', endDate: '', expectedOutput: '', responsiblePerson: '', budgetItem: '', quantity: 0, unitCost: 0, totalCost: 0, fundingSource: '', remarks: '' })
const totalBudget = computed(() => rows.value.reduce((sum: number, r: any) => sum + (Number(r.totalCost) || 0), 0))
</script>
