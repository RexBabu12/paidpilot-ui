import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, User, Building2, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userType, setUserType] = useState('candidate');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock signup - in real app this would call an API
    const mockUser = {
      name: formData.name,
      email: formData.email,
      type: userType,
      role: userType === 'candidate' ? 'independent_candidate' : 'business_owner',
      company: userType === 'business' ? formData.company : null
    };
    login(mockUser);
    navigate(userType === 'candidate' ? '/candidate/dashboard' : '/business/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 rounded-lg bg-[#002FA7] flex items-center justify-center">
              <Zap size={24} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-['Outfit'] font-semibold text-[#0A0A0A]">PaidPilot</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-['Outfit'] font-semibold text-[#0A0A0A] mb-2">Create your account</h1>
            <p className="text-sm text-[#52525B] mb-8">Start automating your job search today</p>

            {/* User Type Selection */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setUserType('candidate')}
                className={`p-4 border rounded-lg text-left transition-all ${
                  userType === 'candidate'
                    ? 'border-[#002FA7] bg-[#002FA7]/5 ring-1 ring-[#002FA7]'
                    : 'border-[#E4E4E7] hover:border-[#002FA7]'
                }`}
              >
                <User size={24} className={userType === 'candidate' ? 'text-[#002FA7]' : 'text-[#52525B]'} />
                <div className="mt-2">
                  <div className="font-semibold text-sm">Candidate</div>
                  <div className="text-xs text-[#52525B]">Job seeker</div>
                </div>
              </button>
              <button
                onClick={() => setUserType('business')}
                className={`p-4 border rounded-lg text-left transition-all ${
                  userType === 'business'
                    ? 'border-[#002FA7] bg-[#002FA7]/5 ring-1 ring-[#002FA7]'
                    : 'border-[#E4E4E7] hover:border-[#002FA7]'
                }`}
              >
                <Building2 size={24} className={userType === 'business' ? 'text-[#002FA7]' : 'text-[#52525B]'} />
                <div className="mt-2">
                  <div className="font-semibold text-sm">Business</div>
                  <div className="text-xs text-[#52525B]">Staffing agency</div>
                </div>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525B]" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E4E4E7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002FA7] transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525B]" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E4E4E7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002FA7] transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              {userType === 'business' && (
                <div>
                  <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Company Name</label>
                  <div className="relative">
                    <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525B]" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 border border-[#E4E4E7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002FA7] transition-all"
                      placeholder="Acme Staffing"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525B]" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E4E4E7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002FA7] transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#002FA7] text-white font-semibold rounded-lg hover:bg-[#001F70] transition-all hover:shadow-lg flex items-center justify-center gap-2"
              >
                Create Account
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="text-center text-sm text-[#52525B] mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-[#002FA7] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right: Branded Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#002FA7] to-[#001F70] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-white max-w-lg"
        >
          <h2 className="text-4xl font-['Outfit'] font-light mb-6">Join 2,500+ job seekers landing their dream roles</h2>
          <div className="space-y-4">
            {[
              'Apply to 100+ jobs automatically',
              'AI-powered resume optimization',
              '24/7 email automation',
              'Track and analyze everything'
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check size={16} strokeWidth={3} />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;