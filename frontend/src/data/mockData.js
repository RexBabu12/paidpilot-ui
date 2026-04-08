// Mock data for the entire platform

export const mockJobs = [
  {
    id: 1,
    title: 'Senior Java Developer',
    company: 'TechCorp Solutions',
    recruiter: 'Sarah Johnson',
    recruiterEmail: 'sarah.j@techcorp.com',
    recruiterPhone: '+1 (555) 123-4567',
    engagementType: 'C2C',
    workMode: 'Remote',
    location: 'Dallas, TX',
    rate: '$85/hr',
    skills: ['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker'],
    experience: '8+ years',
    visaStatus: 'USC, GC, H1B',
    postedDate: '2 hours ago',
    matchScore: 95,
    description: 'Looking for experienced Java developer with strong microservices background. Must have hands-on AWS experience and excellent communication skills.',
    source: 'LinkedIn',
    status: 'New'
  },
  {
    id: 2,
    title: 'React Frontend Engineer',
    company: 'Digital Innovations',
    recruiter: 'Michael Chen',
    recruiterEmail: 'michael@digitalinnov.com',
    recruiterPhone: '+1 (555) 234-5678',
    engagementType: 'W2',
    workMode: 'Hybrid',
    location: 'Austin, TX',
    rate: '$75/hr',
    skills: ['React', 'TypeScript', 'Redux', 'Material-UI', 'Node.js'],
    experience: '5+ years',
    visaStatus: 'USC, GC',
    postedDate: '5 hours ago',
    matchScore: 88,
    description: 'Seeking talented React developer for a fast-paced fintech project. Must have experience with TypeScript and state management.',
    source: 'LinkedIn',
    status: 'New'
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    company: 'CloudScale Inc',
    recruiter: 'Jennifer Martinez',
    recruiterEmail: 'jmartinez@cloudscale.com',
    recruiterPhone: '+1 (555) 345-6789',
    engagementType: 'C2C',
    workMode: 'Remote',
    location: 'Remote, USA',
    rate: '$90/hr',
    skills: ['Kubernetes', 'Jenkins', 'AWS', 'Terraform', 'Python'],
    experience: '6+ years',
    visaStatus: 'Any',
    postedDate: '1 day ago',
    matchScore: 82,
    description: 'DevOps role focused on cloud infrastructure automation. Heavy Kubernetes and CI/CD pipeline experience required.',
    source: 'Dice',
    status: 'Reviewed'
  },
  {
    id: 4,
    title: 'Full Stack .NET Developer',
    company: 'Enterprise Systems',
    recruiter: 'David Wilson',
    recruiterEmail: 'dwilson@entsys.com',
    recruiterPhone: '+1 (555) 456-7890',
    engagementType: 'Both',
    workMode: 'Onsite',
    location: 'Chicago, IL',
    rate: '$80/hr',
    skills: ['.NET Core', 'C#', 'Angular', 'SQL Server', 'Azure'],
    experience: '7+ years',
    visaStatus: 'USC, GC, H1B',
    postedDate: '3 hours ago',
    matchScore: 78,
    description: 'Full stack developer needed for enterprise modernization project. Strong .NET and Angular skills essential.',
    source: 'LinkedIn',
    status: 'New'
  },
  {
    id: 5,
    title: 'Python Data Engineer',
    company: 'DataStream Analytics',
    recruiter: 'Lisa Anderson',
    recruiterEmail: 'landerson@datastream.com',
    recruiterPhone: '+1 (555) 567-8901',
    engagementType: 'C2C',
    workMode: 'Remote',
    location: 'San Francisco, CA',
    rate: '$95/hr',
    skills: ['Python', 'Spark', 'Airflow', 'AWS', 'SQL'],
    experience: '5+ years',
    visaStatus: 'USC, GC',
    postedDate: '6 hours ago',
    matchScore: 91,
    description: 'Data engineer role building scalable data pipelines. Experience with Spark and cloud platforms required.',
    source: 'LinkedIn',
    status: 'Matched'
  }
];

