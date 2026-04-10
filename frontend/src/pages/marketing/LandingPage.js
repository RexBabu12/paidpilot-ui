import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, Target, Mail, FileText, BarChart3, Sparkles, 
  CheckCircle2, ArrowRight, Users, Building2, Bot
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Target,
      title: "Auto-Apply to Jobs",
      description: "Automatically apply to matching positions on LinkedIn and Dice. Save 20+ hours per week."
    },
    {
      icon: FileText,
      title: "AI Resume Tailoring",
      description: "Instantly customize your resume for each job with AI-powered keyword optimization."
    },
    {
      icon: Mail,
      title: "Gmail Mail Agent",
      description: "AI assistant monitors your inbox 24/7 and auto-responds to recruiter emails."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track applications, response rates, and optimize your job search strategy."
    },
    {
      icon: Bot,
      title: "Custom Vendor Portals",
      description: "Auto-apply to 100+ staffing company portals beyond LinkedIn and Dice."
    },
    {
      icon: Sparkles,
      title: "ATS Score Optimization",
      description: "Get real-time ATS scores and actionable tips to pass applicant tracking systems."
    }
  ];

  const stats = [
    { value: "10,000+", label: "Applications Sent" },
    { value: "2,500+", label: "Active Users" },
    { value: "85%", label: "Interview Rate" },
    { value: "20hrs", label: "Time Saved/Week" }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Upload Your Resume",
      description: "Import your resume and set your job preferences (title, location, salary, etc.)"
    },
    {
      step: "2",
      title: "AI Finds Matches",
      description: "Our scraper finds relevant jobs on LinkedIn, Dice, and custom vendor portals."
    },
    {
      step: "3",
      title: "Auto-Apply 24/7",
      description: "PaidPilot automatically applies with tailored resumes while you sleep."
    },
    {
      step: "4",
      title: "Track & Optimize",
      description: "Monitor applications, get AI-powered insights, and land more interviews."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
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
            <Link to="/what-we-do" className="text-sm font-medium text-[#52525B] hover:text-[#002FA7] transition-colors">What We Do</Link>
            <Link to="/pricing" className="text-sm font-medium text-[#52525B] hover:text-[#002FA7] transition-colors">Pricing</Link>
            <Link to="/about" className="text-sm font-medium text-[#52525B] hover:text-[#002FA7] transition-colors">About</Link>
            <Link to="/login" className="text-sm font-medium text-[#52525B] hover:text-[#002FA7] transition-colors">Login</Link>
            <Link 
              to="/signup" 
              className="px-6 py-2 bg-[#002FA7] text-white text-sm font-semibold rounded-lg hover:bg-[#001F70] transition-all duration-300 hover:shadow-lg"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Typography */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#002FA7] mb-4 block">
                Job Search Automation
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter leading-tight font-['Outfit'] text-[#0A0A0A] mb-6">
                Apply to 100+ Jobs
                <br />
                <span className="font-semibold">While You Sleep</span>
              </h1>
              <p className="text-base leading-relaxed text-[#52525B] font-['IBM_Plex_Sans'] mb-8 max-w-xl">
                PaidPilot automates your entire job search—from finding matches to applying with AI-tailored resumes. Land your dream job 10x faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#002FA7] text-white font-semibold rounded-lg hover:bg-[#001F70] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  Start Free Trial
                  <ArrowRight size={18} strokeWidth={2.5} />
                </Link>
                <Link
                  to="/what-we-do"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#E4E4E7] text-[#0A0A0A] font-semibold rounded-lg hover:border-[#002FA7] hover:text-[#002FA7] transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            {/* Right: 3D Abstract Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://static.prod-images.emergentagent.com/jobs/0d9d3382-6a7e-492a-bff5-3e62c5da4f40/images/fbe8ed6fc8f0bcfdbb0f950de8a7988c732b91864e7ab9eaedd402249475e72c.png"
                alt="PaidPilot Hero"
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-[#FAFAFA] border-y border-[#E4E4E7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-light font-['Outfit'] text-[#002FA7] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-[#52525B] font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#002FA7] mb-4 block">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight font-['Outfit'] text-[#0A0A0A] mb-4">
              Everything You Need to Land Your Next Role
            </h2>
            <p className="text-base text-[#52525B] max-w-2xl mx-auto">
              Powerful automation tools designed to give you an unfair advantage in the job market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-[#E4E4E7] p-8 rounded-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#002FA7]/5 flex items-center justify-center mb-4 group-hover:bg-[#002FA7] transition-colors duration-300">
                  <feature.icon size={24} className="text-[#002FA7] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl md:text-2xl font-medium tracking-tight font-['Outfit'] text-[#0A0A0A] mb-3">
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-[#52525B]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#002FA7] mb-4 block">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight font-['Outfit'] text-[#0A0A0A]">
              Get Started in 4 Simple Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative"
              >
                <div className="bg-white border border-[#E4E4E7] p-8 rounded-lg h-full">
                  <div className="w-12 h-12 rounded-full bg-[#002FA7] text-white flex items-center justify-center text-xl font-bold font-['Outfit'] mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg md:text-xl font-medium font-['Outfit'] text-[#0A0A0A] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#52525B]">
                    {step.description}
                  </p>
                </div>
                {idx < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#E4E4E7]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight font-['Outfit'] text-[#0A0A0A] mb-6">
              Ready to 10x Your Job Search?
            </h2>
            <p className="text-base text-[#52525B] mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who landed their dream jobs with PaidPilot. Start your free trial today.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#002FA7] text-white font-semibold rounded-lg hover:bg-[#001F70] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              Start Free Trial
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#E4E4E7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#002FA7] flex items-center justify-center">
                <Zap size={20} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-['Outfit'] font-semibold text-[#0A0A0A]">PaidPilot</span>
            </div>
            <div className="flex gap-8 text-sm text-[#52525B]">
              <Link to="/what-we-do" className="hover:text-[#002FA7] transition-colors">What We Do</Link>
              <Link to="/pricing" className="hover:text-[#002FA7] transition-colors">Pricing</Link>
              <Link to="/about" className="hover:text-[#002FA7] transition-colors">About</Link>
            </div>
            <div className="text-sm text-[#52525B]">
              © 2025 PaidPilot. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
