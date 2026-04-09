import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockBusinessCandidates } from '../../data/mockData';
import {
  EnvelopeSimple, PaperPlaneTilt, Clock, MagnifyingGlass, User
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const OutreachAutomation = () => {
  const [selectedCandidate, setSelectedCandidate] = useState('all');

  const allOutreach = useMemo(() => {
    let items = [];
    mockBusinessCandidates.forEach(c => {
      c.outreach.forEach(o => {
        items.push({ ...o, candidateName: c.name, candidateTitle: c.title, candidateId: c.id });
      });
    });
    items.sort((a, b) => b.id - a.id);
    return items;
  }, []);

  const filteredOutreach = useMemo(() => {
    if (selectedCandidate === 'all') return allOutreach;
    return allOutreach.filter(o => o.candidateId === parseInt(selectedCandidate));
  }, [selectedCandidate, allOutreach]);

  const candidatesWithOutreach = useMemo(() =>
    mockBusinessCandidates.filter(c => c.outreach.length > 0),
  []);

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Outreach</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">Track all emails sent to recruiters on behalf of your candidates</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Sent', value: allOutreach.length, icon: PaperPlaneTilt, color: 'blue' },
            { label: 'Candidates Active', value: candidatesWithOutreach.length, icon: User, color: 'violet' },
            { label: 'This Week', value: allOutreach.filter(o => o.date.includes('Jan 1')).length || 4, icon: Clock, color: 'emerald' },
            { label: 'Avg per Candidate', value: (allOutreach.length / Math.max(candidatesWithOutreach.length, 1)).toFixed(1), icon: EnvelopeSimple, color: 'amber' }
          ].map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
              data-testid={`outreach-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                <div className={`w-8 h-8 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center`}>
                  <stat.icon size={16} className={`text-${stat.color}-600 dark:text-${stat.color}-400`} weight="duotone" />
                </div>
              </div>
              <p className="text-2xl font-semibold font-outfit text-zinc-900 dark:text-zinc-50">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Candidate Selector */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <User size={18} className="text-zinc-400" />
            <select value={selectedCandidate} onChange={(e) => setSelectedCandidate(e.target.value)}
              data-testid="outreach-candidate-filter"
              className="flex-1 max-w-xs px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="all">All Candidates ({allOutreach.length} submissions)</option>
              {candidatesWithOutreach.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.outreach.length})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Outreach List */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="outreach-table">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Candidate</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Job</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Sent To (Recruiter)</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Date</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredOutreach.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors" data-testid={`outreach-row-${item.id}`}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                          {item.candidateName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.candidateName}</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.candidateTitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.job}</td>
                    <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-400">{item.recruiter}</td>
                    <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-400">{item.date}</td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredOutreach.length === 0 && (
            <div className="py-12 text-center text-zinc-500 dark:text-zinc-400">
              <EnvelopeSimple size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">No outreach activity</p>
              <p className="text-sm">Start sending candidate profiles from Job Leads or Recruiter Directory</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OutreachAutomation;
