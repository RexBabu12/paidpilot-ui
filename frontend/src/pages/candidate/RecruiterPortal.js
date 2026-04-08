import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockRecruiters } from '../../data/mockData';
import { EnvelopeSimple, Phone, LinkedinLogo, Buildings, ChartLine, MagnifyingGlass, Funnel, SquaresFour, Rows, Download } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const RecruiterPortal = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    engagementTypes: [],
    locations: [],
    responseRate: '0',
    activityPeriod: 'All'
  });

  const handleEngagementTypeChange = (type) => {
    setFilters(prev => ({
      ...prev,
      engagementTypes: prev.engagementTypes.includes(type)
        ? prev.engagementTypes.filter(t => t !== type)
        : [...prev.engagementTypes, type]
    }));
  };

  const handleLocationChange = (location) => {
    setFilters(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location]
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
            Recruiter Directory
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Browse and connect with active recruiters.
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
                  onClick={() => setFilters({ engagementTypes: [], locations: [], responseRate: '0', activityPeriod: 'All' })}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
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
                  <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Name, company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Engagement Preference */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  Engagement Preference
                </label>
                <div className="space-y-2">
                  {['C2C', 'W2', 'Both'].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.engagementTypes.includes(type)}
                        onChange={() => handleEngagementTypeChange(type)}
                        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-2 focus:ring-blue-600"
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Common Locations */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  Common Locations
                </label>
                <div className="space-y-2">
                  {['Remote', 'Dallas', 'Austin', 'Chicago'].map((location) => (
                    <label key={location} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.locations.includes(location)}
                        onChange={() => handleLocationChange(location)}
                        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-2 focus:ring-blue-600"
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{location}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Response Rate */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Minimum Response Rate
                </label>
                <select
                  value={filters.responseRate}
                  onChange={(e) => setFilters({ ...filters, responseRate: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="0">All Recruiters</option>
                  <option value="80">80%+</option>
                  <option value="70">70%+</option>
                  <option value="60">60%+</option>
                </select>
              </div>

              {/* Activity Period */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Last Active
                </label>
                <select
                  value={filters.activityPeriod}
                  onChange={(e) => setFilters({ ...filters, activityPeriod: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="All">All time</option>
                  <option value="Today">Today</option>
                  <option value="This week">This week</option>
                  <option value="This month">This month</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Showing <span className="font-semibold text-zinc-900 dark:text-zinc-50">{mockRecruiters.length}</span> recruiters
                </p>
                <select className="px-3 py-1.5 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option>Sort by: Response Rate</option>
                  <option>Sort by: Most Active</option>
                  <option>Sort by: Total Posts</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                  <Download size={16} />
                  Export
                </button>
                <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-white dark:bg-zinc-700 shadow-sm' : ''}`}
                  >
                    <Rows size={18} className={viewMode === 'table' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-600 dark:text-zinc-400'} />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-700 shadow-sm' : ''}`}
                  >
                    <SquaresFour size={18} className={viewMode === 'grid' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-600 dark:text-zinc-400'} />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mockRecruiters.map((recruiter) => (
                  <motion.div
                    key={recruiter.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    data-testid={`recruiter-card-${recruiter.id}`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {recruiter.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold font-outfit text-zinc-900 dark:text-zinc-50">
                          {recruiter.name}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2 mt-1">
                          <Buildings size={16} />
                          {recruiter.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-emerald-500">
                          <ChartLine size={16} weight="bold" />
                          <span className="text-lg font-semibold">{recruiter.responseRate}%</span>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Response</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">Total Posts</p>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{recruiter.totalPosts}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">Last Active</p>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{recruiter.lastActive}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-2">Common Roles</p>
                      <div className="flex flex-wrap gap-1.5">
                        {recruiter.commonRoles.map((role, idx) => (
                          <span key={idx} className="px-2 py-0.5 text-xs rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <div className="flex gap-2">
                        <a href={`mailto:${recruiter.email}`} className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors">
                          <EnvelopeSimple size={18} weight="fill" />
                        </a>
                        <a href={`tel:${recruiter.phone}`} className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors">
                          <Phone size={18} weight="fill" />
                        </a>
                        <a href={recruiter.linkedIn} target="_blank" rel="noopener noreferrer" className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors">
                          <LinkedinLogo size={18} weight="fill" />
                        </a>
                      </div>
                      <button
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        data-testid={`contact-recruiter-${recruiter.id}`}
                      >
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Table View */}
            {viewMode === 'table' && (
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                      <tr>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Recruiter</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Company</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Common Roles</th>
                        <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Total Posts</th>
                        <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Response Rate</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Last Active</th>
                        <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {mockRecruiters.map((recruiter) => (
                        <tr key={recruiter.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                                {recruiter.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <p className="font-semibold text-zinc-900 dark:text-zinc-50">{recruiter.name}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-zinc-900 dark:text-zinc-50">{recruiter.company}</td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-1">
                              {recruiter.commonRoles.slice(0, 2).map((role, idx) => (
                                <span key={idx} className="px-2 py-0.5 text-xs rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                  {role}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center font-semibold text-zinc-900 dark:text-zinc-50">{recruiter.totalPosts}</td>
                          <td className="px-4 py-4">
                            <div className="flex justify-center">
                              <span className="text-lg font-bold text-emerald-500">{recruiter.responseRate}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-400">{recruiter.lastActive}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <a href={`mailto:${recruiter.email}`} className="p-1.5 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors">
                                <EnvelopeSimple size={18} />
                              </a>
                              <a href={`tel:${recruiter.phone}`} className="p-1.5 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors">
                                <Phone size={18} />
                              </a>
                              <a href={recruiter.linkedIn} target="_blank" rel="noopener noreferrer" className="p-1.5 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors">
                                <LinkedinLogo size={18} />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterPortal;
