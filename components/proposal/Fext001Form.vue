<template>
  <div>
    <CommonFormSection title="F-EXT-001: Conduct of Scholarly Work Information Sheet">
      <!-- Type of Scholarly Work -->
      <div>
        <label class="block text-xs text-gray-500 mb-1">Type of Scholarly Work</label>
        <select v-model="form.typeOfScholarlyWork" :disabled="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">
          <option value="">Select...</option>
          <option value="Research">Research</option>
          <option value="Extension">Extension</option>
          <option value="Instructional Material Development">Instructional Material Development</option>
        </select>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs text-gray-500 mb-1">Total Proposed Budget (PHP)</label>
          <input v-model.number="form.totalBudget" type="number" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" />
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Proposed Starting Date</label>
          <input v-model="form.startDate" type="date" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" />
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">Proposed Completion Date</label>
          <input v-model="form.completionDate" type="date" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" />
        </div>
      </div>
    </CommonFormSection>

    <CommonFormSection title="Proponent Information">
      <div class="grid grid-cols-2 gap-3">
        <div><label class="block text-xs text-gray-500 mb-1">Project Leader</label><input v-model="form.projectLeader" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" /></div>
        <div><label class="block text-xs text-gray-500 mb-1">Rank</label><input v-model="form.rank" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" /></div>
        <div><label class="block text-xs text-gray-500 mb-1">Department / Program</label><input v-model="form.department" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" /></div>
        <div><label class="block text-xs text-gray-500 mb-1">College</label><input v-model="form.college" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" /></div>
        <div><label class="block text-xs text-gray-500 mb-1">Email</label><input v-model="form.email" type="email" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" /></div>
        <div><label class="block text-xs text-gray-500 mb-1">Contact Number</label><input v-model="form.contactNumber" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" /></div>
      </div>
    </CommonFormSection>

    <CommonFormSection title="Scholarly Work Details">
      <div><label class="block text-xs text-gray-500 mb-1">Title of Scholarly Work</label><input v-model="form.titleOfWork" :readonly="readonly" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" /></div>
      <div><label class="block text-xs text-gray-500 mb-1">Brief Description (max 250 words)</label><textarea v-model="form.briefDescription" :readonly="readonly" rows="4" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"></textarea></div>
      <CommonMockFileUpload label="Updated CV of Proponent(s)" />
    </CommonFormSection>

    <CommonFormSection title="Additional Information">
      <div class="space-y-2">
        <div class="flex items-center gap-2"><input type="checkbox" v-model="form.similarWorkElsewhere" :disabled="readonly" /><span class="text-sm text-gray-700">Similar work being carried out elsewhere?</span></div>
        <input v-if="form.similarWorkElsewhere" v-model="form.similarWorkDetails" :readonly="readonly" placeholder="Details..." class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" />
        <div class="flex items-center gap-2"><input type="checkbox" v-model="form.externalCollaboration" :disabled="readonly" /><span class="text-sm text-gray-700">External groups/individuals collaborating?</span></div>
        <input v-if="form.externalCollaboration" v-model="form.collaborationDetails" :readonly="readonly" placeholder="Details..." class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" />
        <div class="flex items-center gap-2"><input type="checkbox" v-model="form.submittedToAnotherAgency" :disabled="readonly" /><span class="text-sm text-gray-700">Submitted to another agency?</span></div>
        <div v-if="form.submittedToAnotherAgency" class="grid grid-cols-2 gap-2">
          <input v-model="form.agency" :readonly="readonly" placeholder="Agency" class="border border-gray-300 rounded px-2 py-1.5 text-sm" />
          <input v-model.number="form.agencyAmount" type="number" :readonly="readonly" placeholder="Amount" class="border border-gray-300 rounded px-2 py-1.5 text-sm" />
        </div>
        <div class="flex items-center gap-2"><input type="checkbox" v-model="form.firstTimeApply" :disabled="readonly" /><span class="text-sm text-gray-700">First time to apply?</span></div>
      </div>
      <div><label class="block text-xs text-gray-500 mb-1">Additional Comments</label><textarea v-model="form.additionalInfo" :readonly="readonly" rows="2" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"></textarea></div>
    </CommonFormSection>

    <CommonFormSection title="Signature & Approval Route">
      <CommonPlaceholderBox label="Proponent Signature Placeholder" height="60px" />
      <div class="mt-3 space-y-1 text-xs text-gray-400">
        <div class="border-b border-gray-200 py-1 flex items-center gap-1"><Square class="w-3 h-3" /> Evaluated by at least two evaluators</div>
        <div class="border-b border-gray-200 py-1 flex items-center gap-1"><Square class="w-3 h-3" /> Reviewed by Extension Director</div>
        <div class="border-b border-gray-200 py-1 flex items-center gap-1"><Square class="w-3 h-3" /> Recommending Approval by VPRIE</div>
        <div class="border-b border-gray-200 py-1 flex items-center gap-1"><Square class="w-3 h-3" /> Approved by University President</div>
      </div>
    </CommonFormSection>
  </div>
</template>

<script setup lang="ts">
import { Square } from 'lucide-vue-next'
const props = defineProps<{ modelValue: any; readonly?: boolean }>()
const emit = defineEmits(['update:modelValue'])
const form = computed({
  get: () => props.modelValue || {},
  set: (v) => emit('update:modelValue', v),
})
</script>
