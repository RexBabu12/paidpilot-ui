import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import {
  MagnifyingGlass, Funnel, ArrowSquareOut, Eye, Copy, CheckCircle,
  X, MapPin, CurrencyDollar, Clock, EnvelopeSimple
} from '@phosphor-icons/react';
import { mockJobs } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const statusColors = {
  'New': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'Reviewed': 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  'Contacted': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'Applied': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  'Closed': 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
};

const AdminLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [detailJob, setDetailJob] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [filters, setFilters] = useState({
    engagementTypes: [], workModes: [], statuses: []
  });

  const toggleFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }));
  };

  const filteredJobs = mockJobs.filter(job => {
    if (searchTerm && !job.role_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !job.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !job.author_name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filters.engagementTypes.length > 0 && !filters.engagementTypes.includes(job.engagement_type)) return false;
    if (filters.workModes.length > 0 && !filters.workModes.includes(job.work_mode)) return false;
    if (filters.statuses.length > 0 && !filters.statuses.includes(job.status)) return false;
    return true;
  });

  const copyEmail = (email, id) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1600px] mx-auto" data-testid="admin-leads-page">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
          <h1 className="text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Jobs / Leads</h1>
          <p className="text-zinc-600 dark:text-zinc-400">{mockJobs.length} scraped leads across all sources</p>
        </motion.div>

        <div className="flex gap-6">
          {/* Filters */}
          <div className="w-60 flex-shrink-0 hidden lg:block">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sticky top-24" data-testid="leads-filter-sidebar">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50"><Funnel size={18} weight="bold" /><h3 className="font-semibold text-sm">Filters</h3></div>
                <button onClick={() => setFilters({ engagementTypes: [], workModes: [], statuses: [] })} className="text-xs text-blue-600 dark:text-blue-400 hover:underline" data-testid="clear-leads-filters">Clear All</button>
              </div>
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Search</label>
                <div className="relative">
                  <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input type="text" placeholder="Role, skill, recruiter..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500" data-testid="leads-search-input" />
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Engagement</label>
                <div className="space-y-2">
                  {['C2C', 'W2', 'Both'].map(t => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={filters.engagementTypes.includes(t)} onChange={() => toggleFilter('engagementTypes', t)} className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600" data-testid={`filter-eng-${t.toLowerCase()}`} />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{t}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Work Mode</label>
                <div className="space-y-2">
                  {['Remote', 'Hybrid', 'Onsite'].map(m => (
                    <label key={m} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={filters.workModes.includes(m)} onChange={() => toggleFilter('workModes', m)} className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600" data-testid={`filter-wm-${m.toLowerCase()}`} />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{m}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Status</label>
                <div className="space-y-2">
                  {['New', 'Reviewed', 'Contacted', 'Applied', 'Closed'].map(s => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={filters.statuses.includes(s)} onChange={() => toggleFilter('statuses', s)} className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600" data-testid={`filter-status-${s.toLowerCase()}`} />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Table */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Showing <span className="font-semibold text-zinc-900 dark:text-zinc-50">{filteredJobs.length}</span> leads</p>
              <select className="px-3 py-1.5 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none" data-testid="leads-sort">
                <option>Sort: Newest</option><option>Sort: Best Match</option><option>Sort: Highest Rate</option>
              </select>
            </div>
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="admin-leads-table">
                  <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Role</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Type</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Location</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Rate</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Recruiter</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors" data-testid={`lead-row-${job.id}`}>
                        <td className="px-4 py-3.5">
                          <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">{job.role_title}</p>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{job.author_company} | {job.source}</p>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded ${job.engagement_type === 'C2C' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : job.engagement_type === 'W2' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>{job.engagement_type}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1 text-sm text-zinc-700 dark:text-zinc-300"><MapPin size={14} className="text-zinc-400" />{job.location}</div>
                        </td>
                        <td className="px-4 py-3.5 font-semibold text-sm text-zinc-900 dark:text-zinc-50">{job.rate_raw}</td>
                        <td className="px-4 py-3.5">
                          <p className="text-sm text-zinc-900 dark:text-zinc-50">{job.author_name}</p>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{job.author_email}</p>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${statusColors[job.status] || statusColors['New']}`}>{job.status}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => setDetailJob(job)} className="p-1.5 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded" data-testid={`view-lead-${job.id}`}><Eye size={16} /></button>
                            <button onClick={() => copyEmail(job.author_email, job.id)} className="p-1.5 text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded" data-testid={`copy-email-${job.id}`}>
                              {copiedId === job.id ? <CheckCircle size={16} className="text-emerald-500" /> : <Copy size={16} />}
                            </button>
                            <a href={job.post_url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded" data-testid={`open-lead-${job.id}`}><ArrowSquareOut size={16} /></a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredJobs.length === 0 && <div className="py-16 text-center text-zinc-500 dark:text-zinc-400">No leads match your filters.</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailJob && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDetailJob(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" data-testid="lead-detail-modal">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">{detailJob.role_title}</h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{detailJob.author_company}</p>
                  </div>
                  <button onClick={() => setDetailJob(null)} className="p-1 text-zinc-400 hover:text-zinc-600" data-testid="close-lead-modal"><X size={20} /></button>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div><p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-1">Engagement</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{detailJob.engagement_type}</p></div>
                  <div><p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-1">Work Mode</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{detailJob.work_mode}</p></div>
                  <div><p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-1">Location</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{detailJob.location}</p></div>
                  <div><p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-1">Rate</p><p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{detailJob.rate_raw}</p></div>
                  <div><p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-1">Visa</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{detailJob.visa_constraints}</p></div>
                  <div><p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-1">Experience</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{detailJob.experience}</p></div>
                </div>
                <div className="mb-4">
                  <p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1.5">{detailJob.skills.map((s, i) => <span key={i} className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{s}</span>)}</div>
                </div>
                <div className="mb-4">
                  <p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-2">Raw Post Text</p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">{detailJob.raw_text}</p>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 mb-4">
                  <p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-3">Recruiter Contact</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div><p className="text-[11px] text-zinc-500 dark:text-zinc-400">Name</p><p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{detailJob.author_name}</p></div>
                    <div><p className="text-[11px] text-zinc-500 dark:text-zinc-400">Company</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{detailJob.author_company}</p></div>
                    <div><p className="text-[11px] text-zinc-500 dark:text-zinc-400">Email</p><p className="text-sm text-blue-600 dark:text-blue-400">{detailJob.author_email}</p></div>
                    <div><p className="text-[11px] text-zinc-500 dark:text-zinc-400">Phone</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{detailJob.author_phone}</p></div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium" data-testid="mark-contacted">Mark Contacted</button>
                  <a href={detailJob.post_url} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm text-center">View Source</a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default AdminLeads;
