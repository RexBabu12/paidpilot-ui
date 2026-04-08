import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockJobs, mockBusinessCandidates } from '../../data/mockData';
import {
  MagnifyingGlass, Funnel, BookmarkSimple, UserPlus,
  Briefcase, MapPin, Clock, CurrencyDollar,
  SquaresFour, Rows, Download, CaretDown
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const BusinessLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [assignModalJob, setAssignModalJob] = useState(null);
  const [filters, setFilters] = useState({
    engagementTypes: [],
    workModes: [],
    datePosted: 'All'
  });

  const filteredJobs = useMemo(() => {
    let list = [...mockJobs];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.skills.some(s => s.toLowerCase().includes(q))
      );
    }
    if (filters.engagementTypes.length > 0) {
      list = list.filter(j => filters.engagementTypes.includes(j.engagementType));
    }
    if (filters.workModes.length > 0) {
      list = list.filter(j => filters.workModes.includes(j.workMode));
    }
    return list;
  }, [searchTerm, filters]);

  const toggleFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }));
  };

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Job Leads Explorer
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Browse leads and assign candidates from your bench to matching opportunities
          </p>
        </motion.div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
                  <Funnel size={18} weight="bold" />
                  <h3 className="font-semibold text-sm">Filters</h3>
                </div>
                <button onClick={() => setFilters({ engagementTypes: [], workModes: [], datePosted: 'All' })} data-testid="clear-lead-filters" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Clear</button>
              </div>

              {/* Search */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Search</label>
                <div className="relative">
                  <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    data-testid="leads-search-input"
                    placeholder="Java, AWS, React..."
                    className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Engagement Type */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Engagement</label>
                <div className="space-y-2">
                  {['C2C', 'W2', 'Both'].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={filters.engagementTypes.includes(type)} onChange={() => toggleFilter('engagementTypes', type)}
                        data-testid={`lead-filter-engagement-${type.toLowerCase()}`}
                        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-600" />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Work Mode */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Work Mode</label>
                <div className="space-y-2">
                  {['Remote', 'Hybrid', 'Onsite'].map(mode => (
                    <label key={mode} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={filters.workModes.includes(mode)} onChange={() => toggleFilter('workModes', mode)}
                        data-testid={`lead-filter-mode-${mode.toLowerCase()}`}
                        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-600" />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Posted</label>
                <select value={filters.datePosted} onChange={(e) => setFilters(prev => ({ ...prev, datePosted: e.target.value }))}
                  data-testid="lead-filter-date"
                  className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option value="All">All time</option>
                  <option value="Today">Today</option>
                  <option value="3d">Last 3 days</option>
                  <option value="7d">Last 7 days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">{filteredJobs.length}</span> leads found
              </p>
              <div className="flex items-center gap-2">
                <select data-testid="leads-sort" className="px-3 py-1.5 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none">
                  <option>Best Match</option>
                  <option>Newest</option>
                  <option>Highest Rate</option>
                </select>
                <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                  <button onClick={() => setViewMode('table')} data-testid="leads-view-table" className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-white dark:bg-zinc-700 shadow-sm' : ''}`}>
                    <Rows size={16} className={viewMode === 'table' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500'} />
                  </button>
                  <button onClick={() => setViewMode('grid')} data-testid="leads-view-grid" className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-700 shadow-sm' : ''}`}>
                    <SquaresFour size={16} className={viewMode === 'grid' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500'} />
                  </button>
                </div>
              </div>
            </div>

            {/* Table View */}
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="leads-table">
                  <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Role</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Skills</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Details</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Rate</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Recruiter</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Posted</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors" data-testid={`lead-row-${job.id}`}>
                        <td className="px-4 py-4">
                          <p className="font-semibold text-zinc-900 dark:text-zinc-50">{job.title}</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">{job.company} | {job.location}</p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-1">
                            {job.skills.slice(0, 3).map((skill, idx) => (
                              <span key={idx} className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{skill}</span>
                            ))}
                            {job.skills.length > 3 && <span className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">+{job.skills.length - 3}</span>}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-flex w-fit px-2 py-0.5 text-xs font-medium rounded ${
                              job.engagementType === 'C2C' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                              job.engagementType === 'W2' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                              'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            }`}>{job.engagementType}</span>
                            <span className={`inline-flex w-fit px-2 py-0.5 text-xs font-medium rounded ${
                              job.workMode === 'Remote' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                              job.workMode === 'Hybrid' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                              'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            }`}>{job.workMode}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 font-semibold text-zinc-900 dark:text-zinc-50">{job.rate}</td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-zinc-900 dark:text-zinc-50">{job.recruiter}</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">{job.recruiterEmail}</p>
                        </td>
                        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-400">{job.postedDate}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-1">
                            <button data-testid={`assign-candidate-${job.id}`} onClick={() => setAssignModalJob(assignModalJob === job.id ? null : job.id)}
                              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                              <UserPlus size={14} weight="bold" />
                              Assign
                            </button>
                            <button data-testid={`bookmark-lead-${job.id}`} className="p-1.5 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors">
                              <BookmarkSimple size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Assign Candidate Modal (inline) */}
        <AnimatePresence>
          {assignModalJob && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              onClick={() => setAssignModalJob(null)}
            >
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl"
                onClick={(e) => e.stopPropagation()} data-testid="assign-modal"
              >
                <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                  Assign Candidate
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                  Select a candidate from your bench to submit for this role
                </p>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {mockBusinessCandidates.filter(c => c.pipelineStatus !== 'Placed').map(candidate => (
                    <button key={candidate.id}
                      data-testid={`assign-option-${candidate.id}`}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition-all text-left"
                    >
                      <div className="w-9 h-9 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{candidate.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{candidate.title} | {candidate.rate}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        candidate.pipelineStatus === 'Available' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                      }`}>{candidate.pipelineStatus}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <button onClick={() => setAssignModalJob(null)} data-testid="assign-modal-cancel" className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default BusinessLeads;
