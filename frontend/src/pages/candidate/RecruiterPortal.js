import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockRecruiters } from '../../data/mockData';
import { EnvelopeSimple, Phone, LinkedinLogo, Buildings, ChartLine } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const RecruiterPortal = () => {
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);

  return (
    <DashboardLayout userType="candidate">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Recruiter Directory
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Browse and connect with active recruiters
          </p>
        </motion.div>

        {/* Recruiter List */}
        <div className="grid grid-cols-1 gap-4">
          {mockRecruiters.map((recruiter) => (
            <motion.div
              key={recruiter.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ x: 4 }}
              onClick={() => setSelectedRecruiter(recruiter)}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
              data-testid={`recruiter-card-${recruiter.id}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {recruiter.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold font-outfit text-zinc-900 dark:text-zinc-50">
                        {recruiter.name}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                        <Buildings size={16} />
                        {recruiter.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-emerald-500">
                        <ChartLine size={16} weight="bold" />
                        <span className="text-sm font-semibold">{recruiter.responseRate}%</span>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Response Rate</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">Total Posts</p>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{recruiter.totalPosts}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">Last Active</p>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{recruiter.lastActive}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">Engagement</p>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{recruiter.engagementPreference}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">Contact</p>
                      <div className="flex gap-2">
                        <a href={`mailto:${recruiter.email}`} className="text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform">
                          <EnvelopeSimple size={18} weight="fill" />
                        </a>
                        <a href={`tel:${recruiter.phone}`} className="text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform">
                          <Phone size={18} weight="fill" />
                        </a>
                        <a href={recruiter.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform">
                          <LinkedinLogo size={18} weight="fill" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-2">Common Roles</p>
                    <div className="flex flex-wrap gap-1.5">
                      {recruiter.commonRoles.map((role, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-xs rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-2">Locations</p>
                    <div className="flex flex-wrap gap-1.5">
                      {recruiter.commonLocations.map((location, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        >
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-4">
                <button
                  data-testid={`view-recruiter-${recruiter.id}`}
                  className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors duration-200"
                >
                  View Details
                </button>
                <button
                  data-testid={`contact-recruiter-${recruiter.id}`}
                  className="px-4 py-2 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterPortal;