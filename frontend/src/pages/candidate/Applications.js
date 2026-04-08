import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { MagnifyingGlass, Funnel, SquaresFour, Rows, Download, EnvelopeSimple, Clock, CheckCircle, ArrowClockwise } from '@phosphor-icons/react';
import { mockApplications } from '../../data/mockData';
import { motion } from 'framer-motion';

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    status: [],
    dateRange: 'All',
    hasResponse: false
  });

  const handleStatusChange = (status) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'Replied': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Follow-up': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default: return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Sent': return <EnvelopeSimple size={16} weight="fill" />;
      case 'Replied': return <CheckCircle size={16} weight="fill" />;
      case 'Follow-up': return <ArrowClockwise size={16} weight="fill" />;
      default: return <Clock size={16} weight="fill" />;
    }
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
            Applications & Outreach
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Track your job applications and communication.
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
                  onClick={() => setFilters({ status: [], dateRange: 'All', hasResponse: false })}
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
                    placeholder="Company, role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  Status
                </label>
                <div className="space-y-2">
                  {['Sent', 'Replied', 'Follow-up', 'Submitted'].map((status) => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.status.includes(status)}
                        onChange={() => handleStatusChange(status)}
                        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-2 focus:ring-blue-600"
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="All">All time</option>
                  <option value="This week">This week</option>
                  <option value="Last 30 days">Last 30 days</option>
                  <option value="Last 90 days">Last 90 days</option>
                </select>
              </div>

              {/* Has Response */}
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Has Response
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={filters.hasResponse}
                      onChange={(e) => setFilters({ ...filters, hasResponse: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Showing <span className="font-semibold text-zinc-900 dark:text-zinc-50">{mockApplications.length}</span> applications
                </p>
                <select className="px-3 py-1.5 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option>Sort by: Newest</option>
                  <option>Sort by: Status</option>
                  <option>Sort by: Company</option>
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
                {mockApplications.map((app) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold font-outfit text-zinc-900 dark:text-zinc-50">
                        {app.jobTitle}
                      </h3>
                      <span className={`px-3 py-1 text-xs rounded-full border flex items-center gap-1 ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">{app.company} • {app.recruiter}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-500 dark:text-zinc-400">Sent Date</span>
                        <span className="text-zinc-900 dark:text-zinc-50 font-medium">{app.sentDate}</span>
                      </div>
                      {app.followUpDate && (
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-500 dark:text-zinc-400">Follow-up</span>
                          <span className="text-zinc-900 dark:text-zinc-50 font-medium">{app.followUpDate}</span>
                        </div>
                      )}
                      {app.lastResponse && (
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-500 dark:text-zinc-400">Last Response</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">{app.lastResponse}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        Resume: {app.resumeVersion}
                      </span>
                      <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        Send Follow-up
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
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Job</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Company</th>
                        <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Sent Date</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Follow-up</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Resume</th>
                        <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {mockApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                          <td className="px-4 py-4">
                            <p className="font-semibold text-zinc-900 dark:text-zinc-50">{app.jobTitle}</p>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400">{app.recruiter}</p>
                          </td>
                          <td className="px-4 py-4 text-sm text-zinc-900 dark:text-zinc-50">{app.company}</td>
                          <td className="px-4 py-4">
                            <div className="flex justify-center">
                              <span className={`px-3 py-1 text-xs rounded-full border flex items-center gap-1 ${getStatusColor(app.status)}`}>
                                {getStatusIcon(app.status)}
                                {app.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-400">{app.sentDate}</td>
                          <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-400">{app.followUpDate || 'N/A'}</td>
                          <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-400 truncate max-w-[150px]">{app.resumeVersion}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors">
                                View
                              </button>
                              <button className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors">
                                Follow-up
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Applications;
