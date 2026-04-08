import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockBusinessCandidates } from '../../data/mockData';
import {
  MagnifyingGlass, Funnel, UserPlus, CaretDown, CaretUp,
  FileText, EnvelopeSimple, Eye, DotsThreeVertical,
  Export, ArrowsClockwise, CheckCircle, Clock, XCircle, Briefcase
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const statusConfig = {
  'Available': { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
  'Submitted': { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/20', dot: 'bg-blue-500' },
  'Interviewing': { bg: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/20', dot: 'bg-amber-500' },
  'Placed': { bg: 'bg-violet-500/10', text: 'text-violet-600 dark:text-violet-400', border: 'border-violet-500/20', dot: 'bg-violet-500' }
};

const CandidateManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  const filteredCandidates = useMemo(() => {
    let list = [...mockBusinessCandidates];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.skills.some(s => s.toLowerCase().includes(q))
      );
    }
    if (statusFilter !== 'All') {
      list = list.filter(c => c.pipelineStatus === statusFilter);
    }
    list.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [searchTerm, statusFilter, sortField, sortDir]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const toggleSelect = (id) => {
    setSelectedCandidates(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map(c => c.id));
    }
  };

  const pipelineCounts = useMemo(() => ({
    All: mockBusinessCandidates.length,
    Available: mockBusinessCandidates.filter(c => c.pipelineStatus === 'Available').length,
    Submitted: mockBusinessCandidates.filter(c => c.pipelineStatus === 'Submitted').length,
    Interviewing: mockBusinessCandidates.filter(c => c.pipelineStatus === 'Interviewing').length,
    Placed: mockBusinessCandidates.filter(c => c.pipelineStatus === 'Placed').length,
  }), []);

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <CaretDown size={12} className="opacity-30" />;
    return sortDir === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />;
  };

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">
                Talent Bench
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                Manage {mockBusinessCandidates.length} candidates across your consultancy pipeline
              </p>
            </div>
            <button
              data-testid="add-candidate-button"
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium text-sm"
            >
              <UserPlus size={18} weight="bold" />
              Add Candidate
            </button>
          </div>
        </motion.div>

        {/* Pipeline Status Tabs */}
        <div className="flex gap-2 mt-6 mb-6 overflow-x-auto pb-1" data-testid="pipeline-tabs">
          {Object.entries(pipelineCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              data-testid={`pipeline-tab-${status.toLowerCase()}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                statusFilter === status
                  ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md'
                  : 'bg-white dark:bg-[#18181b] text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              {status !== 'All' && (
                <span className={`w-2 h-2 rounded-full ${statusFilter === status ? 'bg-white' : statusConfig[status]?.dot || 'bg-zinc-400'}`} />
              )}
              {status}
              <span className={`ml-1 px-1.5 py-0.5 rounded text-xs ${
                statusFilter === status
                  ? 'bg-white/20 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Actions Bar */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="candidate-search-input"
                placeholder="Search by name, title, or skill..."
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition-colors"
              />
            </div>
            {selectedCandidates.length > 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">{selectedCandidates.length} selected</span>
                <button data-testid="bulk-email-button" className="flex items-center gap-1.5 px-3 py-2 text-sm bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                  <EnvelopeSimple size={16} />
                  Bulk Submit
                </button>
                <button data-testid="bulk-export-button" className="flex items-center gap-1.5 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                  <Export size={16} />
                  Export
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Candidates Table */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="candidates-table">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600"
                      data-testid="select-all-checkbox"
                    />
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 cursor-pointer select-none" onClick={() => handleSort('name')}>
                    <span className="flex items-center gap-1">Candidate <SortIcon field="name" /></span>
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Skills</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 cursor-pointer select-none" onClick={() => handleSort('pipelineStatus')}>
                    <span className="flex items-center justify-center gap-1">Status <SortIcon field="pipelineStatus" /></span>
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 cursor-pointer select-none" onClick={() => handleSort('activeSubmissions')}>
                    <span className="flex items-center justify-center gap-1">Submissions <SortIcon field="activeSubmissions" /></span>
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Interviews</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 cursor-pointer select-none" onClick={() => handleSort('rate')}>
                    <span className="flex items-center gap-1">Rate <SortIcon field="rate" /></span>
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Visa</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Manager</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredCandidates.map((candidate) => (
                  <React.Fragment key={candidate.id}>
                    <tr
                      className={`hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer ${expandedRow === candidate.id ? 'bg-zinc-50 dark:bg-zinc-900/30' : ''}`}
                      data-testid={`candidate-row-${candidate.id}`}
                      onClick={() => setExpandedRow(expandedRow === candidate.id ? null : candidate.id)}
                    >
                      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedCandidates.includes(candidate.id)}
                          onChange={() => toggleSelect(candidate.id)}
                          className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-blue-600"
                          data-testid={`select-candidate-${candidate.id}`}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-900 dark:text-zinc-50">{candidate.name}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{candidate.title} | {candidate.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {candidate.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{skill}</span>
                          ))}
                          {candidate.skills.length > 3 && (
                            <span className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">+{candidate.skills.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${statusConfig[candidate.pipelineStatus]?.bg} ${statusConfig[candidate.pipelineStatus]?.text} border ${statusConfig[candidate.pipelineStatus]?.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[candidate.pipelineStatus]?.dot}`} />
                          {candidate.pipelineStatus}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center font-semibold text-zinc-900 dark:text-zinc-50">{candidate.activeSubmissions}</td>
                      <td className="px-4 py-4 text-center font-semibold text-zinc-900 dark:text-zinc-50">{candidate.interviewsScheduled}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400">{candidate.rate}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-xs px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{candidate.visaStatus}</span>
                      </td>
                      <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-400">{candidate.accountManager}</td>
                      <td className="px-4 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <button data-testid={`view-candidate-${candidate.id}`} className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors" title="View Profile">
                            <Eye size={16} />
                          </button>
                          <button data-testid={`resume-candidate-${candidate.id}`} className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors" title="Resumes">
                            <FileText size={16} />
                          </button>
                          <button data-testid={`email-candidate-${candidate.id}`} className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors" title="Submit">
                            <EnvelopeSimple size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* Expanded Row - Submission Pipeline */}
                    <AnimatePresence>
                      {expandedRow === candidate.id && (
                        <tr>
                          <td colSpan="10" className="p-0">
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 py-5 bg-zinc-50/50 dark:bg-zinc-900/30 border-t border-zinc-100 dark:border-zinc-800/50">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                  {/* Candidate Details */}
                                  <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Details</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between"><span className="text-zinc-500 dark:text-zinc-400">Experience</span><span className="text-zinc-900 dark:text-zinc-50 font-medium">{candidate.experience}</span></div>
                                      <div className="flex justify-between"><span className="text-zinc-500 dark:text-zinc-400">Availability</span><span className="text-zinc-900 dark:text-zinc-50 font-medium">{candidate.availability}</span></div>
                                      <div className="flex justify-between"><span className="text-zinc-500 dark:text-zinc-400">Resumes</span><span className="text-zinc-900 dark:text-zinc-50 font-medium">{candidate.resumeVersions} versions</span></div>
                                      <div className="flex justify-between"><span className="text-zinc-500 dark:text-zinc-400">Total Placements</span><span className="text-zinc-900 dark:text-zinc-50 font-medium">{candidate.totalPlacements}</span></div>
                                      <div className="flex justify-between"><span className="text-zinc-500 dark:text-zinc-400">Revenue</span><span className="font-semibold text-emerald-600 dark:text-emerald-400">{candidate.revenue}</span></div>
                                    </div>
                                    {candidate.notes && (
                                      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400 italic border-t border-zinc-200 dark:border-zinc-700 pt-3">{candidate.notes}</p>
                                    )}
                                  </div>
                                  {/* Active Submissions */}
                                  <div className="lg:col-span-2">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Active Submissions</h4>
                                    {candidate.submissions.length > 0 ? (
                                      <div className="space-y-2">
                                        {candidate.submissions.map((sub, idx) => (
                                          <div key={idx} className="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#18181b] rounded-lg border border-zinc-200 dark:border-zinc-800">
                                            <div className="flex items-center gap-3">
                                              <Briefcase size={16} className="text-zinc-400" />
                                              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{sub.job}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                              <span className="text-xs text-zinc-500 dark:text-zinc-400">{sub.date}</span>
                                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                                sub.status === 'Interview' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                                                sub.status === 'Submitted' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                                                sub.status === 'Screening' ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400' :
                                                'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                              }`}>{sub.status}</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-zinc-500 dark:text-zinc-400 py-4 text-center">No active submissions. Candidate is currently placed or on bench.</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCandidates.length === 0 && (
            <div className="py-12 text-center text-zinc-500 dark:text-zinc-400">
              <MagnifyingGlass size={48} className="mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">No candidates found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CandidateManagement;
