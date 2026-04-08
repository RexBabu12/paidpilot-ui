import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockCandidates } from '../../data/mockData';
import { User, MagnifyingGlass, Funnel, Target } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const CandidateManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  return (
    <DashboardLayout userType="business">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Candidate Database
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Manage your talent pool and match candidates to opportunities
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlass
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="candidate-search-input"
                placeholder="Search candidates by name, skills, location..."
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition-colors duration-200"
              />
            </div>
            <button
              data-testid="filter-candidates-button"
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              <Funnel size={20} weight="bold" />
              Filters
            </button>
          </div>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 gap-4">
          {mockCandidates.map((candidate) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ x: 4 }}
              onClick={() => setSelectedCandidate(candidate)}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
              data-testid={`candidate-card-${candidate.id}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold font-outfit text-zinc-900 dark:text-zinc-50">
                        {candidate.name}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {candidate.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-emerald-500">
                          <Target size={16} weight="fill" />
                          <span className="text-sm font-semibold">{candidate.matchCount}</span>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Matches</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">Experience</p>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{candidate.experience}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">Location</p>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{candidate.location}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">Visa Status</p>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{candidate.visaStatus}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">Rate</p>
                      <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{candidate.rate}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {candidate.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                      <span>Available: {candidate.availability}</span>
                      <span>•</span>
                      <span>Updated {candidate.lastUpdated}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        data-testid={`match-candidate-${candidate.id}`}
                        className="px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors duration-200"
                      >
                        View Matches
                      </button>
                      <button
                        data-testid={`submit-candidate-${candidate.id}`}
                        className="px-3 py-1.5 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CandidateManagement;