// Mock data for the entire platform

export const mockJobs = [
  {
    id: 1,
    role_title: 'Senior Java Developer',
    engagement_type: 'C2C',
    post_type: 'Job Posting',
    work_mode: 'Remote',
    location: 'Dallas, TX',
    rate_raw: '$85/hr',
    visa_constraints: 'USC, GC, H1B',
    skills: ['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker'],
    experience: '8+ years',
    source: 'LinkedIn',
    author_name: 'Sarah Johnson',
    author_company: 'TechCorp Solutions',
    author_email: 'sarah.j@techcorp.com',
    author_phone: '+1 (555) 123-4567',
    author_linkedin: 'https://linkedin.com/in/sarahjohnson',
    post_url: 'https://linkedin.com/jobs/view/123456',
    scraped_at: '2025-02-08T10:30:00Z',
    raw_text: 'Looking for experienced Java developer with strong microservices background. Must have hands-on AWS experience and excellent communication skills. C2C preferred. Rate: $85/hr. Location: Dallas, TX (Remote OK). Visa: USC/GC/H1B.',
    status: 'New',
    matchScore: 95
  },
  {
    id: 2,
    role_title: 'React Frontend Engineer',
    engagement_type: 'W2',
    post_type: 'Hot Requirement',
    work_mode: 'Hybrid',
    location: 'Austin, TX',
    rate_raw: '$75/hr',
    visa_constraints: 'USC, GC',
    skills: ['React', 'TypeScript', 'Redux', 'Material-UI', 'Node.js'],
    experience: '5+ years',
    source: 'LinkedIn',
    author_name: 'Michael Chen',
    author_company: 'Digital Innovations',
    author_email: 'michael@digitalinnov.com',
    author_phone: '+1 (555) 234-5678',
    author_linkedin: 'https://linkedin.com/in/michaelchen',
    post_url: 'https://linkedin.com/jobs/view/234567',
    scraped_at: '2025-02-08T07:15:00Z',
    raw_text: 'Seeking talented React developer for a fast-paced fintech project. Must have experience with TypeScript and state management. W2 only. Hybrid in Austin.',
    status: 'New',
    matchScore: 88
  },
  {
    id: 3,
    role_title: 'DevOps Engineer',
    engagement_type: 'C2C',
    post_type: 'Job Posting',
    work_mode: 'Remote',
    location: 'Remote, USA',
    rate_raw: '$90/hr',
    visa_constraints: 'Any',
    skills: ['Kubernetes', 'Jenkins', 'AWS', 'Terraform', 'Python'],
    experience: '6+ years',
    source: 'Dice',
    author_name: 'Jennifer Martinez',
    author_company: 'CloudScale Inc',
    author_email: 'jmartinez@cloudscale.com',
    author_phone: '+1 (555) 345-6789',
    author_linkedin: 'https://linkedin.com/in/jennifermartinez',
    post_url: 'https://dice.com/jobs/devops-eng-456',
    scraped_at: '2025-02-07T14:00:00Z',
    raw_text: 'DevOps role focused on cloud infrastructure automation. Heavy Kubernetes and CI/CD pipeline experience required. C2C. Remote. Any visa.',
    status: 'Reviewed',
    matchScore: 82
  },
  {
    id: 4,
    role_title: 'Full Stack .NET Developer',
    engagement_type: 'Both',
    post_type: 'Urgent Hire',
    work_mode: 'Onsite',
    location: 'Chicago, IL',
    rate_raw: '$80/hr',
    visa_constraints: 'USC, GC, H1B',
    skills: ['.NET Core', 'C#', 'Angular', 'SQL Server', 'Azure'],
    experience: '7+ years',
    source: 'LinkedIn',
    author_name: 'David Wilson',
    author_company: 'Enterprise Systems',
    author_email: 'dwilson@entsys.com',
    author_phone: '+1 (555) 456-7890',
    author_linkedin: 'https://linkedin.com/in/davidwilson',
    post_url: 'https://linkedin.com/jobs/view/345678',
    scraped_at: '2025-02-08T09:00:00Z',
    raw_text: 'Full stack developer needed for enterprise modernization project. Strong .NET and Angular skills essential. Onsite in Chicago. C2C or W2.',
    status: 'New',
    matchScore: 78
  },
  {
    id: 5,
    role_title: 'Python Data Engineer',
    engagement_type: 'C2C',
    post_type: 'Job Posting',
    work_mode: 'Remote',
    location: 'San Francisco, CA',
    rate_raw: '$95/hr',
    visa_constraints: 'USC, GC',
    skills: ['Python', 'Spark', 'Airflow', 'AWS', 'SQL'],
    experience: '5+ years',
    source: 'LinkedIn',
    author_name: 'Lisa Anderson',
    author_company: 'DataStream Analytics',
    author_email: 'landerson@datastream.com',
    author_phone: '+1 (555) 567-8901',
    author_linkedin: 'https://linkedin.com/in/lisaanderson',
    post_url: 'https://linkedin.com/jobs/view/456789',
    scraped_at: '2025-02-08T06:00:00Z',
    raw_text: 'Data engineer role building scalable data pipelines. Experience with Spark and cloud platforms required. C2C. Remote. USC/GC only.',
    status: 'Applied',
    matchScore: 91
  },
  {
    id: 6,
    role_title: 'Cloud Architect - AWS',
    engagement_type: 'C2C',
    post_type: 'Hot Requirement',
    work_mode: 'Remote',
    location: 'Remote, USA',
    rate_raw: '$120/hr',
    visa_constraints: 'USC, GC',
    skills: ['AWS', 'Terraform', 'CloudFormation', 'Docker', 'Kubernetes', 'Python'],
    experience: '10+ years',
    source: 'LinkedIn',
    author_name: 'Tom Bradley',
    author_company: 'MegaCorp Technologies',
    author_email: 'tbradley@megacorp.com',
    author_phone: '+1 (555) 678-9012',
    author_linkedin: 'https://linkedin.com/in/tombradley',
    post_url: 'https://linkedin.com/jobs/view/567890',
    scraped_at: '2025-02-08T11:00:00Z',
    raw_text: 'Looking for senior cloud architect to lead AWS migration for Fortune 500 client. Must have 10+ years and multi-account landing zone experience. C2C only.',
    status: 'New',
    matchScore: 74
  },
  {
    id: 7,
    role_title: 'Salesforce Developer',
    engagement_type: 'W2',
    post_type: 'Job Posting',
    work_mode: 'Hybrid',
    location: 'Houston, TX',
    rate_raw: '$88/hr',
    visa_constraints: 'Any',
    skills: ['Salesforce', 'Apex', 'Lightning', 'SOQL', 'JavaScript'],
    experience: '5+ years',
    source: 'Dice',
    author_name: 'Patricia Gomez',
    author_company: 'CRM Solutions Inc',
    author_email: 'pgomez@crmsolutions.com',
    author_phone: '+1 (555) 789-0123',
    author_linkedin: 'https://linkedin.com/in/patriciagomez',
    post_url: 'https://dice.com/jobs/sfdc-dev-789',
    scraped_at: '2025-02-07T16:30:00Z',
    raw_text: 'Salesforce developer needed for CPQ and Lightning Web Components project. W2 preferred. Hybrid in Houston. Any visa status accepted.',
    status: 'New',
    matchScore: 68
  },
  {
    id: 8,
    role_title: 'SAP S/4HANA Consultant',
    engagement_type: 'C2C',
    post_type: 'Urgent Hire',
    work_mode: 'Onsite',
    location: 'New York, NY',
    rate_raw: '$110/hr',
    visa_constraints: 'USC, GC, H1B, EAD',
    skills: ['SAP FICO', 'S/4HANA', 'ABAP', 'SAP BW', 'SQL'],
    experience: '10+ years',
    source: 'LinkedIn',
    author_name: 'Rachel Kim',
    author_company: 'GlobalConsult Partners',
    author_email: 'rkim@globalconsult.com',
    author_phone: '+1 (555) 890-1234',
    author_linkedin: 'https://linkedin.com/in/rachelkim',
    post_url: 'https://linkedin.com/jobs/view/678901',
    scraped_at: '2025-02-08T08:45:00Z',
    raw_text: 'SAP S/4HANA migration consultant needed ASAP for Fortune 100 manufacturing client. Onsite in NYC. 10+ years FICO experience mandatory. C2C at $110/hr.',
    status: 'New',
    matchScore: 85
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
  },
  {
    id: 4,
    name: 'David Wilson',
    company: 'Enterprise Systems',
    email: 'dwilson@entsys.com',
    phone: '+1 (555) 456-7890',
    linkedIn: 'https://linkedin.com/in/davidwilson',
    totalPosts: 28,
    lastActive: '3 hours ago',
    commonRoles: ['.NET', 'Full Stack', 'Azure'],
    commonLocations: ['Chicago', 'Remote'],
    engagementPreference: 'Both',
    responseRate: 68
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    company: 'DataStream Analytics',
    email: 'landerson@datastream.com',
    phone: '+1 (555) 567-8901',
    linkedIn: 'https://linkedin.com/in/lisaanderson',
    totalPosts: 41,
    lastActive: '6 hours ago',
    commonRoles: ['Data Engineer', 'Python', 'ML'],
    commonLocations: ['San Francisco', 'Remote'],
    engagementPreference: 'C2C',
    responseRate: 81
  },
  {
    id: 6,
    name: 'Tom Bradley',
    company: 'MegaCorp Technologies',
    email: 'tbradley@megacorp.com',
    phone: '+1 (555) 678-9012',
    linkedIn: 'https://linkedin.com/in/tombradley',
    totalPosts: 53,
    lastActive: '1 hour ago',
    commonRoles: ['Cloud Architect', 'AWS', 'Infrastructure'],
    commonLocations: ['Remote', 'Nationwide'],
    engagementPreference: 'C2C',
    responseRate: 74
  }
];

