import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, getDefaultRoute } from '../contexts/AuthContext';
import { EnvelopeSimple, Lock, SignIn, Eye, EyeSlash, Buildings, User, UserCircle, Crown, ShieldCheck } from '@phosphor-icons/react';
import { ThemeToggle } from '../components/ThemeToggle';
import { motion } from 'framer-motion';

const DEMO_CREDENTIALS = [
  {
    label: 'Independent Candidate',
    sub: 'Self-managed IT contractor',
    email: 'candidate@demo.com',
    password: 'candidate123',
    icon: User,
    iconBg: 'bg-blue-50 dark:bg-blue-500/10',
    iconColor: 'text-blue-600 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
  {
    label: 'Business Owner',
    sub: 'StaffCorp Inc — full access',
    email: 'owner@demo.com',
    password: 'owner123',
    icon: Crown,
    iconBg: 'bg-amber-50 dark:bg-amber-500/10',
    iconColor: 'text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  {
    label: 'Bench Recruiter',
    sub: 'Finds jobs, submits candidates',
    email: 'recruiter@demo.com',
    password: 'recruiter123',
    icon: Buildings,
    iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  {
    label: 'Bench Candidate',
    sub: 'Represented by StaffCorp Inc',
    email: 'bench@demo.com',
    password: 'bench123',
    icon: UserCircle,
    iconBg: 'bg-violet-50 dark:bg-violet-500/10',
    iconColor: 'text-violet-600 dark:text-violet-400',
    dot: 'bg-violet-500',
  },
  {
    label: 'Platform Admin',
    sub: 'Full platform control',
    email: 'admin@demo.com',
    password: 'admin123',
    icon: ShieldCheck,
    iconBg: 'bg-rose-50 dark:bg-rose-500/10',
    iconColor: 'text-rose-600 dark:text-rose-400',
    dot: 'bg-rose-500',
  },
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 350)); // brief UX delay
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      navigate(getDefaultRoute(result.user));
    } else {
      setError(result.error);
    }
  };

  const fillDemo = (cred) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] flex items-center justify-center px-4 py-10 transition-colors duration-300 relative">
      {/* Subtle bg pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)' }} />

      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
        >
          {/* ── Left: Login Form ───────────────────────── */}
          <div>
            <div className="mb-8">
              <h1 className="font-outfit font-bold text-4xl text-zinc-900 dark:text-zinc-50 mb-2">
                PaidPilot
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                C2C Staffing Intelligence Platform
              </p>
            </div>

            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
              <h2 className="font-outfit font-semibold text-xl text-zinc-900 dark:text-zinc-50 mb-6">
                Sign In
              </h2>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <EnvelopeSimple size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-50 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                      required data-testid="email-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-50 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                      required data-testid="password-input"
                    />
                    <button type="button" onClick={() => setShowPw(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                      {showPw ? <EyeSlash size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit" disabled={loading}
                  data-testid="login-submit-button"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-500 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <SignIn size={17} weight="bold" />
                  )}
                  {loading ? 'Signing in…' : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 text-center space-y-2">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Don't have an account?</p>
                <div className="flex gap-3 justify-center">
                  <Link to="/register/candidate"
                    className="flex-1 py-2 text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-blue-400 transition-colors text-center"
                    data-testid="signup-candidate-link">
                    Sign up as Candidate
                  </Link>
                  <Link to="/register/business"
                    className="flex-1 py-2 text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-blue-400 transition-colors text-center"
                    data-testid="signup-business-link">
                    Sign up as Business
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Demo Credentials ────────────────── */}
          <div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Demo Portals</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Click any role to auto-fill credentials</p>
            </div>
            <div className="space-y-2.5">
              {DEMO_CREDENTIALS.map((cred, idx) => {
                const Icon = cred.icon;
                const isSelected = email === cred.email;
                return (
                  <motion.button
                    key={cred.email}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    onClick={() => fillDemo(cred)}
                    data-testid={`demo-${cred.label.toLowerCase().replace(/\s+/g, '-')}-button`}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-150 ${
                      isSelected
                        ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-500/10 shadow-sm'
                        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181b] hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${cred.iconBg}`}>
                      <Icon size={18} weight="duotone" className={cred.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-semibold ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-zinc-900 dark:text-zinc-50'}`}>
                          {cred.label}
                        </p>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cred.dot}`} />
                      </div>
                      <p className={`text-xs mt-0.5 truncate ${isSelected ? 'text-blue-500 dark:text-blue-400' : 'text-zinc-400 dark:text-zinc-500'}`}>
                        {cred.sub}
                      </p>
                    </div>
                    {isSelected ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-600 text-white rounded-md flex-shrink-0">Filled</span>
                    ) : (
                      <span className="text-[10px] font-medium px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-md flex-shrink-0">Fill</span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 text-center mt-4">
              Bench Candidates &amp; Recruiters are <span className="font-semibold">invite-only</span> — no public signup.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
