import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import {
  LinkedinLogo, Briefcase, EnvelopeSimple,
  FileText, Clock, ArrowUp, ArrowRight,
  MagnifyingGlass, Scissors, ListChecks, Robot
} from '@phosphor-icons/react';
import { mockJobs, mockApplications, mockRecruiters, mockBenchSubmissions } from '../../data/mockData';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const StatBlock = ({ title, value, sub, icon: Icon, color, iconBg, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
    data-testid={`stat-${title.toLowerCase().replace(/\s+/g, '-')}`}
  >
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}>
        <Icon size={20} weight="duotone" className={color} />
      </div>
    </div>
    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-0.5">{value}</p>
    <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{title}</p>
    {sub && <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{sub}</p>}
  </motion.div>
);

const WeeklyBarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div>
      <div className="flex items-end gap-2 h-28">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 mb-1">{d.value}</span>
            <div
              className="w-full bg-blue-500 dark:bg-blue-400 rounded-t transition-all duration-500"
              style={{ height: `${Math.max((d.value / max) * 80, 4)}px` }}
              title={`${d.value} sent`}
            />
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CandidateDashboard = () => {
  const { user } = useAuth();
  const isBenchCandidate = user?.role === 'bench_candidate';
  const recentJobs = mockJobs.slice(0, 6);

  const weeklyApplications = [
    { label: 'Mon', value: 5 },
    { label: 'Tue', value: 8 },
    { label: 'Wed', value: 3 },
    { label: 'Thu', value: 12 },
    { label: 'Fri', value: 7 },
    { label: 'Sat', value: 2 },
    { label: 'Sun', value: 1 }
  ];

  const totalSent = weeklyApplications.reduce((s, d) => s + d.value, 0);

  // Only mail sent + resume tailored
  const recentActivity = [
    { action: 'Email sent', detail: 'to Sarah Johnson — Senior Java Developer at TechCorp', time: '2 hours ago', type: 'email' },
    { action: 'Resume tailored', detail: 'Java_Senior_v3 for DevOps Engineer at CloudScale', time: '4 hours ago', type: 'resume' },
    { action: 'Email sent', detail: 'to Jennifer Martinez — DevOps Engineer at CloudScale Inc', time: '5 hours ago', type: 'email' },
    { action: 'Resume tailored', detail: 'React_Frontend_v2 for React Engineer at Digital Innovations', time: '1 day ago', type: 'resume' },
    { action: 'Email sent', detail: 'to Michael Chen — React Frontend Engineer at Digital Innovations', time: '1 day ago', type: 'email' },
    { action: 'Resume tailored', detail: 'Cloud_Architect_v1 for Cloud Architect at MegaCorp', time: '2 days ago', type: 'resume' },
  ];

  // Jobs scraped by skill (chart data)
  const skillsData = [
    { skill: 'Java', count: 234, pct: 100 },
    { skill: 'Python', count: 189, pct: 81 },
    { skill: 'React', count: 167, pct: 71 },
    { skill: 'AWS', count: 156, pct: 67 },
    { skill: 'DevOps', count: 142, pct: 61 },
    { skill: '.NET', count: 118, pct: 50 },
    { skill: 'Kubernetes', count: 97, pct: 41 },
  ];

  // Top active recruiters this week
  const topRecruiters = mockRecruiters.slice(0, 4);

  const quickActions = [
    { label: 'Browse Jobs', icon: MagnifyingGlass, href: '/candidate/jobs', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20' },
    { label: 'Tailor Resume', icon: Scissors, href: '/candidate/resume', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/20' },
    { label: 'Applications', icon: ListChecks, href: '/candidate/applications', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20' },
    { label: 'Auto-Outreach', icon: Robot, href: '/candidate/recruiters', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20' },
  ];

  return (
    <DashboardLayout userType={user?.type || 'candidate'}>
      <div className="max-w-7xl mx-auto" data-testid="candidate-dashboard">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl sm:text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
            Dashboard
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Today's job intelligence and outreach overview.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="grid grid-cols-4 gap-3 mb-6"
          data-testid="quick-actions"
        >
          {quickActions.map((action, idx) => (
            <a
              key={idx}
              href={action.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-colors duration-200 cursor-pointer ${action.bg}`}
              data-testid={`quick-action-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <action.icon size={18} weight="duotone" className={action.color} />
              <span className={`text-sm font-medium ${action.color}`}>{action.label}</span>
            </a>
          ))}
        </motion.div>

        {/* KPI Stats */}
        <div className={`grid grid-cols-2 ${isBenchCandidate ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-4 mb-6`}>
          <StatBlock
            title="LinkedIn Jobs Scraped"
            value="127"
            sub="Today · 843 this week"
            icon={LinkedinLogo}
            iconBg="bg-blue-100 dark:bg-blue-500/10"
            color="text-blue-600 dark:text-blue-400"
            delay={0}
          />
          <StatBlock
            title="Dice Jobs Available"
            value="43"
            sub="Today · 289 this week"
            icon={Briefcase}
            iconBg="bg-orange-100 dark:bg-orange-500/10"
            color="text-orange-600 dark:text-orange-400"
            delay={0.05}
          />
          <StatBlock
            title="Applications Sent"
            value="18"
            sub="This week · 38 this month"
            icon={EnvelopeSimple}
            iconBg="bg-emerald-100 dark:bg-emerald-500/10"
            color="text-emerald-600 dark:text-emerald-400"
            delay={0.1}
          />
          <StatBlock
            title="Resumes Tailored"
            value="6"
            sub="This week · 23 this month"
            icon={FileText}
            iconBg="bg-purple-100 dark:bg-purple-500/10"
            color="text-purple-600 dark:text-purple-400"
            delay={0.15}
          />
          {/* Bench Candidate Extra KPI */}
          {isBenchCandidate && (
            <StatBlock
              title="Submitted by Recruiter"
              value={mockBenchSubmissions.length.toString()}
              sub={`${user?.assignedRecruiter || 'Your Recruiter'}`}
              icon={Robot}
              iconBg="bg-violet-100 dark:bg-violet-500/10"
              color="text-violet-600 dark:text-violet-400"
              delay={0.18}
            />
          )}
        </div>

        {/* Source Breakdown Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* LinkedIn Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
            data-testid="linkedin-breakdown"
          >
            <div className="flex items-center gap-2 mb-4">
              <LinkedinLogo size={18} className="text-blue-600 dark:text-blue-400" weight="fill" />
              <h2 className="text-sm font-outfit font-semibold text-zinc-900 dark:text-zinc-50">LinkedIn Scraping</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Job Posts', value: '87', sub: 'today' },
                { label: 'Group Posts', value: '40', sub: 'today' },
                { label: 'Total This Week', value: '843', sub: 'this week' },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{item.value}</p>
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{item.label}</p>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Dice Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22 }}
            className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
            data-testid="dice-breakdown"
          >
            <div className="flex items-center gap-2 mb-4">
              <Briefcase size={18} className="text-orange-500 dark:text-orange-400" weight="duotone" />
              <h2 className="text-sm font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Dice Scraping</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'New Listings', value: '43', sub: 'today' },
                { label: 'Qualified', value: '31', sub: 'today' },
                { label: 'Total This Week', value: '289', sub: 'this week' },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{item.value}</p>
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{item.label}</p>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">

            {/* Weekly Applications Sent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
              data-testid="weekly-applications-chart"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Applications Sent This Week</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Daily outreach activity — {totalSent} total sent this week</p>
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  <ArrowUp size={12} weight="bold" />
                  +22% vs last week
                </span>
              </div>
              <WeeklyBarChart data={weeklyApplications} />
            </motion.div>

            {/* Jobs Scraped by Skill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
              data-testid="jobs-by-skill-chart"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Jobs Scraped by Skill</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Total job count per top skill — all sources</p>
                </div>
              </div>
              <div className="space-y-3">
                {skillsData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300 w-20 shrink-0">{item.skill}</span>
                    <div className="flex-1 h-5 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        transition={{ duration: 0.6, delay: 0.4 + idx * 0.06 }}
                        className="h-full bg-blue-500 dark:bg-blue-400 rounded-md flex items-center justify-end pr-2"
                      >
                      </motion.div>
                    </div>
                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 w-12 text-right">{item.count}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Latest Scraped Jobs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
              data-testid="latest-scraped-jobs"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Latest Scraped Jobs</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Most recently added across all sources</p>
                </div>
                <a href="/candidate/jobs" className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline" data-testid="view-all-jobs-link">
                  View All <ArrowRight size={12} weight="bold" />
                </a>
              </div>
              <div className="space-y-0">
                {recentJobs.map((job, idx) => {
                  // Format scraped_at to relative time
                  const scrapedAt = new Date(job.scraped_at);
                  const now = new Date('2025-02-09T12:00:00Z');
                  const diffH = Math.round((now - scrapedAt) / 3600000);
                  const timeAgo = diffH < 24 ? `${diffH}h ago` : `${Math.round(diffH / 24)}d ago`;

                  return (
                    <div
                      key={job.id}
                      className="flex items-center gap-4 py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                      data-testid={`dashboard-job-${job.id}`}
                    >
                      {/* Source badge */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${job.source === 'LinkedIn' ? 'bg-blue-50 dark:bg-blue-500/10' : 'bg-orange-50 dark:bg-orange-500/10'}`}>
                        {job.source === 'LinkedIn'
                          ? <LinkedinLogo size={16} weight="fill" className="text-blue-600 dark:text-blue-400" />
                          : <Briefcase size={16} weight="duotone" className="text-orange-500 dark:text-orange-400" />
                        }
                      </div>

                      {/* Job info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">{job.role_title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{job.location}</span>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border ${
                          job.engagement_type === 'C2C'
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
                            : job.engagement_type === 'W2'
                            ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20'
                            : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
                        }`}>{job.engagement_type}</span>
                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50 w-16 text-right">{job.rate_raw}</span>
                        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 w-12 text-right">{timeAgo}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">

            {/* Resume Health */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
              data-testid="resume-health"
            >
              <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Resume Health</h2>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="42" fill="none" strokeWidth="7" className="stroke-zinc-100 dark:stroke-zinc-800" />
                    <circle
                      cx="48" cy="48" r="42" fill="none" strokeWidth="7"
                      strokeDasharray={`${95 * 2.64} 264`}
                      strokeLinecap="round"
                      className="stroke-emerald-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">95</span>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400">ATS Score</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Default Resume', val: 'Java_Senior_v3' },
                  { label: 'Total Versions', val: '6' },
                  { label: 'Last Tailored', val: '2 hours ago' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">{item.label}</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-50 text-right">{item.val}</span>
                  </div>
                ))}
              </div>
              <a href="/candidate/resume" className="block mt-4 text-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline" data-testid="go-to-resume-lab">
                Go to Resume Lab →
              </a>
            </motion.div>

            {/* Recent Activity - Mail + Resume only */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.33 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
              data-testid="recent-activity"
            >
              <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0 last:pb-0">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'email'
                        ? 'bg-emerald-50 dark:bg-emerald-500/10'
                        : 'bg-blue-50 dark:bg-blue-500/10'
                    }`}>
                      {activity.type === 'email'
                        ? <EnvelopeSimple size={14} className="text-emerald-600 dark:text-emerald-400" weight="duotone" />
                        : <FileText size={14} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{activity.action}</p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">{activity.detail}</p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 flex items-center gap-1">
                        <Clock size={10} /> {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Active Recruiters This Week */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.38 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
              data-testid="top-recruiters"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Top Recruiters This Week</h2>
                <a href="/candidate/recruiters" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  All →
                </a>
              </div>
              <div className="space-y-3">
                {topRecruiters.map((recruiter, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-white">{recruiter.name.split(' ').map(n => n[0]).join('').slice(0,2)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-zinc-900 dark:text-zinc-50 truncate">{recruiter.name}</p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">{recruiter.company}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 shrink-0">{recruiter.totalPosts} posts</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bench Candidate: Recruiter Activity Widget */}
            {isBenchCandidate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.42 }}
                className="bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950/40 dark:to-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-xl p-5"
                data-testid="recruiter-activity"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Robot size={18} className="text-violet-600 dark:text-violet-400" weight="duotone" />
                  <h2 className="text-base font-outfit font-semibold text-violet-900 dark:text-violet-50">Recruiter Activity</h2>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/60 dark:bg-zinc-900/40 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-violet-700 dark:text-violet-300">Assigned Recruiter</span>
                    </div>
                    <p className="text-sm font-bold text-violet-900 dark:text-violet-100">{user?.assignedRecruiter || 'Not Assigned'}</p>
                  </div>
                  <div className="bg-white/60 dark:bg-zinc-900/40 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-violet-700 dark:text-violet-300">Total Submissions</span>
                    </div>
                    <p className="text-2xl font-bold text-violet-900 dark:text-violet-100">{mockBenchSubmissions.length}</p>
                    <p className="text-[10px] text-violet-600 dark:text-violet-400 mt-0.5">
                      Last submitted: {new Date(mockBenchSubmissions[0]?.submittedDate || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="bg-white/60 dark:bg-zinc-900/40 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-violet-700 dark:text-violet-300">This Week</span>
                    </div>
                    <p className="text-2xl font-bold text-violet-900 dark:text-violet-100">
                      {mockBenchSubmissions.filter(s => {
                        const oneWeekAgo = new Date();
                        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                        return new Date(s.submittedDate) >= oneWeekAgo;
                      }).length}
                    </p>
                    <p className="text-[10px] text-violet-600 dark:text-violet-400 mt-0.5">Applications sent by recruiter</p>
                  </div>
                </div>
                <a 
                  href="/bench/submissions" 
                  className="block mt-4 text-center text-xs font-medium text-violet-700 dark:text-violet-300 hover:text-violet-900 dark:hover:text-violet-100 transition-colors"
                >
                  View All Submissions →
                </a>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CandidateDashboard;
