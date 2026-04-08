import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import {
  Buildings, EnvelopeSimple, Phone, Globe, MapPin,
  Bell, Shield, Palette, CurrencyDollar, FileText,
  CheckCircle, ToggleRight
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const BusinessSettings = () => {
  const [companyProfile, setCompanyProfile] = useState({
    name: 'StaffPro Consulting LLC',
    email: 'admin@staffpro.com',
    phone: '+1 (555) 800-9000',
    website: 'www.staffproconsulting.com',
    address: '1200 McKinney St, Suite 800, Houston, TX 77010',
    ein: '**-***7890',
    industry: 'IT Staffing & Consulting',
    founded: '2018'
  });

  const [notifications, setNotifications] = useState({
    newMatches: true,
    submissionUpdates: true,
    interviewAlerts: true,
    weeklyDigest: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const [billingPlan] = useState({
    plan: 'Enterprise',
    price: '$299/mo',
    seats: '10',
    nextBilling: 'Feb 15, 2024',
    candidateSlots: '25',
    emailCredits: '500/mo'
  });

  const handleInputChange = (field, value) => {
    setCompanyProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1200px] mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Settings
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Manage your company profile, billing, and platform preferences
          </p>
        </motion.div>

        <Tabs defaultValue="company" className="w-full">
          <TabsList className="mb-6 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 p-1 rounded-lg">
            <TabsTrigger value="company" data-testid="tab-company-settings">Company Profile</TabsTrigger>
            <TabsTrigger value="notifications" data-testid="tab-notification-settings">Notifications</TabsTrigger>
            <TabsTrigger value="billing" data-testid="tab-billing-settings">Billing & Plan</TabsTrigger>
            <TabsTrigger value="integrations" data-testid="tab-integrations-settings">Integrations</TabsTrigger>
          </TabsList>

          {/* Company Profile */}
          <TabsContent value="company">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Buildings size={24} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Company Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Company Name', field: 'name', icon: Buildings },
                  { label: 'Email', field: 'email', icon: EnvelopeSimple },
                  { label: 'Phone', field: 'phone', icon: Phone },
                  { label: 'Website', field: 'website', icon: Globe },
                  { label: 'Address', field: 'address', icon: MapPin },
                  { label: 'EIN', field: 'ein', icon: Shield },
                  { label: 'Industry', field: 'industry', icon: Buildings },
                  { label: 'Founded', field: 'founded', icon: FileText }
                ].map(({ label, field, icon: Icon }) => (
                  <div key={field}>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">{label}</label>
                    <div className="relative">
                      <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="text"
                        value={companyProfile[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        data-testid={`settings-${field}-input`}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <button data-testid="save-company-settings" className="px-6 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium text-sm">
                  Save Changes
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Bell size={24} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Notification Preferences</h2>
              </div>
              <div className="space-y-1">
                {[
                  { key: 'newMatches', label: 'New Match Alerts', desc: 'Get notified when AI finds new matches for your candidates' },
                  { key: 'submissionUpdates', label: 'Submission Updates', desc: 'Track when submissions are opened, replied, or updated' },
                  { key: 'interviewAlerts', label: 'Interview Alerts', desc: 'Reminders for upcoming interviews and prep deadlines' },
                  { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Weekly summary of bench activity and performance metrics' },
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive alerts via email' },
                  { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive urgent alerts via SMS' }
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{label}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{desc}</p>
                    </div>
                    <button
                      onClick={() => toggleNotification(key)}
                      data-testid={`toggle-${key}`}
                      className={`relative w-11 h-6 rounded-full transition-colors ${notifications[key] ? 'bg-blue-600 dark:bg-blue-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${notifications[key] ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing">
            <div className="space-y-6">
              {/* Current Plan */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CurrencyDollar size={24} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                  <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Current Plan</h2>
                </div>
                <div className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white mb-6">
                  <div>
                    <p className="text-sm font-medium opacity-80">Active Plan</p>
                    <p className="text-2xl font-bold font-outfit">{billingPlan.plan}</p>
                    <p className="text-sm opacity-80 mt-1">{billingPlan.price} | Next billing: {billingPlan.nextBilling}</p>
                  </div>
                  <button data-testid="upgrade-plan-button" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
                    Upgrade
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Team Seats', value: billingPlan.seats, max: '10' },
                    { label: 'Candidate Slots', value: billingPlan.candidateSlots, max: '25' },
                    { label: 'Email Credits', value: billingPlan.emailCredits, max: '500/mo' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-1">{item.label}</p>
                      <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Palette size={24} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Connected Services</h2>
              </div>
              <div className="space-y-1">
                {[
                  { name: 'Gmail / Outlook', desc: 'Email sending and tracking', connected: true },
                  { name: 'LinkedIn Recruiter', desc: 'Job scraping and recruiter data', connected: true },
                  { name: 'Dice', desc: 'Job board integration', connected: false },
                  { name: 'ATS (Bullhorn)', desc: 'Applicant tracking sync', connected: false },
                  { name: 'Slack', desc: 'Team notifications', connected: true },
                  { name: 'Calendly', desc: 'Interview scheduling', connected: false }
                ].map((integration, idx) => (
                  <div key={idx} className="flex items-center justify-between py-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0" data-testid={`integration-${integration.name.toLowerCase().replace(/\s+/g, '-').replace(/[()\/]/g, '')}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${integration.connected ? 'bg-emerald-500/10' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                        {integration.connected ? (
                          <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400" weight="fill" />
                        ) : (
                          <ToggleRight size={20} className="text-zinc-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{integration.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{integration.desc}</p>
                      </div>
                    </div>
                    <button
                      data-testid={`connect-${integration.name.toLowerCase().replace(/\s+/g, '-').replace(/[()\/]/g, '')}`}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        integration.connected
                          ? 'text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                          : 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
                      }`}
                    >
                      {integration.connected ? 'Manage' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BusinessSettings;
