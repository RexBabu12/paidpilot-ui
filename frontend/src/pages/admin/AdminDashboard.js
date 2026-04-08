import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { StatCard } from '../../components/StatCard';
import { Users, Buildings, ChartBar, Database } from '@phosphor-icons/react';
import { mockScrapingRuns } from '../../data/mockData';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Customers', value: '47', change: '+5 this month', icon: Buildings, trend: 'up' },
    { title: 'Active Users', value: '312', change: '+18%', icon: Users, trend: 'up' },
    { title: 'Posts Scraped Today', value: '1,247', change: '+8%', icon: Database, trend: 'up' },
    { title: 'Success Rate', value: '92%', change: '+2%', icon: ChartBar, trend: 'up' }
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Platform Control Center
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Monitor and manage platform operations
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        {/* Scraping Operations */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">
              Recent Scraping Runs
            </h2>
            <button
              data-testid="view-all-runs-button"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="text-left py-3 px-4 font-bold uppercase tracking-wider text-xs text-zinc-500 dark:text-zinc-400">Source</th>
                  <th className="text-left py-3 px-4 font-bold uppercase tracking-wider text-xs text-zinc-500 dark:text-zinc-400">Run Time</th>
                  <th className="text-right py-3 px-4 font-bold uppercase tracking-wider text-xs text-zinc-500 dark:text-zinc-400">Scraped</th>
                  <th className="text-right py-3 px-4 font-bold uppercase tracking-wider text-xs text-zinc-500 dark:text-zinc-400">Qualified</th>
                  <th className="text-right py-3 px-4 font-bold uppercase tracking-wider text-xs text-zinc-500 dark:text-zinc-400">Duplicates</th>
                  <th className="text-right py-3 px-4 font-bold uppercase tracking-wider text-xs text-zinc-500 dark:text-zinc-400">Failed</th>
                  <th className="text-center py-3 px-4 font-bold uppercase tracking-wider text-xs text-zinc-500 dark:text-zinc-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockScrapingRuns.map((run) => (
                  <tr
                    key={run.id}
                    className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors duration-200"
                    data-testid={`scraping-run-${run.id}`}
                  >
                    <td className="py-4 px-4">
                      <span className="font-medium text-zinc-900 dark:text-zinc-50">{run.source}</span>
                    </td>
                    <td className="py-4 px-4 text-zinc-600 dark:text-zinc-400">
                      {run.startTime}
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-zinc-900 dark:text-zinc-50">
                      {run.scraped}
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-emerald-600 dark:text-emerald-400">
                      {run.qualified}
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-zinc-600 dark:text-zinc-400">
                      {run.duplicates}
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-rose-600 dark:text-rose-400">
                      {run.failed}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center">
                        <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {run.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Source Health
            </h2>
            <div className="space-y-4">
              {[
                { source: 'LinkedIn Scraper', status: 'Operational', uptime: '99.8%' },
                { source: 'Dice Scraper', status: 'Operational', uptime: '99.2%' },
                { source: 'Indeed Scraper', status: 'Degraded', uptime: '87.5%' },
                { source: 'Contact Extractor', status: 'Operational', uptime: '99.9%' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900"
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.source}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Uptime: {item.uptime}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.status === 'Operational'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Top Customers by Activity
            </h2>
            <div className="space-y-3">
              {[
                { name: 'TechStaff Solutions', leads: 1247, matches: 89 },
                { name: 'Quantum Recruiters', leads: 982, matches: 67 },
                { name: 'ProStaffing Inc', leads: 756, matches: 54 },
                { name: 'Elite Consulting', leads: 623, matches: 42 }
              ].map((customer, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900"
                >
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{customer.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {customer.leads} leads • {customer.matches} matches
                    </p>
                  </div>
                  <button
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    data-testid={`view-customer-${idx}`}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;