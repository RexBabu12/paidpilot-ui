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
    matched_keyword: 'java developer c2c remote',
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
    matched_keyword: 'react developer w2 hybrid',
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
    matched_keyword: 'devops engineer c2c remote',
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
    matched_keyword: '.net developer c2c chicago',
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
    matched_keyword: 'python data engineer c2c',
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
    matched_keyword: 'cloud architect aws c2c remote',
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
    matched_keyword: 'salesforce developer w2',
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
    matched_keyword: 'sap consultant c2c new york',
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
    recruiterEmail: 'sarah.j@techcorp.com',
    source: 'LinkedIn',
    status: 'Sent',
    sentDate: '2025-02-09',
    sentTime: '10:30 AM',
    rate: '$85/hr',
    engagementType: 'C2C',
    location: 'Dallas, TX',
    resumeVersion: 'Java_Senior_v3.pdf'
  },
  {
    id: 2,
    jobTitle: 'React Frontend Engineer',
    company: 'Digital Innovations',
    recruiter: 'Michael Chen',
    recruiterEmail: 'michael@digitalinnov.com',
    source: 'LinkedIn',
    status: 'Sent',
    sentDate: '2025-02-09',
    sentTime: '09:15 AM',
    rate: '$75/hr',
    engagementType: 'W2',
    location: 'Austin, TX',
    resumeVersion: 'React_Frontend_v2.pdf'
  },
  {
    id: 3,
    jobTitle: 'DevOps Engineer',
    company: 'CloudScale Inc',
    recruiter: 'Jennifer Martinez',
    recruiterEmail: 'jmartinez@cloudscale.com',
    source: 'Dice',
    status: 'Sent',
    sentDate: '2025-02-08',
    sentTime: '02:00 PM',
    rate: '$90/hr',
    engagementType: 'C2C',
    location: 'Remote',
    resumeVersion: 'DevOps_v1.pdf'
  },
  {
    id: 4,
    jobTitle: 'Full Stack .NET Developer',
    company: 'Enterprise Systems',
    recruiter: 'David Wilson',
    recruiterEmail: 'dwilson@entsys.com',
    source: 'LinkedIn',
    status: 'Sent',
    sentDate: '2025-02-08',
    sentTime: '11:30 AM',
    rate: '$80/hr',
    engagementType: 'C2C',
    location: 'Chicago, IL',
    resumeVersion: 'Full_Stack_Developer.pdf'
  },
  {
    id: 5,
    jobTitle: 'Python Data Engineer',
    company: 'DataStream Analytics',
    recruiter: 'Lisa Anderson',
    recruiterEmail: 'landerson@datastream.com',
    source: 'LinkedIn',
    status: 'Sent',
    sentDate: '2025-02-07',
    sentTime: '03:45 PM',
    rate: '$95/hr',
    engagementType: 'C2C',
    location: 'San Francisco, CA',
    resumeVersion: 'Data_Engineer_v2.pdf'
  },
  {
    id: 6,
    jobTitle: 'Cloud Architect - AWS',
    company: 'MegaCorp Technologies',
    recruiter: 'Tom Bradley',
    recruiterEmail: 'tbradley@megacorp.com',
    source: 'Dice',
    status: 'Sent',
    sentDate: '2025-02-07',
    sentTime: '04:00 PM',
    rate: '$120/hr',
    engagementType: 'C2C',
    location: 'Remote',
    resumeVersion: 'Cloud_Architect_v1.pdf'
  },
  {
    id: 7,
    jobTitle: 'Salesforce Developer',
    company: 'CRM Solutions Inc',
    recruiter: 'Patricia Gomez',
    recruiterEmail: 'pgomez@crmsolutions.com',
    source: 'Dice',
    status: 'Sent',
    sentDate: '2025-02-06',
    sentTime: '01:15 PM',
    rate: '$88/hr',
    engagementType: 'W2',
    location: 'Houston, TX',
    resumeVersion: 'Java_Senior_v3.pdf'
  },
  {
    id: 8,
    jobTitle: 'SAP S/4HANA Consultant',
    company: 'GlobalConsult Partners',
    recruiter: 'Rachel Kim',
    recruiterEmail: 'rkim@globalconsult.com',
    source: 'LinkedIn',
    status: 'Sent',
    sentDate: '2025-02-06',
    sentTime: '10:00 AM',
    rate: '$110/hr',
    engagementType: 'C2C',
    location: 'New York, NY',
    resumeVersion: 'Full_Stack_Developer.pdf'
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
    id: 1, source: 'LinkedIn', keyword: 'java developer c2c',
    startTime: '2025-02-09 06:00:00', endTime: '2025-02-09 06:45:23',
    scraped: 234, qualified: 127, duplicates: 89, failed: 18,
    status: 'Success', successRate: 92.3,
    errors: []
  },
  {
    id: 2, source: 'LinkedIn', keyword: 'react developer w2',
    startTime: '2025-02-09 06:30:00', endTime: '2025-02-09 07:12:45',
    scraped: 156, qualified: 98, duplicates: 45, failed: 13,
    status: 'Success', successRate: 91.7,
    errors: []
  },
  {
    id: 3, source: 'LinkedIn', keyword: 'devops engineer c2c',
    startTime: '2025-02-08 06:00:00', endTime: '2025-02-08 06:52:11',
    scraped: 198, qualified: 112, duplicates: 67, failed: 19,
    status: 'Success', successRate: 90.4,
    errors: ['Timeout on page 14 - retried successfully']
  },
  {
    id: 4, source: 'LinkedIn', keyword: 'data engineer remote',
    startTime: '2025-02-08 07:00:00', endTime: '2025-02-08 07:38:00',
    scraped: 89, qualified: 52, duplicates: 28, failed: 9,
    status: 'Partial', successRate: 85.2,
    errors: ['Rate limit hit after 89 posts', 'Session paused - cooling down']
  },
  {
    id: 5, source: 'LinkedIn', keyword: 'sap consultant',
    startTime: '2025-02-07 06:00:00', endTime: '2025-02-07 06:22:00',
    scraped: 45, qualified: 31, duplicates: 10, failed: 4,
    status: 'Success', successRate: 91.1,
    errors: []
  }
];

