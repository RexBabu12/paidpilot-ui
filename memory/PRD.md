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

### Candidate Portal (Complete)
- Dashboard, Job Leads Explorer, Matches, Resume Lab
- Applications, Recruiter Portal, Profile, Settings
- Enterprise table/grid views with filters

### Business Portal (Complete - Feb 8, 2026)
All pages redesigned for consultancy multi-candidate workflow:

- **Dashboard** (`/business/dashboard`): 4 KPI blocks (Total Candidates, Active Submissions, Placements, Scraped Jobs), Recent Activity feed, Candidate summary list, Latest Scraped Jobs
- **Job Leads** (`/business/leads`): Dual table/grid view (both functional), filter sidebar (engagement, work mode, date, contact, rate), multi-job selection via checkboxes, "Send Candidates" modal for batch assignment
- **Candidates** (`/business/candidates`): **MOST IMPORTANT PAGE** - Grouped by bench sales recruiter (collapsible), click candidate opens full profile modal (editable: contact, professional details, skills, education, certifications, summary, resume, submission history), "Add Candidate" form captures all details
- **Recruiters** (`/business/recruiters`): Simple contact directory (phone/email/LinkedIn icons), "Send Profile" action to select and email candidate profile
- **Outreach** (`/business/outreach`): Per-candidate filter dropdown, email tracking table (candidate/job/recruiter/date/status)
- **Analytics** (`/business/analytics`): Per-candidate filter, KPI cards, submission bar charts, conversion funnel, market insights (skills/locations)
- **Team** (`/business/team`): Grouped by role (Bench Sales Recruiter, Senior Recruiter, BD, Sales, Account Manager), shows assigned candidates, "Add Member" modal
- **Settings** (`/business/settings`): Company profile form, notification toggles, billing plan (Enterprise), integrations (Gmail, LinkedIn, Slack, Dice, Bullhorn, Calendly)

### Shared Components
- DashboardLayout with sidebar navigation
- StatCard, ThemeToggle, JobCard
- AuthContext (mock login), ThemeContext (dark/light)

## Prioritized Backlog

### P1 - Admin Portal Pages
- Platform Dashboard (overview metrics)
- Scraping Ops management
- Parsing Quality Review
- Customer Management
- Audit Logs

### P2 - Advanced Features
- Global Search / Advanced Filters (Visa, Rate, Remote/Hybrid)
- Resume Diff Viewer (side-by-side JD vs Tailored Resume)
- Resume Tailoring Workspace

### P3 - Polish
- Mobile responsive refinements
- Loading states and skeleton screens
- Complete data-testid audit across candidate pages
