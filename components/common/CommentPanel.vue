<template>
  <div class="border border-gray-300 rounded bg-white">
    <div class="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
      <h4 class="text-sm font-semibold text-gray-700">Comments</h4>
      <span class="text-xs text-gray-400">{{ comments.length }} comment{{ comments.length !== 1 ? 's' : '' }}</span>
    </div>
    <div class="max-h-64 overflow-y-auto">
      <div v-for="c in comments" :key="c.id" class="px-4 py-2 border-b border-gray-100 last:border-b-0">
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <span class="font-medium text-gray-700">{{ c.userName }}</span>
          <span>·</span>
          <span>{{ c.role }}</span>
          <span>·</span>
          <span>{{ formatDate(c.createdAt) }}</span>
        </div>
        <div class="text-sm text-gray-800 mt-0.5">{{ c.content }}</div>
      </div>
      <div v-if="!comments.length" class="px-4 py-4 text-center text-xs text-gray-400">No comments yet.</div>
    </div>
    <div v-if="allowAdd" class="px-4 py-2 border-t border-gray-200">
      <div class="flex gap-2">
        <input v-model="newComment" placeholder="Add a comment..." class="flex-1 border border-gray-300 rounded px-2 py-1 text-sm" />
        <button @click="addCommentHandler" class="border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-100">Post</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatters'

defineProps<{ comments: any[]; allowAdd?: boolean }>()
const emit = defineEmits(['add'])
const newComment = ref('')

function addCommentHandler() {
  if (newComment.value.trim()) {
    emit('add', newComment.value.trim())
    newComment.value = ''
  }
}
</script>
