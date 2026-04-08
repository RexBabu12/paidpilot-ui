import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockRecruiters } from '../../data/mockData';
import {
  MagnifyingGlass, EnvelopeSimple, Phone, LinkedinLogo,
  Star, Clock, Briefcase, MapPin, ChatCircleDots
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const BusinessRecruiters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);

  const filteredRecruiters = useMemo(() => {
    if (!searchTerm) return mockRecruiters;
    const q = searchTerm.toLowerCase();
    return mockRecruiters.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.company.toLowerCase().includes(q) ||
      r.commonRoles.some(role => role.toLowerCase().includes(q))
    );
  }, [searchTerm]);

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Recruiter Intelligence
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Track recruiter relationships and optimize your submission strategy
          </p>
        </motion.div>

        {/* Search */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-6">
          <div className="relative max-w-md">
            <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="recruiter-search-input"
              placeholder="Search recruiters by name, company, or role..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="flex gap-6">
          {/* Recruiter List */}
          <div className="flex-1">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="recruiters-table">
                  <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Recruiter</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Specialization</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Posts</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Response Rate</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Preference</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Last Active</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {filteredRecruiters.map((recruiter) => (
                      <tr key={recruiter.id}
                        className={`hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer ${selectedRecruiter?.id === recruiter.id ? 'bg-blue-50/50 dark:bg-blue-500/5' : ''}`}
                        onClick={() => setSelectedRecruiter(recruiter)}
                        data-testid={`recruiter-row-${recruiter.id}`}
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                              {recruiter.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-semibold text-zinc-900 dark:text-zinc-50">{recruiter.name}</p>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400">{recruiter.company}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-1">
                            {recruiter.commonRoles.map((role, idx) => (
                              <span key={idx} className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{role}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center font-semibold text-zinc-900 dark:text-zinc-50">{recruiter.totalPosts}</td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <div className="w-16 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${recruiter.responseRate >= 80 ? 'bg-emerald-500' : recruiter.responseRate >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
                                style={{ width: `${recruiter.responseRate}%` }} />
                            </div>
                            <span className={`text-sm font-semibold ${recruiter.responseRate >= 80 ? 'text-emerald-600 dark:text-emerald-400' : recruiter.responseRate >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}`}>
                              {recruiter.responseRate}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`text-xs px-2 py-1 rounded font-medium ${
                            recruiter.engagementPreference === 'C2C' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          }`}>{recruiter.engagementPreference}</span>
                        </td>
                        <td className="px-4 py-4 text-sm text-zinc-500 dark:text-zinc-400">{recruiter.lastActive}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-1">
                            <a href={`mailto:${recruiter.email}`} data-testid={`email-recruiter-${recruiter.id}`}
                              className="p-1.5 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors"
                              onClick={(e) => e.stopPropagation()}>
                              <EnvelopeSimple size={16} />
                            </a>
                            <a href={recruiter.linkedIn} target="_blank" rel="noreferrer" data-testid={`linkedin-recruiter-${recruiter.id}`}
                              className="p-1.5 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors"
                              onClick={(e) => e.stopPropagation()}>
                              <LinkedinLogo size={16} />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recruiter Detail Sidebar */}
          {selectedRecruiter && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
              className="w-80 flex-shrink-0 hidden xl:block"
            >
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sticky top-24" data-testid="recruiter-detail-panel">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-xl mb-3">
                    {selectedRecruiter.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50">{selectedRecruiter.name}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{selectedRecruiter.company}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <EnvelopeSimple size={16} className="text-zinc-400" />
                    <span className="text-zinc-600 dark:text-zinc-400">{selectedRecruiter.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-zinc-400" />
                    <span className="text-zinc-600 dark:text-zinc-400">{selectedRecruiter.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin size={16} className="text-zinc-400" />
                    <span className="text-zinc-600 dark:text-zinc-400">{selectedRecruiter.commonLocations.join(', ')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="text-center p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                    <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{selectedRecruiter.totalPosts}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Total Posts</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                    <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{selectedRecruiter.responseRate}%</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Response Rate</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Common Roles</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRecruiter.commonRoles.map((role, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">{role}</span>
                    ))}
                  </div>
                </div>

                <button data-testid="submit-to-recruiter" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium text-sm">
                  <EnvelopeSimple size={16} weight="bold" />
                  Submit Candidate
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BusinessRecruiters;
