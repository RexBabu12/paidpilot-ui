import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { StatCard } from '../../components/StatCard';
import { ChartBar, TrendUp, Users, Briefcase } from '@phosphor-icons/react';
import { mockAnalytics } from '../../data/mockData';
import { motion } from 'framer-motion';

const Analytics = () => {
  return (
    <DashboardLayout userType="business">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Analytics & Reports
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Insights into your staffing operations
          </p>
        </motion.div>

        {/* Monthly Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Monthly Jobs"
            value={mockAnalytics.jobsScraped.month.toLocaleString()}
            change={mockAnalytics.jobsScraped.trend}
            icon={Briefcase}
            trend="up"
          />
          <StatCard
            title="Qualified Leads"
            value={mockAnalytics.qualifiedLeads.month.toLocaleString()}
            change={mockAnalytics.qualifiedLeads.trend}
            icon={ChartBar}
            trend="up"
          />
          <StatCard
            title="Total Matches"
            value={mockAnalytics.candidateMatches.month.toLocaleString()}
            change={mockAnalytics.candidateMatches.trend}
            icon={Users}
            trend="up"
          />
          <StatCard
            title="Emails Sent"
            value={mockAnalytics.emailsSent.month.toLocaleString()}
            change={mockAnalytics.emailsSent.trend}
            icon={TrendUp}
            trend="up"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Skills Chart */}
          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
              Top Skills in Demand
            </h2>
            <div className="space-y-4">
              {mockAnalytics.topSkills.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.skill}</span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{item.count} jobs</span>
                  </div>
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${(item.count / mockAnalytics.topSkills[0].count) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Locations Chart */}
          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
              Top Locations
            </h2>
            <div className="space-y-4">
              {mockAnalytics.topLocations.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.location}</span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{item.count} jobs</span>
                  </div>
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${(item.count / mockAnalytics.topLocations[0].count) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
            Weekly Performance Trends
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Jobs This Week', value: mockAnalytics.jobsScraped.week, prev: 725 },
              { label: 'Leads This Week', value: mockAnalytics.qualifiedLeads.week, prev: 568 },
              { label: 'Matches This Week', value: mockAnalytics.candidateMatches.week, prev: 213 }
            ].map((metric, idx) => (
              <div key={idx} className="text-center">
                <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-2">
                  {metric.label}
                </p>
                <p className="text-4xl font-bold font-outfit text-zinc-900 dark:text-zinc-50 mb-2">
                  {metric.value}
                </p>
                <p className="text-sm text-emerald-500">
                  +{metric.value - metric.prev} from last week
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;