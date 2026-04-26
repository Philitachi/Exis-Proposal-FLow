/**
 * useAuth composable — simulates authentication using mock users and localStorage
 */
import { mockUsers } from '~/data/mockUsers'
import { ROLE_ROUTES } from '~/utils/constants'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  universityId: string
  college: string
  department: string
  assignedEvaluationProposalIds: string[]
}

export const useAuth = () => {
  const user = useState<AuthUser | null>('auth_user', () => null)
  const isAuthenticated = computed(() => !!user.value)

  // Initialize from localStorage on first call
  if (import.meta.client && !user.value) {
    const stored = localStorage.getItem('exsis_user')
    if (stored) {
      try { user.value = JSON.parse(stored) } catch { /* ignore */ }
    }
  }

  function login(email: string, password: string, role: string): { success: boolean; error?: string } {
    if (email !== 'test.com' || password !== 'test') {
      return { success: false, error: 'Invalid email or password. Use test.com / test' }
    }
    const found = mockUsers.find(u => u.role === role && u.active)
    if (!found) {
      return { success: false, error: 'No active user found for selected role.' }
    }
    const authUser: AuthUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
      universityId: found.universityId,
      college: found.college,
      department: found.department,
      assignedEvaluationProposalIds: found.assignedEvaluationProposalIds,
    }
    user.value = authUser
    if (import.meta.client) {
      localStorage.setItem('exsis_user', JSON.stringify(authUser))
    }
    return { success: true }
  }

  function logout() {
    user.value = null
    if (import.meta.client) {
      localStorage.removeItem('exsis_user')
    }
    navigateTo('/login')
  }

  function getRedirectRoute(): string {
    if (!user.value) return '/login'
    return ROLE_ROUTES[user.value.role] || '/login'
  }

  return { user, isAuthenticated, login, logout, getRedirectRoute }
}