// ============= ADMIN PORTAL MOCK DATA =============

export const mockSystemServices = {
  scraper: {
    name: 'LinkedIn Scraper',
    status: 'Operational',
    uptime: '99.7%',
    lastCheck: '2 min ago',
    portals: [
      { name: 'LinkedIn Jobs', status: 'Active', lastRun: '35 min ago', postsToday: 487, errors: 0 },
      { name: 'LinkedIn Groups', status: 'Active', lastRun: '1 hr ago', postsToday: 124, errors: 2 },
      { name: 'Dice', status: 'Paused', lastRun: '6 hrs ago', postsToday: 0, errors: 0 },
      { name: 'Indeed', status: 'Coming Soon', lastRun: 'N/A', postsToday: 0, errors: 0 }
    ]
  },
  mailService: {
    name: 'Email Service (SendGrid)',
    status: 'Operational',
    uptime: '99.9%',
    lastCheck: '1 min ago',
    stats: { sent: 342, delivered: 338, opened: 187, bounced: 4, failed: 0 },
    recentEmails: [
      { id: 1, to: 'sarah.j@techcorp.com', subject: 'Java Developer - Rajesh Kumar', status: 'Delivered', sentAt: '10 min ago' },
      { id: 2, to: 'michael@digitalinnov.com', subject: 'React Dev - Maria Garcia', status: 'Opened', sentAt: '25 min ago' },
      { id: 3, to: 'jmartinez@cloudscale.com', subject: 'DevOps Eng - David Park', status: 'Delivered', sentAt: '1 hr ago' },
      { id: 4, to: 'dwilson@entsys.com', subject: '.NET Dev - Michael Chen', status: 'Bounced', sentAt: '2 hrs ago' },
      { id: 5, to: 'landerson@datastream.com', subject: 'Data Eng - Priya Sharma', status: 'Delivered', sentAt: '3 hrs ago' },
      { id: 6, to: 'tbradley@megacorp.com', subject: 'Cloud Arch - Ahmed Hassan', status: 'Opened', sentAt: '4 hrs ago' }
    ]
  },
  documentEditor: {
    name: 'Document Editor',
    status: 'Operational',
    uptime: '99.5%',
    lastCheck: '3 min ago',
    stats: { resumesProcessed: 156, tailoredToday: 23, avgProcessingTime: '4.2s' }
  },
  llm: {
    name: 'LLM Service (GPT-4)',
    status: 'Operational',
    uptime: '99.8%',
    lastCheck: '30 sec ago',
    costs: {
      today: 12.47,
      thisWeek: 78.32,
      thisMonth: 312.89,
      budget: 500.00
    },
    usage: {
      resumeTailoring: { calls: 156, tokens: 234000, cost: 4.68 },
      emailGeneration: { calls: 342, tokens: 128000, cost: 2.56 },
      jobParsing: { calls: 611, tokens: 456000, cost: 9.12 },
      skillMatching: { calls: 89, tokens: 67000, cost: 1.34 }
    }
  },
  database: {
    name: 'MongoDB Atlas',
    status: 'Operational',
    uptime: '99.99%',
    lastCheck: '15 sec ago',
    stats: { totalDocs: '2.4M', storageUsed: '4.7 GB', connections: 23, avgQueryTime: '12ms' }
  }
};

