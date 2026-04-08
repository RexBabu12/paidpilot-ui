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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        {/* Top Matches Section */}
        <div className="mb-8">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* Recent Activity */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { action: 'Resume tailored', detail: 'for Senior Java Developer', time: '2 hours ago' },
              { action: 'Application sent', detail: 'to TechCorp Solutions', time: '5 hours ago' },
              { action: 'New match found', detail: 'DevOps Engineer at CloudScale', time: '1 day ago' }
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-800 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {activity.action}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {activity.detail}
                  </p>
                </div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CandidateDashboard;