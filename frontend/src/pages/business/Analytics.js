import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockBusinessCandidates, mockAnalytics } from '../../data/mockData';
import {
  ChartBar, TrendUp, Users, Briefcase, Target,
  ArrowUp, User
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const Analytics = () => {
  const [selectedCandidate, setSelectedCandidate] = useState('all');

  const totals = useMemo(() => ({
    totalSubmissions: mockBusinessCandidates.reduce((s, c) => s + c.totalSubmissions, 0),
    totalInterviews: mockBusinessCandidates.reduce((s, c) => s + c.totalInterviews, 0),
    totalPlacements: mockBusinessCandidates.reduce((s, c) => s + c.totalPlacements, 0),
    avgSubmissionsPerCandidate: (mockBusinessCandidates.reduce((s, c) => s + c.totalSubmissions, 0) / mockBusinessCandidates.length).toFixed(1),
    placementRate: ((mockBusinessCandidates.reduce((s, c) => s + c.totalPlacements, 0) / Math.max(mockBusinessCandidates.reduce((s, c) => s + c.totalSubmissions, 0), 1)) * 100).toFixed(1)
  }), []);

  const selectedData = useMemo(() => {
    if (selectedCandidate === 'all') return null;
    return mockBusinessCandidates.find(c => c.id === parseInt(selectedCandidate));
  }, [selectedCandidate]);

  const maxSubmissions = useMemo(() => Math.max(...mockBusinessCandidates.map(c => c.totalSubmissions)), []);

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Analytics</h1>
              <p className="text-zinc-600 dark:text-zinc-400">Detailed performance metrics per candidate and overall</p>
            </div>
            <select value={selectedCandidate} onChange={(e) => setSelectedCandidate(e.target.value)}
              data-testid="analytics-candidate-filter"
              className="px-3 py-2 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="all">All Candidates</option>
              {mockBusinessCandidates.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </motion.div>

        {/* Single Candidate View */}
        {selectedData ? (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                  {selectedData.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">{selectedData.name}</h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{selectedData.title} | Managed by {selectedData.benchRecruiter}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Submissions', value: selectedData.totalSubmissions },
                  { label: 'Interviews', value: selectedData.totalInterviews },
                  { label: 'Placements', value: selectedData.totalPlacements },
                  { label: 'Conversion', value: selectedData.totalSubmissions > 0 ? ((selectedData.totalPlacements / selectedData.totalSubmissions) * 100).toFixed(1) + '%' : '0%' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <p className="text-2xl font-bold font-outfit text-zinc-900 dark:text-zinc-50">{stat.value}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Submission History</h3>
              {selectedData.outreach.length > 0 ? (
                <div className="space-y-3">
                  {selectedData.outreach.map((item) => (
                    <div key={item.id} className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.job}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">To: {item.recruiter}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">{item.status}</span>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-4">No submission history</p>
              )}
            </div>
          </div>
        ) : (
          /* Aggregate View */
          <>
            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {[
                { label: 'Candidates', value: mockBusinessCandidates.length, icon: Users, color: 'blue' },
                { label: 'Total Submissions', value: totals.totalSubmissions, icon: Briefcase, color: 'emerald' },
                { label: 'Interviews', value: totals.totalInterviews, icon: Target, color: 'amber' },
                { label: 'Placements', value: totals.totalPlacements, icon: TrendUp, color: 'violet' },
                { label: 'Placement Rate', value: `${totals.placementRate}%`, icon: ChartBar, color: 'rose' }
              ].map((kpi, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  data-testid={`analytics-kpi-${kpi.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400">{kpi.label}</p>
                    <div className={`w-9 h-9 rounded-lg bg-${kpi.color}-500/10 flex items-center justify-center`}>
                      <kpi.icon size={18} className={`text-${kpi.color}-600 dark:text-${kpi.color}-400`} weight="duotone" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold font-outfit text-zinc-900 dark:text-zinc-50">{kpi.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Submissions per Candidate */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Submissions per Candidate</h3>
                <div className="space-y-4">
                  {[...mockBusinessCandidates].sort((a, b) => b.totalSubmissions - a.totalSubmissions).map((c, idx) => (
                    <div key={c.id} data-testid={`analytics-bar-${c.id}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            {c.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{c.name}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-zinc-500 dark:text-zinc-400">{c.totalSubmissions} sent</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">{c.totalPlacements}P</span>
                        </div>
                      </div>
                      <div className="h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(c.totalSubmissions / maxSubmissions) * 100}%` }}
                          transition={{ duration: 0.6, delay: idx * 0.08 }}
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Placement Funnel */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Conversion Funnel</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Submissions', value: totals.totalSubmissions, color: 'bg-blue-500', pct: 100 },
                    { label: 'Interviews', value: totals.totalInterviews, color: 'bg-amber-500', pct: Math.round((totals.totalInterviews / totals.totalSubmissions) * 100) },
                    { label: 'Placements', value: totals.totalPlacements, color: 'bg-emerald-500', pct: Math.round((totals.totalPlacements / totals.totalSubmissions) * 100) }
                  ].map((stage, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{stage.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{stage.value}</span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">({stage.pct}%)</span>
                        </div>
                      </div>
                      <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${stage.pct}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.2 }}
                          className={`h-full ${stage.color} rounded-full`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Top Skills in Demand</h3>
                <div className="space-y-4">
                  {mockAnalytics.topSkills.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.skill}</span>
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">{item.count} jobs</span>
                      </div>
                      <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(item.count / mockAnalytics.topSkills[0].count) * 100}%` }}
                          transition={{ duration: 0.6, delay: idx * 0.1 }}
                          className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Top Locations</h3>
                <div className="space-y-4">
                  {mockAnalytics.topLocations.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.location}</span>
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">{item.count} jobs</span>
                      </div>
                      <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(item.count / mockAnalytics.topLocations[0].count) * 100}%` }}
                          transition={{ duration: 0.6, delay: idx * 0.1 }}
                          className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
