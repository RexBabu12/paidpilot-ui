import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { Pagination } from '../../components/Pagination';
import {
  MagnifyingGlass, Funnel, ArrowSquareOut, EnvelopeSimple,
  Clock, MapPin, CurrencyDollar, Eye, X, LinkedinLogo,
  Briefcase, SlidersHorizontal, Tag
} from '@phosphor-icons/react';
import { mockJobs } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Constants ───────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 5;

const engagementColors = {
  'C2C':  'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20',
  'W2':   'bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20',
  'Both': 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20',
};
const workModeColors = {
  'Remote': 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20',
  'Hybrid': 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20',
  'Onsite': 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/20',
};
const postTypeColors = {
  'Job Posting':    'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400',
  'Hot Requirement':'bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20',
  'Urgent Hire':   'bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/20',
};

const formatScrapedDate = (iso) => {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return 'Just now';
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? '1 day ago' : `${d} days ago`;
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const EngBadge = ({ type }) => (
  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-md ${engagementColors[type] || ''}`}>
    {type}
  </span>
);
const ModeBadge = ({ mode }) => (
  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-md ${workModeColors[mode] || ''}`}>
    {mode}
  </span>
);
const PostBadge = ({ type }) => (
  <span className={`inline-flex items-center px-1.5 py-0.5 text-[9px] font-semibold rounded ${postTypeColors[type] || postTypeColors['Job Posting']}`}>
    {type}
  </span>
);
const SourceIcon = ({ source }) =>
  source === 'LinkedIn'
    ? <LinkedinLogo size={14} weight="fill" className="text-blue-600 dark:text-blue-400" />
    : <Briefcase size={14} weight="duotone" className="text-orange-500 dark:text-orange-400" />;

