================================================================================
C2C STAFFING PLATFORM — BACKEND SPECIFICATION
FastAPI + Python + Supabase PostgreSQL
================================================================================

This document is the single source of truth for building the C2C Staffing
Platform backend. Read this entire document before writing a single line of code.
Every decision here is intentional. Do not deviate without a strong reason.

================================================================================
SECTION 1 — WHAT WE ARE BUILDING
================================================================================

C2C Staffing Platform is a B2B SaaS for IT staffing agencies, bench sales
recruiters, and individual IT contractors working in the C2C/W2 contract market.

The backend serves three user portals:

  1. CANDIDATE PORTAL — Individual IT contractors manage their job search:
       browse scraped jobs, manage resume versions, track applications,
       find recruiters, and automate outreach emails.

  2. BUSINESS PORTAL — Staffing agencies manage their bench:
       manage candidate profiles, submit candidates to recruiters,
       track outreach/placements, run analytics.

  3. ADMIN PORTAL — Platform operators manage the entire system:
       monitor the LinkedIn/Dice scraper, manage LinkedIn accounts,
       view all customers, control scraper keywords/groups,
       monitor system health (email service, LLM, database).

The scraper (Python + Camoufox) runs independently and writes to scraped_posts.
The backend does NOT run the scraper. It only reads scraper output tables and
writes to UI-layer tables (lead status, profiles, resumes, applications, etc.).

================================================================================
SECTION 2 — TECH STACK
================================================================================

Runtime         : Python 3.12+
Framework       : FastAPI 0.111+
Server          : Uvicorn (dev) / Gunicorn + UvicornWorker (production)
Database        : Supabase PostgreSQL (psycopg2 direct connection — NOT REST)
Auth            : Supabase Auth (JWT tokens — verify server-side with HS256)
Validation      : Pydantic v2
Migrations      : SQL files in scripts/migrations/
Testing         : pytest + httpx (async test client)
Env config      : python-dotenv → pydantic-settings
Logging         : structlog (app/core/logger.py)
Code style      : black + ruff
Type checking   : mypy (strict on core modules)

Do NOT use:
  - SQLAlchemy ORM (raw psycopg2 only — already established pattern)
  - Alembic (use migration SQL files only)
  - Supabase Python REST client (psycopg2 direct only)
  - FastAPI dependency injection for DB (use context managers directly)

================================================================================
SECTION 3 — PROJECT STRUCTURE
================================================================================

