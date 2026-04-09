import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockJobs, mockBusinessCandidates } from '../../data/mockData';
import {
  MagnifyingGlass, Funnel, SquaresFour, Rows, Download,
  BookmarkSimple, EnvelopeSimple, MapPin, Clock, Briefcase,
  CaretDown, X, CheckSquare, PaperPlaneTilt
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const BusinessLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [selectedCandidatesForSend, setSelectedCandidatesForSend] = useState([]);
  const [filters, setFilters] = useState({
    engagementTypes: [],
    workModes: [],
    datePosted: 'All',
    hasContact: false,
    ratePresent: false
  });

  const toggleEngagement = (type) => {
    setFilters(prev => ({
      ...prev,
      engagementTypes: prev.engagementTypes.includes(type) ? prev.engagementTypes.filter(t => t !== type) : [...prev.engagementTypes, type]
    }));
  };
  const toggleWorkMode = (mode) => {
    setFilters(prev => ({
      ...prev,
      workModes: prev.workModes.includes(mode) ? prev.workModes.filter(m => m !== mode) : [...prev.workModes, mode]
    }));
  };

  const filteredJobs = useMemo(() => {
    let list = [...mockJobs];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(j => j.role_title.toLowerCase().includes(q) || j.author_company.toLowerCase().includes(q) || j.skills.some(s => s.toLowerCase().includes(q)));
    }
    if (filters.engagementTypes.length > 0) list = list.filter(j => filters.engagementTypes.includes(j.engagement_type));
    if (filters.workModes.length > 0) list = list.filter(j => filters.workModes.includes(j.work_mode));
    return list;
  }, [searchTerm, filters]);

  const toggleJobSelect = (id) => {
    setSelectedJobs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleCandidateForSend = (id) => {
    setSelectedCandidatesForSend(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
          <h1 className="text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Job Leads Explorer</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Browse {mockJobs.length} scraped C2C and W2 opportunities. Select jobs and assign candidates.</p>
        </motion.div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
                  <Funnel size={18} weight="bold" />
                  <h3 className="font-semibold">Filters</h3>
                </div>
                <button onClick={() => setFilters({ engagementTypes: [], workModes: [], datePosted: 'All', hasContact: false, ratePresent: false })}
                  data-testid="clear-all-filters" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Clear All</button>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Keyword Search</label>
                <div className="relative">
                  <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input type="text" placeholder="Java, AWS, React..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    data-testid="keyword-search-input"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Engagement Type</label>
                <div className="space-y-2">
                  {['C2C', 'W2', 'Both'].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={filters.engagementTypes.includes(type)} onChange={() => toggleEngagement(type)}
                        data-testid={`filter-engagement-${type.toLowerCase()}`}
                        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-2 focus:ring-blue-600" />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Work Mode</label>
                <div className="space-y-2">
                  {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
                    <label key={mode} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={filters.workModes.includes(mode)} onChange={() => toggleWorkMode(mode)}
                        data-testid={`filter-workmode-${mode.toLowerCase()}`}
                        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-2 focus:ring-blue-600" />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Date Posted</label>
                <select value={filters.datePosted} onChange={(e) => setFilters(prev => ({ ...prev, datePosted: e.target.value }))}
                  data-testid="filter-date-posted"
                  className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option value="All">All time</option>
                  <option value="Today">Today</option>
                  <option value="Last 3 days">Last 3 days</option>
                  <option value="Last 7 days">Last 7 days</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Has Contact Info</span>
                  <div className="relative">
                    <input type="checkbox" checked={filters.hasContact} onChange={(e) => setFilters(prev => ({ ...prev, hasContact: e.target.checked }))} className="sr-only peer" data-testid="filter-has-contact" />
                    <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                  </div>
                </label>
              </div>
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Rate Present</span>
                  <div className="relative">
                    <input type="checkbox" checked={filters.ratePresent} onChange={(e) => setFilters(prev => ({ ...prev, ratePresent: e.target.checked }))} className="sr-only peer" data-testid="filter-rate-present" />
                    <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Showing <span className="font-semibold text-zinc-900 dark:text-zinc-50">{filteredJobs.length}</span> results
                </p>
                <select className="px-3 py-1.5 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none" data-testid="sort-by-select">
                  <option>Sort by: Newest</option>
                  <option>Sort by: Highest Rate</option>
                  <option>Sort by: Best Match</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                {selectedJobs.length > 0 && (
                  <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    data-testid="send-candidates-button"
                    onClick={() => setSendModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                    <PaperPlaneTilt size={16} weight="bold" />
                    Send Candidates ({selectedJobs.length} jobs)
                  </motion.button>
                )}
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors" data-testid="export-button">
                  <Download size={16} />Export
                </button>
                <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                  <button onClick={() => setViewMode('table')} className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-white dark:bg-zinc-700 shadow-sm' : ''}`} data-testid="view-mode-table">
                    <Rows size={18} className={viewMode === 'table' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-600 dark:text-zinc-400'} />
                  </button>
                  <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-700 shadow-sm' : ''}`} data-testid="view-mode-grid">
                    <SquaresFour size={18} className={viewMode === 'grid' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-600 dark:text-zinc-400'} />
                  </button>
                </div>
              </div>
            </div>

            {/* Table View */}
            {viewMode === 'table' && (
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full" data-testid="leads-table">
                    <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                      <tr>
                        <th className="w-12 px-4 py-3"><input type="checkbox" checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0} onChange={() => setSelectedJobs(selectedJobs.length === filteredJobs.length ? [] : filteredJobs.map(j => j.id))} data-testid="select-all-jobs" className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600" /></th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Role</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Skills</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Details</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Rate</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Posted</th>
                        <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {filteredJobs.map((job) => (
                        <tr key={job.id} className={`hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors ${selectedJobs.includes(job.id) ? 'bg-blue-50/50 dark:bg-blue-500/5' : ''}`} data-testid={`job-row-${job.id}`}>
                          <td className="px-4 py-4">
                            <input type="checkbox" checked={selectedJobs.includes(job.id)} onChange={() => toggleJobSelect(job.id)} data-testid={`select-job-${job.id}`} className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600" />
                          </td>
                          <td className="px-4 py-4">
                            <p className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">{job.role_title}</p>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400">{job.author_company} | {job.location}</p>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-1">
                              {job.skills.slice(0, 3).map((skill, idx) => (
                                <span key={idx} className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{skill}</span>
                              ))}
                              {job.skills.length > 3 && <span className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">+{job.skills.length - 3}</span>}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-col gap-1">
                              <span className={`inline-flex w-fit px-2 py-0.5 text-xs font-medium rounded ${job.engagement_type === 'C2C' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : job.engagement_type === 'W2' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'}`}>{job.engagement_type}</span>
                              <span className={`inline-flex w-fit px-2 py-0.5 text-xs font-medium rounded ${job.work_mode === 'Remote' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : job.work_mode === 'Hybrid' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>{job.work_mode}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 font-semibold text-zinc-900 dark:text-zinc-50">{job.rate_raw || 'N/A'}</td>
                          <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-400">{new Date(job.scraped_at).toLocaleDateString()}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors" data-testid={`bookmark-job-${job.id}`} title="Bookmark">
                                <BookmarkSimple size={18} />
                              </button>
                              <button className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors" data-testid={`email-job-${job.id}`} title="Send Candidate">
                                <EnvelopeSimple size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" data-testid="leads-grid">
                {filteredJobs.map((job, idx) => (
                  <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`bg-white dark:bg-[#18181b] border rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer ${selectedJobs.includes(job.id) ? 'border-blue-500 ring-1 ring-blue-500/30' : 'border-zinc-200 dark:border-zinc-800'}`}
                    onClick={() => toggleJobSelect(job.id)}
                    data-testid={`job-card-${job.id}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1">{job.role_title}</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{job.author_company}</p>
                      </div>
                      <input type="checkbox" checked={selectedJobs.includes(job.id)} onChange={() => toggleJobSelect(job.id)} className="w-4 h-4 mt-1 rounded border-zinc-300 dark:border-zinc-700 text-blue-600" onClick={(e) => e.stopPropagation()} />
                    </div>
                    <div className="flex items-center gap-2 mb-3 text-xs text-zinc-500 dark:text-zinc-400">
                      <MapPin size={12} /> {job.location}
                      <span>|</span>
                      <Clock size={12} /> {new Date(job.scraped_at).toLocaleDateString()}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {job.skills.slice(0, 4).map((skill, sidx) => (
                        <span key={sidx} className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{skill}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                      <div className="flex gap-2">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded ${job.engagement_type === 'C2C' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'}`}>{job.engagement_type}</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded ${job.work_mode === 'Remote' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>{job.work_mode}</span>
                      </div>
                      <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{job.rate_raw || 'N/A'}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Send Candidates Modal */}
        <AnimatePresence>
          {sendModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSendModalOpen(false)}>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()} data-testid="send-candidates-modal">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Select Candidates to Send</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{selectedJobs.length} job(s) selected. Pick which candidates to submit.</p>
                  </div>
                  <button onClick={() => setSendModalOpen(false)} data-testid="close-send-modal" className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded transition-colors"><X size={20} /></button>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto mb-4">
                  {mockBusinessCandidates.map(c => (
                    <label key={c.id} className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${selectedCandidatesForSend.includes(c.id) ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-500/5' : 'border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700'}`} data-testid={`send-candidate-option-${c.id}`}>
                      <input type="checkbox" checked={selectedCandidatesForSend.includes(c.id)} onChange={() => toggleCandidateForSend(c.id)} className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600" />
                      <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{c.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{c.title} | {c.rate} | {c.visaStatus}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">{selectedCandidatesForSend.length} candidate(s) selected</span>
                  <div className="flex gap-2">
                    <button onClick={() => setSendModalOpen(false)} className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors" data-testid="cancel-send">Cancel</button>
                    <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-40" disabled={selectedCandidatesForSend.length === 0} data-testid="confirm-send-candidates">
                      <PaperPlaneTilt size={16} weight="bold" />
                      Send Resumes
                    </button>
                  </div>
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
