import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockBusinessMatches, mockBusinessCandidates } from '../../data/mockData';
import {
  Target, MagnifyingGlass, Funnel, EnvelopeSimple, Eye,
  ArrowRight, CheckCircle, Clock, User
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const matchStatusConfig = {
  'New': { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/20' },
  'Submitted': { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/20' },
  'Interview': { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/20' },
  'Rejected': { bg: 'bg-rose-500/10', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-500/20' }
};

const BusinessMatches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [candidateFilter, setCandidateFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredMatches = useMemo(() => {
    let list = [...mockBusinessMatches];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(m =>
        m.candidateName.toLowerCase().includes(q) ||
        m.jobTitle.toLowerCase().includes(q) ||
        m.company.toLowerCase().includes(q)
      );
    }
    if (candidateFilter !== 'All') {
      list = list.filter(m => m.candidateName === candidateFilter);
    }
    if (statusFilter !== 'All') {
      list = list.filter(m => m.status === statusFilter);
    }
    return list.sort((a, b) => b.matchScore - a.matchScore);
  }, [searchTerm, candidateFilter, statusFilter]);

  const uniqueCandidates = useMemo(() =>
    [...new Set(mockBusinessMatches.map(m => m.candidateName))],
  []);

  const matchSummary = useMemo(() => ({
    total: mockBusinessMatches.length,
    newMatches: mockBusinessMatches.filter(m => m.status === 'New').length,
    submitted: mockBusinessMatches.filter(m => m.status === 'Submitted').length,
    interviews: mockBusinessMatches.filter(m => m.status === 'Interview').length,
    avgScore: Math.round(mockBusinessMatches.reduce((s, m) => s + m.matchScore, 0) / mockBusinessMatches.length)
  }), []);

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Match Center
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            AI-matched opportunities for your bench candidates
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Matches', value: matchSummary.total, color: 'blue' },
            { label: 'New Matches', value: matchSummary.newMatches, color: 'emerald' },
            { label: 'Submitted', value: matchSummary.submitted, color: 'blue' },
            { label: 'In Interview', value: matchSummary.interviews, color: 'amber' },
            { label: 'Avg Score', value: `${matchSummary.avgScore}%`, color: 'violet' }
          ].map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
              data-testid={`match-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold font-outfit text-zinc-900 dark:text-zinc-50">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px] relative">
              <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="matches-search-input"
                placeholder="Search matches..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <select value={candidateFilter} onChange={(e) => setCandidateFilter(e.target.value)}
              data-testid="matches-candidate-filter"
              className="px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="All">All Candidates</option>
              {uniqueCandidates.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              data-testid="matches-status-filter"
              className="px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Submitted">Submitted</option>
              <option value="Interview">Interview</option>
            </select>
          </div>
        </div>

        {/* Matches Table */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="matches-table">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="text-center w-16 px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Score</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Candidate</th>
                  <th className="text-center px-2 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 w-8"></th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Job Opportunity</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Recruiter</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Rate</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredMatches.map((match) => {
                  const config = matchStatusConfig[match.status] || matchStatusConfig['New'];
                  return (
                    <tr key={match.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors" data-testid={`match-row-${match.id}`}>
                      <td className="px-4 py-4">
                        <div className="flex justify-center">
                          <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center ${
                            match.matchScore >= 90 ? 'border-emerald-500' : match.matchScore >= 80 ? 'border-blue-500' : 'border-amber-500'
                          }`}>
                            <span className={`text-sm font-bold ${
                              match.matchScore >= 90 ? 'text-emerald-600 dark:text-emerald-400' : match.matchScore >= 80 ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400'
                            }`}>{match.matchScore}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                            {match.candidateName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{match.candidateName}</span>
                        </div>
                      </td>
                      <td className="px-2 py-4 text-center">
                        <ArrowRight size={14} className="text-zinc-400 mx-auto" />
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{match.jobTitle}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{match.company}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-400">{match.recruiter}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400">{match.rate}</td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text} border ${config.border}`}>
                          {match.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-1">
                          {match.status === 'New' && (
                            <button data-testid={`submit-match-${match.id}`} className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                              <EnvelopeSimple size={12} weight="bold" />
                              Submit
                            </button>
                          )}
                          <button data-testid={`view-match-${match.id}`} className="p-1.5 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors">
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredMatches.length === 0 && (
            <div className="py-12 text-center text-zinc-500 dark:text-zinc-400">
              <Target size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">No matches found</p>
              <p className="text-sm">Adjust filters or wait for new matches</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BusinessMatches;
