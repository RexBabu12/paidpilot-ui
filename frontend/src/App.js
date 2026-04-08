import React from 'react';
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Login from './pages/Login';
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import JobLeads from './pages/candidate/JobLeads';
import ResumeLab from './pages/candidate/ResumeLab';
import BusinessDashboard from './pages/business/BusinessDashboard';
import CandidateManagement from './pages/business/CandidateManagement';
import OutreachAutomation from './pages/business/OutreachAutomation';
import AdminDashboard from './pages/admin/AdminDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, allowedTypes }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedTypes && !allowedTypes.includes(user.type)) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Candidate Routes */}
              <Route path="/candidate/dashboard" element={
                <ProtectedRoute allowedTypes={['candidate']}>
                  <CandidateDashboard />
                </ProtectedRoute>
              } />
              <Route path="/candidate/jobs" element={
                <ProtectedRoute allowedTypes={['candidate']}>
                  <JobLeads />
                </ProtectedRoute>
              } />
              <Route path="/candidate/matches" element={
                <ProtectedRoute allowedTypes={['candidate']}>
                  <CandidateDashboard />
                </ProtectedRoute>
              } />
              <Route path="/candidate/resume" element={
                <ProtectedRoute allowedTypes={['candidate']}>
                  <ResumeLab />
                </ProtectedRoute>
              } />
              <Route path="/candidate/applications" element={
                <ProtectedRoute allowedTypes={['candidate']}>
                  <CandidateDashboard />
                </ProtectedRoute>
              } />
              <Route path="/candidate/recruiters" element={
                <ProtectedRoute allowedTypes={['candidate']}>
                  <CandidateDashboard />
                </ProtectedRoute>
              } />
              <Route path="/candidate/profile" element={
                <ProtectedRoute allowedTypes={['candidate']}>
                  <CandidateDashboard />
                </ProtectedRoute>
              } />
              <Route path="/candidate/settings" element={
                <ProtectedRoute allowedTypes={['candidate']}>
                  <CandidateDashboard />
                </ProtectedRoute>
              } />
              
              {/* Business Routes */}
              <Route path="/business/dashboard" element={
                <ProtectedRoute allowedTypes={['business']}>
                  <BusinessDashboard />
                </ProtectedRoute>
              } />
              <Route path="/business/leads" element={
                <ProtectedRoute allowedTypes={['business']}>
                  <BusinessDashboard />
                </ProtectedRoute>
              } />
              <Route path="/business/recruiters" element={
                <ProtectedRoute allowedTypes={['business']}>
                  <BusinessDashboard />
                </ProtectedRoute>
              } />
              <Route path="/business/candidates" element={
                <ProtectedRoute allowedTypes={['business']}>
                  <CandidateManagement />
                </ProtectedRoute>
              } />
              <Route path="/business/matches" element={
                <ProtectedRoute allowedTypes={['business']}>
                  <BusinessDashboard />
                </ProtectedRoute>
              } />
              <Route path="/business/outreach" element={
                <ProtectedRoute allowedTypes={['business']}>
                  <OutreachAutomation />
                </ProtectedRoute>
              } />
              <Route path="/business/analytics" element={
                <ProtectedRoute allowedTypes={['business']}>
                  <BusinessDashboard />
                </ProtectedRoute>
              } />
              <Route path="/business/team" element={
                <ProtectedRoute allowedTypes={['business']}>
                  <BusinessDashboard />
                </ProtectedRoute>
              } />
              <Route path="/business/settings" element={
                <ProtectedRoute allowedTypes={['business']}>
                  <BusinessDashboard />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/customers" element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/scraping" element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/quality" element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/recruiters" element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
