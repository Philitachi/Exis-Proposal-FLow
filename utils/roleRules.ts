import { ROLES } from './constants'

/**
 * Get allowed route prefixes for a given role
 */
export function getAllowedRoutes(role: string): string[] {
  const common = ['/dashboard', '/notifications', '/profile', '/login']
  switch (role) {
    case ROLES.PROPONENT:
      return [...common, '/proponent', '/evaluations']
    case ROLES.CEC:
      return [...common, '/cec', '/evaluations']
    case ROLES.DIRECTOR:
      return [...common, '/director']
    case ROLES.VPRIE:
      return [...common, '/vprie']
    case ROLES.PRESIDENT:
      return [...common, '/president']
    case ROLES.ADMIN:
      return [...common, '/admin', '/finalization', '/archive']
    default:
      return ['/login']
  }
}

/**
 * Check if a user role can access a given route path
 */
export function canAccessRoute(role: string, path: string): boolean {
  const allowed = getAllowedRoutes(role)
  return allowed.some(prefix => path === prefix || path.startsWith(prefix + '/'))
}

/**
 * Get sidebar menu items for a given role
 */
export function getSidebarItems(role: string): Array<{ label: string; icon: string; to: string; children?: Array<{ label: string; to: string }> }> {
  switch (role) {
    case ROLES.PROPONENT:
      return [
        { label: 'Dashboard', icon: 'LayoutDashboard', to: '/proponent' },
        { label: 'My Proposals', icon: 'FileText', to: '/proponent/proposals' },
        { label: 'My Evaluations', icon: 'ClipboardEdit', to: '/evaluations' },
        { label: 'Notifications', icon: 'Bell', to: '/notifications' },
        { label: 'Profile', icon: 'User', to: '/profile' },
      ]
    case ROLES.CEC:
      return [
        { label: 'Dashboard', icon: 'LayoutDashboard', to: '/cec' },
        { label: 'Attestation', icon: 'CheckSquare', to: '/cec/attestation' },
        { label: 'Coordination', icon: 'Link', to: '/cec/coordination' },
        { label: 'Evaluations', icon: 'ClipboardEdit', to: '/cec/evaluations' },
        { label: 'Notifications', icon: 'Bell', to: '/notifications' },
      ]
    case ROLES.DIRECTOR:
      return [
        { label: 'Dashboard', icon: 'LayoutDashboard', to: '/director' },
        { label: 'Evaluator Confirmation', icon: 'Users', to: '/director/evaluator-confirmation' },
        { label: 'Review Proposals', icon: 'ClipboardCheck', to: '/director/review' },
        { label: 'Notifications', icon: 'Bell', to: '/notifications' },
      ]
    case ROLES.VPRIE:
      return [
        { label: 'Dashboard', icon: 'LayoutDashboard', to: '/vprie' },
        { label: 'Review Proposals', icon: 'ClipboardCheck', to: '/vprie/review' },
        { label: 'Notifications', icon: 'Bell', to: '/notifications' },
      ]
    case ROLES.PRESIDENT:
      return [
        { label: 'Dashboard', icon: 'LayoutDashboard', to: '/president' },
        { label: 'Review Proposals', icon: 'ClipboardCheck', to: '/president/review' },
        { label: 'Notifications', icon: 'Bell', to: '/notifications' },
      ]
    case ROLES.ADMIN:
      return [
        { label: 'Dashboard', icon: 'LayoutDashboard', to: '/admin' },
        { label: 'Users', icon: 'Users', to: '/admin/users' },
        { label: 'RBAC', icon: 'Shield', to: '/admin/rbac' },
        { label: 'Evaluator Access', icon: 'ClipboardEdit', to: '/admin/evaluator-access' },
        { label: 'Proposal Access', icon: 'FileText', to: '/admin/proposal-access' },
        { label: 'Document Repo', icon: 'Folder', to: '/admin/document-repository' },
        { label: 'Doc Control', icon: 'Settings', to: '/admin/document-control' },
        { label: 'Logs', icon: 'ScrollText', to: '/admin/logs' },
        { label: 'Archive', icon: 'Archive', to: '/archive' },
        { label: 'Finalization', icon: 'CheckSquare', to: '/archive' },
      ]
    default:
      return []
  }
}
