# C2C Staffing Platform — Complete Product Specification

> **Purpose:** This document is a full, production-level specification for the C2C Staffing Lead Intelligence & Candidate Outreach Workspace. It is intended for Emergent (or any AI/human developer) to rebuild this application with production-quality code from scratch.

---

## 1. Product Overview

**Product Name:** C2C Staffing Platform  
**Tagline:** Lead Intelligence & Candidate Outreach Workspace  
**Type:** Multi-tenant SaaS web application  
**Primary Domain:** IT staffing, C2C (Corp-to-Corp) and W2 contract placements, recruiter outreach automation

### What It Does
The platform serves three distinct user types in the staffing industry:

1. **Candidates** — IT professionals (developers, engineers) who are looking for contract/fulltime jobs. They use the platform to find scraped job leads, manage multiple resume versions, track applications, and automate recruiter outreach.
2. **Businesses (Staffing Agencies)** — Companies that manage a "bench" of candidate contractors. They submit candidates to recruiters for open positions and track placements.
3. **Admins** — Platform operators who manage the LinkedIn scraper, system health, customers, and global data.

---

## 2. Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| Framework | React 19 with Create React App (CRA) + CRACO |
| Routing | react-router-dom v7 |
| Styling | Tailwind CSS v3 |
| UI Components | Shadcn/ui (Radix UI primitives) |
| Icons | @phosphor-icons/react |
| Animations | Framer Motion |
| Charts | Custom SVG + Recharts |
| Forms | react-hook-form + Zod |
| HTTP Client | Axios |
| Theme | next-themes (light/dark) |

### Backend
| Layer | Technology |
|---|---|
| Framework | FastAPI (Python) |
| Database | MongoDB (via Motor async driver) |
| ORM/Validation | Pydantic v2 |
| Auth | JWT (python-jose + bcrypt/passlib) |
| CORS | Starlette CORSMiddleware |
| Server | Uvicorn |

