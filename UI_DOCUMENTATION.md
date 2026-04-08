# C2C Staffing Lead Platform - UI Design

A comprehensive enterprise-grade UI for a C2C (Consultant-to-Consultant) Staffing Lead Intelligence and Candidate Outreach Platform. This platform serves three distinct user types with beautiful, functional interfaces.

## 🎨 Design Features

- **Dual Theme Support**: Seamless dark/light mode switching with smooth transitions
- **Professional Typography**: Outfit font for headings, IBM Plex Sans for body text
- **Enterprise-Grade Components**: Clean, modern design following Swiss & High-Contrast archetype
- **Smooth Animations**: Framer Motion for delightful micro-interactions
- **Responsive Design**: Mobile-first approach with perfect desktop experience
- **Accessibility**: All interactive elements have proper test IDs and focus states

## 🔐 Demo Credentials

### Candidate Portal
- **Email**: `candidate@demo.com`
- **Password**: `candidate123`
- **Features**: Job search, resume management, application tracking

### Business Portal
- **Email**: `business@demo.com`
- **Password**: `business123`
- **Features**: Lead management, candidate database, outreach automation

### Admin Portal
- **Email**: `admin@demo.com`
- **Password**: `admin123`
- **Features**: Platform monitoring, scraping operations, customer management

## 📱 User Portals

### 1️⃣ Candidate Portal

**Dashboard**
- KPI cards showing new jobs, matches, applications, and responses
- Top job matches with match scores
- Recent activity timeline
- Quick access to all features

**Job Leads Explorer**
- Advanced search and filtering
- Job cards with detailed information
- Match scoring system
- Direct application capability

**Resume Lab**
- Multiple resume versions management
- ATS score tracking
- Resume completeness metrics
- Upload/download functionality
- Skills extraction preview

**Resume Tailoring Workspace**
- Side-by-side job description and resume comparison
- AI-powered optimization (UI mockup)
- Custom editing capabilities
- Match score improvement tracking

**Applications & Outreach**
- Application status tracking
- Response rate analytics
- Follow-up management
- Resume version tracking per application

### 2️⃣ Business Portal

**Command Center Dashboard**
- Daily scraping metrics
- Qualified leads tracking
- Candidate matches overview
- Email outreach statistics
- Lead intake by source visualization
- Response rate circular progress
- Top skills and locations in market

**Candidate Database**
- Comprehensive candidate profiles
- Skills-based search and filtering
- Match count per candidate
- Quick submission capabilities
- Availability and rate tracking

**Outreach Automation**
- **Activity Feed**: Email tracking with delivery status
- **Templates**: Pre-built email templates with variables
- **Automation Rules**: Workflow automation with triggers and actions
  - Auto-send approved candidates
  - Follow-up sequences
  - Daily lead summaries
- Open rate and response rate analytics
- Pause/play controls for automations

### 3️⃣ Admin Portal

**Platform Control Center**
- Total customers and active users
- Posts scraped today with success rate
- Recent scraping runs table with detailed metrics
- Source health monitoring
- Top customers by activity
- System uptime tracking

**Scraping Operations**
- Run-by-run breakdown (LinkedIn, Dice, Indeed)
- Success/failure rates
- Duplicate detection metrics
- Time-stamped execution logs

## 🎯 Design System

### Color Palette

**Light Mode**
- Background: `zinc-50`
- Surface: `white`
- Primary: `blue-600`
- Text: `zinc-950` / `zinc-500`
- Borders: `zinc-200`

**Dark Mode**
- Background: `#09090b`
- Surface: `#18181b`
- Primary: `blue-500`
- Text: `zinc-50` / `zinc-400`
- Borders: `zinc-800`

**Status Colors**
- Success: `emerald-500`
- Warning: `amber-500`
- Danger: `rose-500`

### Typography Scale

- **H1**: `text-4xl sm:text-5xl lg:text-6xl` (Outfit)
- **H2**: `text-2xl sm:text-3xl lg:text-4xl` (Outfit)
- **H3**: `text-xl sm:text-2xl` (Outfit)
- **Body**: `text-sm sm:text-base` (IBM Plex Sans)
- **Label**: `text-xs uppercase tracking-wider` (IBM Plex Sans)

### Component Library

- **Buttons**: Primary, secondary, ghost variants with hover states
- **Cards**: Flat surfaces with subtle borders and hover effects
- **Navigation**: Collapsible sidebar with glassmorphism header
- **Tables**: Dense, scannable with status badges
- **Forms**: Clean inputs with icon support
- **Modals**: Animated dialogs with backdrop blur

## 🛠️ Tech Stack

- **React 19**: Latest React with hooks
- **React Router v7**: Client-side routing
- **Tailwind CSS**: Utility-first styling
- **Phosphor Icons**: Modern, crisp icon set
- **Framer Motion**: Animation library
- **Radix UI**: Accessible component primitives
- **Shadcn/UI**: Pre-built accessible components

