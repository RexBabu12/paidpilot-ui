import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import {
  MagnifyingGlass, Funnel, Download, EnvelopeSimple,
  LinkedinLogo, Briefcase, Rows, SquaresFour, ArrowRight
} from '@phosphor-icons/react';
import { mockApplications } from '../../data/mockData';
import { motion } from 'framer-motion';

const SourceBadge = ({ source }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-md border ${
    source === 'LinkedIn'
      ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20'
      : 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/20'
  }`}>
    {source === 'LinkedIn'
      ? <LinkedinLogo size={10} weight="fill" />
      : <Briefcase size={10} weight="duotone" />
    }
    {source}
  </span>
);

const TypeBadge = ({ type }) => (
  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border ${
    type === 'C2C'
      ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
      : type === 'W2'
      ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20'
      : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
  }`}>{type}</span>
);

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [filters, setFilters] = useState({
    source: [],
    dateRange: 'All',
    engagementType: []
  });

  const handleSourceChange = (src) => {
    setFilters(prev => ({
      ...prev,
      source: prev.source.includes(src)
        ? prev.source.filter(s => s !== src)
        : [...prev.source, src]
    }));
  };

  const handleTypeChange = (type) => {
    setFilters(prev => ({
      ...prev,
      engagementType: prev.engagementType.includes(type)
        ? prev.engagementType.filter(t => t !== type)
        : [...prev.engagementType, type]
    }));
  };

  const filtered = useMemo(() => {
    return mockApplications.filter(app => {
      const matchSearch = !searchTerm ||
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.recruiter.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSource = filters.source.length === 0 || filters.source.includes(app.source);
      const matchType = filters.engagementType.length === 0 || filters.engagementType.includes(app.engagementType);
      return matchSearch && matchSource && matchType;
    });
  }, [searchTerm, filters]);

  // Summary stats
  const linkedInCount = mockApplications.filter(a => a.source === 'LinkedIn').length;
  const diceCount = mockApplications.filter(a => a.source === 'Dice').length;

  return (
    <DashboardLayout userType="candidate">
      <div className="max-w-[1600px] mx-auto" data-testid="applications-page">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl sm:text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
            Applications Sent
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Track every email sent on your behalf — by recruiter, job, and resume version.
          </p>
        </motion.div>

        {/* Summary Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
              <EnvelopeSimple size={20} weight="duotone" className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{mockApplications.length}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Total Sent</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
              <LinkedinLogo size={20} weight="fill" className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{linkedInCount}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Via LinkedIn Leads</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.11 }}
            className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center">
              <Briefcase size={20} weight="duotone" className="text-orange-500 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{diceCount}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Via Dice Leads</p>
            </div>
          </motion.div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-56 flex-shrink-0">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
                  <Funnel size={16} weight="bold" />
                  <h3 className="text-sm font-semibold">Filters</h3>
                </div>
                <button
                  onClick={() => setFilters({ source: [], dateRange: 'All', engagementType: [] })}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear
                </button>
              </div>

              {/* Search */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Search</label>
                <div className="relative">
                  <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Job, company, recruiter..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Source */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Job Source</label>
                <div className="space-y-2">
                  {['LinkedIn', 'Dice'].map((src) => (
                    <label key={src} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.source.includes(src)}
                        onChange={() => handleSourceChange(src)}
                        className="w-3.5 h-3.5 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-600"
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{src}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Engagement Type */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Type</label>
                <div className="space-y-2">
                  {['C2C', 'W2', 'Both'].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.engagementType.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className="w-3.5 h-3.5 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-600"
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Date Range</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="All">All time</option>
                  <option value="today">Today</option>
                  <option value="week">This week</option>
                  <option value="month">Last 30 days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">{filtered.length}</span> applications
              </p>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-800">
                  <Download size={15} />
                  Export
                </button>
                <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-white dark:bg-zinc-700 shadow-sm' : ''}`}
                  >
                    <Rows size={16} className={viewMode === 'table' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500'} />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-700 shadow-sm' : ''}`}
                  >
                    <SquaresFour size={16} className={viewMode === 'grid' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500'} />
                  </button>
                </div>
              </div>
            </div>

            {/* Table View */}
            {viewMode === 'table' && (
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                      <tr>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Job Title</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Recruiter</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Source</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Type</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Rate</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Sent</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Resume</th>
                        <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {filtered.map((app, idx) => (
                        <motion.tr
                          key={app.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                          data-testid={`application-row-${app.id}`}
                        >
                          <td className="px-4 py-3.5">
                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{app.jobTitle}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{app.location}</p>
                          </td>
                          <td className="px-4 py-3.5">
                            <p className="text-sm text-zinc-800 dark:text-zinc-200">{app.recruiter}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{app.company}</p>
                          </td>
                          <td className="px-4 py-3.5"><SourceBadge source={app.source} /></td>
                          <td className="px-4 py-3.5"><TypeBadge type={app.engagementType} /></td>
                          <td className="px-4 py-3.5 text-sm font-semibold text-zinc-900 dark:text-zinc-50">{app.rate}</td>
                          <td className="px-4 py-3.5">
                            <p className="text-sm text-zinc-700 dark:text-zinc-300">{app.sentDate}</p>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500">{app.sentTime}</p>
                          </td>
                          <td className="px-4 py-3.5 text-xs text-zinc-500 dark:text-zinc-400 max-w-[140px] truncate">{app.resumeVersion}</td>
                          <td className="px-4 py-3.5 text-center">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                              <EnvelopeSimple size={11} weight="fill" />
                              Sent
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filtered.length === 0 && (
                  <div className="py-16 text-center text-zinc-400 dark:text-zinc-600">
                    <EnvelopeSimple size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No applications match your filters.</p>
                  </div>
                )}
              </div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filtered.map((app, idx) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:shadow-md transition-all duration-200"
                    data-testid={`application-card-${app.id}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-base font-semibold font-outfit text-zinc-900 dark:text-zinc-50">{app.jobTitle}</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{app.company}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                        <EnvelopeSimple size={11} weight="fill" />
                        Sent
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <SourceBadge source={app.source} />
                      <TypeBadge type={app.engagementType} />
                      <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{app.rate}</span>
                    </div>

                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-500 dark:text-zinc-400">Recruiter</span>
                        <span className="text-zinc-800 dark:text-zinc-200 font-medium">{app.recruiter}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-500 dark:text-zinc-400">Sent</span>
                        <span className="text-zinc-800 dark:text-zinc-200">{app.sentDate} · {app.sentTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-500 dark:text-zinc-400">Location</span>
                        <span className="text-zinc-800 dark:text-zinc-200">{app.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 truncate max-w-[150px]">📄 {app.resumeVersion}</span>
                      <button className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        View Job <ArrowRight size={11} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Applications;
