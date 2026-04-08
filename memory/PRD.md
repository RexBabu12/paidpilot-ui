# Enterprise C2C Staffing Lead Platform - PRD

## Original Problem Statement
Build an Enterprise C2C Staffing Lead Platform UI with three user types: Candidate, Business (Consultancy/Staffing), and Admin. Features include job lead dashboards, recruiter intelligence, resume management, and email outreach workspaces. **UI/UX Design ONLY** - backend is the user's responsibility.

## Core Requirements
- Professional enterprise-grade SaaS UI using React + Tailwind CSS
- Three portals: Candidate, Business, Admin
- Dark/Light mode support across all pages
- Animations and transitions (Framer Motion)
- Mock data for all screens (no backend)
- Responsive design with enterprise data-tables

## Architecture
- **Frontend**: React.js + Tailwind CSS + Framer Motion + Phosphor Icons
- **State**: React Context API (AuthContext, ThemeContext)
- **Data**: Local mock data (`mockData.js`)
- **Routing**: React Router v6 with protected routes

## What's Been Implemented

### Candidate Portal (Complete)
- Dashboard, Job Leads Explorer, Matches, Resume Lab
- Applications, Recruiter Portal, Profile, Settings
- Enterprise table/grid views with filters

### Business Portal (Complete - Feb 8, 2026)
- **Dashboard** (`/business/dashboard`): Consultancy Command Center with multi-candidate cards, team stats, performance summary table
- **Talent Bench** (`/business/candidates`): 10-candidate management with pipeline tabs (All/Available/Submitted/Interviewing/Placed), sortable enterprise table, expandable row details, bulk select/actions
- **Job Leads** (`/business/leads`): Job explorer with filters sidebar, Assign Candidate modal for bench-to-job assignment
- **Recruiters** (`/business/recruiters`): Recruiter intelligence table with response rates, detail panel, contact actions
- **Matches** (`/business/matches`): AI match center with score visualization, per-candidate/status filtering
- **Outreach** (`/business/outreach`): Activity log table, email templates, automation rules with pause/play
- **Analytics** (`/business/analytics`): KPI dashboard, per-candidate revenue/submission charts, pipeline distribution, market insights
- **Team** (`/business/team`): Team member cards with assigned candidates and performance stats
- **Settings** (`/business/settings`): Company profile, notification toggles, billing info, integrations

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
- Complete data-testid audit across candidate pages
- Mobile responsive refinements
- Loading states and skeleton screens
