export interface MockEvaluation {
  id: string
  proposalId: string
  evaluatorUserId: string
  evaluatorName: string
  dateOfEvaluation: string | null
  scores: {
    proposalPresentation: number
    organization: number
    presentation: number
    content: number
    relevanceToDiscipline: number
    relevanceToRdeAgenda: number
    potentialBenefits: number
  }
  remarks: Record<string, string>
  totalScore: number
  adjectivalRating: string
  recommendation: string
  overallRemarks: string
  signatureConfirmed: boolean
  submittedAt: string | null
  status: string
}

export const mockEvaluations: MockEvaluation[] = [
  {
    id: 'eval-001',
    proposalId: 'proposal-001',
    evaluatorUserId: 'user-007',
    evaluatorName: 'Prof. Ana Villanueva',
    dateOfEvaluation: null,
    scores: { proposalPresentation: 0, organization: 0, presentation: 0, content: 0, relevanceToDiscipline: 0, relevanceToRdeAgenda: 0, potentialBenefits: 0 },
    remarks: {},
    totalScore: 0,
    adjectivalRating: '',
    recommendation: '',
    overallRemarks: '',
    signatureConfirmed: false,
    submittedAt: null,
    status: 'Pending',
  },
  {
    id: 'eval-002',
    proposalId: 'proposal-001',
    evaluatorUserId: 'user-008',
    evaluatorName: 'Dr. Ricardo Lim',
    dateOfEvaluation: null,
    scores: { proposalPresentation: 0, organization: 0, presentation: 0, content: 0, relevanceToDiscipline: 0, relevanceToRdeAgenda: 0, potentialBenefits: 0 },
    remarks: {},
    totalScore: 0,
    adjectivalRating: '',
    recommendation: '',
    overallRemarks: '',
    signatureConfirmed: false,
    submittedAt: null,
    status: 'Pending',
  },
]
