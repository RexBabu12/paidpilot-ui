import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { JobCard } from '../../components/JobCard';
import { MagnifyingGlass, Funnel, X } from '@phosphor-icons/react';
import { mockJobs } from '../../data/mockData';
import { motion } from 'framer-motion';

const JobLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    engagementType: '',
    workMode: '',
    location: '',
    postedDate: ''
  });

  const handleViewDetails = (job) => {
    console.log('View details:', job);
  };

  const handleApply = (job) => {
    console.log('Apply to:', job);
  };

  const filteredJobs = mockJobs;

  return (
    <DashboardLayout userType="candidate">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Job Leads Explorer
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Search and filter through {mockJobs.length} active opportunities
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlass
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="job-search-input"
                placeholder="Search by title, skills, company..."
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition-colors duration-200"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              data-testid="toggle-filters-button"
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              <Funnel size={20} weight="bold" />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Engagement Type
                  </label>
                  <select
                    value={filters.engagementType}
                    onChange={(e) => setFilters({ ...filters, engagementType: e.target.value })}
                    data-testid="filter-engagement-type"
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                  >
                    <option value="">All Types</option>
                    <option value="C2C">C2C</option>
                    <option value="W2">W2</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Work Mode
                  </label>
                  <select
                    value={filters.workMode}
                    onChange={(e) => setFilters({ ...filters, workMode: e.target.value })}
                    data-testid="filter-work-mode"
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                  >
                    <option value="">All Modes</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    data-testid="filter-location"
                    placeholder="City, State"
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Posted Date
                  </label>
                  <select
                    value={filters.postedDate}
                    onChange={(e) => setFilters({ ...filters, postedDate: e.target.value })}
                    data-testid="filter-posted-date"
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                  >
                    <option value="">Any Time</option>
                    <option value="today">Today</option>
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setFilters({ engagementType: '', workMode: '', location: '', postedDate: '' })}
                  data-testid="clear-filters-button"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Showing <span className="font-semibold text-zinc-900 dark:text-zinc-50">{filteredJobs.length}</span> opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onViewDetails={handleViewDetails}
              onApply={handleApply}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobLeads;