import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockRecruiters, mockBusinessCandidates } from '../../data/mockData';
import {
  MagnifyingGlass, EnvelopeSimple, Phone, LinkedinLogo,
  PaperPlaneTilt, X, User
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const BusinessRecruiters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sendModal, setSendModal] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filteredRecruiters = useMemo(() => {
    if (!searchTerm) return mockRecruiters;
    const q = searchTerm.toLowerCase();
    return mockRecruiters.filter(r =>
      r.name.toLowerCase().includes(q) || r.company.toLowerCase().includes(q) || r.commonRoles.some(role => role.toLowerCase().includes(q))
    );
  }, [searchTerm]);

  const handleSend = (recruiter) => {
    setSendModal(recruiter);
    setSelectedCandidate(null);
  };

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Recruiter Directory</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">All recruiters in our database. Select a recruiter and send candidate profiles directly.</p>
        </motion.div>

        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-6">
          <div className="relative max-w-md">
            <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="recruiter-search-input" placeholder="Search by name, company, or specialization..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="recruiters-table">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Recruiter</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Specialization</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Preference</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Contact</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredRecruiters.map((recruiter) => (
                  <tr key={recruiter.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors" data-testid={`recruiter-row-${recruiter.id}`}>
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
                    <td className="px-4 py-4">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${recruiter.engagementPreference === 'C2C' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'}`}>{recruiter.engagementPreference}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <a href={`tel:${recruiter.phone}`} data-testid={`phone-recruiter-${recruiter.id}`}
                          className="p-2 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title={recruiter.phone}>
                          <Phone size={18} />
                        </a>
                        <a href={`mailto:${recruiter.email}`} data-testid={`email-recruiter-${recruiter.id}`}
                          className="p-2 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title={recruiter.email}>
                          <EnvelopeSimple size={18} />
                        </a>
                        <a href={recruiter.linkedIn} target="_blank" rel="noreferrer" data-testid={`linkedin-recruiter-${recruiter.id}`}
                          className="p-2 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="LinkedIn">
                          <LinkedinLogo size={18} />
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button onClick={() => handleSend(recruiter)} data-testid={`send-to-recruiter-${recruiter.id}`}
                        className="flex items-center gap-1.5 mx-auto px-4 py-2 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                        <PaperPlaneTilt size={14} weight="bold" />
                        Send Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Send Profile Modal */}
        <AnimatePresence>
          {sendModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setSendModal(null)}>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()} data-testid="send-profile-modal">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Send to {sendModal.name}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Select which candidate to send to this recruiter</p>
                  </div>
                  <button onClick={() => setSendModal(null)} className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded"><X size={20} /></button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
                  {mockBusinessCandidates.map(c => (
                    <button key={c.id} onClick={() => setSelectedCandidate(c.id)}
                      data-testid={`send-profile-option-${c.id}`}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all ${selectedCandidate === c.id ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-500/5' : 'border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700'}`}>
                      <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{c.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{c.title} | {c.rate}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <button onClick={() => setSendModal(null)} className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Cancel</button>
                  <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-40" disabled={!selectedCandidate} data-testid="confirm-send-profile">
                    <PaperPlaneTilt size={14} weight="bold" />
                    Send Email
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default BusinessRecruiters;
