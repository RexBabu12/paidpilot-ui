import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import {
  MagnifyingGlass, Funnel, Eye, X, EnvelopeSimple, PaperPlaneTilt, Clock
} from '@phosphor-icons/react';
import { mockAdminOutreach, mockJobs, mockRecruiters, mockEmailTemplates } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const emailStatusColors = {
  'Sent': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'Delivered': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'Opened': 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  'Replied': 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  'Bounced': 'bg-red-500/10 text-red-600 dark:text-red-400'
};

const AdminOutreach = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showCompose, setShowCompose] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const totalSent = mockAdminOutreach.length;
  const opened = mockAdminOutreach.filter(e => e.status === 'Opened').length;
  const replied = mockAdminOutreach.filter(e => e.status === 'Replied').length;
  const bounced = mockAdminOutreach.filter(e => e.status === 'Bounced').length;

  const filteredEmails = mockAdminOutreach.filter(e => {
    if (searchTerm && !e.to.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !e.candidate.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !e.subject.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (statusFilter !== 'All' && e.status !== statusFilter) return false;
    return true;
  });

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1600px] mx-auto" data-testid="admin-outreach-page">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Outreach / Emails</h1>
              <p className="text-zinc-600 dark:text-zinc-400">Track all outbound email activity</p>
            </div>
            <button onClick={() => setShowCompose(true)} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium" data-testid="compose-email-btn">
              <PaperPlaneTilt size={18} weight="bold" /> Compose
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Sent', value: totalSent, color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Opened', value: opened, color: 'text-purple-600 dark:text-purple-400' },
            { label: 'Replied', value: replied, color: 'text-amber-600 dark:text-amber-400' },
            { label: 'Bounced', value: bounced, color: 'text-red-600 dark:text-red-400' }
          ].map((s, i) => (
            <div key={i} className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input type="text" placeholder="Search recruiter, candidate, subject..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600" data-testid="outreach-search" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none" data-testid="outreach-status-filter">
            <option value="All">All Statuses</option>
            <option value="Sent">Sent</option><option value="Delivered">Delivered</option>
            <option value="Opened">Opened</option><option value="Replied">Replied</option>
            <option value="Bounced">Bounced</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="outreach-table">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">To</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Subject</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Candidate</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Sent</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredEmails.map((email) => (
                  <tr key={email.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors" data-testid={`outreach-row-${email.id}`}>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{email.to}</p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{email.email}</p>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-zinc-700 dark:text-zinc-300 max-w-[200px] truncate">{email.subject}</td>
                    <td className="px-4 py-3.5 text-sm text-zinc-700 dark:text-zinc-300">{email.candidate}</td>
                    <td className="px-4 py-3.5 text-sm text-zinc-500 dark:text-zinc-400">{email.customer}</td>
                    <td className="px-4 py-3.5 text-xs text-zinc-500 dark:text-zinc-400">{email.sentAt}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${emailStatusColors[email.status] || ''}`}>{email.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredEmails.length === 0 && <div className="py-16 text-center text-zinc-500 dark:text-zinc-400">No emails match your filters.</div>}
        </div>
      </div>

      {/* Compose Modal */}
      <AnimatePresence>
        {showCompose && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCompose(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-lg w-full" data-testid="compose-modal">
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Compose Email</h3>
                  <button onClick={() => setShowCompose(false)} className="p-1 text-zinc-400 hover:text-zinc-600"><X size={20} /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1.5">Pick a Job Lead</label>
                    <select value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50" data-testid="compose-job-select">
                      <option value="">Select job lead...</option>
                      {mockJobs.map(j => <option key={j.id} value={j.id}>{j.role_title} - {j.author_company}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1.5">Pick a Candidate</label>
                    <select className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50" data-testid="compose-candidate-select">
                      <option value="">Select candidate...</option>
                      <option>Rajesh Kumar</option><option>Maria Garcia</option><option>David Park</option><option>Priya Sharma</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1.5">Template</label>
                    <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50" data-testid="compose-template-select">
                      <option value="">Select template...</option>
                      {mockEmailTemplates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1.5">Preview</label>
                    <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 h-32 text-sm text-zinc-500 dark:text-zinc-400 italic">
                      Select a job, candidate and template to see preview...
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={() => setShowCompose(false)} className="flex-1 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm">Cancel</button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium" data-testid="send-compose-btn">
                    <PaperPlaneTilt size={16} weight="fill" /> Send
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default AdminOutreach;
