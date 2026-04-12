import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, CheckCircle2, Target, Mail, Bot, BarChart3, Sparkles, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  const metrics = [
    { value: '99.9', unit: '%', label: 'Uptime SLA guaranteed' },
    { value: '15', unit: 'ms', label: 'Avg. system latency' },
    { value: '99.2', unit: '%', label: 'Industry-leading accuracy' },
    { value: '0.4', unit: 's', label: 'End-workflow cycle' }
  ];

  const layers = [
    {
      icon: Target,
      title: 'Auto-Apply Engine',
      description: 'Multi-tiered models identify intent, budget, and technologies from fragmented job postings with 98.4% precision.',
      features: [
        'Real-time context mapping',
        'Currency & date normalization',
        'Visa status verification'
      ]
    },
    {
      icon: Mail,
      title: 'Email Orchestration',
      description: 'AI-powered email agent handles recruiter outreach, follow-ups, and interview scheduling automatically.',
      features: [
        'Smart template generation',
        'Sentiment analysis',
        'Auto-response workflows'
      ]
    },
    {
      icon: Sparkles,
      title: 'Resume Optimization',
      description: 'ATS-optimized resume tailoring with keyword injection and format validation for maximum visibility.',
      features: [
        'Dynamic skill matching',
        'ATS compatibility scoring',
        'Multi-version management'
      ]
    }
  ];

  const integrations = [
    { name: 'LinkedIn', logo: 'LI' },
    { name: 'Dice', logo: 'DC' },
    { name: 'Indeed', logo: 'ID' },
    { name: 'Greenhouse', logo: 'GH' },
    { name: 'Workday', logo: 'WD' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-black/5"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#4A90FF] flex items-center justify-center">
              <Zap size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-['IBM_Plex_Sans'] font-semibold text-[#0A0A0A] tracking-tight">PaidPilot</span>
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            <Link to="/what-we-do" className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors">Solutions</Link>
            <Link to="/pricing" className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors">Pricing</Link>
            <Link to="/about" className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors">About</Link>
            <Link to="/login" className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors">Login</Link>
            <Link to="/signup" className="px-5 py-2 bg-[#4A90FF] text-white text-sm font-semibold rounded-md hover:bg-[#3A7FE8] transition-all">
              Get Started
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-block mb-6">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#52525B] bg-[#F4F4F5] px-3 py-1.5 rounded-full">
                NEXT-GENERATION LAYER
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-['IBM_Plex_Sans'] font-light leading-[1.1] tracking-tight text-[#0A0A0A] mb-6">
              Job Search Automation{' '}
              <span className="font-medium text-[#4A90FF]">Architect.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#52525B] font-['IBM_Plex_Sans'] leading-relaxed mb-8 max-w-3xl">
              Apply & Send Email to 100+ jobs to recruiters while you sleep. <br />
              Transforming unstructured job data into verified high-fidelity applications in 15ms.
            </p>
          </motion.div>

          {/* Hero Visual Grid */}
          <div className="grid md:grid-cols-12 gap-6 mt-16">
            {/* Left Card - Unstructured Messaging */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="md:col-span-5 bg-[#FAFAFA] border border-[#E4E4E7] rounded-lg p-6 relative overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#52525B]">Unstructured Inbound</span>
              </div>
              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 bg-white rounded border border-[#E4E4E7]">
                  <div className="text-[10px] text-[#52525B] mb-1">JOB_TITLE</div>
                  <div className="text-[#0A0A0A]">"Looking for a killer Sr. Software Engineer (React/Node) needed in NYC. $140-180k depending on experience. H1B OK....@indicted is sponsoring some 2026. Long term contract."</div>
                </div>
                <div className="p-3 bg-white rounded border border-[#E4E4E7]">
                  <div className="text-[10px] text-[#52525B] mb-1">RAW_EMAIL</div>
                  <div className="text-[#0A0A0A]">"Urgent Python developer needed for fintech startup. Rate flexible and could go higher based on experience. NYC or remote. Email me ASAP!"</div>
                </div>
                <div className="p-3 bg-white rounded border border-[#E4E4E7]">
                  <div className="text-[10px] text-[#52525B] mb-1">LINKEDIN_POST</div>
                  <div className="text-[#0A0A0A]">"DevOps architect needed for cloud migration. Seeking 8+ years experience. AWS/Azure certifications required."</div>
                </div>
              </div>
            </motion.div>

            {/* Center Card - Entity Structuring Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="md:col-span-4 bg-white border border-[#E4E4E7] rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#52525B]">AI-Structured Fields</span>
                <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-medium">98.2%</span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="border-b border-[#F4F4F5] pb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-[#52525B] font-medium">PROPERTY</span>
                    <span className="text-[#52525B] font-medium">VALUE</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#0A0A0A] font-mono">"title"</span>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-medium">"Senior Software Engineer"</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#0A0A0A] font-mono">"stack"</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] font-medium">"React", "Node.js"</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#0A0A0A] font-mono">"rate_cap"</span>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px] font-medium">$180000</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#0A0A0A] font-mono">"visa"</span>
                  <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-[10px] font-medium">"H1B Eligible"</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#0A0A0A] font-mono">"location"</span>
                  <span className="px-2 py-0.5 bg-pink-50 text-pink-700 rounded text-[10px] font-medium">"New York, NY"</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F4F4F5] flex items-center justify-between text-[10px]">
                <span className="text-[#52525B]">CONFIDENCE: 98.2%</span>
                <span className="text-[#52525B]">LATENCY: 14ms</span>
              </div>
            </motion.div>

            {/* Right Card - Automated Outcome */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="md:col-span-3 bg-gradient-to-br from-[#4A90FF] to-[#3A7FE8] rounded-lg p-6 text-white relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Bot size={16} strokeWidth={2} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Automated Outcome</span>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Outreach Generated</h3>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Your Auto-apply Agent successfully matched and applied to 47 jobs matching your profile overnight. 12 follow-up emails scheduled.
                  </p>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle2 size={14} strokeWidth={2.5} />
                    <span>Resume tailored & ATS-optimized</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle2 size={14} strokeWidth={2.5} />
                    <span>Applications submitted via API</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle2 size={14} strokeWidth={2.5} />
                    <span>Recruiter emails sent & tracked</span>
                  </div>
                </div>
                <button className="w-full py-2.5 bg-white text-[#4A90FF] text-sm font-semibold rounded-md hover:bg-blue-50 transition-all">
                  VIEW REPORT
                </button>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Precision Layers */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light font-['IBM_Plex_Sans'] text-[#0A0A0A] mb-3">
              Precision Layers
            </h2>
            <p className="text-sm text-[#52525B] max-w-2xl mx-auto">
              Three proprietary models working in orchestration to define applicant truth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {layers.map((layer, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-[#E4E4E7] rounded-lg p-8 hover:border-[#4A90FF] transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-[#4A90FF] transition-colors">
                    <layer.icon size={20} className="text-[#4A90FF] group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4A90FF]">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-medium font-['IBM_Plex_Sans'] text-[#0A0A0A] mb-3">
                  {layer.title}
                </h3>
                <p className="text-sm text-[#52525B] leading-relaxed mb-6">
                  {layer.description}
                </p>
                <ul className="space-y-2">
                  {layer.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs text-[#0A0A0A]">
                      <div className="w-1 h-1 rounded-full bg-[#4A90FF]"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Platform Metrics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#52525B]">KEY PLATFORM METRICS</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">SYSTEMS OPERATIONAL</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-5xl md:text-6xl font-light font-['IBM_Plex_Sans'] text-[#0A0A0A]">
                    {metric.value}
                  </span>
                  <span className="text-2xl font-light text-[#52525B]">{metric.unit}</span>
                </div>
                <p className="text-xs text-[#52525B]">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Ecosystem Integrations */}
      <section className="py-16 border-y border-[#E4E4E7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#52525B] mb-3 block">
              DEEP ECOSYSTEM INTEGRATIONS
            </span>
          </div>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            {integrations.map((integration, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.4 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-16 h-16 rounded-lg bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center text-sm font-bold text-[#52525B] hover:border-[#4A90FF] hover:text-[#4A90FF] transition-all">
                  {integration.logo}
                </div>
                <span className="text-xs text-[#52525B] font-medium">{integration.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light font-['IBM_Plex_Sans'] text-[#0A0A0A] mb-6">
              Ready to automate your job search?
            </h2>
            <p className="text-base text-[#52525B] mb-8 max-w-2xl mx-auto leading-relaxed">
              Start building your proprietary application engine today. No credit card required for the first 1,000 applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#4A90FF] text-white font-semibold rounded-md hover:bg-[#3A7FE8] transition-all hover:shadow-lg"
              >
                Get Started Free
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#E4E4E7] text-[#0A0A0A] font-semibold rounded-md hover:border-[#4A90FF] transition-all"
              >
                Request Technical Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#E4E4E7] bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#4A90FF] flex items-center justify-center">
                <Zap size={14} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-['IBM_Plex_Sans'] font-semibold text-white">PaidPilot</span>
              <span className="text-xs text-zinc-600 ml-2">© 2024 PAIDPILOT INTELLIGENCE</span>
            </div>
            <div className="flex gap-8 text-xs text-zinc-500">
              <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/about" className="hover:text-white transition-colors">Security</Link>
              <Link to="/about" className="hover:text-white transition-colors">API Documentation</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
