export const mockPermissions = {
  roles: [
    { role: 'Proponent', permissions: ['proposal.create', 'proposal.edit', 'proposal.submit', 'proposal.view_own', 'evaluator.nominate', 'revision.submit'] },
    { role: 'College Extension Coordinator', permissions: ['fext004.attest', 'proposal.view_college', 'coordination.view', 'evaluation.fill'] },
    { role: 'Extension Director / Division Chief', permissions: ['evaluator.confirm', 'proposal.review', 'proposal.endorse', 'proposal.return', 'proposal.disapprove'] },
    { role: 'VPRIE', permissions: ['proposal.review', 'proposal.endorse', 'proposal.return', 'proposal.disapprove'] },
    { role: 'President', permissions: ['proposal.review', 'proposal.approve', 'proposal.return', 'proposal.disapprove'] },
    { role: 'System Administrator', permissions: ['admin.users', 'admin.rbac', 'admin.logs', 'admin.document_control', 'admin.all'] },
    { role: 'Faculty / Evaluator Candidate', permissions: ['evaluation.fill', 'evaluation.view_assigned'] },
  ],
}
