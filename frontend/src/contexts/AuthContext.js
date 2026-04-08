import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Mock credentials
// Candidate: candidate@demo.com / candidate123
// Business: business@demo.com / business123
// Admin: admin@demo.com / admin123

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Mock authentication
    const credentials = {
      'candidate@demo.com': { type: 'candidate', name: 'John Candidate', password: 'candidate123' },
      'business@demo.com': { type: 'business', name: 'StaffCorp Inc', password: 'business123' },
      'admin@demo.com': { type: 'admin', name: 'Admin User', password: 'admin123' }
    };

    const userCred = credentials[email];
    if (userCred && userCred.password === password) {
      setUser({ email, type: userCred.type, name: userCred.name });
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};