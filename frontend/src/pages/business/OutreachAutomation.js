import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { mockBusinessOutreach, mockEmailTemplates, mockBusinessCandidates } from '../../data/mockData';
import {
  EnvelopeSimple, PaperPlaneTilt, Eye, ArrowClockwise,
  CheckCircle, Clock, MagnifyingGlass, Funnel, Plus, Copy,
  Pause, Play, Lightning, CaretRight
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const emailStatusConfig = {
  'Sent': { bg: 'bg-zinc-500/10', text: 'text-zinc-600 dark:text-zinc-400', icon: PaperPlaneTilt },
  'Opened': { bg: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', icon: Eye },
  'Replied': { bg: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', icon: CheckCircle }
};

const OutreachAutomation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [candidateFilter, setCandidateFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOutreach = useMemo(() => {
    let list = [...mockBusinessOutreach];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(o =>
        o.candidateName.toLowerCase().includes(q) ||
        o.jobTitle.toLowerCase().includes(q) ||
        o.recruiter.toLowerCase().includes(q) ||
        o.company.toLowerCase().includes(q)
      );
    }
    if (candidateFilter !== 'All') {
      list = list.filter(o => o.candidateName === candidateFilter);
    }
    if (statusFilter !== 'All') {
      list = list.filter(o => o.status === statusFilter);
    }
    return list;
  }, [searchTerm, candidateFilter, statusFilter]);

  const outreachStats = useMemo(() => ({
    totalSent: mockBusinessOutreach.length,
    opened: mockBusinessOutreach.filter(o => o.status === 'Opened' || o.status === 'Replied').length,
    replied: mockBusinessOutreach.filter(o => o.replied).length,
    openRate: Math.round((mockBusinessOutreach.filter(o => o.openedDate).length / mockBusinessOutreach.length) * 100),
    replyRate: Math.round((mockBusinessOutreach.filter(o => o.replied).length / mockBusinessOutreach.length) * 100)
  }), []);

  const uniqueCandidates = useMemo(() =>
    [...new Set(mockBusinessOutreach.map(o => o.candidateName))],
  []);

  const automationRules = [
    { id: 1, name: 'Auto-submit approved candidates', description: 'When a candidate is matched and approved, automatically send submission email to the recruiter', triggers: 'Match approved + Resume ready', actions: 'Send "Candidate Submission" template', status: 'active', emailsSent: 34, lastRun: '2 hours ago' },
    { id: 2, name: 'Follow-up after 3 days', description: 'Automatically send a follow-up if no response within 3 business days', triggers: 'Email sent + 3 days no reply', actions: 'Send "Follow-up" template', status: 'active', emailsSent: 18, lastRun: '6 hours ago' },
    { id: 3, name: 'Weekly bench availability blast', description: 'Send weekly update of all available bench candidates to active recruiters', triggers: 'Every Monday 9:00 AM', actions: 'Send bench summary to recruiter list', status: 'paused', emailsSent: 12, lastRun: '1 week ago' },
    { id: 4, name: 'Interview reminder', description: 'Send candidate prep sheet 24 hours before scheduled interview', triggers: 'Interview scheduled - 24 hours', actions: 'Send "Interview Prep" to candidate', status: 'active', emailsSent: 8, lastRun: '1 day ago' }
  ];

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Outreach Command
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Track email campaigns and automate submissions across your entire bench
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Emails Sent', value: outreachStats.totalSent, sub: 'This week', icon: PaperPlaneTilt, color: 'blue' },
            { label: 'Opened', value: outreachStats.opened, sub: `${outreachStats.openRate}% rate`, icon: Eye, color: 'amber' },
            { label: 'Replied', value: outreachStats.replied, sub: `${outreachStats.replyRate}% rate`, icon: CheckCircle, color: 'emerald' },
            { label: 'Candidates Active', value: uniqueCandidates.length, sub: 'In outreach', icon: EnvelopeSimple, color: 'violet' },
            { label: 'Automations', value: automationRules.filter(r => r.status === 'active').length, sub: 'Active rules', icon: Lightning, color: 'rose' }
          ].map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                <div className={`w-8 h-8 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center`}>
                  <stat.icon size={16} className={`text-${stat.color}-600 dark:text-${stat.color}-400`} weight="duotone" />
                </div>
              </div>
              <p className="text-2xl font-semibold font-outfit text-zinc-900 dark:text-zinc-50">{stat.value}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="mb-6 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 p-1 rounded-lg">
            <TabsTrigger value="activity" data-testid="tab-outreach-activity">Activity Log</TabsTrigger>
            <TabsTrigger value="templates" data-testid="tab-outreach-templates">Templates</TabsTrigger>
            <TabsTrigger value="automation" data-testid="tab-outreach-automation">Automation Rules</TabsTrigger>
          </TabsList>

          {/* Activity Log Tab */}
          <TabsContent value="activity">
            {/* Filters */}
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[200px] relative">
                  <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    data-testid="outreach-search-input"
                    placeholder="Search candidate, job, recruiter..."
                    className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <select
                  value={candidateFilter} onChange={(e) => setCandidateFilter(e.target.value)}
                  data-testid="outreach-candidate-filter"
                  className="px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="All">All Candidates</option>
                  {uniqueCandidates.map(name => <option key={name} value={name}>{name}</option>)}
                </select>
                <select
                  value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                  data-testid="outreach-status-filter"
                  className="px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="All">All Statuses</option>
                  <option value="Sent">Sent</option>
                  <option value="Opened">Opened</option>
                  <option value="Replied">Replied</option>
                </select>
                <button data-testid="compose-email-button" className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium">
                  <Plus size={16} weight="bold" />
                  Compose
                </button>
              </div>
            </div>

            {/* Outreach Table */}
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="outreach-table">
                  <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Candidate</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Job / Company</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Recruiter</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Type</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Sent</th>
                      <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {filteredOutreach.map((item) => {
                      const config = emailStatusConfig[item.status] || emailStatusConfig['Sent'];
                      const StatusIcon = config.icon;
                      return (
                        <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors" data-testid={`outreach-row-${item.id}`}>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                {item.candidateName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.candidateName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{item.jobTitle}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.company}</p>
                          </td>
                          <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-400">{item.recruiter}</td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-xs px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">{item.emailType}</span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
                              <StatusIcon size={12} weight="fill" />
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-xs text-zinc-500 dark:text-zinc-400">{item.sentDate}</td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-center gap-1">
                              <button data-testid={`resend-outreach-${item.id}`} className="p-1.5 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors" title="Resend">
                                <ArrowClockwise size={16} />
                              </button>
                              <button data-testid={`view-outreach-${item.id}`} className="p-1.5 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors" title="View">
                                <Eye size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {filteredOutreach.length === 0 && (
                <div className="py-12 text-center text-zinc-500 dark:text-zinc-400">
                  <EnvelopeSimple size={48} className="mx-auto mb-3 opacity-30" />
                  <p>No outreach activity matches your filters</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{mockEmailTemplates.length} templates available</p>
              <button data-testid="create-template-button" className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium">
                <Plus size={16} weight="bold" />
                New Template
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {mockEmailTemplates.map((template) => (
                <motion.div key={template.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  data-testid={`template-card-${template.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold font-outfit text-zinc-900 dark:text-zinc-50 mb-1">{template.name}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">{template.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button data-testid={`copy-template-${template.id}`} className="p-2 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="Copy">
                        <Copy size={18} />
                      </button>
                      <button data-testid={`use-template-${template.id}`} className="px-4 py-2 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                        Use Template
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    <p className="font-medium mb-2">Subject: {template.subject}</p>
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <p className="line-clamp-3 whitespace-pre-line text-xs leading-relaxed">{template.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Automation Rules Tab */}
          <TabsContent value="automation">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{automationRules.length} rules configured</p>
              <button data-testid="create-automation-button" className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium">
                <Plus size={16} weight="bold" />
                New Rule
              </button>
            </div>
            <div className="space-y-4">
              {automationRules.map((rule) => (
                <motion.div key={rule.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
                  data-testid={`automation-rule-${rule.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Lightning size={20} className={rule.status === 'active' ? 'text-amber-500' : 'text-zinc-400'} weight="fill" />
                        <h3 className="text-lg font-semibold font-outfit text-zinc-900 dark:text-zinc-50">{rule.name}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                          rule.status === 'active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/20'
                        }`}>{rule.status}</span>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">{rule.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">Trigger</p>
                          <p className="text-sm text-zinc-900 dark:text-zinc-50">{rule.triggers}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">Action</p>
                          <p className="text-sm text-zinc-900 dark:text-zinc-50">{rule.actions}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">Emails Sent</p>
                          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{rule.emailsSent}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">Last Run</p>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">{rule.lastRun}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      data-testid={`toggle-automation-${rule.id}`}
                      className={`ml-4 p-2.5 rounded-lg transition-colors ${
                        rule.status === 'active' ? 'text-amber-600 hover:bg-amber-500/10' : 'text-emerald-600 hover:bg-emerald-500/10'
                      }`}
                    >
                      {rule.status === 'active' ? <Pause size={22} weight="fill" /> : <Play size={22} weight="fill" />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default OutreachAutomation;
