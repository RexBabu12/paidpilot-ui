import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { mockRecruiters, mockEmailTemplates } from '../../data/mockData';
import { EnvelopeSimple, Phone, LinkedinLogo, MagnifyingGlass, Robot, X, PaperPlaneTilt } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const RecruiterPortal = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [emailPreview, setEmailPreview] = useState(null);

  const filteredRecruiters = mockRecruiters.filter(r =>
    !searchTerm ||
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const template = mockEmailTemplates[0];

  const getEmailPreviewText = (recruiter) => {
    return template.body
      .replace('{{recruiter_name}}', recruiter.name)
      .replace('{{job_title}}', recruiter.commonRoles[0] || 'Position')
      .replace('{{company_name}}', recruiter.company)
      .replace('{{experience}}', '8')
      .replace('{{key_skills}}', recruiter.commonRoles.join(', '))
      .replace('{{highlight_1}}', '10+ years of relevant experience')
      .replace('{{highlight_2}}', 'Strong background in enterprise systems')
      .replace('{{highlight_3}}', 'Excellent communication and leadership skills')
      .replace('{{engagement_type}}', recruiter.engagementPreference)
      .replace('{{availability}}', 'immediately')
      .replace('{{candidate_name}}', 'John Doe');
  };

  return (
    <DashboardLayout userType={user?.type || "candidate"}>
      <div className="max-w-[1600px] mx-auto" data-testid="recruiter-portal-page">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Recruiter Directory
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {mockRecruiters.length} active recruiters. Hover on automate to preview the email template.
          </p>
        </motion.div>

        {/* Search bar */}
        <div className="mb-6 max-w-md">
          <div className="relative">
            <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by name or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
              data-testid="recruiter-search-input"
            />
          </div>
        </div>

        {/* Simple Table */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="recruiter-table">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Recruiter</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Company</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Phone</th>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Email</th>
                  <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">LinkedIn</th>
                  <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Automate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredRecruiters.map((recruiter) => (
                  <tr
                    key={recruiter.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                    data-testid={`recruiter-row-${recruiter.id}`}
                  >
                    {/* Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {recruiter.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-sm text-zinc-900 dark:text-zinc-50">{recruiter.name}</span>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="px-5 py-4 text-sm text-zinc-700 dark:text-zinc-300">{recruiter.company}</td>

                    {/* Phone */}
                    <td className="px-5 py-4">
                      <a href={`tel:${recruiter.phone}`} className="flex items-center gap-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" data-testid={`phone-${recruiter.id}`}>
                        <Phone size={14} weight="fill" className="text-zinc-400" />
                        {recruiter.phone}
                      </a>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4">
                      <a href={`mailto:${recruiter.email}`} className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline" data-testid={`email-${recruiter.id}`}>
                        <EnvelopeSimple size={14} weight="fill" className="flex-shrink-0" />
                        <span className="truncate max-w-[180px]">{recruiter.email}</span>
                      </a>
                    </td>

                    {/* LinkedIn */}
                    <td className="px-5 py-4">
                      <div className="flex justify-center">
                        <a
                          href={recruiter.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-zinc-400 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 rounded-lg transition-colors"
                          data-testid={`linkedin-${recruiter.id}`}
                        >
                          <LinkedinLogo size={20} weight="fill" />
                        </a>
                      </div>
                    </td>

                    {/* Automate */}
                    <td className="px-5 py-4">
                      <div className="flex justify-center relative"
                        onMouseEnter={() => setHoveredRow(recruiter.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <button
                          onClick={() => setEmailPreview(recruiter)}
                          className="p-2 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                          data-testid={`automate-${recruiter.id}`}
                          title="Send email with default resume"
                        >
                          <Robot size={20} weight="duotone" />
                        </button>

                        {/* Hover tooltip preview */}
                        <AnimatePresence>
                          {hoveredRow === recruiter.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 4 }}
                              transition={{ duration: 0.15 }}
                              className="absolute bottom-full right-0 mb-2 w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl p-3 z-50 pointer-events-none"
                            >
                              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">Email Preview</p>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">Subject: Application for {recruiter.commonRoles[0]}</p>
                              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed line-clamp-4">
                                {getEmailPreviewText(recruiter).substring(0, 180)}...
                              </p>
                              <p className="text-[10px] text-blue-600 dark:text-blue-400 mt-1.5">Click to view full template</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredRecruiters.length === 0 && (
            <div className="py-16 text-center text-zinc-500 dark:text-zinc-400">
              No recruiters match your search.
            </div>
          )}
        </div>
      </div>

      {/* Email Preview Modal */}
      <AnimatePresence>
        {emailPreview && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEmailPreview(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-lg w-full"
              data-testid="email-preview-modal"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50">
                    Email to {emailPreview.name}
                  </h3>
                  <button onClick={() => setEmailPreview(null)} className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200" data-testid="close-email-modal">
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3 mb-5">
                  <div>
                    <p className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1">To</p>
                    <p className="text-sm text-zinc-900 dark:text-zinc-50">{emailPreview.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1">Subject</p>
                    <p className="text-sm text-zinc-900 dark:text-zinc-50">
                      Application for {emailPreview.commonRoles[0]} - John Doe
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1">Attachment</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Java_Senior_Developer_v3.pdf (Default Resume)</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-1">Body</p>
                    <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 max-h-60 overflow-y-auto">
                      <pre className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap font-sans leading-relaxed">
                        {getEmailPreviewText(emailPreview)}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium"
                    data-testid="send-email-button"
                  >
                    <PaperPlaneTilt size={16} weight="fill" />
                    Send Email
                  </button>
                  <button
                    onClick={() => setEmailPreview(null)}
                    className="px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm"
                  >
                    Cancel
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

export default RecruiterPortal;
