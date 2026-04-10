import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  SquaresFour,
  Briefcase,
  UsersThree,
  ChartBar,
  EnvelopeSimple,
  FileText,
  Gear,
  SignOut,
  List,
  X,
  User,
  Target,
  Buildings,
  Robot,
  CurrencyDollar,
  Database
} from '@phosphor-icons/react';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const navigationByType = {
  candidate: [
    { name: 'Dashboard', icon: SquaresFour, path: '/candidate/dashboard' },
    { name: 'Jobs Explorer', icon: Briefcase, path: '/candidate/jobs' },
    { name: 'Resume Lab', icon: FileText, path: '/candidate/resume' },
    { name: 'Applications', icon: EnvelopeSimple, path: '/candidate/applications' },
    { name: 'Recruiters', icon: UsersThree, path: '/candidate/recruiters' },
    { name: 'Profile', icon: User, path: '/candidate/profile' },
    { name: 'Settings', icon: Gear, path: '/candidate/settings' }
  ],
  business: [
    { name: 'Dashboard', icon: SquaresFour, path: '/business/dashboard' },
    { name: 'Job Leads', icon: Briefcase, path: '/business/leads' },
    { name: 'Candidates', icon: User, path: '/business/candidates' },
    { name: 'Recruiters', icon: UsersThree, path: '/business/recruiters' },
    { name: 'Outreach', icon: EnvelopeSimple, path: '/business/outreach' },
    { name: 'Resume Lab', icon: FileText, path: '/business/resumes' },
    { name: 'Analytics', icon: ChartBar, path: '/business/analytics' },
    { name: 'Team', icon: Buildings, path: '/business/team' },
    { name: 'Settings', icon: Gear, path: '/business/settings' }
  ],
  admin: [
    { name: 'Dashboard', icon: SquaresFour, path: '/admin/dashboard' },
    { name: 'Jobs / Leads', icon: Briefcase, path: '/admin/leads' },
    { name: 'Customers', icon: Buildings, path: '/admin/customers' },
    { name: 'Recruiters', icon: UsersThree, path: '/admin/recruiters' },
    { name: 'Outreach', icon: EnvelopeSimple, path: '/admin/outreach' },
    { name: 'Candidates', icon: User, path: '/admin/candidates' },
    { name: 'Scraper Control', icon: Robot, path: '/admin/scraper' },
    { name: 'System Info', icon: Database, path: '/admin/system' },
    { name: 'Settings', icon: Gear, path: '/admin/settings' }
  ]
};

export const DashboardLayout = ({ children, userType }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navigation = navigationByType[userType] || [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors duration-300">
      {/* Mobile header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white/70 dark:bg-[#18181b]/60 backdrop-blur-xl backdrop-saturate-150 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-zinc-900 dark:text-zinc-50"
            data-testid="mobile-menu-button"
          >
            {sidebarOpen ? <X size={24} /> : <List size={24} />}
          </button>
          <h1 className="font-outfit font-semibold text-lg text-zinc-900 dark:text-zinc-50">C2C Staffing</h1>
          <ThemeToggle />
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-[#18181b] border-r border-zinc-200 dark:border-zinc-800 lg:translate-x-0"
          >
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <h1 className="font-outfit font-bold text-2xl text-zinc-900 dark:text-zinc-50">
                  C2C Staffing
                </h1>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">
                  {userType} Portal
                </p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-600 text-white dark:bg-blue-500'
                          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon
                          size={20}
                          weight={isActive ? 'fill' : 'regular'}
                        />
                        <span className="text-sm font-medium">{item.name}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* User section */}
              <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-semibold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  data-testid="logout-button"
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-200"
                >
                  <SignOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-white/70 dark:bg-[#18181b]/60 backdrop-blur-xl backdrop-saturate-150 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            Welcome back, <span className="font-medium text-zinc-900 dark:text-zinc-50">{user?.name}</span>
          </div>
          <ThemeToggle />
        </div>
        <main className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};