export const mockRecruiters = [
  {
    id: 1,
    name: 'Sarah Johnson',
    company: 'TechCorp Solutions',
    email: 'sarah.j@techcorp.com',
    phone: '+1 (555) 123-4567',
    linkedIn: 'https://linkedin.com/in/sarahjohnson',
    totalPosts: 47,
    lastActive: '2 hours ago',
    commonRoles: ['Java Developer', 'Spring Boot', 'Backend'],
    commonLocations: ['Dallas', 'Austin', 'Houston'],
    engagementPreference: 'C2C',
    responseRate: 78
  },
  {
    id: 2,
    name: 'Michael Chen',
    company: 'Digital Innovations',
    email: 'michael@digitalinnov.com',
    phone: '+1 (555) 234-5678',
    linkedIn: 'https://linkedin.com/in/michaelchen',
    totalPosts: 32,
    lastActive: '5 hours ago',
    commonRoles: ['Frontend', 'React', 'UI/UX'],
    commonLocations: ['Austin', 'Remote'],
    engagementPreference: 'W2',
    responseRate: 85
  },
  {
    id: 3,
    name: 'Jennifer Martinez',
    company: 'CloudScale Inc',
    email: 'jmartinez@cloudscale.com',
    phone: '+1 (555) 345-6789',
    linkedIn: 'https://linkedin.com/in/jennifermartinez',
    totalPosts: 65,
    lastActive: '1 day ago',
    commonRoles: ['DevOps', 'Cloud Engineer', 'SRE'],
    commonLocations: ['Remote', 'Nationwide'],
    engagementPreference: 'C2C',
    responseRate: 72
  }
];

export const mockCandidates = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh.k@email.com',
    phone: '+1 (555) 111-2222',
    title: 'Senior Java Developer',
    experience: '10 years',
    location: 'Dallas, TX',
    skills: ['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker', 'Kubernetes'],
    visaStatus: 'H1B',
    availability: 'Immediate',
    preferredEngagement: 'C2C',
    rate: '$85/hr',
    matchCount: 12,
    lastUpdated: '2 days ago',
    status: 'Available'
  },
  {
    id: 2,
    name: 'Maria Garcia',
    email: 'maria.g@email.com',
    phone: '+1 (555) 222-3333',
    title: 'React Frontend Developer',
    experience: '6 years',
    location: 'Austin, TX',
    skills: ['React', 'TypeScript', 'Redux', 'Node.js', 'GraphQL'],
    visaStatus: 'USC',
    availability: '2 weeks',
    preferredEngagement: 'W2',
    rate: '$75/hr',
    matchCount: 8,
    lastUpdated: '1 day ago',
    status: 'Available'
  },
  {
    id: 3,
    name: 'David Park',
    email: 'david.p@email.com',
    phone: '+1 (555) 333-4444',
    title: 'DevOps Engineer',
    experience: '8 years',
    location: 'Remote',
    skills: ['Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'Python', 'Docker'],
    visaStatus: 'GC',
    availability: 'Immediate',
    preferredEngagement: 'C2C',
    rate: '$90/hr',
    matchCount: 15,
    lastUpdated: 'Today',
    status: 'Available'
  }
];

export const mockApplications = [
  {
    id: 1,
    jobTitle: 'Senior Java Developer',
    company: 'TechCorp Solutions',
    recruiter: 'Sarah Johnson',
    status: 'Sent',
    sentDate: '2024-01-15',
    followUpDate: '2024-01-22',
    lastResponse: null,
    resumeVersion: 'Java_Senior_v3.pdf'
  },
  {
    id: 2,
    jobTitle: 'React Frontend Engineer',
    company: 'Digital Innovations',
    recruiter: 'Michael Chen',
    status: 'Replied',
    sentDate: '2024-01-14',
    followUpDate: null,
    lastResponse: '2024-01-16',
    resumeVersion: 'React_Frontend_v2.pdf'
  },
  {
    id: 3,
    jobTitle: 'DevOps Engineer',
    company: 'CloudScale Inc',
    recruiter: 'Jennifer Martinez',
    status: 'Follow-up',
    sentDate: '2024-01-10',
    followUpDate: '2024-01-17',
    lastResponse: null,
    resumeVersion: 'DevOps_v1.pdf'
  }
];

