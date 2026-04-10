import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  SquaresFour, Briefcase, UsersThree, ChartBar, EnvelopeSimple,
  FileText, Gear, SignOut, List, X, User, Buildings, Robot,
  Database, Target, Crown, UserCircle, ShieldCheck, CaretLeft, CaretRight
} from '@phosphor-icons/react';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Role badge config ────────────────────────────────────────────────────────
const ROLE_BADGES = {
  independent:     { label: 'Independent',     bg: 'bg-blue-500/10',    text: 'text-blue-400'    },
  owner:           { label: 'Owner',            bg: 'bg-amber-500/10',   text: 'text-amber-400'   },
  recruiter:       { label: 'Recruiter',        bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  bench_candidate: { label: 'Bench Candidate',  bg: 'bg-violet-500/10',  text: 'text-violet-400'  },
  admin:           { label: 'Admin',            bg: 'bg-rose-500/10',    text: 'text-rose-400'    },
};

// ─── Navigation config ────────────────────────────────────────────────────────
const NAV = {
  candidate: [
    { name: 'Dashboard',    icon: SquaresFour,   path: '/candidate/dashboard'    },
    { name: 'Jobs Explorer',icon: Briefcase,      path: '/candidate/jobs'         },
    { name: 'Resume Lab',   icon: FileText,       path: '/candidate/resume'       },
    { name: 'Applications', icon: EnvelopeSimple, path: '/candidate/applications' },
    { name: 'Recruiters',   icon: UsersThree,     path: '/candidate/recruiters'   },
    { name: 'Profile',      icon: User,           path: '/candidate/profile'      },
    { name: 'Settings',     icon: Gear,           path: '/candidate/settings'     },
  ],
  business_owner: [
    { name: 'Dashboard',    icon: SquaresFour,   path: '/business/dashboard'   },
    { name: 'Job Leads',    icon: Briefcase,      path: '/business/leads'       },
    { name: 'Candidates',   icon: User,           path: '/business/candidates'  },
    { name: 'Outreach',     icon: EnvelopeSimple, path: '/business/outreach'    },
    { name: 'Recruiters',   icon: UsersThree,     path: '/business/recruiters'  },
    { name: 'Resume Lab',   icon: FileText,       path: '/business/resumes'     },
    { name: 'Analytics',    icon: ChartBar,       path: '/business/analytics'   },
    { name: 'Team',         icon: Buildings,      path: '/business/team', ownerOnly: true },
    { name: 'Settings',     icon: Gear,           path: '/business/settings'    },
  ],
  business_recruiter: [
    { name: 'Dashboard',    icon: SquaresFour,   path: '/business/dashboard'   },
    { name: 'Job Leads',    icon: Briefcase,      path: '/business/leads'       },
    { name: 'Candidates',   icon: User,           path: '/business/candidates'  },
    { name: 'Outreach',     icon: EnvelopeSimple, path: '/business/outreach'    },
    { name: 'Recruiters',   icon: UsersThree,     path: '/business/recruiters'  },
    { name: 'Resume Lab',   icon: FileText,       path: '/business/resumes'     },
    { name: 'Analytics',    icon: ChartBar,       path: '/business/analytics'   },
    { name: 'Settings',     icon: Gear,           path: '/business/settings'    },
  ],
  bench: [
    { name: 'My Dashboard',   icon: SquaresFour,   path: '/bench/dashboard'     },
    { name: 'Jobs Explorer',  icon: Briefcase,      path: '/bench/jobs'          },
    { name: 'Resume Lab',     icon: FileText,       path: '/bench/resume'        },
    { name: 'Outreach',       icon: EnvelopeSimple, path: '/bench/outreach'      },
    { name: 'Recruiters',     icon: UsersThree,     path: '/bench/recruiters'    },
    { name: 'My Profile',     icon: User,           path: '/bench/profile'       },
    { name: 'Settings',       icon: Gear,           path: '/bench/settings'      },
  ],
  admin: [
    { name: 'Dashboard',      icon: SquaresFour,   path: '/admin/dashboard'  },
    { name: 'Jobs / Leads',   icon: Briefcase,      path: '/admin/leads'      },
    { name: 'Customers',      icon: Buildings,      path: '/admin/customers'  },
    { name: 'Recruiters',     icon: UsersThree,     path: '/admin/recruiters' },
    { name: 'Outreach',       icon: EnvelopeSimple, path: '/admin/outreach'   },
    { name: 'Candidates',     icon: User,           path: '/admin/candidates' },
    { name: 'Scraper Control',icon: Robot,          path: '/admin/scraper'    },
    { name: 'System Info',    icon: Database,       path: '/admin/system'     },
    { name: 'Settings',       icon: Gear,           path: '/admin/settings'   },
  ],
};

// ─── Portal label ─────────────────────────────────────────────────────────────
const PORTAL_LABELS = {
  candidate: 'Candidate Portal',
  business:  'Business Portal',
  bench:     'Bench Portal',
  admin:     'Admin Portal',
};

// ─── Avatar icon per role ─────────────────────────────────────────────────────
const RoleIcon = ({ role }) => {
  const map = { owner: Crown, recruiter: Buildings, bench_candidate: UserCircle, admin: ShieldCheck };
  const Icon = map[role] || User;
  return <Icon size={20} weight="duotone" />;
};

export const DashboardLayout = ({ children, userType }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  // Resolve effective portal type and nav from user context
  const effectiveType = (() => {
    if (user?.type === 'bench')    return 'bench';
    if (user?.type === 'admin')    return 'admin';
    if (user?.type === 'candidate') return 'candidate';
    if (user?.type === 'business') {
      return user.role === 'recruiter' ? 'business_recruiter' : 'business_owner';
    }
    return userType || 'candidate';
  })();

  const navigation = NAV[effectiveType] || NAV.candidate;
  const portalLabel = PORTAL_LABELS[user?.type] || PORTAL_LABELS[userType] || 'Portal';
  const roleBadge = ROLE_BADGES[user?.role] || null;

  const handleLogout = () => { logout(); navigate('/login'); };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <div className={`${sidebarCollapsed ? 'hidden' : 'block'}`}>
          <h1 className="font-outfit font-bold text-xl text-zinc-900 dark:text-zinc-50">PaidPilot</h1>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 uppercase tracking-wider">{portalLabel}</p>
          {/* Company badge for business/bench */}
          {user?.company && (
            <div className="mt-2 flex items-center gap-1.5">
              <Buildings size={11} className="text-zinc-400" />
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium truncate">{user.company}</span>
            </div>
          )}
        </div>
        {sidebarCollapsed && (
          <h1 className="font-outfit font-bold text-xl text-blue-600 dark:text-blue-400">PP</h1>
        )}
        {/* Desktop collapse toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex items-center justify-center w-6 h-6 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? <CaretRight size={14} weight="bold" /> : <CaretLeft size={14} weight="bold" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navigation
          .filter(item => {
            // Hide "Team" from Bench Recruiter
            if (item.ownerOnly && user?.role === 'recruiter') {
              return false;
            }
            return true;
          })
          .map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group ${
                isActive
                  ? 'bg-blue-600 text-white dark:bg-blue-500 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50'
              }`
            }
            title={sidebarCollapsed ? item.name : ''}
          >
            {({ isActive }) => (
              <>
                <item.icon size={18} weight={isActive ? 'fill' : 'regular'} className="flex-shrink-0" />
                <span className={`text-sm font-medium ${sidebarCollapsed ? 'hidden' : 'block'}`}>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{user?.name}</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">{user?.email}</p>
          </div>
        </div>
        {/* Role badge */}
        {roleBadge && (
          <div className={`mb-2 px-2 py-1 rounded-lg ${roleBadge.bg} flex items-center gap-1.5`}>
            <RoleIcon role={user?.role} />
            <span className={`text-[11px] font-semibold ${roleBadge.text}`}>{roleBadge.label}</span>
          </div>
        )}
        <button
          onClick={handleLogout} data-testid="logout-button"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
        >
          <SignOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors duration-300">
      {/* Mobile header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white/80 dark:bg-[#18181b]/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-zinc-700 dark:text-zinc-300" data-testid="mobile-menu-button">
            {sidebarOpen ? <X size={22} /> : <List size={22} />}
          </button>
          <span className="font-outfit font-bold text-lg text-zinc-900 dark:text-zinc-50">PaidPilot</span>
          <ThemeToggle />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-60 xl:w-64'} lg:flex flex-col bg-white dark:bg-[#18181b] border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300`}>
        <Sidebar />
      </div>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.22 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#18181b] border-r border-zinc-200 dark:border-zinc-800 lg:hidden"
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className={`${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60 xl:pl-64'} transition-all duration-300`}>
        {/* Top bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-3.5 bg-white/80 dark:bg-[#18181b]/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Welcome back, <span className="font-semibold text-zinc-900 dark:text-zinc-50">{user?.name}</span>
            </span>
            {roleBadge && (
              <span className={`px-2 py-0.5 text-[11px] font-bold rounded-md ${roleBadge.bg} ${roleBadge.text}`}>
                {roleBadge.label}
              </span>
            )}
          </div>
          <ThemeToggle />
        </div>
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
};
