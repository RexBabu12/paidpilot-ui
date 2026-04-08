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