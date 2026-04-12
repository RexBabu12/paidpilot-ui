import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Zap, ArrowRight } from 'lucide-react';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? '0' : '0',
      description: 'Perfect for getting started',
      features: [
        '10 auto-applications per day',
        '2 resume versions',
        'Basic ATS scoring',
        'LinkedIn & Dice scraping',
        'Email support'
      ],
      cta: 'Start Free',
      featured: false
    },
    {
      name: 'Professional',
      price: billingCycle === 'monthly' ? '49' : '470',
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
      cta: 'Start Free Trial',
      featured: true
    },
    {
      name: 'Business',
      price: billingCycle === 'monthly' ? '199' : '1990',
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
      cta: 'Contact Sales',
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-black/5"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#002FA7] flex items-center justify-center">
              <Zap size={20} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-['Outfit'] font-semibold text-[#0A0A0A]">PaidPilot</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-[#52525B] hover:text-[#002FA7] transition-colors">Home</Link>
            <Link to="/what-we-do" className="text-sm font-medium text-[#52525B] hover:text-[#002FA7] transition-colors">What We Do</Link>
            <Link to="/about" className="text-sm font-medium text-[#52525B] hover:text-[#002FA7] transition-colors">About</Link>
            <Link to="/login" className="text-sm font-medium text-[#52525B] hover:text-[#002FA7] transition-colors">Login</Link>
            <Link to="/signup" className="px-6 py-2 bg-[#002FA7] text-white text-sm font-semibold rounded-lg hover:bg-[#001F70] transition-all duration-300">Get Started</Link>
          </nav>
        </div>
      </motion.header>

      {/* Pricing Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#002FA7] mb-4 block">Pricing</span>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tighter leading-tight font-['Outfit'] text-[#0A0A0A] mb-6">Simple, Transparent Pricing</h1>
            <p className="text-base text-[#52525B] max-w-2xl mx-auto mb-8">Choose the plan that's right for you. No hidden fees.</p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-1 bg-[#F4F4F5] rounded-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-[#002FA7] shadow-sm'
                    : 'text-[#52525B]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 text-sm font-semibold rounded-lg transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-white text-[#002FA7] shadow-sm'
                    : 'text-[#52525B]'
                }`}
              >
                Annual <span className="text-xs text-[#059669] ml-1">(Save 20%)</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-white border rounded-lg p-8 ${
                  plan.featured
                    ? 'border-[#002FA7] scale-105 shadow-2xl relative'
                    : 'border-[#E4E4E7]'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#002FA7] text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold font-['Outfit'] text-[#0A0A0A] mb-2">{plan.name}</h3>
                  <p className="text-sm text-[#52525B] mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-light font-['Outfit'] text-[#0A0A0A]">${plan.price}</span>
                    <span className="text-[#52525B]">/month</span>
                  </div>
                  {billingCycle === 'annual' && plan.price !== '0' && (
                    <p className="text-xs text-[#52525B] mt-1">Billed annually</p>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm text-[#0A0A0A]">
                      <Check size={18} className="text-[#059669] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`block text-center py-3 rounded-lg font-semibold transition-all ${
                    plan.featured
                      ? 'bg-[#002FA7] text-white hover:bg-[#001F70] hover:shadow-lg'
                      : 'border border-[#E4E4E7] text-[#0A0A0A] hover:border-[#002FA7]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;