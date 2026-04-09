import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockTeamMembers, mockBusinessCandidates } from '../../data/mockData';
import {
  Users, UserPlus, EnvelopeSimple, Phone, PencilSimple,
  Briefcase, X, Plus
} from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const roleColors = {
  'Bench Sales Recruiter': 'bg-blue-600 dark:bg-blue-500',
  'Senior Recruiter': 'bg-violet-600 dark:bg-violet-500',
  'Business Development': 'bg-emerald-600 dark:bg-emerald-500',
  'Sales Lead': 'bg-amber-600 dark:bg-amber-500',
  'Account Manager': 'bg-rose-600 dark:bg-rose-500'
};

const BusinessTeam = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', role: 'Bench Sales Recruiter', email: '', phone: '' });

  const groupedByRole = useMemo(() => {
    const groups = {};
    mockTeamMembers.forEach(m => {
      if (!groups[m.role]) groups[m.role] = [];
      groups[m.role].push(m);
    });
    return groups;
  }, []);

  const getCandidatesForMember = (name) => {
    return mockBusinessCandidates.filter(c => c.benchRecruiter === name);
  };

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Team</h1>
              <p className="text-zinc-600 dark:text-zinc-400">Manage your bench recruiters, sales team, and business development</p>
            </div>
            <button onClick={() => setShowAddModal(true)} data-testid="add-team-member-button"
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium text-sm">
              <UserPlus size={18} weight="bold" />Add Member
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Team Size', value: mockTeamMembers.length },
            { label: 'Bench Recruiters', value: mockTeamMembers.filter(m => m.role.includes('Recruiter')).length },
            { label: 'Candidates Managed', value: mockBusinessCandidates.length },
            { label: 'Total Closed Deals', value: mockTeamMembers.reduce((s, m) => s + m.closedDeals, 0) }
          ].map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
              data-testid={`team-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
              <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold font-outfit text-zinc-900 dark:text-zinc-50">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Team by Role */}
        <div className="space-y-6">
          {Object.entries(groupedByRole).map(([role, members]) => (
            <div key={role}>
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">{role} ({members.length})</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {members.map((member, idx) => {
                  const assignedCandidates = getCandidatesForMember(member.name);
                  const colorClass = roleColors[member.role] || 'bg-zinc-600';
                  return (
                    <motion.div key={member.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                      data-testid={`team-member-card-${member.id}`}>
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold font-outfit text-zinc-900 dark:text-zinc-50">{member.name}</h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">{member.role}</p>
                          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">Since {member.joinedDate}</p>
                        </div>
                        <button data-testid={`edit-member-${member.id}`} className="p-1.5 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors">
                          <PencilSimple size={16} />
                        </button>
                      </div>

                      {/* Contact */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-zinc-500 dark:text-zinc-400">
                        <div className="flex items-center gap-1.5"><EnvelopeSimple size={14} /><span className="truncate text-xs">{member.email}</span></div>
                        <div className="flex items-center gap-1.5"><Phone size={14} /><span className="text-xs">{member.phone}</span></div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="text-center p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{member.activeSubmissions}</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">Active</p>
                        </div>
                        <div className="text-center p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{member.closedDeals}</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">Closed</p>
                        </div>
                      </div>

                      {/* Assigned Candidates */}
                      {assignedCandidates.length > 0 && (
                        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Candidates ({assignedCandidates.length})</p>
                          <div className="space-y-1.5">
                            {assignedCandidates.map(c => (
                              <div key={c.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold">
                                    {c.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <span className="text-sm text-zinc-900 dark:text-zinc-50">{c.name}</span>
                                </div>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">{c.totalSubmissions} sent</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Add Member Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)}>
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl"
                onClick={(e) => e.stopPropagation()} data-testid="add-member-modal">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Add Team Member</h3>
                  <button onClick={() => setShowAddModal(false)} className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded"><X size={20} /></button>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Full Name', field: 'name', placeholder: 'John Doe' },
                    { label: 'Email', field: 'email', placeholder: 'john@staffpro.com' },
                    { label: 'Phone', field: 'phone', placeholder: '+1 (555) 123-4567' }
                  ].map(({ label, field, placeholder }) => (
                    <div key={field}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">{label}</label>
                      <input type="text" value={addForm[field]} onChange={(e) => setAddForm(prev => ({ ...prev, [field]: e.target.value }))}
                        data-testid={`add-member-${field}`} placeholder={placeholder}
                        className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Role</label>
                    <select value={addForm.role} onChange={(e) => setAddForm(prev => ({ ...prev, role: e.target.value }))}
                      data-testid="add-member-role"
                      className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600">
                      <option value="Bench Sales Recruiter">Bench Sales Recruiter</option>
                      <option value="Senior Recruiter">Senior Recruiter</option>
                      <option value="Business Development">Business Development</option>
                      <option value="Sales Lead">Sales Lead</option>
                      <option value="Account Manager">Account Manager</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Cancel</button>
                  <button data-testid="submit-add-member" className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                    <Plus size={14} weight="bold" />Add Member
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default BusinessTeam;