// ─── Filter Sidebar ───────────────────────────────────────────────────────────
const FilterPanel = ({ filters, setFilters, onClear }) => {
  const toggle = (key, val) => setFilters(prev => ({
    ...prev,
    [key]: prev[key].includes(val) ? prev[key].filter(v => v !== val) : [...prev[key], val]
  }));

  return (
    <div className="space-y-5" data-testid="jobs-filter-sidebar">
      {/* Keyword */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">Keyword</label>
        <div className="relative">
          <MagnifyingGlass size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Java, AWS, React..."
            value={filters.keyword}
            onChange={e => setFilters(p => ({ ...p, keyword: e.target.value }))}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            data-testid="keyword-search-input"
          />
        </div>
      </div>

      {/* Skills filter */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
          <span className="flex items-center gap-1"><Tag size={10} /> Skill Filter</span>
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g. Java, AWS..."
            value={filters.skillFilter}
            onChange={e => setFilters(p => ({ ...p, skillFilter: e.target.value }))}
            className="w-full pl-3 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            data-testid="skill-filter-input"
          />
        </div>
        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1">Filter by jobs containing this skill</p>
      </div>

      {/* Source */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">Source</label>
        <div className="flex gap-2">
          {['All', 'LinkedIn', 'Dice'].map(src => (
            <button
              key={src}
              onClick={() => setFilters(p => ({ ...p, source: src }))}
              className={`flex-1 py-1 text-xs font-semibold rounded-md border transition-colors ${
                filters.source === src
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-blue-400'
              }`}
              data-testid={`filter-source-${src.toLowerCase()}`}
            >
              {src}
            </button>
          ))}
        </div>
      </div>

      {/* Engagement Type */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">Engagement Type</label>
        <div className="space-y-1.5">
          {['C2C', 'W2', 'Both'].map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.engagementTypes.includes(type)}
                onChange={() => toggle('engagementTypes', type)}
                className="w-3.5 h-3.5 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-600"
                data-testid={`filter-engagement-${type.toLowerCase()}`}
              />
              <span className="text-xs text-zinc-700 dark:text-zinc-300">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Work Mode */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">Work Mode</label>
        <div className="space-y-1.5">
          {['Remote', 'Hybrid', 'Onsite'].map(mode => (
            <label key={mode} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.workModes.includes(mode)}
                onChange={() => toggle('workModes', mode)}
                className="w-3.5 h-3.5 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-blue-600"
                data-testid={`filter-workmode-${mode.toLowerCase()}`}
              />
              <span className="text-xs text-zinc-700 dark:text-zinc-300">{mode}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date Scraped */}
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">Date Scraped</label>
        <select
          value={filters.datePosted}
          onChange={e => setFilters(p => ({ ...p, datePosted: e.target.value }))}
          className="w-full px-2 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
          data-testid="filter-date-posted"
        >
          <option value="All">All time</option>
          <option value="Today">Today</option>
          <option value="Last 3 days">Last 3 days</option>
          <option value="Last 7 days">Last 7 days</option>
        </select>
      </div>

      {/* Toggles */}
      <div className="space-y-3 pt-1">
        {[
          { key: 'hasContact', label: 'Has Contact', testid: 'filter-has-contact' },
          { key: 'ratePresent', label: 'Rate Present', testid: 'filter-rate-present' },
        ].map(({ key, label, testid }) => (
          <label key={key} className="flex items-center justify-between cursor-pointer">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{label}</span>
            <div className="relative">
              <input
                type="checkbox"
                checked={filters[key]}
                onChange={e => setFilters(p => ({ ...p, [key]: e.target.checked }))}
                className="sr-only peer"
                data-testid={testid}
              />
              <div className="w-9 h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:bg-blue-600 transition-colors" />
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform" />
            </div>
          </label>
        ))}
      </div>

      {/* Clear */}
      <button
        onClick={onClear}
        className="w-full py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
        data-testid="clear-all-filters"
      >
        Clear All Filters
      </button>
    </div>
  );
};

// ─── Detail Modal ─────────────────────────────────────────────────────────────
const DetailModal = ({ job, onClose }) => {
  if (!job) return null;
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.18 }}
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        data-testid="job-detail-modal"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0 pr-4">
              <h2 className="text-xl font-outfit font-bold text-zinc-900 dark:text-zinc-50 leading-tight">{job.role_title}</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{job.author_company}</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex-shrink-0" data-testid="close-detail-modal">
              <X size={18} />
            </button>
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            <EngBadge type={job.engagement_type} />
            <ModeBadge mode={job.work_mode} />
            <PostBadge type={job.post_type} />
          </div>

          {/* Key info grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-5 pb-5 border-b border-zinc-100 dark:border-zinc-800">
            {[
              { label: 'Location',   val: job.location },
              { label: 'Rate',       val: job.rate_raw, bold: true },
              { label: 'Visa',       val: job.visa_constraints },
              { label: 'Experience', val: job.experience },
            ].map(({ label, val, bold }) => (
              <div key={label}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-0.5">{label}</p>
                <p className={`text-sm text-zinc-900 dark:text-zinc-50 ${bold ? 'font-bold' : ''}`}>{val}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">Skills Required</p>
            <div className="flex flex-wrap gap-1.5">
              {job.skills.map((s, i) => (
                <span key={i} className="px-2.5 py-1 text-xs rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Matched keyword */}
          {job.matched_keyword && (
            <div className="mb-5 flex items-center gap-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Matched via:</p>
              <span className="px-2.5 py-0.5 text-xs font-mono font-semibold rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                "{job.matched_keyword}"
              </span>
            </div>
          )}

          {/* Raw Post Text */}
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">Raw Post Text</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
              {job.raw_text}
            </p>
          </div>

          {/* Source & Author */}
          <div className="mb-6 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="flex items-center gap-2 mb-3">
              <SourceIcon source={job.source} />
              <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Source & Author — {job.source}</p>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              <div>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Author</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{job.author_name}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Company</p>
                <p className="text-sm text-zinc-900 dark:text-zinc-50">{job.author_company}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Email</p>
                <a href={`mailto:${job.author_email}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  {job.author_email}
                </a>
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Phone</p>
                <a href={`tel:${job.author_phone}`} className="text-sm text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400">
                  {job.author_phone}
                </a>
              </div>
              {job.author_linkedin && (
                <div className="col-span-2">
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500">LinkedIn</p>
                  <a href={job.author_linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                    <LinkedinLogo size={12} weight="fill" />
                    {job.author_linkedin.replace('https://', '')}
                  </a>
                </div>
              )}
              <div>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Scraped</p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">{formatScrapedDate(job.scraped_at)}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-semibold"
              data-testid="modal-apply-btn"
            >
              <EnvelopeSimple size={16} weight="fill" />
              Apply
            </button>
            <a
              href={job.post_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm font-semibold"
              data-testid="modal-view-source"
            >
              <ArrowSquareOut size={16} />
              View Source
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const EMPTY_FILTERS = {
  keyword: '', skillFilter: '', source: 'All',
  engagementTypes: [], workModes: [],
  datePosted: 'All', hasContact: false, ratePresent: false,
};

const JobLeads = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [detailJob, setDetailJob] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('Newest');
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile filter drawer

  const filteredJobs = useMemo(() => {
    let jobs = mockJobs.filter(job => {
      if (filters.keyword && !job.role_title.toLowerCase().includes(filters.keyword.toLowerCase()) &&
          !job.skills.some(s => s.toLowerCase().includes(filters.keyword.toLowerCase()))) return false;
      if (filters.skillFilter && !job.skills.some(s => s.toLowerCase().includes(filters.skillFilter.toLowerCase()))) return false;
      if (filters.source !== 'All' && job.source !== filters.source) return false;
      if (filters.engagementTypes.length > 0 && !filters.engagementTypes.includes(job.engagement_type)) return false;
      if (filters.workModes.length > 0 && !filters.workModes.includes(job.work_mode)) return false;
      if (filters.hasContact && (!job.author_email || !job.author_phone)) return false;
      if (filters.ratePresent && !job.rate_raw) return false;
      return true;
    });
    if (sortBy === 'Highest Rate') jobs = [...jobs].sort((a, b) => (parseInt(b.rate_raw) || 0) - (parseInt(a.rate_raw) || 0));
    if (sortBy === 'Best Match') jobs = [...jobs].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    return jobs;
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const pagedJobs = filteredJobs.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Reset page when filters change
  React.useEffect(() => { setPage(1); }, [filters, sortBy]);

  const activeFilterCount = [
    filters.keyword, filters.skillFilter,
    filters.source !== 'All' && filters.source,
    ...filters.engagementTypes, ...filters.workModes,
    filters.datePosted !== 'All' && filters.datePosted,
    filters.hasContact && 'has-contact',
    filters.ratePresent && 'rate-present',
  ].filter(Boolean).length;

  return (
    <DashboardLayout userType={user?.type || "candidate"}>
      <div className="max-w-[1600px] mx-auto" data-testid="jobs-explorer-page">
        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-5">
          <h1 className="text-3xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Jobs Explorer</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {mockJobs.length} scraped C2C &amp; W2 opportunities — LinkedIn + Dice
          </p>
        </motion.div>

        {/* ── Layout wrapper ─────────────────────────────────────── */}
        <div className="flex gap-5 items-start">

          {/* ── Sidebar (desktop: always visible, mobile: overlay drawer) ── */}
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 xl:w-60 flex-shrink-0">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
                  <Funnel size={15} weight="bold" />
                  <span className="text-sm font-semibold">Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded-full">{activeFilterCount}</span>
                  )}
                </div>
              </div>
              <FilterPanel filters={filters} setFilters={setFilters} onClear={() => setFilters(EMPTY_FILTERS)} />
            </div>
          </aside>

          {/* Mobile filter drawer */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
                <motion.div
                  initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                  transition={{ type: 'tween', duration: 0.22 }}
                  className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-[#18181b] border-r border-zinc-200 dark:border-zinc-800 z-50 overflow-y-auto p-5 lg:hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Funnel size={15} weight="bold" className="text-zinc-700 dark:text-zinc-300" />
                      <span className="font-semibold text-zinc-900 dark:text-zinc-50">Filters</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                      <X size={18} />
                    </button>
                  </div>
                  <FilterPanel filters={filters} setFilters={setFilters} onClear={() => { setFilters(EMPTY_FILTERS); setSidebarOpen(false); }} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ── Main table area ─────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-3 gap-3">
              <div className="flex items-center gap-3">
                {/* Mobile: filter toggle */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-[#18181b] text-zinc-700 dark:text-zinc-300 hover:border-blue-400 transition-colors"
                >
                  <SlidersHorizontal size={14} />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded-full">{activeFilterCount}</span>
                  )}
                </button>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">{filteredJobs.length}</span> results
                  {activeFilterCount > 0 && (
                    <button onClick={() => setFilters(EMPTY_FILTERS)} className="ml-2 text-xs text-blue-600 dark:text-blue-400 hover:underline">
                      Clear filters
                    </button>
                  )}
                </p>
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-3 py-1.5 text-xs bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                data-testid="sort-by-select"
              >
                <option>Newest</option>
                <option>Best Match</option>
                <option>Highest Rate</option>
              </select>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="jobs-table">
                  <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      {['ROLE', 'TYPE', 'LOCATION', 'RATE', 'SKILLS', 'SOURCE', 'SCRAPED', ''].map((col, i) => (
                        <th key={i} className={`px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ${i === 7 ? 'text-center' : 'text-left'}`}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {pagedJobs.map((job, idx) => (
                      <motion.tr
                        key={job.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.04 }}
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group cursor-pointer"
                        data-testid={`job-row-${job.id}`}
                        onClick={() => setDetailJob(job)}
                      >
                        {/* ROLE */}
                        <td className="px-3 py-3.5 min-w-[180px]">
                          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 leading-snug">{job.role_title}</p>
                          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            <PostBadge type={job.post_type} />
                            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate max-w-[100px]">{job.author_company}</span>
                          </div>
                        </td>

                        {/* TYPE */}
                        <td className="px-3 py-3.5 min-w-[90px]">
                          <div className="flex flex-col gap-1">
                            <EngBadge type={job.engagement_type} />
                            <ModeBadge mode={job.work_mode} />
                          </div>
                        </td>

                        {/* LOCATION */}
                        <td className="px-3 py-3.5 min-w-[120px]">
                          <div className="flex items-center gap-1 text-xs text-zinc-700 dark:text-zinc-300">
                            <MapPin size={12} className="text-zinc-400 flex-shrink-0" />
                            <span className="truncate">{job.location}</span>
                          </div>
                        </td>

                        {/* RATE */}
                        <td className="px-3 py-3.5 min-w-[80px]">
                          <div className="flex items-center gap-0.5 text-sm font-bold text-zinc-900 dark:text-zinc-50">
                            {job.rate_raw
                              ? <><CurrencyDollar size={13} className="text-zinc-400 flex-shrink-0" />{job.rate_raw.replace('$', '')}</>
                              : <span className="text-zinc-400 dark:text-zinc-600 font-normal">—</span>
                            }
                          </div>
                        </td>

                        {/* SKILLS — top 3 chips */}
                        <td className="px-3 py-3.5 min-w-[160px]">
                          <div className="flex flex-wrap gap-1">
                            {job.skills.slice(0, 3).map((skill, si) => (
                              <span key={si} className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 3 && (
                              <span className="px-1.5 py-0.5 text-[10px] text-zinc-400 dark:text-zinc-500">+{job.skills.length - 3}</span>
                            )}
                          </div>
                        </td>

                        {/* SOURCE */}
                        <td className="px-3 py-3.5 min-w-[120px]">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <SourceIcon source={job.source} />
                            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{job.source}</span>
                          </div>
                          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate max-w-[110px]">{job.author_name}</p>
                        </td>

                        {/* SCRAPED */}
                        <td className="px-3 py-3.5 min-w-[80px]">
                          <div className="flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                            <Clock size={11} />
                            {formatScrapedDate(job.scraped_at)}
                          </div>
                        </td>

                        {/* ACTIONS */}
                        <td className="px-3 py-3.5">
                          <div className="flex items-center justify-end gap-1" onClick={e => e.stopPropagation()}>
                            <button
                              onClick={e => { e.stopPropagation(); setDetailJob(job); }}
                              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors whitespace-nowrap"
                              data-testid={`apply-btn-${job.id}`}
                            >
                              <EnvelopeSimple size={12} weight="fill" />
                              Apply
                            </button>
                            <a
                              href={job.post_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-md transition-colors"
                              data-testid={`open-source-${job.id}`}
                              title="Open Source Post"
                            >
                              <ArrowSquareOut size={15} />
                            </a>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty state */}
              {filteredJobs.length === 0 && (
                <div className="py-14 text-center">
                  <Briefcase size={36} className="mx-auto mb-3 text-zinc-300 dark:text-zinc-700" />
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">No jobs match your filters.</p>
                  <button onClick={() => setFilters(EMPTY_FILTERS)} className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline">
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden mt-4">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  itemsPerPage={ITEMS_PER_PAGE}
                  totalItems={filteredJobs.length}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {detailJob && <DetailModal job={detailJob} onClose={() => setDetailJob(null)} />}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default JobLeads;
