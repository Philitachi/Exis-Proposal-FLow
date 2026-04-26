<template>
  <div>
    <CommonFormSection title="F-EXT-003: Evaluation of Project Proposal">
      <div class="grid grid-cols-2 gap-3 mb-4">
        <CommonReadOnlyField label="Name of Proponent(s)" :value="proponentName" />
        <CommonReadOnlyField label="Project Title" :value="projectTitle" />
        <CommonReadOnlyField label="Date of Evaluation" :value="new Date().toLocaleDateString()" />
      </div>
    </CommonFormSection>

    <CommonFormSection title="Evaluation Criteria">
      <table class="w-full text-sm border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="text-left px-3 py-2 text-xs border-b border-gray-300">Criterion</th>
            <th class="text-left px-3 py-2 text-xs border-b border-gray-300 w-16">Weight</th>
            <th class="text-left px-3 py-2 text-xs border-b border-gray-300 w-24">Rating (0-100)</th>
            <th class="text-left px-3 py-2 text-xs border-b border-gray-300">Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(c, key) in criteria" :key="key" class="border-b border-gray-200">
            <td class="px-3 py-2 text-gray-700">{{ c.label }}</td>
            <td class="px-3 py-2 text-gray-500">{{ c.weight }}%</td>
            <td class="px-3 py-2"><input v-model.number="scores[key as string]" type="number" min="0" max="100" class="w-full border border-gray-300 rounded px-2 py-1 text-sm" /></td>
            <td class="px-3 py-2"><input v-model="remarks[key as string]" class="w-full border border-gray-300 rounded px-2 py-1 text-sm" placeholder="Remarks..." /></td>
          </tr>
        </tbody>
      </table>
    </CommonFormSection>

    <CommonFormSection title="Score Summary">
      <div class="flex gap-6 text-sm">
        <div><span class="text-gray-500">Total Score:</span> <span class="font-bold">{{ totalScore }}</span></div>
        <div><span class="text-gray-500">Adjectival Rating:</span> <span class="font-bold">{{ adjectivalRating }}</span></div>
      </div>
    </CommonFormSection>

    <CommonFormSection title="Overall Assessment">
      <div><label class="block text-xs text-gray-500 mb-1">Overall Remarks</label><textarea v-model="overallRemarks" rows="3" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"></textarea></div>
      <div class="mt-2">
        <label class="block text-xs text-gray-500 mb-1">Recommendation</label>
        <select v-model="recommendation" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">
          <option value="">Select...</option>
          <option value="Approved">Approved</option>
          <option value="Provisionary / For Revision">Provisionary / For Revision</option>
          <option value="Disapproved">Disapproved</option>
        </select>
      </div>
      <CommonPlaceholderBox label="Evaluator Signature Placeholder" height="60px" class="mt-3" />
      <div class="flex items-center gap-2 mt-2">
        <input type="checkbox" v-model="signatureConfirmed" id="sig" />
        <label for="sig" class="text-xs text-gray-600">I confirm this evaluation is final.</label>
      </div>
      <button @click="handleSubmit" class="mt-4 bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">Submit Evaluation</button>
    </CommonFormSection>
  </div>
</template>

<script setup lang="ts">
import { EVALUATION_CRITERIA } from '~/utils/constants'
import { getAdjectivalRating } from '~/utils/formatters'

defineProps<{ proponentName: string; projectTitle: string }>()
const emit = defineEmits(['submit'])

const criteria = EVALUATION_CRITERIA
const scores = ref<Record<string, number>>({
  proposalPresentation: 0, organization: 0, presentation: 0, content: 0,
  relevanceToDiscipline: 0, relevanceToRdeAgenda: 0, potentialBenefits: 0,
})
const remarks = ref<Record<string, string>>({})
const overallRemarks = ref('')
const recommendation = ref('')
const signatureConfirmed = ref(false)

const totalScore = computed(() => {
  const weights: Record<string, number> = { proposalPresentation: 0.40, organization: 0.15, presentation: 0.05, content: 0.20, relevanceToDiscipline: 0.20, relevanceToRdeAgenda: 0.30, potentialBenefits: 0.10 }
  let total = 0; let totalWeight = 0
  for (const [key, weight] of Object.entries(weights)) {
    total += (scores.value[key] || 0) * weight
    totalWeight += weight
  }
  return Math.round((total / totalWeight) * 100) / 100
})

const adjectivalRating = computed(() => getAdjectivalRating(totalScore.value))

function handleSubmit() {
  if (!signatureConfirmed.value) { alert('Please confirm signature.'); return }
  emit('submit', {
    scores: { ...scores.value },
    remarks: { ...remarks.value },
    overallRemarks: overallRemarks.value,
    recommendation: recommendation.value || adjectivalRating.value,
    signatureConfirmed: true,
  })
}
</script>
