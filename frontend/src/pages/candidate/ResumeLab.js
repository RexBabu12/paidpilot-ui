import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { FileText, Download, Upload, Pencil, Copy } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const ResumeLab = () => {
  const [resumes] = useState([
    { id: 1, name: 'Java_Senior_Developer_v3.pdf', updated: '2 days ago', tags: ['Java', 'Spring Boot'], score: 95 },
    { id: 2, name: 'React_Frontend_v2.pdf', updated: '1 week ago', tags: ['React', 'TypeScript'], score: 88 },
    { id: 3, name: 'DevOps_Engineer_v1.pdf', updated: '2 weeks ago', tags: ['AWS', 'Kubernetes'], score: 92 }
  ]);

  const [showUpload, setShowUpload] = useState(false);

  return (
    <DashboardLayout userType="candidate">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Resume Lab
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Manage and optimize your resume versions
            </p>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            data-testid="upload-resume-button"
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
          >
            <Upload size={20} weight="bold" />
            Upload Resume
          </button>
        </motion.div>

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
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  >
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

        {/* Resume versions */}
        <div>
          <h2 className="text-2xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
            Resume Versions
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {resumes.map((resume) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ x: 4 }}
                className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
                data-testid={`resume-${resume.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <FileText size={24} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold font-outfit text-zinc-900 dark:text-zinc-50 mb-1 truncate">
                        {resume.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {resume.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                        <span>Updated {resume.updated}</span>
                        <span>•</span>
                        <span>ATS Score: {resume.score}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      data-testid={`download-resume-${resume.id}`}
                      className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-200"
                    >
                      <Download size={20} />
                    </button>
                    <button
                      data-testid={`duplicate-resume-${resume.id}`}
                      className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-200"
                    >
                      <Copy size={20} />
                    </button>
                    <button
                      data-testid={`edit-resume-${resume.id}`}
                      className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-200"
                    >
                      <Pencil size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
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
                  data-testid="cancel-upload-button"
                  className="flex-1 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  data-testid="confirm-upload-button"
                  className="flex-1 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                >
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