export const mockEmailTemplates = [
  {
    id: 1,
    name: 'Initial Outreach',
    subject: 'Application for {{job_title}} - {{candidate_name}}',
    body: 'Dear {{recruiter_name}},\n\nI am reaching out regarding the {{job_title}} position at {{company_name}}. With {{experience}} years of experience in {{key_skills}}, I believe I would be an excellent fit for this role.\n\nMy background includes:\n- {{highlight_1}}\n- {{highlight_2}}\n- {{highlight_3}}\n\nI am available for {{engagement_type}} and can start {{availability}}.\n\nPlease find my resume attached. I look forward to discussing this opportunity further.\n\nBest regards,\n{{candidate_name}}',
    category: 'Candidate Outreach'
  },
  {
    id: 2,
    name: 'Follow-up Email',
    subject: 'Following up: {{job_title}} Application',
    body: 'Dear {{recruiter_name}},\n\nI wanted to follow up on my application for the {{job_title}} position I sent on {{sent_date}}.\n\nI remain very interested in this opportunity and would love to discuss how my skills align with your requirements.\n\nPlease let me know if you need any additional information.\n\nBest regards,\n{{candidate_name}}',
    category: 'Follow-up'
  },
  {
    id: 3,
    name: 'Candidate Submission',
    subject: 'Candidate Submission: {{candidate_name}} for {{job_title}}',
    body: 'Hello {{recruiter_name}},\n\nI would like to submit {{candidate_name}} for the {{job_title}} position.\n\nCandidate Highlights:\n- {{experience}} of relevant experience\n- Core skills: {{key_skills}}\n- {{visa_status}} authorization\n- Available: {{availability}}\n- Rate: {{rate}}\n\nResume attached. Please let me know if you would like to schedule an interview.\n\nBest regards,\n{{sender_name}}\n{{company_name}}',
    category: 'Business Submission'
  }
];

export const mockOutreachActivity = [
  {
    id: 1,
    type: 'email_sent',
    candidate: 'Rajesh Kumar',
    job: 'Senior Java Developer',
    recruiter: 'Sarah Johnson',
    timestamp: '2024-01-15 10:30 AM',
    status: 'Delivered',
    automationRule: 'Auto-send approved candidates'
  },
  {
    id: 2,
    type: 'email_opened',
    candidate: 'Maria Garcia',
    job: 'React Frontend Engineer',
    recruiter: 'Michael Chen',
    timestamp: '2024-01-15 11:45 AM',
    status: 'Opened',
    automationRule: null
  },
  {
    id: 3,
    type: 'reply_received',
    candidate: 'David Park',
    job: 'DevOps Engineer',
    recruiter: 'Jennifer Martinez',
    timestamp: '2024-01-15 02:15 PM',
    status: 'Positive Response',
    automationRule: null
  }
];

export const mockAnalytics = {
  jobsScraped: {
    today: 127,
    week: 843,
    month: 3421,
    trend: '+12%'
  },
  qualifiedLeads: {
    today: 89,
    week: 612,
    month: 2534,
    trend: '+8%'
  },
  candidateMatches: {
    today: 34,
    week: 245,
    month: 1032,
    trend: '+15%'
  },
  emailsSent: {
    today: 45,
    week: 312,
    month: 1289,
    trend: '+22%'
  },
  responseRate: {
    percentage: 18,
    trend: '+3%'
  },
  topSkills: [
    { skill: 'Java', count: 234 },
    { skill: 'Python', count: 189 },
    { skill: 'React', count: 167 },
    { skill: 'AWS', count: 156 },
    { skill: 'DevOps', count: 142 }
  ],
  topLocations: [
    { location: 'Remote', count: 412 },
    { location: 'Dallas, TX', count: 156 },
    { location: 'Austin, TX', count: 134 },
    { location: 'Chicago, IL', count: 98 },
    { location: 'San Francisco, CA', count: 87 }
  ]
};

