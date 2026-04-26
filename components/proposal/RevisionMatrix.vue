<template>
  <div>
    <CommonFormSection title="Revision Matrix">
      <p class="text-xs text-gray-500 mb-3">Complete the revision matrix to address all review comments before resubmitting.</p>
      <div v-for="(row, i) in rows" :key="i" class="border border-gray-300 rounded p-3 mb-3">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-medium text-gray-600">Revision Item {{ i + 1 }}</span>
          <button @click="removeRow(i)" class="text-xs text-gray-400 hover:text-gray-700">Remove</button>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div><label class="block text-xs text-gray-500 mb-0.5">Comment / Recommendation</label><textarea v-model="row.comment" rows="2" class="w-full border border-gray-300 rounded px-2 py-1 text-xs"></textarea></div>
          <div><label class="block text-xs text-gray-500 mb-0.5">Commented By</label><input v-model="row.commentedBy" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" /></div>
          <div><label class="block text-xs text-gray-500 mb-0.5">Review Level</label><input v-model="row.reviewLevel" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" /></div>
          <div><label class="block text-xs text-gray-500 mb-0.5">Action Taken by Proponent</label><textarea v-model="row.actionTaken" rows="2" class="w-full border border-gray-300 rounded px-2 py-1 text-xs"></textarea></div>
          <div><label class="block text-xs text-gray-500 mb-0.5">Section/Page Reflected</label><input v-model="row.sectionPage" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" /></div>
          <div><label class="block text-xs text-gray-500 mb-0.5">Date Revised</label><input v-model="row.dateRevised" type="date" class="w-full border border-gray-300 rounded px-2 py-1 text-xs" /></div>
          <div><label class="block text-xs text-gray-500 mb-0.5">Status</label>
            <select v-model="row.status" class="w-full border border-gray-300 rounded px-2 py-1 text-xs"><option>Pending</option><option>Addressed</option><option>Partially Addressed</option></select>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <button @click="addRow" class="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">+ Add Revision Row</button>
        <button @click="$emit('save', rows)" class="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">Save Matrix</button>
        <button @click="$emit('resubmit', rows)" class="text-xs bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700">Resubmit</button>
      </div>
    </CommonFormSection>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: any[] }>()
const emit = defineEmits(['save', 'resubmit', 'update:modelValue'])
const rows = ref([...(props.modelValue || [])])

function addRow() {
  rows.value.push({ comment: '', commentedBy: '', reviewLevel: '', actionTaken: '', sectionPage: '', dateRevised: '', status: 'Pending' })
}
function removeRow(i: number) { rows.value.splice(i, 1) }
</script>
