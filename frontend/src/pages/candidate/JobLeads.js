import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import {
  MagnifyingGlass, Funnel, ArrowSquareOut, EnvelopeSimple,
  CaretDown, CaretUp, Clock, MapPin, CurrencyDollar, Eye, X
} from '@phosphor-icons/react';
import { mockJobs } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const engagementColors = {
  'C2C': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
  'W2': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
  'Both': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
  'Full-time': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
};

const workModeColors = {
  'Remote': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'Hybrid': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'Onsite': 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
};

const postTypeColors = {
  'Job Posting': 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400',
  'Hot Requirement': 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
  'Urgent Hire': 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20'
};

const formatScrapedDate = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHrs < 1) return 'Just now';
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
};

const JobLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRow, setExpandedRow] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [detailJob, setDetailJob] = useState(null);
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
      engagementTypes: prev.engagementTypes.includes(type)
        ? prev.engagementTypes.filter(t => t !== type)
        : [...prev.engagementTypes, type]
    }));
  };

  const toggleWorkMode = (mode) => {
    setFilters(prev => ({
      ...prev,
      workModes: prev.workModes.includes(mode)
        ? prev.workModes.filter(m => m !== mode)
        : [...prev.workModes, mode]
    }));
  };

  const filteredJobs = mockJobs.filter(job => {
    if (searchTerm && !job.role_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !job.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))) return false;
    if (filters.engagementTypes.length > 0 && !filters.engagementTypes.includes(job.engagement_type)) return false;
    if (filters.workModes.length > 0 && !filters.workModes.includes(job.work_mode)) return false;
    return true;
  });

  return (
    <DashboardLayout userType="candidate">
      <div className="max-w-[1600px] mx-auto" data-testid="jobs-explorer-page">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Jobs Explorer
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Browse {mockJobs.length} scraped C2C and W2 opportunities from across the web.
          </p>
        </motion.div>

        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sticky top-24" data-testid="jobs-filter-sidebar">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
                  <Funnel size={18} weight="bold" />
                  <h3 className="font-semibold text-sm">Filters</h3>
                </div>
                <button
                  onClick={() => setFilters({ engagementTypes: [], workModes: [], datePosted: 'All', hasContact: false, ratePresent: false })}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="clear-all-filters"
                >
                  Clear All
                </button>
              </div>

              {/* Keyword Search */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Keyword
                </label>
                <div className="relative">
                  <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Java, AWS, React..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                    data-testid="keyword-search-input"
                  />
                </div>
              </div>

              {/* Engagement Type */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  Engagement Type
                </label>
                <div className="space-y-2">
                  {['C2C', 'W2', 'Both'].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.engagementTypes.includes(type)}
                        onChange={() => toggleEngagement(type)}
                        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                        data-testid={`filter-engagement-${type.toLowerCase()}`}
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Work Mode */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  Work Mode
                </label>
                <div className="space-y-2">
                  {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
                    <label key={mode} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.workModes.includes(mode)}
                        onChange={() => toggleWorkMode(mode)}
                        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                        data-testid={`filter-workmode-${mode.toLowerCase()}`}
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Posted */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Date Scraped
                </label>
                <select
                  value={filters.datePosted}
                  onChange={(e) => setFilters({ ...filters, datePosted: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                  data-testid="filter-date-posted"
                >
                  <option value="All">All time</option>
                  <option value="Today">Today</option>
                  <option value="Last 3 days">Last 3 days</option>
                  <option value="Last 7 days">Last 7 days</option>
                </select>
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Has Contact</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={filters.hasContact}
                      onChange={(e) => setFilters({ ...filters, hasContact: e.target.checked })}
                      className="sr-only peer"
                      data-testid="filter-has-contact"
                    />
                    <div className="w-10 h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500 transition-colors" />
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform" />
                  </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Rate Present</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={filters.ratePresent}
                      onChange={(e) => setFilters({ ...filters, ratePresent: e.target.checked })}
                      className="sr-only peer"
                      data-testid="filter-rate-present"
                    />
                    <div className="w-10 h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500 transition-colors" />
                    <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform" />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Showing <span className="font-semibold text-zinc-900 dark:text-zinc-50">{filteredJobs.length}</span> results
              </p>
              <select
                className="px-3 py-1.5 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                data-testid="sort-by-select"
              >
                <option>Sort by: Newest</option>
                <option>Sort by: Best Match</option>
                <option>Sort by: Highest Rate</option>
              </select>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="jobs-table">
                  <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Role</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Type</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Location</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Rate</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Visa</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Source</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Scraped</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {filteredJobs.map((job) => (
                      <React.Fragment key={job.id}>
                        <tr
                          className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer relative group"
                          data-testid={`job-row-${job.id}`}
                          onMouseEnter={() => setHoveredRow(job.id)}
                          onMouseLeave={() => setHoveredRow(null)}
                          onClick={() => setExpandedRow(expandedRow === job.id ? null : job.id)}
                        >
                          {/* Role */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-start gap-2">
                              <div>
                                <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-0.5">
                                  {job.role_title}
                                </p>
                                <div className="flex items-center gap-1.5">
                                  <span className={`inline-flex px-1.5 py-0.5 text-[10px] font-medium rounded ${postTypeColors[job.post_type] || postTypeColors['Job Posting']}`}>
                                    {job.post_type}
                                  </span>
                                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{job.author_company}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Type */}
                          <td className="px-4 py-3.5">
                            <div className="flex flex-col gap-1">
                              <span className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded ${engagementColors[job.engagement_type] || ''}`}>
                                {job.engagement_type}
                              </span>
                              <span className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded ${workModeColors[job.work_mode] || ''}`}>
                                {job.work_mode}
                              </span>
                            </div>
                          </td>

                          {/* Location */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1 text-sm text-zinc-700 dark:text-zinc-300">
                              <MapPin size={14} className="text-zinc-400 flex-shrink-0" />
                              {job.location}
                            </div>
                          </td>

                          {/* Rate */}
                          <td className="px-4 py-3.5">
                            <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 flex items-center gap-1">
                              <CurrencyDollar size={14} className="text-zinc-400" />
                              {job.rate_raw || 'N/A'}
                            </span>
                          </td>

                          {/* Visa */}
                          <td className="px-4 py-3.5">
                            <span className="text-xs text-zinc-600 dark:text-zinc-400">{job.visa_constraints}</span>
                          </td>

                          {/* Source */}
                          <td className="px-4 py-3.5">
                            <div>
                              <p className="text-xs font-medium text-zinc-900 dark:text-zinc-50">{job.source}</p>
                              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[120px]">{job.author_name}</p>
                            </div>
                          </td>

                          {/* Scraped */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                              <Clock size={12} />
                              {formatScrapedDate(job.scraped_at)}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center justify-center gap-1.5">
                              <AnimatePresence>
                                {hoveredRow === job.id && (
                                  <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.15 }}
                                    onClick={(e) => { e.stopPropagation(); }}
                                    className="px-3 py-1 text-xs font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                                    data-testid={`send-apply-${job.id}`}
                                  >
                                    Send to Apply
                                  </motion.button>
                                )}
                              </AnimatePresence>
                              <button
                                onClick={(e) => { e.stopPropagation(); setDetailJob(job); }}
                                className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors"
                                data-testid={`view-detail-${job.id}`}
                                title="View Details"
                              >
                                <Eye size={16} />
                              </button>
                              <a
                                href={job.post_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors"
                                data-testid={`open-source-${job.id}`}
                                title="Open Source Post"
                              >
                                <ArrowSquareOut size={16} />
                              </a>
                            </div>
                          </td>
                        </tr>

                        {/* Expanded Row - Raw Text & Skills */}
                        <AnimatePresence>
                          {expandedRow === job.id && (
                            <tr>
                              <td colSpan={8} className="px-0 py-0">
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-6 py-4 bg-zinc-50/50 dark:bg-zinc-900/30 border-b border-zinc-200 dark:border-zinc-800" data-testid={`job-expanded-${job.id}`}>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                      <div className="lg:col-span-2">
                                        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Raw Post Text</p>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed bg-white dark:bg-[#18181b] p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                                          {job.raw_text}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Skills Required</p>
                                        <div className="flex flex-wrap gap-1.5">
                                          {job.skills.map((skill, idx) => (
                                            <span key={idx} className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                                              {skill}
                                            </span>
                                          ))}
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                                          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">Experience</p>
                                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{job.experience}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              </td>
                            </tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredJobs.length === 0 && (
                <div className="py-16 text-center text-zinc-500 dark:text-zinc-400">
                  No jobs match your filters. Try adjusting your criteria.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailJob && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDetailJob(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
              data-testid="job-detail-modal"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">{detailJob.role_title}</h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{detailJob.author_company}</p>
                  </div>
                  <button onClick={() => setDetailJob(null)} className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200" data-testid="close-detail-modal">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${engagementColors[detailJob.engagement_type]}`}>{detailJob.engagement_type}</span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${workModeColors[detailJob.work_mode]}`}>{detailJob.work_mode}</span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded ${postTypeColors[detailJob.post_type]}`}>{detailJob.post_type}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div><p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-1">Location</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{detailJob.location}</p></div>
                  <div><p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-1">Rate</p><p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{detailJob.rate_raw}</p></div>
                  <div><p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-1">Visa</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{detailJob.visa_constraints}</p></div>
                  <div><p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-1">Experience</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{detailJob.experience}</p></div>
                </div>

                <div className="mb-5">
                  <p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {detailJob.skills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-2">Raw Post Text</p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">{detailJob.raw_text}</p>
                </div>

                <div className="mb-5 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-3">Source & Author</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div><p className="text-[11px] text-zinc-500 dark:text-zinc-400">Author</p><p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{detailJob.author_name}</p></div>
                    <div><p className="text-[11px] text-zinc-500 dark:text-zinc-400">Company</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{detailJob.author_company}</p></div>
                    <div><p className="text-[11px] text-zinc-500 dark:text-zinc-400">Email</p><p className="text-sm text-blue-600 dark:text-blue-400">{detailJob.author_email}</p></div>
                    <div><p className="text-[11px] text-zinc-500 dark:text-zinc-400">Phone</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{detailJob.author_phone}</p></div>
                    <div><p className="text-[11px] text-zinc-500 dark:text-zinc-400">Source</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{detailJob.source}</p></div>
                    <div><p className="text-[11px] text-zinc-500 dark:text-zinc-400">Scraped</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{formatScrapedDate(detailJob.scraped_at)}</p></div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium" data-testid="modal-send-apply">
                    <EnvelopeSimple size={16} className="inline mr-2" />
                    Send to Apply
                  </button>
                  <a
                    href={detailJob.post_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm font-medium text-center"
                    data-testid="modal-view-source"
                  >
                    <ArrowSquareOut size={16} className="inline mr-2" />
                    View Source
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default JobLeads;