## 📊 Mock Data

All pages use comprehensive mock data demonstrating:
- **5 Job Leads** with full details (skills, rates, locations, recruiters)
- **3 Recruiters** with contact info and posting history
- **3 Candidates** with complete profiles
- **3 Applications** with status tracking
- **3 Email Templates** with variable support
- **3 Outreach Activities** with delivery status
- **Analytics Data** (jobs scraped, response rates, top skills/locations)
- **3 Scraping Runs** with detailed metrics

## 🎭 Key Features Demonstrated

### Authentication
- Multi-role login system
- Protected routes by user type
- Session management with context
- Demo credential quick-fill buttons

### Theme Switching
- Persistent theme preference (localStorage)
- Smooth color transitions
- Theme toggle in navigation
- Consistent across all pages

### Animations
- Page transition fade-ins
- Card hover effects with lift
- Staggered list animations
- Button scale on hover
- Smooth tab switching

### Enterprise Features
- Data-dense tables with sorting capability
- Advanced filtering systems
- Status badge system
- Progress indicators
- Metric cards with trends
- Activity timelines
- Automation workflow UI

## 📁 Project Structure

```
/app/frontend/src/
├── components/
│   ├── DashboardLayout.js      # Main layout with sidebar
│   ├── ThemeToggle.js          # Theme switcher component
│   ├── StatCard.js             # KPI stat card
│   ├── JobCard.js              # Job listing card
│   └── ui/                     # Shadcn UI components
├── contexts/
│   ├── ThemeContext.js         # Theme state management
│   └── AuthContext.js          # Authentication state
├── data/
│   └── mockData.js             # All mock data
├── pages/
│   ├── Login.js                # Login page
│   ├── candidate/              # Candidate portal pages
│   │   ├── CandidateDashboard.js
│   │   ├── JobLeads.js
│   │   ├── ResumeLab.js
│   │   ├── ResumeTailoring.js
│   │   └── Applications.js
│   ├── business/               # Business portal pages
│   │   ├── BusinessDashboard.js
│   │   ├── CandidateManagement.js
│   │   └── OutreachAutomation.js
│   └── admin/                  # Admin portal pages
│       └── AdminDashboard.js
├── App.js                      # Main app with routing
├── App.css                     # Custom styles
└── index.css                   # Tailwind + fonts
```

## 🚀 Running the Application

The application is already running and accessible at:
**https://funny-ride-2.preview.emergentagent.com**

### Local Development

```bash
# Frontend is already set up and running
cd /app/frontend

# Install dependencies (already done)
yarn install

# Start development server (already running)
yarn start
```

## 🎨 Design Guidelines

This UI follows the design guidelines from `/app/design_guidelines.json`:

1. **Swiss & High-Contrast** archetype for professional look
2. **Generous spacing** inside containers (p-6 or p-8)
3. **Glassmorphism** for overlays and sticky headers
4. **F-Pattern layout** for dashboards
5. **Status-driven color system** for clear visual hierarchy
6. **No massive border-radius** - enterprise-appropriate (rounded-lg, rounded-xl max)
7. **Explicit transitions** - no `transition-all`, specific properties only
8. **data-testid** on all interactive elements for testing

## 📸 Screenshots

All pages have been tested in both light and dark modes:
- ✅ Login page (light & dark)
- ✅ Candidate dashboard (light & dark)
- ✅ Business dashboard (light & dark)
- ✅ Candidate management (light & dark)
- ✅ Outreach automation (light & dark)
- ✅ Admin dashboard (light & dark)

## 🎯 Pages Implemented

### Fully Functional Pages
1. Login (with demo credentials)
2. Candidate Dashboard
3. Job Leads Explorer (with filters)
4. Resume Lab
5. Resume Tailoring Workspace
6. Applications Tracking
7. Business Dashboard
8. Candidate Management
9. Outreach Automation (Activity, Templates, Rules)
10. Admin Dashboard

### Navigation Structure
- All navigation links are properly set up
- Route protection based on user type
- Automatic redirection on login
- Clean logout flow

## 💡 UI/UX Highlights

- **Clear Visual Hierarchy**: Important metrics at top, details below
- **Scannable Content**: Dense but readable tables and cards
- **Status Indicators**: Color-coded badges for quick status recognition
- **Progressive Disclosure**: Details revealed on interaction
- **Consistent Patterns**: Same interaction patterns across all portals
- **Professional Aesthetics**: Enterprise-grade design that converts

## 🔄 Next Steps (For Backend Integration)

When connecting to a real backend:

1. Replace mock data imports with API calls
2. Update AuthContext to use real authentication endpoint
3. Add loading states during API calls
4. Implement error handling and retry logic
5. Add form validation
6. Connect file upload functionality
7. Implement real-time updates for automation status
8. Add pagination for large data sets

---

**Built with attention to detail for an enterprise-grade user experience** ✨

All UI elements are properly styled, animated, and ready for backend integration!