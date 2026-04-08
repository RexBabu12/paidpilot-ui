import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { StatCard } from '../../components/StatCard';
import { JobCard } from '../../components/JobCard';
import { Briefcase, Target, EnvelopeSimple, ChartLine } from '@phosphor-icons/react';
import { mockJobs } from '../../data/mockData';
import { motion } from 'framer-motion';

const CandidateDashboard = () => {
  const stats = [
    { title: 'New Jobs Today', value: '127', change: '+12%', icon: Briefcase, trend: 'up' },
    { title: 'Matching Jobs', value: '34', change: '+8%', icon: Target, trend: 'up' },
    { title: 'Saved Jobs', value: '12', change: '+3', icon: Target, trend: 'up' },
    { title: 'Applications Sent', value: '18', change: '+22%', icon: EnvelopeSimple, trend: 'up' },
    { title: 'Responses', value: '5', change: '+2', icon: ChartLine, trend: 'up' }
  ];

  const topMatches = mockJobs.slice(0, 3);

  const handleViewDetails = (job) => {
    console.log('View details:', job);
    // Navigate to job details
  };

  const handleApply = (job) => {
    console.log('Apply to:', job);
    // Open application modal
  };

  return (
    <DashboardLayout userType="candidate">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Welcome Back! 👋
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Here's what's happening with your job search today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        {/* Main Content Grid - Top Matches on Left, Recent Activity on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Matches Section - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">
                Top Matches for You
              </h2>
              <a
                href="/candidate/matches"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                data-testid="view-all-matches-link"
              >
                View All →
              </a>
            </div>
            <div className="space-y-4">
              {topMatches.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onViewDetails={handleViewDetails}
                  onApply={handleApply}
                />
              ))}
            </div>
          </div>

          {/* Recent Activity Section - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[
                  { action: 'Resume tailored', detail: 'for Senior Java Developer', time: '2 hours ago', icon: '📄' },
                  { action: 'Application sent', detail: 'to TechCorp Solutions', time: '5 hours ago', icon: '📧' },
                  { action: 'New match found', detail: 'DevOps Engineer at CloudScale', time: '1 day ago', icon: '🎯' },
                  { action: 'Profile viewed', detail: 'by 3 recruiters', time: '1 day ago', icon: '👀' },
                  { action: 'Saved job', detail: 'React Frontend Engineer', time: '2 days ago', icon: '⭐' }
                ].map((activity, idx) => (
                  <div
                    key={idx}
                    className="pb-4 border-b border-zinc-200 dark:border-zinc-800 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{activity.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                          {activity.action}
                        </p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                          {activity.detail}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                          {activity.time}
                        </p>
                      </div>
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

export default CandidateDashboard;