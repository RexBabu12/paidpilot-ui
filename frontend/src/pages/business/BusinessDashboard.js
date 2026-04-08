import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { StatCard } from '../../components/StatCard';
import { Briefcase, Target, EnvelopeSimple, Users, User, FileText, ChartLine, Eye } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BusinessDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for consultancy candidates
  const candidates = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      title: 'Senior Java Developer',
      skills: ['Java', 'Spring Boot', 'AWS'],
      resumeVersions: 3,
      applications: 12,
      matches: 8,
      responses: 3,
      lastActive: '2 hours ago',
      availability: 'Immediate',
      recentActivity: [
        { type: 'application', detail: 'Applied to TechCorp - Senior Java Developer', time: '2 hours ago' },
        { type: 'response', detail: 'Positive response from CloudScale Inc', time: '1 day ago' }
      ]
    },
    {
      id: 2,
      name: 'Maria Garcia',
      title: 'React Frontend Developer',
      skills: ['React', 'TypeScript', 'Node.js'],
      resumeVersions: 2,
      applications: 8,
      matches: 15,
      responses: 2,
      lastActive: '5 hours ago',
      availability: '2 weeks',
      recentActivity: [
        { type: 'match', detail: 'New match: React Developer at Digital Innovations', time: '5 hours ago' },
        { type: 'resume', detail: 'Resume tailored for Frontend position', time: '1 day ago' }
      ]
    },
    {
      id: 3,
      name: 'David Park',
      title: 'DevOps Engineer',
      skills: ['Kubernetes', 'AWS', 'Terraform'],
      resumeVersions: 4,
      applications: 15,
      matches: 12,
      responses: 5,
      lastActive: '1 day ago',
      availability: 'Immediate',
      recentActivity: [
        { type: 'response', detail: 'Interview scheduled with Enterprise Systems', time: '1 day ago' },
        { type: 'application', detail: 'Applied to 3 new DevOps positions', time: '2 days ago' }
      ]
    },
    {
      id: 4,
      name: 'Priya Sharma',
      title: 'Data Scientist',
      skills: ['Python', 'Machine Learning', 'SQL'],
      resumeVersions: 2,
      applications: 6,
      matches: 10,
      responses: 1,
      lastActive: '3 hours ago',
      availability: '1 month',
      recentActivity: [
        { type: 'application', detail: 'Applied to DataStream Analytics', time: '3 hours ago' },
        { type: 'match', detail: 'New match: ML Engineer at AI Corp', time: '1 day ago' }
      ]
    },
    {
      id: 5,
      name: 'Michael Chen',
      title: 'Full Stack Developer',
      skills: ['.NET', 'Angular', 'Azure'],
      resumeVersions: 3,
      applications: 10,
      matches: 7,
      responses: 4,
      lastActive: '6 hours ago',
      availability: 'Immediate',
      recentActivity: [
        { type: 'response', detail: 'Response from Microsoft Partner - Full Stack role', time: '6 hours ago' },
        { type: 'application', detail: 'Applied to Enterprise Solutions', time: '1 day ago' }
      ]
    },
    {
      id: 6,
      name: 'Sarah Johnson',
      title: 'QA Automation Engineer',
      skills: ['Selenium', 'Java', 'API Testing'],
      resumeVersions: 2,
      applications: 7,
      matches: 9,
      responses: 2,
      lastActive: '4 hours ago',
      availability: '2 weeks',
      recentActivity: [
        { type: 'match', detail: 'New match: QA Lead at Testing Solutions', time: '4 hours ago' },
        { type: 'resume', detail: 'Updated QA automation resume', time: '2 days ago' }
      ]
    }
  ];

  const totalStats = {
    totalCandidates: candidates.length,
    totalApplications: candidates.reduce((sum, c) => sum + c.applications, 0),
    totalMatches: candidates.reduce((sum, c) => sum + c.matches, 0),
    totalResponses: candidates.reduce((sum, c) => sum + c.responses, 0)
  };

  const handleViewCandidate = (candidateId) => {
    navigate(`/business/candidate/${candidateId}`);
  };

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            Consultancy Command Center
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">
            Manage your entire team and track all candidate activities
          </p>
        </motion.div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Active Candidates" value={totalStats.totalCandidates.toString()} icon={Users} trend="up" />
          <StatCard title="Total Applications" value={totalStats.totalApplications.toString()} change="+12 this week" icon={EnvelopeSimple} trend="up" />
          <StatCard title="Total Matches" value={totalStats.totalMatches.toString()} change="+8 today" icon={Target} trend="up" />
          <StatCard title="Total Responses" value={totalStats.totalResponses.toString()} change="+5 this week" icon={ChartLine} trend="up" />
        </div>

        {/* Candidates Overview */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">
            Your Candidates
          </h2>
          <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
            + Add New Candidate
          </button>
        </div>

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              data-testid={`candidate-card-${candidate.id}`}
            >
              {/* Header with Avatar */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold font-outfit text-zinc-900 dark:text-zinc-50 truncate">
                    {candidate.name}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">{candidate.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {candidate.availability}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">• Active {candidate.lastActive}</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {candidate.skills.map((skill, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 mx-auto mb-1 rounded-lg bg-blue-500/10">
                    <FileText size={18} className="text-blue-600 dark:text-blue-400" weight="duotone" />
                  </div>
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{candidate.resumeVersions}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Resumes</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 mx-auto mb-1 rounded-lg bg-amber-500/10">
                    <EnvelopeSimple size={18} className="text-amber-600 dark:text-amber-400" weight="duotone" />
                  </div>
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{candidate.applications}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Applied</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 mx-auto mb-1 rounded-lg bg-emerald-500/10">
                    <Target size={18} className="text-emerald-600 dark:text-emerald-400" weight="duotone" />
                  </div>
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{candidate.matches}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Matches</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 mx-auto mb-1 rounded-lg bg-purple-500/10">
                    <ChartLine size={18} className="text-purple-600 dark:text-purple-400" weight="duotone" />
                  </div>
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{candidate.responses}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Responses</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mb-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Recent Activity
                </p>
                <div className="space-y-2">
                  {candidate.recentActivity.slice(0, 2).map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                        activity.type === 'response' ? 'bg-emerald-500' :
                        activity.type === 'application' ? 'bg-blue-500' :
                        activity.type === 'match' ? 'bg-amber-500' : 'bg-zinc-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-zinc-700 dark:text-zinc-300 truncate">{activity.detail}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleViewCandidate(candidate.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
                data-testid={`view-candidate-${candidate.id}`}
              >
                <Eye size={18} weight="bold" />
                View Full Profile
              </button>
            </motion.div>
          ))}
        </div>

        {/* Quick Summary Table */}
        <div className="mt-8 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Team Performance Summary
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="text-left py-3 px-4 font-bold uppercase tracking-wider text-xs text-zinc-500 dark:text-zinc-400">Candidate</th>
                  <th className="text-center py-3 px-4 font-bold uppercase tracking-wider text-xs text-zinc-500 dark:text-zinc-400">Resumes</th>
                  <th className="text-center py-3 px-4 font-bold uppercase tracking-wider text-xs text-zinc-500 dark:text-zinc-400">Applications</th>
                  <th className="text-center py-3 px-4 font-bold uppercase tracking-wider text-xs text-zinc-500 dark:text-zinc-400">Matches</th>
                  <th className="text-center py-3 px-4 font-bold uppercase tracking-wider text-xs text-zinc-500 dark:text-zinc-400">Responses</th>
                  <th className="text-center py-3 px-4 font-bold uppercase tracking-wider text-xs text-zinc-500 dark:text-zinc-400">Availability</th>
                  <th className="text-center py-3 px-4 font-bold uppercase tracking-wider text-xs text-zinc-500 dark:text-zinc-400">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-zinc-900 dark:text-zinc-50">{candidate.name}</p>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400">{candidate.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-semibold text-zinc-900 dark:text-zinc-50">{candidate.resumeVersions}</td>
                    <td className="py-4 px-4 text-center font-semibold text-zinc-900 dark:text-zinc-50">{candidate.applications}</td>
                    <td className="py-4 px-4 text-center font-semibold text-zinc-900 dark:text-zinc-50">{candidate.matches}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {candidate.responses}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-xs text-zinc-600 dark:text-zinc-400">{candidate.availability}</td>
                    <td className="py-4 px-4 text-center text-xs text-zinc-600 dark:text-zinc-400">{candidate.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BusinessDashboard;