import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import {
  Briefcase, Target, EnvelopeSimple, ChartLineUp, Eye,
  FileText, Clock, ArrowUp, ArrowDown, TrendUp
} from '@phosphor-icons/react';
import { mockJobs, mockApplications } from '../../data/mockData';
import { motion } from 'framer-motion';

const StatBlock = ({ title, value, change, trend, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
    data-testid={`stat-${title.toLowerCase().replace(/\s+/g, '-')}`}
  >
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
        <Icon size={20} weight="duotone" className="text-white" />
      </div>
      {change && (
        <span className={`flex items-center gap-0.5 text-xs font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
          {trend === 'up' ? <ArrowUp size={12} weight="bold" /> : <ArrowDown size={12} weight="bold" />}
          {change}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-0.5">{value}</p>
    <p className="text-xs text-zinc-500 dark:text-zinc-400">{title}</p>
  </motion.div>
);

const MiniBarChart = ({ data, label }) => {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">{label}</p>
      <div className="flex items-end gap-1.5 h-20">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full bg-blue-500 dark:bg-blue-400 rounded-t transition-all duration-500"
              style={{ height: `${(d.value / max) * 100}%`, minHeight: '4px' }}
            />
            <span className="text-[9px] text-zinc-500 dark:text-zinc-400">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CandidateDashboard = () => {
  const recentJobs = mockJobs.slice(0, 4);

  const weeklyActivity = [
    { label: 'Mon', value: 5 },
    { label: 'Tue', value: 8 },
    { label: 'Wed', value: 3 },
    { label: 'Thu', value: 12 },
    { label: 'Fri', value: 7 },
    { label: 'Sat', value: 2 },
    { label: 'Sun', value: 1 }
  ];

  const applicationStatus = [
    { label: 'Sent', value: 12, color: 'bg-blue-500' },
    { label: 'Viewed', value: 8, color: 'bg-amber-500' },
    { label: 'Replied', value: 5, color: 'bg-emerald-500' },
    { label: 'Interview', value: 2, color: 'bg-purple-500' }
  ];

  const recentActivity = [
    { action: 'Resume tailored', detail: 'for Senior Java Developer at TechCorp', time: '2 hours ago', type: 'resume' },
    { action: 'Application sent', detail: 'to CloudScale Inc for DevOps Engineer', time: '5 hours ago', type: 'sent' },
    { action: 'Profile viewed by recruiter', detail: 'Sarah Johnson viewed your profile', time: '1 day ago', type: 'view' },
    { action: 'New job match found', detail: 'Python Data Engineer - $95/hr Remote', time: '1 day ago', type: 'match' },
    { action: 'Follow-up reminder', detail: 'Digital Innovations - React Frontend', time: '2 days ago', type: 'reminder' }
  ];

  const activityIcons = {
    resume: <FileText size={16} className="text-blue-500" weight="duotone" />,
    sent: <EnvelopeSimple size={16} className="text-emerald-500" weight="duotone" />,
    view: <Eye size={16} className="text-amber-500" weight="duotone" />,
    match: <Target size={16} className="text-purple-500" weight="duotone" />,
    reminder: <Clock size={16} className="text-red-500" weight="duotone" />
  };

  return (
    <DashboardLayout userType="candidate">
      <div className="max-w-7xl mx-auto" data-testid="candidate-dashboard">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Dashboard
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Your job search overview at a glance.
          </p>
        </motion.div>

        {/* KPI Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatBlock title="Jobs Scraped Today" value="127" change="+12%" trend="up" icon={Briefcase} color="bg-blue-600" delay={0} />
          <StatBlock title="Matching Jobs" value="34" change="+8%" trend="up" icon={Target} color="bg-purple-600" delay={0.05} />
          <StatBlock title="Applications Sent" value="18" change="+22%" trend="up" icon={EnvelopeSimple} color="bg-emerald-600" delay={0.1} />
          <StatBlock title="Response Rate" value="28%" change="+3%" trend="up" icon={ChartLineUp} color="bg-amber-600" delay={0.15} />
          <StatBlock title="Profile Views" value="45" change="+15%" trend="up" icon={Eye} color="bg-rose-600" delay={0.2} />
        </div>

        {/* Main Content - Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Pipeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
              data-testid="application-pipeline"
            >
              <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Application Pipeline</h2>
              <div className="grid grid-cols-4 gap-3">
                {applicationStatus.map((status, idx) => {
                  const total = applicationStatus.reduce((s, a) => s + a.value, 0);
                  const pct = Math.round((status.value / total) * 100);
                  return (
                    <div key={idx} className="text-center" data-testid={`pipeline-${status.label.toLowerCase()}`}>
                      <div className="relative w-16 h-16 mx-auto mb-2">
                        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                          <circle cx="32" cy="32" r="28" fill="none" strokeWidth="5" className="stroke-zinc-100 dark:stroke-zinc-800" />
                          <circle
                            cx="32" cy="32" r="28" fill="none" strokeWidth="5"
                            strokeDasharray={`${pct * 1.76} 176`}
                            strokeLinecap="round"
                            className={status.color.replace('bg-', 'stroke-')}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-zinc-900 dark:text-zinc-50">
                          {status.value}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">{status.label}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Weekly Activity Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
              data-testid="weekly-activity-chart"
            >
              <MiniBarChart data={weeklyActivity} label="Weekly Activity (Applications)" />
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
                <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Latest Scraped Jobs</h2>
                <a href="/candidate/jobs" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline" data-testid="view-all-jobs-link">
                  View All
                </a>
              </div>
              <div className="space-y-3">
                {recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between py-2.5 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                    data-testid={`dashboard-job-${job.id}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">{job.role_title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{job.author_company}</span>
                        <span className="text-xs text-zinc-400">|</span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{job.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${
                        job.engagement_type === 'C2C' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        job.engagement_type === 'W2' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                        'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>{job.engagement_type}</span>
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{job.rate_raw}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            {/* Resume Health */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
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
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Default Resume</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-50">Java_Senior_v3</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Total Versions</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-50">6</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Last Updated</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-50">2 days ago</span>
                </div>
              </div>
              <a href="/candidate/resume" className="block mt-4 text-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline" data-testid="go-to-resume-lab">
                Go to Resume Lab
              </a>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
              data-testid="recent-activity"
            >
              <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      {activityIcons[activity.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{activity.action}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">{activity.detail}</p>
                      <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Skills Match */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
              data-testid="top-skills-demand"
            >
              <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Top Skills in Demand</h2>
              <div className="space-y-2.5">
                {[
                  { skill: 'Java', count: 234, pct: 100 },
                  { skill: 'Python', count: 189, pct: 81 },
                  { skill: 'React', count: 167, pct: 71 },
                  { skill: 'AWS', count: 156, pct: 67 },
                  { skill: 'Kubernetes', count: 142, pct: 61 }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{item.skill}</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">{item.count} jobs</span>
                    </div>
                    <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 dark:bg-blue-400 rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CandidateDashboard;
