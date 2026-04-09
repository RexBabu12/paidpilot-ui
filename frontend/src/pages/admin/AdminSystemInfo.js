import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import {
  Robot, EnvelopeSimple, FileText, CurrencyDollar, Database,
  CheckCircle, Warning, XCircle, Clock, ArrowClockwise
} from '@phosphor-icons/react';
import { mockSystemServices } from '../../data/mockData';
import { motion } from 'framer-motion';

const statusIcon = (status) => {
  switch (status) {
    case 'Operational': return <CheckCircle size={20} weight="fill" className="text-emerald-500" />;
    case 'Degraded': return <Warning size={20} weight="fill" className="text-amber-500" />;
    case 'Down': return <XCircle size={20} weight="fill" className="text-red-500" />;
    default: return <CheckCircle size={20} weight="fill" className="text-emerald-500" />;
  }
};

const statusBg = (status) => {
  switch (status) {
    case 'Operational': return 'border-emerald-500/20 bg-emerald-500/5';
    case 'Degraded': return 'border-amber-500/20 bg-amber-500/5';
    case 'Down': return 'border-red-500/20 bg-red-500/5';
    default: return 'border-zinc-200 dark:border-zinc-800';
  }
};

const AdminSystemInfo = () => {
  const services = mockSystemServices;
  const allStatuses = [services.scraper, services.mailService, services.documentEditor, services.llm, services.database];
  const operational = allStatuses.filter(s => s.status === 'Operational').length;

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1600px] mx-auto" data-testid="admin-system-page">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
          <h1 className="text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">System Information</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {operational}/{allStatuses.length} services operational
          </p>
        </motion.div>

        {/* Overall Status Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className={`p-4 rounded-xl border mb-6 ${operational === allStatuses.length ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-amber-500/30 bg-amber-500/5'}`}
          data-testid="overall-status-banner">
          <div className="flex items-center gap-3">
            {operational === allStatuses.length ? <CheckCircle size={24} weight="fill" className="text-emerald-500" /> : <Warning size={24} weight="fill" className="text-amber-500" />}
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {operational === allStatuses.length ? 'All Systems Operational' : 'Some systems may be degraded'}
            </p>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-auto">Last checked: just now</span>
          </div>
        </motion.div>

        {/* Scraper Service */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}
          className={`bg-white dark:bg-[#18181b] border rounded-xl p-5 mb-4 ${statusBg(services.scraper.status)}`} data-testid="service-scraper">
          <div className="flex items-center gap-3 mb-4">
            <Robot size={24} weight="duotone" className="text-blue-600 dark:text-blue-400" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50">{services.scraper.name}</h2>
                {statusIcon(services.scraper.status)}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Uptime: {services.scraper.uptime} | Last check: {services.scraper.lastCheck}</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="text-left px-3 py-2 text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">Portal</th>
                  <th className="text-center px-3 py-2 text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">Status</th>
                  <th className="text-center px-3 py-2 text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">Posts Today</th>
                  <th className="text-center px-3 py-2 text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">Errors</th>
                  <th className="text-left px-3 py-2 text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">Last Run</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {services.scraper.portals.map((p, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2.5 text-sm font-medium text-zinc-900 dark:text-zinc-50">{p.name}</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${
                        p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        p.status === 'Paused' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                        'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                      }`}>{p.status}</span>
                    </td>
                    <td className="px-3 py-2.5 text-center text-sm text-zinc-900 dark:text-zinc-50">{p.postsToday}</td>
                    <td className="px-3 py-2.5 text-center text-sm text-red-500">{p.errors}</td>
                    <td className="px-3 py-2.5 text-sm text-zinc-500 dark:text-zinc-400">{p.lastRun}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mail Service */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          className={`bg-white dark:bg-[#18181b] border rounded-xl p-5 mb-4 ${statusBg(services.mailService.status)}`} data-testid="service-mail">
          <div className="flex items-center gap-3 mb-4">
            <EnvelopeSimple size={24} weight="duotone" className="text-emerald-600 dark:text-emerald-400" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50">{services.mailService.name}</h2>
                {statusIcon(services.mailService.status)}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Uptime: {services.mailService.uptime} | Last check: {services.mailService.lastCheck}</p>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3 mb-4">
            {Object.entries(services.mailService.stats).map(([key, val]) => (
              <div key={key} className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
                <p className={`text-lg font-bold ${key === 'bounced' || key === 'failed' ? 'text-red-500' : key === 'opened' ? 'text-purple-600 dark:text-purple-400' : 'text-zinc-900 dark:text-zinc-50'}`}>{val}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 capitalize">{key}</p>
              </div>
            ))}
          </div>
          <p className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-2">Recent Emails</p>
          <div className="space-y-1.5">
            {services.mailService.recentEmails.slice(0, 4).map((email) => (
              <div key={email.id} className="flex items-center justify-between py-2 px-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                <div>
                  <p className="text-sm text-zinc-900 dark:text-zinc-50">{email.subject}</p>
                  <p className="text-[11px] text-zinc-500">{email.to} | {email.sentAt}</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${
                  email.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                  email.status === 'Opened' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                  email.status === 'Bounced' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                  'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                }`}>{email.status}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Document Editor */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
          className={`bg-white dark:bg-[#18181b] border rounded-xl p-5 mb-4 ${statusBg(services.documentEditor.status)}`} data-testid="service-doceditor">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={24} weight="duotone" className="text-amber-600 dark:text-amber-400" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50">{services.documentEditor.name}</h2>
                {statusIcon(services.documentEditor.status)}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Uptime: {services.documentEditor.uptime} | Last check: {services.documentEditor.lastCheck}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{services.documentEditor.stats.resumesProcessed}</p>
              <p className="text-xs text-zinc-500">Resumes Processed</p>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{services.documentEditor.stats.tailoredToday}</p>
              <p className="text-xs text-zinc-500">Tailored Today</p>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{services.documentEditor.stats.avgProcessingTime}</p>
              <p className="text-xs text-zinc-500">Avg Processing Time</p>
            </div>
          </div>
        </motion.div>

        {/* LLM Service */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
          className={`bg-white dark:bg-[#18181b] border rounded-xl p-5 mb-4 ${statusBg(services.llm.status)}`} data-testid="service-llm">
          <div className="flex items-center gap-3 mb-4">
            <CurrencyDollar size={24} weight="duotone" className="text-purple-600 dark:text-purple-400" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50">{services.llm.name}</h2>
                {statusIcon(services.llm.status)}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Uptime: {services.llm.uptime} | Last check: {services.llm.lastCheck}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">${services.llm.costs.today}</p>
              <p className="text-xs text-zinc-500">Today</p>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">${services.llm.costs.thisWeek}</p>
              <p className="text-xs text-zinc-500">This Week</p>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">${services.llm.costs.thisMonth}</p>
              <p className="text-xs text-zinc-500">This Month</p>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">${services.llm.costs.budget}</p>
              <p className="text-xs text-zinc-500">Budget</p>
            </div>
          </div>
          <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mb-3">
            <div className={`h-full rounded-full ${(services.llm.costs.thisMonth / services.llm.costs.budget) > 0.8 ? 'bg-red-500' : 'bg-blue-500'}`}
              style={{ width: `${(services.llm.costs.thisMonth / services.llm.costs.budget) * 100}%` }} />
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
            {((services.llm.costs.thisMonth / services.llm.costs.budget) * 100).toFixed(1)}% of monthly budget used
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="text-left px-3 py-2 text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">Service</th>
                  <th className="text-center px-3 py-2 text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">Calls</th>
                  <th className="text-center px-3 py-2 text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">Tokens</th>
                  <th className="text-right px-3 py-2 text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {Object.entries(services.llm.usage).map(([key, val]) => (
                  <tr key={key}>
                    <td className="px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                    <td className="px-3 py-2 text-center text-sm text-zinc-700 dark:text-zinc-300">{val.calls}</td>
                    <td className="px-3 py-2 text-center text-sm text-zinc-700 dark:text-zinc-300">{(val.tokens / 1000).toFixed(0)}K</td>
                    <td className="px-3 py-2 text-right text-sm font-semibold text-zinc-900 dark:text-zinc-50">${val.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Database */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
          className={`bg-white dark:bg-[#18181b] border rounded-xl p-5 ${statusBg(services.database.status)}`} data-testid="service-database">
          <div className="flex items-center gap-3 mb-4">
            <Database size={24} weight="duotone" className="text-rose-600 dark:text-rose-400" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50">{services.database.name}</h2>
                {statusIcon(services.database.status)}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Uptime: {services.database.uptime} | Last check: {services.database.lastCheck}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {Object.entries(services.database.stats).map(([key, val]) => (
              <div key={key} className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{val}</p>
                <p className="text-xs text-zinc-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSystemInfo;
