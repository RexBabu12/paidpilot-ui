import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// ─── Mock users — 5 roles ─────────────────────────────────────────────────────
const MOCK_USERS = {
  'candidate@demo.com': {
    type: 'candidate',
    role: 'independent',
    name: 'John Candidate',
    email: 'candidate@demo.com',
    password: 'candidate123',
    company: null,
  },
  'owner@demo.com': {
    type: 'business',
    role: 'owner',
    name: 'Alex Owner',
    email: 'owner@demo.com',
    password: 'owner123',
    company: 'StaffCorp Inc',
  },
  'recruiter@demo.com': {
    type: 'business',
    role: 'recruiter',
    name: 'Amy Roberts',
    email: 'recruiter@demo.com',
    password: 'recruiter123',
    company: 'StaffCorp Inc',
  },
  'bench@demo.com': {
    type: 'bench',
    role: 'bench_candidate',
    name: 'Rajesh Kumar',
    email: 'bench@demo.com',
    password: 'bench123',
    company: 'StaffCorp Inc',
    assignedRecruiter: 'Amy Roberts',
  },
  // legacy business login still works
  'business@demo.com': {
    type: 'business',
    role: 'owner',
    name: 'StaffCorp Inc',
    email: 'business@demo.com',
    password: 'business123',
    company: 'StaffCorp Inc',
  },
  'admin@demo.com': {
    type: 'admin',
    role: 'admin',
    name: 'Admin User',
    email: 'admin@demo.com',
    password: 'admin123',
    company: null,
  },
};

// Post-login routing map
export const getDefaultRoute = (user) => {
  if (!user) return '/login';
  if (user.type === 'candidate')  return '/candidate/dashboard';
  if (user.type === 'bench')       return '/bench/dashboard';
  if (user.type === 'admin')       return '/admin/dashboard';
  if (user.type === 'business')    return '/business/dashboard';
  return '/login';
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const cred = MOCK_USERS[email.toLowerCase().trim()];
    if (cred && cred.password === password) {
      const { password: _pw, ...safeUser } = cred;
      setUser(safeUser);
      return { success: true, user: safeUser };
    }
    return { success: false, error: 'Invalid email or password.' };
  };

  const logout = () => setUser(null);

  // Mock registration — creates a candidate or business user
  const register = (type, data) => {
    const newUser = {
      type,
      role: type === 'business' ? 'owner' : 'independent',
      name: data.name,
      email: data.email,
      company: data.company || null,
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, getDefaultRoute }}>
      {children}
    </AuthContext.Provider>
  );
};
