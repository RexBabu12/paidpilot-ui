import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { JobCard } from '../../components/JobCard';
import { mockJobs } from '../../data/mockData';
import { motion } from 'framer-motion';
import { Funnel } from '@phosphor-icons/react';

const Matches = () => {
  const handleViewDetails = (job) => {
    console.log('View details:', job);
  };

  const handleApply = (job) => {
    console.log('Apply to:', job);
  };

  // Sort by match score
  const sortedMatches = [...mockJobs].sort((a, b) => b.matchScore - a.matchScore);

  return (
    <DashboardLayout userType="candidate">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Your Job Matches
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Jobs ranked by how well they match your profile
          </p>
        </motion.div>

        {/* Match Score Filter */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Minimum Match Score:
              </label>
              <select
                className="px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                data-testid="match-score-filter"
              >
                <option value="0">All Matches</option>
                <option value="90">90% or higher</option>
                <option value="80">80% or higher</option>
                <option value="70">70% or higher</option>
              </select>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-200"
              data-testid="more-filters-button"
            >
              <Funnel size={16} />
              More Filters
            </button>
          </div>
        </div>

        {/* Match Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Matches', value: sortedMatches.length },
            { label: 'Excellent Matches', value: sortedMatches.filter(j => j.matchScore >= 90).length },
            { label: 'Good Matches', value: sortedMatches.filter(j => j.matchScore >= 80 && j.matchScore < 90).length }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
            >
              <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-2">
                {stat.label}
              </p>
              <p className="text-3xl font-semibold font-outfit text-zinc-900 dark:text-zinc-50">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Matched Jobs */}
        <div className="space-y-6">
          {sortedMatches.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onViewDetails={handleViewDetails}
              onApply={handleApply}
              showMatchScore={true}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Matches;