// Business-specific mock data for multi-candidate consultancy management
export const mockBusinessCandidates = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    title: 'Senior Java Developer',
    email: 'rajesh.k@email.com',
    phone: '+1 (555) 111-2222',
    skills: ['Java', 'Spring Boot', 'AWS', 'Microservices', 'Docker'],
    experience: '10 years',
    location: 'Dallas, TX',
    visaStatus: 'H1B',
    rate: '$85/hr',
    availability: 'Immediate',
    pipelineStatus: 'Submitted',
    activeSubmissions: 4,
    interviewsScheduled: 2,
    totalPlacements: 3,
    revenue: '$124,800',
    resumeVersions: 3,
    accountManager: 'Amy Roberts',
    lastActive: '2 hours ago',
    joinedDate: 'Jan 2024',
    notes: 'Strong backend. Prefers remote C2C roles in fintech.',
    submissions: [
      { job: 'Sr Java Dev - TechCorp', status: 'Interview', date: '2 days ago' },
      { job: 'Backend Eng - CloudScale', status: 'Submitted', date: '3 days ago' },
      { job: 'Java Architect - FinServ', status: 'Screening', date: '5 days ago' },
      { job: 'Lead Dev - Enterprise Sys', status: 'Rejected', date: '1 week ago' }
    ]
  },
  {
    id: 2,
    name: 'Maria Garcia',
    title: 'React Frontend Developer',
    email: 'maria.g@email.com',
    phone: '+1 (555) 222-3333',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Redux'],
    experience: '6 years',
    location: 'Austin, TX',
    visaStatus: 'USC',
    rate: '$75/hr',
    availability: '2 weeks',
    pipelineStatus: 'Interviewing',
    activeSubmissions: 3,
    interviewsScheduled: 1,
    totalPlacements: 1,
    revenue: '$48,000',
    resumeVersions: 2,
    accountManager: 'Amy Roberts',
    lastActive: '5 hours ago',
    joinedDate: 'Mar 2024',
    notes: 'Excellent React skills. Open to hybrid in Austin area.',
    submissions: [
      { job: 'React Dev - Digital Innovations', status: 'Interview', date: '1 day ago' },
      { job: 'Frontend Lead - PayTech', status: 'Submitted', date: '4 days ago' },
      { job: 'UI Eng - SaaS Corp', status: 'Screening', date: '6 days ago' }
    ]
  },
  {
    id: 3,
    name: 'David Park',
    title: 'DevOps Engineer',
    email: 'david.p@email.com',
    phone: '+1 (555) 333-4444',
    skills: ['Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'Python'],
    experience: '8 years',
    location: 'Remote',
    visaStatus: 'GC',
    rate: '$90/hr',
    availability: 'Immediate',
    pipelineStatus: 'Available',
    activeSubmissions: 2,
    interviewsScheduled: 0,
    totalPlacements: 5,
    revenue: '$216,000',
    resumeVersions: 4,
    accountManager: 'James Liu',
    lastActive: '1 day ago',
    joinedDate: 'Nov 2023',
    notes: 'Top performer on bench. Specializes in cloud migration projects.',
    submissions: [
      { job: 'DevOps Lead - CloudScale', status: 'Submitted', date: '2 days ago' },
      { job: 'SRE - Netflix Partner', status: 'Screening', date: '5 days ago' }
    ]
  },
  {
    id: 4,
    name: 'Priya Sharma',
    title: 'Data Scientist',
    email: 'priya.s@email.com',
    phone: '+1 (555) 444-5555',
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Spark'],
    experience: '5 years',
    location: 'San Francisco, CA',
    visaStatus: 'H1B',
    rate: '$95/hr',
    availability: '1 month',
    pipelineStatus: 'Placed',
    activeSubmissions: 0,
    interviewsScheduled: 0,
    totalPlacements: 2,
    revenue: '$182,400',
    resumeVersions: 2,
    accountManager: 'James Liu',
    lastActive: '3 hours ago',
    joinedDate: 'Feb 2024',
    notes: 'Currently placed at DataStream. Contract ends in 3 months.',
    submissions: []
  },
  {
    id: 5,
    name: 'Michael Chen',
    title: 'Full Stack Developer',
    email: 'michael.c@email.com',
    phone: '+1 (555) 555-6666',
    skills: ['.NET', 'Angular', 'Azure', 'SQL Server', 'C#'],
    experience: '9 years',
    location: 'Chicago, IL',
    visaStatus: 'USC',
    rate: '$80/hr',
    availability: 'Immediate',
    pipelineStatus: 'Submitted',
    activeSubmissions: 5,
    interviewsScheduled: 1,
    totalPlacements: 4,
    revenue: '$192,000',
    resumeVersions: 3,
    accountManager: 'Amy Roberts',
    lastActive: '6 hours ago',
    joinedDate: 'Sep 2023',
    notes: 'Strong .NET background. Prefers onsite Chicago roles.',
    submissions: [
      { job: '.NET Dev - Enterprise Sys', status: 'Interview', date: '1 day ago' },
      { job: 'Full Stack - FinCorp', status: 'Submitted', date: '3 days ago' },
      { job: 'Angular Dev - ConsultCo', status: 'Submitted', date: '4 days ago' },
      { job: 'Backend Dev - TradeTech', status: 'Screening', date: '5 days ago' },
      { job: 'Sr Dev - BankSoft', status: 'Rejected', date: '1 week ago' }
    ]
  },
  {
    id: 6,
    name: 'Sarah Johnson',
    title: 'QA Automation Engineer',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 666-7777',
    skills: ['Selenium', 'Java', 'API Testing', 'Cypress', 'JIRA'],
    experience: '7 years',
    location: 'Dallas, TX',
    visaStatus: 'GC',
    rate: '$70/hr',
    availability: '2 weeks',
    pipelineStatus: 'Interviewing',
    activeSubmissions: 3,
    interviewsScheduled: 2,
    totalPlacements: 2,
    revenue: '$67,200',
    resumeVersions: 2,
    accountManager: 'James Liu',
    lastActive: '4 hours ago',
    joinedDate: 'Apr 2024',
    notes: 'Great QA lead. Has ISTQB certification.',
    submissions: [
      { job: 'QA Lead - TestPro', status: 'Interview', date: '1 day ago' },
      { job: 'SDET - AutoCorp', status: 'Interview', date: '2 days ago' },
      { job: 'QA Eng - HealthTech', status: 'Submitted', date: '4 days ago' }
    ]
  },
  {
    id: 7,
    name: 'Ahmed Hassan',
    title: 'Cloud Architect',
    email: 'ahmed.h@email.com',
    phone: '+1 (555) 777-8888',
    skills: ['AWS', 'Azure', 'GCP', 'Terraform', 'Docker', 'Kubernetes'],
    experience: '12 years',
    location: 'Remote',
    visaStatus: 'USC',
    rate: '$110/hr',
    availability: 'Immediate',
    pipelineStatus: 'Available',
    activeSubmissions: 1,
    interviewsScheduled: 0,
    totalPlacements: 6,
    revenue: '$396,000',
    resumeVersions: 5,
    accountManager: 'Amy Roberts',
    lastActive: '1 hour ago',
    joinedDate: 'Jun 2023',
    notes: 'Senior architect. AWS Solutions Architect Pro certified.',
    submissions: [
      { job: 'Cloud Architect - MegaCorp', status: 'Screening', date: '3 days ago' }
    ]
  },
  {
    id: 8,
    name: 'Lisa Wang',
    title: 'Salesforce Developer',
    email: 'lisa.w@email.com',
    phone: '+1 (555) 888-9999',
    skills: ['Salesforce', 'Apex', 'Lightning', 'SOQL', 'JavaScript'],
    experience: '6 years',
    location: 'Houston, TX',
    visaStatus: 'H1B',
    rate: '$88/hr',
    availability: '3 weeks',
    pipelineStatus: 'Submitted',
    activeSubmissions: 2,
    interviewsScheduled: 0,
    totalPlacements: 1,
    revenue: '$42,240',
    resumeVersions: 2,
    accountManager: 'James Liu',
    lastActive: '8 hours ago',
    joinedDate: 'May 2024',
    notes: 'Salesforce certified. Looking for CPQ or Service Cloud projects.',
    submissions: [
      { job: 'SF Dev - CRMCorp', status: 'Submitted', date: '2 days ago' },
      { job: 'SF Admin - RetailPro', status: 'Screening', date: '5 days ago' }
    ]
  },
  {
    id: 9,
    name: 'Carlos Rivera',
    title: 'SAP Consultant',
    email: 'carlos.r@email.com',
    phone: '+1 (555) 999-0000',
    skills: ['SAP FICO', 'SAP S/4HANA', 'ABAP', 'SAP BW', 'SQL'],
    experience: '11 years',
    location: 'New York, NY',
    visaStatus: 'GC',
    rate: '$105/hr',
    availability: 'Immediate',
    pipelineStatus: 'Placed',
    activeSubmissions: 0,
    interviewsScheduled: 0,
    totalPlacements: 4,
    revenue: '$302,400',
    resumeVersions: 3,
    accountManager: 'Amy Roberts',
    lastActive: '2 days ago',
    joinedDate: 'Aug 2023',
    notes: 'Currently on a 6-month SAP migration project. Ends March.',
    submissions: []
  },
  {
    id: 10,
    name: 'Anika Patel',
    title: 'Business Analyst',
    email: 'anika.p@email.com',
    phone: '+1 (555) 000-1111',
    skills: ['Agile', 'JIRA', 'SQL', 'Tableau', 'Requirements Gathering'],
    experience: '4 years',
    location: 'Remote',
    visaStatus: 'H1B',
    rate: '$65/hr',
    availability: 'Immediate',
    pipelineStatus: 'Available',
    activeSubmissions: 3,
    interviewsScheduled: 1,
    totalPlacements: 0,
    revenue: '$0',
    resumeVersions: 1,
    accountManager: 'James Liu',
    lastActive: '30 min ago',
    joinedDate: 'Jul 2024',
    notes: 'New to bench. Strong communication skills. CSPO certified.',
    submissions: [
      { job: 'BA - FinTech Corp', status: 'Interview', date: '1 day ago' },
      { job: 'Scrum Master - AgileX', status: 'Submitted', date: '3 days ago' },
      { job: 'Analyst - DataDriven', status: 'Screening', date: '4 days ago' }
    ]
  }
];

