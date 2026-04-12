import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, Lightning, ArrowsLeftRight, Download } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { mockJobs } from '../../data/mockData';

const ResumeTailoring = () => {
  const { user } = useAuth();
  const [selectedJob] = useState(mockJobs[0]);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <DashboardLayout userType={user?.type || "candidate"}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Resume Tailoring Workspace
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Optimize your resume for specific job opportunities
          </p>
        </motion.div>

        {/* Job Selection */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Selected Job Opportunity
          </h2>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                {selectedJob.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                {selectedJob.company} • {selectedJob.location}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedJob.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-emerald-500">{selectedJob.matchScore}</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Current Match</p>
            </div>
          </div>
        </div>

        {/* Tailoring Options */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center mb-4">
              <Lightning size={24} className="text-blue-600 dark:text-blue-400" weight="duotone" />
            </div>
            <h3 className="text-lg font-semibold font-outfit text-zinc-900 dark:text-zinc-50 mb-2">
              Quick Optimize
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              AI-powered quick optimization to match job requirements
            </p>
            <button
              data-testid="quick-optimize-button"
              className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              Optimize Now
            </button>
          </div>

          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/10 flex items-center justify-center mb-4">
              <ArrowsLeftRight size={24} className="text-emerald-600 dark:text-emerald-400" weight="duotone" />
            </div>
            <h3 className="text-lg font-semibold font-outfit text-zinc-900 dark:text-zinc-50 mb-2">
              Compare Versions
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              See side-by-side comparison of original vs tailored resume
            </p>
            <button
              onClick={() => setShowComparison(!showComparison)}
              data-testid="compare-versions-button"
              className="w-full px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
            >
              {showComparison ? 'Hide' : 'Show'} Comparison
            </button>
          </div>

          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-purple-600/10 dark:bg-purple-500/10 flex items-center justify-center mb-4">
              <FileText size={24} className="text-purple-600 dark:text-purple-400" weight="duotone" />
            </div>
            <h3 className="text-lg font-semibold font-outfit text-zinc-900 dark:text-zinc-50 mb-2">
              Custom Edit
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Manually edit and customize your resume content
            </p>
            <button
              data-testid="custom-edit-button"
              className="w-full px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200"
            >
              Edit Resume
            </button>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">
              Tailored Resume Preview
            </h2>
            <button
              data-testid="download-tailored-resume"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              <Download size={20} weight="bold" />
              Download
            </button>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-8">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">John Candidate</h3>
                <p className="text-zinc-600 dark:text-zinc-400">Senior Java Developer</p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Professional Summary
                </h4>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Experienced Java Developer with 10+ years of expertise in building scalable microservices 
                  and cloud-native applications. Proven track record in Spring Boot, AWS, and Docker containerization. 
                  Strong experience leading development teams and implementing CI/CD pipelines.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Technical Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker', 'Kubernetes', 'REST APIs', 'PostgreSQL'].map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm rounded bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-600/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
                <p className="text-sm">...Additional sections would appear here...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResumeTailoring;