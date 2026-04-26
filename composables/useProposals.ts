/**
 * useProposals composable — CRUD and workflow actions on proposals
 */
import { generateId, generateProposalCode, getAdjectivalRating } from '~/utils/formatters'
import { getResubmitTargetStatus } from '~/utils/statusRules'
import { PROPOSAL_STATUSES, RETURN_STAGES } from '~/utils/constants'

const S = PROPOSAL_STATUSES

export const useProposals = () => {
  const { proposals, evaluations, saveProposals, saveEvaluations, addLog, addNotification, addComment } = useMockStorage()
  const { user } = useAuth()

  function getProposal(id: string) {
    return proposals.value.find(p => p.id === id)
  }

  function getProposalsByProponent(proponentId: string) {
    return proposals.value.filter(p => p.proponentId === proponentId)
  }

  function getProposalsByStatus(...statuses: string[]) {
    return proposals.value.filter(p => statuses.includes(p.status))
  }

  function createProposal(title: string) {
    const p: any = {
      id: generateId(),
      proposalCode: generateProposalCode(),
      title,
      proponentId: user.value?.id || '',
      proponentName: user.value?.name || '',
      typeOfScholarlyWork: '',
      status: S.DRAFT,
      currentStage: 'Proponent',
      return_to_stage: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submittedAt: null,
      forms: { fext001: { titleOfWork: title }, fext002: { projectTitle: title }, workFinancialPlan: [], fext004: { programTitle: title, personnel: [] } },
      attachments: [],
      nominatedEvaluators: [],
      confirmedEvaluators: [],
      evaluations: [],
      comments: [],
      revisionMatrix: [],
      statusHistory: [{ status: S.DRAFT, date: new Date().toISOString(), actor: user.value?.name || 'System' }],
      finalPdf: null,
      documentControl: null,
    }
    proposals.value.push(p)
    saveProposals()
    addLog('PROPOSAL_CREATED', user.value?.id || '', user.value?.name || '', p.id, `Created proposal ${p.proposalCode}`)
    return p
  }

  function updateProposal(id: string, updates: Record<string, any>) {
    const idx = proposals.value.findIndex(p => p.id === id)
    if (idx === -1) return
    proposals.value[idx] = { ...proposals.value[idx], ...updates, updatedAt: new Date().toISOString() }
    saveProposals()
  }

  function changeStatus(id: string, newStatus: string, actor: string, remarks?: string) {
    const idx = proposals.value.findIndex(p => p.id === id)
    if (idx === -1) return
    proposals.value[idx].status = newStatus
    proposals.value[idx].updatedAt = new Date().toISOString()
    proposals.value[idx].statusHistory.push({ status: newStatus, date: new Date().toISOString(), actor, remarks })
    saveProposals()
    addLog('STATUS_CHANGE', user.value?.id || '', actor, id, `Status changed to ${newStatus}`)
  }

  function submitProposal(id: string) {
    const p = getProposal(id)
    if (!p) return
    changeStatus(id, S.SUBMITTED, user.value?.name || '')
    updateProposal(id, { submittedAt: new Date().toISOString() })
  }

  function nominateEvaluators(id: string) {
    changeStatus(id, S.PENDING_EVALUATOR_CONFIRMATION, user.value?.name || '')
  }

  function confirmEvaluators(id: string) {
    const p = getProposal(id)
    if (!p) return
    // Create evaluation records for confirmed evaluators
    p.confirmedEvaluators.forEach(ev => {
      const exists = evaluations.value.find(e => e.proposalId === id && e.evaluatorUserId === ev.userId)
      if (!exists) {
        evaluations.value.push({
          id: generateId(),
          proposalId: id,
          evaluatorUserId: ev.userId,
          evaluatorName: ev.name,
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
        })
      }
    })
    saveEvaluations()
    changeStatus(id, S.UNDER_EVALUATION, user.value?.name || '')
    // Notify evaluators
    p.confirmedEvaluators.forEach(ev => {
      addNotification(ev.userId, 'Evaluation Assignment', `You have been assigned to evaluate "${p.title}".`, 'task', `/evaluations/${id}`)
    })
  }

  function submitEvaluation(evaluationId: string, data: any) {
    const idx = evaluations.value.findIndex(e => e.id === evaluationId)
    if (idx === -1) return
    const total = computeTotalScore(data.scores)
    const rating = getAdjectivalRating(total)
    evaluations.value[idx] = {
      ...evaluations.value[idx],
      ...data,
      totalScore: total,
      adjectivalRating: rating,
      recommendation: rating,
      dateOfEvaluation: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
      status: 'Completed',
    }
    saveEvaluations()

    // Check if all evaluations for this proposal are complete
    const proposalId = evaluations.value[idx].proposalId
    const allEvals = evaluations.value.filter(e => e.proposalId === proposalId)
    const allCompleted = allEvals.every(e => e.status === 'Completed')
    if (allCompleted) {
      const anyRevision = allEvals.some(e => e.adjectivalRating === 'Provisionary / For Revision' || e.adjectivalRating === 'Disapproved')
      if (anyRevision) {
        changeStatus(proposalId, S.FOR_REVISION, 'System', 'Evaluation requires revision')
        updateProposal(proposalId, { return_to_stage: RETURN_STAGES.EVALUATOR_REVIEW })
      } else {
        changeStatus(proposalId, S.EVALUATION_COMPLETED, 'System')
      }
      addNotification(getProposal(proposalId)?.proponentId || '', 'Evaluation Complete', `All evaluations for "${getProposal(proposalId)?.title}" are complete.`, 'info', `/proponent/proposals/${proposalId}`)
    }
  }

  function computeTotalScore(scores: Record<string, number>): number {
    // Simple average of scores (each scored 0-100, weighted by criteria)
    const weights: Record<string, number> = {
      proposalPresentation: 0.40,
      organization: 0.15,
      presentation: 0.05,
      content: 0.20,
      relevanceToDiscipline: 0.20,
      relevanceToRdeAgenda: 0.30,
      potentialBenefits: 0.10,
    }
    let total = 0
    let totalWeight = 0
    for (const [key, weight] of Object.entries(weights)) {
      total += (scores[key] || 0) * weight
      totalWeight += weight
    }
    return Math.round((total / totalWeight) * 100) / 100
  }

  function submitToDirector(id: string) {
    changeStatus(id, S.SUBMITTED_TO_DIRECTOR, user.value?.name || '')
  }

  function directorDecision(id: string, decision: 'endorse' | 'revise' | 'disapprove', remarks: string) {
    const actor = user.value?.name || ''
    addComment(id, user.value?.id || '', actor, 'Extension Director', remarks)
    if (decision === 'endorse') {
      changeStatus(id, S.UNDER_VPRIE_REVIEW, actor, remarks)
    } else if (decision === 'revise') {
      changeStatus(id, S.FOR_REVISION, actor, remarks)
      updateProposal(id, { return_to_stage: RETURN_STAGES.DIRECTOR_REVIEW })
    } else {
      changeStatus(id, S.DISAPPROVED, actor, remarks)
    }
  }

  function vprieDecision(id: string, decision: 'endorse' | 'revise' | 'disapprove', remarks: string) {
    const actor = user.value?.name || ''
    addComment(id, user.value?.id || '', actor, 'VPRIE', remarks)
    if (decision === 'endorse') {
      changeStatus(id, S.FOR_PRESIDENT_REVIEW, actor, remarks)
    } else if (decision === 'revise') {
      changeStatus(id, S.FOR_REVISION, actor, remarks)
      updateProposal(id, { return_to_stage: RETURN_STAGES.VPRIE_REVIEW })
    } else {
      changeStatus(id, S.DISAPPROVED, actor, remarks)
    }
  }

  function presidentDecision(id: string, decision: 'approve' | 'revise' | 'disapprove', remarks: string) {
    const actor = user.value?.name || ''
    addComment(id, user.value?.id || '', actor, 'President', remarks)
    if (decision === 'approve') {
      changeStatus(id, S.APPROVED, actor, remarks)
    } else if (decision === 'revise') {
      changeStatus(id, S.FOR_REVISION, actor, remarks)
      updateProposal(id, { return_to_stage: RETURN_STAGES.PRESIDENT_REVIEW })
    } else {
      changeStatus(id, S.DISAPPROVED, actor, remarks)
    }
  }

  function resubmit(id: string) {
    const p = getProposal(id)
    if (!p || !p.return_to_stage) return
    const targetStatus = getResubmitTargetStatus(p.return_to_stage)
    changeStatus(id, S.RESUBMITTED, user.value?.name || '', `Resubmitted to ${p.return_to_stage}`)
    // Immediately move to the target review stage
    setTimeout(() => {
      changeStatus(id, targetStatus, 'System', `Routed back to ${p.return_to_stage}`)
      updateProposal(id, { return_to_stage: null })
    }, 100)
  }

  function finalizeProposal(id: string) {
    const p = getProposal(id)
    if (!p) return
    const docControl = {
      proposalId: id,
      referenceId: p.proposalCode,
      documentControlNumber: `EXSIS-DOC-${Date.now().toString().slice(-6)}`,
      versionNumber: 'v1.0',
      generatedDate: new Date().toLocaleDateString(),
      generatedTime: new Date().toLocaleTimeString(),
      generatedBy: user.value?.name || 'System',
      verificationCode: `VER-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      fileStatus: 'Ready for Signing',
    }
    updateProposal(id, {
      finalPdf: { filename: `${p.proposalCode}_FINAL.pdf`, generatedAt: new Date().toISOString() },
      documentControl: docControl,
    })
    changeStatus(id, S.ARCHIVED, user.value?.name || 'System', 'Proposal finalized and archived')
    addLog('PROPOSAL_FINALIZED', user.value?.id || '', user.value?.name || '', id, `Finalized proposal ${p.proposalCode}`)
  }

  return {
    getProposal, getProposalsByProponent, getProposalsByStatus,
    createProposal, updateProposal, changeStatus,
    submitProposal, nominateEvaluators, confirmEvaluators,
    submitEvaluation, computeTotalScore,
    submitToDirector, directorDecision, vprieDecision, presidentDecision,
    resubmit, finalizeProposal,
    proposals, evaluations,
  }
}
