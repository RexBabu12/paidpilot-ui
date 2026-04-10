import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Download, Copy, MagicWand, MagnifyingGlass, User } from '@phosphor-icons/react';
import { mockResumes, mockBenchCandidates } from '../../data/mockData';

const BusinessResumeGenerator = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidateSearch, setCandidateSearch] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [selectedResume, setSelectedResume] = useState(null);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredCandidates = mockBenchCandidates.filter(c =>
    c.name.toLowerCase().includes(candidateSearch.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(candidateSearch.toLowerCase()))
  );

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedResume({
        content: `${selectedCandidate.name.toUpperCase()}\\n${selectedCandidate.primaryRole}\\n\\nPROFESSIONAL SUMMARY\\nHighly skilled ${selectedCandidate.primaryRole} with ${selectedCandidate.experience} of experience in ${jobDescription.includes('React') ? 'React, Node.js, and modern web technologies' : 'full-stack development'}. Proven track record...\\n\\nKEY SKILLS\\n${selectedCandidate.skills.slice(0, 8).map(s => '\u2022 ' + s).join('\\n')}\\n\\nEXPERIENCE\\nSenior Engineer | Previous Company (2020-Present)\\n\u2022 Led development of microservices architecture\\n\u2022 Optimized performance by 40%\\n${jobDescription.includes('team') ? '\u2022 Mentored team members' : ''}`,
        atsScore: 92,
        matchedKeywords: jobDescription.split(' ').filter(w => w.length > 4).slice(0, 8)
      });
      setIsGenerating(false);
      setStep(4);
    }, 3000);
  };

  return (
    <DashboardLayout userType={user?.type || 'business'}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
              <Sparkles size={24} weight="duotone" className="text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">AI Resume Generator</h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Generate tailored resumes for your candidates</p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                step >= s ? 'bg-purple-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
              }`}>{s}</div>
              {s < 4 && <div className={`w-12 h-0.5 ${step > s ? 'bg-purple-600' : 'bg-zinc-200 dark:bg-zinc-800'}`} />}
            </div>
          ))}\n        </div>

        {/* Step 1: Select Candidate */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Select Candidate</h2>
            <div className="relative mb-6">
              <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={candidateSearch}
                onChange={(e) => setCandidateSearch(e.target.value)}
                placeholder="Search by name or skills..."
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  onClick={() => { setSelectedCandidate(candidate); setStep(2); }}
                  className="p-4 border-2 border-zinc-200 dark:border-zinc-800 rounded-lg cursor-pointer hover:border-purple-600 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{candidate.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{candidate.primaryRole} \u2022 {candidate.experience}</p>
                    </div>
                    <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded">{candidate.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 6).map((skill, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 rounded">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Job Description */}
        {step === 2 && selectedCandidate && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{selectedCandidate.name}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{selectedCandidate.primaryRole}</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Paste Job Description</h2>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description here..."
              className="w-full h-64 px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button onClick={() => setStep(1)} className="px-6 py-3 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-purple-600">Back</button>
              <button onClick={() => setStep(3)} disabled={!jobDescription.trim()} className="flex-1 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50">Next: Select Resume</button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Select Resume */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Select Base Resume</h2>
            <div className="space-y-3 mb-6">
              {mockResumes.slice(0, 6).map((resume) => (
                <div key={resume.id} onClick={() => setSelectedResume(resume.id)} className={`p-4 border-2 rounded-lg cursor-pointer ${
                  selectedResume === resume.id ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/20' : 'border-zinc-200 dark:border-zinc-800 hover:border-purple-400'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className={selectedResume === resume.id ? 'text-purple-600' : 'text-zinc-500'} />
                      <div>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{resume.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{resume.tags.slice(0, 3).join(', ')}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{resume.atsScore}% ATS</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-6 py-3 border border-zinc-200 dark:border-zinc-800 rounded-lg">Back</button>
              <button onClick={handleGenerate} disabled={!selectedResume} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50">
                <MagicWand size={20} weight="duotone" />Generate Resume
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Generated */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            {isGenerating ? (
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-12 text-center">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Generating tailored resume...</p>
              </div>
            ) : generatedResume && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Resume Generated!</h2>
                      <div className="flex items-center gap-4">
                        <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-bold rounded">ATS: {generatedResume.atsScore}%</span>
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">Keywords: {generatedResume.matchedKeywords.length}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-purple-600 flex items-center gap-2"><Copy size={18} />Copy</button>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"><Download size={18} />Download</button>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-900 dark:text-zinc-50 leading-relaxed">{generatedResume.content}</pre>
                </div>
                <button onClick={() => { setStep(1); setGeneratedResume(null); setJobDescription(''); setSelectedCandidate(null); setSelectedResume(null); }} className="w-full py-3 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-purple-600">Generate Another Resume</button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BusinessResumeGenerator;