export const mockLinkedInAccounts = [
  { id: 1, email: 'scraper1@staffpro.com', name: 'StaffPro Bot 1', status: 'Active', sessionsToday: 3, sessionBudget: 8, pagesVisited: 42, pageBudget: 50, cooldownUntil: null, flagReason: null, lastUsed: '35 min ago' },
  { id: 2, email: 'scraper2@staffpro.com', name: 'StaffPro Bot 2', status: 'Active', sessionsToday: 2, sessionBudget: 8, pagesVisited: 28, pageBudget: 50, cooldownUntil: null, flagReason: null, lastUsed: '1 hr ago' },
  { id: 3, email: 'scraper3@staffpro.com', name: 'StaffPro Bot 3', status: 'Cooling Down', sessionsToday: 6, sessionBudget: 8, pagesVisited: 48, pageBudget: 50, cooldownUntil: '2025-02-09T14:00:00Z', flagReason: null, lastUsed: '3 hrs ago' },
  { id: 4, email: 'scraper4@staffpro.com', name: 'StaffPro Bot 4', status: 'Flagged', sessionsToday: 0, sessionBudget: 8, pagesVisited: 0, pageBudget: 50, cooldownUntil: null, flagReason: 'Unusual activity detected - manual review needed', lastUsed: '2 days ago' }
];