export const mockBusinessMatches = [
  { id: 1, candidateId: 1, candidateName: 'Rajesh Kumar', jobTitle: 'Sr Java Developer', company: 'TechCorp', matchScore: 95, rate: '$85/hr', status: 'Submitted', recruiter: 'Sarah Johnson' },
  { id: 2, candidateId: 1, candidateName: 'Rajesh Kumar', jobTitle: 'Java Architect', company: 'FinServ Inc', matchScore: 88, rate: '$90/hr', status: 'New', recruiter: 'David Wilson' },
  { id: 3, candidateId: 2, candidateName: 'Maria Garcia', jobTitle: 'React Frontend Lead', company: 'Digital Innovations', matchScore: 92, rate: '$78/hr', status: 'Interview', recruiter: 'Michael Chen' },
  { id: 4, candidateId: 3, candidateName: 'David Park', jobTitle: 'DevOps Lead', company: 'CloudScale', matchScore: 90, rate: '$92/hr', status: 'New', recruiter: 'Jennifer Martinez' },
  { id: 5, candidateId: 5, candidateName: 'Michael Chen', jobTitle: '.NET Architect', company: 'Enterprise Systems', matchScore: 87, rate: '$82/hr', status: 'Submitted', recruiter: 'David Wilson' },
  { id: 6, candidateId: 6, candidateName: 'Sarah Johnson', jobTitle: 'QA Lead', company: 'TestPro Solutions', matchScore: 93, rate: '$72/hr', status: 'Interview', recruiter: 'Lisa Anderson' },
  { id: 7, candidateId: 7, candidateName: 'Ahmed Hassan', jobTitle: 'Cloud Solutions Architect', company: 'MegaCorp', matchScore: 96, rate: '$115/hr', status: 'New', recruiter: 'Sarah Johnson' },
  { id: 8, candidateId: 8, candidateName: 'Lisa Wang', jobTitle: 'Salesforce Dev', company: 'CRM Corp', matchScore: 85, rate: '$88/hr', status: 'Submitted', recruiter: 'Michael Chen' },
  { id: 9, candidateId: 10, candidateName: 'Anika Patel', jobTitle: 'Business Analyst', company: 'FinTech Corp', matchScore: 82, rate: '$68/hr', status: 'Interview', recruiter: 'Jennifer Martinez' },
  { id: 10, candidateId: 3, candidateName: 'David Park', jobTitle: 'SRE Engineer', company: 'StreamNet', matchScore: 84, rate: '$90/hr', status: 'New', recruiter: 'Lisa Anderson' },
  { id: 11, candidateId: 5, candidateName: 'Michael Chen', jobTitle: 'Full Stack Lead', company: 'FinCorp', matchScore: 89, rate: '$85/hr', status: 'New', recruiter: 'Sarah Johnson' },
  { id: 12, candidateId: 2, candidateName: 'Maria Garcia', jobTitle: 'UI Engineer', company: 'SaaS Corp', matchScore: 86, rate: '$76/hr', status: 'Submitted', recruiter: 'David Wilson' }
];

