import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { StatCard } from '../../components/StatCard';
import { Briefcase, Target, EnvelopeSimple, UsersThree, ChartBar, TrendUp } from '@phosphor-icons/react';
import { mockAnalytics } from '../../data/mockData';
import { motion } from 'framer-motion';

const BusinessDashboard = () => {
  const stats = [
    { title: 'Jobs Scraped Today', value: mockAnalytics.jobsScraped.today.toString(), change: mockAnalytics.jobsScraped.trend, icon: Briefcase, trend: 'up' },
    { title: 'Qualified Leads', value: mockAnalytics.qualifiedLeads.today.toString(), change: mockAnalytics.qualifiedLeads.trend, icon: Target, trend: 'up' },
    { title: 'Candidate Matches', value: mockAnalytics.candidateMatches.today.toString(), change: mockAnalytics.candidateMatches.trend, icon: UsersThree, trend: 'up' },
    { title: 'Emails Sent', value: mockAnalytics.emailsSent.today.toString(), change: mockAnalytics.emailsSent.trend, icon: EnvelopeSimple, trend: 'up' }
  ];

  return (
    <DashboardLayout userType="business">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Business Command Center
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Your staffing operations at a glance
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Lead Intake */}
          <div className="lg:col-span-2 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">
                Lead Intake Overview
              </h2>
              <ChartBar size={24} className="text-blue-600 dark:text-blue-400" weight="duotone" />
            </div>
            <div className="space-y-4">
              {[
                { source: 'LinkedIn', count: 87, percentage: 68 },
                { source: 'Dice', count: 32, percentage: 25 },
                { source: 'Indeed', count: 8, percentage: 7 }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.source}</span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{item.count} leads</span>
                  </div>
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Rate */}
          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">
                Response Rate
              </h2>
              <TrendUp size={24} className="text-emerald-500" weight="duotone" />
            </div>
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-zinc-200 dark:text-zinc-800"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - mockAnalytics.responseRate.percentage / 100)}`}
                    className="text-emerald-500 transition-all duration-500"
                  />
                </svg>
                <span className="absolute text-3xl font-bold font-outfit text-zinc-900 dark:text-zinc-50">
                  {mockAnalytics.responseRate.percentage}%
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <span className="text-emerald-500 font-semibold">{mockAnalytics.responseRate.trend}</span> from last week
              </p>
            </div>
          </div>
        </div>

        {/* Top Skills & Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Skills */}
          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Top Skills in Market
            </h2>
            <div className="space-y-3">
              {mockAnalytics.topSkills.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.skill}</span>
                  </div>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">{item.count} jobs</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Locations */}
          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Top Locations
            </h2>
            <div className="space-y-3">
              {mockAnalytics.topLocations.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.location}</span>
                  </div>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">{item.count} jobs</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BusinessDashboard;