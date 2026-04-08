import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockCandidateAnalytics, mockAnalytics, mockBusinessCandidates } from '../../data/mockData';
import {
  ChartBar, TrendUp, Users, CurrencyDollar, Target,
  ArrowUp, ArrowDown, Briefcase, CaretDown
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const Analytics = () => {
  const [selectedCandidate, setSelectedCandidate] = useState('all');
  const [timeRange, setTimeRange] = useState('month');

  const totals = useMemo(() => ({
    totalRevenue: mockCandidateAnalytics.reduce((s, c) => s + c.revenue, 0),
    totalSubmissions: mockCandidateAnalytics.reduce((s, c) => s + c.submissions, 0),
    totalInterviews: mockCandidateAnalytics.reduce((s, c) => s + c.interviews, 0),
    totalPlacements: mockCandidateAnalytics.reduce((s, c) => s + c.placements, 0),
    avgConversion: (mockCandidateAnalytics.reduce((s, c) => s + c.conversionRate, 0) / mockCandidateAnalytics.length).toFixed(1)
  }), []);

  const maxRevenue = useMemo(() => Math.max(...mockCandidateAnalytics.map(c => c.revenue)), []);
  const maxSubmissions = useMemo(() => Math.max(...mockCandidateAnalytics.map(c => c.submissions)), []);

  const selectedData = useMemo(() => {
    if (selectedCandidate === 'all') return null;
    return mockCandidateAnalytics.find(c => c.candidateId === parseInt(selectedCandidate));
  }, [selectedCandidate]);

  const pipelineBreakdown = useMemo(() => {
    const statuses = ['Available', 'Submitted', 'Interviewing', 'Placed'];
    return statuses.map(status => ({
      status,
      count: mockBusinessCandidates.filter(c => c.pipelineStatus === status).length,
      percentage: Math.round((mockBusinessCandidates.filter(c => c.pipelineStatus === status).length / mockBusinessCandidates.length) * 100)
    }));
  }, []);

  const statusColors = {
    'Available': 'bg-emerald-500',
    'Submitted': 'bg-blue-500',
    'Interviewing': 'bg-amber-500',
    'Placed': 'bg-violet-500'
  };

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Analytics Hub
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Performance insights across your entire talent bench
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedCandidate}
                onChange={(e) => setSelectedCandidate(e.target.value)}
                data-testid="analytics-candidate-filter"
                className="px-3 py-2 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All Candidates</option>
                {mockCandidateAnalytics.map(c => (
                  <option key={c.candidateId} value={c.candidateId}>{c.name}</option>
                ))}
              </select>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                data-testid="analytics-time-range"
                className="px-3 py-2 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Revenue', value: `$${(totals.totalRevenue / 1000).toFixed(0)}K`, change: '+18%', trend: 'up', icon: CurrencyDollar, color: 'emerald' },
            { label: 'Submissions', value: totals.totalSubmissions, change: '+12%', trend: 'up', icon: Briefcase, color: 'blue' },
            { label: 'Interviews', value: totals.totalInterviews, change: '+8%', trend: 'up', icon: Users, color: 'amber' },
            { label: 'Placements', value: totals.totalPlacements, change: '+22%', trend: 'up', icon: Target, color: 'violet' },
            { label: 'Avg Conversion', value: `${totals.avgConversion}%`, change: '+3%', trend: 'up', icon: TrendUp, color: 'rose' }
          ].map((kpi, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              data-testid={`kpi-card-${kpi.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400">{kpi.label}</p>
                <div className={`w-9 h-9 rounded-lg bg-${kpi.color}-500/10 flex items-center justify-center`}>
                  <kpi.icon size={18} className={`text-${kpi.color}-600 dark:text-${kpi.color}-400`} weight="duotone" />
                </div>
              </div>
              <p className="text-2xl font-bold font-outfit text-zinc-900 dark:text-zinc-50">{kpi.value}</p>
              <div className="flex items-center gap-1 mt-2">
                {kpi.trend === 'up' ? <ArrowUp size={12} className="text-emerald-500" weight="bold" /> : <ArrowDown size={12} className="text-rose-500" weight="bold" />}
                <span className={`text-xs font-medium ${kpi.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>{kpi.change}</span>
                <span className="text-xs text-zinc-400 ml-1">vs last period</span>
              </div>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="candidates" className="w-full">
          <TabsList className="mb-6 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 p-1 rounded-lg">
            <TabsTrigger value="candidates" data-testid="tab-candidate-analytics">Per-Candidate</TabsTrigger>
            <TabsTrigger value="pipeline" data-testid="tab-pipeline-analytics">Pipeline</TabsTrigger>
            <TabsTrigger value="market" data-testid="tab-market-analytics">Market Insights</TabsTrigger>
          </TabsList>

          {/* Per-Candidate Analytics */}
          <TabsContent value="candidates">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Revenue by Candidate */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Revenue by Candidate</h3>
                <div className="space-y-4">
                  {mockCandidateAnalytics
                    .filter(c => c.revenue > 0)
                    .sort((a, b) => b.revenue - a.revenue)
                    .map((c, idx) => (
                    <div key={c.candidateId} data-testid={`revenue-bar-${c.candidateId}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            {c.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{c.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">${(c.revenue / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(c.revenue / maxRevenue) * 100}%` }}
                          transition={{ duration: 0.6, delay: idx * 0.1 }}
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submissions by Candidate */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Submissions by Candidate</h3>
                <div className="space-y-4">
                  {mockCandidateAnalytics.sort((a, b) => b.submissions - a.submissions).map((c, idx) => (
                    <div key={c.candidateId} data-testid={`submissions-bar-${c.candidateId}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs font-bold">
                            {c.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{c.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-zinc-600 dark:text-zinc-400">{c.submissions} sent</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">{c.conversionRate}%</span>
                        </div>
                      </div>
                      <div className="h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(c.submissions / maxSubmissions) * 100}%` }}
                          transition={{ duration: 0.6, delay: idx * 0.1 }}
                          className="h-full bg-gradient-to-r from-amber-600 to-amber-400 dark:from-amber-500 dark:to-amber-300 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Table */}
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Candidate Performance Breakdown</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="analytics-performance-table">
                  <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Candidate</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Submissions</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Interviews</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Placements</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Conversion</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Avg Days</th>
                      <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Revenue</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {mockCandidateAnalytics.map((c) => (
                      <tr key={c.candidateId} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors" data-testid={`analytics-row-${c.candidateId}`}>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                              {c.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{c.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center font-semibold text-zinc-900 dark:text-zinc-50">{c.submissions}</td>
                        <td className="px-4 py-4 text-center font-semibold text-zinc-900 dark:text-zinc-50">{c.interviews}</td>
                        <td className="px-4 py-4 text-center font-semibold text-zinc-900 dark:text-zinc-50">{c.placements}</td>
                        <td className="px-4 py-4 text-center">
                          <span className={`text-sm font-semibold ${c.conversionRate >= 20 ? 'text-emerald-600 dark:text-emerald-400' : c.conversionRate >= 10 ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-600 dark:text-zinc-400'}`}>
                            {c.conversionRate}%
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
                          {c.avgTimeToPlace > 0 ? `${c.avgTimeToPlace}d` : '--'}
                        </td>
                        <td className="px-4 py-4 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                          ${c.revenue > 0 ? (c.revenue / 1000).toFixed(0) + 'K' : '0'}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            c.trend === 'New' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                            c.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                            'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          }`}>{c.trend}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Pipeline Tab */}
          <TabsContent value="pipeline">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pipeline Funnel */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Pipeline Distribution</h3>
                <div className="space-y-5">
                  {pipelineBreakdown.map((item, idx) => (
                    <div key={item.status} data-testid={`pipeline-bar-${item.status.toLowerCase()}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${statusColors[item.status]}`} />
                          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.status}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{item.count}</span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">({item.percentage}%)</span>
                        </div>
                      </div>
                      <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 0.6, delay: idx * 0.15 }}
                          className={`h-full ${statusColors[item.status]} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avg Time to Place */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Time to Placement (Days)</h3>
                <div className="space-y-4">
                  {mockCandidateAnalytics.filter(c => c.avgTimeToPlace > 0).sort((a, b) => a.avgTimeToPlace - b.avgTimeToPlace).map((c, idx) => {
                    const maxDays = 40;
                    return (
                      <div key={c.candidateId}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{c.name}</span>
                          <span className={`text-sm font-semibold ${c.avgTimeToPlace <= 20 ? 'text-emerald-600 dark:text-emerald-400' : c.avgTimeToPlace <= 28 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}`}>
                            {c.avgTimeToPlace} days
                          </span>
                        </div>
                        <div className="h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((c.avgTimeToPlace / maxDays) * 100, 100)}%` }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className={`h-full rounded-full ${c.avgTimeToPlace <= 20 ? 'bg-emerald-500' : c.avgTimeToPlace <= 28 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Market Insights Tab */}
          <TabsContent value="market">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Skills */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Top Skills in Demand</h3>
                <div className="space-y-4">
                  {mockAnalytics.topSkills.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.skill}</span>
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">{item.count} jobs</span>
                      </div>
                      <div className="h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.count / mockAnalytics.topSkills[0].count) * 100}%` }}
                          transition={{ duration: 0.6, delay: idx * 0.1 }}
                          className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Locations */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Top Locations</h3>
                <div className="space-y-4">
                  {mockAnalytics.topLocations.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.location}</span>
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">{item.count} jobs</span>
                      </div>
                      <div className="h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.count / mockAnalytics.topLocations[0].count) * 100}%` }}
                          transition={{ duration: 0.6, delay: idx * 0.1 }}
                          className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
