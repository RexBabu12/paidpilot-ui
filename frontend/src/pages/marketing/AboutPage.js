import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Target, Users, TrendingUp } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We believe finding a job should be about your skills, not how fast you can click "Apply".'
    },
    {
      icon: Users,
      title: 'Candidate-First',
      description: 'Every feature is designed with one goal: help you land your dream job faster.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We leverage cutting-edge AI to give you an unfair advantage in the job market.'
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
            <Link to="/pricing" className="text-sm font-medium text-[#52525B] hover:text-[#002FA7] transition-colors">Pricing</Link>
            <Link to="/login" className="text-sm font-medium text-[#52525B] hover:text-[#002FA7] transition-colors">Login</Link>
          </nav>
        </div>
      </motion.header>

      {/* About Hero */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#002FA7] mb-4 block">About Us</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter leading-tight font-['Outfit'] text-[#0A0A0A] mb-6">
              We're Building the Future of Job Search
            </h1>
            <p className="text-lg text-[#52525B] leading-relaxed">
              PaidPilot was founded in 2024 by engineers who were frustrated with the outdated job application process. We built the tool we wished existed—one that automates the tedious parts and lets you focus on what matters: preparing for interviews and landing your dream role.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight font-['Outfit'] text-[#0A0A0A] mb-4">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-[#E4E4E7] p-8 rounded-lg text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#002FA7]/5 flex items-center justify-center mx-auto mb-4">
                  <value.icon size={32} className="text-[#002FA7]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium font-['Outfit'] text-[#0A0A0A] mb-3">{value.title}</h3>
                <p className="text-sm text-[#52525B]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight font-['Outfit'] text-[#0A0A0A] mb-6">
            Join Thousands Landing Dream Jobs with PaidPilot
          </h2>
          <Link to="/signup" className="inline-block px-8 py-4 bg-[#002FA7] text-white font-semibold rounded-lg hover:bg-[#001F70] transition-all hover:shadow-2xl">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;