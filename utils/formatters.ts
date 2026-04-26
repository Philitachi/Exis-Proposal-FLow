/**
 * Format a date string for display
 */
export function formatDate(date: string | Date | undefined): string {
  if (!date) return '—'
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

/**
 * Format a date+time string for display
 */
export function formatDateTime(date: string | Date | undefined): string {
  if (!date) return '—'
  const d = new Date(date)
  return d.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

/**
 * Generate a simple unique ID
 */
export function generateId(): string {
  return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 7)
}

/**
 * Generate a proposal code
 */
export function generateProposalCode(): string {
  const year = new Date().getFullYear()
  const seq = Math.floor(Math.random() * 9000) + 1000
  return `EXT-${year}-${seq}`
}

/**
 * Truncate text to a max length
 */
export function truncate(text: string, maxLength: number = 100): string {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

/**
 * Get adjectival rating from score
 */
export function getAdjectivalRating(score: number): string {
  if (score >= 70) return 'Approved'
  if (score >= 60) return 'Provisionary / For Revision'
  return 'Disapproved'
}

/**
 * Currency format
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount)
}