export const mockTeamMembers = [
  { id: 1, name: 'Amy Roberts', role: 'Account Manager', email: 'amy.r@staffpro.com', phone: '+1 (555) 100-2000', candidatesManaged: 5, activeDeals: 8, closedDeals: 23, revenue: '$1.2M', status: 'Active', joinedDate: 'Jan 2023', avatar: 'AR' },
  { id: 2, name: 'James Liu', role: 'Account Manager', email: 'james.l@staffpro.com', phone: '+1 (555) 200-3000', candidatesManaged: 5, activeDeals: 6, closedDeals: 18, revenue: '$890K', status: 'Active', joinedDate: 'Mar 2023', avatar: 'JL' },
  { id: 3, name: 'Nina Patel', role: 'Recruiter', email: 'nina.p@staffpro.com', phone: '+1 (555) 300-4000', candidatesManaged: 0, activeDeals: 12, closedDeals: 31, revenue: '$1.5M', status: 'Active', joinedDate: 'Nov 2022', avatar: 'NP' },
  { id: 4, name: 'Tom Bradley', role: 'Business Development', email: 'tom.b@staffpro.com', phone: '+1 (555) 400-5000', candidatesManaged: 0, activeDeals: 15, closedDeals: 42, revenue: '$2.1M', status: 'Active', joinedDate: 'Jun 2022', avatar: 'TB' },
  { id: 5, name: 'Sarah Kim', role: 'Operations Lead', email: 'sarah.k@staffpro.com', phone: '+1 (555) 500-6000', candidatesManaged: 0, activeDeals: 3, closedDeals: 9, revenue: '$450K', status: 'Active', joinedDate: 'Sep 2023', avatar: 'SK' }
];

