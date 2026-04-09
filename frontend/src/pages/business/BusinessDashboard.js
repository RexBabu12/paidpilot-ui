import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockBusinessCandidates, mockJobs, mockAnalytics } from '../../data/mockData';
import {
  Users, Briefcase, EnvelopeSimple, TrendUp,
  ArrowUp, Clock, ChartBar, Lightning
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const BusinessDashboard = () => {
  const totalCandidates = mockBusinessCandidates.length;
  const totalSubmissions = mockBusinessCandidates.reduce((s, c) => s + c.totalSubmissions, 0);
  const totalPlacements = mockBusinessCandidates.reduce((s, c) => s + c.totalPlacements, 0);
  const jobsScraped = mockJobs.length;

  const recentActivity = [
    { id: 1, text: 'Resume sent for Rajesh Kumar to TechCorp - Sr Java Dev', time: '2 hours ago', type: 'outreach' },
    { id: 2, text: 'New job lead scraped: React Frontend Engineer at Digital Innovations', time: '3 hours ago', type: 'lead' },
    { id: 3, text: 'Maria Garcia profile updated by Amy Roberts', time: '5 hours ago', type: 'profile' },
    { id: 4, text: 'Resume sent for David Park to CloudScale - DevOps Lead', time: '6 hours ago', type: 'outreach' },
    { id: 5, text: '3 new C2C job leads scraped from LinkedIn', time: '8 hours ago', type: 'lead' },
    { id: 6, text: 'Michael Chen added as new candidate by Amy Roberts', time: '1 day ago', type: 'profile' },
    { id: 7, text: 'Resume sent for Ahmed Hassan to MegaCorp - Cloud Architect', time: '1 day ago', type: 'outreach' },
    { id: 8, text: '5 new job leads scraped from Dice', time: '1 day ago', type: 'lead' }
  ];

  const activityIcon = {
    outreach: EnvelopeSimple,
    lead: Briefcase,
    profile: Users
  };

  const activityColor = {
    outreach: 'text-blue-600 dark:text-blue-400 bg-blue-500/10',
    lead: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
    profile: 'text-violet-600 dark:text-violet-400 bg-violet-500/10'
  };

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
            Dashboard
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Overview of your staffing operations
          </p>
        </motion.div>

        {/* KPI Blocks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Candidates', value: totalCandidates, sub: 'On your bench', icon: Users, color: 'blue', change: '+2 this week' },
            { label: 'Active Submissions', value: totalSubmissions, sub: 'Emails sent to recruiters', icon: EnvelopeSimple, color: 'emerald', change: '+12 this week' },
            { label: 'Placements', value: totalPlacements, sub: 'Successful hires', icon: TrendUp, color: 'violet', change: '+3 this quarter' },
            { label: 'Scraped Jobs', value: mockAnalytics.jobsScraped.month.toLocaleString(), sub: 'This month', icon: Briefcase, color: 'amber', change: mockAnalytics.jobsScraped.trend }
          ].map((kpi, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.07 }}
              data-testid={`kpi-${kpi.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400">{kpi.label}</p>
                <div className={`w-9 h-9 rounded-lg bg-${kpi.color}-500/10 flex items-center justify-center`}>
                  <kpi.icon size={18} className={`text-${kpi.color}-600 dark:text-${kpi.color}-400`} weight="duotone" />
                </div>
              </div>
              <p className="text-3xl font-bold font-outfit text-zinc-900 dark:text-zinc-50">{kpi.value}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{kpi.sub}</span>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                  <ArrowUp size={10} weight="bold" />
                  {kpi.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Activity Feed */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl" data-testid="activity-feed">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Recent Activity</h2>
              </div>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {recentActivity.map((item, idx) => {
                  const Icon = activityIcon[item.type];
                  return (
                    <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="flex items-start gap-4 px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${activityColor[item.type]}`}>
                        <Icon size={16} weight="duotone" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-zinc-800 dark:text-zinc-200">{item.text}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1 flex items-center gap-1">
                          <Clock size={11} />
                          {item.time}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Candidate List */}
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl" data-testid="candidate-overview">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Candidates</h2>
              </div>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {mockBusinessCandidates.slice(0, 6).map((c) => (
                  <div key={c.id} className="flex items-center justify-between px-6 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{c.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{c.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{c.totalSubmissions}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">sent</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Scraped Jobs */}
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl" data-testid="scraped-jobs-summary">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Latest Scraped Jobs</h2>
              </div>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {mockJobs.slice(0, 4).map((job) => (
                  <div key={job.id} className="px-6 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{job.role_title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">{job.author_company}</span>
                      <span className="text-xs text-zinc-400">|</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        job.engagement_type === 'C2C' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      }`}>{job.engagement_type}</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">{job.rate_raw}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BusinessDashboard;
