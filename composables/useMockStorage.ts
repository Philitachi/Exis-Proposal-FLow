/**
 * useMockStorage composable — provides reactive state backed by localStorage
 * This is the central store for all mock data that can be mutated during the prototype session
 */
import { mockProposals, type MockProposal } from '~/data/mockProposals'
import { mockEvaluations, type MockEvaluation } from '~/data/mockEvaluations'
import { mockComments } from '~/data/mockComments'
import { mockNotifications } from '~/data/mockNotifications'
import { mockLogs } from '~/data/mockLogs'
import { mockUsers, type MockUser } from '~/data/mockUsers'

function loadOrDefault<T>(key: string, defaults: T): T {
  if (!import.meta.client) return defaults
  const stored = localStorage.getItem(key)
  if (stored) {
    try { return JSON.parse(stored) } catch { /* ignore */ }
  }
  return defaults
}

function persist<T>(key: string, data: T) {
  if (import.meta.client) {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

export const useMockStorage = () => {
  const proposals = useState<MockProposal[]>('mock_proposals', () => loadOrDefault('exsis_proposals', mockProposals))
  const evaluations = useState<MockEvaluation[]>('mock_evaluations', () => loadOrDefault('exsis_evaluations', mockEvaluations))
  const comments = useState<any[]>('mock_comments', () => loadOrDefault('exsis_comments', mockComments))
  const notifications = useState<any[]>('mock_notifications', () => loadOrDefault('exsis_notifications', mockNotifications))
  const logs = useState<any[]>('mock_logs', () => loadOrDefault('exsis_logs', mockLogs))
  const users = useState<MockUser[]>('mock_users', () => loadOrDefault('exsis_users', mockUsers))

  function saveAll() {
    persist('exsis_proposals', proposals.value)
    persist('exsis_evaluations', evaluations.value)
    persist('exsis_comments', comments.value)
    persist('exsis_notifications', notifications.value)
    persist('exsis_logs', logs.value)
    persist('exsis_users', users.value)
  }

  function saveProposals() { persist('exsis_proposals', proposals.value) }
  function saveEvaluations() { persist('exsis_evaluations', evaluations.value) }
  function saveComments() { persist('exsis_comments', comments.value) }
  function saveNotifications() { persist('exsis_notifications', notifications.value) }
  function saveLogs() { persist('exsis_logs', logs.value) }
  function saveUsers() { persist('exsis_users', users.value) }

  function resetAll() {
    proposals.value = [...mockProposals]
    evaluations.value = [...mockEvaluations]
    comments.value = [...mockComments]
    notifications.value = [...mockNotifications]
    logs.value = [...mockLogs]
    users.value = [...mockUsers]
    saveAll()
  }

  function addLog(action: string, userId: string, userName: string, target: string, details: string) {
    logs.value.push({
      id: 'log-' + Date.now(),
      action, userId, userName, target, details,
      timestamp: new Date().toISOString(),
    })
    saveLogs()
  }

  function addNotification(userId: string, title: string, message: string, type: string, link: string) {
    notifications.value.push({
      id: 'n-' + Date.now(),
      userId, title, message, type, read: false,
      createdAt: new Date().toISOString(), link,
    })
    saveNotifications()
  }

  function addComment(proposalId: string, userId: string, userName: string, role: string, content: string) {
    comments.value.push({
      id: 'c-' + Date.now(),
      proposalId, userId, userName, role, content,
      createdAt: new Date().toISOString(),
    })
    saveComments()
  }

  return {
    proposals, evaluations, comments, notifications, logs, users,
    saveAll, saveProposals, saveEvaluations, saveComments, saveNotifications, saveLogs, saveUsers,
    resetAll, addLog, addNotification, addComment,
  }
}
