import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import {
  Briefcase, UsersThree, EnvelopeSimple, ChartLineUp, ArrowUp, ArrowDown,
  Clock, Lightning, Warning, CheckCircle, Database, CurrencyDollar, Robot, Eye
} from '@phosphor-icons/react';
import { mockScrapingRuns, mockSystemServices, mockLinkedInAccounts, mockScraperKeywords } from '../../data/mockData';
import { motion } from 'framer-motion';

const StatusDot = ({ status }) => {
  const colors = {
    'Operational': 'bg-emerald-500',
    'Active': 'bg-emerald-500',
    'Paused': 'bg-amber-500',
    'Degraded': 'bg-amber-500',
    'Cooling Down': 'bg-amber-500',
    'Down': 'bg-red-500',
    'Flagged': 'bg-red-500',
    'Coming Soon': 'bg-zinc-400'
  };
  return <span className={`w-2 h-2 rounded-full ${colors[status] || 'bg-zinc-400'} inline-block`} />;
};

const Stat = ({ title, value, change, trend, icon: Icon, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }}
    className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
    data-testid={`stat-${title.toLowerCase().replace(/\s+/g, '-')}`}
  >
    <div className="flex items-center justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
        <Icon size={20} weight="duotone" className="text-white" />
      </div>
      {change && (
        <span className={`flex items-center gap-0.5 text-xs font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
          {trend === 'up' ? <ArrowUp size={12} weight="bold" /> : <ArrowDown size={12} weight="bold" />}
          {change}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-0.5">{value}</p>
    <p className="text-xs text-zinc-500 dark:text-zinc-400">{title}</p>
  </motion.div>
);

const MiniBar = ({ data, label }) => {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">{label}</p>
      <div className="flex items-end gap-1.5 h-24">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[9px] font-medium text-zinc-900 dark:text-zinc-100">{d.value}</span>
            <div className="w-full bg-blue-500 dark:bg-blue-400 rounded-t transition-all duration-500" style={{ height: `${(d.value / max) * 100}%`, minHeight: '4px' }} />
            <span className="text-[9px] text-zinc-500 dark:text-zinc-400">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { scraper, mailService, llm } = mockSystemServices;
  const activeAccounts = mockLinkedInAccounts.filter(a => a.status === 'Active').length;
  const totalSessionsToday = mockLinkedInAccounts.reduce((s, a) => s + a.sessionsToday, 0);
  const totalSessionBudget = mockLinkedInAccounts.reduce((s, a) => s + a.sessionBudget, 0);
  const totalPagesToday = mockLinkedInAccounts.reduce((s, a) => s + a.pagesVisited, 0);
  const totalPageBudget = mockLinkedInAccounts.reduce((s, a) => s + a.pageBudget, 0);
  const leadsToday = scraper.portals.reduce((s, p) => s + p.postsToday, 0);
  const lastRun = mockScrapingRuns[0];
  const topKeywords = mockScraperKeywords.slice(0, 5);

  const leadsPerDay = [
    { label: 'Mon', value: 87 }, { label: 'Tue', value: 112 }, { label: 'Wed', value: 95 },
    { label: 'Thu', value: 134 }, { label: 'Fri', value: 108 }, { label: 'Sat', value: 42 }, { label: 'Sun', value: 28 }
  ];

  const engagementBreakdown = [
    { label: 'C2C', value: 58, color: 'bg-emerald-500' },
    { label: 'W2', value: 28, color: 'bg-blue-500' },
    { label: 'Full-time', value: 14, color: 'bg-purple-500' }
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1600px] mx-auto" data-testid="admin-dashboard-page">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
          <h1 className="text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Platform Control Center</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Real-time system health and scraper operations</p>
        </motion.div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <Stat title="Leads Today" value={leadsToday.toString()} change="+12%" trend="up" icon={Briefcase} color="bg-blue-600" delay={0} />
          <Stat title={`Sessions (${totalSessionsToday}/${totalSessionBudget})`} value={`${totalSessionsToday}/${totalSessionBudget}`} icon={Robot} color="bg-emerald-600" delay={0.05} />
          <Stat title={`Pages (${totalPagesToday}/${totalPageBudget})`} value={`${totalPagesToday}/${totalPageBudget}`} icon={Database} color="bg-purple-600" delay={0.1} />
          <Stat title="Emails Sent Today" value={mailService.stats.sent.toString()} change="+8%" trend="up" icon={EnvelopeSimple} color="bg-amber-600" delay={0.15} />
          <Stat title="LLM Cost Today" value={`$${llm.costs.today}`} change={`$${llm.costs.thisMonth}/${llm.costs.budget} mo`} icon={CurrencyDollar} color="bg-rose-600" delay={0.2} />
        </div>

        {/* System Services Status */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 mb-6" data-testid="system-services-status">
          <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">System Services</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { ...mockSystemServices.scraper, icon: Robot },
              { ...mockSystemServices.mailService, icon: EnvelopeSimple },
              { ...mockSystemServices.documentEditor, icon: ChartLineUp },
              { ...mockSystemServices.llm, icon: CurrencyDollar },
              { ...mockSystemServices.database, icon: Database }
            ].map((svc, idx) => (
              <div key={idx} className="px-4 py-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-2">
                  <StatusDot status={svc.status} />
                  <span className="text-xs font-medium text-zinc-900 dark:text-zinc-50 truncate">{svc.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{svc.status}</span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{svc.uptime} uptime</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Leads Per Day */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 lg:col-span-2" data-testid="leads-per-day-chart">
            <MiniBar data={leadsPerDay} label="Leads Per Day (This Week)" />
          </motion.div>

          {/* Engagement Breakdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }}
            className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5" data-testid="engagement-breakdown">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">Leads by Engagement Type</p>
            <div className="space-y-3">
              {engagementBreakdown.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{item.label}</span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Scraper Portals Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5" data-testid="scraper-portals">
            <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Scraper Portals</h2>
            <div className="space-y-3">
              {scraper.portals.map((portal, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                  <div className="flex items-center gap-2">
                    <StatusDot status={portal.status} />
                    <span className="text-sm text-zinc-900 dark:text-zinc-50">{portal.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-zinc-900 dark:text-zinc-50">{portal.postsToday} posts</p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{portal.lastRun}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* LinkedIn Accounts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.45 }}
            className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5" data-testid="linkedin-accounts-overview">
            <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">LinkedIn Accounts</h2>
            <div className="space-y-3">
              {mockLinkedInAccounts.map((acct) => (
                <div key={acct.id} className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                  <div className="flex items-center gap-2">
                    <StatusDot status={acct.status} />
                    <div>
                      <p className="text-sm text-zinc-900 dark:text-zinc-50">{acct.name}</p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{acct.sessionsToday}/{acct.sessionBudget} sessions</p>
                    </div>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    acct.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    acct.status === 'Cooling Down' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                    'bg-red-500/10 text-red-600 dark:text-red-400'
                  }`}>{acct.status}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Keywords */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5" data-testid="top-keywords">
            <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Top Keywords This Week</h2>
            <div className="space-y-2.5">
              {topKeywords.map((kw, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300 truncate mr-2">{kw.keyword}</span>
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 whitespace-nowrap">{kw.leadsThisWeek} leads</span>
                  </div>
                  <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 dark:bg-blue-400 rounded-full" style={{ width: `${(kw.leadsThisWeek / topKeywords[0].leadsThisWeek) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Scraping Runs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.55 }}
          className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 mb-6" data-testid="recent-runs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Recent Scraping Runs</h2>
            <a href="/admin/scraper" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline" data-testid="view-all-runs-link">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="runs-table">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Keyword</th>
                  <th className="text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Time</th>
                  <th className="text-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Scraped</th>
                  <th className="text-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Qualified</th>
                  <th className="text-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Dupes</th>
                  <th className="text-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Failed</th>
                  <th className="text-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {mockScrapingRuns.slice(0, 5).map((run) => (
                  <tr key={run.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors" data-testid={`run-row-${run.id}`}>
                    <td className="px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">{run.keyword}</td>
                    <td className="px-4 py-3 text-xs text-zinc-500 dark:text-zinc-400">{run.startTime}</td>
                    <td className="px-4 py-3 text-center text-sm font-medium text-zinc-900 dark:text-zinc-50">{run.scraped}</td>
                    <td className="px-4 py-3 text-center text-sm text-emerald-600 dark:text-emerald-400 font-medium">{run.qualified}</td>
                    <td className="px-4 py-3 text-center text-sm text-amber-600 dark:text-amber-400">{run.duplicates}</td>
                    <td className="px-4 py-3 text-center text-sm text-red-500">{run.failed}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${
                        run.status === 'Success' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>{run.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* LLM Cost Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }}
          className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5" data-testid="llm-costs">
          <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">LLM Cost Breakdown</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Today</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">${llm.costs.today}</p>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">This Week</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">${llm.costs.thisWeek}</p>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">This Month</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">${llm.costs.thisMonth}</p>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Monthly Budget</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">${llm.costs.budget}</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Service</th>
                  <th className="text-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Calls</th>
                  <th className="text-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Tokens</th>
                  <th className="text-right px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {Object.entries(llm.usage).map(([key, val]) => (
                  <tr key={key} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                    <td className="px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-50 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                    <td className="px-4 py-2.5 text-center text-sm text-zinc-700 dark:text-zinc-300">{val.calls}</td>
                    <td className="px-4 py-2.5 text-center text-sm text-zinc-700 dark:text-zinc-300">{(val.tokens / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-2.5 text-right text-sm font-semibold text-zinc-900 dark:text-zinc-50">${val.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
