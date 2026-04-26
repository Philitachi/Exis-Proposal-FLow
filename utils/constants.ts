// Proposal statuses
export const PROPOSAL_STATUSES = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  PENDING_EVALUATOR_CONFIRMATION: 'Pending Evaluator Confirmation',
  UNDER_EVALUATION: 'Under Evaluation',
  EVALUATION_COMPLETED: 'Evaluation Completed',
  SUBMITTED_TO_DIRECTOR: 'Submitted to Extension Director',
  UNDER_INITIAL_REVIEW: 'Under Initial Review',
  FOR_REVISION: 'For Revision',
  RESUBMITTED: 'Resubmitted',
  UNDER_VPRIE_REVIEW: 'Under VPRIE Review',
  FOR_PRESIDENT_REVIEW: 'For President Review',
  APPROVED: 'Approved',
  DISAPPROVED: 'Disapproved',
  ARCHIVED: 'Archived',
} as const

// Return stage values
export const RETURN_STAGES = {
  EVALUATOR_REVIEW: 'Evaluator Review',
  DIRECTOR_REVIEW: 'Director Review',
  VPRIE_REVIEW: 'VPRIE Review',
  PRESIDENT_REVIEW: 'President Review',
} as const

// User roles
export const ROLES = {
  PROPONENT: 'Proponent',
  CEC: 'College Extension Coordinator',
  DIRECTOR: 'Extension Director / Division Chief',
  VPRIE: 'VPRIE',
  PRESIDENT: 'President',
  ADMIN: 'System Administrator',
} as const

// Evaluation rating scale
export const RATING_SCALE = {
  APPROVED: { min: 70, max: 100, label: 'Approved' },
  PROVISIONARY: { min: 60, max: 69.99, label: 'Provisionary / For Revision' },
  DISAPPROVED: { min: 0, max: 59.99, label: 'Disapproved' },
} as const

// Evaluation criteria weights
export const EVALUATION_CRITERIA = {
  proposalPresentation: { label: 'Proposal Presentation', weight: 40 },
  organization: { label: 'Organization', weight: 15 },
  presentation: { label: 'Presentation', weight: 5 },
  content: { label: 'Content', weight: 20 },
  relevanceToDiscipline: { label: 'Relevance to Discipline', weight: 20 },
  relevanceToRdeAgenda: { label: 'Relevance to RDE Agenda', weight: 30 },
  potentialBenefits: { label: 'Potential Benefits to Target Clients', weight: 10 },
} as const

// Evaluator types
export const EVALUATOR_TYPES = [
  'CEC',
  'Faculty',
  'Qualified Reviewer',
  'External Expert',
] as const

// Types of scholarly work
export const SCHOLARLY_WORK_TYPES = [
  'Research',
  'Extension',
  'Instructional Material Development',
] as const

// Role-to-route mapping for login redirect
export const ROLE_ROUTES: Record<string, string> = {
  [ROLES.PROPONENT]: '/proponent',
  [ROLES.CEC]: '/cec',
  [ROLES.DIRECTOR]: '/director',
  [ROLES.VPRIE]: '/vprie',
  [ROLES.PRESIDENT]: '/president',
  [ROLES.ADMIN]: '/admin',
}
