<template>
  <div>
    <CommonFormSection title="F-EXT-004: List of Personnel">
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div><label class="block text-xs text-gray-500 mb-1">Program/Project Title</label><input v-model="form.programTitle" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" /></div>
        <div><label class="block text-xs text-gray-500 mb-1">Implementing Agency</label><input v-model="form.implementingAgency" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" /></div>
        <div><label class="block text-xs text-gray-500 mb-1">Project Leader</label><input v-model="form.projectLeader" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" /></div>
      </div>

      <!-- Personnel table -->
      <div class="overflow-x-auto">
        <table class="w-full text-xs border border-gray-300">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-2 py-1 text-left border-b border-gray-300">Name</th>
              <th class="px-2 py-1 text-left border-b border-gray-300">Gender</th>
              <th class="px-2 py-1 text-left border-b border-gray-300">Office Designation</th>
              <th class="px-2 py-1 text-left border-b border-gray-300">Project Designation</th>
              <th class="px-2 py-1 text-left border-b border-gray-300">Time %</th>
              <th class="px-2 py-1 text-left border-b border-gray-300">Education</th>
              <th class="px-2 py-1 text-left border-b border-gray-300">Type</th>
              <th class="px-2 py-1 border-b border-gray-300 w-12">—</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, i) in personnel" :key="i" class="border-b border-gray-200">
              <td class="px-2 py-1"><input v-model="p.name" :readonly="readonly" class="w-full border border-gray-200 rounded px-1 py-0.5 text-xs" /></td>
              <td class="px-2 py-1"><select v-model="p.gender" :disabled="readonly" class="border border-gray-200 rounded px-1 py-0.5 text-xs"><option>Male</option><option>Female</option></select></td>
              <td class="px-2 py-1"><input v-model="p.designationOffice" :readonly="readonly" class="w-full border border-gray-200 rounded px-1 py-0.5 text-xs" /></td>
              <td class="px-2 py-1"><input v-model="p.designationProject" :readonly="readonly" class="w-full border border-gray-200 rounded px-1 py-0.5 text-xs" /></td>
              <td class="px-2 py-1"><input v-model.number="p.timePercentProject" type="number" :readonly="readonly" class="w-16 border border-gray-200 rounded px-1 py-0.5 text-xs" /></td>
              <td class="px-2 py-1"><input v-model="p.educationalAttainment" :readonly="readonly" class="w-full border border-gray-200 rounded px-1 py-0.5 text-xs" /></td>
              <td class="px-2 py-1"><select v-model="p.type" :disabled="readonly" class="border border-gray-200 rounded px-1 py-0.5 text-xs"><option>Faculty</option><option>Student</option></select></td>
              <td class="px-2 py-1 text-center"><button v-if="!readonly" @click="removePersonnel(i)" class="text-gray-400 hover:text-gray-700"><X class="w-3 h-3" /></button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!readonly" class="flex gap-2 mt-2">
        <button @click="fetchMockRecord" class="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">Fetch Faculty/Student</button>
        <button @click="addManual" class="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">+ Add Manual</button>
      </div>
    </CommonFormSection>
  </div>
</template>

<script setup lang="ts">
import { mockFacultyStudents } from '~/data/mockFacultyStudents'
import { X } from 'lucide-vue-next'

const props = defineProps<{ modelValue: any; readonly?: boolean }>()
const emit = defineEmits(['update:modelValue'])
const form = computed({
  get: () => props.modelValue || {},
  set: (v) => emit('update:modelValue', v),
})
const personnel = computed(() => form.value.personnel || [])

function addManual() {
  if (!form.value.personnel) form.value.personnel = []
  form.value.personnel.push({ name: '', gender: 'Male', designationOffice: '', designationProject: '', remunerationOffice: 0, remunerationProject: 0, timePercentProject: 0, timePercentOther: 0, educationalAttainment: '', type: 'Faculty', source: 'manual' })
}

function fetchMockRecord() {
  const available = mockFacultyStudents.filter(f => !personnel.value.some((p: any) => p.name === f.name))
  if (available.length > 0) {
    const f = available[0]
    if (!form.value.personnel) form.value.personnel = []
    form.value.personnel.push({ name: f.name, gender: 'Male', designationOffice: f.rank, designationProject: '', remunerationOffice: 0, remunerationProject: 0, timePercentProject: 0, timePercentOther: 0, educationalAttainment: f.rank, type: f.type, source: 'mock' })
  }
}

function removePersonnel(i: number) {
  form.value.personnel.splice(i, 1)
}
</script>