export const mockCandidateAnalytics = [
  { candidateId: 1, name: 'Rajesh Kumar', submissions: 18, interviews: 6, placements: 3, conversionRate: 16.7, avgTimeToPlace: 22, revenue: 124800, trend: '+12%' },
  { candidateId: 2, name: 'Maria Garcia', submissions: 12, interviews: 4, placements: 1, conversionRate: 8.3, avgTimeToPlace: 30, revenue: 48000, trend: '+8%' },
  { candidateId: 3, name: 'David Park', submissions: 24, interviews: 10, placements: 5, conversionRate: 20.8, avgTimeToPlace: 18, revenue: 216000, trend: '+22%' },
  { candidateId: 4, name: 'Priya Sharma', submissions: 8, interviews: 3, placements: 2, conversionRate: 25.0, avgTimeToPlace: 25, revenue: 182400, trend: '+15%' },
  { candidateId: 5, name: 'Michael Chen', submissions: 20, interviews: 7, placements: 4, conversionRate: 20.0, avgTimeToPlace: 20, revenue: 192000, trend: '+18%' },
  { candidateId: 6, name: 'Sarah Johnson', submissions: 10, interviews: 4, placements: 2, conversionRate: 20.0, avgTimeToPlace: 28, revenue: 67200, trend: '+5%' },
  { candidateId: 7, name: 'Ahmed Hassan', submissions: 15, interviews: 8, placements: 6, conversionRate: 40.0, avgTimeToPlace: 15, revenue: 396000, trend: '+30%' },
  { candidateId: 8, name: 'Lisa Wang', submissions: 6, interviews: 2, placements: 1, conversionRate: 16.7, avgTimeToPlace: 35, revenue: 42240, trend: '+3%' },
  { candidateId: 9, name: 'Carlos Rivera', submissions: 14, interviews: 6, placements: 4, conversionRate: 28.6, avgTimeToPlace: 19, revenue: 302400, trend: '+20%' },
  { candidateId: 10, name: 'Anika Patel', submissions: 5, interviews: 1, placements: 0, conversionRate: 0, avgTimeToPlace: 0, revenue: 0, trend: 'New' }
];

