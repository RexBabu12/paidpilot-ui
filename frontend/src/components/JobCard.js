import React from 'react';
import { motion } from 'framer-motion';

export const JobCard = ({ job, onViewDetails, onApply, showMatchScore = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
      data-testid={`job-card-${job.id}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold font-outfit text-zinc-900 dark:text-zinc-50 mb-1">
            {job.title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {job.company} · {job.recruiter}
          </p>
        </div>
        {showMatchScore && job.matchScore && (
          <div className="ml-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center">
              <span className="text-lg font-bold text-emerald-500">{job.matchScore}</span>
            </div>
            <p className="text-xs text-center text-zinc-500 mt-1">Match</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
          {job.engagementType}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
          {job.workMode}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
          {job.location}
        </span>
        {job.rate && (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            {job.rate}
          </span>
        )}
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-1.5">
          {job.skills.slice(0, 5).map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 5 && (
            <span className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
              +{job.skills.length - 5} more
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Posted {job.postedDate}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(job)}
            data-testid={`view-job-${job.id}`}
            className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors duration-200"
          >
            View Details
          </button>
          <button
            onClick={() => onApply(job)}
            data-testid={`apply-job-${job.id}`}
            className="px-4 py-2 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
          >
            Apply
          </button>
        </div>
      </div>
    </motion.div>
  );
};