### Environment Variables (Backend)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=c2c_staffing
CORS_ORIGINS=http://localhost:3000
```

---

## 3. Authentication System

### Route: `/login`

**Demo Credentials (mock — must be replaced with real auth in production):**
| User Type | Email | Password |
|---|---|---|
| Candidate | `candidate@demo.com` | `candidate123` |
| Business | `business@demo.com` | `business123` |
| Admin | `admin@demo.com` | `admin123` |

### Login Page Features
- Full-screen layout with background image (low opacity texture)
- Dark/light mode toggle in top-right corner
- Animated card entry (Framer Motion fade-in + slide-up)
- Email field with `EnvelopeSimple` icon
- Password field with `Lock` icon + show/hide toggle (`Eye`/`EyeSlash`)
- "Demo Credentials" section below the form — three clickable cards that auto-fill credentials
- On success: redirect based on user type
  - Candidate → `/candidate/dashboard`
  - Business → `/business/dashboard`
  - Admin → `/admin/dashboard`
- Error state: rose-colored error banner

### Auth Context (`AuthContext.js`)
```js
// Provides:
user        // { email, type, name } | null
login(email, password)   // returns { success, error }
logout()
```

---

## 4. Shared Layout: DashboardLayout

All authenticated pages use a shared `DashboardLayout` component.

### Layout Structure
- **Left Sidebar (256px wide, fixed):** Navigation + user section
- **Main Content Area:** `lg:pl-64` offset, scrollable
- **Top Header Bar (sticky):** Glass effect, "Welcome back, {name}" + ThemeToggle

### Sidebar Features
- Logo: "C2C Staffing" + "{userType} Portal" label
- Navigation links: vary by user type (see per-portal navigation below)
- Active link: Blue-600 background, white text, filled icon
- Inactive link: Zinc text, hover zinc-100/zinc-800 background
- Bottom user section: Avatar circle with initials, name, email, Sign Out button
- Mobile: Hamburger menu, animated slide-in sidebar, dark overlay backdrop

### Navigation Per Portal

**Candidate:**
- Dashboard → `/candidate/dashboard`
- Jobs Explorer → `/candidate/jobs`
- Resume Lab → `/candidate/resume`
- Applications → `/candidate/applications`
- Recruiters → `/candidate/recruiters`
- Profile → `/candidate/profile`
- Settings → `/candidate/settings`

**Business:**
- Dashboard → `/business/dashboard`
- Job Leads → `/business/leads`
- Candidates → `/business/candidates`
- Recruiters → `/business/recruiters`
- Outreach → `/business/outreach`
- Analytics → `/business/analytics`
- Team → `/business/team`
- Settings → `/business/settings`

**Admin:**
- Dashboard → `/admin/dashboard`
- Jobs / Leads → `/admin/leads`
- Customers → `/admin/customers`
- Recruiters → `/admin/recruiters`
- Outreach → `/admin/outreach`
- Candidates → `/admin/candidates`
- Scraper Control → `/admin/scraper`
- System Info → `/admin/system`
- Settings → `/admin/settings`

### Protected Routes
All dashboard routes are wrapped in `<ProtectedRoute allowedTypes={[type]}>`. Unauthenticated users are redirected to `/login`. Wrong user type is also redirected.

---

## 5. Candidate Portal — All Pages

### 5.1 Candidate Dashboard (`/candidate/dashboard`)

**Purpose:** Overview of a job seeker's current activity at a glance.

**KPI Stats Bar (5 cards, responsive grid):**
| Metric | Icon | Color |
|---|---|---|
| Jobs Scraped Today | Briefcase | Blue-600 |
| Matching Jobs | Target | Purple-600 |
| Applications Sent | EnvelopeSimple | Emerald-600 |
| Response Rate | ChartLineUp | Amber-600 |
| Profile Views | Eye | Rose-600 |

Each stat card has: icon with colored bg, large value, label, trend badge (ArrowUp/Down + percentage).

**Main Content (2/3 + 1/3 columns):**

Left column:
- **Application Pipeline:** 4 circular progress rings (SVG) — Sent, Viewed, Replied, Interview — each showing count + percentage
- **Weekly Activity Bar Chart:** Mini bar chart (Mon–Sun) showing application counts. Custom SVG bars.
- **Latest Scraped Jobs:** Table-style list of 4 most recent jobs with: title, company, location, engagement type badge, rate. "View All" link.

Right column:
- **Resume Health:** Circular ATS score gauge (95/100), default resume name, total versions, last updated, link to Resume Lab
- **Recent Activity Feed:** 5 recent events (resume tailored, application sent, profile view, job match, reminder), each with icon, action text, detail, timestamp
- **Top Skills in Demand:** Bar chart of 5 skills (Java, Python, React, AWS, Kubernetes) with job counts and horizontal progress bars

---

### 5.2 Jobs Explorer (`/candidate/jobs`)

**Purpose:** Browse all scraped C2C/W2 job leads.

**Layout:** Left filter sidebar (256px) + Main table area

**Filter Sidebar:**
- Keyword search input (searches role title + skills)
- Engagement Type checkboxes: C2C, W2, Both
- Work Mode checkboxes: Remote, Hybrid, Onsite
- Date Scraped dropdown: All time / Today / Last 3 days / Last 7 days
- Has Contact toggle (custom CSS toggle)
- Rate Present toggle
- "Clear All" button

**Main Table:**
- Sort dropdown: Newest / Best Match / Highest Rate
- Result count: "Showing X results"
- Columns: Role, Type, Location, Rate, Visa, Source, Scraped, Actions

**Table Row Features:**
- Click row → inline expand animation (AnimatePresence) showing Raw Post Text + Skills chips
- Hover → "Send to Apply" button appears (Framer Motion animated button)
- View Details icon → opens Detail Modal
- External link icon → opens source URL in new tab

**Detail Modal (full job info):**
- Role title, company
- Badges: engagement type, work mode, post type
- Grid: Location, Rate, Visa, Experience
- Skills chip list
- Raw post text (scrollable)
- Source & Author section: name, company, email, phone, source, scraped time
- CTA buttons: "Send to Apply" + "View Source"

**Badge Color System:**
| Badge | Color |
|---|---|
| C2C engagement | Emerald (green) |
| W2 engagement | Blue |
| Both | Amber |
| Remote work | Emerald |
| Hybrid work | Blue |
| Onsite work | Amber |
| Hot Requirement | Red |
| Urgent Hire | Orange |
| Job Posting | Zinc (neutral) |

---

### 5.3 Resume Lab (`/candidate/resume`)

**Purpose:** Manage multiple resume versions with ATS scoring.

**Header:** Title + description + "Upload Resume" button (primary blue)

**Layout:** Left filter sidebar (240px) + Main content

**Filter Sidebar:**
- Search by name input
- Skills/Tags checkboxes: Java, React, Python, AWS, DevOps, .NET, Kubernetes, Docker
- Min ATS Score dropdown: All / 90+ / 80+ / 70+
- Last Updated dropdown: All time / This week / This month / Last 3 months
- Default Only toggle
- "Clear All" button

**Master Resume Profile Card:**
- Completeness progress bar (85%)
- Best ATS Score progress bar (95/100)
- Total Skills with tag chips (hover "+N more" shows all tags in tooltip)

**Resume Table:**
- Sort dropdown: Recently Updated / ATS Score / Name
- Columns: Resume (icon + name + default badge + format/size), Skills (tag chips), ATS Score, Updated, Actions

**ATS Score Badge:** Color-coded bar + number — emerald ≥90, blue ≥80, amber ≥70, red <70

**Per-Row Actions:**
- Edit (Pencil icon)
- Download (Download icon)
- Set as Default (Star icon — only on non-default)
- Delete (Trash icon) → opens Delete Confirmation modal

**Default Badge:** Amber star badge showing "Default" on the default resume

**Upload Modal:**
- Drag-and-drop zone with upload icon
- "PDF, DOCX (Max 5MB)" instructions
- Cancel / Upload buttons

**Delete Confirmation Modal:**
- Warning text
- Cancel / Delete (red) buttons

---

### 5.4 Applications & Outreach (`/candidate/applications`)

**Purpose:** Track job applications and communications.

**Layout:** Left filter sidebar + Main content (grid or table view)

**Filter Sidebar:**
- Keyword search (company, role)
- Status checkboxes: Sent, Replied, Follow-up, Submitted
- Date Range dropdown: All time / This week / Last 30 days / Last 90 days
- Has Response toggle

**View Toggle:** Grid view (card layout) vs Table view (row layout)

**Export button:** Download CSV/export functionality

**Grid View (default):**
Each application card shows:
- Job title (large)
- Status badge with icon (Sent=envelope/blue, Replied=checkmark/emerald, Follow-up=refresh/amber)
- Company • Recruiter name
- Sent Date, Follow-up date, Last Response (if any)
- Resume version used
- "Send Follow-up" link

**Table View:**
Columns: Job, Company, Status, Sent Date, Follow-up, Resume, Actions (View / Follow-up)

**Status Colors:**
- Sent → Blue
- Replied → Emerald (green)
- Follow-up → Amber

---

### 5.5 Recruiter Directory (`/candidate/recruiters`)

**Purpose:** View recruiters and automate outreach emails.

**Features:**
- Search bar: filter by name or company
- Table with columns: Recruiter (avatar + name), Company, Phone (tel: link), Email (mailto: link), LinkedIn (icon link), Automate (robot icon button)

**Automate Button Behavior:**
- Hover → tooltip popup showing email preview (subject + first 180 chars of body)
- Click → opens Email Preview Modal

**Email Preview Modal:**
- To (email address)
- Subject line (auto-generated: "Application for {role} - {name}")
- Attachment (default resume PDF)
- Email body (full personalized template rendered from variables)
- CTA: "Send Email" + "Cancel"

**Email Template Variables:**
`{{recruiter_name}}`, `{{job_title}}`, `{{company_name}}`, `{{experience}}`, `{{key_skills}}`, `{{highlight_1}}`, `{{highlight_2}}`, `{{highlight_3}}`, `{{engagement_type}}`, `{{availability}}`, `{{candidate_name}}`

---

### 5.6 My Profile (`/candidate/profile`)

**Purpose:** Manage professional profile and job preferences.

**Header:** Title + "Edit Profile" button → switches to edit mode with Save/Cancel

**4 Tabs (Shadcn Tabs component):**

**Tab 1 — Personal Info:**
- Profile photo (avatar initials circle + "Upload Photo" button)
- Full Name input
- Email (read-only, locked)
- Phone Number input
- Current Location input
- LinkedIn Profile URL input

**Tab 2 — Professional:**
- Current Title input
- Years of Experience (select: 1-2 / 3-5 / 5-7 / 7-10 / 10+)
- Work Authorization (select: USC / GC / H1B / EAD / OPT / Other)
- Availability (select: Immediate / 1 week / 2 weeks / 1 month / 2+ months)
- Expected Rate/Salary input

**Tab 3 — Work Preferences:**
- Engagement Type: toggle checkboxes (C2C, W2, Full-time, Contract) — selected shows blue border + blue bg
- Work Mode: toggle checkboxes (Remote, Hybrid, Onsite)
- Preferred Locations textarea (comma-separated)
- Excluded Locations textarea

**Tab 4 — Skills & Expertise:**
- Primary Skills textarea + live chip preview (blue chips)
- Secondary Skills textarea + live chip preview (zinc chips)
- Domain Expertise textarea
- Target Job Roles textarea

All fields disabled when not in edit mode (opacity-60). Saving calls `handleSave()`.

---

### 5.7 Settings (`/candidate/settings`)

**5 Tabs:**

**Tab 1 — Notifications:**
- Email Notifications: 5 toggles (New Matches, Application Updates, Recruiter Messages, Weekly Digest, Marketing Emails)
- Notification Frequency: dropdown (Instant / Hourly / Daily / Weekly)
- Job Alerts: master toggle + sub-settings (Alert Frequency, Min Match Score)

**Tab 2 — Privacy:**
- Profile Visibility: radio buttons (Public / Private / Recruiters Only) — selected has blue border + bg
- Contact Preferences: 2 toggles (Show Contact Info, Allow Recruiter Contact)

**Tab 3 — Appearance:**
- Theme Preference: two large clickable cards (Light Mode with ☀️, Dark Mode with 🌙). Click toggles theme. Selected card has blue border.

**Tab 4 — Security:**
- Change Password: 3 password fields (Current, New, Confirm) + Update button
- Connected Accounts: LinkedIn connected status + Disconnect button

**Tab 5 — Account:**
- Sign Out button
- Delete Account: red warning banner, red "Delete My Account" button with confirmation dialog

---

## 6. Business Portal — All Pages

### 6.1 Business Dashboard (`/business/dashboard`)

**4 KPI Cards:**
| Metric | Description |
|---|---|
| Total Candidates | Count on bench |
| Active Submissions | Emails sent to recruiters |
| Placements | Successful hires |
| Scraped Jobs | This month total |

Each card: label, icon (colored bg), large number, sub-label, trend badge.

**Main Content:**
- Candidate summary list with submission/interview/placement stats per candidate
- Recent Activity Feed (8 items): outreach sent, lead scraped, profile updated — each with icon, text, timestamp, colored icon bg

---

### 6.2 Job Leads (`/business/leads`)

Same structure as Candidate Jobs Explorer but from business perspective. Shows all scraped jobs for the business to review and assign to candidates.

---

### 6.3 Candidate Management (`/business/candidates`)

**Purpose:** Manage bench candidates and their submissions.

**Features:**
- Table of candidates with: Name, Title, Status (Active/Bench/Placed), Visa, Skills, Submissions count, Placements count, Assigned Recruiter
- Each row clickable to view candidate detail
- Quick actions per row

---

### 6.4 Business Recruiters (`/business/recruiters`)

Directory of recruiters that the business engages with. Same structure as Candidate Recruiter Directory.

---

### 6.5 Outreach (`/business/outreach`)

**Purpose:** Track all automated emails sent to recruiters on behalf of candidates.

**Stats Cards (4):** Total Sent, Candidates Active, This Week, Avg per Candidate

**Candidate Selector Dropdown:** Filter outreach by specific candidate or view all

**Outreach Table:**
- Candidate name + title
- Recruiter name + company
- Role applied for
- Date sent
- Status badge

---

### 6.6 Analytics (`/business/analytics`)

**Purpose:** Performance metrics for submissions and placements.

**Candidate Filter Dropdown:** All Candidates or individual

**All Candidates View:**
- 5 KPI stats: Total Submissions, Total Interviews, Total Placements, Avg per Candidate, Placement Rate %
- Horizontal bar chart: each candidate's submission count relative to maximum
- Per-candidate row cards: name, title, recruiter, with mini stats

**Single Candidate View:**
- Avatar + name + title + assigned recruiter
- 4 KPI grid: Submissions, Interviews, Placements, Placement Rate
- Full outreach history table for that candidate

---

### 6.7 Team (`/business/team`)

Manage team members (recruiters/account managers at the business).

---

### 6.8 Business Settings (`/business/settings`)

Business-level settings: company info, billing, integrations.

---

## 7. Admin Portal — All Pages

### 7.1 Admin Dashboard (`/admin/dashboard`)

**Purpose:** Full system overview — scraper health, leads volume, LinkedIn account status.

**KPI Stats (5 cards):**
| Metric | Description |
|---|---|
| Leads Today | New jobs scraped today |
| Leads This Week | Weekly totals |
| LinkedIn Sessions | Today's sessions vs budget |
| Active Accounts | LinkedIn accounts currently active |
| LLM Calls | AI processing calls today |

**Left Column (2/3):**
- **Leads Per Day Bar Chart:** 7-day history with values labeled on bars
- **Engagement Breakdown:** Stacked chart showing C2C vs W2 vs Both distribution
- **LinkedIn Account Health Table:** Per-account status dot, sessions today/budget, pages visited/budget, last run time
- **Top Scraper Keywords:** Top 5 keywords with leads found counts

**Right Column (1/3):**
- **System Services Status:** Mini cards for Scraper, Mail Service, LLM — each with status dot (green/amber/red)
- **Last Scraping Run:** Start time, duration, leads scraped, status
- **Source Breakdown:** Portal-by-portal counts (LinkedIn, Dice, Indeed, etc.)

---

### 7.2 Jobs / Leads (`/admin/leads`)

Full table of all scraped jobs across all sources. Same structure as Jobs Explorer with admin-level actions (delete, re-scrape, assign to customer).

---

### 7.3 Customers (`/admin/customers`)

Manage business customers subscribed to the platform.

**Table:** Company name, plan type, active candidates, monthly spend, status, actions.

---

### 7.4 Recruiters (`/admin/recruiters`)

Global recruiter database management. View/edit/add recruiters.

---

### 7.5 Outreach (`/admin/outreach`)

Platform-wide outreach log. Shows all emails sent across all businesses and candidates.

---

### 7.6 Candidates (`/admin/candidates`)

All candidates across all business accounts. Global view.

---

### 7.7 Scraper Control (`/admin/scraper`)

**Purpose:** Manage and monitor the LinkedIn/job scraping system.

**Header:** "Run Now" button (emerald green)

**4-Tab Navigation:**

**Tab 1 — Run History:**
Table of past scraping runs:
- Columns: Keyword, Source, Status (dot badge: Success/Partial/Failed), Start Time, Duration, Posts Scraped, New Leads
- Click row → expand to show per-portal breakdown

**Tab 2 — Keywords (N):**
- Table of keywords being tracked: Keyword, Category, Enabled toggle, Leads Found, Last Run
- "Add Keyword" button → modal with keyword + category fields
- Delete per keyword (with confirmation)

**Tab 3 — Groups (N):**
- Keyword groups for organized scraping
- Group name, keywords list, enabled toggle
- "Add Group" button

**Tab 4 — Accounts (N):**
LinkedIn accounts table:
- Account email, Status (Active/Cooling Down/Flagged), Sessions Today/Budget, Pages Visited/Budget, Last Active, Action buttons (Pause/Resume)

**Status dot colors:**
- Active → Emerald
- Cooling Down → Amber
- Flagged → Red

---

### 7.8 System Info (`/admin/system`)

**Purpose:** Real-time health monitoring of platform services.

**Overall Status Banner:** Green if all operational, Amber if any degraded.

**Service Cards (5 services):**
Each card shows:
- Service icon + name
- Status icon (CheckCircle=green / Warning=amber / XCircle=red)
- Status label
- Key metrics for that service

**Services:**
1. **Scraper Service** — LinkedIn accounts active count, sessions today, pages today, last run
2. **Mail Service** — Emails sent today, queue size, delivery rate, bounce rate
3. **Document Editor / LLM** — Resumes processed today, API calls, avg processing time, cost today
4. **Database** — Connection status, document count, storage used, last backup
5. **Additional services** as needed

---

### 7.9 Admin Settings (`/admin/settings`)

Platform-level configuration: scraper settings, email provider, LLM API keys, feature flags.

---

## 8. Data Models

### Job Lead
```typescript
{
  id: number,
  role_title: string,
  engagement_type: "C2C" | "W2" | "Both" | "Full-time",
  post_type: "Job Posting" | "Hot Requirement" | "Urgent Hire",
  work_mode: "Remote" | "Hybrid" | "Onsite",
  location: string,
  rate_raw: string,           // e.g. "$85/hr"
  visa_constraints: string,   // e.g. "USC, GC, H1B"
  skills: string[],
  experience: string,         // e.g. "8+ years"
  source: string,             // "LinkedIn", "Dice", etc.
  author_name: string,
  author_company: string,
  author_email: string,
  author_phone: string,
  author_linkedin: string,
  post_url: string,
  scraped_at: string,         // ISO datetime
  raw_text: string,
  status: "New" | "Reviewed" | "Applied",
  matchScore: number          // 0-100
}
```

### Resume
```typescript
{
  id: number,
  name: string,              // e.g. "Java_Senior_v3"
  format: string,            // "PDF" | "DOCX"
  size: string,              // e.g. "245KB"
  atsScore: number,          // 0-100
  tags: string[],            // skill tags
  updated: string,           // human-readable e.g. "2 days ago"
  isDefault: boolean
}
```

### Application
```typescript
{
  id: number,
  jobTitle: string,
  company: string,
  recruiter: string,
  status: "Sent" | "Replied" | "Follow-up" | "Submitted",
  sentDate: string,
  followUpDate: string | null,
  lastResponse: string | null,
  resumeVersion: string
}
```

### Recruiter
```typescript
{
  id: number,
  name: string,
  company: string,
  phone: string,
  email: string,
  linkedIn: string,
  commonRoles: string[],
  engagementPreference: string
}
```

### Business Candidate (bench candidate)
```typescript
{
  id: number,
  name: string,
  title: string,
  skills: string[],
  visaStatus: string,
  status: "Active" | "Bench" | "Placed",
  totalSubmissions: number,
  totalInterviews: number,
  totalPlacements: number,
  benchRecruiter: string,
  outreach: OutreachItem[]
}
```

### Outreach Item
```typescript
{
  id: number,
  recruiterName: string,
  recruiterCompany: string,
  role: string,
  date: string,
  status: "Sent" | "Replied" | "Bounced"
}
```

### LinkedIn Account (Admin)
```typescript
{
  id: number,
  email: string,
  status: "Active" | "Cooling Down" | "Flagged",
  sessionsToday: number,
  sessionBudget: number,
  pagesVisited: number,
  pageBudget: number,
  lastActive: string
}
```

### System Services (Admin)
```typescript
{
  scraper: {
    status: "Operational" | "Degraded" | "Down",
    portals: Portal[],
    ...metrics
  },
  mailService: { status, ...metrics },
  llm: { status, ...metrics },
  database: { status, ...metrics }
}
```

---

## 9. Design System

### Theme Architecture
- **Framework:** Tailwind CSS v3 with custom config
- **Mode:** Full light/dark support via `next-themes` + `dark:` variants
- **Archetype:** "Swiss & High-Contrast" Command Center

### Colors

**Light Mode:**
```
Background:    bg-zinc-50
Surface:       bg-white
Border:        border-zinc-200
Text Primary:  text-zinc-900 (or text-zinc-950)
Text Secondary: text-zinc-500
Primary CTA:   bg-blue-600, hover:bg-blue-700
Accent:        text-blue-600
```

**Dark Mode:**
```
Background:    bg-[#09090b]   (NOT pure black)
Surface:       bg-[#18181b]
Border:        border-zinc-800
Text Primary:  text-zinc-50
Text Secondary: text-zinc-400
Primary CTA:   bg-blue-500, hover:bg-blue-600
Accent:        text-blue-400
```

**Status Colors:**
```
Success (green):  bg-emerald-500/10, text-emerald-500, border-emerald-500/20
Warning (amber):  bg-amber-500/10,   text-amber-500,   border-amber-500/20
Danger (red):     bg-rose-500/10,    text-rose-500,    border-rose-500/20
Info (blue):      bg-blue-500/10,    text-blue-600,    border-blue-500/20
```

### Typography
| Element | Classes |
|---|---|
| Page title (H1) | `text-4xl sm:text-5xl font-outfit font-semibold` |
| Section heading (H2) | `text-2xl font-outfit font-semibold` |
| Card heading | `text-base font-outfit font-semibold` |
| Body text | `text-sm` (IBM Plex Sans) |
| Labels/uppercase | `text-xs font-bold uppercase tracking-wider` |
| Large metrics | `text-2xl font-bold` or `text-3xl font-bold font-outfit` |

> **Critical:** Page titles use `font-outfit`. Never use Inter or system sans for headings.

### Spacing & Layout
- Page padding: `px-4 sm:px-6 lg:px-8 py-8 lg:py-12`
- Max container: `max-w-7xl mx-auto` (dashboards use `max-w-[1800px]`)
- Card padding: `p-5` or `p-6` or `p-8`
- Rounded corners: `rounded-xl` for cards, `rounded-lg` for inputs/buttons

### Navigation/Header Glass Effect
```css
/* Sticky header and sidebar top */
bg-white/70 dark:bg-[#18181b]/60
backdrop-blur-xl backdrop-saturate-150
border-b border-zinc-200 dark:border-zinc-800
```

### Component Patterns

**Cards:**
```html
<div class="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
```

**Primary Button:**
```html
<button class="px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium">
```

**Input Field:**
```html
<input class="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500">
```

**Table Header:**
```html
<thead class="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
  <th class="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
```

**Status Badge (Emerald):**
```html
<span class="px-2 py-0.5 text-xs font-medium rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
```

**Custom Toggle Switch:**
```html
<div class="relative">
  <input type="checkbox" class="sr-only peer" />
  <div class="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500 transition-colors"></div>
  <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
</div>
```

### Animations

**Page entry (Framer Motion):**
```js
// Title/header
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}

// Cards (staggered)
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, delay: index * 0.05 }}
```

**Modal:**
```js
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.95 }}
```

**Expandable row:**
```js
initial={{ height: 0, opacity: 0 }}
animate={{ height: 'auto', opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
transition={{ duration: 0.2 }}
```

### Icons
Use `@phosphor-icons/react`. Key weights used:
- `weight="duotone"` — for KPI card icons, sidebar icons
- `weight="bold"` — for action/CTA icons
- `weight="fill"` — for status icons, active state icons
- `weight="regular"` (default) — for general UI

---

## 10. Icons Map

| Context | Icon Component |
|---|---|
| Dashboard | SquaresFour |
| Jobs/Briefcase | Briefcase |
| Resume/Document | FileText |
| Applications/Email | EnvelopeSimple |
| Recruiters/Team | UsersThree |
| User/Profile | User |
| Settings | Gear |
| Sign Out | SignOut |
| Analytics/Chart | ChartBar |
| Trend Up | TrendUp |
| Chart Line | ChartLineUp |
| Robot/Automation | Robot |
| Database | Database |
| Buildings/Company | Buildings |
| Currency | CurrencyDollar |
| Target/Match | Target |
| Eye/View | Eye |
| LinkedIn | LinkedinLogo |
| Phone | Phone |
| Location | MapPin |
| Clock | Clock |
| Filter | Funnel |
| Search | MagnifyingGlass |
| Upload | Upload |
| Download | Download |
| Edit | Pencil |
| Delete | Trash |
| Star/Default | Star |
| Send | PaperPlaneTilt |
| Arrow Up | ArrowUp |
| Arrow Down | ArrowDown |
| Check | CheckCircle |
| Warning | Warning |
| Error | XCircle |
| Lightning/Speed | Lightning |
| Add | Plus |
| Close | X |
| Play | Play |

---

## 11. Mock Data Reference

The app uses mock data from `frontend/src/data/mockData.js`. In production, all data must come from the FastAPI backend. The following collections/endpoints are needed:

| Mock Data | API Endpoint |
|---|---|
| `mockJobs` | `GET /api/jobs` |
| `mockResumes` | `GET /api/resumes` |
| `mockApplications` | `GET /api/applications` |
| `mockRecruiters` | `GET /api/recruiters` |
| `mockEmailTemplates` | `GET /api/email-templates` |
| `mockBusinessCandidates` | `GET /api/candidates` |
| `mockAnalytics` | `GET /api/analytics` |
| `mockScrapingRuns` | `GET /api/scraper/runs` |
| `mockScraperKeywords` | `GET /api/scraper/keywords` |
| `mockScraperGroups` | `GET /api/scraper/groups` |
| `mockLinkedInAccounts` | `GET /api/scraper/accounts` |
| `mockSystemServices` | `GET /api/system/status` |

---

## 12. Route Map Summary

```
/login                          → Login Page

/candidate/dashboard            → Candidate Dashboard
/candidate/jobs                 → Jobs Explorer
/candidate/resume               → Resume Lab
/candidate/applications         → Applications & Outreach
/candidate/recruiters           → Recruiter Directory
/candidate/profile              → My Profile
/candidate/settings             → Settings

/business/dashboard             → Business Dashboard
/business/leads                 → Job Leads
/business/candidates            → Candidate Management
/business/recruiters            → Recruiter Management
/business/outreach              → Outreach Tracking
/business/analytics             → Analytics
/business/team                  → Team Management
/business/settings              → Business Settings

/admin/dashboard                → Admin Dashboard
/admin/leads                    → All Leads
/admin/customers                → Customer Management
/admin/recruiters               → Global Recruiters
/admin/outreach                 → Global Outreach Log
/admin/candidates               → All Candidates
/admin/scraper                  → Scraper Control
/admin/system                   → System Info
/admin/settings                 → Admin Settings
```

---

## 13. Key UI/UX Rules for Emergent

1. **DO NOT** use pure `#000000` for dark backgrounds. Use `#09090b` (background) and `#18181b` (surface).
2. **DO NOT** use Inter or system-ui for headings — always use `Outfit` font.
3. All sticky headers MUST have the glass effect: `bg-white/70 dark:bg-[#18181b]/60 backdrop-blur-xl backdrop-saturate-150`.
4. All interactive elements MUST have `data-testid` attributes.
5. Avoid `transition-all`. Use specific transitions: `transition-colors duration-200`, `transition-transform duration-300`.
6. Use `rounded-xl` for cards, `rounded-lg` for inputs/buttons/badges. Never use `rounded-full` on cards.
7. Table density: `text-sm`, `px-4 py-3.5` for cells.
8. Modal backdrop: `fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4`.
9. Sidebar is `w-64 (256px)` fixed left. Main content is `lg:pl-64`.
10. Use `AnimatePresence` for all mount/unmount animations (modals, expandable rows, hover elements).
11. Status badges MUST use the 3-part pattern: `bg-{color}-500/10 text-{color}-600 dark:text-{color}-400 border border-{color}-500/20`.
12. All page headers follow the same pattern: large H1, subtitle, optional CTA button right-aligned.

---

## 14. File Structure

```
paidpilot-ui/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js              ← Routes + Protected Routes
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css           ← Tailwind directives + custom CSS
│   │   ├── contexts/
│   │   │   ├── AuthContext.js  ← User auth state + login/logout
│   │   │   └── ThemeContext.js ← Dark/light mode toggle
│   │   ├── components/
│   │   │   ├── DashboardLayout.js ← Shared sidebar + header layout
│   │   │   ├── ThemeToggle.js
│   │   │   ├── StatCard.js
│   │   │   ├── JobCard.js
│   │   │   └── ui/             ← Shadcn components (button, card, tabs, etc.)
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── candidate/
│   │   │   │   ├── CandidateDashboard.js
│   │   │   │   ├── JobLeads.js
│   │   │   │   ├── ResumeLab.js
│   │   │   │   ├── Applications.js
│   │   │   │   ├── RecruiterPortal.js
│   │   │   │   ├── CandidateProfile.js
│   │   │   │   ├── CandidateSettings.js
│   │   │   │   └── ResumeTailoring.js
│   │   │   ├── business/
│   │   │   │   ├── BusinessDashboard.js
│   │   │   │   ├── BusinessLeads.js
│   │   │   │   ├── CandidateManagement.js
│   │   │   │   ├── BusinessRecruiters.js
│   │   │   │   ├── OutreachAutomation.js
│   │   │   │   ├── Analytics.js
│   │   │   │   ├── BusinessTeam.js
│   │   │   │   └── BusinessSettings.js
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.js
│   │   │       ├── AdminLeads.js
│   │   │       ├── AdminCustomers.js
│   │   │       ├── AdminRecruiters.js
│   │   │       ├── AdminOutreach.js
│   │   │       ├── AdminCandidates.js
│   │   │       ├── AdminScraperControl.js
│   │   │       ├── AdminSystemInfo.js
│   │   │       └── AdminSettings.js
│   │   ├── data/
│   │   │   └── mockData.js     ← All mock data (replace with API calls)
│   │   ├── hooks/
│   │   │   └── use-toast.js
│   │   └── lib/
│   │       └── utils.js        ← cn() utility
│   ├── package.json
│   ├── craco.config.js
│   ├── tailwind.config.js
│   └── components.json         ← Shadcn config
├── backend/
│   ├── server.py               ← FastAPI app
│   └── requirements.txt
├── docs/
│   └── PRODUCT_SPEC.md         ← This file
└── screenshots/                ← Page screenshots
```

---

## 15. Production Checklist

For Emergent to build this at production level, the following must be implemented:

- [ ] Real JWT authentication (replace mock credentials)
- [ ] MongoDB data layer (replace mockData.js with API calls)
- [ ] LinkedIn scraper integration (Python/Selenium or API)
- [ ] Email sending service (SMTP or SendGrid/SES)
- [ ] LLM integration for resume tailoring (OpenAI/Anthropic)
- [ ] File upload for resumes (S3 or local storage)
- [ ] Real-time updates (WebSocket or polling for scraper status)
- [ ] Multi-tenancy (businesses isolated from each other)
- [ ] Rate limiting and auth middleware
- [ ] Environment-specific config (.env files per environment)
- [ ] Error boundaries in React
- [ ] Loading states and skeleton screens
- [ ] Pagination for all tables
- [ ] Toast notifications (Sonner already included)
- [ ] Proper form validation (react-hook-form + Zod already included)
