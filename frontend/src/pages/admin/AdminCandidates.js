import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import {
  MagnifyingGlass, Eye, X, FileText, Download, EnvelopeSimple, MapPin, Clock
} from '@phosphor-icons/react';
import { mockBusinessCandidates } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const AdminCandidates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filteredCandidates = mockBusinessCandidates.filter(c =>
    !searchTerm || c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1600px] mx-auto" data-testid="admin-candidates-page">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
          <h1 className="text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Candidates</h1>
          <p className="text-zinc-600 dark:text-zinc-400">{mockBusinessCandidates.length} candidates across all customers</p>
        </motion.div>

        <div className="mb-6 max-w-md">
          <div className="relative">
            <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input type="text" placeholder="Search by name or skill..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600" data-testid="candidates-search" />
          </div>
        </div>

        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="admin-candidates-table">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Candidate</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Skills</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Visa</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Rate</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Availability</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Submissions</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Placements</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredCandidates.map((c) => (
                  <tr key={c.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors" data-testid={`admin-candidate-row-${c.id}`}>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {c.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-zinc-900 dark:text-zinc-50">{c.name}</p>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{c.title} | {c.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {c.skills.slice(0, 3).map((s, i) => (
                          <span key={i} className="px-1.5 py-0.5 text-[10px] rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">{s}</span>
                        ))}
                        {c.skills.length > 3 && <span className="px-1.5 py-0.5 text-[10px] rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">+{c.skills.length - 3}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-zinc-700 dark:text-zinc-300">{c.visaStatus}</td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-zinc-900 dark:text-zinc-50">{c.rate}</td>
                    <td className="px-4 py-3.5 text-sm text-zinc-700 dark:text-zinc-300">{c.availability}</td>
                    <td className="px-4 py-3.5 text-center text-sm text-zinc-700 dark:text-zinc-300">{c.totalSubmissions}</td>
                    <td className="px-4 py-3.5 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">{c.totalPlacements}</td>
                    <td className="px-4 py-3.5 text-center">
                      <button onClick={() => setSelectedCandidate(c)} className="p-1.5 text-zinc-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded" data-testid={`view-admin-candidate-${c.id}`}><Eye size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Candidate Detail Modal */}
      <AnimatePresence>
        {selectedCandidate && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCandidate(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" data-testid="admin-candidate-detail-modal">
              <div className="p-6">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">{selectedCandidate.name}</h2>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{selectedCandidate.title}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedCandidate(null)} className="p-1 text-zinc-400 hover:text-zinc-600" data-testid="close-admin-candidate-modal"><X size={20} /></button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                  <div><p className="text-[11px] text-zinc-500">Email</p><p className="text-sm text-blue-600 dark:text-blue-400">{selectedCandidate.email}</p></div>
                  <div><p className="text-[11px] text-zinc-500">Phone</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{selectedCandidate.phone}</p></div>
                  <div><p className="text-[11px] text-zinc-500">Location</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{selectedCandidate.location}</p></div>
                  <div><p className="text-[11px] text-zinc-500">Visa Status</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{selectedCandidate.visaStatus}</p></div>
                  <div><p className="text-[11px] text-zinc-500">Rate</p><p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{selectedCandidate.rate}</p></div>
                  <div><p className="text-[11px] text-zinc-500">Availability</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{selectedCandidate.availability}</p></div>
                  <div><p className="text-[11px] text-zinc-500">Experience</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{selectedCandidate.experience}</p></div>
                  <div><p className="text-[11px] text-zinc-500">Preference</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{selectedCandidate.preferredEngagement} / {selectedCandidate.preferredWorkMode}</p></div>
                </div>

                <div className="mb-5">
                  <p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCandidate.skills.map((s, i) => <span key={i} className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{s}</span>)}
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-2">Summary</p>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{selectedCandidate.summary}</p>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
                    <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{selectedCandidate.totalSubmissions}</p>
                    <p className="text-xs text-zinc-500">Submissions</p>
                  </div>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
                    <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{selectedCandidate.totalInterviews}</p>
                    <p className="text-xs text-zinc-500">Interviews</p>
                  </div>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{selectedCandidate.totalPlacements}</p>
                    <p className="text-xs text-zinc-500">Placements</p>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-2">Resume</p>
                  <div className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                    <FileText size={20} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{selectedCandidate.resumeFile}</p>
                      <p className="text-[11px] text-zinc-500">Updated {selectedCandidate.resumeLastUpdated}</p>
                    </div>
                    <button className="p-1.5 text-zinc-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded" data-testid="download-candidate-resume"><Download size={16} /></button>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-3">Outreach History ({selectedCandidate.outreach.length})</p>
                  <div className="space-y-2">
                    {selectedCandidate.outreach.map((o) => (
                      <div key={o.id} className="flex items-center justify-between py-2 px-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                        <div><p className="text-sm text-zinc-900 dark:text-zinc-50">{o.job}</p><p className="text-[11px] text-zinc-500">{o.recruiter} | {o.date}</p></div>
                        <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${
                          o.status === 'Sent' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                          o.status === 'Replied' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                          'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}>{o.status}</span>
                      </div>
                    ))}
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

export default AdminCandidates;
