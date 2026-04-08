import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockTeamMembers, mockBusinessCandidates } from '../../data/mockData';
import {
  Users, UserPlus, EnvelopeSimple, Phone, Briefcase,
  CurrencyDollar, ChartBar, Eye, PencilSimple
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const BusinessTeam = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamStats = {
    totalMembers: mockTeamMembers.length,
    totalCandidates: mockBusinessCandidates.length,
    totalActiveDeals: mockTeamMembers.reduce((s, m) => s + m.activeDeals, 0),
    totalRevenue: '$6.14M'
  };

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                Team Management
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Manage your internal team members and their candidate assignments
              </p>
            </div>
            <button data-testid="invite-member-button" className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium text-sm">
              <UserPlus size={18} weight="bold" />
              Invite Member
            </button>
          </div>
        </motion.div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Team Size', value: teamStats.totalMembers, icon: Users, color: 'blue' },
            { label: 'Managed Candidates', value: teamStats.totalCandidates, icon: Briefcase, color: 'amber' },
            { label: 'Active Deals', value: teamStats.totalActiveDeals, icon: ChartBar, color: 'emerald' },
            { label: 'Total Revenue', value: teamStats.totalRevenue, icon: CurrencyDollar, color: 'violet' }
          ].map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              data-testid={`team-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                <div className={`w-9 h-9 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center`}>
                  <stat.icon size={18} className={`text-${stat.color}-600 dark:text-${stat.color}-400`} weight="duotone" />
                </div>
              </div>
              <p className="text-2xl font-bold font-outfit text-zinc-900 dark:text-zinc-50">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockTeamMembers.map((member, idx) => {
            const assignedCandidates = mockBusinessCandidates.filter(c => c.accountManager === member.name);
            return (
              <motion.div key={member.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                data-testid={`team-member-card-${member.id}`}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold font-outfit text-zinc-900 dark:text-zinc-50">{member.name}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{member.role}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">{member.status} since {member.joinedDate}</span>
                    </div>
                  </div>
                  <button data-testid={`edit-member-${member.id}`} className="p-1.5 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors">
                    <PencilSimple size={16} />
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="text-center p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                    <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{member.activeDeals}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Active</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                    <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{member.closedDeals}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Closed</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{member.revenue}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Revenue</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-center gap-4 mb-5 text-sm text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <EnvelopeSimple size={14} />
                    <span className="truncate">{member.email}</span>
                  </div>
                </div>

                {/* Assigned Candidates */}
                {assignedCandidates.length > 0 && (
                  <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                      Assigned Candidates ({assignedCandidates.length})
                    </p>
                    <div className="space-y-2">
                      {assignedCandidates.map(candidate => (
                        <div key={candidate.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm text-zinc-900 dark:text-zinc-50">{candidate.name}</span>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            candidate.pipelineStatus === 'Available' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                            candidate.pipelineStatus === 'Placed' ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400' :
                            candidate.pipelineStatus === 'Interviewing' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                            'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          }`}>{candidate.pipelineStatus}</span>
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
    </DashboardLayout>
  );
};

export default BusinessTeam;