export const mockScraperKeywords = [
  { id: 1, keyword: 'java developer c2c', enabled: true, lastSearched: '35 min ago', totalLeads: 1247, leadsThisWeek: 87 },
  { id: 2, keyword: 'react developer c2c', enabled: true, lastSearched: '40 min ago', totalLeads: 982, leadsThisWeek: 72 },
  { id: 3, keyword: 'devops engineer c2c', enabled: true, lastSearched: '45 min ago', totalLeads: 856, leadsThisWeek: 61 },
  { id: 4, keyword: 'python developer c2c', enabled: true, lastSearched: '1 hr ago', totalLeads: 734, leadsThisWeek: 54 },
  { id: 5, keyword: '.net developer c2c', enabled: true, lastSearched: '1 hr ago', totalLeads: 623, leadsThisWeek: 42 },
  { id: 6, keyword: 'data engineer c2c', enabled: true, lastSearched: '1.5 hrs ago', totalLeads: 567, leadsThisWeek: 38 },
  { id: 7, keyword: 'cloud architect c2c', enabled: true, lastSearched: '2 hrs ago', totalLeads: 445, leadsThisWeek: 31 },
  { id: 8, keyword: 'sap consultant c2c', enabled: true, lastSearched: '2 hrs ago', totalLeads: 398, leadsThisWeek: 28 },
  { id: 9, keyword: 'salesforce developer c2c', enabled: true, lastSearched: '3 hrs ago', totalLeads: 356, leadsThisWeek: 24 },
  { id: 10, keyword: 'qa automation c2c', enabled: false, lastSearched: '1 day ago', totalLeads: 289, leadsThisWeek: 0 },
  { id: 11, keyword: 'business analyst w2', enabled: true, lastSearched: '3 hrs ago', totalLeads: 234, leadsThisWeek: 18 },
  { id: 12, keyword: 'scrum master c2c', enabled: false, lastSearched: '3 days ago', totalLeads: 178, leadsThisWeek: 0 }
];

export const mockScraperGroups = [
  { id: 1, name: 'C2C Jobs - USA', url: 'https://linkedin.com/groups/c2c-jobs', enabled: true, lastScraped: '1 hr ago', totalPosts: 3421, members: '45.2K' },
  { id: 2, name: 'IT Staffing Network', url: 'https://linkedin.com/groups/it-staffing', enabled: true, lastScraped: '2 hrs ago', totalPosts: 2897, members: '38.1K' },
  { id: 3, name: 'Bench Sales Recruiters', url: 'https://linkedin.com/groups/bench-sales', enabled: true, lastScraped: '3 hrs ago', totalPosts: 1823, members: '22.7K' },
  { id: 4, name: 'W2 Contract Jobs', url: 'https://linkedin.com/groups/w2-jobs', enabled: false, lastScraped: '5 days ago', totalPosts: 987, members: '15.3K' }
];

export const mockAdminCustomers = [
  {
    id: 1, company: 'TechStaff Solutions', plan: 'Enterprise', status: 'Active',
    users: 12, candidates: 45, submissions: 342, placements: 23,
    joinedDate: 'Jan 2024', lastActive: '2 min ago', monthlySpend: 2499,
    contacts: [
      { name: 'John Smith', email: 'john@techstaff.com', role: 'Admin', lastLogin: '2 min ago' },
      { name: 'Sarah Lee', email: 'sarah@techstaff.com', role: 'Recruiter', lastLogin: '1 hr ago' }
    ]
  },
  {
    id: 2, company: 'Quantum Recruiters', plan: 'Professional', status: 'Active',
    users: 8, candidates: 28, submissions: 198, placements: 15,
    joinedDate: 'Mar 2024', lastActive: '15 min ago', monthlySpend: 999,
    contacts: [
      { name: 'Mike Johnson', email: 'mike@quantum.com', role: 'Admin', lastLogin: '15 min ago' }
    ]
  },
  {
    id: 3, company: 'ProStaffing Inc', plan: 'Professional', status: 'Active',
    users: 6, candidates: 19, submissions: 156, placements: 11,
    joinedDate: 'Jun 2024', lastActive: '3 hrs ago', monthlySpend: 999,
    contacts: [
      { name: 'Lisa Brown', email: 'lisa@prostaffing.com', role: 'Admin', lastLogin: '3 hrs ago' }
    ]
  },
  {
    id: 4, company: 'Elite Consulting', plan: 'Starter', status: 'Trial',
    users: 2, candidates: 5, submissions: 23, placements: 1,
    joinedDate: 'Jan 2025', lastActive: '1 day ago', monthlySpend: 0,
    contacts: [
      { name: 'Tom Wilson', email: 'tom@eliteconsult.com', role: 'Admin', lastLogin: '1 day ago' }
    ]
  },
  {
    id: 5, company: 'Apex HR Solutions', plan: 'Enterprise', status: 'Active',
    users: 15, candidates: 67, submissions: 523, placements: 41,
    joinedDate: 'Nov 2023', lastActive: '5 min ago', monthlySpend: 2499,
    contacts: [
      { name: 'Rachel Green', email: 'rachel@apexhr.com', role: 'Admin', lastLogin: '5 min ago' },
      { name: 'David Kim', email: 'david@apexhr.com', role: 'Manager', lastLogin: '30 min ago' }
    ]
  }
];

export const mockAdminOutreach = [
  { id: 1, to: 'Sarah Johnson', email: 'sarah.j@techcorp.com', subject: 'Sr Java Dev - Rajesh Kumar', candidate: 'Rajesh Kumar', job: 'Senior Java Developer', status: 'Opened', sentAt: '2025-02-09 10:30', customer: 'TechStaff Solutions' },
  { id: 2, to: 'Michael Chen', email: 'michael@digitalinnov.com', subject: 'React Dev - Maria Garcia', candidate: 'Maria Garcia', job: 'React Frontend Engineer', status: 'Delivered', sentAt: '2025-02-09 09:15', customer: 'TechStaff Solutions' },
  { id: 3, to: 'Jennifer Martinez', email: 'jmartinez@cloudscale.com', subject: 'DevOps - David Park', candidate: 'David Park', job: 'DevOps Engineer', status: 'Replied', sentAt: '2025-02-08 14:00', customer: 'Quantum Recruiters' },
  { id: 4, to: 'David Wilson', email: 'dwilson@entsys.com', subject: '.NET Dev - Michael Chen', candidate: 'Michael Chen', job: 'Full Stack .NET Developer', status: 'Bounced', sentAt: '2025-02-08 11:30', customer: 'ProStaffing Inc' },
  { id: 5, to: 'Lisa Anderson', email: 'landerson@datastream.com', subject: 'Data Eng - Priya Sharma', candidate: 'Priya Sharma', job: 'Python Data Engineer', status: 'Delivered', sentAt: '2025-02-08 09:45', customer: 'Quantum Recruiters' },
  { id: 6, to: 'Tom Bradley', email: 'tbradley@megacorp.com', subject: 'Cloud Arch - Ahmed Hassan', candidate: 'Ahmed Hassan', job: 'Cloud Architect - AWS', status: 'Opened', sentAt: '2025-02-07 16:00', customer: 'Apex HR Solutions' },
  { id: 7, to: 'Patricia Gomez', email: 'pgomez@crmsolutions.com', subject: 'SF Dev - Lisa Wang', candidate: 'Lisa Wang', job: 'Salesforce Developer', status: 'Sent', sentAt: '2025-02-07 14:30', customer: 'Apex HR Solutions' },
  { id: 8, to: 'Rachel Kim', email: 'rkim@globalconsult.com', subject: 'SAP - Carlos Rivera', candidate: 'Carlos Rivera', job: 'SAP S/4HANA Consultant', status: 'Delivered', sentAt: '2025-02-07 10:00', customer: 'Elite Consulting' }
];

export const mockAdminSettings = {
  scraper: {
    fetchWindowHours: 1,
    dailySessionBudget: 8,
    dailyPageBudget: 50,
    keywordsPerSession: 5,
    maxPostsPerSearch: 25
  },
  notifications: {
    emailOnNewLeads: true,
    emailOnErrors: true,
    emailOnAccountFlagged: true,
    emailOnBudgetExhausted: true,
    slackWebhook: 'https://hooks.slack.com/services/T00/B00/xxx',
    alertThreshold: 5
  },
  outreach: {
    defaultSignature: 'Best regards,\\nStaffPro Team',
    replyToAddress: 'outreach@staffpro.com',
    smtpHost: 'smtp.sendgrid.net',
    smtpPort: 587,
    dailyLimitPerCandidate: 10
  }
};