<template>
  <div>
    <CommonFormSection title="Evaluator Nomination">
      <div v-if="errors.length" class="mb-3 p-2 border border-gray-400 bg-gray-100 rounded text-xs text-gray-700">
        <div v-for="(e, i) in errors" :key="i" class="flex items-center"><AlertTriangle class="w-4 h-4 mr-1" /> {{ e }}</div>
      </div>

      <div v-for="(ev, i) in evaluators" :key="i" class="border border-gray-300 rounded p-3 mb-3">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">Evaluator {{ i + 1 }}</span>
          <button @click="removeEvaluator(i)" class="text-xs text-gray-400 hover:text-gray-700">Remove</button>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Select Evaluator</label>
            <select v-model="ev.userId" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" @change="onSelectUser(ev)">
              <option value="">Select...</option>
              <option v-for="u in availableUsers" :key="u.id" :value="u.id">{{ u.name }} ({{ u.department }})</option>
            </select>
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Evaluator Type</label>
            <select v-model="ev.type" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm">
              <option value="">Select...</option>
              <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
        </div>
        <div class="mt-2">
          <label class="block text-xs text-gray-500 mb-1">Notes</label>
          <input v-model="ev.notes" class="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" />
        </div>
      </div>

      <button @click="addEvaluator" class="text-sm border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-100">+ Add Evaluator</button>
      <div class="mt-4">
        <button @click="submitNominations" class="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">Submit Nominations</button>
      </div>
    </CommonFormSection>
  </div>
</template>

<script setup lang="ts">
import { mockUsers } from '~/data/mockUsers'
import { EVALUATOR_TYPES } from '~/utils/constants'
import { AlertTriangle } from 'lucide-vue-next'

const props = defineProps<{ proposalId: string; proponentId: string; existingNominations?: any[] }>()
const emit = defineEmits(['submit'])

const types = EVALUATOR_TYPES
const evaluators = ref<any[]>(props.existingNominations?.length ? [...props.existingNominations] : [])
const errors = ref<string[]>([])

// Filter out the proponent and proposal team from available evaluators
const availableUsers = computed(() => mockUsers.filter(u => u.id !== props.proponentId && u.active))

function addEvaluator() {
  evaluators.value.push({ userId: '', name: '', type: '', notes: '', nominatedBy: '', dateNominated: '' })
}

function removeEvaluator(i: number) {
  evaluators.value.splice(i, 1)
}

function onSelectUser(ev: any) {
  const u = mockUsers.find(u => u.id === ev.userId)
  if (u) ev.name = u.name
}

function submitNominations() {
  errors.value = []
  if (evaluators.value.length < 2) {
    errors.value.push('Must nominate at least 2 evaluators.')
    return
  }
  const incomplete = evaluators.value.some(e => !e.userId || !e.type)
  if (incomplete) {
    errors.value.push('All evaluator fields must be completed.')
    return
  }
  const hasProponent = evaluators.value.some(e => e.userId === props.proponentId)
  if (hasProponent) {
    errors.value.push('Evaluator must not be part of proposing team.')
    return
  }
  // Set metadata
  evaluators.value.forEach(e => {
    e.nominatedBy = 'Proponent'
    e.dateNominated = new Date().toISOString().split('T')[0]
  })
  emit('submit', evaluators.value)
}
</script>
