import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { User, MapPin, Phone, EnvelopeSimple, LinkedinLogo, Briefcase, Clock, CurrencyDollar, FileText, GlobeHemisphereWest, Upload, Pencil, Check } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const CandidateProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    // Personal Information
    fullName: 'John Candidate',
    email: 'candidate@demo.com',
    phone: '+1 (555) 123-4567',
    currentLocation: 'Dallas, TX',
    linkedInUrl: 'https://linkedin.com/in/johncandidate',
    
    // Professional Information
    currentTitle: 'Senior Java Developer',
    yearsOfExperience: '10',
    visaStatus: 'H1B',
    
    // Work Preferences
    preferredEngagement: ['C2C', 'W2'],
    preferredWorkMode: ['Remote', 'Hybrid'],
    preferredLocations: ['Dallas, TX', 'Austin, TX', 'Remote'],
    excludedLocations: ['California', 'New York'],
    availability: 'Immediate',
    expectedRate: '$85/hr',
    
    // Skills
    primarySkills: ['Java', 'Spring Boot', 'Microservices', 'AWS', 'Docker'],
    secondarySkills: ['Kubernetes', 'Jenkins', 'PostgreSQL', 'Redis'],
    domains: ['Fintech', 'E-commerce', 'Healthcare'],
    
    // Job Preferences
    targetRoles: ['Senior Java Developer', 'Lead Java Engineer', 'Backend Architect'],
    preferredIndustries: ['Technology', 'Finance', 'Healthcare']
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save profile logic
  };

  return (
    <DashboardLayout userType="candidate">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                My Profile
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Manage your professional information and preferences.
              </p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200"
                data-testid="edit-profile-button"
              >
                <Pencil size={20} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200"
                  data-testid="save-profile-button"
                >
                  <Check size={20} weight="bold" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </motion.div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-6 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 p-1 rounded-lg">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="preferences">Work Preferences</TabsTrigger>
            <TabsTrigger value="skills">Skills & Expertise</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
              <h2 className="text-2xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
                Personal Information
              </h2>

              {/* Profile Photo */}
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
                <div className="w-24 h-24 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                  {profile.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                    Profile Photo
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    Upload a professional photo (JPG, PNG, max 5MB)
                  </p>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <Upload size={16} />
                    Upload Photo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    <User size={16} className="inline mr-1" /> Full Name *
                  </label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    <EnvelopeSimple size={16} className="inline mr-1" /> Email Address *
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled={true}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 opacity-60"
                  />
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Email cannot be changed</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    <Phone size={16} className="inline mr-1" /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                  />
                </div>

                {/* Current Location */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    <MapPin size={16} className="inline mr-1" /> Current Location *
                  </label>
                  <input
                    type="text"
                    value={profile.currentLocation}
                    onChange={(e) => setProfile({ ...profile, currentLocation: e.target.value })}
                    disabled={!isEditing}
                    placeholder="City, State"
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                  />
                </div>

                {/* LinkedIn */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    <LinkedinLogo size={16} className="inline mr-1" /> LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={profile.linkedInUrl}
                    onChange={(e) => setProfile({ ...profile, linkedInUrl: e.target.value })}
                    disabled={!isEditing}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Professional Information */}
          <TabsContent value="professional">
            <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
              <h2 className="text-2xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
                Professional Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Title */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    <Briefcase size={16} className="inline mr-1" /> Current Title *
                  </label>
                  <input
                    type="text"
                    value={profile.currentTitle}
                    onChange={(e) => setProfile({ ...profile, currentTitle: e.target.value })}
                    disabled={!isEditing}
                    placeholder="e.g., Senior Java Developer"
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                  />
                </div>

                {/* Years of Experience */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    <Clock size={16} className="inline mr-1" /> Years of Experience *
                  </label>
                  <select
                    value={profile.yearsOfExperience}
                    onChange={(e) => setProfile({ ...profile, yearsOfExperience: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                  >
                    <option value="1-2">1-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-7">5-7 years</option>
                    <option value="7-10">7-10 years</option>
                    <option value="10">10+ years</option>
                  </select>
                </div>

                {/* Visa Status */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    <GlobeHemisphereWest size={16} className="inline mr-1" /> Work Authorization *
                  </label>
                  <select
                    value={profile.visaStatus}
                    onChange={(e) => setProfile({ ...profile, visaStatus: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                  >
                    <option value="USC">US Citizen</option>
                    <option value="GC">Green Card</option>
                    <option value="H1B">H1B</option>
                    <option value="EAD">EAD</option>
                    <option value="OPT">OPT</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    <Clock size={16} className="inline mr-1" /> Availability *
                  </label>
                  <select
                    value={profile.availability}
                    onChange={(e) => setProfile({ ...profile, availability: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="1 week">1 week</option>
                    <option value="2 weeks">2 weeks</option>
                    <option value="1 month">1 month</option>
                    <option value="2+ months">2+ months</option>
                  </select>
                </div>

                {/* Expected Rate */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    <CurrencyDollar size={16} className="inline mr-1" /> Expected Rate/Salary *
                  </label>
                  <input
                    type="text"
                    value={profile.expectedRate}
                    onChange={(e) => setProfile({ ...profile, expectedRate: e.target.value })}
                    disabled={!isEditing}
                    placeholder="e.g., $85/hr or $150K/year"
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Work Preferences */}
          <TabsContent value="preferences">
            <div className="space-y-6">
              {/* Engagement Type Preferences */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                  Engagement Type Preferences
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['C2C', 'W2', 'Full-time', 'Contract'].map((type) => (
                    <label
                      key={type}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${
                        profile.preferredEngagement.includes(type)
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-500/10'
                          : 'border-zinc-200 dark:border-zinc-800'
                      } ${!isEditing && 'opacity-60 cursor-not-allowed'}`}
                    >
                      <input
                        type="checkbox"
                        checked={profile.preferredEngagement.includes(type)}
                        disabled={!isEditing}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProfile({ ...profile, preferredEngagement: [...profile.preferredEngagement, type] });
                          } else {
                            setProfile({ ...profile, preferredEngagement: profile.preferredEngagement.filter(t => t !== type) });
                          }
                        }}
                        className="w-4 h-4 rounded border-zinc-300 text-blue-600"
                      />
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Work Mode Preferences */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                  Work Mode Preferences
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
                    <label
                      key={mode}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${
                        profile.preferredWorkMode.includes(mode)
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-500/10'
                          : 'border-zinc-200 dark:border-zinc-800'
                      } ${!isEditing && 'opacity-60 cursor-not-allowed'}`}
                    >
                      <input
                        type="checkbox"
                        checked={profile.preferredWorkMode.includes(mode)}
                        disabled={!isEditing}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProfile({ ...profile, preferredWorkMode: [...profile.preferredWorkMode, mode] });
                          } else {
                            setProfile({ ...profile, preferredWorkMode: profile.preferredWorkMode.filter(m => m !== mode) });
                          }
                        }}
                        className="w-4 h-4 rounded border-zinc-300 text-blue-600"
                      />
                      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Preferences */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                  Preferred Locations
                </h3>
                <textarea
                  value={profile.preferredLocations.join(', ')}
                  onChange={(e) => setProfile({ ...profile, preferredLocations: e.target.value.split(',').map(l => l.trim()) })}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Dallas, TX, Austin, TX, Remote"
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">Separate multiple locations with commas</p>
              </div>

              {/* Excluded Locations */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                  Excluded Locations
                </h3>
                <textarea
                  value={profile.excludedLocations.join(', ')}
                  onChange={(e) => setProfile({ ...profile, excludedLocations: e.target.value.split(',').map(l => l.trim()) })}
                  disabled={!isEditing}
                  rows={2}
                  placeholder="California, New York"
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">Locations you don't want to work in</p>
              </div>
            </div>
          </TabsContent>

          {/* Skills & Expertise */}
          <TabsContent value="skills">
            <div className="space-y-6">
              {/* Primary Skills */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                  Primary Skills
                </h3>
                <textarea
                  value={profile.primarySkills.join(', ')}
                  onChange={(e) => setProfile({ ...profile, primarySkills: e.target.value.split(',').map(s => s.trim()) })}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Java, Spring Boot, Microservices, AWS"
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {profile.primarySkills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 text-sm rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Secondary Skills */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                  Secondary Skills
                </h3>
                <textarea
                  value={profile.secondarySkills.join(', ')}
                  onChange={(e) => setProfile({ ...profile, secondarySkills: e.target.value.split(',').map(s => s.trim()) })}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Kubernetes, Jenkins, PostgreSQL"
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {profile.secondarySkills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Domain Expertise */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                  Domain Expertise
                </h3>
                <textarea
                  value={profile.domains.join(', ')}
                  onChange={(e) => setProfile({ ...profile, domains: e.target.value.split(',').map(d => d.trim()) })}
                  disabled={!isEditing}
                  rows={2}
                  placeholder="Fintech, E-commerce, Healthcare"
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                />
              </div>

              {/* Target Roles */}
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <h3 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                  Target Job Roles
                </h3>
                <textarea
                  value={profile.targetRoles.join(', ')}
                  onChange={(e) => setProfile({ ...profile, targetRoles: e.target.value.split(',').map(r => r.trim()) })}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Senior Java Developer, Lead Engineer, Backend Architect"
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CandidateProfile;