export const mockBusinessOutreach = [
  { id: 1, candidateName: 'Rajesh Kumar', jobTitle: 'Sr Java Developer', recruiter: 'Sarah Johnson', company: 'TechCorp', emailType: 'Submission', status: 'Opened', sentDate: 'Jan 15, 2024 10:30 AM', openedDate: 'Jan 15, 2024 11:45 AM', replied: true },
  { id: 2, candidateName: 'Maria Garcia', jobTitle: 'React Frontend Lead', recruiter: 'Michael Chen', company: 'Digital Innovations', emailType: 'Submission', status: 'Replied', sentDate: 'Jan 14, 2024 09:15 AM', openedDate: 'Jan 14, 2024 10:00 AM', replied: true },
  { id: 3, candidateName: 'David Park', jobTitle: 'DevOps Lead', recruiter: 'Jennifer Martinez', company: 'CloudScale', emailType: 'Follow-up', status: 'Sent', sentDate: 'Jan 15, 2024 02:00 PM', openedDate: null, replied: false },
  { id: 4, candidateName: 'Michael Chen', jobTitle: '.NET Architect', recruiter: 'David Wilson', company: 'Enterprise Systems', emailType: 'Submission', status: 'Opened', sentDate: 'Jan 13, 2024 11:00 AM', openedDate: 'Jan 13, 2024 03:30 PM', replied: false },
  { id: 5, candidateName: 'Sarah Johnson', jobTitle: 'QA Lead', recruiter: 'Lisa Anderson', company: 'TestPro', emailType: 'Submission', status: 'Replied', sentDate: 'Jan 12, 2024 08:45 AM', openedDate: 'Jan 12, 2024 09:30 AM', replied: true },
  { id: 6, candidateName: 'Ahmed Hassan', jobTitle: 'Cloud Architect', recruiter: 'Sarah Johnson', company: 'MegaCorp', emailType: 'Introduction', status: 'Sent', sentDate: 'Jan 15, 2024 04:00 PM', openedDate: null, replied: false },
  { id: 7, candidateName: 'Rajesh Kumar', jobTitle: 'Backend Eng', recruiter: 'Jennifer Martinez', company: 'CloudScale', emailType: 'Follow-up', status: 'Opened', sentDate: 'Jan 14, 2024 01:30 PM', openedDate: 'Jan 15, 2024 08:00 AM', replied: false },
  { id: 8, candidateName: 'Anika Patel', jobTitle: 'Business Analyst', recruiter: 'Jennifer Martinez', company: 'FinTech Corp', emailType: 'Submission', status: 'Replied', sentDate: 'Jan 11, 2024 10:00 AM', openedDate: 'Jan 11, 2024 11:15 AM', replied: true }
];

export const mockScrapingRuns = [
  {
    id: 1,
    source: 'LinkedIn',
    startTime: '2024-01-15 06:00:00',
    endTime: '2024-01-15 06:45:23',
    scraped: 234,
    qualified: 127,
    duplicates: 89,
    failed: 18,
    status: 'Success',
    successRate: 92.3
  },
  {
    id: 2,
    source: 'Dice',
    startTime: '2024-01-15 06:30:00',
    endTime: '2024-01-15 07:12:45',
    scraped: 156,
    qualified: 98,
    duplicates: 45,
    failed: 13,
    status: 'Success',
    successRate: 91.7
  },
  {
    id: 3,
    source: 'LinkedIn',
    startTime: '2024-01-14 06:00:00',
    endTime: '2024-01-14 06:52:11',
    scraped: 198,
    qualified: 112,
    duplicates: 67,
    failed: 19,
    status: 'Success',
    successRate: 90.4
  }
];