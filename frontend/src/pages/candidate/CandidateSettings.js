import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Bell, Lock, Eye, Moon, EnvelopeSimple, LinkedinLogo, ShieldCheck, Trash, SignOut } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const CandidateSettings = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: {
      newMatches: true,
      applicationUpdates: true,
      recruiterMessages: true,
      weeklyDigest: false,
      marketingEmails: false
    },
    notificationFrequency: 'Instant',
    
    // Privacy Settings
    profileVisibility: 'Public',
    showContactInfo: false,
    allowRecruiterContact: true,
    
    // Job Alert Settings
    jobAlerts: true,
    alertFrequency: 'Daily',
    minMatchScore: '80'
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handlePasswordChange = () => {
    console.log('Changing password...');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account...');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <DashboardLayout userType={user?.type || "candidate"}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Settings
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Manage your account preferences and security settings.
          </p>
        </motion.div>

        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="mb-6 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 p-1 rounded-lg">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Notifications */}
          <TabsContent value="notifications">
            <div className="space-y-6">
              {/* Email Notifications */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center">
                    <Bell size={20} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Choose what you want to be notified about</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'newMatches', label: 'New Job Matches', description: 'Get notified when new jobs match your profile' },
                    { key: 'applicationUpdates', label: 'Application Updates', description: 'Status changes and recruiter responses' },
                    { key: 'recruiterMessages', label: 'Recruiter Messages', description: 'When recruiters contact you directly' },
                    { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Summary of your activity and new opportunities' },
                    { key: 'marketingEmails', label: 'Marketing Emails', description: 'Tips, features, and platform updates' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-start justify-between py-4 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                      <div className="flex-1">
                        <p className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">{item.label}</p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
                      </div>
                      <div className="relative ml-4">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications[item.key]}
                          onChange={(e) => setSettings({
                            ...settings,
                            emailNotifications: { ...settings.emailNotifications, [item.key]: e.target.checked }
                          })}
                          className="sr-only peer"
                          data-testid={`toggle-${item.key}`}
                        />
                        <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500 peer-focus:ring-2 peer-focus:ring-blue-600 transition-colors cursor-pointer"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform cursor-pointer"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notification Frequency */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                  Notification Frequency
                </h3>
                <select
                  value={settings.notificationFrequency}
                  onChange={(e) => setSettings({ ...settings, notificationFrequency: e.target.value })}
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Instant">Instant (as they happen)</option>
                  <option value="Hourly">Hourly digest</option>
                  <option value="Daily">Daily digest</option>
                  <option value="Weekly">Weekly digest</option>
                </select>
              </div>

              {/* Job Alerts */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">
                      Job Alerts
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Receive email alerts for matching jobs</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={settings.jobAlerts}
                      onChange={(e) => setSettings({ ...settings, jobAlerts: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500 transition-colors cursor-pointer"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform cursor-pointer"></div>
                  </div>
                </div>

                {settings.jobAlerts && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                        Alert Frequency
                      </label>
                      <select
                        value={settings.alertFrequency}
                        onChange={(e) => setSettings({ ...settings, alertFrequency: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="Instant">Instant</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                        Minimum Match Score
                      </label>
                      <select
                        value={settings.minMatchScore}
                        onChange={(e) => setSettings({ ...settings, minMatchScore: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="70">70% or higher</option>
                        <option value="80">80% or higher</option>
                        <option value="90">90% or higher</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Privacy */}
          <TabsContent value="privacy">
            <div className="space-y-6">
              {/* Profile Visibility */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/10 flex items-center justify-center">
                    <Eye size={20} className="text-emerald-600 dark:text-emerald-400" weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">
                      Profile Visibility
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Control who can see your profile</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { value: 'Public', label: 'Public', description: 'Anyone can see your profile' },
                    { value: 'Private', label: 'Private', description: 'Only you can see your profile' },
                    { value: 'Recruiters', label: 'Recruiters Only', description: 'Only recruiters can see your profile' }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        settings.profileVisibility === option.value
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-500/10'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="profileVisibility"
                        value={option.value}
                        checked={settings.profileVisibility === option.value}
                        onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
                        className="mt-0.5"
                      />
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-zinc-50">{option.label}</p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Preferences */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
                  Contact Preferences
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start justify-between py-4 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex-1">
                      <p className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">Show Contact Information</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Display your email and phone on your profile</p>
                    </div>
                    <div className="relative ml-4">
                      <input
                        type="checkbox"
                        checked={settings.showContactInfo}
                        onChange={(e) => setSettings({ ...settings, showContactInfo: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:bg-blue-600 transition-colors cursor-pointer"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform cursor-pointer"></div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between py-4">
                    <div className="flex-1">
                      <p className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">Allow Recruiter Contact</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Let recruiters send you direct messages</p>
                    </div>
                    <div className="relative ml-4">
                      <input
                        type="checkbox"
                        checked={settings.allowRecruiterContact}
                        onChange={(e) => setSettings({ ...settings, allowRecruiterContact: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full peer peer-checked:bg-blue-600 transition-colors cursor-pointer"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform cursor-pointer"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-600/10 dark:bg-purple-500/10 flex items-center justify-center">
                  <Moon size={20} className="text-purple-600 dark:text-purple-400" weight="duotone" />
                </div>
                <div>
                  <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">
                    Theme Preference
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Choose your preferred color theme</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => theme === 'dark' && toggleTheme()}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    theme === 'light'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-500/10'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                  }`}
                >
                  <div className="w-full h-24 bg-white rounded-lg border-2 border-zinc-200 mb-4 flex items-center justify-center">
                    <div className="text-4xl">☀️</div>
                  </div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Light Mode</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Bright and clean interface</p>
                </div>

                <div
                  onClick={() => theme === 'light' && toggleTheme()}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    theme === 'dark'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-500/10'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                  }`}
                >
                  <div className="w-full h-24 bg-zinc-900 rounded-lg border-2 border-zinc-800 mb-4 flex items-center justify-center">
                    <div className="text-4xl">🌙</div>
                  </div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Dark Mode</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Easy on the eyes</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <div className="space-y-6">
              {/* Change Password */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-amber-600/10 dark:bg-amber-500/10 flex items-center justify-center">
                    <Lock size={20} className="text-amber-600 dark:text-amber-400" weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">
                      Change Password
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Update your password regularly for security</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <button
                    onClick={handlePasswordChange}
                    className="px-6 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </div>

              {/* Connected Accounts */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
                  Connected Accounts
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <LinkedinLogo size={24} className="text-blue-600" weight="fill" />
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-zinc-50">LinkedIn</p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Connected</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Account */}
          <TabsContent value="account">
            <div className="space-y-6">
              {/* Sign Out */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center">
                    <SignOut size={20} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">
                      Sign Out
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Sign out from your account on this device</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>

              {/* Delete Account */}
              <div className="bg-white dark:bg-[#18181b] border border-rose-200 dark:border-rose-900/30 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-rose-600/10 flex items-center justify-center">
                    <Trash size={20} className="text-rose-600 dark:text-rose-400" weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">
                      Delete Account
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Permanently delete your account and all data</p>
                  </div>
                </div>
                <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-900/30 rounded-lg p-4 mb-4">
                  <p className="text-sm text-rose-800 dark:text-rose-200">
                    <strong>Warning:</strong> This action cannot be undone. All your data, applications, and preferences will be permanently deleted.
                  </p>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="px-6 py-2.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                >
                  Delete My Account
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CandidateSettings;