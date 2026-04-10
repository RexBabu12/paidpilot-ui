import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockBusinessCandidates, mockBenchStats, mockOutreachLogs } from '../../data/mockData';
import {
  MagnifyingGlass, FileText, Download, Upload, Trash,
  Eye, MagicWand, X, Check, Sparkle, Clock, EnvelopeSimple,
  LinkedinLogo, Briefcase, User, ArrowLeft, Funnel,
  UserCircle, Warning, Info
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const BENCH_REF_DATE = new Date('2025-02-09');
const daysSince = (d) => Math.floor((BENCH_REF_DATE - new Date(d)) / 86400000);

const avatarColors = [
  'bg-blue-600', 'bg-emerald-600', 'bg-violet-600', 'bg-amber-600',
  'bg-rose-600', 'bg-teal-600', 'bg-indigo-600', 'bg-orange-600',
  'bg-cyan-600', 'bg-pink-600'
];
const avatarColor = (id) => avatarColors[(id - 1) % avatarColors.length];
const initials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

// Generate mock resume versions per candidate from their actual data
const generateResumes = (candidate) => {
  const baseSkills = candidate.skills;
  const versions = [
    {
      id: `${candidate.id}-1`,
      name: candidate.resumeFile,
      friendlyName: `${candidate.title} — Primary`,
      format: 'PDF', size: `${Math.floor(180 + candidate.id * 15)} KB`,
      updated: candidate.resumeLastUpdated,
      isDefault: true,
      tags: baseSkills,
      atsScore: Math.min(98, 82 + candidate.id * 2),
      completeness: Math.min(97, 80 + candidate.id * 2),
      uploadedBy: candidate.benchRecruiter,
    }
  ];
  // Add a second version for candidates with more submissions
  if (candidate.totalSubmissions >= 12) {
    versions.push({
      id: `${candidate.id}-2`,
      name: candidate.resumeFile.replace('.pdf', '_v2.pdf').replace('_v3', '_v4').replace('_v4', '_v3'),
      friendlyName: `${candidate.title} — Condensed 1-pager`,
      format: 'PDF', size: `${Math.floor(130 + candidate.id * 8)} KB`,
      updated: 'Dec 2024',
      isDefault: false,
      tags: baseSkills.slice(0, 4),
      atsScore: Math.min(94, 78 + candidate.id),
      completeness: Math.min(90, 74 + candidate.id),
      uploadedBy: candidate.benchRecruiter,
    });
  }
  return versions;
};

// ─── Tooltip ─────────────────────────────────────────────────────────────────
const Tooltip = ({ text, children }) => {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex items-center" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-zinc-900 dark:bg-zinc-700 text-white text-[10px] rounded-lg whitespace-nowrap z-50 shadow-lg max-w-[220px] text-center leading-relaxed pointer-events-none"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

// ─── Skill chips with +N popover ──────────────────────────────────────────────
const SkillTags = ({ tags, max = 4 }) => {
  const [show, setShow] = useState(false);
  const visible = tags.slice(0, max);
  const rest = tags.length - max;
  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((t, i) => (
        <span key={i} className="px-1.5 py-0.5 text-[10px] font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">{t}</span>
      ))}
      {rest > 0 && (
        <span
          className="relative px-1.5 py-0.5 text-[10px] font-semibold rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
          onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
        >
          +{rest}
          <AnimatePresence>
            {show && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
                className="absolute bottom-full left-0 mb-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl p-3 z-50 min-w-[180px]"
              >
                <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">All Skills ({tags.length})</p>
                <div className="flex flex-wrap gap-1">
                  {tags.map((t, i) => <span key={i} className="px-1.5 py-0.5 text-[10px] rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">{t}</span>)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </span>
      )}
    </div>
  );
};

// ─── Preview Modal ────────────────────────────────────────────────────────────
const PreviewModal = ({ resume, candidate, onClose }) => {
  if (!resume || !candidate) return null;
  const usedLogs = mockOutreachLogs.filter(l => l.candidate === candidate.name);
  const atsColor = resume.atsScore >= 90 ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400';
  const atsBg   = resume.atsScore >= 90 ? 'bg-emerald-500' : 'bg-blue-500';

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.18 }}
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-xl max-h-[88vh] overflow-y-auto shadow-2xl"
        data-testid="resume-preview-modal"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${avatarColor(candidate.id)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                {initials(candidate.name)}
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{candidate.name}</p>
                <p className="text-base font-outfit font-bold text-zinc-900 dark:text-zinc-50">{resume.name}</p>
                <p className="text-xs text-zinc-400 italic mt-0.5">{resume.friendlyName}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* ATS + completeness */}
          <div className="mb-5 p-4 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">ATS Score</span>
                <Tooltip text="Generic ATS Score — not tailored to a specific job">
                  <Info size={12} className="text-zinc-400 cursor-help" />
                </Tooltip>
              </div>
              <span className={`text-lg font-bold ${atsColor}`}>{resume.atsScore}<span className="text-xs font-normal text-zinc-400">/100</span></span>
            </div>
            <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden mb-3">
              <motion.div initial={{ width: 0 }} animate={{ width: `${resume.atsScore}%` }} transition={{ duration: 0.7 }}
                className={`h-full ${atsBg} rounded-full`} />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'Completeness', val: `${resume.completeness}%` },
                { label: 'Format', val: resume.format },
                { label: 'File Size', val: resume.size },
              ].map((m, i) => (
                <div key={i} className="bg-white dark:bg-zinc-800/50 rounded-lg p-2">
                  <p className="text-xs font-bold text-zinc-700 dark:text-zinc-200">{m.val}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">Skills ({resume.tags.length})</p>
            <div className="flex flex-wrap gap-1.5">
              {resume.tags.map((t, i) => (
                <span key={i} className="px-2 py-0.5 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 font-medium">{t}</span>
              ))}
            </div>
          </div>

          {/* Outreach sent with this candidate's resume */}
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Outreach Sent for {candidate.name} ({usedLogs.length})
            </p>
            {usedLogs.length > 0 ? (
              <div className="space-y-2">
                {usedLogs.map(log => (
                  <div key={log.id} className="flex items-center gap-3 p-2.5 bg-zinc-50 dark:bg-zinc-900/60 rounded-lg border border-zinc-100 dark:border-zinc-800">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${log.status === 'Bounced' ? 'bg-red-50 dark:bg-red-500/10' : 'bg-emerald-50 dark:bg-emerald-500/10'}`}>
                      <EnvelopeSimple size={12} weight="fill" className={log.status === 'Bounced' ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">{log.job}</p>
                      <p className="text-[10px] text-zinc-400">{log.recruiter} · by {log.actor}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border flex-shrink-0 ${log.status === 'Bounced' ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'}`}>
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic">No outreach sent yet for this candidate.</p>
            )}
          </div>

          <div className="flex gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-semibold">
              <Download size={13} /> Download
            </button>
            <button onClick={onClose} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-xs font-semibold">
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Tailor Modal ─────────────────────────────────────────────────────────────
const TailorModal = ({ resume, candidate, jobs, onClose }) => {
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState('pick');
  if (!resume || !candidate) return null;
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.18 }}
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl"
        data-testid="tailor-modal"
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
                  <MagicWand size={16} className="text-purple-600 dark:text-purple-400" weight="duotone" />
                </div>
                <h2 className="text-base font-outfit font-bold text-zinc-900 dark:text-zinc-50">AI Tailor Resume</h2>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                For <span className="font-semibold text-zinc-700 dark:text-zinc-200">{candidate.name}</span> — {resume.friendlyName}
              </p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <X size={18} />
            </button>
          </div>

          {step === 'pick' && (
            <>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">Pick a job to tailor this resume against:</p>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-0.5">
                {jobs.map(job => (
                  <button key={job.id} onClick={() => setSelected(job)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${selected?.id === job.id ? 'border-purple-500 bg-purple-50 dark:bg-purple-500/10' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/60'}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{job.role_title}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{job.author_company} · {job.engagement_type} · {job.rate_raw}</p>
                      </div>
                      {selected?.id === job.id && (
                        <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                          <Check size={11} weight="bold" className="text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button onClick={onClose} className="flex-1 py-2 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">Cancel</button>
                <button disabled={!selected} onClick={() => setStep('done')}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  <Sparkle size={13} weight="fill" /> Tailor Now
                </button>
              </div>
            </>
          )}

          {step === 'done' && selected && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MagicWand size={30} className="text-purple-600 dark:text-purple-400" weight="duotone" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-1">AI Tailoring — Coming Soon</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Will tailor <span className="font-semibold">{candidate.name}</span>'s resume for:</p>
              <p className="text-sm font-semibold text-purple-700 dark:text-purple-400 mb-4">{selected.role_title} at {selected.author_company}</p>
              <button onClick={onClose} className="px-6 py-2 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">Got it</button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const BusinessResumeLab = () => {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(mockBusinessCandidates[0]?.id);
  const [previewResume, setPreviewResume] = useState(null);
  const [tailorResume, setTailorResume] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [mobileShowList, setMobileShowList] = useState(false);

  const { mockJobs: jobs } = useMemo(() => {
    try { return { mockJobs: require('../../data/mockData').mockJobs }; }
    catch { return { mockJobs: [] }; }
  }, []);

  const filteredCandidates = useMemo(() =>
    mockBusinessCandidates.filter(c =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
    ), [search]);

  const selected = mockBusinessCandidates.find(c => c.id === selectedId) || mockBusinessCandidates[0];
  const resumes = useMemo(() => selected ? generateResumes(selected) : [], [selected]);
  const benchStat = mockBenchStats.find(s => s.candidateId === selected?.id) || {};
  const outreachLogs = mockOutreachLogs.filter(l => l.candidate === selected?.name);
  const idle = daysSince(benchStat.lastActivityDate || '2025-01-01') >= 7;

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto" data-testid="business-resume-lab">

        {/* ── Page Header ──────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Resume Lab</h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {mockBusinessCandidates.length} bench candidates · Select a candidate to manage their resume versions
              </p>
            </div>
            {selected && (
              <button
                onClick={() => setShowUpload(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 active:scale-95 transition-all text-sm font-semibold self-start sm:self-auto"
                data-testid="upload-resume-btn"
              >
                <Upload size={16} weight="bold" />
                Upload for {selected.name.split(' ')[0]}
              </button>
            )}
          </div>
        </motion.div>

        {/* Mobile: show candidate toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileShowList(v => !v)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-semibold text-zinc-800 dark:text-zinc-200"
            data-testid="mobile-candidate-toggle"
          >
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full ${avatarColor(selected?.id)} flex items-center justify-center text-white text-xs font-bold`}>
                {selected ? initials(selected.name) : '?'}
              </div>
              <span>{selected?.name || 'Select candidate'}</span>
            </div>
            <span className="text-xs text-zinc-400 dark:text-zinc-500">{mobileShowList ? 'Hide ▲' : 'Change ▼'}</span>
          </button>
          <AnimatePresence>
            {mobileShowList && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3">
                  <div className="relative mb-2">
                    <MagnifyingGlass size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input type="text" placeholder="Search candidates..." value={search} onChange={e => setSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  </div>
                  <div className="max-h-52 overflow-y-auto space-y-1">
                    {filteredCandidates.map(c => (
                      <button key={c.id} onClick={() => { setSelectedId(c.id); setMobileShowList(false); }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${c.id === selectedId ? 'bg-blue-600 text-white' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>
                        <div className={`w-7 h-7 rounded-full ${avatarColor(c.id)} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>{initials(c.name)}</div>
                        <div className="min-w-0">
                          <p className={`text-xs font-semibold truncate ${c.id === selectedId ? 'text-white' : 'text-zinc-800 dark:text-zinc-200'}`}>{c.name}</p>
                          <p className={`text-[10px] truncate ${c.id === selectedId ? 'text-blue-100' : 'text-zinc-400 dark:text-zinc-500'}`}>{c.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Main two-panel layout ─────────────────────────── */}
        <div className="flex gap-5 items-start">

          {/* ── LEFT: Candidate Picker (desktop always visible) ── */}
          <aside className="hidden lg:flex flex-col w-72 xl:w-80 flex-shrink-0 sticky top-24 max-h-[calc(100vh-7rem)]" data-testid="candidate-picker">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col overflow-hidden h-full">

              {/* Search bar */}
              <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-outfit font-semibold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                    <User size={14} weight="bold" className="text-zinc-500" />
                    Bench Candidates
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-full">
                      {mockBusinessCandidates.length}
                    </span>
                  </h3>
                </div>
                <div className="relative">
                  <MagnifyingGlass size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search by name, title, skill..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    data-testid="candidate-search-input"
                  />
                  {search && (
                    <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                      <X size={12} />
                    </button>
                  )}
                </div>
                {search && (
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1.5">
                    {filteredCandidates.length} of {mockBusinessCandidates.length} candidates
                  </p>
                )}
              </div>

              {/* Candidate list */}
              <div className="flex-1 overflow-y-auto p-2">
                {filteredCandidates.length === 0 ? (
                  <div className="py-8 text-center">
                    <User size={28} className="mx-auto text-zinc-300 dark:text-zinc-700 mb-2" />
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">No candidates found</p>
                    <button onClick={() => setSearch('')} className="mt-1.5 text-xs text-blue-600 dark:text-blue-400 hover:underline">Clear search</button>
                  </div>
                ) : (
                  filteredCandidates.map(c => {
                    const stat = mockBenchStats.find(s => s.candidateId === c.id) || {};
                    const isIdle = daysSince(stat.lastActivityDate || '2025-01-01') >= 7;
                    const isActive = c.id === selectedId;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedId(c.id)}
                        className={`w-full flex items-start gap-3 px-3 py-3 rounded-xl mb-0.5 text-left transition-all duration-150 group ${isActive ? 'bg-blue-600 shadow-sm' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/60'}`}
                        data-testid={`candidate-item-${c.id}`}
                      >
                        {/* Avatar */}
                        <div className={`w-9 h-9 rounded-full ${avatarColor(c.id)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5`}>
                          {initials(c.name)}
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className={`text-sm font-semibold truncate ${isActive ? 'text-white' : 'text-zinc-900 dark:text-zinc-50'}`}>{c.name}</p>
                            {isIdle && (
                              <span className={`flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md ${isActive ? 'bg-white/20 text-white' : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20'}`}>
                                <Warning size={8} weight="fill" /> Idle
                              </span>
                            )}
                          </div>
                          <p className={`text-[11px] truncate mt-0.5 ${isActive ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-400'}`}>{c.title}</p>
                          <div className="flex items-center justify-between mt-1.5">
                            <div className="flex gap-0.5 flex-wrap">
                              {c.skills.slice(0, 2).map((s, i) => (
                                <span key={i} className={`px-1.5 py-0.5 text-[9px] font-medium rounded ${isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'}`}>{s}</span>
                              ))}
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] ${isActive ? 'text-blue-100' : 'text-zinc-400 dark:text-zinc-500'}`}>
                              <EnvelopeSimple size={10} weight="fill" />
                              <span className="font-semibold">{stat.emailsSent || 0}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </aside>

          {/* ── RIGHT: Selected Candidate Resume Content ─────── */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Candidate Profile Header */}
                  <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 mb-5" data-testid="selected-candidate-header">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl ${avatarColor(selected.id)} flex items-center justify-center text-white text-lg font-bold flex-shrink-0`}>
                        {initials(selected.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div>
                            <h2 className="text-xl font-outfit font-bold text-zinc-900 dark:text-zinc-50">{selected.name}</h2>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">{selected.title}</p>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${selected.preferredEngagement === 'C2C' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' : 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20'}`}>
                              {selected.preferredEngagement}
                            </span>
                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${idle ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'}`}>
                              {idle ? '⚠ Idle' : '● Active'}
                            </span>
                          </div>
                        </div>
                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                          <span>📍 {selected.location}</span>
                          <span>💰 {selected.rate}</span>
                          <span>🛂 {selected.visaStatus}</span>
                          <span>⏱ {selected.availability}</span>
                          <span>👤 Managed by {selected.benchRecruiter}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                      {[
                        { label: 'Emails Sent',  value: benchStat.emailsSent   || 0, color: 'text-blue-600 dark:text-blue-400'    },
                        { label: 'Follow-ups',   value: benchStat.followupsSent || 0, color: 'text-violet-600 dark:text-violet-400' },
                        { label: 'Bounced',      value: benchStat.bouncedCount  || 0, color: 'text-red-600 dark:text-red-400'      },
                        { label: 'Resume Versions', value: resumes.length,              color: 'text-zinc-900 dark:text-zinc-50'    },
                      ].map((s, i) => (
                        <div key={i} className="text-center">
                          <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resume table header */}
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      <span className="text-zinc-900 dark:text-zinc-50">{resumes.length}</span> resume version{resumes.length !== 1 ? 's' : ''}
                    </p>
                    <button
                      onClick={() => setShowUpload(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181b] text-zinc-700 dark:text-zinc-300 rounded-lg hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <Upload size={13} /> Add version
                    </button>
                  </div>

                  {/* ── Desktop table ── */}
                  <div className="hidden sm:block bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden mb-5" data-testid="resume-table">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                          <tr>
                            {['Resume', 'Skills', 'Updated', 'Uploaded By', 'Actions'].map((h, i) => (
                              <th key={i} className={`px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ${i === 0 ? 'text-left' : i === 4 ? 'text-center' : 'text-left'}`}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                          {resumes.map((resume, idx) => (
                            <motion.tr
                              key={resume.id}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.06 }}
                              className={`hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors ${resume.isDefault ? 'bg-amber-50/30 dark:bg-amber-500/5' : ''}`}
                              data-testid={`resume-row-${resume.id}`}
                            >
                              {/* Resume name */}
                              <td className="px-4 py-3.5 min-w-[210px]">
                                <div className="flex items-center gap-3">
                                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${resume.isDefault ? 'bg-amber-100 dark:bg-amber-500/15' : 'bg-blue-50 dark:bg-blue-500/10'}`}>
                                    <FileText size={18} className={resume.isDefault ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'} weight="duotone" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate max-w-[150px]">{resume.name}</p>
                                      {resume.isDefault && (
                                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30 rounded-md uppercase flex-shrink-0">
                                          Default
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-zinc-400 italic truncate max-w-[180px]">{resume.friendlyName}</p>
                                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">{resume.format} · {resume.size}</p>
                                  </div>
                                </div>
                              </td>
                              {/* Skills */}
                              <td className="px-4 py-3.5 min-w-[180px]">
                                <SkillTags tags={resume.tags} max={3} />
                              </td>
                              {/* Updated */}
                              <td className="px-4 py-3.5 min-w-[90px]">
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">{resume.updated}</span>
                              </td>
                              {/* Uploaded by */}
                              <td className="px-4 py-3.5 min-w-[110px]">
                                <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">{resume.uploadedBy}</span>
                              </td>
                              {/* Actions */}
                              <td className="px-4 py-3.5">
                                <div className="flex items-center justify-center gap-0.5">
                                  <Tooltip text="Preview & Outreach">
                                    <button onClick={() => setPreviewResume(resume)}
                                      className="p-1.5 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                                      data-testid={`preview-btn-${resume.id}`}>
                                      <Eye size={16} weight="duotone" />
                                    </button>
                                  </Tooltip>
                                  <Tooltip text="AI Tailor for a job">
                                    <button onClick={() => setTailorResume(resume)}
                                      className="p-1.5 text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-lg transition-colors"
                                      data-testid={`tailor-btn-${resume.id}`}>
                                      <MagicWand size={16} weight="duotone" />
                                    </button>
                                  </Tooltip>
                                  <Tooltip text="Download">
                                    <button className="p-1.5 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                                      data-testid={`download-btn-${resume.id}`}>
                                      <Download size={16} />
                                    </button>
                                  </Tooltip>
                                  <Tooltip text="Delete version">
                                    <button onClick={() => setDeleteConfirm(resume.id)}
                                      className="p-1.5 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                      data-testid={`delete-btn-${resume.id}`}>
                                      <Trash size={16} />
                                    </button>
                                  </Tooltip>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* ── Mobile Cards ── */}
                  <div className="sm:hidden space-y-3 mb-5">
                    {resumes.map((resume, idx) => (
                      <motion.div key={resume.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}
                        className={`bg-white dark:bg-[#18181b] border rounded-xl p-4 ${resume.isDefault ? 'border-amber-300 dark:border-amber-500/40' : 'border-zinc-200 dark:border-zinc-800'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${resume.isDefault ? 'bg-amber-100 dark:bg-amber-500/15' : 'bg-blue-50 dark:bg-blue-500/10'}`}>
                            <FileText size={20} className={resume.isDefault ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'} weight="duotone" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{resume.name}</p>
                              {resume.isDefault && <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-500/30 rounded-md uppercase">Default</span>}
                            </div>
                            <p className="text-xs text-zinc-400 italic mt-0.5">{resume.friendlyName}</p>
                            <p className="text-[10px] text-zinc-400 mt-0.5">{resume.format} · {resume.size} · {resume.updated} · by {resume.uploadedBy}</p>
                          </div>
                        </div>
                        <div className="mb-3"><SkillTags tags={resume.tags} max={4} /></div>
                        <div className="flex gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                          <button onClick={() => setPreviewResume(resume)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"><Eye size={14} weight="duotone" /> Preview</button>
                          <button onClick={() => setTailorResume(resume)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold border border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors"><MagicWand size={14} weight="duotone" /> Tailor</button>
                          <button className="flex items-center justify-center p-1.5 border border-zinc-200 dark:border-zinc-700 text-zinc-400 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800"><Download size={14} /></button>
                          <button onClick={() => setDeleteConfirm(resume.id)} className="flex items-center justify-center p-1.5 border border-zinc-200 dark:border-zinc-700 text-zinc-400 rounded-lg hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"><Trash size={14} /></button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Recent outreach for this candidate */}
                  {outreachLogs.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                      className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5" data-testid="candidate-outreach-history">
                      <h3 className="text-sm font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                        Recent Outreach — {selected.name}
                      </h3>
                      <div className="space-y-2">
                        {outreachLogs.map((log, i) => (
                          <div key={log.id} className="flex items-center gap-3 py-2.5 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${log.status === 'Bounced' ? 'bg-red-50 dark:bg-red-500/10' : log.is_followup ? 'bg-violet-50 dark:bg-violet-500/10' : 'bg-blue-50 dark:bg-blue-500/10'}`}>
                              <EnvelopeSimple size={14} weight="duotone" className={log.status === 'Bounced' ? 'text-red-500' : log.is_followup ? 'text-violet-600 dark:text-violet-400' : 'text-blue-600 dark:text-blue-400'} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                                {log.is_followup ? 'Follow-up' : 'Email'} → {log.job}
                              </p>
                              <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{log.recruiter} · by {log.actor}</p>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex-shrink-0 ${log.status === 'Bounced' ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'}`}>
                              {log.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <UserCircle size={52} className="text-zinc-300 dark:text-zinc-700 mb-4" weight="thin" />
                  <p className="text-base font-semibold text-zinc-500 dark:text-zinc-400">Select a candidate</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">Choose from the left panel to view their resume versions</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Modals ────────────────────────────────────────────── */}
      <AnimatePresence>
        {previewResume && <PreviewModal resume={previewResume} candidate={selected} onClose={() => setPreviewResume(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {tailorResume && (
          <TailorModal
            resume={tailorResume} candidate={selected}
            jobs={(() => { try { return require('../../data/mockData').mockJobs; } catch { return []; } })()}
            onClose={() => setTailorResume(null)}
          />
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowUpload(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-xl font-outfit font-bold text-zinc-900 dark:text-zinc-50">Upload Resume</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">for {selected?.name}</p>
                </div>
                <button onClick={() => setShowUpload(false)} className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"><X size={18} /></button>
              </div>
              <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-10 text-center mb-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer group">
                <Upload size={32} className="mx-auto text-zinc-400 group-hover:text-blue-500 mb-3 transition-colors" />
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Drag and drop or click to browse</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">PDF, DOCX · Max 5 MB</p>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">Friendly Name (optional)</label>
                <input type="text" placeholder={`e.g. ${selected?.title} — Condensed`}
                  className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowUpload(false)} className="flex-1 py-2.5 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium">Cancel</button>
                <button className="flex-1 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-semibold">Upload</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
                <Trash size={20} className="text-red-600 dark:text-red-400" weight="duotone" />
              </div>
              <h3 className="text-base font-outfit font-bold text-zinc-900 dark:text-zinc-50 mb-2">Delete Resume Version?</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">This cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-medium">Cancel</button>
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 text-sm font-semibold">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default BusinessResumeLab;
