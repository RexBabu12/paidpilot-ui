import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { EnvelopeSimple, Clock, CheckCircle, ArrowClockwise } from '@phosphor-icons/react';
import { mockApplications } from '../../data/mockData';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const Applications = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'Replied':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Follow-up':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Sent':
        return <EnvelopeSimple size={16} weight="fill" />;
      case 'Replied':
        return <CheckCircle size={16} weight="fill" />;
      case 'Follow-up':
        return <ArrowClockwise size={16} weight="fill" />;
      default:
        return <Clock size={16} weight="fill" />;
    }
  };

  return (
    <DashboardLayout userType="candidate">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Applications & Outreach
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Track your job applications and communication
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Sent', value: '18', icon: EnvelopeSimple, color: 'blue' },
            { label: 'Responses', value: '5', icon: CheckCircle, color: 'emerald' },
            { label: 'Follow-ups Due', value: '3', icon: Clock, color: 'amber' },
            { label: 'Response Rate', value: '28%', icon: ArrowClockwise, color: 'purple' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400">
                  {stat.label}
                </p>
                <stat.icon size={20} className={`text-${stat.color}-600 dark:text-${stat.color}-400`} weight="duotone" />
              </div>
              <p className="text-3xl font-semibold font-outfit text-zinc-900 dark:text-zinc-50">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Applications List */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 p-1 rounded-lg">
            <TabsTrigger value="all" data-testid="tab-all">All Applications</TabsTrigger>
            <TabsTrigger value="sent" data-testid="tab-sent">Sent</TabsTrigger>
            <TabsTrigger value="replied" data-testid="tab-replied">Replied</TabsTrigger>
            <TabsTrigger value="followup" data-testid="tab-followup">Follow-up</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {mockApplications.map((app) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ x: 4 }}
                  className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
                  data-testid={`application-${app.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold font-outfit text-zinc-900 dark:text-zinc-50 mb-1">
                        {app.jobTitle}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {app.company} • {app.recruiter}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-xs rounded-full border flex items-center gap-1 ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        {app.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">
                        Sent Date
                      </p>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{app.sentDate}</p>
                    </div>
                    {app.followUpDate && (
                      <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">
                          Follow-up
                        </p>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{app.followUpDate}</p>
                      </div>
                    )}
                    {app.lastResponse && (
                      <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">
                          Last Response
                        </p>
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{app.lastResponse}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">
                        Resume Used
                      </p>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">{app.resumeVersion}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <button
                      data-testid={`view-application-${app.id}`}
                      className="px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors duration-200"
                    >
                      View Details
                    </button>
                    <button
                      data-testid={`send-followup-${app.id}`}
                      className="px-3 py-1.5 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
                    >
                      Send Follow-up
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sent">
            <p className="text-center text-zinc-500 dark:text-zinc-400 py-12">
              Filter showing sent applications
            </p>
          </TabsContent>

          <TabsContent value="replied">
            <p className="text-center text-zinc-500 dark:text-zinc-400 py-12">
              Filter showing applications with replies
            </p>
          </TabsContent>

          <TabsContent value="followup">
            <p className="text-center text-zinc-500 dark:text-zinc-400 py-12">
              Filter showing applications needing follow-up
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Applications;