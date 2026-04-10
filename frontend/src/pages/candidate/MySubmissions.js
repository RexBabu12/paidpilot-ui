import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Target, EnvelopeSimple, Calendar, FileText, MapPin, CurrencyDollar, Buildings, User, FunnelSimple } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { mockBenchSubmissions } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const StatCard = ({ icon: Icon, label, value, color, bgColor, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
  >
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center`}>
        <Icon size={20} weight="duotone" className={color} />
      </div>
    </div>
    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-0.5">{value}</p>
    <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</p>
  </motion.div>
);

const MySubmissions = () => {
  const { user } = useAuth();
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Filter submissions
  const filteredSubmissions = filterStatus === 'all' 
    ? mockBenchSubmissions 
    : mockBenchSubmissions.filter(s => s.status.toLowerCase() === filterStatus.toLowerCase());

  const totalSubmissions = mockBenchSubmissions.length;
  const sentCount = mockBenchSubmissions.filter(s => s.status === 'Sent').length;

  return (
    <DashboardLayout userType="bench">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <Target size={24} weight="duotone" className="text-violet-600 dark:text-violet-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">
              My Submissions
            </h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Applications submitted on your behalf by <span className="font-semibold text-violet-600 dark:text-violet-400">{user?.assignedRecruiter || 'your recruiter'}</span>.
          </p>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <StatCard
            icon={Target}
            label="Total Submissions"
            value={totalSubmissions}
            color="text-violet-600 dark:text-violet-400"
            bgColor="bg-violet-100 dark:bg-violet-500/10"
            delay={0}
          />
          <StatCard
            icon={EnvelopeSimple}
            label="Applications Sent"
            value={sentCount}
            color="text-emerald-600 dark:text-emerald-400"
            bgColor="bg-emerald-100 dark:bg-emerald-500/10"
            delay={0.05}
          />
        </div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-6"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <FunnelSimple size={18} className="text-zinc-500 dark:text-zinc-400" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Filter:</span>
            </div>
            {['all', 'sent'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  filterStatus === status
                    ? 'bg-violet-600 dark:bg-violet-500 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Submissions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Job Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Company
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Rate / Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Submitted By
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((submission, idx) => (
                    <tr
                      key={submission.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                            {submission.jobTitle}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Buildings size={14} className="text-zinc-400" />
                          <span className="text-sm text-zinc-700 dark:text-zinc-300">
                            {submission.company}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-zinc-400" />
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            {submission.location}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CurrencyDollar size={14} className="text-emerald-600 dark:text-emerald-400" />
                          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                            {submission.rate}
                          </span>
                          <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border ${
                            submission.type === 'C2C'
                              ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20'
                              : submission.type === 'W2'
                              ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20'
                              : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
                          }`}>
                            {submission.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-xs">
                            {submission.submittedBy.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm text-zinc-700 dark:text-zinc-300">
                            {submission.submittedBy}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-zinc-400" />
                          <span className="text-xs text-zinc-600 dark:text-zinc-400">
                            {new Date(submission.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                          submission.status === 'Sent'
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                        }`}>
                          {submission.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                          <Target size={32} className="text-zinc-400" weight="duotone" />
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">No submissions found with the current filter.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Resume Used Info */}
        {filteredSubmissions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <FileText size={18} className="text-blue-600 dark:text-blue-400 mt-0.5" weight="duotone" />
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">Resume Used</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Your assigned recruiter uses the resumes from your Resume Lab. Make sure to keep them updated for best results.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MySubmissions;
