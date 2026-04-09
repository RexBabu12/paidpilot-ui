# Enterprise C2C Staffing Lead Platform - PRD

## Original Problem Statement
Build an Enterprise C2C Staffing Lead Platform UI with three user types: Candidate, Business (Consultancy/Staffing), and Admin. Features include job lead dashboards, recruiter intelligence, resume management, and email outreach workspaces. **UI/UX Design ONLY** - backend is the user's responsibility.

## Core Concept
A staffing/consultancy firm uses this platform to:
1. View scraped job leads (background system scrapes job postings)
2. Manage multiple candidates grouped under bench sales recruiters
3. Send emails to recruiters about job postings on behalf of candidates
4. Track outreach and analytics per candidate

## Architecture
- **Frontend**: React.js + Tailwind CSS + Framer Motion + Phosphor Icons
- **State**: React Context API (AuthContext, ThemeContext)
- **Data**: Local mock data (`mockData.js`)
- **Routing**: React Router v6 with protected routes
- **No backend** - all data is mocked

## What's Been Implemented

### Candidate Portal (Redesigned - Feb 9, 2026)
All pages redesigned with comprehensive data fields and enterprise UX:

- **Dashboard** (`/candidate/dashboard`): 5 KPI stat blocks (Jobs Scraped Today, Matching Jobs, Applications Sent, Response Rate, Profile Views), Application Pipeline donut charts (Sent/Viewed/Replied/Interview), Weekly Activity bar chart, Resume Health section (ATS Score ring), Latest Scraped Jobs list, Recent Activity feed, Top Skills in Demand
- **Jobs Explorer** (`/candidate/jobs`): Full table with role_title, engagement_type, post_type, work_mode, location, rate_raw, visa_constraints, source, author info, scraped_at. Click row to expand (shows raw_text & skills). Hover reveals "Send to Apply" button. Eye icon opens detail modal. Link icon opens source post. Filter sidebar: keyword, engagement type, work mode, date scraped, has contact, rate present toggles
- **Resume Lab** (`/candidate/resume`): Table view with default badge, skills tags (hover to show all if >6), ATS score bar, edit/download/set-default/delete actions. Filter sidebar: search, skill tags, min ATS score, last updated, default only toggle. Upload & delete modals. Master Resume Profile stats
- **Recruiters** (`/candidate/recruiters`): Simple table (no sidebar filters). Columns: Name, Company, Phone, Email, LinkedIn, Automate (Robot icon). Hover on automate shows email preview tooltip. Click opens full email template modal with Send button
- **Applications** (`/candidate/applications`): Application tracking table
- **Profile** (`/candidate/profile`): Candidate profile editor
- **Settings** (`/candidate/settings`): Notification and account settings

### Business Portal (Complete - Feb 8, 2026)
All pages redesigned for consultancy multi-candidate workflow:

- **Dashboard** (`/business/dashboard`): 4 KPI blocks, Recent Activity feed, Candidate summary list, Latest Scraped Jobs
- **Job Leads** (`/business/leads`): Dual table/grid view, filter sidebar, multi-job selection, "Send Candidates" modal
- **Candidates** (`/business/candidates`): Grouped by bench sales recruiter, full profile modal, "Add Candidate" form
- **Recruiters** (`/business/recruiters`): Simple contact directory, "Send Profile" action
- **Outreach** (`/business/outreach`): Per-candidate filter, email tracking table
- **Analytics** (`/business/analytics`): Per-candidate filter, KPI cards, charts
- **Team** (`/business/team`): Grouped by role, "Add Member" modal
- **Settings** (`/business/settings`): Company profile, notifications, billing, integrations

### Shared Components
- DashboardLayout with sidebar navigation
- StatCard, ThemeToggle, JobCard
- AuthContext (mock login), ThemeContext (dark/light)

### Mock Data Schema (mockData.js)
- `mockJobs`: role_title, engagement_type, post_type, work_mode, location, rate_raw, visa_constraints, skills, experience, source, author_name, author_company, author_email, author_phone, author_linkedin, post_url, scraped_at, raw_text, status, matchScore
- `mockRecruiters`: name, company, email, phone, linkedIn, totalPosts, lastActive, commonRoles, commonLocations, engagementPreference, responseRate
- `mockResumes`: name, updated, isDefault, tags, atsScore, completeness, format, size
- `mockBusinessCandidates`: Full candidate profiles with outreach history
- `mockApplications`, `mockEmailTemplates`, `mockOutreachActivity`, `mockAnalytics`

## Prioritized Backlog

### P1 - Admin Portal Pages
- Platform Dashboard (overview metrics)
- Scraping Ops management
- Parsing Quality Review
- Customer Management
- Audit Logs

### P2 - Advanced Features
- Resume Diff Viewer (side-by-side JD vs Tailored Resume)
- Resume Tailoring Workspace
- Global Search / Advanced Filters

### P3 - Polish
- Mobile responsive refinements
- Loading states and skeleton screens
- Complete data-testid audit across all pages
