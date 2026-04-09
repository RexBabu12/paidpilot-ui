import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockBusinessCandidates, mockBenchRecruiters } from '../../data/mockData';
import {
  MagnifyingGlass, UserPlus, X, CaretDown, CaretRight,
  EnvelopeSimple, Phone, LinkedinLogo, MapPin, FileText,
  PencilSimple, Briefcase, Clock, GraduationCap, Certificate,
  User, FloppyDisk, Plus
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const CandidateManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [filterRecruiter, setFilterRecruiter] = useState('All');

  const grouped = useMemo(() => {
    let candidates = [...mockBusinessCandidates];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      candidates = candidates.filter(c =>
        c.name.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.skills.some(s => s.toLowerCase().includes(q))
      );
    }
    if (filterRecruiter !== 'All') {
      candidates = candidates.filter(c => c.benchRecruiter === filterRecruiter);
    }
    const groups = {};
    candidates.forEach(c => {
      if (!groups[c.benchRecruiter]) groups[c.benchRecruiter] = [];
      groups[c.benchRecruiter].push(c);
    });
    return groups;
  }, [searchTerm, filterRecruiter]);

  const toggleGroup = (name) => {
    setCollapsedGroups(prev => prev.includes(name) ? prev.filter(g => g !== name) : [...prev, name]);
  };

  const [addForm, setAddForm] = useState({
    name: '', title: '', email: '', phone: '', location: '',
    visaStatus: '', rate: '', availability: '', experience: '',
    skills: '', education: '', certifications: '', linkedIn: '',
    preferredEngagement: 'C2C', preferredWorkMode: 'Remote',
    summary: '', benchRecruiterId: ''
  });

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Candidates</h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1">{mockBusinessCandidates.length} candidates across {mockBenchRecruiters.filter(r => r.role.includes('Recruiter')).length} bench recruiters</p>
            </div>
            <button onClick={() => setShowAddForm(true)} data-testid="add-candidate-button"
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium text-sm">
              <UserPlus size={18} weight="bold" />Add Candidate
            </button>
          </div>
        </motion.div>

        {/* Search & Filter */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mt-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} data-testid="candidate-search-input"
                placeholder="Search by name, title, or skill..."
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
            <select value={filterRecruiter} onChange={(e) => setFilterRecruiter(e.target.value)} data-testid="filter-bench-recruiter"
              className="px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="All">All Recruiters</option>
              {mockBenchRecruiters.filter(r => r.role.includes('Recruiter')).map(r => (
                <option key={r.id} value={r.name}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grouped Candidate List */}
        <div className="space-y-6">
          {Object.entries(grouped).map(([recruiterName, candidates]) => {
            const isCollapsed = collapsedGroups.includes(recruiterName);
            return (
              <div key={recruiterName} className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                <button onClick={() => toggleGroup(recruiterName)} data-testid={`group-toggle-${recruiterName.replace(/\s+/g, '-').toLowerCase()}`}
                  className="w-full flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-left">
                  <div className="flex items-center gap-3">
                    {isCollapsed ? <CaretRight size={18} className="text-zinc-500" /> : <CaretDown size={18} className="text-zinc-500" />}
                    <div className="w-8 h-8 rounded-full bg-violet-600 dark:bg-violet-500 flex items-center justify-center text-white text-xs font-bold">
                      {recruiterName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-50">{recruiterName}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Bench Sales Recruiter | {candidates.length} candidates</p>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {candidates.map((c) => (
                          <div key={c.id} className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors cursor-pointer"
                            onClick={() => { setSelectedCandidate(c); setEditingProfile(false); }}
                            data-testid={`candidate-row-${c.id}`}>
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {c.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="font-semibold text-zinc-900 dark:text-zinc-50">{c.name}</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">{c.title} | {c.location} | {c.visaStatus}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="flex flex-wrap gap-1 max-w-[180px] hidden md:flex">
                                {c.skills.slice(0, 2).map((s, i) => (
                                  <span key={i} className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{s}</span>
                                ))}
                                {c.skills.length > 2 && <span className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">+{c.skills.length - 2}</span>}
                              </div>
                              <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{c.rate}</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">{c.availability}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{c.totalSubmissions}</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">submissions</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {Object.keys(grouped).length === 0 && (
          <div className="py-16 text-center text-zinc-500 dark:text-zinc-400">
            <User size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">No candidates found</p>
            <p className="text-sm">Try adjusting your search or filter</p>
          </div>
        )}

        {/* Full Candidate Profile Modal */}
        <AnimatePresence>
          {selectedCandidate && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setSelectedCandidate(null)}>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()} data-testid="candidate-profile-modal">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white dark:bg-[#18181b] border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                      {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">{selectedCandidate.name}</h2>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{selectedCandidate.title} | Managed by {selectedCandidate.benchRecruiter}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setEditingProfile(!editingProfile)} data-testid="edit-profile-toggle"
                      className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${editingProfile ? 'bg-emerald-600 text-white' : 'text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                      {editingProfile ? <><FloppyDisk size={16} /> Save</> : <><PencilSimple size={16} /> Edit</>}
                    </button>
                    <button onClick={() => setSelectedCandidate(null)} data-testid="close-profile-modal" className="p-2 text-zinc-400 hover:text-zinc-600 rounded-lg"><X size={20} /></button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Submissions', value: selectedCandidate.totalSubmissions },
                      { label: 'Interviews', value: selectedCandidate.totalInterviews },
                      { label: 'Placements', value: selectedCandidate.totalPlacements }
                    ].map((stat, idx) => (
                      <div key={idx} className="text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                        <p className="text-2xl font-bold font-outfit text-zinc-900 dark:text-zinc-50">{stat.value}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Contact & Basic Info */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { icon: EnvelopeSimple, label: 'Email', value: selectedCandidate.email, field: 'email' },
                        { icon: Phone, label: 'Phone', value: selectedCandidate.phone, field: 'phone' },
                        { icon: MapPin, label: 'Location', value: selectedCandidate.location, field: 'location' },
                        { icon: LinkedinLogo, label: 'LinkedIn', value: selectedCandidate.linkedIn, field: 'linkedIn' }
                      ].map(({ icon: Icon, label, value, field }) => (
                        <div key={field} className="flex items-center gap-3">
                          <Icon size={16} className="text-zinc-400 flex-shrink-0" />
                          {editingProfile ? (
                            <input type="text" defaultValue={value} data-testid={`edit-${field}`}
                              className="flex-1 px-3 py-1.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                          ) : (
                            <div><p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{value}</p></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Professional Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { icon: Briefcase, label: 'Experience', value: selectedCandidate.experience, field: 'experience' },
                        { icon: User, label: 'Visa Status', value: selectedCandidate.visaStatus, field: 'visaStatus' },
                        { icon: Clock, label: 'Availability', value: selectedCandidate.availability, field: 'availability' },
                        { icon: Briefcase, label: 'Rate', value: selectedCandidate.rate, field: 'rate' }
                      ].map(({ icon: Icon, label, value, field }) => (
                        <div key={field} className="flex items-center gap-3">
                          <Icon size={16} className="text-zinc-400 flex-shrink-0" />
                          {editingProfile ? (
                            <input type="text" defaultValue={value} data-testid={`edit-${field}`}
                              className="flex-1 px-3 py-1.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                          ) : (
                            <div><p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{value}</p></div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">Engagement:</span>
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${selectedCandidate.preferredEngagement === 'C2C' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'}`}>{selectedCandidate.preferredEngagement}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">Work Mode:</span>
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${selectedCandidate.preferredWorkMode === 'Remote' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>{selectedCandidate.preferredWorkMode}</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 text-sm rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">{skill}</span>
                      ))}
                    </div>
                  </div>

                  {/* Education & Certifications */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3 flex items-center gap-2"><GraduationCap size={14} /> Education</h3>
                      {editingProfile ? (
                        <input type="text" defaultValue={selectedCandidate.education} data-testid="edit-education"
                          className="w-full px-3 py-1.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                      ) : (
                        <p className="text-sm text-zinc-900 dark:text-zinc-50">{selectedCandidate.education}</p>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3 flex items-center gap-2"><Certificate size={14} /> Certifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.certifications.map((cert, idx) => (
                          <span key={idx} className="px-2.5 py-1 text-xs rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">{cert}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Professional Summary</h3>
                    {editingProfile ? (
                      <textarea defaultValue={selectedCandidate.summary} rows={3} data-testid="edit-summary"
                        className="w-full px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none" />
                    ) : (
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{selectedCandidate.summary}</p>
                    )}
                  </div>

                  {/* Resume */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3 flex items-center gap-2"><FileText size={14} /> Resume</h3>
                    <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <div className="flex items-center gap-3">
                        <FileText size={24} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                        <div>
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{selectedCandidate.resumeFile}</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">Last updated: {selectedCandidate.resumeLastUpdated}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button data-testid="edit-resume-button" className="px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">Edit</button>
                        <button data-testid="upload-resume-button" className="px-3 py-1.5 text-xs font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">Upload New</button>
                      </div>
                    </div>
                  </div>

                  {/* Outreach History */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">Submission History</h3>
                    {selectedCandidate.outreach.length > 0 ? (
                      <div className="space-y-2">
                        {selectedCandidate.outreach.map((item) => (
                          <div key={item.id} className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-3">
                              <EnvelopeSimple size={16} className="text-zinc-400" />
                              <div>
                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.job}</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">To: {item.recruiter}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">{item.status}</span>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{item.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-4">No submissions yet</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Candidate Form Modal */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setShowAddForm(false)}>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()} data-testid="add-candidate-modal">
                <div className="sticky top-0 z-10 bg-white dark:bg-[#18181b] border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Add New Candidate</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Fill in all candidate details</p>
                  </div>
                  <button onClick={() => setShowAddForm(false)} className="p-2 text-zinc-400 hover:text-zinc-600 rounded-lg"><X size={20} /></button>
                </div>
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Full Name', field: 'name', placeholder: 'Rajesh Kumar' },
                      { label: 'Job Title', field: 'title', placeholder: 'Senior Java Developer' },
                      { label: 'Email', field: 'email', placeholder: 'rajesh@email.com' },
                      { label: 'Phone', field: 'phone', placeholder: '+1 (555) 123-4567' },
                      { label: 'Location', field: 'location', placeholder: 'Dallas, TX' },
                      { label: 'Visa Status', field: 'visaStatus', placeholder: 'H1B, GC, USC' },
                      { label: 'Hourly Rate', field: 'rate', placeholder: '$85/hr' },
                      { label: 'Availability', field: 'availability', placeholder: 'Immediate' },
                      { label: 'Experience', field: 'experience', placeholder: '10 years' },
                      { label: 'LinkedIn', field: 'linkedIn', placeholder: 'linkedin.com/in/...' }
                    ].map(({ label, field, placeholder }) => (
                      <div key={field}>
                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">{label}</label>
                        <input type="text" value={addForm[field]} onChange={(e) => setAddForm(prev => ({ ...prev, [field]: e.target.value }))}
                          data-testid={`add-${field}`} placeholder={placeholder}
                          className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Skills (comma separated)</label>
                    <input type="text" value={addForm.skills} onChange={(e) => setAddForm(prev => ({ ...prev, skills: e.target.value }))}
                      data-testid="add-skills" placeholder="Java, Spring Boot, AWS, Docker"
                      className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Education</label>
                      <input type="text" value={addForm.education} onChange={(e) => setAddForm(prev => ({ ...prev, education: e.target.value }))}
                        data-testid="add-education" placeholder="M.S. Computer Science, UT Dallas"
                        className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Certifications</label>
                      <input type="text" value={addForm.certifications} onChange={(e) => setAddForm(prev => ({ ...prev, certifications: e.target.value }))}
                        data-testid="add-certifications" placeholder="AWS Solutions Architect"
                        className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Preferred Engagement</label>
                      <select value={addForm.preferredEngagement} onChange={(e) => setAddForm(prev => ({ ...prev, preferredEngagement: e.target.value }))}
                        data-testid="add-preferredEngagement"
                        className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
                        <option value="C2C">C2C</option><option value="W2">W2</option><option value="Both">Both</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Work Mode</label>
                      <select value={addForm.preferredWorkMode} onChange={(e) => setAddForm(prev => ({ ...prev, preferredWorkMode: e.target.value }))}
                        data-testid="add-preferredWorkMode"
                        className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
                        <option value="Remote">Remote</option><option value="Hybrid">Hybrid</option><option value="Onsite">Onsite</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Assign to Bench Recruiter</label>
                    <select value={addForm.benchRecruiterId} onChange={(e) => setAddForm(prev => ({ ...prev, benchRecruiterId: e.target.value }))}
                      data-testid="add-benchRecruiterId"
                      className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
                      <option value="">Select recruiter...</option>
                      {mockBenchRecruiters.filter(r => r.role.includes('Recruiter')).map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Professional Summary</label>
                    <textarea value={addForm.summary} onChange={(e) => setAddForm(prev => ({ ...prev, summary: e.target.value }))}
                      data-testid="add-summary" rows={3} placeholder="Brief professional summary..."
                      className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none" />
                  </div>
                  <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <button onClick={() => setShowAddForm(false)} className="px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50">Cancel</button>
                    <button data-testid="submit-add-candidate" className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                      <Plus size={16} weight="bold" />Add Candidate
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default CandidateManagement;
