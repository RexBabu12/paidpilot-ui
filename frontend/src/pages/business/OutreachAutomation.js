import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { EnvelopeSimple, PaperPlaneTilt, Pause, Play, Eye } from '@phosphor-icons/react';
import { mockEmailTemplates, mockOutreachActivity } from '../../data/mockData';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const OutreachAutomation = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <DashboardLayout userType="business">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Outreach Automation
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Manage email campaigns and automation workflows
          </p>
        </motion.div>

        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="mb-6 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 p-1 rounded-lg">
            <TabsTrigger value="activity" data-testid="tab-activity">Activity Feed</TabsTrigger>
            <TabsTrigger value="templates" data-testid="tab-templates">Templates</TabsTrigger>
            <TabsTrigger value="automation" data-testid="tab-automation">Automation Rules</TabsTrigger>
          </TabsList>

          {/* Activity Feed */}
          <TabsContent value="activity">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400">Emails Sent Today</p>
                  <PaperPlaneTilt size={20} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                </div>
                <p className="text-3xl font-semibold font-outfit text-zinc-900 dark:text-zinc-50">45</p>
                <p className="text-sm text-emerald-500 mt-1">+22% from yesterday</p>
              </div>
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400">Open Rate</p>
                  <Eye size={20} className="text-emerald-600 dark:text-emerald-400" weight="duotone" />
                </div>
                <p className="text-3xl font-semibold font-outfit text-zinc-900 dark:text-zinc-50">68%</p>
                <p className="text-sm text-emerald-500 mt-1">+5% from last week</p>
              </div>
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400">Response Rate</p>
                  <EnvelopeSimple size={20} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                </div>
                <p className="text-3xl font-semibold font-outfit text-zinc-900 dark:text-zinc-50">18%</p>
                <p className="text-sm text-emerald-500 mt-1">+3% from last week</p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {mockOutreachActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900"
                    data-testid={`activity-${activity.id}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <EnvelopeSimple size={20} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                          {activity.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {activity.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                        <span className="font-medium">{activity.candidate}</span> → {activity.job}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-zinc-500 dark:text-zinc-400">To: {activity.recruiter}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Templates */}
          <TabsContent value="templates">
            <div className="grid grid-cols-1 gap-4">
              {mockEmailTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ x: 4 }}
                  className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 transition-all duration-300 hover:shadow-lg cursor-pointer"
                  onClick={() => setSelectedTemplate(template)}
                  data-testid={`template-${template.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold font-outfit text-zinc-900 dark:text-zinc-50 mb-1">
                        {template.name}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        {template.category}
                      </span>
                    </div>
                    <button
                      data-testid={`use-template-${template.id}`}
                      className="px-3 py-1.5 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                    >
                      Use Template
                    </button>
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    <p className="font-medium mb-2">Subject: {template.subject}</p>
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800">
                      <p className="line-clamp-3 whitespace-pre-line">{template.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Automation Rules */}
          <TabsContent value="automation">
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  name: 'Auto-send approved candidates',
                  description: 'Automatically send submission emails when candidates are approved',
                  status: 'active',
                  triggers: 'Candidate status = Approved',
                  actions: 'Send email using "Candidate Submission" template'
                },
                {
                  id: 2,
                  name: 'Follow-up sequence',
                  description: 'Send follow-up after 3 days if no response',
                  status: 'active',
                  triggers: 'Email sent + 3 days with no reply',
                  actions: 'Send follow-up email'
                },
                {
                  id: 3,
                  name: 'Daily lead summary',
                  description: 'Send daily digest of new matching leads',
                  status: 'paused',
                  triggers: 'Every day at 9:00 AM',
                  actions: 'Send summary email to team'
                }
              ].map((rule) => (
                <motion.div
                  key={rule.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
                  data-testid={`automation-rule-${rule.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold font-outfit text-zinc-900 dark:text-zinc-50">
                          {rule.name}
                        </h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          rule.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        }`}>
                          {rule.status}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                        {rule.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">
                            Trigger
                          </p>
                          <p className="text-sm text-zinc-900 dark:text-zinc-50">{rule.triggers}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">
                            Action
                          </p>
                          <p className="text-sm text-zinc-900 dark:text-zinc-50">{rule.actions}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <button
                        data-testid={`toggle-automation-${rule.id}`}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          rule.status === 'active'
                            ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-500/10'
                            : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10'
                        }`}
                      >
                        {rule.status === 'active' ? <Pause size={20} weight="fill" /> : <Play size={20} weight="fill" />}
                      </button>
                    </div>
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