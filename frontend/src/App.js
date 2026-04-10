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
import RecruiterPortal from './pages/candidate/RecruiterPortal';
import Applications from './pages/candidate/Applications';
import CandidateProfile from './pages/candidate/CandidateProfile';
import CandidateSettings from './pages/candidate/CandidateSettings';
import BusinessResumeLab from './pages/business/BusinessResumeLab';
import BusinessDashboard from './pages/business/BusinessDashboard';
import BusinessLeads from './pages/business/BusinessLeads';
import BusinessRecruiters from './pages/business/BusinessRecruiters';
import CandidateManagement from './pages/business/CandidateManagement';
import OutreachAutomation from './pages/business/OutreachAutomation';
import Analytics from './pages/business/Analytics';
import BusinessTeam from './pages/business/BusinessTeam';
import BusinessSettings from './pages/business/BusinessSettings';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLeads from './pages/admin/AdminLeads';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminRecruiters from './pages/admin/AdminRecruiters';
import AdminOutreach from './pages/admin/AdminOutreach';
import AdminCandidates from './pages/admin/AdminCandidates';
import AdminScraperControl from './pages/admin/AdminScraperControl';
import AdminSystemInfo from './pages/admin/AdminSystemInfo';
import AdminSettings from './pages/admin/AdminSettings';

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
              <Route path="/candidate/resume" element={
                <ProtectedRoute allowedTypes={['candidate']}>
                  <ResumeLab />
                </ProtectedRoute>
              } />
              <Route path="/candidate/applications" element={
                <ProtectedRoute allowedTypes={['candidate']}>
                  <Applications />
                </ProtectedRoute>
              } />
              <Route path="/candidate/recruiters" element={
                <ProtectedRoute allowedTypes={['candidate']}>
                  <RecruiterPortal />
                </ProtectedRoute>
              } />
              <Route path="/candidate/profile" element={
                <ProtectedRoute allowedTypes={['candidate']}>
                  <CandidateProfile />
                </ProtectedRoute>
              } />
              <Route path="/candidate/settings" element={
                <ProtectedRoute allowedTypes={['candidate']}>
                  <CandidateSettings />
                </ProtectedRoute>
              } />
              
              {/* Bench Candidate Routes */}
              <Route path="/bench/dashboard" element={
                <ProtectedRoute allowedTypes={['bench']}>
                  <CandidateDashboard />
                </ProtectedRoute>
              } />
              <Route path="/bench/jobs" element={
                <ProtectedRoute allowedTypes={['bench']}>
                  <JobLeads />
                </ProtectedRoute>
              } />
              <Route path="/bench/resume" element={
                <ProtectedRoute allowedTypes={['bench']}>
                  <ResumeLab />
                </ProtectedRoute>
              } />
              <Route path="/bench/outreach" element={
                <ProtectedRoute allowedTypes={['bench']}>
                  <Applications />
                </ProtectedRoute>
              } />
              <Route path="/bench/recruiters" element={
                <ProtectedRoute allowedTypes={['bench']}>
                  <RecruiterPortal />
                </ProtectedRoute>
              } />
              <Route path="/bench/profile" element={
                <ProtectedRoute allowedTypes={['bench']}>
                  <CandidateProfile />
                </ProtectedRoute>
              } />
              <Route path="/bench/settings" element={
                <ProtectedRoute allowedTypes={['bench']}>
                  <CandidateSettings />
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
                  <BusinessLeads />
                </ProtectedRoute>
              } />
              <Route path="/business/recruiters" element={
                <ProtectedRoute allowedTypes={['business']}>
                  <BusinessRecruiters />
                </ProtectedRoute>
              } />
              <Route path="/business/candidates" element={
                <ProtectedRoute allowedTypes={['business']}>
                  <CandidateManagement />
                </ProtectedRoute>
              } />
              <Route path="/business/outreach" element={
                <ProtectedRoute allowedTypes={['business']}>
                  <OutreachAutomation />
                </ProtectedRoute>
              } />
              <Route path="/business/analytics" element={
                <ProtectedRoute allowedTypes={['business']}>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="/business/team" element={
                <ProtectedRoute allowedTypes={['business']}>
                  <BusinessTeam />
                </ProtectedRoute>
              } />
              <Route path="/business/resumes" element={
                <ProtectedRoute allowedTypes={['business']}>
                  <BusinessResumeLab />
                </ProtectedRoute>
              } />
              <Route path="/business/settings" element={
                <ProtectedRoute allowedTypes={['business']}>
                  <BusinessSettings />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/leads" element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AdminLeads />
                </ProtectedRoute>
              } />
              <Route path="/admin/customers" element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AdminCustomers />
                </ProtectedRoute>
              } />
              <Route path="/admin/recruiters" element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AdminRecruiters />
                </ProtectedRoute>
              } />
              <Route path="/admin/outreach" element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AdminOutreach />
                </ProtectedRoute>
              } />
              <Route path="/admin/candidates" element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AdminCandidates />
                </ProtectedRoute>
              } />
              <Route path="/admin/scraper" element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AdminScraperControl />
                </ProtectedRoute>
              } />
              <Route path="/admin/system" element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AdminSystemInfo />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute allowedTypes={['admin']}>
                  <AdminSettings />
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
