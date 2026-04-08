import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { EnvelopeSimple, Lock, SignIn, Eye, EyeSlash } from '@phosphor-icons/react';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const result = login(email, password);
    if (result.success) {
      // Redirect based on user type
      const userType = email.split('@')[0]; // Extract type from email
      if (userType === 'candidate') {
        navigate('/candidate/dashboard');
      } else if (userType === 'business') {
        navigate('/business/dashboard');
      } else if (userType === 'admin') {
        navigate('/admin/dashboard');
      }
    } else {
      setError(result.error);
    }
  };

  const demoCredentials = [
    { type: 'Candidate', email: 'candidate@demo.com', password: 'candidate123' },
    { type: 'Business', email: 'business@demo.com', password: 'business123' },
    { type: 'Admin', email: 'admin@demo.com', password: 'admin123' }
  ];

  const fillDemo = (email, password) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] transition-colors duration-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <img
          src="https://images.pexels.com/photos/29703885/pexels-photo-29703885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo and header */}
          <div className="text-center mb-8">
            <h1 className="font-outfit font-bold text-4xl text-zinc-900 dark:text-zinc-50 mb-2">
              C2C Staffing Platform
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Lead Intelligence & Candidate Outreach Workspace
            </p>
          </div>

          {/* Login form */}
          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 shadow-lg">
            <h2 className="font-outfit font-semibold text-2xl text-zinc-900 dark:text-zinc-50 mb-6">
              Sign In
            </h2>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <EnvelopeSimple
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    data-testid="email-input"
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition-colors duration-200"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    data-testid="password-input"
                    className="w-full pl-10 pr-12 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition-colors duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors duration-200"
                  >
                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                data-testid="login-submit-button"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <SignIn size={20} weight="bold" />
                Sign In
              </button>
            </form>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
              Demo Credentials (Click to fill)
            </p>
            <div className="space-y-2">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.type}
                  onClick={() => fillDemo(cred.email, cred.password)}
                  data-testid={`demo-${cred.type.toLowerCase()}-button`}
                  className="w-full text-left p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                        {cred.type} Portal
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {cred.email}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      Click to fill
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;