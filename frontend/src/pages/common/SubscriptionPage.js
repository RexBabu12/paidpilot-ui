import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Check, Crown, TrendingUp, CreditCard, Calendar, AlertCircle } from '@phosphor-icons/react';

const SubscriptionPage = () => {
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  const currentPlan = {
    name: 'Professional',
    price: 49,
    status: 'active',
    nextBilling: '2025-02-10',
    usage: {
      applications: 847,
      limit: 'Unlimited',
      resumes: 12,
      resumeLimit: 'Unlimited'
    }
  };

  const plans = [
    {
      name: 'Starter',
      price: 0,
      description: 'Perfect for getting started',
      features: [
        '10 auto-applications per day',
        '2 resume versions',
        'Basic ATS scoring',
        'LinkedIn & Dice scraping',
        'Email support'
      ],
      current: false
    },
    {
      name: 'Professional',
      price: billingCycle === 'monthly' ? 49 : 470,
      description: 'For serious job seekers',
      features: [
        'Unlimited auto-applications',
        'Unlimited resume versions',
        'Advanced ATS optimization',
        'Custom vendor portals (100+)',
        'Gmail Mail Agent',
        'Priority support',
        'Analytics dashboard'
      ],
      current: true,
      popular: true
    },
    {
      name: 'Business',
      price: billingCycle === 'monthly' ? 199 : 1990,
      description: 'For staffing agencies',
      features: [
        'Everything in Professional',
        'Unlimited bench candidates',
        'Team collaboration',
        'White-label option',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee'
      ],
      current: false
    }
  ];

  return (
    <DashboardLayout userType={user?.type || 'candidate'}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
              <Crown size={24} weight="duotone" className="text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Subscription</h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Manage your plan and billing</p>
        </motion.div>

        {/* Current Plan Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Crown size={20} className="text-purple-600 dark:text-purple-400" weight="duotone" />
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Current Plan</span>
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{currentPlan.name}</h2>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">${currentPlan.price}</span>
                <span className="text-zinc-500 dark:text-zinc-400">/month</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium">Active</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <Calendar size={14} />
                <span>Next billing: {new Date(currentPlan.nextBilling).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white/50 dark:bg-zinc-900/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Applications Sent</span>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">{currentPlan.usage.applications} / {currentPlan.usage.limit}</span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                  <div className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full" style={{ width: '84%' }} />
                </div>
              </div>
              <div className="bg-white/50 dark:bg-zinc-900/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Resume Versions</span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{currentPlan.usage.resumes} / {currentPlan.usage.resumeLimit}</span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                  <div className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" style={{ width: '12%' }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-4 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all relative ${
                billingCycle === 'annual'
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-emerald-500 text-white text-[9px] font-bold rounded-full">20% OFF</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className={`bg-white dark:bg-[#18181b] border rounded-xl p-6 relative ${
                plan.current
                  ? 'border-purple-600 dark:border-purple-500 ring-2 ring-purple-600/20'
                  : 'border-zinc-200 dark:border-zinc-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              {plan.current && (
                <div className="absolute top-4 right-4 px-2 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">
                  CURRENT
                </div>
              )}
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">{plan.name}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">{plan.description}</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">${plan.price}</span>
                <span className="text-zinc-500 dark:text-zinc-400">/month</span>
              </div>
              {billingCycle === 'annual' && plan.price !== 0 && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Billed ${plan.price * 12} annually</p>
              )}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <Check size={18} className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" weight="bold" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                disabled={plan.current}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.current
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                    : plan.popular
                    ? 'bg-purple-600 dark:bg-purple-500 text-white hover:bg-purple-700 dark:hover:bg-purple-600 hover:shadow-lg'
                    : 'border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 hover:border-purple-600'
                }`}
              >
                {plan.current ? 'Current Plan' : plan.price === 0 ? 'Downgrade' : 'Upgrade'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <CreditCard size={24} className="text-zinc-500 dark:text-zinc-400" />
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Payment Method</h3>
            </div>
            <button className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline">Update</button>
          </div>
          <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
              VISA
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">•••• •••• •••• 4242</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Expires 12/25</p>
            </div>
          </div>
        </motion.div>

        {/* Cancel Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-6"
        >
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 dark:text-red-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-red-900 dark:text-red-100 mb-1">Cancel Subscription</h3>
              <p className="text-xs text-red-700 dark:text-red-300 mb-3">Your subscription will remain active until the end of the current billing period.</p>
              <button className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline">Cancel Plan</button>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPage;