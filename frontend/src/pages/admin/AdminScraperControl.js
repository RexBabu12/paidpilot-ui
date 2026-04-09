import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import {
  Lightning, Clock, Warning, CheckCircle, X, Play, ArrowClockwise, Power,
  MagnifyingGlass, CaretDown, CaretUp, Plus, Trash
} from '@phosphor-icons/react';
import { mockScrapingRuns, mockScraperKeywords, mockScraperGroups, mockLinkedInAccounts } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const StatusDot = ({ status }) => {
  const colors = { 'Active': 'bg-emerald-500', 'Cooling Down': 'bg-amber-500', 'Flagged': 'bg-red-500', 'Success': 'bg-emerald-500', 'Partial': 'bg-amber-500', 'Failed': 'bg-red-500' };
  return <span className={`w-2 h-2 rounded-full ${colors[status] || 'bg-zinc-400'} inline-block`} />;
};

const AdminScraperControl = () => {
  const [activeTab, setActiveTab] = useState('runs');
  const [expandedRun, setExpandedRun] = useState(null);
  const [showAddKeyword, setShowAddKeyword] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);

  const tabs = [
    { id: 'runs', label: 'Run History' },
    { id: 'keywords', label: `Keywords (${mockScraperKeywords.length})` },
    { id: 'groups', label: `Groups (${mockScraperGroups.length})` },
    { id: 'accounts', label: `Accounts (${mockLinkedInAccounts.length})` }
  ];

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1600px] mx-auto" data-testid="admin-scraper-page">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Scraper Control</h1>
              <p className="text-zinc-600 dark:text-zinc-400">Manage scraping operations, keywords, groups and accounts</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium" data-testid="run-now-btn">
              <Play size={18} weight="fill" /> Run Now
            </button>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 bg-zinc-100 dark:bg-zinc-900 rounded-lg p-1 w-fit" data-testid="scraper-tabs">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm rounded-md font-medium transition-all ${activeTab === tab.id ? 'bg-white dark:bg-[#18181b] text-zinc-900 dark:text-zinc-50 shadow-sm' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'}`}
              data-testid={`tab-${tab.id}`}>{tab.label}</button>
          ))}
        </div>

        {/* Run History Tab */}
        {activeTab === 'runs' && (
          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden" data-testid="runs-panel">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Keyword</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Source</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Time</th>
                    <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Scraped</th>
                    <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Qualified</th>
                    <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Dupes</th>
                    <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Failed</th>
                    <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Rate</th>
                    <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {mockScrapingRuns.map((run) => (
                    <React.Fragment key={run.id}>
                      <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer" onClick={() => setExpandedRun(expandedRun === run.id ? null : run.id)} data-testid={`scraper-run-${run.id}`}>
                        <td className="px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">{run.keyword}</td>
                        <td className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300">{run.source}</td>
                        <td className="px-4 py-3 text-xs text-zinc-500 dark:text-zinc-400">{run.startTime} - {run.endTime.split(' ')[1]}</td>
                        <td className="px-4 py-3 text-center text-sm font-medium text-zinc-900 dark:text-zinc-50">{run.scraped}</td>
                        <td className="px-4 py-3 text-center text-sm text-emerald-600 dark:text-emerald-400 font-medium">{run.qualified}</td>
                        <td className="px-4 py-3 text-center text-sm text-amber-600 dark:text-amber-400">{run.duplicates}</td>
                        <td className="px-4 py-3 text-center text-sm text-red-500">{run.failed}</td>
                        <td className="px-4 py-3 text-center text-sm font-medium text-zinc-900 dark:text-zinc-50">{run.successRate}%</td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <StatusDot status={run.status} />
                            <span className="text-xs text-zinc-700 dark:text-zinc-300">{run.status}</span>
                            {run.errors.length > 0 && (expandedRun === run.id ? <CaretUp size={12} /> : <CaretDown size={12} />)}
                          </div>
                        </td>
                      </tr>
                      <AnimatePresence>
                        {expandedRun === run.id && run.errors.length > 0 && (
                          <tr><td colSpan={9} className="px-0 py-0">
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="px-6 py-3 bg-red-50 dark:bg-red-500/5 border-b border-zinc-200 dark:border-zinc-800">
                                <p className="text-xs font-bold uppercase text-red-600 dark:text-red-400 mb-2">Error Log</p>
                                {run.errors.map((err, i) => <p key={i} className="text-sm text-red-600 dark:text-red-400 font-mono">{err}</p>)}
                              </div>
                            </motion.div>
                          </td></tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Keywords Tab */}
        {activeTab === 'keywords' && (
          <div data-testid="keywords-panel">
            <div className="flex justify-end mb-4">
              <button onClick={() => setShowAddKeyword(!showAddKeyword)} className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700" data-testid="add-keyword-btn"><Plus size={16} /> Add Keyword</button>
            </div>
            <AnimatePresence>
              {showAddKeyword && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
                  <div className="flex gap-3 p-4 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <input placeholder="Enter keyword (e.g. 'angular developer c2c')" className="flex-1 px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50" data-testid="new-keyword-input" />
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700" data-testid="save-keyword-btn">Save</button>
                    <button onClick={() => setShowAddKeyword(false)} className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-700 dark:text-zinc-300">Cancel</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Keyword</th>
                    <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Enabled</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Last Searched</th>
                    <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Total Leads</th>
                    <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">This Week</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {mockScraperKeywords.map((kw) => (
                    <tr key={kw.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50" data-testid={`keyword-row-${kw.id}`}>
                      <td className="px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-50">{kw.keyword}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center">
                          <div className={`w-10 h-5 rounded-full cursor-pointer transition-colors ${kw.enabled ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
                            <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${kw.enabled ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'}`} />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-zinc-500 dark:text-zinc-400">{kw.lastSearched}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-zinc-900 dark:text-zinc-50">{kw.totalLeads.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-blue-600 dark:text-blue-400">{kw.leadsThisWeek}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Groups Tab */}
        {activeTab === 'groups' && (
          <div data-testid="groups-panel">
            <div className="flex justify-end mb-4">
              <button onClick={() => setShowAddGroup(!showAddGroup)} className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700" data-testid="add-group-btn"><Plus size={16} /> Add Group</button>
            </div>
            <AnimatePresence>
              {showAddGroup && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
                  <div className="flex gap-3 p-4 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <input placeholder="Group name" className="flex-1 px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50" data-testid="new-group-name" />
                    <input placeholder="LinkedIn group URL" className="flex-1 px-3 py-2 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50" data-testid="new-group-url" />
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700" data-testid="save-group-btn">Save</button>
                    <button onClick={() => setShowAddGroup(false)} className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-700 dark:text-zinc-300">Cancel</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Group Name</th>
                    <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Enabled</th>
                    <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Members</th>
                    <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Posts</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Last Scraped</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {mockScraperGroups.map((g) => (
                    <tr key={g.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50" data-testid={`group-row-${g.id}`}>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{g.name}</p>
                        <a href={g.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline truncate block max-w-[200px]">{g.url}</a>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center">
                          <div className={`w-10 h-5 rounded-full cursor-pointer transition-colors ${g.enabled ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
                            <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${g.enabled ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'}`} />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-zinc-700 dark:text-zinc-300">{g.members}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-zinc-900 dark:text-zinc-50">{g.totalPosts.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-zinc-500 dark:text-zinc-400">{g.lastScraped}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Accounts Tab */}
        {activeTab === 'accounts' && (
          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden" data-testid="accounts-panel">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Account</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Sessions</th>
                  <th className="text-center px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Pages</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Last Used</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {mockLinkedInAccounts.map((a) => (
                  <tr key={a.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50" data-testid={`account-row-${a.id}`}>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{a.name}</p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{a.email}</p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${
                        a.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        a.status === 'Cooling Down' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                        'bg-red-500/10 text-red-600 dark:text-red-400'
                      }`}>{a.status}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-zinc-900 dark:text-zinc-50">{a.sessionsToday}/{a.sessionBudget}</td>
                    <td className="px-4 py-3 text-center text-sm text-zinc-900 dark:text-zinc-50">{a.pagesVisited}/{a.pageBudget}</td>
                    <td className="px-4 py-3 text-sm text-zinc-500 dark:text-zinc-400">{a.lastUsed}</td>
                    <td className="px-4 py-3 text-sm text-zinc-500 dark:text-zinc-400">
                      {a.cooldownUntil && <span className="text-amber-600 dark:text-amber-400">Cooldown until {new Date(a.cooldownUntil).toLocaleTimeString()}</span>}
                      {a.flagReason && <span className="text-red-600 dark:text-red-400">{a.flagReason}</span>}
                      {!a.cooldownUntil && !a.flagReason && <span className="text-emerald-600 dark:text-emerald-400">All clear</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminScraperControl;