paid-pilot/
├── api/
│   ├── main.py                    ← FastAPI app factory + lifespan
│   ├── dependencies.py            ← Shared dependencies (db, auth, user_type)
│   │
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── health.py              ← GET /health
│   │   ├── auth.py                ← POST /auth/me (return current user info)
│   │   ├── jobs.py                ← GET /jobs, GET /jobs/{id}
│   │   ├── job_status.py          ← PATCH /jobs/{id}/status
│   │   ├── resumes.py             ← CRUD /resumes
│   │   ├── applications.py        ← CRUD /applications
│   │   ├── recruiters.py          ← GET/POST/PATCH/DELETE /recruiters
│   │   ├── email_templates.py     ← GET /email-templates
│   │   ├── candidate_profile.py   ← GET/PATCH /profile (candidate)
│   │   ├── business_candidates.py ← CRUD /business/candidates
│   │   ├── outreach.py            ← POST/GET /outreach
│   │   ├── analytics.py           ← GET /analytics/*
│   │   ├── team.py                ← CRUD /team
│   │   ├── scraper.py             ← GET/POST /admin/scraper/*
│   │   ├── linkedin_accounts.py   ← GET/PATCH /admin/accounts
│   │   ├── customers.py           ← GET /admin/customers
│   │   ├── system.py              ← GET /admin/system
│   │   └── settings.py            ← GET/PATCH /settings
│   │
│   ├── services/
│   │   ├── jobs_service.py
│   │   ├── resume_service.py
│   │   ├── application_service.py
│   │   ├── recruiter_service.py
│   │   ├── candidate_service.py
│   │   ├── outreach_service.py
│   │   ├── analytics_service.py
│   │   ├── scraper_service.py
│   │   ├── system_service.py
│   │   └── settings_service.py
│   │
│   ├── repositories/
│   │   ├── jobs_repo.py
│   │   ├── resume_repo.py
│   │   ├── application_repo.py
│   │   ├── recruiter_repo.py
│   │   ├── candidate_repo.py
│   │   ├── outreach_repo.py
│   │   ├── analytics_repo.py
│   │   ├── scraper_repo.py
│   │   ├── system_repo.py
│   │   └── settings_repo.py
│   │
│   ├── schemas/
│   │   ├── job.py
│   │   ├── resume.py
│   │   ├── application.py
│   │   ├── recruiter.py
│   │   ├── candidate.py
│   │   ├── outreach.py
│   │   ├── analytics.py
│   │   ├── scraper.py
│   │   ├── system.py
│   │   └── settings.py
│   │
│   └── core/
│       ├── config.py
│       ├── database.py
│       ├── auth.py
│       ├── errors.py
│       └── pagination.py
│
├── app/                           ← EXISTING scraper — DO NOT MODIFY
├── scripts/migrations/            ← EXISTING — DO NOT MODIFY (add new files)
└── tests/
    ├── conftest.py
    ├── test_jobs.py
    ├── test_resumes.py
    ├── test_applications.py
    ├── test_analytics.py
    └── test_scraper.py

KEY RULE (same as original — never skip layers):
  Router → Service → Repository → SQL
  Repository returns list[dict]
  Service converts dict → Pydantic schema
  Router returns Pydantic schema

================================================================================
SECTION 4 — USER TYPES AND AUTH MODEL
================================================================================

THREE USER TYPES:
  candidate  — individual IT contractor
  business   — staffing agency
  admin      — platform operator

HOW USER TYPE IS STORED:
  Add a `user_metadata` column in the Supabase Auth flow OR create a
  `user_roles` table:

  CREATE TABLE IF NOT EXISTS user_roles (
      user_id     UUID PRIMARY KEY,      -- matches Supabase auth.users.id
      email       TEXT NOT NULL UNIQUE,
      user_type   TEXT NOT NULL,         -- 'candidate' | 'business' | 'admin'
      business_id UUID,                  -- non-null if user_type = 'business'
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

HOW AUTH WORKS:
  1. Frontend (Next.js) uses Supabase Auth for login/signup
  2. On signup, user_type is captured and saved to user_roles
  3. Every API request carries: Authorization: Bearer {supabase_jwt}
  4. Backend verifies JWT using SUPABASE_JWT_SECRET (HS256)
  5. get_current_user() extracts sub (UUID) + email from JWT
  6. get_user_type() queries user_roles to get user_type + business_id

ADD TO DEPENDENCIES:
  def get_user_type(user=Depends(get_current_user), conn=Depends(get_db)):
      # queries user_roles table for user["sub"]
      return user_role_record  # { user_type, business_id, email }

  def require_candidate(role=Depends(get_user_type)):
      if role["user_type"] != "candidate":
          raise HTTPException(403, "Candidate access only")
      return role

  def require_business(role=Depends(get_user_type)):
      if role["user_type"] != "business":
          raise HTTPException(403, "Business access only")
      return role

  def require_admin(role=Depends(get_user_type)):
      if role["user_type"] != "admin":
          raise HTTPException(403, "Admin access only")
      return role

MULTI-TENANCY:
  Phase 1 (now): each business_id scopes all business data.
  Candidates and businesses are isolated from each other.
  Admin sees everything — no business_id filter.

================================================================================
SECTION 5 — DATABASE TABLES
================================================================================

--- SCRAPER-OWNED (read-only from API) ---

scraped_posts
  Stores all scraped job posts from LinkedIn, Dice, etc.
  The scraper writes to this. The API only reads.

  id                UUID PRIMARY KEY DEFAULT gen_random_uuid()
  role_title        TEXT NOT NULL
  engagement_type   TEXT                    -- 'C2C' | 'W2' | 'Both' | 'Full-time'
  post_type         TEXT                    -- 'Job Posting' | 'Hot Requirement' | 'Urgent Hire'
  work_mode         TEXT                    -- 'Remote' | 'Hybrid' | 'Onsite'
  location          TEXT
  rate_raw          TEXT                    -- raw rate string, e.g. '$85/hr'
  visa_constraints  TEXT                    -- 'USC, GC, H1B'
  skills            TEXT[]                  -- ['Java', 'Spring Boot', ...]
  experience        TEXT                    -- '8+ years'
  source            TEXT NOT NULL           -- 'LinkedIn' | 'Dice'
  author_name       TEXT
  author_company    TEXT
  author_email      TEXT
  author_phone      TEXT
  author_linkedin   TEXT
  post_url          TEXT
  raw_text          TEXT
  scraped_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
  scrape_run_id     UUID                    -- FK to scrape_runs

scrape_runs
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
  source      TEXT NOT NULL               -- 'LinkedIn' | 'Dice'
  keyword     TEXT NOT NULL
  start_time  TIMESTAMPTZ
  end_time    TIMESTAMPTZ
  scraped     INT DEFAULT 0
  qualified   INT DEFAULT 0
  duplicates  INT DEFAULT 0
  failed      INT DEFAULT 0
  status      TEXT                        -- 'Success' | 'Partial' | 'Failed'
  success_rate DECIMAL(5,2)
  errors      TEXT[]
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()

linkedin_accounts
  Managed by both admin and scraper.
  Scraper updates sessions_today, pages_visited, status.
  Admin can pause/flag via API.

  id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
  email           TEXT NOT NULL UNIQUE
  name            TEXT                    -- e.g. 'StaffPro Bot 1'
  status          TEXT NOT NULL           -- 'Active' | 'Cooling Down' | 'Flagged'
  sessions_today  INT DEFAULT 0
  session_budget  INT DEFAULT 8
  pages_visited   INT DEFAULT 0
  page_budget     INT DEFAULT 50
  cooldown_until  TIMESTAMPTZ
  flag_reason     TEXT
  last_used       TIMESTAMPTZ
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()

--- API-OWNED (created and managed by this backend) ---

NEW TABLE: job_status
  Per-user job lead status (candidate or business user tracking a job).

  CREATE TABLE IF NOT EXISTS job_status (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      job_id        UUID NOT NULL REFERENCES scraped_posts(id),
      user_id       UUID NOT NULL,          -- from Supabase auth
      business_id   UUID,                   -- null for candidates, set for business
      status        TEXT NOT NULL DEFAULT 'New',
      note          TEXT,
      assigned_to   TEXT,                   -- email of team member
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(job_id, user_id)
  );

  Status values: 'New' | 'Reviewing' | 'Applied' | 'Contacted' | 'Replied' | 'Placed' | 'Skipped'

NEW TABLE: candidate_profiles
  Extended profile data for candidate users.

  CREATE TABLE IF NOT EXISTS candidate_profiles (
      id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id             UUID NOT NULL UNIQUE,
      full_name           TEXT NOT NULL,
      email               TEXT NOT NULL,
      phone               TEXT,
      current_location    TEXT,
      linkedin_url        TEXT,
      current_title       TEXT,
      years_experience    TEXT,
      visa_status         TEXT,             -- 'USC' | 'GC' | 'H1B' | 'EAD' | 'OPT' | 'Other'
      availability        TEXT,             -- 'Immediate' | '1 week' | etc.
      expected_rate       TEXT,
      preferred_engagement    TEXT[],       -- ['C2C', 'W2']
      preferred_work_mode     TEXT[],       -- ['Remote', 'Hybrid']
      preferred_locations     TEXT[],
      excluded_locations      TEXT[],
      primary_skills          TEXT[],
      secondary_skills        TEXT[],
      domains                 TEXT[],
      target_roles            TEXT[],
      created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

NEW TABLE: candidate_resumes
  Resume versions for a candidate.

  CREATE TABLE IF NOT EXISTS candidate_resumes (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id       UUID NOT NULL,
      name          TEXT NOT NULL,          -- filename, e.g. 'Java_Senior_v3.pdf'
      format        TEXT NOT NULL DEFAULT 'PDF',
      size          TEXT,                   -- e.g. '245 KB'
      ats_score     INT,                    -- 0-100
      completeness  INT,                    -- 0-100
      tags          TEXT[],                 -- skill tags
      is_default    BOOLEAN NOT NULL DEFAULT FALSE,
      file_path     TEXT,                   -- storage path (S3 or local)
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

NEW TABLE: candidate_applications
  Job applications tracked per candidate.

  CREATE TABLE IF NOT EXISTS candidate_applications (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id         UUID NOT NULL,
      job_title       TEXT NOT NULL,
      company         TEXT,
      recruiter_name  TEXT,
      recruiter_email TEXT,
      status          TEXT NOT NULL DEFAULT 'Sent',  -- 'Sent' | 'Replied' | 'Follow-up' | 'Submitted'
      sent_date       DATE,
      follow_up_date  DATE,
      last_response   DATE,
      resume_version  TEXT,               -- name of resume used
      note            TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

NEW TABLE: recruiters
  Recruiter directory — shared across all businesses.
  Enriched by scraper (from scraped_posts author data) + manually added.

  CREATE TABLE IF NOT EXISTS recruiters (
      id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name                  TEXT NOT NULL,
      company               TEXT,
      email                 TEXT UNIQUE,
      phone                 TEXT,
      linkedin_url          TEXT,
      total_posts           INT DEFAULT 0,
      last_active           TIMESTAMPTZ,
      common_roles          TEXT[],
      common_locations      TEXT[],
      engagement_preference TEXT,          -- 'C2C' | 'W2' | 'Both'
      response_rate         INT DEFAULT 0, -- 0-100 %
      created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

NEW TABLE: email_templates
  Reusable email templates for outreach.

  CREATE TABLE IF NOT EXISTS email_templates (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name        TEXT NOT NULL,
      subject     TEXT NOT NULL,
      body        TEXT NOT NULL,
      category    TEXT,                   -- 'Candidate Outreach' | 'Follow-up' | 'Business Submission'
      business_id UUID,                   -- null = global template; set = business-specific
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

NEW TABLE: businesses
  Business (staffing agency) accounts.

  CREATE TABLE IF NOT EXISTS businesses (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      company_name    TEXT NOT NULL,
      plan            TEXT NOT NULL DEFAULT 'Starter',   -- 'Starter' | 'Professional' | 'Enterprise'
      status          TEXT NOT NULL DEFAULT 'Trial',     -- 'Trial' | 'Active' | 'Suspended'
      monthly_spend   INT DEFAULT 0,
      joined_date     DATE,
      last_active     TIMESTAMPTZ,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

NEW TABLE: team_members
  Bench sales recruiters and staff at a business.

  CREATE TABLE IF NOT EXISTS team_members (
      id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      business_id         UUID NOT NULL REFERENCES businesses(id),
      user_id             UUID,           -- linked Supabase user (optional)
      name                TEXT NOT NULL,
      email               TEXT NOT NULL,
      phone               TEXT,
      role                TEXT,           -- 'Bench Sales Recruiter' | 'Senior Recruiter' | etc.
      candidate_count     INT DEFAULT 0,
      active_submissions  INT DEFAULT 0,
      closed_deals        INT DEFAULT 0,
      status              TEXT DEFAULT 'Active',
      joined_date         DATE,
      created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

NEW TABLE: bench_candidates
  Candidates on the bench — managed by a business.

  CREATE TABLE IF NOT EXISTS bench_candidates (
      id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      business_id           UUID NOT NULL REFERENCES businesses(id),
      bench_recruiter_id    UUID REFERENCES team_members(id),
      bench_recruiter_name  TEXT,
      name                  TEXT NOT NULL,
      email                 TEXT,
      phone                 TEXT,
      title                 TEXT,
      experience            TEXT,
      location              TEXT,
      skills                TEXT[],
      visa_status           TEXT,
      rate                  TEXT,
      availability          TEXT,
      linkedin_url          TEXT,
      education             TEXT,
      certifications        TEXT[],
      preferred_engagement  TEXT,
      preferred_work_mode   TEXT,
      summary               TEXT,
      resume_file           TEXT,
      resume_last_updated   DATE,
      total_submissions     INT DEFAULT 0,
      total_interviews      INT DEFAULT 0,
      total_placements      INT DEFAULT 0,
      joined_date           DATE,
      last_active           TIMESTAMPTZ,
      created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

NEW TABLE: outreach_logs
  Every email sent to a recruiter on behalf of a candidate.

  CREATE TABLE IF NOT EXISTS outreach_logs (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      business_id     UUID,               -- null for candidate self-outreach
      candidate_id    UUID,               -- bench_candidates.id OR null
      candidate_name  TEXT,
      user_id         UUID NOT NULL,      -- who sent it
      recruiter_id    UUID REFERENCES recruiters(id),
      recruiter_name  TEXT,
      recruiter_email TEXT,
      job_title       TEXT,
      job_id          UUID,               -- scraped_posts.id if linked to a job
      subject         TEXT,
      body            TEXT,
      status          TEXT DEFAULT 'Sent',   -- 'Sent' | 'Delivered' | 'Opened' | 'Replied' | 'Bounced'
      sent_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

NEW TABLE: scraper_keywords
  Keywords managed via the admin UI for the scraper to use.

  CREATE TABLE IF NOT EXISTS scraper_keywords (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      keyword         TEXT NOT NULL,
      enabled         BOOLEAN NOT NULL DEFAULT TRUE,
      source          TEXT NOT NULL DEFAULT 'LinkedIn',  -- 'LinkedIn' | 'Dice'
      total_leads     INT DEFAULT 0,
      leads_this_week INT DEFAULT 0,
      last_searched   TIMESTAMPTZ,
      created_by      TEXT NOT NULL,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(keyword, source)
  );

NEW TABLE: scraper_groups
  LinkedIn groups scraped for job posts.

  CREATE TABLE IF NOT EXISTS scraper_groups (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name          TEXT NOT NULL,
      url           TEXT NOT NULL UNIQUE,
      enabled       BOOLEAN NOT NULL DEFAULT TRUE,
      total_posts   INT DEFAULT 0,
      members       TEXT,               -- e.g. '45.2K'
      last_scraped  TIMESTAMPTZ,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

NEW TABLE: admin_settings
  Global platform configuration (one row).

  CREATE TABLE IF NOT EXISTS admin_settings (
      id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      scraper_fetch_window_hrs  INT DEFAULT 1,
      scraper_daily_session_budget  INT DEFAULT 8,
      scraper_daily_page_budget     INT DEFAULT 50,
      scraper_keywords_per_session  INT DEFAULT 5,
      scraper_max_posts_per_search  INT DEFAULT 25,
      notif_email_on_new_leads      BOOLEAN DEFAULT TRUE,
      notif_email_on_errors         BOOLEAN DEFAULT TRUE,
      notif_email_on_account_flagged BOOLEAN DEFAULT TRUE,
      notif_email_on_budget_exhausted BOOLEAN DEFAULT TRUE,
      notif_slack_webhook           TEXT,
      notif_alert_threshold         INT DEFAULT 5,
      outreach_default_signature    TEXT,
      outreach_reply_to             TEXT,
      outreach_smtp_host            TEXT DEFAULT 'smtp.sendgrid.net',
      outreach_smtp_port            INT DEFAULT 587,
      outreach_daily_limit_per_candidate INT DEFAULT 10,
      updated_at                    TIMESTAMPTZ DEFAULT NOW()
  );

================================================================================
SECTION 6 — API ENDPOINTS (FULL SPECIFICATION)
================================================================================

BASE URL: /api/v1
All endpoints require: Authorization: Bearer {supabase_jwt}
Except: GET /health

------------------------------------------------------------
HEALTH
------------------------------------------------------------

GET /health
  Response 200:
    { "status": "ok", "db": "connected", "version": "1.0.0" }

------------------------------------------------------------
AUTH
------------------------------------------------------------

GET /api/v1/auth/me
  Purpose: Return current user info + type (used by frontend on load).
  Auth: required

  Response 200:
    {
      "user_id": "uuid",
      "email": "candidate@demo.com",
      "user_type": "candidate",       -- or "business" or "admin"
      "business_id": null,            -- UUID if business user
      "name": "John Candidate"
    }

------------------------------------------------------------
JOBS (all portals — filtered by user type server-side)
------------------------------------------------------------

GET /api/v1/jobs
  Purpose: List scraped jobs with filtering, sorting, pagination.
  Auth: required (candidate, business, admin)

  Query params:
    page            int     default=1
    per_page        int     default=50, max=200
    source          str     "LinkedIn" | "Dice" | "all"   default="all"
    engagement_type str     "C2C" | "W2" | "Both" | "all"  default="all"
    work_mode       str     "Remote" | "Hybrid" | "Onsite" | "all"
    post_type       str     "Job Posting" | "Hot Requirement" | "Urgent Hire" | "all"
    has_contact     bool    filter jobs with author_email present
    search          str     full-text search on role_title + skills + location
    skills          str     comma-separated skill filter (any match)
    date_from       date    scraped_at >= date
    date_to         date    scraped_at <= date
    status          str     "New"|"Reviewing"|"Applied"|"Contacted"|"Replied"|"Placed"|"Skipped"|"all"
    sort_by         str     "scraped_at" | "rate_raw" | "match_score"  default="scraped_at"
    sort_dir        str     "desc" | "asc"   default="desc"

  Response 200:
    {
      "items": [ JobResponse ],
      "total": 312,
      "page": 1,
      "per_page": 50,
      "has_next": true,
      "has_prev": false
    }

GET /api/v1/jobs/{job_id}
  Purpose: Full detail for a single job.
  Auth: required

  Response 200: JobDetailResponse (includes raw_text)
  Response 404: { "error": "Job not found" }

PATCH /api/v1/jobs/{job_id}/status
  Purpose: Update a user's status/note on a job.
  Auth: required

  Request body:
    {
      "status": "Reviewing",
      "note": "Good match for Rajesh Kumar",
      "assigned_to": "amy.r@staffpro.com"
    }

  Response 200: { "job_id": "...", "status": "Reviewing", "updated_at": "..." }

------------------------------------------------------------
CANDIDATE PORTAL — RESUMES
------------------------------------------------------------

GET /api/v1/resumes
  Purpose: List all resume versions for the logged-in candidate.
  Auth: required (candidate)

  Query params:
    search      str     search by name
    tags        str     comma-separated skill tags (any match)
    min_ats     int     minimum ATS score filter
    default_only bool   only return the default resume

  Response 200:
    {
      "resumes": [ ResumeResponse ],
      "total": 6
    }

POST /api/v1/resumes
  Purpose: Upload a new resume.
  Auth: required (candidate)

  Request: multipart/form-data
    file: binary (PDF or DOCX, max 5MB)
    name: str (optional — defaults to filename)
    tags: JSON array of skill tags

  Response 201: ResumeResponse
  Response 400: { "error": "File too large" } or { "error": "Invalid format" }

PATCH /api/v1/resumes/{resume_id}
  Purpose: Update name, tags, ATS score, or set as default.
  Auth: required (candidate — must own this resume)

  Request body:
    {
      "name": "Java_Senior_Developer_v4.pdf",
      "tags": ["Java", "Spring Boot"],
      "ats_score": 97,
      "is_default": true
    }

  Response 200: ResumeResponse
  Response 404: { "error": "Resume not found" }

DELETE /api/v1/resumes/{resume_id}
  Purpose: Delete a resume.
  Auth: required (candidate — must own this resume)

  Response 204: empty
  Response 400: { "error": "Cannot delete default resume" }

------------------------------------------------------------
CANDIDATE PORTAL — APPLICATIONS
------------------------------------------------------------

GET /api/v1/applications
  Purpose: List applications for the logged-in candidate.
  Auth: required (candidate)

  Query params:
    search      str     search company or role
    status      str     "Sent"|"Replied"|"Follow-up"|"Submitted"|"all"
    date_range  str     "all"|"this_week"|"last_30_days"|"last_90_days"
    has_response bool   filter for those with a response

  Response 200:
    {
      "applications": [ ApplicationResponse ],
      "total": 18
    }

POST /api/v1/applications
  Purpose: Log a new job application.
  Auth: required (candidate)

  Request body:
    {
      "job_title": "Senior Java Developer",
      "company": "TechCorp Solutions",
      "recruiter_name": "Sarah Johnson",
      "recruiter_email": "sarah.j@techcorp.com",
      "sent_date": "2024-01-15",
      "resume_version": "Java_Senior_v3.pdf",
      "note": "Sent via email"
    }

  Response 201: ApplicationResponse

PATCH /api/v1/applications/{app_id}
  Purpose: Update application status, follow-up date, or note.
  Auth: required (candidate — must own)

  Request body:
    {
      "status": "Replied",
      "follow_up_date": "2024-01-22",
      "last_response": "2024-01-16",
      "note": "They want to schedule a call"
    }

  Response 200: ApplicationResponse

DELETE /api/v1/applications/{app_id}
  Response 204: empty

------------------------------------------------------------
CANDIDATE PORTAL — PROFILE
------------------------------------------------------------

GET /api/v1/profile
  Purpose: Get the logged-in candidate's full profile.
  Auth: required (candidate)

  Response 200: CandidateProfileResponse

PATCH /api/v1/profile
  Purpose: Update candidate profile fields.
  Auth: required (candidate)

  Request body: any subset of CandidateProfileResponse fields
  Response 200: CandidateProfileResponse

------------------------------------------------------------
RECRUITERS (candidate + business portals)
------------------------------------------------------------

GET /api/v1/recruiters
  Purpose: List all recruiters.
  Auth: required

  Query params:
    search      str     search by name or company
    engagement  str     "C2C" | "W2" | "Both" | "all"

  Response 200:
    { "recruiters": [ RecruiterResponse ], "total": 42 }

GET /api/v1/recruiters/{recruiter_id}
  Response 200: RecruiterResponse
  Response 404: { "error": "Recruiter not found" }

POST /api/v1/recruiters
  Purpose: Add a new recruiter to the directory.
  Auth: required (business, admin)

  Request body: RecruiterCreate
  Response 201: RecruiterResponse

PATCH /api/v1/recruiters/{recruiter_id}
  Auth: required (business, admin)
  Response 200: RecruiterResponse

------------------------------------------------------------
EMAIL TEMPLATES
------------------------------------------------------------

GET /api/v1/email-templates
  Purpose: List email templates available to the user.
  Auth: required

  Returns global templates + business-specific templates for business users.

  Response 200:
    { "templates": [ EmailTemplateResponse ] }

------------------------------------------------------------
OUTREACH
------------------------------------------------------------

POST /api/v1/outreach
  Purpose: Log an outreach email (sent to a recruiter).
  Auth: required

  Request body:
    {
      "recruiter_id": "uuid",          -- optional if recruiter not in DB
      "recruiter_name": "Sarah Johnson",
      "recruiter_email": "sarah.j@techcorp.com",
      "job_title": "Senior Java Developer",
      "job_id": "uuid",               -- optional — link to scraped job
      "candidate_id": "uuid",          -- optional — for business outreach
      "candidate_name": "Rajesh Kumar",
      "subject": "Application for Sr Java Dev - Rajesh Kumar",
      "body": "Dear Sarah..."
    }

  Response 201: OutreachResponse

GET /api/v1/outreach
  Purpose: List outreach logs for the current user/business.
  Auth: required

  Query params:
    candidate_id  uuid    filter by candidate (business portal)
    status        str     "Sent"|"Delivered"|"Opened"|"Replied"|"Bounced"|"all"
    page          int     default=1
    per_page      int     default=50

  Response 200:
    {
      "items": [ OutreachResponse ],
      "total": 45,
      "page": 1,
      "per_page": 50,
      "has_next": false,
      "has_prev": false
    }

------------------------------------------------------------
BUSINESS PORTAL — BENCH CANDIDATES
------------------------------------------------------------

GET /api/v1/business/candidates
  Purpose: List bench candidates for the logged-in business.
  Auth: required (business)

  Query params:
    search          str     search name, skills, title
    bench_recruiter uuid    filter by team member
    visa_status     str
    availability    str
    engagement      str     "C2C" | "W2" | "Both" | "all"

  Response 200:
    { "candidates": [ BenchCandidateResponse ], "total": 10 }

GET /api/v1/business/candidates/{candidate_id}
  Response 200: BenchCandidateDetailResponse (includes outreach history)
  Response 404: { "error": "Candidate not found" }

POST /api/v1/business/candidates
  Purpose: Add a new bench candidate.
  Auth: required (business)
  Request body: BenchCandidateCreate
  Response 201: BenchCandidateResponse

PATCH /api/v1/business/candidates/{candidate_id}
  Auth: required (business — must own candidate)
  Response 200: BenchCandidateResponse

DELETE /api/v1/business/candidates/{candidate_id}
  Auth: required (business — must own candidate)
  Response 204: empty

------------------------------------------------------------
BUSINESS PORTAL — ANALYTICS
------------------------------------------------------------

GET /api/v1/analytics/summary
  Purpose: Top-level stats for the business dashboard.
  Auth: required (business, admin)

  Query params:
    period  str  "today" | "week" | "month"  default="week"

  Response 200:
    {
      "total_candidates": 10,
      "active_submissions": 45,
      "total_placements": 24,
      "scraped_jobs": 3421,
      "jobs_today": 127,
      "jobs_this_week": 843,
      "qualified_leads": 89,
      "emails_sent_today": 45,
      "response_rate_pct": 18,
      "vs_previous": {
        "scraped_jobs": 12,
        "emails_sent": 5,
        "response_rate": 3
      }
    }

GET /api/v1/analytics/candidates
  Purpose: Per-candidate submission/interview/placement stats.
  Auth: required (business)

  Response 200:
    {
      "candidates": [
        {
          "id": "uuid",
          "name": "Rajesh Kumar",
          "title": "Senior Java Developer",
          "bench_recruiter": "Amy Roberts",
          "total_submissions": 18,
          "total_interviews": 6,
          "total_placements": 3,
          "placement_rate_pct": 16.7
        }
      ],
      "totals": {
        "total_submissions": 132,
        "total_interviews": 41,
        "total_placements": 22,
        "avg_per_candidate": 13.2,
        "placement_rate_pct": 16.7
      }
    }

GET /api/v1/analytics/skills
  Purpose: Most in-demand skills from scraped jobs.
  Auth: required

  Query params:
    period  str  "7d" | "30d"  default="7d"
    limit   int  default=20

  Response 200:
    {
      "skills": [
        { "skill": "Java", "count": 234 },
        { "skill": "Python", "count": 189 }
      ]
    }

GET /api/v1/analytics/chart
  Purpose: Jobs scraped over time — for line/bar chart.
  Auth: required

  Query params:
    period    str  "7d" | "30d" | "90d"  default="7d"
    source    str  "LinkedIn" | "Dice" | "all"
    group_by  str  "day" | "week"

  Response 200:
    {
      "points": [
        { "date": "2026-04-03", "count": 127, "qualified": 89 }
      ]
    }

GET /api/v1/analytics/locations
  Purpose: Top locations in scraped jobs.
  Auth: required

  Response 200:
    {
      "locations": [
        { "location": "Remote", "count": 412 },
        { "location": "Dallas, TX", "count": 156 }
      ]
    }

------------------------------------------------------------
BUSINESS PORTAL — TEAM
------------------------------------------------------------

GET /api/v1/team
  Auth: required (business)
  Response 200: { "members": [ TeamMemberResponse ], "total": 6 }

POST /api/v1/team
  Auth: required (business)
  Request body: TeamMemberCreate
  Response 201: TeamMemberResponse

PATCH /api/v1/team/{member_id}
  Auth: required (business)
  Response 200: TeamMemberResponse

DELETE /api/v1/team/{member_id}
  Auth: required (business)
  Response 204: empty

------------------------------------------------------------
ADMIN — SCRAPER CONTROL
------------------------------------------------------------

GET /api/v1/admin/scraper/runs
  Purpose: Scraper run history.
  Auth: required (admin)

  Query params:
    limit   int   default=20
    source  str   "LinkedIn" | "Dice" | "all"

  Response 200:
    {
      "runs": [ ScrapeRunResponse ]
    }

GET /api/v1/admin/scraper/keywords
  Auth: required (admin)
  Response 200: { "keywords": [ ScraperKeywordResponse ] }

POST /api/v1/admin/scraper/keywords
  Request body: { "keyword": "java developer c2c", "source": "LinkedIn" }
  Response 201: ScraperKeywordResponse
  Response 409: { "error": "Keyword already exists" }

DELETE /api/v1/admin/scraper/keywords/{keyword_id}
  Response 204: empty

PATCH /api/v1/admin/scraper/keywords/{keyword_id}
  Purpose: Toggle enabled/disabled.
  Request body: { "enabled": false }
  Response 200: ScraperKeywordResponse

GET /api/v1/admin/scraper/groups
  Auth: required (admin)
  Response 200: { "groups": [ ScraperGroupResponse ] }

POST /api/v1/admin/scraper/groups
  Request body: { "name": "C2C Jobs USA", "url": "https://linkedin.com/groups/..." }
  Response 201: ScraperGroupResponse

PATCH /api/v1/admin/scraper/groups/{group_id}
  Request body: { "enabled": false }
  Response 200: ScraperGroupResponse

DELETE /api/v1/admin/scraper/groups/{group_id}
  Response 204: empty

------------------------------------------------------------
ADMIN — LINKEDIN ACCOUNTS
------------------------------------------------------------

GET /api/v1/admin/accounts
  Auth: required (admin)
  Response 200: { "accounts": [ LinkedInAccountResponse ] }

PATCH /api/v1/admin/accounts/{account_id}
  Purpose: Pause, resume, or unflag an account.
  Auth: required (admin)

  Request body:
    {
      "status": "Active",      -- or "Cooling Down" | "Flagged"
      "flag_reason": null,
      "session_budget": 10
    }

  Response 200: LinkedInAccountResponse

------------------------------------------------------------
ADMIN — CUSTOMERS
------------------------------------------------------------

GET /api/v1/admin/customers
  Auth: required (admin)

  Query params:
    search  str     company name
    plan    str     "Starter" | "Professional" | "Enterprise" | "all"
    status  str     "Trial" | "Active" | "Suspended" | "all"

  Response 200:
    { "customers": [ CustomerResponse ], "total": 5 }

GET /api/v1/admin/customers/{customer_id}
  Response 200: CustomerDetailResponse (includes contacts)

------------------------------------------------------------
ADMIN — OUTREACH (global view)
------------------------------------------------------------

GET /api/v1/admin/outreach
  Purpose: All outreach emails across all businesses.
  Auth: required (admin)

  Query params:
    customer_id  uuid
    status       str
    page         int
    per_page     int

  Response 200: Same shape as /api/v1/outreach but includes customer field

------------------------------------------------------------
ADMIN — SYSTEM INFO
------------------------------------------------------------

GET /api/v1/admin/system
  Purpose: Platform service health status.
  Auth: required (admin)

  Response 200:
    {
      "overall_status": "operational",    -- "operational" | "degraded" | "down"
      "services": {
        "scraper": {
          "name": "LinkedIn Scraper",
          "status": "Operational",
          "uptime": "99.7%",
          "last_check": "2 min ago",
          "portals": [
            {
              "name": "LinkedIn Jobs",
              "status": "Active",
              "last_run": "35 min ago",
              "posts_today": 487,
              "errors": 0
            }
          ]
        },
        "mail_service": {
          "name": "Email Service (SendGrid)",
          "status": "Operational",
          "stats": {
            "sent": 342,
            "delivered": 338,
            "opened": 187,
            "bounced": 4,
            "failed": 0
          }
        },
        "llm": {
          "name": "LLM Service (GPT-4)",
          "status": "Operational",
          "costs": {
            "today": 12.47,
            "this_week": 78.32,
            "this_month": 312.89,
            "budget": 500.00
          }
        },
        "database": {
          "name": "Supabase PostgreSQL",
          "status": "Operational",
          "stats": {
            "total_docs": "2.4M",
            "storage_used": "4.7 GB",
            "connections": 23,
            "avg_query_time": "12ms"
          }
        }
      }
    }

------------------------------------------------------------
SETTINGS
------------------------------------------------------------

GET /api/v1/settings
  Purpose: Get settings for current user.
    - For candidates: notification prefs, privacy, appearance
    - For businesses: business settings
    - For admins: platform-wide admin_settings

  Auth: required
  Response 200: SettingsResponse (varies by user_type)

PATCH /api/v1/settings
  Purpose: Update settings.
  Auth: required
  Request body: partial SettingsResponse
  Response 200: SettingsResponse

================================================================================
SECTION 7 — PYDANTIC SCHEMAS
================================================================================

---- schemas/job.py ----

class JobStatus(str, Enum):
    new        = "New"
    reviewing  = "Reviewing"
    applied    = "Applied"
    contacted  = "Contacted"
    replied    = "Replied"
    placed     = "Placed"
    skipped    = "Skipped"

class JobResponse(BaseModel):
    id: str                        # scraped_posts UUID
    role_title: str
    engagement_type: str | None    # "C2C" | "W2" | "Both" | "Full-time"
    post_type: str | None          # "Job Posting" | "Hot Requirement" | "Urgent Hire"
    work_mode: str | None          # "Remote" | "Hybrid" | "Onsite"
    location: str | None
    rate_raw: str | None
    visa_constraints: str | None
    skills: list[str]
    experience: str | None
    source: str                    # "LinkedIn" | "Dice"
    author_name: str | None
    author_company: str | None
    author_email: str | None
    author_phone: str | None
    author_linkedin: str | None
    post_url: str | None
    scraped_at: datetime
    match_score: int | None = None

    # From job_status (LEFT JOIN — defaults if no row)
    status: JobStatus = JobStatus.new
    note: str | None = None
    assigned_to: str | None = None
    status_updated_at: datetime | None = None

class JobDetailResponse(JobResponse):
    raw_text: str | None

class JobListResponse(BaseModel):
    items: list[JobResponse]
    total: int
    page: int
    per_page: int
    has_next: bool
    has_prev: bool

---- schemas/resume.py ----

class ResumeResponse(BaseModel):
    id: str
    name: str
    format: str
    size: str | None
    ats_score: int | None
    completeness: int | None
    tags: list[str]
    is_default: bool
    created_at: datetime
    updated_at: datetime

---- schemas/application.py ----

class ApplicationStatus(str, Enum):
    sent       = "Sent"
    replied    = "Replied"
    follow_up  = "Follow-up"
    submitted  = "Submitted"

class ApplicationResponse(BaseModel):
    id: str
    job_title: str
    company: str | None
    recruiter_name: str | None
    recruiter_email: str | None
    status: ApplicationStatus
    sent_date: date | None
    follow_up_date: date | None
    last_response: date | None
    resume_version: str | None
    note: str | None
    created_at: datetime

---- schemas/recruiter.py ----

class RecruiterResponse(BaseModel):
    id: str
    name: str
    company: str | None
    email: str | None
    phone: str | None
    linkedin_url: str | None
    total_posts: int
    last_active: datetime | None
    common_roles: list[str]
    common_locations: list[str]
    engagement_preference: str | None
    response_rate: int

---- schemas/candidate.py ----

class BenchCandidateResponse(BaseModel):
    id: str
    business_id: str
    bench_recruiter_id: str | None
    bench_recruiter: str | None
    name: str
    email: str | None
    phone: str | None
    title: str | None
    experience: str | None
    location: str | None
    skills: list[str]
    visa_status: str | None
    rate: str | None
    availability: str | None
    linkedin_url: str | None
    preferred_engagement: str | None
    preferred_work_mode: str | None
    summary: str | None
    resume_file: str | None
    total_submissions: int
    total_interviews: int
    total_placements: int
    joined_date: date | None
    last_active: datetime | None

class BenchCandidateDetailResponse(BenchCandidateResponse):
    education: str | None
    certifications: list[str]
    outreach: list[OutreachSummary]   # recent outreach items

---- schemas/outreach.py ----

class OutreachResponse(BaseModel):
    id: str
    candidate_name: str | None
    recruiter_name: str | None
    recruiter_email: str | None
    job_title: str | None
    subject: str | None
    status: str
    sent_at: datetime

---- schemas/analytics.py ----

class DashboardSummary(BaseModel):
    total_candidates: int
    active_submissions: int
    total_placements: int
    scraped_jobs: int
    jobs_today: int
    jobs_this_week: int
    qualified_leads: int
    emails_sent_today: int
    response_rate_pct: int
    vs_previous: dict[str, int]

class CandidateAnalytics(BaseModel):
    id: str
    name: str
    title: str | None
    bench_recruiter: str | None
    total_submissions: int
    total_interviews: int
    total_placements: int
    placement_rate_pct: float

class SkillStat(BaseModel):
    skill: str
    count: int

class ChartPoint(BaseModel):
    date: date
    count: int
    qualified: int

---- schemas/scraper.py ----

class ScrapeRunResponse(BaseModel):
    id: str
    source: str
    keyword: str
    start_time: datetime | None
    end_time: datetime | None
    scraped: int
    qualified: int
    duplicates: int
    failed: int
    status: str
    success_rate: float | None
    errors: list[str]

class ScraperKeywordResponse(BaseModel):
    id: str
    keyword: str
    enabled: bool
    source: str
    total_leads: int
    leads_this_week: int
    last_searched: datetime | None
    created_at: datetime

class ScraperGroupResponse(BaseModel):
    id: str
    name: str
    url: str
    enabled: bool
    total_posts: int
    members: str | None
    last_scraped: datetime | None

class LinkedInAccountResponse(BaseModel):
    id: str
    email: str
    name: str | None
    status: str
    sessions_today: int
    session_budget: int
    pages_visited: int
    page_budget: int
    cooldown_until: datetime | None
    flag_reason: str | None
    last_used: datetime | None

---- schemas/system.py ----

class ServiceStatus(BaseModel):
    name: str
    status: str            # "Operational" | "Degraded" | "Down"
    uptime: str | None
    last_check: str | None

class SystemStatusResponse(BaseModel):
    overall_status: str
    scraper: dict
    mail_service: dict
    llm: dict
    database: dict

================================================================================
SECTION 8 — REPOSITORY RULES
================================================================================

Same rules as original spec — ALL SQL lives in api/repositories/*.py ONLY.

Key SQL patterns for this project:

1. Jobs list with user's status (LEFT JOIN):
   SELECT
     sp.*,
     js.status,
     js.note,
     js.assigned_to,
     js.updated_at AS status_updated_at,
     COUNT(*) OVER() AS total_count
   FROM scraped_posts sp
   LEFT JOIN job_status js
     ON js.job_id = sp.id AND js.user_id = %s
   WHERE 1=1
     [dynamic filters]
   ORDER BY sp.scraped_at DESC
   LIMIT %s OFFSET %s

2. Full-text search on jobs:
   to_tsvector('english',
     COALESCE(role_title,'') || ' ' ||
     COALESCE(location,'') || ' ' ||
     array_to_string(COALESCE(skills, '{}'), ' ')
   ) @@ plainto_tsquery('english', %s)

3. Skills aggregation:
   SELECT unnest(skills) AS skill, COUNT(*) AS count
   FROM scraped_posts
   WHERE scraped_at >= NOW() - INTERVAL '7 days'
   GROUP BY skill
   ORDER BY count DESC
   LIMIT %s

4. Bench candidate outreach (JOIN):
   SELECT
     bc.*,
     json_agg(ol.* ORDER BY ol.sent_at DESC) FILTER (WHERE ol.id IS NOT NULL) AS outreach
   FROM bench_candidates bc
   LEFT JOIN outreach_logs ol ON ol.candidate_id = bc.id
   WHERE bc.business_id = %s AND bc.id = %s
   GROUP BY bc.id

5. Analytics per candidate (aggregate):
   SELECT
     bc.id, bc.name, bc.title, bc.bench_recruiter_name,
     COUNT(ol.id) AS total_submissions,
     COUNT(ol.id) FILTER (WHERE ol.status = 'Replied') AS replies
   FROM bench_candidates bc
   LEFT JOIN outreach_logs ol ON ol.candidate_id = bc.id
   WHERE bc.business_id = %s
   GROUP BY bc.id

PARAMETERIZED QUERIES — MANDATORY:
  CORRECT: cur.execute("SELECT * FROM t WHERE id = %s", (id,))
  WRONG:   cur.execute(f"SELECT * FROM t WHERE id = '{id}'")

================================================================================
SECTION 9 — SERVICE LAYER RULES
================================================================================

Same as original — services contain business logic, no SQL, no HTTPException.

Business rules specific to this project:

1. When listing jobs, default status to 'New' if no job_status row exists.
   row["status"] = row.get("status") or "New"

2. Only one resume can be is_default=True per user.
   When setting a new default, the service must first unset the old default:
   UPDATE candidate_resumes SET is_default = FALSE WHERE user_id = %s AND is_default = TRUE
   UPDATE candidate_resumes SET is_default = TRUE WHERE id = %s AND user_id = %s

3. Bench candidates are scoped to business_id.
   Always add WHERE business_id = %s to all bench_candidates queries.

4. Admin endpoints skip business_id scoping.
   The service checks user_type before deciding what to pass to the repository.

5. Outreach logs use business_id for business users, user_id for candidates.

6. Placement rate:
   placement_rate_pct = (total_placements / max(total_submissions, 1)) * 100

================================================================================
SECTION 10 — DEPENDENCIES
================================================================================

Same get_db() + get_current_user() pattern from original spec.

ADDITIONAL DEPENDENCY — get_user_role():
  Queries user_roles table for the verified user.
  Attaches user_type + business_id to the request context.

  def get_user_role(
      user: dict = Depends(get_current_user),
      conn=Depends(get_db),
  ) -> dict:
      with conn.cursor(cursor_factory=RealDictCursor) as cur:
          cur.execute(
              "SELECT * FROM user_roles WHERE user_id = %s",
              (user["sub"],)
          )
          role = cur.fetchone()
      if not role:
          raise HTTPException(status_code=403, detail="User role not configured")
      return dict(role)

================================================================================
SECTION 11 — ERROR HANDLING
================================================================================

Same error response shape as original spec:
  { "error": "Human readable", "code": "MACHINE_CODE", "detail": {} }

Additional error codes for this project:
  RESUME_NOT_FOUND       — 404
  RESUME_NOT_OWNED       — 403 (candidate owns a different resume)
  CANNOT_DELETE_DEFAULT  — 400 (trying to delete the default resume)
  CANDIDATE_NOT_OWNED    — 403 (business_id mismatch)
  DUPLICATE_KEYWORD      — 409 (scraper keyword already exists)
  INVALID_USER_TYPE      — 403 (wrong portal access)
  JOB_NOT_FOUND          — 404
  APPLICATION_NOT_FOUND  — 404

================================================================================
SECTION 12 — AUTH STRATEGY
================================================================================

Same as original — Supabase JWT, HS256, SUPABASE_JWT_SECRET from .env.

IMPORTANT: On first login, frontend must POST to Supabase to create a row
in user_roles with the appropriate user_type.

Alternatively, allow a one-time setup endpoint:
  POST /api/v1/auth/register
  Body: { "user_type": "candidate" | "business" | "admin", "company_name": "..." }
  Creates user_roles row. Can only be called once per user.

================================================================================
SECTION 13 — MAIN APP (api/main.py)
================================================================================

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.core.database import init_pool, close_pool
from api.routers import (
    health, auth, jobs, job_status, resumes, applications,
    recruiters, email_templates, outreach, candidate_profile,
    business_candidates, analytics, team,
    scraper, linkedin_accounts, customers, system, settings
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_pool()
    yield
    close_pool()

app = FastAPI(
    title="C2C Staffing Platform API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://yourdomain.com"],
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

# Public
app.include_router(health.router,            prefix="/api/v1")

# Auth (all users)
app.include_router(auth.router,              prefix="/api/v1")

# Jobs (all users)
app.include_router(jobs.router,              prefix="/api/v1")
app.include_router(job_status.router,        prefix="/api/v1")

# Candidate portal
app.include_router(resumes.router,           prefix="/api/v1")
app.include_router(applications.router,      prefix="/api/v1")
app.include_router(candidate_profile.router, prefix="/api/v1")

# Shared (candidate + business)
app.include_router(recruiters.router,        prefix="/api/v1")
app.include_router(email_templates.router,   prefix="/api/v1")
app.include_router(outreach.router,          prefix="/api/v1")
app.include_router(analytics.router,         prefix="/api/v1")

# Business portal
app.include_router(business_candidates.router, prefix="/api/v1")
app.include_router(team.router,              prefix="/api/v1")

# Admin portal
app.include_router(scraper.router,           prefix="/api/v1")
app.include_router(linkedin_accounts.router, prefix="/api/v1")
app.include_router(customers.router,         prefix="/api/v1")
app.include_router(system.router,            prefix="/api/v1")
app.include_router(settings.router,          prefix="/api/v1")

================================================================================
SECTION 14 — CODE STYLE RULES
================================================================================

Same as original — not repeated here. Follow exactly:
  snake_case variables/functions
  PascalCase classes
  UPPER_SNAKE_CASE constants
  40-line max per function
  Type-annotate everything
  No SQL in services or routers
  No business logic in repositories
  No HTTPException in services
  Comment the WHY not the WHAT

================================================================================
SECTION 15 — ENVIRONMENT VARIABLES
================================================================================

Append to existing .env:

  # API Server
  API_PORT=8000
  API_ENV=development

  # Already exists:
  DATABASE_URL=postgresql://...

  # Supabase
  SUPABASE_JWT_SECRET=your-jwt-secret-from-dashboard
  SUPABASE_URL=https://xxx.supabase.co
  SUPABASE_ANON_KEY=your-anon-key

  # Email (SendGrid or SMTP)
  SENDGRID_API_KEY=
  EMAIL_FROM=outreach@yourdomain.com

  # LLM (for resume tailoring feature)
  OPENAI_API_KEY=

  # File storage (for resume uploads)
  STORAGE_BACKEND=local        # "local" or "s3"
  AWS_BUCKET_NAME=
  AWS_ACCESS_KEY_ID=
  AWS_SECRET_ACCESS_KEY=

================================================================================
SECTION 16 — RUNNING THE API
================================================================================

Development:
  uvicorn api.main:app --reload --port 8000

Production:
  gunicorn api.main:app \
    -w 4 \
    -k uvicorn.workers.UvicornWorker \
    --bind 0.0.0.0:8000

================================================================================
SECTION 17 — MIGRATIONS (run once before first start)
================================================================================

Save as scripts/migrations/V007__platform_tables.sql and run:

  psql $DATABASE_URL -f scripts/migrations/V007__platform_tables.sql

SQL file contents: all CREATE TABLE IF NOT EXISTS statements from Section 5
in order:
  1. user_roles
  2. job_status
  3. candidate_profiles
  4. candidate_resumes
  5. candidate_applications
  6. recruiters
  7. email_templates
  8. businesses
  9. team_members
  10. bench_candidates
  11. outreach_logs
  12. scraper_keywords
  13. scraper_groups
  14. admin_settings

================================================================================
SECTION 18 — BUILD ORDER
================================================================================

  Step 1:  api/core/config.py          — extend settings
  Step 2:  api/core/database.py        — connection pool
  Step 3:  api/core/auth.py            — JWT verification
  Step 4:  api/dependencies.py         — get_db, get_current_user, get_user_role
  Step 5:  api/core/errors.py          — error handlers
  Step 6:  Run migrations              — create all tables
  Step 7:  api/schemas/job.py          — job schemas
  Step 8:  api/repositories/jobs_repo.py
  Step 9:  api/services/jobs_service.py
  Step 10: api/routers/jobs.py         — GET /api/v1/jobs, GET /jobs/{id}
  Step 11: api/main.py                 — wire it up
  Step 12: GET /health                 — confirm DB connected
  Step 13: GET /api/v1/jobs            — confirm jobs return from scraped_posts
  Step 14: PATCH /jobs/{id}/status     — confirm status writes to job_status
  Step 15: resumes CRUD                — schemas, repo, service, router
  Step 16: applications CRUD
  Step 17: recruiter directory
  Step 18: outreach log
  Step 19: candidate profile
  Step 20: bench candidates (business portal)
  Step 21: team (business portal)
  Step 22: analytics (summary + candidates + skills + chart)
  Step 23: scraper control (keywords, groups, run history)
  Step 24: linkedin accounts
  Step 25: customers (admin)
  Step 26: system status (admin)
  Step 27: settings
  Step 28: auth/me
  Step 29: tests/ — write tests for each layer

At each step: run the server, hit the endpoint in /docs,
confirm correct data before moving to the next step.

================================================================================
SECTION 19 — ROUTE SUMMARY
================================================================================

  GET    /health
  GET    /api/v1/auth/me

  GET    /api/v1/jobs
  GET    /api/v1/jobs/{id}
  PATCH  /api/v1/jobs/{id}/status

  GET    /api/v1/resumes
  POST   /api/v1/resumes
  PATCH  /api/v1/resumes/{id}
  DELETE /api/v1/resumes/{id}

  GET    /api/v1/applications
  POST   /api/v1/applications
  PATCH  /api/v1/applications/{id}
  DELETE /api/v1/applications/{id}

  GET    /api/v1/profile
  PATCH  /api/v1/profile

  GET    /api/v1/recruiters
  GET    /api/v1/recruiters/{id}
  POST   /api/v1/recruiters
  PATCH  /api/v1/recruiters/{id}

  GET    /api/v1/email-templates

  GET    /api/v1/outreach
  POST   /api/v1/outreach

  GET    /api/v1/analytics/summary
  GET    /api/v1/analytics/candidates
  GET    /api/v1/analytics/skills
  GET    /api/v1/analytics/chart
  GET    /api/v1/analytics/locations

  GET    /api/v1/business/candidates
  GET    /api/v1/business/candidates/{id}
  POST   /api/v1/business/candidates
  PATCH  /api/v1/business/candidates/{id}
  DELETE /api/v1/business/candidates/{id}

  GET    /api/v1/team
  POST   /api/v1/team
  PATCH  /api/v1/team/{id}
  DELETE /api/v1/team/{id}

  GET    /api/v1/admin/scraper/runs
  GET    /api/v1/admin/scraper/keywords
  POST   /api/v1/admin/scraper/keywords
  PATCH  /api/v1/admin/scraper/keywords/{id}
  DELETE /api/v1/admin/scraper/keywords/{id}
  GET    /api/v1/admin/scraper/groups
  POST   /api/v1/admin/scraper/groups
  PATCH  /api/v1/admin/scraper/groups/{id}
  DELETE /api/v1/admin/scraper/groups/{id}

  GET    /api/v1/admin/accounts
  PATCH  /api/v1/admin/accounts/{id}

  GET    /api/v1/admin/customers
  GET    /api/v1/admin/customers/{id}

  GET    /api/v1/admin/outreach

  GET    /api/v1/admin/system

  GET    /api/v1/settings
  PATCH  /api/v1/settings

================================================================================
END OF SPECIFICATION
================================================================================
