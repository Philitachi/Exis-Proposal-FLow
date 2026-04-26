import { PROPOSAL_STATUSES, RETURN_STAGES } from './constants'

const S = PROPOSAL_STATUSES

/**
 * Determine the next valid statuses from a given status
 */
export function getNextStatuses(currentStatus: string, role: string): string[] {
  const map: Record<string, Record<string, string[]>> = {
    [S.DRAFT]: {
      Proponent: [S.SUBMITTED],
    },
    [S.SUBMITTED]: {
      Proponent: [S.PENDING_EVALUATOR_CONFIRMATION],
    },
    [S.PENDING_EVALUATOR_CONFIRMATION]: {
      'Extension Director / Division Chief': [S.UNDER_EVALUATION],
    },
    [S.UNDER_EVALUATION]: {},
    [S.EVALUATION_COMPLETED]: {
      Proponent: [S.SUBMITTED_TO_DIRECTOR],
    },
    [S.SUBMITTED_TO_DIRECTOR]: {
      'Extension Director / Division Chief': [S.UNDER_INITIAL_REVIEW],
    },
    [S.UNDER_INITIAL_REVIEW]: {
      'Extension Director / Division Chief': [S.UNDER_VPRIE_REVIEW, S.FOR_REVISION, S.DISAPPROVED],
    },
    [S.FOR_REVISION]: {
      Proponent: [S.RESUBMITTED],
    },
    [S.RESUBMITTED]: {},
    [S.UNDER_VPRIE_REVIEW]: {
      VPRIE: [S.FOR_PRESIDENT_REVIEW, S.FOR_REVISION, S.DISAPPROVED],
    },
    [S.FOR_PRESIDENT_REVIEW]: {
      President: [S.APPROVED, S.FOR_REVISION, S.DISAPPROVED],
    },
    [S.APPROVED]: {},
    [S.DISAPPROVED]: {},
    [S.ARCHIVED]: {},
  }
  return map[currentStatus]?.[role] || []
}

/**
 * Can the proponent edit this proposal?
 */
export function canProponentEdit(status: string): boolean {
  return status === S.DRAFT
}

/**
 * Can the proponent revise this proposal?
 */
export function canProponentRevise(status: string): boolean {
  return status === S.FOR_REVISION
}

/**
 * Can the proponent submit to Director?
 */
export function canSubmitToDirector(status: string): boolean {
  return status === S.EVALUATION_COMPLETED
}

/**
 * Determine the resubmit target based on return_to_stage
 */
export function getResubmitTargetStatus(returnToStage: string): string {
  switch (returnToStage) {
    case RETURN_STAGES.EVALUATOR_REVIEW:
      return S.UNDER_EVALUATION
    case RETURN_STAGES.DIRECTOR_REVIEW:
      return S.UNDER_INITIAL_REVIEW
    case RETURN_STAGES.VPRIE_REVIEW:
      return S.UNDER_VPRIE_REVIEW
    case RETURN_STAGES.PRESIDENT_REVIEW:
      return S.FOR_PRESIDENT_REVIEW
    default:
      return S.SUBMITTED_TO_DIRECTOR
  }
}
