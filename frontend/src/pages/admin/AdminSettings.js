import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import {
  Gear, Robot, EnvelopeSimple, Bell, UsersThree, Key, FloppyDisk
} from '@phosphor-icons/react';
import { mockAdminSettings } from '../../data/mockData';
import { motion } from 'framer-motion';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('scraper');
  const [settings, setSettings] = useState(mockAdminSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'scraper', label: 'Scraper', icon: Robot },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'outreach', label: 'Outreach', icon: EnvelopeSimple },
    { id: 'users', label: 'Users & Access', icon: UsersThree }
  ];

  const InputField = ({ label, value, onChange, type = 'text', placeholder, testId }) => (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
        data-testid={testId} />
    </div>
  );

  const ToggleField = ({ label, checked, onChange, testId }) => (
    <label className="flex items-center justify-between py-2 cursor-pointer">
      <span className="text-sm text-zinc-700 dark:text-zinc-300">{label}</span>
      <div className="relative">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" data-testid={testId} />
        <div className="w-10 h-5 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500 transition-colors" />
        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform" />
      </div>
    </label>
  );

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-4xl mx-auto" data-testid="admin-settings-page">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
          <h1 className="text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Settings</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Configure platform behavior and preferences</p>
        </motion.div>

        <div className="flex gap-6">
          {/* Left Tabs */}
          <div className="w-48 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24 space-y-1">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-50'
                  }`} data-testid={`settings-tab-${tab.id}`}>
                  <tab.icon size={18} weight={activeTab === tab.id ? 'fill' : 'regular'} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Scraper Settings */}
            {activeTab === 'scraper' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6" data-testid="scraper-settings">
                <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Scraper Configuration</h2>
                <div className="grid grid-cols-2 gap-5">
                  <InputField label="Fetch Window (Hours)" value={settings.scraper.fetchWindowHours} type="number"
                    onChange={(e) => setSettings({...settings, scraper: {...settings.scraper, fetchWindowHours: e.target.value}})} testId="setting-fetch-window" />
                  <InputField label="Daily Session Budget" value={settings.scraper.dailySessionBudget} type="number"
                    onChange={(e) => setSettings({...settings, scraper: {...settings.scraper, dailySessionBudget: e.target.value}})} testId="setting-session-budget" />
                  <InputField label="Daily Page Budget" value={settings.scraper.dailyPageBudget} type="number"
                    onChange={(e) => setSettings({...settings, scraper: {...settings.scraper, dailyPageBudget: e.target.value}})} testId="setting-page-budget" />
                  <InputField label="Keywords Per Session" value={settings.scraper.keywordsPerSession} type="number"
                    onChange={(e) => setSettings({...settings, scraper: {...settings.scraper, keywordsPerSession: e.target.value}})} testId="setting-keywords-session" />
                  <InputField label="Max Posts Per Search" value={settings.scraper.maxPostsPerSearch} type="number"
                    onChange={(e) => setSettings({...settings, scraper: {...settings.scraper, maxPostsPerSearch: e.target.value}})} testId="setting-max-posts" />
                </div>
              </motion.div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6" data-testid="notification-settings">
                <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Notification Preferences</h2>
                <div className="space-y-1 mb-6">
                  <ToggleField label="Email when new leads found" checked={settings.notifications.emailOnNewLeads}
                    onChange={(e) => setSettings({...settings, notifications: {...settings.notifications, emailOnNewLeads: e.target.checked}})} testId="notif-new-leads" />
                  <ToggleField label="Email on scraper errors" checked={settings.notifications.emailOnErrors}
                    onChange={(e) => setSettings({...settings, notifications: {...settings.notifications, emailOnErrors: e.target.checked}})} testId="notif-errors" />
                  <ToggleField label="Email when account flagged" checked={settings.notifications.emailOnAccountFlagged}
                    onChange={(e) => setSettings({...settings, notifications: {...settings.notifications, emailOnAccountFlagged: e.target.checked}})} testId="notif-flagged" />
                  <ToggleField label="Email when budget exhausted" checked={settings.notifications.emailOnBudgetExhausted}
                    onChange={(e) => setSettings({...settings, notifications: {...settings.notifications, emailOnBudgetExhausted: e.target.checked}})} testId="notif-budget" />
                </div>
                <InputField label="Slack Webhook URL" value={settings.notifications.slackWebhook} placeholder="https://hooks.slack.com/..."
                  onChange={(e) => setSettings({...settings, notifications: {...settings.notifications, slackWebhook: e.target.value}})} testId="setting-slack-webhook" />
                <div className="mt-4">
                  <InputField label="Alert Threshold (min leads per session)" value={settings.notifications.alertThreshold} type="number"
                    onChange={(e) => setSettings({...settings, notifications: {...settings.notifications, alertThreshold: e.target.value}})} testId="setting-alert-threshold" />
                </div>
              </motion.div>
            )}

            {/* Outreach Settings */}
            {activeTab === 'outreach' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6" data-testid="outreach-settings">
                <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Outreach Configuration</h2>
                <div className="space-y-5">
                  <InputField label="Reply-To Address" value={settings.outreach.replyToAddress}
                    onChange={(e) => setSettings({...settings, outreach: {...settings.outreach, replyToAddress: e.target.value}})} testId="setting-reply-to" />
                  <InputField label="SMTP Host" value={settings.outreach.smtpHost}
                    onChange={(e) => setSettings({...settings, outreach: {...settings.outreach, smtpHost: e.target.value}})} testId="setting-smtp-host" />
                  <InputField label="SMTP Port" value={settings.outreach.smtpPort} type="number"
                    onChange={(e) => setSettings({...settings, outreach: {...settings.outreach, smtpPort: e.target.value}})} testId="setting-smtp-port" />
                  <InputField label="Daily Outreach Limit Per Candidate" value={settings.outreach.dailyLimitPerCandidate} type="number"
                    onChange={(e) => setSettings({...settings, outreach: {...settings.outreach, dailyLimitPerCandidate: e.target.value}})} testId="setting-daily-limit" />
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Default Signature</label>
                    <textarea value={settings.outreach.defaultSignature}
                      onChange={(e) => setSettings({...settings, outreach: {...settings.outreach, defaultSignature: e.target.value}})}
                      rows={3}
                      className="w-full px-3 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      data-testid="setting-signature" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Users & Access */}
            {activeTab === 'users' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6" data-testid="users-settings">
                <h2 className="text-base font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">Admin Users</h2>
                <div className="space-y-3 mb-6">
                  {[
                    { name: 'Admin User', email: 'admin@staffpro.com', role: 'Super Admin', lastLogin: '2 min ago' },
                    { name: 'Ops Manager', email: 'ops@staffpro.com', role: 'Operations', lastLogin: '1 hr ago' }
                  ].map((user, i) => (
                    <div key={i} className="flex items-center justify-between py-3 px-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{user.name}</p>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{user.role}</span>
                        <p className="text-[10px] text-zinc-400">Last: {user.lastLogin}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-3">API Keys</h3>
                  <div className="flex items-center gap-3 py-3 px-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                    <Key size={18} className="text-zinc-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Production API Key</p>
                      <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">sk-prod-****...****f8a3</p>
                    </div>
                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline" data-testid="regenerate-key-btn">Regenerate</button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button onClick={handleSave}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`} data-testid="save-settings-btn">
                <FloppyDisk size={18} weight="bold" />
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
