import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { MagnifyingGlass, CaretDown, Funnel, SquaresFour, Rows, Download, BookmarkSimple, ShareNetwork, EnvelopeSimple } from '@phosphor-icons/react';
import { mockJobs } from '../../data/mockData';
import { motion } from 'framer-motion';

const JobLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [filters, setFilters] = useState({
    engagementTypes: ['C2C'],
    workModes: ['Remote'],
    datePosted: 'Today',
    hasContact: true,
    ratePresent: false
  });

  const handleEngagementTypeChange = (type) => {
    setFilters(prev => ({
      ...prev,
      engagementTypes: prev.engagementTypes.includes(type)
        ? prev.engagementTypes.filter(t => t !== type)
        : [...prev.engagementTypes, type]
    }));
  };

  const handleWorkModeChange = (mode) => {
    setFilters(prev => ({
      ...prev,
      workModes: prev.workModes.includes(mode)
        ? prev.workModes.filter(m => m !== mode)
        : [...prev.workModes, mode]
    }));
  };

  return (
    <DashboardLayout userType="candidate">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Job Leads Explorer
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Search 2,847 scraped C2C and W2 opportunities.
          </p>
        </motion.div>

        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
                  <Funnel size={18} weight="bold" />
                  <h3 className="font-semibold">Filters</h3>
                </div>
                <button
                  onClick={() => setFilters({ engagementTypes: [], workModes: [], datePosted: '', hasContact: false, ratePresent: false })}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="clear-all-filters"
                >
                  Clear All
                </button>
              </div>

              {/* Keyword Search */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Keyword Search
                </label>
                <div className="relative">
                  <MagnifyingGlass
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                  <input
                    type="text"
                    placeholder="e.g. Java, AWS..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                    data-testid="keyword-search-input"
                  />
                </div>
              </div>

              {/* Engagement Type */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  Engagement Type
                </label>
                <div className="space-y-2">
                  {['C2C', 'W2', 'Full-time'].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.engagementTypes.includes(type)}
                        onChange={() => handleEngagementTypeChange(type)}
                        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                        data-testid={`filter-engagement-${type.toLowerCase()}`}
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Work Mode */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  Work Mode
                </label>
                <div className="space-y-2">
                  {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
                    <label key={mode} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.workModes.includes(mode)}
                        onChange={() => handleWorkModeChange(mode)}
                        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                        data-testid={`filter-workmode-${mode.toLowerCase()}`}
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Posted */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Date Posted
                </label>
                <select
                  value={filters.datePosted}
                  onChange={(e) => setFilters({ ...filters, datePosted: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                  data-testid="filter-date-posted"
                >
                  <option value="Today">Today</option>
                  <option value="Last 24h">Last 24 hours</option>
                  <option value="Last 3 days">Last 3 days</option>
                  <option value="Last 7 days">Last 7 days</option>
                  <option value="All">All time</option>
                </select>
              </div>

              {/* Has Contact Info */}
              <div className="mb-6">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Has Contact Info
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={filters.hasContact}
                      onChange={(e) => setFilters({ ...filters, hasContact: e.target.checked })}
                      className="sr-only peer"
                      data-testid="filter-has-contact"
                    />
                    <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500 peer-focus:ring-2 peer-focus:ring-blue-600 dark:peer-focus:ring-blue-500 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                  </div>
                </label>
              </div>

              {/* Rate Present */}
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Rate Present
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={filters.ratePresent}
                      onChange={(e) => setFilters({ ...filters, ratePresent: e.target.checked })}
                      className="sr-only peer"
                      data-testid="filter-rate-present"
                    />
                    <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500 peer-focus:ring-2 peer-focus:ring-blue-600 dark:peer-focus:ring-blue-500 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Header with results count and view toggles */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Showing <span className="font-semibold text-zinc-900 dark:text-zinc-50">8</span> results
                </p>
                <select
                  className="px-3 py-1.5 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  data-testid="sort-by-select"
                >
                  <option>Sort by: Best Match</option>
                  <option>Sort by: Newest</option>
                  <option>Sort by: Highest Rate</option>
                  <option>Sort by: Match Score</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                  data-testid="export-button"
                >
                  <Download size={16} />
                  Export
                </button>
                <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-white dark:bg-zinc-700 shadow-sm' : ''}`}
                    data-testid="view-mode-table"
                  >
                    <Rows size={18} className={viewMode === 'table' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-600 dark:text-zinc-400'} />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-700 shadow-sm' : ''}`}
                    data-testid="view-mode-grid"
                  >
                    <SquaresFour size={18} className={viewMode === 'grid' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-600 dark:text-zinc-400'} />
                  </button>
                </div>
              </div>
            </div>

            {/* Table View */}
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Role
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Skills
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Details
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Rate
                      </th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Match
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Posted
                      </th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {mockJobs.map((job) => (
                      <tr
                        key={job.id}
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer"
                        data-testid={`job-row-${job.id}`}
                      >
                        {/* Role */}
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                              {job.title}
                            </p>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400">
                              {job.company} • {job.location}
                            </p>
                          </div>
                        </td>

                        {/* Skills */}
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-1">
                            {job.skills.slice(0, 3).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                              >
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 3 && (
                              <span className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                                +{job.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Details */}
                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded ${
                              job.engagementType === 'C2C' 
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                                : job.engagementType === 'W2'
                                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            }`}>
                              {job.engagementType}
                            </span>
                            <span className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded ${
                              job.workMode === 'Remote'
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                : job.workMode === 'Hybrid'
                                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            }`}>
                              {job.workMode}
                            </span>
                          </div>
                        </td>

                        {/* Rate */}
                        <td className="px-4 py-4">
                          <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                            {job.rate || 'N/A'}
                          </p>
                        </td>

                        {/* Match */}
                        <td className="px-4 py-4">
                          <div className="flex justify-center">
                            <div className="w-10 h-10 rounded-full border-2 border-blue-600 dark:border-blue-500 flex items-center justify-center">
                              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                {job.matchScore}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Posted */}
                        <td className="px-4 py-4">
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {job.postedDate}
                          </p>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors"
                              data-testid={`bookmark-job-${job.id}`}
                              title="Bookmark"
                            >
                              <BookmarkSimple size={18} />
                            </button>
                            <button
                              className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors"
                              data-testid={`tailor-resume-${job.id}`}
                              title="Tailor Resume"
                            >
                              <ShareNetwork size={18} />
                            </button>
                            <button
                              className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors"
                              data-testid={`email-job-${job.id}`}
                              title="Email Recruiter"
                            >
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobLeads;
