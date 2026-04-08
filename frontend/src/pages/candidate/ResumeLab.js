import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { FileText, Download, Upload, Pencil, Copy, MagnifyingGlass, Funnel, SquaresFour, Rows } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const ResumeLab = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    tags: [],
    atsScore: '0',
    dateUpdated: 'All'
  });
  const [showUpload, setShowUpload] = useState(false);

  const resumes = [
    { id: 1, name: 'Java_Senior_Developer_v3.pdf', updated: '2 days ago', tags: ['Java', 'Spring Boot'], score: 95 },
    { id: 2, name: 'React_Frontend_v2.pdf', updated: '1 week ago', tags: ['React', 'TypeScript'], score: 88 },
    { id: 3, name: 'DevOps_Engineer_v1.pdf', updated: '2 weeks ago', tags: ['AWS', 'Kubernetes'], score: 92 },
    { id: 4, name: 'Full_Stack_Developer.pdf', updated: '1 month ago', tags: ['Java', 'React'], score: 85 },
    { id: 5, name: 'Data_Engineer_v2.pdf', updated: '1 month ago', tags: ['Python', 'AWS'], score: 90 }
  ];

  const handleTagChange = (tag) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  return (
    <DashboardLayout userType="candidate">
      <div className="max-w-[1600px] mx-auto">
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
                Manage and optimize your resume versions.
              </p>
            </div>
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
              data-testid="upload-resume-button"
            >
              <Upload size={20} weight="bold" />
              Upload Resume
            </button>
          </div>
        </motion.div>

        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
                  <Funnel size={18} weight="bold" />
                  <h3 className="font-semibold">Filters</h3>
                </div>
                <button
                  onClick={() => setFilters({ tags: [], atsScore: '0', dateUpdated: 'All' })}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Keyword Search */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Keyword Search
                </label>
                <div className="relative">
                  <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Resume name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                  Tags
                </label>
                <div className="space-y-2">
                  {['Java', 'React', 'Python', 'AWS', 'DevOps'].map((tag) => (
                    <label key={tag} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.tags.includes(tag)}
                        onChange={() => handleTagChange(tag)}
                        className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600 focus:ring-2 focus:ring-blue-600"
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* ATS Score */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Minimum ATS Score
                </label>
                <select
                  value={filters.atsScore}
                  onChange={(e) => setFilters({ ...filters, atsScore: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="0">All Scores</option>
                  <option value="90">90+</option>
                  <option value="80">80+</option>
                  <option value="70">70+</option>
                </select>
              </div>

              {/* Date Updated */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Last Updated
                </label>
                <select
                  value={filters.dateUpdated}
                  onChange={(e) => setFilters({ ...filters, dateUpdated: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="All">All time</option>
                  <option value="This week">This week</option>
                  <option value="This month">This month</option>
                  <option value="Last 3 months">Last 3 months</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Resume completeness */}
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Master Resume Profile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Completeness</span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">85%</span>
                  </div>
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">ATS Score</span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">92/100</span>
                  </div>
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Skills Coverage</span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">18 Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {['Java', 'Spring Boot', 'AWS', 'Docker'].map((skill, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        {skill}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      +14 more
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Showing <span className="font-semibold text-zinc-900 dark:text-zinc-50">{resumes.length}</span> resumes
                </p>
                <select className="px-3 py-1.5 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option>Sort by: Recently Updated</option>
                  <option>Sort by: ATS Score</option>
                  <option>Sort by: Name</option>
                </select>
              </div>
              
              <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-white dark:bg-zinc-700 shadow-sm' : ''}`}
                >
                  <Rows size={18} className={viewMode === 'table' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-600 dark:text-zinc-400'} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-zinc-700 shadow-sm' : ''}`}
                >
                  <SquaresFour size={18} className={viewMode === 'grid' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-600 dark:text-zinc-400'} />
                </button>
              </div>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {resumes.map((resume) => (
                  <motion.div
                    key={resume.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    data-testid={`resume-${resume.id}`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <FileText size={24} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold font-outfit text-zinc-900 dark:text-zinc-50 mb-1 truncate">
                          {resume.name}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Updated {resume.updated}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-500">{resume.score}</div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">ATS Score</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {resume.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <button
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                        data-testid={`download-resume-${resume.id}`}
                      >
                        <Download size={16} />
                        Download
                      </button>
                      <button
                        className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                        data-testid={`duplicate-resume-${resume.id}`}
                      >
                        <Copy size={18} />
                      </button>
                      <button
                        className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                        data-testid={`edit-resume-${resume.id}`}
                      >
                        <Pencil size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Table View */}
            {viewMode === 'table' && (
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                      <tr>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Resume</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Tags</th>
                        <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">ATS Score</th>
                        <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Updated</th>
                        <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {resumes.map((resume) => (
                        <tr key={resume.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                                <FileText size={20} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                              </div>
                              <p className="font-semibold text-zinc-900 dark:text-zinc-50">{resume.name}</p>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-1">
                              {resume.tags.map((tag, idx) => (
                                <span key={idx} className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex justify-center">
                              <div className="text-lg font-bold text-emerald-500">{resume.score}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-400">{resume.updated}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button className="p-1.5 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors">
                                <Download size={18} />
                              </button>
                              <button className="p-1.5 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors">
                                <Copy size={18} />
                              </button>
                              <button className="p-1.5 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors">
                                <Pencil size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upload modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 max-w-lg w-full"
            >
              <h3 className="text-2xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Upload Resume
              </h3>
              <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-12 text-center mb-6">
                <Upload size={48} className="mx-auto text-zinc-400 mb-4" />
                <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                  Drag and drop your resume here, or click to browse
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Supported formats: PDF, DOCX (Max 5MB)
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpload(false)}
                  className="flex-1 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                  Upload
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ResumeLab;
