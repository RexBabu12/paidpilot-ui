import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const WhatWeDoPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#002FA7] flex items-center justify-center"><Zap size={20} className="text-white" strokeWidth={2.5} /></div>
            <span className="text-xl font-['Outfit'] font-semibold text-[#0A0A0A]">PaidPilot</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-[#52525B] hover:text-[#002FA7] transition-colors">Home</Link>
            <Link to="/pricing" className="text-sm font-medium text-[#52525B] hover:text-[#002FA7] transition-colors">Pricing</Link>
            <Link to="/about" className="text-sm font-medium text-[#52525B] hover:text-[#002FA7] transition-colors">About</Link>
            <Link to="/login" className="text-sm font-medium text-[#52525B] hover:text-[#002FA7] transition-colors">Login</Link>
          </nav>
        </div>
      </motion.header>

      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#002FA7] mb-4 block">What We Do</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter leading-tight font-['Outfit'] text-[#0A0A0A] mb-6">
              We Automate Your Entire Job Search
            </h1>
            <div className="prose prose-lg max-w-none text-[#52525B] space-y-6">
              <p>PaidPilot is the world's first fully automated job application platform. We handle everything from finding relevant jobs to applying with tailored resumes—so you can focus on preparing for interviews.</p>
              <h2 className="text-2xl font-medium text-[#0A0A0A] mt-8 mb-4">How It Works</h2>
              <p>Our AI scrapes thousands of job postings daily from LinkedIn, Dice, and 100+ custom vendor portals. When we find a match based on your skills and preferences, we automatically apply with a tailored resume optimized for ATS systems.</p>
              <p>Meanwhile, our Gmail Mail Agent monitors your inbox 24/7, auto-responding to recruiter emails and scheduling interviews on your behalf.</p>
              <h2 className="text-2xl font-medium text-[#0A0A0A] mt-8 mb-4">The Result?</h2>
              <p>You apply to 10x more jobs in a fraction of the time, dramatically increasing your chances of landing interviews and offers.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeDoPage;