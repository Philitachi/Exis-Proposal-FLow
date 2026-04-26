import { PROPOSAL_STATUSES } from '~/utils/constants'

export const useStatusTransition = () => {
  const S = PROPOSAL_STATUSES

  function getStatusColor(status: string): string {
    const map: Record<string, string> = {
      [S.DRAFT]: 'bg-gray-200 text-gray-800',
      [S.SUBMITTED]: 'bg-gray-300 text-gray-900',
      [S.PENDING_EVALUATOR_CONFIRMATION]: 'bg-gray-300 text-gray-800',
      [S.UNDER_EVALUATION]: 'bg-gray-400 text-white',
      [S.EVALUATION_COMPLETED]: 'bg-gray-500 text-white',
      [S.SUBMITTED_TO_DIRECTOR]: 'bg-gray-400 text-white',
      [S.UNDER_INITIAL_REVIEW]: 'bg-gray-500 text-white',
      [S.FOR_REVISION]: 'bg-gray-700 text-white',
      [S.RESUBMITTED]: 'bg-gray-400 text-white',
      [S.UNDER_VPRIE_REVIEW]: 'bg-gray-500 text-white',
      [S.FOR_PRESIDENT_REVIEW]: 'bg-gray-600 text-white',
      [S.APPROVED]: 'bg-black text-white',
      [S.DISAPPROVED]: 'bg-gray-800 text-white',
      [S.ARCHIVED]: 'bg-gray-900 text-white',
    }
    return map[status] || 'bg-gray-200 text-gray-800'
  }

  function getNextAction(status: string, role: string): string {
    if (role === 'Proponent') {
      if (status === S.DRAFT) return 'Complete and submit proposal forms'
      if (status === S.SUBMITTED) return 'Nominate evaluators'
      if (status === S.FOR_REVISION) return 'Revise proposal and fill Revision Matrix'
      if (status === S.EVALUATION_COMPLETED) return 'Review evaluations and submit to Director'
      return 'Waiting for review'
    }
    if (role === 'Extension Director / Division Chief') {
      if (status === S.PENDING_EVALUATOR_CONFIRMATION) return 'Confirm evaluator assignments'
      if (status === S.SUBMITTED_TO_DIRECTOR || status === S.UNDER_INITIAL_REVIEW) return 'Review and make decision'
      return 'Waiting'
    }
    if (role === 'VPRIE') {
      if (status === S.UNDER_VPRIE_REVIEW) return 'Review and make decision'
      return 'Waiting'
    }
    if (role === 'President') {
      if (status === S.FOR_PRESIDENT_REVIEW) return 'Review and make final decision'
      return 'Waiting'
    }
    return ''
  }

  return { getStatusColor, getNextAction }
}
