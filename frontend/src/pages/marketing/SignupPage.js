import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EnvelopeSimple, Lock, User, Buildings, Eye, EyeSlash, Check, ArrowRight } from '@phosphor-icons/react';
import { ThemeToggle } from '../../components/ThemeToggle';

const SignupPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('candidate'); // candidate or business
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock signup - redirect to login
    navigate('/login');
  };

  const features = userType === 'candidate' 
    ? [
        'AI-powered resume tailoring',
        'Job application tracking',
        'Automated job matching',
        'Interview preparation tools'
      ]
    : [
        'Candidate management dashboard',
        'Recruiter collaboration tools',
        'Lead generation & tracking',
        'Analytics & reporting'
      ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors duration-300 relative">
      {/* Subtle bg pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)' }} />

      {/* Navigation Bar */}
      <nav className="relative z-10 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#18181b]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">PP</span>
            </div>
            <span className="font-outfit font-bold text-xl text-zinc-900 dark:text-zinc-50">PaidPilot</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/pricing" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link to="/login" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              Sign In
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          >
            {/* Left: Form */}
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
              <h1 className="font-outfit font-bold text-3xl text-zinc-900 dark:text-zinc-50 mb-2">
                Create your account
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                Start your journey with PaidPilot today
              </p>

              {/* User Type Toggle */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                <button
                  type="button"
                  onClick={() => setUserType('candidate')}
                  className={`py-2.5 rounded-lg font-medium text-sm transition-all ${
                    userType === 'candidate'
                      ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  <User size={18} weight="duotone" className="inline mr-1.5" />
                  Candidate
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('business')}
                  className={`py-2.5 rounded-lg font-medium text-sm transition-all ${
                    userType === 'business'
                      ? 'bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  <Buildings size={18} weight="duotone" className="inline mr-1.5" />
                  Business
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="John Doe"
                      className="w-full pl-9 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-50 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <EnvelopeSimple size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-50 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                      required
                    />
                  </div>
                </div>

                {userType === 'business' && (
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Company Name
                    </label>
                    <div className="relative">
                      <Buildings size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Your Company Inc."
                        className="w-full pl-9 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-50 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-50 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                    >
                      {showPassword ? <EyeSlash size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Must be at least 8 characters
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-500 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-[0.99] transition-all mt-6"
                >
                  Create Account
                  <ArrowRight size={17} weight="bold" />
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 text-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Already have an account?{' '}
                  <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            {/* Right: Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:sticky lg:top-8"
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-2xl p-8 text-white shadow-xl">
                <h2 className="font-outfit font-bold text-2xl mb-2">
                  {userType === 'candidate' ? 'Land Your Dream Job' : 'Grow Your Business'}
                </h2>
                <p className="text-blue-100 text-sm mb-6">
                  {userType === 'candidate' 
                    ? 'Join thousands of candidates who found their perfect role'
                    : 'Streamline your staffing operations and scale faster'
                  }
                </p>

                <div className="space-y-3">
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={14} weight="bold" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-white/30 border-2 border-blue-600 dark:border-blue-500 flex items-center justify-center text-xs font-bold">
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">10,000+ users</p>
                      <p className="text-xs text-blue-100">Already signed up</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">95%</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Success Rate</p>
                </div>
                <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">24/7</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Support</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
