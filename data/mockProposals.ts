export interface MockProposal {
  id: string
  proposalCode: string
  title: string
  proponentId: string
  proponentName: string
  typeOfScholarlyWork: string
  status: string
  currentStage: string
  return_to_stage: string | null
  createdAt: string
  updatedAt: string
  submittedAt: string | null
  forms: {
    fext001: any
    fext002: any
    workFinancialPlan: any[]
    fext004: any
  }
  attachments: string[]
  nominatedEvaluators: any[]
  confirmedEvaluators: any[]
  evaluations: any[]
  comments: any[]
  revisionMatrix: any[]
  statusHistory: Array<{ status: string; date: string; actor: string; remarks?: string }>
  finalPdf: any | null
  documentControl: any | null
}

export const mockProposals: MockProposal[] = [
  {
    id: 'proposal-001',
    proposalCode: 'EXT-2026-0001',
    title: 'Community Digital Literacy Enhancement Program',
    proponentId: 'user-001',
    proponentName: 'Dr. Maria Santos',
    typeOfScholarlyWork: 'Extension',
    status: 'Under Evaluation',
    currentStage: 'Evaluator Review',
    return_to_stage: null,
    createdAt: '2026-03-15T08:00:00Z',
    updatedAt: '2026-04-10T10:30:00Z',
    submittedAt: '2026-03-20T09:00:00Z',
    forms: {
      fext001: {
        typeOfScholarlyWork: 'Extension',
        totalBudget: 250000,
        startDate: '2026-06-01',
        completionDate: '2026-12-31',
        projectLeader: 'Dr. Maria Santos',
        rank: 'Professor III',
        department: 'Computer Science',
        college: 'College of Engineering',
        email: 'maria.santos@univ.edu.ph',
        contactNumber: '09171234567',
        titleOfWork: 'Community Digital Literacy Enhancement Program',
        briefDescription: 'A comprehensive community extension program aimed at enhancing digital literacy skills among senior citizens and out-of-school youth in Barangay San Isidro. The program includes basic computer operation, internet safety, digital communication tools, and introduction to online government services.',
        similarWorkElsewhere: false,
        externalCollaboration: true,
        collaborationDetails: 'Partnership with Department of ICT Region III for resource sharing and trainer support.',
        submittedToAnotherAgency: false,
        firstTimeApply: true,
        additionalInfo: 'Program has already been coordinated with the Barangay Council.',
      },
      fext002: {
        projectTitle: 'Community Digital Literacy Enhancement Program',
        proposalType: 'Extension Program',
        rationale: 'Digital divide remains a significant challenge in rural communities. Senior citizens and OSY lack basic digital skills needed to access government services and employment opportunities.',
        objectives: '1. Enhance digital literacy of at least 100 community members\n2. Provide hands-on training on basic computer operations\n3. Train participants in online government service access\n4. Develop digital communication skills',
        targetBeneficiaries: 'Senior citizens and out-of-school youth in Barangay San Isidro, Municipality of Santa Rosa',
        implementationAddress: 'Barangay Hall, Barangay San Isidro, Santa Rosa, Laguna',
        implementationDate: '2026-06-01',
        projectDuration: '7 months',
        completionDate: '2026-12-31',
        methodology: 'Blended learning approach combining face-to-face sessions and guided practice. Weekly 3-hour sessions over 12 weeks per batch, two batches total.',
        expectedOutputs: 'Trained 100+ community members, training materials, post-training assessment reports, sustainability plan document',
        sustainabilityPlan: 'Partner with barangay LGU for continued training. Train local youth volunteers as digital literacy mentors.',
        monitoringPlan: 'Monthly progress reports, pre/post assessments, participant feedback surveys.',
        remarks: '',
      },
      workFinancialPlan: [
        { activity: 'Training Materials Development', startDate: '2026-06-01', endDate: '2026-06-30', expectedOutput: 'Training modules', responsiblePerson: 'Dr. Maria Santos', budgetItem: 'Supplies', quantity: 1, unitCost: 30000, totalCost: 30000, fundingSource: 'University Fund', remarks: '' },
        { activity: 'Batch 1 Training Sessions', startDate: '2026-07-01', endDate: '2026-09-30', expectedOutput: '50 trained participants', responsiblePerson: 'Team', budgetItem: 'Training expenses', quantity: 12, unitCost: 8000, totalCost: 96000, fundingSource: 'University Fund', remarks: '' },
        { activity: 'Batch 2 Training Sessions', startDate: '2026-10-01', endDate: '2026-12-15', expectedOutput: '50 trained participants', responsiblePerson: 'Team', budgetItem: 'Training expenses', quantity: 12, unitCost: 8000, totalCost: 96000, fundingSource: 'University Fund', remarks: '' },
        { activity: 'Assessment & Documentation', startDate: '2026-12-16', endDate: '2026-12-31', expectedOutput: 'Final report', responsiblePerson: 'Dr. Maria Santos', budgetItem: 'Documentation', quantity: 1, unitCost: 28000, totalCost: 28000, fundingSource: 'University Fund', remarks: '' },
      ],
      fext004: {
        programTitle: 'Community Digital Literacy Enhancement Program',
        implementingAgency: 'College of Engineering - Computer Science Department',
        projectLeader: 'Dr. Maria Santos',
        certifiedByLeader: true,
        dateCertified: '2026-03-18',
        attestedByCoordinator: false,
        dateAttested: null,
        receivedByDirector: false,
        dateReceived: null,
        personnel: [
          { name: 'Dr. Maria Santos', gender: 'Female', designationOffice: 'Professor III', designationProject: 'Project Leader', remunerationOffice: 65000, remunerationProject: 15000, timePercentProject: 30, timePercentOther: 70, educationalAttainment: 'PhD Computer Science', type: 'Faculty', source: 'mock' },
          { name: 'Engr. Paolo Rivera', gender: 'Male', designationOffice: 'Instructor I', designationProject: 'Trainer', remunerationOffice: 35000, remunerationProject: 8000, timePercentProject: 20, timePercentOther: 80, educationalAttainment: 'MS Information Technology', type: 'Faculty', source: 'mock' },
          { name: 'Anna Cruz', gender: 'Female', designationOffice: 'Student', designationProject: 'Assistant Trainer', remunerationOffice: 0, remunerationProject: 3000, timePercentProject: 15, timePercentOther: 85, educationalAttainment: 'BS Computer Science (4th Year)', type: 'Student', source: 'manual' },
        ],
      },
    },
    attachments: ['cv_santos.pdf', 'barangay_endorsement.pdf'],
    nominatedEvaluators: [
      { userId: 'user-007', name: 'Prof. Ana Villanueva', type: 'Faculty', nominatedBy: 'Dr. Maria Santos', dateNominated: '2026-03-20', notes: 'Expert in community development programs' },
      { userId: 'user-008', name: 'Dr. Ricardo Lim', type: 'Qualified Reviewer', nominatedBy: 'Dr. Maria Santos', dateNominated: '2026-03-20', notes: 'Published in extension services research' },
    ],
    confirmedEvaluators: [
      { userId: 'user-007', name: 'Prof. Ana Villanueva', confirmedAt: '2026-03-25' },
      { userId: 'user-008', name: 'Dr. Ricardo Lim', confirmedAt: '2026-03-25' },
    ],
    evaluations: [],
    comments: [
      { id: 'c1', proposalId: 'proposal-001', userId: 'user-003', userName: 'Dr. Elena Cruz', role: 'Extension Director', content: 'Evaluator nominations confirmed. Proceeding to evaluation.', createdAt: '2026-03-25T14:00:00Z' },
    ],
    revisionMatrix: [],
    statusHistory: [
      { status: 'Draft', date: '2026-03-15T08:00:00Z', actor: 'Dr. Maria Santos' },
      { status: 'Submitted', date: '2026-03-20T09:00:00Z', actor: 'Dr. Maria Santos' },
      { status: 'Pending Evaluator Confirmation', date: '2026-03-20T09:05:00Z', actor: 'System' },
      { status: 'Under Evaluation', date: '2026-03-25T14:00:00Z', actor: 'Dr. Elena Cruz' },
    ],
    finalPdf: null,
    documentControl: null,
  },
  {
    id: 'proposal-002',
    proposalCode: 'EXT-2026-0002',
    title: 'Sustainable Urban Farming Workshop Series',
    proponentId: 'user-001',
    proponentName: 'Dr. Maria Santos',
    typeOfScholarlyWork: 'Extension',
    status: 'Draft',
    currentStage: 'Proponent',
    return_to_stage: null,
    createdAt: '2026-04-20T10:00:00Z',
    updatedAt: '2026-04-20T10:00:00Z',
    submittedAt: null,
    forms: {
      fext001: { typeOfScholarlyWork: 'Extension', totalBudget: 0, titleOfWork: 'Sustainable Urban Farming Workshop Series' },
      fext002: { projectTitle: 'Sustainable Urban Farming Workshop Series' },
      workFinancialPlan: [],
      fext004: { programTitle: 'Sustainable Urban Farming Workshop Series', personnel: [] },
    },
    attachments: [],
    nominatedEvaluators: [],
    confirmedEvaluators: [],
    evaluations: [],
    comments: [],
    revisionMatrix: [],
    statusHistory: [
      { status: 'Draft', date: '2026-04-20T10:00:00Z', actor: 'Dr. Maria Santos' },
    ],
    finalPdf: null,
    documentControl: null,
  },
  {
    id: 'proposal-003',
    proposalCode: 'EXT-2026-0003',
    title: 'Tech Livelihood Skills Training for Indigenous Communities',
    proponentId: 'user-001',
    proponentName: 'Dr. Maria Santos',
    typeOfScholarlyWork: 'Extension',
    status: 'Approved',
    currentStage: 'Finalization',
    return_to_stage: null,
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-04-15T16:00:00Z',
    submittedAt: '2026-01-15T09:00:00Z',
    forms: {
      fext001: { typeOfScholarlyWork: 'Extension', totalBudget: 180000, titleOfWork: 'Tech Livelihood Skills Training for Indigenous Communities' },
      fext002: { projectTitle: 'Tech Livelihood Skills Training for Indigenous Communities', proposalType: 'Extension Program', rationale: 'Indigenous communities need accessible technology livelihood skills.' },
      workFinancialPlan: [
        { activity: 'Needs Assessment', startDate: '2026-05-01', endDate: '2026-05-15', expectedOutput: 'Assessment report', responsiblePerson: 'Dr. Santos', budgetItem: 'Travel', quantity: 3, unitCost: 5000, totalCost: 15000, fundingSource: 'University Fund', remarks: '' },
      ],
      fext004: { programTitle: 'Tech Livelihood Skills Training', personnel: [] },
    },
    attachments: ['cv_santos.pdf'],
    nominatedEvaluators: [],
    confirmedEvaluators: [],
    evaluations: [],
    comments: [],
    revisionMatrix: [],
    statusHistory: [
      { status: 'Draft', date: '2026-01-10T08:00:00Z', actor: 'Dr. Maria Santos' },
      { status: 'Submitted', date: '2026-01-15T09:00:00Z', actor: 'Dr. Maria Santos' },
      { status: 'Under Evaluation', date: '2026-01-20T10:00:00Z', actor: 'Dr. Elena Cruz' },
      { status: 'Evaluation Completed', date: '2026-02-15T10:00:00Z', actor: 'System' },
      { status: 'Submitted to Extension Director', date: '2026-02-20T10:00:00Z', actor: 'Dr. Maria Santos' },
      { status: 'Under VPRIE Review', date: '2026-03-01T10:00:00Z', actor: 'Dr. Elena Cruz' },
      { status: 'For President Review', date: '2026-03-15T10:00:00Z', actor: 'Dr. Roberto Mendoza' },
      { status: 'Approved', date: '2026-04-15T16:00:00Z', actor: 'Dr. Carmen Aquino' },
    ],
    finalPdf: null,
    documentControl: null,
  },
]
