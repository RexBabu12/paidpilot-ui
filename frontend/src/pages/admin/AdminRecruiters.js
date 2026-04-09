import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import {
  MagnifyingGlass, Eye, X, EnvelopeSimple, Phone, LinkedinLogo, Briefcase, Clock
} from '@phosphor-icons/react';
import { mockRecruiters, mockJobs, mockAdminOutreach } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const AdminRecruiters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);

  const filteredRecruiters = mockRecruiters.filter(r =>
    !searchTerm || r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRecruiterJobs = (name) => mockJobs.filter(j => j.author_name === name);
  const getRecruiterEmails = (name) => mockAdminOutreach.filter(o => o.to === name);

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1600px] mx-auto" data-testid="admin-recruiters-page">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
          <h1 className="text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Recruiters</h1>
          <p className="text-zinc-600 dark:text-zinc-400">{mockRecruiters.length} recruiters in directory</p>
        </motion.div>

        <div className="mb-6 max-w-md">
          <div className="relative">
            <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input type="text" placeholder="Search by name or company..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600" data-testid="recruiter-admin-search" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="admin-recruiters-table">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Recruiter</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Company</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Email</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Phone</th>
                  <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Posts</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Last Active</th>
                  <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredRecruiters.map((r) => (
                  <tr key={r.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors" data-testid={`admin-recruiter-row-${r.id}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {r.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-sm text-zinc-900 dark:text-zinc-50">{r.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-zinc-700 dark:text-zinc-300">{r.company}</td>
                    <td className="px-5 py-4"><a href={`mailto:${r.email}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">{r.email}</a></td>
                    <td className="px-5 py-4 text-sm text-zinc-700 dark:text-zinc-300">{r.phone}</td>
                    <td className="px-5 py-4 text-center text-sm font-medium text-zinc-900 dark:text-zinc-50">{r.totalPosts}</td>
                    <td className="px-5 py-4 text-sm text-zinc-500 dark:text-zinc-400">{r.lastActive}</td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => setSelectedRecruiter(r)} className="p-1.5 text-zinc-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded" data-testid={`view-admin-recruiter-${r.id}`}><Eye size={16} /></button>
                        <a href={r.linkedIn} target="_blank" rel="noopener noreferrer" className="p-1.5 text-zinc-500 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 rounded"><LinkedinLogo size={16} weight="fill" /></a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recruiter Detail Modal */}
      <AnimatePresence>
        {selectedRecruiter && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedRecruiter(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" data-testid="admin-recruiter-detail-modal">
              <div className="p-6">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {selectedRecruiter.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">{selectedRecruiter.name}</h2>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{selectedRecruiter.company}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedRecruiter(null)} className="p-1 text-zinc-400 hover:text-zinc-600" data-testid="close-admin-recruiter-modal"><X size={20} /></button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                  <div className="flex items-center gap-2"><EnvelopeSimple size={16} className="text-zinc-400" /><span className="text-sm text-blue-600 dark:text-blue-400">{selectedRecruiter.email}</span></div>
                  <div className="flex items-center gap-2"><Phone size={16} className="text-zinc-400" /><span className="text-sm text-zinc-700 dark:text-zinc-300">{selectedRecruiter.phone}</span></div>
                  <div className="flex items-center gap-2"><LinkedinLogo size={16} className="text-zinc-400" /><a href={selectedRecruiter.linkedIn} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate">LinkedIn Profile</a></div>
                  <div className="flex items-center gap-2"><Briefcase size={16} className="text-zinc-400" /><span className="text-sm text-zinc-700 dark:text-zinc-300">{selectedRecruiter.totalPosts} posts total</span></div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
                    <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{selectedRecruiter.responseRate}%</p>
                    <p className="text-xs text-zinc-500">Response Rate</p>
                  </div>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
                    <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{selectedRecruiter.engagementPreference}</p>
                    <p className="text-xs text-zinc-500">Preference</p>
                  </div>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
                    <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{selectedRecruiter.lastActive}</p>
                    <p className="text-xs text-zinc-500">Last Active</p>
                  </div>
                </div>

                {/* Jobs Posted by Recruiter */}
                <div className="mb-5">
                  <p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-3">Jobs Posted ({getRecruiterJobs(selectedRecruiter.name).length})</p>
                  <div className="space-y-2">
                    {getRecruiterJobs(selectedRecruiter.name).length > 0 ? getRecruiterJobs(selectedRecruiter.name).map((job) => (
                      <div key={job.id} className="flex items-center justify-between py-2 px-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                        <div><p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{job.role_title}</p><p className="text-[11px] text-zinc-500">{job.location} | {job.rate_raw}</p></div>
                        <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${job.engagement_type === 'C2C' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'}`}>{job.engagement_type}</span>
                      </div>
                    )) : <p className="text-sm text-zinc-500 dark:text-zinc-400 py-2">No direct job matches found</p>}
                  </div>
                </div>

                {/* Emails Sent to Recruiter */}
                <div>
                  <p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-3">Emails Sent ({getRecruiterEmails(selectedRecruiter.name).length})</p>
                  <div className="space-y-2">
                    {getRecruiterEmails(selectedRecruiter.name).length > 0 ? getRecruiterEmails(selectedRecruiter.name).map((email) => (
                      <div key={email.id} className="flex items-center justify-between py-2 px-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                        <div><p className="text-sm text-zinc-900 dark:text-zinc-50">{email.subject}</p><p className="text-[11px] text-zinc-500">{email.sentAt}</p></div>
                        <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${
                          email.status === 'Opened' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          email.status === 'Bounced' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                          email.status === 'Replied' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                          'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        }`}>{email.status}</span>
                      </div>
                    )) : <p className="text-sm text-zinc-500 dark:text-zinc-400 py-2">No emails sent to this recruiter yet</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default AdminRecruiters;
