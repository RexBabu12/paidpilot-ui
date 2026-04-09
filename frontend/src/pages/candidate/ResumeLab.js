import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockResumes } from '../../data/mockData';
import {
  FileText, Download, Upload, Pencil, Trash, Star, StarHalf,
  MagnifyingGlass, Funnel, Check, X
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_VISIBLE_TAGS = 6;

const SkillTags = ({ tags }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const remaining = tags.length - MAX_VISIBLE_TAGS;

  return (
    <div className="flex flex-wrap gap-1 relative">
      {visibleTags.map((tag, idx) => (
        <span key={idx} className="px-1.5 py-0.5 text-[11px] rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
          {tag}
        </span>
      ))}
      {remaining > 0 && (
        <span
          className="px-1.5 py-0.5 text-[11px] rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 cursor-pointer hover:bg-blue-500/20 transition-colors relative"
          onMouseEnter={() => setShowAll(true)}
          onMouseLeave={() => setShowAll(false)}
        >
          +{remaining} more
          <AnimatePresence>
            {showAll && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute bottom-full left-0 mb-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl p-3 z-50 min-w-[200px]"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">All Skills ({tags.length})</p>
                <div className="flex flex-wrap gap-1">
                  {tags.map((t, i) => (
                    <span key={i} className="px-1.5 py-0.5 text-[11px] rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {t}
                    </span>
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

const ATSScoreBadge = ({ score }) => {
  const color = score >= 90 ? 'text-emerald-500' : score >= 80 ? 'text-blue-500' : score >= 70 ? 'text-amber-500' : 'text-red-500';
  const bg = score >= 90 ? 'bg-emerald-500' : score >= 80 ? 'bg-blue-500' : score >= 70 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
        <div className={`h-full ${bg} rounded-full`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-sm font-bold ${color}`}>{score}</span>
    </div>
  );
};

const ResumeLab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filters, setFilters] = useState({
    tags: [],
    atsScore: '0',
    dateUpdated: 'All',
    defaultOnly: false
  });

  const allTags = [...new Set(mockResumes.flatMap(r => r.tags))].sort();
  const filterTags = ['Java', 'React', 'Python', 'AWS', 'DevOps', '.NET', 'Kubernetes', 'Docker'];

  const filteredResumes = mockResumes.filter(r => {
    if (searchTerm && !r.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filters.tags.length > 0 && !filters.tags.some(t => r.tags.includes(t))) return false;
    if (Number(filters.atsScore) > 0 && r.atsScore < Number(filters.atsScore)) return false;
    if (filters.defaultOnly && !r.isDefault) return false;
    return true;
  });

  const handleTagFilter = (tag) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]
    }));
  };

  return (
    <DashboardLayout userType="candidate">
      <div className="max-w-[1600px] mx-auto" data-testid="resume-lab-page">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Resume Lab
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Manage {mockResumes.length} resume versions. Your default resume is used for automated outreach.
              </p>
            </div>
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 text-sm font-medium"
              data-testid="upload-resume-button"
            >
              <Upload size={18} weight="bold" />
              Upload Resume
            </button>
          </div>
        </motion.div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-60 flex-shrink-0 hidden lg:block">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sticky top-24" data-testid="resume-filter-sidebar">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
                  <Funnel size={18} weight="bold" />
                  <h3 className="font-semibold text-sm">Filters</h3>
                </div>
                <button
                  onClick={() => setFilters({ tags: [], atsScore: '0', dateUpdated: 'All', defaultOnly: false })}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  data-testid="clear-resume-filters"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Search</label>
                <div className="relative">
                  <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Resume name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                    data-testid="resume-search-input"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Skills / Tags</label>
                <div className="space-y-2">
                  {filterTags.map((tag) => (
                    <label key={tag} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.tags.includes(tag)}
                        onChange={() => handleTagFilter(tag)}
                        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                        data-testid={`filter-tag-${tag.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* ATS Score */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Min ATS Score</label>
                <select
                  value={filters.atsScore}
                  onChange={(e) => setFilters({ ...filters, atsScore: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
                  data-testid="filter-ats-score"
                >
                  <option value="0">All Scores</option>
                  <option value="90">90+</option>
                  <option value="80">80+</option>
                  <option value="70">70+</option>
                </select>
              </div>

              {/* Last Updated */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Last Updated</label>
                <select
                  value={filters.dateUpdated}
                  onChange={(e) => setFilters({ ...filters, dateUpdated: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
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
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Default Only</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filters.defaultOnly}
                    onChange={(e) => setFilters({ ...filters, defaultOnly: e.target.checked })}
                    className="sr-only peer"
                    data-testid="filter-default-only"
                  />
                  <div className="w-10 h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500 transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform" />
                </div>
              </label>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Master Resume Stats */}
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 mb-6" data-testid="master-resume-stats">
              <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Master Resume Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">Completeness</span>
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">85%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">Best ATS Score</span>
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">95/100</span>
                  </div>
                  <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">Total Skills</span>
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">{allTags.length} Skills</span>
                  </div>
                  <SkillTags tags={allTags.slice(0, 14)} />
                </div>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Showing <span className="font-semibold text-zinc-900 dark:text-zinc-50">{filteredResumes.length}</span> resumes
              </p>
              <select
                className="px-3 py-1.5 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                data-testid="resume-sort-select"
              >
                <option>Sort by: Recently Updated</option>
                <option>Sort by: ATS Score</option>
                <option>Sort by: Name</option>
              </select>
            </div>

            {/* Resume Table */}
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="resume-table">
                  <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Resume</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Skills</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">ATS Score</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Updated</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {filteredResumes.map((resume) => (
                      <tr key={resume.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors" data-testid={`resume-row-${resume.id}`}>
                        {/* Resume Name */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                              <FileText size={18} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm text-zinc-900 dark:text-zinc-50">{resume.name}</p>
                                {resume.isDefault && (
                                  <span className="flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded" data-testid={`default-badge-${resume.id}`}>
                                    <Star size={10} weight="fill" /> Default
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{resume.format} - {resume.size}</p>
                            </div>
                          </div>
                        </td>

                        {/* Skills */}
                        <td className="px-4 py-3.5">
                          <SkillTags tags={resume.tags} />
                        </td>

                        {/* ATS Score */}
                        <td className="px-4 py-3.5">
                          <div className="flex justify-center">
                            <ATSScoreBadge score={resume.atsScore} />
                          </div>
                        </td>

                        {/* Updated */}
                        <td className="px-4 py-3.5 text-sm text-zinc-600 dark:text-zinc-400">{resume.updated}</td>

                        {/* Actions */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors"
                              data-testid={`edit-resume-${resume.id}`}
                              title="Edit"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors"
                              data-testid={`download-resume-${resume.id}`}
                              title="Download"
                            >
                              <Download size={16} />
                            </button>
                            {!resume.isDefault && (
                              <button
                                className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded transition-colors"
                                data-testid={`set-default-${resume.id}`}
                                title="Set as Default"
                              >
                                <StarHalf size={16} />
                              </button>
                            )}
                            <button
                              onClick={() => setDeleteConfirm(resume.id)}
                              className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors"
                              data-testid={`delete-resume-${resume.id}`}
                              title="Delete"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredResumes.length === 0 && (
                <div className="py-16 text-center text-zinc-500 dark:text-zinc-400">
                  No resumes match your filters.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        <AnimatePresence>
          {showUpload && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowUpload(false)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 max-w-lg w-full"
                data-testid="upload-resume-modal"
              >
                <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Upload Resume</h3>
                <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-10 text-center mb-6">
                  <Upload size={40} className="mx-auto text-zinc-400 mb-3" />
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Drag and drop your resume here, or click to browse</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">PDF, DOCX (Max 5MB)</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowUpload(false)} className="flex-1 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm">Cancel</button>
                  <button className="flex-1 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium" data-testid="upload-confirm-button">Upload</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation */}
        <AnimatePresence>
          {deleteConfirm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 max-w-sm w-full"
                data-testid="delete-confirm-modal"
              >
                <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Delete Resume?</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-5">This action cannot be undone. The resume will be permanently removed.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm">Cancel</button>
                  <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium" data-testid="confirm-delete-button">Delete</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default ResumeLab;
