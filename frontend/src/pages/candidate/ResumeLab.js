import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { mockResumes, mockApplications, mockJobs } from '../../data/mockData';
import { Pagination } from '../../components/Pagination';
import {
  FileText, Download, Upload, Pencil, Trash, Star, StarHalf,
  MagnifyingGlass, Funnel, X, Eye, MagicWand, EnvelopeSimple,
  SlidersHorizontal, CaretDown, CaretUp, Sparkle, Check,
  LinkedinLogo, Briefcase, Info
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Skill Tags with hover expansion ─────────────────────────────────────────
const SkillTags = ({ tags, max = 5 }) => {
  const [showAll, setShowAll] = useState(false);
  const visible = tags.slice(0, max);
  const remaining = tags.length - max;
  return (
    <div className="flex flex-wrap gap-1 relative">
      {visible.map((tag, i) => (
        <span key={i} className="px-1.5 py-0.5 text-[10px] font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
          {tag}
        </span>
      ))}
      {remaining > 0 && (
        <span
          className="px-1.5 py-0.5 text-[10px] font-semibold rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors relative"
          onMouseEnter={() => setShowAll(true)}
          onMouseLeave={() => setShowAll(false)}
        >
          +{remaining}
          <AnimatePresence>
            {showAll && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.96 }}
                transition={{ duration: 0.13 }}
                className="absolute bottom-full left-0 mb-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl p-3 z-50 min-w-[200px]"
              >
                <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-2">All Skills ({tags.length})</p>
                <div className="flex flex-wrap gap-1">
                  {tags.map((t, i) => (
                    <span key={i} className="px-1.5 py-0.5 text-[10px] rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">{t}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </span>
      )}
    </div>
  );
};

// ─── Tooltip wrapper ──────────────────────────────────────────────────────────
const Tooltip = ({ text, children }) => {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex items-center" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-700 text-white text-[11px] rounded-lg whitespace-nowrap z-50 shadow-lg max-w-[240px] text-center leading-relaxed"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

// ─── Preview Modal ────────────────────────────────────────────────────────────
const PreviewModal = ({ resume, onClose }) => {
  if (!resume) return null;
  const usedApps = mockApplications.filter(a => a.resumeVersion === resume.name);
  const atsColor = resume.atsScore >= 90 ? 'text-emerald-600 dark:text-emerald-400' : resume.atsScore >= 80 ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400';
  const atsBg = resume.atsScore >= 90 ? 'bg-emerald-500' : resume.atsScore >= 80 ? 'bg-blue-500' : 'bg-amber-500';

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.18 }}
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-xl max-h-[88vh] overflow-y-auto shadow-2xl"
        data-testid="resume-preview-modal"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <FileText size={22} className="text-blue-600 dark:text-blue-400" weight="duotone" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-outfit font-bold text-zinc-900 dark:text-zinc-50">{resume.name}</h2>
                  {resume.isDefault && (
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-md uppercase tracking-wide">
                      <Star size={9} weight="fill" /> Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{resume.friendlyName}</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{resume.format} · {resume.size} · Updated {resume.updated}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" data-testid="close-preview-modal">
              <X size={18} />
            </button>
          </div>

          {/* ATS score with tooltip (shown here, not in table) */}
          <div className="mb-5 p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">ATS Score</span>
                <Tooltip text="Generic ATS Score — not tailored to a specific job. Use Tailor to get a job-specific score.">
                  <Info size={13} className="text-zinc-400 cursor-help" />
                </Tooltip>
              </div>
              <span className={`text-lg font-bold ${atsColor}`}>{resume.atsScore}<span className="text-xs font-medium text-zinc-400">/100</span></span>
            </div>
            <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${resume.atsScore}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className={`h-full ${atsBg} rounded-full`}
              />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-zinc-400 mb-0.5">Completeness</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${resume.completeness}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{resume.completeness}%</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 mb-0.5">Skills ({resume.tags.length})</p>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{resume.tags.slice(0, 3).join(', ')}...</p>
              </div>
            </div>
          </div>

          {/* All Skills */}
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">All Skills ({resume.tags.length})</p>
            <div className="flex flex-wrap gap-1.5">
              {resume.tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Applications sent with this resume */}
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
              Applications Sent With This Resume ({usedApps.length})
            </p>
            {usedApps.length > 0 ? (
              <div className="space-y-2">
                {usedApps.map(app => (
                  <div key={app.id} className="flex items-center gap-3 p-2.5 bg-zinc-50 dark:bg-zinc-900/60 rounded-lg border border-zinc-100 dark:border-zinc-800">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${app.source === 'LinkedIn' ? 'bg-blue-50 dark:bg-blue-500/10' : 'bg-orange-50 dark:bg-orange-500/10'}`}>
                      {app.source === 'LinkedIn'
                        ? <LinkedinLogo size={12} weight="fill" className="text-blue-600 dark:text-blue-400" />
                        : <Briefcase size={12} weight="duotone" className="text-orange-500 dark:text-orange-400" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">{app.jobTitle}</p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">{app.recruiter} · {app.company}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <EnvelopeSimple size={10} className="text-emerald-500" weight="fill" />
                      <span className="text-[10px] text-zinc-400">{app.sentDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">Not used in any applications yet.</p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-semibold">
              <Download size={14} /> Download
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-xs font-semibold">
              <Pencil size={14} /> Edit Name
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Tailor Modal ─────────────────────────────────────────────────────────────
const TailorModal = ({ resume, onClose }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [step, setStep] = useState('pick'); // 'pick' | 'ready'
  if (!resume) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.18 }}
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl"
        data-testid="tailor-resume-modal"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
                  <MagicWand size={16} className="text-purple-600 dark:text-purple-400" weight="duotone" />
                </div>
                <h2 className="text-base font-outfit font-bold text-zinc-900 dark:text-zinc-50">Tailor Resume</h2>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Tailoring: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{resume.friendlyName}</span>
              </p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <X size={18} />
            </button>
          </div>

          {step === 'pick' && (
            <>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">Select a job from Jobs Explorer to tailor this resume for:</p>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {mockJobs.map(job => (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-150 ${
                      selectedJob?.id === job.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-500/10'
                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/60'
                    }`}
                    data-testid={`tailor-job-${job.id}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{job.role_title}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{job.author_company} · {job.engagement_type} · {job.work_mode}</p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {job.skills.slice(0, 3).map((s, i) => (
                            <span key={i} className="px-1.5 py-0.5 text-[9px] font-medium rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">{s}</span>
                          ))}
                        </div>
                      </div>
                      {selectedJob?.id === job.id && (
                        <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={11} weight="bold" className="text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button onClick={onClose} className="flex-1 py-2 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                  Cancel
                </button>
                <button
                  disabled={!selectedJob}
                  onClick={() => setStep('ready')}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  data-testid="tailor-proceed-btn"
                >
                  <Sparkle size={13} weight="fill" />
                  Tailor Now
                </button>
              </div>
            </>
          )}

          {step === 'ready' && selectedJob && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MagicWand size={30} className="text-purple-600 dark:text-purple-400" weight="duotone" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-2">AI Tailoring — Coming Soon</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 max-w-xs mx-auto">
                We'll automatically rewrite your resume to match:
              </p>
              <p className="text-sm font-semibold text-purple-700 dark:text-purple-400 mb-4">{selectedJob.role_title} at {selectedJob.author_company}</p>
              <div className="grid grid-cols-2 gap-2 mb-5 text-left max-w-xs mx-auto">
                {['Keyword alignment', 'Skills reorder', 'Job-specific ATS score', 'Custom summary'].map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                    <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <Check size={9} weight="bold" className="text-purple-600 dark:text-purple-400" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
              <button onClick={onClose} className="px-6 py-2 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                Got it
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ─── Filter Panel ─────────────────────────────────────────────────────────────
const FilterPanel = ({ filters, setFilters, allTags, onClear }) => {
  const toggle = (tag) => setFilters(p => ({
    ...p,
    tags: p.tags.includes(tag) ? p.tags.filter(t => t !== tag) : [...p.tags, tag]
  }));
  return (
    <div className="space-y-5" data-testid="resume-filter-sidebar">
      {/* Search */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">Search</label>
        <div className="relative">
          <MagnifyingGlass size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Resume name..."
            value={filters.search}
            onChange={e => setFilters(p => ({ ...p, search: e.target.value }))}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            data-testid="resume-search-input"
          />
        </div>
      </div>

      {/* Skills / Tags — dynamic from actual resume data */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">Skills / Tags</label>
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-0.5">
          {allTags.map(tag => (
            <label key={tag} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.tags.includes(tag)}
                onChange={() => toggle(tag)}
                className="w-3.5 h-3.5 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-600"
                data-testid={`filter-tag-${tag.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
              />
              <span className="text-xs text-zinc-700 dark:text-zinc-300">{tag}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Last Updated */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">Last Updated</label>
        <select
          value={filters.dateUpdated}
          onChange={e => setFilters(p => ({ ...p, dateUpdated: e.target.value }))}
          className="w-full px-2 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
          data-testid="filter-date-updated"
        >
          <option value="All">All time</option>
          <option value="This week">This week</option>
          <option value="This month">This month</option>
          <option value="Last 3 months">Last 3 months</option>
        </select>
      </div>

      {/* Default Only */}
      <label className="flex items-center justify-between cursor-pointer">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Default Only</span>
        <div className="relative">
          <input type="checkbox" checked={filters.defaultOnly} onChange={e => setFilters(p => ({ ...p, defaultOnly: e.target.checked }))} className="sr-only peer" data-testid="filter-default-only" />
          <div className="w-9 h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:bg-blue-600 transition-colors" />
          <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform" />
        </div>
      </label>

      {/* ATS Score Range */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
          ATS Score: {filters.atsScoreMin} - {filters.atsScoreMax}
        </label>
        <div className="space-y-2">
          <div>
            <label className="text-[9px] text-zinc-500 dark:text-zinc-400 mb-0.5 block">Min</label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.atsScoreMin}
              onChange={e => setFilters(p => ({ ...p, atsScoreMin: parseInt(e.target.value) }))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              data-testid="filter-ats-min"
            />
          </div>
          <div>
            <label className="text-[9px] text-zinc-500 dark:text-zinc-400 mb-0.5 block">Max</label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.atsScoreMax}
              onChange={e => setFilters(p => ({ ...p, atsScoreMax: parseInt(e.target.value) }))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              data-testid="filter-ats-max"
            />
          </div>
        </div>
      </div>

      {/* Usage Count */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
          Min Usage Count: {filters.usageMin}
        </label>
        <input
          type="range"
          min="0"
          max="20"
          value={filters.usageMin}
          onChange={e => setFilters(p => ({ ...p, usageMin: parseInt(e.target.value) }))}
          className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
          data-testid="filter-usage-min"
        />
      </div>

      {/* File Format */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">File Format</label>
        <select
          value={filters.fileFormat}
          onChange={e => setFilters(p => ({ ...p, fileFormat: e.target.value }))}
          className="w-full px-2 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
          data-testid="filter-file-format"
        >
          <option value="All">All formats</option>
          <option value="PDF">PDF</option>
          <option value="DOCX">DOCX</option>
          <option value="DOC">DOC</option>
        </select>
      </div>

      <button onClick={onClear} className="w-full py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors" data-testid="clear-resume-filters">
        Clear All Filters
      </button>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const EMPTY_FILTERS = { 
  search: '', 
  tags: [], 
  dateUpdated: 'All', 
  defaultOnly: false,
  atsScoreMin: 0,
  atsScoreMax: 100,
  usageMin: 0,
  fileFormat: 'All'
};

const ResumeLab = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sortBy, setSortBy] = useState('Recently Updated');
  const [previewResume, setPreviewResume] = useState(null);
  const [tailorResume, setTailorResume] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [defaultId, setDefaultId] = useState(mockResumes.find(r => r.isDefault)?.id);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Dynamic tags from actual resume data
  const allTags = useMemo(() => [...new Set(mockResumes.flatMap(r => r.tags))].sort(), []);

  const filteredResumes = useMemo(() => {
    let res = mockResumes.filter(r => {
      if (filters.search && !r.name.toLowerCase().includes(filters.search.toLowerCase()) && !r.friendlyName.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.tags.length > 0 && !filters.tags.some(t => r.tags.includes(t))) return false;
      if (filters.defaultOnly && r.id !== defaultId) return false;
      if (r.atsScore < filters.atsScoreMin || r.atsScore > filters.atsScoreMax) return false;
      if (r.usedInApplications < filters.usageMin) return false;
      if (filters.fileFormat !== 'All' && r.format !== filters.fileFormat) return false;
      return true;
    });
    if (sortBy === 'ATS Score') res = [...res].sort((a, b) => b.atsScore - a.atsScore);
    if (sortBy === 'Name') res = [...res].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'Most Used') res = [...res].sort((a, b) => b.usedInApplications - a.usedInApplications);
    return res;
  }, [filters, sortBy, defaultId]);

  // Pagination
  const totalPages = Math.ceil(filteredResumes.length / itemsPerPage);
  const paginatedResumes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredResumes.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredResumes, currentPage, itemsPerPage]);

  const totalApps = mockApplications.length;
  const bestATS = Math.max(...mockResumes.map(r => r.atsScore));
  const totalSkills = allTags.length;
  const masterResume = mockResumes.find(r => r.id === defaultId) || mockResumes[0];

  const activeFilterCount = [
    filters.search, ...filters.tags,
    filters.dateUpdated !== 'All' && filters.dateUpdated,
    filters.defaultOnly && 'default',
    (filters.atsScoreMin > 0 || filters.atsScoreMax < 100) && 'ats',
    filters.usageMin > 0 && 'usage',
    filters.fileFormat !== 'All' && 'format',
  ].filter(Boolean).length;

  return (
    <DashboardLayout userType={user?.type || "candidate"}>
      <div className="max-w-[1600px] mx-auto" data-testid="resume-lab-page">

        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Resume Lab</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Manage {mockResumes.length} resume versions. Default resume is used for automated outreach.</p>
            </div>
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all text-sm font-semibold shadow-sm whitespace-nowrap self-start sm:self-auto"
              data-testid="upload-resume-button"
            >
              <Upload size={16} weight="bold" />
              Upload Resume
            </button>
          </div>
        </motion.div>

        <div className="flex gap-5 items-start">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-52 xl:w-56 flex-shrink-0">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Funnel size={14} weight="bold" className="text-zinc-700 dark:text-zinc-300" />
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded-full">{activeFilterCount}</span>
                  )}
                </div>
              </div>
              <FilterPanel filters={filters} setFilters={setFilters} allTags={allTags} onClear={() => setFilters(EMPTY_FILTERS)} />
            </div>
          </aside>

          {/* Mobile filter drawer */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
                <motion.div
                  initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                  transition={{ type: 'tween', duration: 0.22 }}
                  className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-[#18181b] border-r border-zinc-200 dark:border-zinc-800 z-50 overflow-y-auto p-5 lg:hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">Filters</span>
                    <button onClick={() => setSidebarOpen(false)} className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                      <X size={18} />
                    </button>
                  </div>
                  <FilterPanel filters={filters} setFilters={setFilters} allTags={allTags} onClear={() => { setFilters(EMPTY_FILTERS); setSidebarOpen(false); }} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Master Resume Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 mb-5"
              data-testid="master-resume-stats"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Master Resume Profile</h2>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">Default: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{masterResume.friendlyName}</span></span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Completeness */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">Completeness</span>
                    <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">{masterResume.completeness}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${masterResume.completeness}%` }} transition={{ duration: 0.7, delay: 0.2 }} className="h-full bg-emerald-500 rounded-full" />
                  </div>
                </div>
                {/* Best ATS */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400">Best ATS</span>
                      <Tooltip text="Generic ATS Score — not tailored to a specific job">
                        <Info size={11} className="text-zinc-400 cursor-help" />
                      </Tooltip>
                    </div>
                    <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">{bestATS}/100</span>
                  </div>
                  <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${bestATS}%` }} transition={{ duration: 0.7, delay: 0.25 }} className="h-full bg-blue-500 rounded-full" />
                  </div>
                </div>
                {/* Total Skills */}
                <div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-1.5">Unique Skills</p>
                  <div className="flex flex-wrap gap-0.5">
                    {allTags.slice(0, 8).map((t, i) => (
                      <span key={i} className="px-1 py-0 text-[9px] rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">{t}</span>
                    ))}
                    {totalSkills > 8 && <span className="text-[9px] text-blue-500">+{totalSkills - 8}</span>}
                  </div>
                </div>
                {/* Total Applications Sent */}
                <div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-1.5">Total Apps Sent</p>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{totalApps}</span>
                    <span className="text-[11px] text-zinc-400 pb-0.5">applications</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">across all resume versions</p>
                </div>
              </div>
            </motion.div>

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-3 gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-[#18181b] text-zinc-700 dark:text-zinc-300 hover:border-blue-400 transition-colors"
                >
                  <SlidersHorizontal size={14} />
                  Filters
                  {activeFilterCount > 0 && <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded-full">{activeFilterCount}</span>}
                </button>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">{filteredResumes.length}</span> resumes
                  {activeFilterCount > 0 && (
                    <button onClick={() => setFilters(EMPTY_FILTERS)} className="ml-2 text-xs text-blue-600 dark:text-blue-400 hover:underline">Clear</button>
                  )}
                </p>
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-3 py-1.5 text-xs bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                data-testid="resume-sort-select"
              >
                <option>Recently Updated</option>
                <option>ATS Score</option>
                <option>Name</option>
                <option>Most Used</option>
              </select>
            </div>

            {/* ─── Desktop Table ──────────────────────────── */}
            <div className="hidden sm:block bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="resume-table">
                  <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Resume</th>
                      <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Skills</th>
                      <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Updated</th>
                      <th className="text-center px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {paginatedResumes.map((resume, idx) => {
                      const isDefault = resume.id === defaultId;
                      return (
                        <motion.tr
                          key={resume.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors ${isDefault ? 'bg-amber-50/30 dark:bg-amber-500/5' : ''}`}
                          data-testid={`resume-row-${resume.id}`}
                        >
                          {/* Resume name + friendly name + usage */}
                          <td className="px-4 py-3.5 min-w-[220px]">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isDefault ? 'bg-amber-100 dark:bg-amber-500/15' : 'bg-blue-50 dark:bg-blue-500/10'}`}>
                                <FileText size={18} className={isDefault ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'} weight="duotone" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate max-w-[160px]">{resume.name}</p>
                                  {isDefault && (
                                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-bold bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30 rounded-md uppercase tracking-wide flex-shrink-0" data-testid={`default-badge-${resume.id}`}>
                                      <Star size={8} weight="fill" /> Default
                                    </span>
                                  )}
                                </div>
                                {/* Human-friendly editable name */}
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 italic truncate max-w-[200px]">{resume.friendlyName}</p>
                                <div className="flex items-center gap-3 mt-0.5">
                                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{resume.format} · {resume.size}</span>
                                  {/* Used in X applications */}
                                  <span className={`text-[10px] font-semibold ${resume.usedInApplications > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400 dark:text-zinc-500'}`}>
                                    {resume.usedInApplications > 0
                                      ? `✓ Used in ${resume.usedInApplications} application${resume.usedInApplications > 1 ? 's' : ''}`
                                      : 'Not yet used'
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Skills */}
                          <td className="px-4 py-3.5 min-w-[200px]">
                            <SkillTags tags={resume.tags} max={4} />
                          </td>

                          {/* Updated */}
                          <td className="px-4 py-3.5 min-w-[100px]">
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">{resume.updated}</span>
                          </td>

                          {/* Actions: eye, wand, edit, download, star, trash */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center justify-center gap-0.5">
                              {/* Preview */}
                              <Tooltip text="Preview & Applications">
                                <button
                                  onClick={() => setPreviewResume(resume)}
                                  className="p-1.5 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                                  data-testid={`preview-resume-${resume.id}`}
                                >
                                  <Eye size={16} weight="duotone" />
                                </button>
                              </Tooltip>
                              {/* Tailor */}
                              <Tooltip text="AI Tailor for a job">
                                <button
                                  onClick={() => setTailorResume(resume)}
                                  className="p-1.5 text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-lg transition-colors"
                                  data-testid={`tailor-resume-${resume.id}`}
                                >
                                  <MagicWand size={16} weight="duotone" />
                                </button>
                              </Tooltip>
                              {/* Edit */}
                              <Tooltip text="Edit">
                                <button
                                  className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                  data-testid={`edit-resume-${resume.id}`}
                                >
                                  <Pencil size={16} />
                                </button>
                              </Tooltip>
                              {/* Download */}
                              <Tooltip text="Download">
                                <button
                                  className="p-1.5 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                                  data-testid={`download-resume-${resume.id}`}
                                >
                                  <Download size={16} />
                                </button>
                              </Tooltip>
                              {/* Set Default */}
                              {!isDefault ? (
                                <Tooltip text="Set as Default">
                                  <button
                                    onClick={() => setDefaultId(resume.id)}
                                    className="p-1.5 text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors"
                                    data-testid={`set-default-${resume.id}`}
                                  >
                                    <StarHalf size={16} />
                                  </button>
                                </Tooltip>
                              ) : (
                                <div className="p-1.5 text-amber-500 rounded-lg">
                                  <Star size={16} weight="fill" />
                                </div>
                              )}
                              {/* Delete */}
                              <Tooltip text="Delete">
                                <button
                                  onClick={() => setDeleteConfirm(resume.id)}
                                  className="p-1.5 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                  data-testid={`delete-resume-${resume.id}`}
                                >
                                  <Trash size={16} />
                                </button>
                              </Tooltip>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {filteredResumes.length === 0 && (
                <div className="py-14 text-center">
                  <FileText size={36} className="mx-auto mb-3 text-zinc-300 dark:text-zinc-700" weight="duotone" />
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">No resumes match your filters.</p>
                  <button onClick={() => setFilters(EMPTY_FILTERS)} className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline">Clear filters</button>
                </div>
              )}
              {/* Pagination */}
              {filteredResumes.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredResumes.length}
                />
              )}
            </div>

            {/* ─── Mobile Card List ─────────────────────── */}
            <div className="sm:hidden space-y-3">
              {paginatedResumes.map((resume, idx) => {
                const isDefault = resume.id === defaultId;
                return (
                  <motion.div
                    key={resume.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className={`bg-white dark:bg-[#18181b] border rounded-xl p-4 ${isDefault ? 'border-amber-300 dark:border-amber-500/40' : 'border-zinc-200 dark:border-zinc-800'}`}
                    data-testid={`resume-card-${resume.id}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isDefault ? 'bg-amber-100 dark:bg-amber-500/15' : 'bg-blue-50 dark:bg-blue-500/10'}`}>
                        <FileText size={20} className={isDefault ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'} weight="duotone" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{resume.name}</p>
                              {isDefault && (
                                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30 rounded-md uppercase">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 italic mt-0.5">{resume.friendlyName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] text-zinc-400">{resume.format} · {resume.size} · {resume.updated}</span>
                        </div>
                        <span className={`text-[10px] font-semibold ${resume.usedInApplications > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400'}`}>
                          {resume.usedInApplications > 0 ? `✓ Used in ${resume.usedInApplications} application${resume.usedInApplications > 1 ? 's' : ''}` : 'Not yet used'}
                        </span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <SkillTags tags={resume.tags} max={5} />
                    </div>
                    {/* Action buttons */}
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                      <div className="flex gap-1">
                        <button onClick={() => setPreviewResume(resume)} className="p-2 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                          <Eye size={17} weight="duotone" />
                        </button>
                        <button onClick={() => setTailorResume(resume)} className="p-2 text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-lg transition-colors">
                          <MagicWand size={17} weight="duotone" />
                        </button>
                        <button className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                          <Pencil size={17} />
                        </button>
                        <button className="p-2 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                          <Download size={17} />
                        </button>
                      </div>
                      <div className="flex gap-1">
                        {!isDefault && (
                          <button onClick={() => setDefaultId(resume.id)} className="p-2 text-zinc-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors">
                            <StarHalf size={17} />
                          </button>
                        )}
                        <button onClick={() => setDeleteConfirm(resume.id)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash size={17} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* ─── Modals ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {previewResume && <PreviewModal resume={previewResume} onClose={() => setPreviewResume(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {tailorResume && <TailorModal resume={tailorResume} onClose={() => setTailorResume(null)} />}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowUpload(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl"
              data-testid="upload-resume-modal"
            >
              <div className="flex items-start justify-between mb-5">
                <h3 className="text-xl font-outfit font-bold text-zinc-900 dark:text-zinc-50">Upload Resume</h3>
                <button onClick={() => setShowUpload(false)} className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-10 text-center mb-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer group">
                <Upload size={36} className="mx-auto text-zinc-400 group-hover:text-blue-500 mb-3 transition-colors" />
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Drag and drop your resume, or click to browse</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">PDF, DOCX · Max 5 MB</p>
              </div>
              <div className="mb-5">
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">Friendly Name (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Java — Microservices Focus"
                  className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowUpload(false)} className="flex-1 py-2.5 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium">Cancel</button>
                <button className="flex-1 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-semibold" data-testid="upload-confirm-button">Upload</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              data-testid="delete-confirm-modal"
            >
              <div className="w-10 h-10 bg-red-100 dark:bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                <Trash size={20} className="text-red-600 dark:text-red-400" weight="duotone" />
              </div>
              <h3 className="text-base font-outfit font-bold text-zinc-900 dark:text-zinc-50 mb-2">Delete Resume?</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">This action cannot be undone. The resume will be permanently removed.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium">Cancel</button>
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-semibold" data-testid="confirm-delete-button">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default ResumeLab;