export const mockResumes = [
  {
    id: 1, name: 'Java_Senior_Developer_v3.pdf', updated: '2 days ago', isDefault: true,
    tags: ['Java', 'Spring Boot', 'AWS', 'Microservices', 'Docker', 'REST API', 'Kafka', 'Redis', 'PostgreSQL', 'CI/CD', 'Agile', 'JUnit', 'Maven', 'Git', 'Linux', 'MongoDB'],
    atsScore: 95, completeness: 92, format: 'PDF', size: '245 KB'
  },
  {
    id: 2, name: 'React_Frontend_v2.pdf', updated: '1 week ago', isDefault: false,
    tags: ['React', 'TypeScript', 'Redux', 'Node.js', 'GraphQL', 'CSS', 'Webpack', 'Jest', 'Cypress', 'Figma'],
    atsScore: 88, completeness: 85, format: 'PDF', size: '198 KB'
  },
  {
    id: 3, name: 'DevOps_Engineer_v1.pdf', updated: '2 weeks ago', isDefault: false,
    tags: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins', 'Docker', 'Python', 'Ansible', 'Prometheus', 'Grafana', 'Linux', 'Bash', 'CloudFormation'],
    atsScore: 92, completeness: 88, format: 'PDF', size: '210 KB'
  },
  {
    id: 4, name: 'Full_Stack_Developer.pdf', updated: '1 month ago', isDefault: false,
    tags: ['Java', 'React', 'Spring Boot', 'PostgreSQL', 'Docker', 'AWS'],
    atsScore: 85, completeness: 78, format: 'PDF', size: '180 KB'
  },
  {
    id: 5, name: 'Data_Engineer_v2.pdf', updated: '1 month ago', isDefault: false,
    tags: ['Python', 'Spark', 'Airflow', 'AWS', 'SQL', 'Kafka', 'Redshift', 'dbt', 'Snowflake'],
    atsScore: 90, completeness: 82, format: 'PDF', size: '225 KB'
  },
  {
    id: 6, name: 'Cloud_Architect_v1.pdf', updated: '3 days ago', isDefault: false,
    tags: ['AWS', 'Azure', 'GCP', 'Terraform', 'Docker', 'Kubernetes', 'Python', 'CloudFormation', 'Lambda', 'VPC', 'IAM', 'S3', 'EC2', 'RDS', 'DynamoDB', 'SQS', 'SNS'],
    atsScore: 94, completeness: 90, format: 'PDF', size: '260 KB'
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
// Candidates grouped under bench sales recruiters
export const mockBenchRecruiters = [
  { id: 1, name: 'Amy Roberts', role: 'Bench Sales Recruiter', email: 'amy.r@staffpro.com', phone: '+1 (555) 100-2000' },
  { id: 2, name: 'James Liu', role: 'Bench Sales Recruiter', email: 'james.l@staffpro.com', phone: '+1 (555) 200-3000' },
  { id: 3, name: 'Nina Patel', role: 'Senior Recruiter', email: 'nina.p@staffpro.com', phone: '+1 (555) 300-4000' }
];

export const mockBusinessCandidates = [
  {
    id: 1, benchRecruiterId: 1, benchRecruiter: 'Amy Roberts',
    name: 'Rajesh Kumar', title: 'Senior Java Developer',
    email: 'rajesh.k@email.com', phone: '+1 (555) 111-2222',
    skills: ['Java', 'Spring Boot', 'AWS', 'Microservices', 'Docker'],
    experience: '10 years', location: 'Dallas, TX', visaStatus: 'H1B',
    rate: '$85/hr', availability: 'Immediate', linkedIn: 'linkedin.com/in/rajeshkumar',
    education: 'M.S. Computer Science, UT Dallas',
    certifications: ['AWS Solutions Architect', 'Oracle Java SE 11'],
    preferredEngagement: 'C2C', preferredWorkMode: 'Remote',
    summary: 'Seasoned Java developer with deep expertise in Spring Boot microservices and AWS cloud infrastructure. Built distributed systems handling 10M+ transactions daily.',
    resumeFile: 'Rajesh_Kumar_Java_v3.pdf', resumeLastUpdated: 'Jan 10, 2024',
    totalSubmissions: 18, totalInterviews: 6, totalPlacements: 3,
    joinedDate: 'Jan 2024', lastActive: '2 hours ago',
    outreach: [
      { id: 1, job: 'Sr Java Dev - TechCorp', recruiter: 'Sarah Johnson', date: 'Jan 15, 2024', status: 'Sent' },
      { id: 2, job: 'Backend Eng - CloudScale', recruiter: 'Jennifer Martinez', date: 'Jan 13, 2024', status: 'Sent' },
      { id: 3, job: 'Java Architect - FinServ', recruiter: 'David Wilson', date: 'Jan 10, 2024', status: 'Sent' }
    ]
  },
  {
    id: 2, benchRecruiterId: 1, benchRecruiter: 'Amy Roberts',
    name: 'Maria Garcia', title: 'React Frontend Developer',
    email: 'maria.g@email.com', phone: '+1 (555) 222-3333',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Redux'],
    experience: '6 years', location: 'Austin, TX', visaStatus: 'USC',
    rate: '$75/hr', availability: '2 weeks', linkedIn: 'linkedin.com/in/mariagarcia',
    education: 'B.S. Computer Science, UT Austin',
    certifications: ['AWS Cloud Practitioner'],
    preferredEngagement: 'W2', preferredWorkMode: 'Hybrid',
    summary: 'Creative frontend engineer specializing in React and TypeScript. Built consumer-facing SPAs for fintech and e-commerce with 50K+ daily users.',
    resumeFile: 'Maria_Garcia_React_v2.pdf', resumeLastUpdated: 'Jan 8, 2024',
    totalSubmissions: 12, totalInterviews: 4, totalPlacements: 1,
    joinedDate: 'Mar 2024', lastActive: '5 hours ago',
    outreach: [
      { id: 4, job: 'React Dev - Digital Innovations', recruiter: 'Michael Chen', date: 'Jan 14, 2024', status: 'Sent' },
      { id: 5, job: 'Frontend Lead - PayTech', recruiter: 'Lisa Anderson', date: 'Jan 11, 2024', status: 'Sent' }
    ]
  },
  {
    id: 3, benchRecruiterId: 2, benchRecruiter: 'James Liu',
    name: 'David Park', title: 'DevOps Engineer',
    email: 'david.p@email.com', phone: '+1 (555) 333-4444',
    skills: ['Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'Python'],
    experience: '8 years', location: 'Remote', visaStatus: 'GC',
    rate: '$90/hr', availability: 'Immediate', linkedIn: 'linkedin.com/in/davidpark',
    education: 'B.S. Information Systems, Georgia Tech',
    certifications: ['AWS DevOps Professional', 'CKA Kubernetes'],
    preferredEngagement: 'C2C', preferredWorkMode: 'Remote',
    summary: 'DevOps specialist with extensive experience in Kubernetes orchestration and CI/CD pipeline automation. Led cloud migrations for Fortune 500 clients.',
    resumeFile: 'David_Park_DevOps_v4.pdf', resumeLastUpdated: 'Jan 12, 2024',
    totalSubmissions: 24, totalInterviews: 10, totalPlacements: 5,
    joinedDate: 'Nov 2023', lastActive: '1 day ago',
    outreach: [
      { id: 6, job: 'DevOps Lead - CloudScale', recruiter: 'Jennifer Martinez', date: 'Jan 15, 2024', status: 'Sent' },
      { id: 7, job: 'SRE - StreamNet', recruiter: 'Lisa Anderson', date: 'Jan 12, 2024', status: 'Sent' }
    ]
  },
  {
    id: 4, benchRecruiterId: 2, benchRecruiter: 'James Liu',
    name: 'Priya Sharma', title: 'Data Scientist',
    email: 'priya.s@email.com', phone: '+1 (555) 444-5555',
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Spark'],
    experience: '5 years', location: 'San Francisco, CA', visaStatus: 'H1B',
    rate: '$95/hr', availability: '1 month', linkedIn: 'linkedin.com/in/priyasharma',
    education: 'M.S. Data Science, Stanford',
    certifications: ['Google Professional ML Engineer'],
    preferredEngagement: 'C2C', preferredWorkMode: 'Hybrid',
    summary: 'Data scientist with ML engineering focus. Built recommendation engines and fraud detection models processing 5M+ events/day.',
    resumeFile: 'Priya_Sharma_DS_v2.pdf', resumeLastUpdated: 'Dec 20, 2023',
    totalSubmissions: 8, totalInterviews: 3, totalPlacements: 2,
    joinedDate: 'Feb 2024', lastActive: '3 hours ago',
    outreach: []
  },
  {
    id: 5, benchRecruiterId: 1, benchRecruiter: 'Amy Roberts',
    name: 'Michael Chen', title: 'Full Stack .NET Developer',
    email: 'michael.c@email.com', phone: '+1 (555) 555-6666',
    skills: ['.NET', 'Angular', 'Azure', 'SQL Server', 'C#'],
    experience: '9 years', location: 'Chicago, IL', visaStatus: 'USC',
    rate: '$80/hr', availability: 'Immediate', linkedIn: 'linkedin.com/in/michaelchendev',
    education: 'B.S. Software Engineering, UIC',
    certifications: ['Azure Developer Associate', 'MCSD'],
    preferredEngagement: 'Both', preferredWorkMode: 'Onsite',
    summary: 'Full stack developer with deep .NET and Angular expertise. Architected enterprise applications for banking and insurance sectors.',
    resumeFile: 'Michael_Chen_NET_v3.pdf', resumeLastUpdated: 'Jan 5, 2024',
    totalSubmissions: 20, totalInterviews: 7, totalPlacements: 4,
    joinedDate: 'Sep 2023', lastActive: '6 hours ago',
    outreach: [
      { id: 8, job: '.NET Dev - Enterprise Sys', recruiter: 'David Wilson', date: 'Jan 14, 2024', status: 'Sent' },
      { id: 9, job: 'Full Stack - FinCorp', recruiter: 'Sarah Johnson', date: 'Jan 12, 2024', status: 'Sent' }
    ]
  },
  {
    id: 6, benchRecruiterId: 2, benchRecruiter: 'James Liu',
    name: 'Sarah Thompson', title: 'QA Automation Engineer',
    email: 'sarah.t@email.com', phone: '+1 (555) 666-7777',
    skills: ['Selenium', 'Java', 'API Testing', 'Cypress', 'JIRA'],
    experience: '7 years', location: 'Dallas, TX', visaStatus: 'GC',
    rate: '$70/hr', availability: '2 weeks', linkedIn: 'linkedin.com/in/sarahthompson',
    education: 'B.S. Computer Science, SMU',
    certifications: ['ISTQB Advanced', 'AWS Cloud Practitioner'],
    preferredEngagement: 'C2C', preferredWorkMode: 'Remote',
    summary: 'QA automation expert with strong Selenium and Cypress framework experience. Led QA teams of 5+ across agile delivery pipelines.',
    resumeFile: 'Sarah_Thompson_QA_v2.pdf', resumeLastUpdated: 'Jan 3, 2024',
    totalSubmissions: 10, totalInterviews: 4, totalPlacements: 2,
    joinedDate: 'Apr 2024', lastActive: '4 hours ago',
    outreach: [
      { id: 10, job: 'QA Lead - TestPro', recruiter: 'Lisa Anderson', date: 'Jan 15, 2024', status: 'Sent' }
    ]
  },
  {
    id: 7, benchRecruiterId: 3, benchRecruiter: 'Nina Patel',
    name: 'Ahmed Hassan', title: 'Cloud Architect',
    email: 'ahmed.h@email.com', phone: '+1 (555) 777-8888',
    skills: ['AWS', 'Azure', 'GCP', 'Terraform', 'Docker', 'Kubernetes'],
    experience: '12 years', location: 'Remote', visaStatus: 'USC',
    rate: '$110/hr', availability: 'Immediate', linkedIn: 'linkedin.com/in/ahmedhassan',
    education: 'M.S. Cloud Computing, Georgia Tech',
    certifications: ['AWS Solutions Architect Pro', 'Azure Solutions Architect Expert', 'GCP Professional Cloud Architect'],
    preferredEngagement: 'C2C', preferredWorkMode: 'Remote',
    summary: 'Senior cloud architect with multi-cloud expertise. Designed and delivered infrastructure for companies processing $1B+ in annual transactions.',
    resumeFile: 'Ahmed_Hassan_Cloud_v5.pdf', resumeLastUpdated: 'Jan 14, 2024',
    totalSubmissions: 15, totalInterviews: 8, totalPlacements: 6,
    joinedDate: 'Jun 2023', lastActive: '1 hour ago',
    outreach: [
      { id: 11, job: 'Cloud Architect - MegaCorp', recruiter: 'Sarah Johnson', date: 'Jan 15, 2024', status: 'Sent' }
    ]
  },
  {
    id: 8, benchRecruiterId: 3, benchRecruiter: 'Nina Patel',
    name: 'Lisa Wang', title: 'Salesforce Developer',
    email: 'lisa.w@email.com', phone: '+1 (555) 888-9999',
    skills: ['Salesforce', 'Apex', 'Lightning', 'SOQL', 'JavaScript'],
    experience: '6 years', location: 'Houston, TX', visaStatus: 'H1B',
    rate: '$88/hr', availability: '3 weeks', linkedIn: 'linkedin.com/in/lisawang',
    education: 'B.S. Information Technology, UH',
    certifications: ['Salesforce Platform Developer II', 'Salesforce Admin'],
    preferredEngagement: 'C2C', preferredWorkMode: 'Hybrid',
    summary: 'Salesforce specialist with expertise in Apex, Lightning Web Components and CPQ implementations. Delivered CRM solutions for 3 Fortune 500 clients.',
    resumeFile: 'Lisa_Wang_SF_v2.pdf', resumeLastUpdated: 'Dec 28, 2023',
    totalSubmissions: 6, totalInterviews: 2, totalPlacements: 1,
    joinedDate: 'May 2024', lastActive: '8 hours ago',
    outreach: [
      { id: 12, job: 'SF Dev - CRM Corp', recruiter: 'Michael Chen', date: 'Jan 13, 2024', status: 'Sent' }
    ]
  },
  {
    id: 9, benchRecruiterId: 1, benchRecruiter: 'Amy Roberts',
    name: 'Carlos Rivera', title: 'SAP Consultant',
    email: 'carlos.r@email.com', phone: '+1 (555) 999-0000',
    skills: ['SAP FICO', 'SAP S/4HANA', 'ABAP', 'SAP BW', 'SQL'],
    experience: '11 years', location: 'New York, NY', visaStatus: 'GC',
    rate: '$105/hr', availability: 'Immediate', linkedIn: 'linkedin.com/in/carlosrivera',
    education: 'MBA, NYU Stern',
    certifications: ['SAP FICO Certified', 'SAP S/4HANA Migration'],
    preferredEngagement: 'C2C', preferredWorkMode: 'Onsite',
    summary: 'SAP functional consultant specializing in FICO and S/4HANA migrations. Led 4 full-cycle SAP implementations across manufacturing and retail.',
    resumeFile: 'Carlos_Rivera_SAP_v3.pdf', resumeLastUpdated: 'Jan 2, 2024',
    totalSubmissions: 14, totalInterviews: 6, totalPlacements: 4,
    joinedDate: 'Aug 2023', lastActive: '2 days ago',
    outreach: []
  },
  {
    id: 10, benchRecruiterId: 3, benchRecruiter: 'Nina Patel',
    name: 'Anika Patel', title: 'Business Analyst',
    email: 'anika.p@email.com', phone: '+1 (555) 000-1111',
    skills: ['Agile', 'JIRA', 'SQL', 'Tableau', 'Requirements Gathering'],
    experience: '4 years', location: 'Remote', visaStatus: 'H1B',
    rate: '$65/hr', availability: 'Immediate', linkedIn: 'linkedin.com/in/anikapatel',
    education: 'B.S. Business Analytics, Purdue',
    certifications: ['CSPO', 'Tableau Desktop Specialist'],
    preferredEngagement: 'Both', preferredWorkMode: 'Remote',
    summary: 'Business analyst with strong agile delivery experience. Bridged business and technical teams across 8+ software projects in healthcare and fintech.',
    resumeFile: 'Anika_Patel_BA_v1.pdf', resumeLastUpdated: 'Jan 7, 2024',
    totalSubmissions: 5, totalInterviews: 1, totalPlacements: 0,
    joinedDate: 'Jul 2024', lastActive: '30 min ago',
    outreach: [
      { id: 13, job: 'BA - FinTech Corp', recruiter: 'Jennifer Martinez', date: 'Jan 11, 2024', status: 'Sent' }
    ]
  }
];

export const mockTeamMembers = [
  { id: 1, name: 'Amy Roberts', role: 'Bench Sales Recruiter', email: 'amy.r@staffpro.com', phone: '+1 (555) 100-2000', candidateCount: 4, activeSubmissions: 12, closedDeals: 23, status: 'Active', joinedDate: 'Jan 2023' },
  { id: 2, name: 'James Liu', role: 'Bench Sales Recruiter', email: 'james.l@staffpro.com', phone: '+1 (555) 200-3000', candidateCount: 3, activeSubmissions: 8, closedDeals: 18, status: 'Active', joinedDate: 'Mar 2023' },
  { id: 3, name: 'Nina Patel', role: 'Senior Recruiter', email: 'nina.p@staffpro.com', phone: '+1 (555) 300-4000', candidateCount: 3, activeSubmissions: 10, closedDeals: 31, status: 'Active', joinedDate: 'Nov 2022' },
  { id: 4, name: 'Tom Bradley', role: 'Business Development', email: 'tom.b@staffpro.com', phone: '+1 (555) 400-5000', candidateCount: 0, activeSubmissions: 0, closedDeals: 42, status: 'Active', joinedDate: 'Jun 2022' },
  { id: 5, name: 'Sarah Kim', role: 'Sales Lead', email: 'sarah.k@staffpro.com', phone: '+1 (555) 500-6000', candidateCount: 0, activeSubmissions: 0, closedDeals: 15, status: 'Active', joinedDate: 'Sep 2023' },
  { id: 6, name: 'David Chen', role: 'Account Manager', email: 'david.c@staffpro.com', phone: '+1 (555) 600-7000', candidateCount: 0, activeSubmissions: 0, closedDeals: 9, status: 'Active', joinedDate: 'Feb 2024' }
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