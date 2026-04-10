import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Download, Copy, MagicWand } from '@phosphor-icons/react';
import { mockResumes } from '../../data/mockData';

const ResumeGenerator = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [jobDescription, setJobDescription] = useState('');
  const [selectedResume, setSelectedResume] = useState(mockResumes.find(r => r.isDefault)?.id || mockResumes[0]?.id);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedResume({
        content: `JOHN DOE\nSenior Software Engineer\n\nPROFESSIONAL SUMMARY\nHighly skilled software engineer with 8+ years of experience in ${jobDescription.includes('React') ? 'React, Node.js, and modern web technologies' : 'full-stack development'}. Proven track record of delivering scalable solutions...\n\nKEY SKILLS\n• ${jobDescription.includes('React') ? 'React.js, Redux, Hooks' : 'JavaScript, TypeScript'}\n• ${jobDescription.includes('Node') ? 'Node.js, Express.js' : 'Backend Development'}\n• AWS, Docker, Kubernetes\n• Agile/Scrum methodologies\n\nEXPERIENCE\nSenior Software Engineer | Tech Corp (2020-Present)\n• Led development of microservices architecture serving 1M+ users\n• Optimized application performance by 40%\n${jobDescription.includes('team') ? '• Mentored team of 5 junior developers' : ''}\n\nSOFTWARE ENGINEER | Digital Inc (2017-2020)\n• Built RESTful APIs handling 10K requests/second\n• Implemented CI/CD pipelines reducing deployment time by 60%`,
        atsScore: 94,
        matchedKeywords: jobDescription.split(' ').filter(w => w.length > 4).slice(0, 8)
      });
      setIsGenerating(false);
      setStep(3);
    }, 3000);
  };

  return (
    <DashboardLayout userType={user?.type || 'candidate'}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
              <Sparkle size={24} weight="duotone" className="text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">AI Resume Generator</h1>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Tailor your resume to any job description with AI</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                step >= s
                  ? 'bg-purple-600 text-white'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${
                step > s ? 'bg-purple-600' : 'bg-zinc-200 dark:bg-zinc-800'
              }`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Job Description */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8"
          >
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Paste Job Description</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">Copy and paste the job description you want to tailor your resume for</p>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description here...\n\nExample:\nWe're looking for a Senior React Developer with 5+ years of experience...\n• Strong knowledge of React, Redux, Hooks\n• Experience with Node.js and Express\n• AWS deployment experience"
              className="w-full h-64 px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
            />
            <button
              onClick={() => setStep(2)}
              disabled={!jobDescription.trim()}
              className="mt-4 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next: Select Resume
            </button>
          </motion.div>
        )}

        {/* Step 2: Select Resume */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8"
          >
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Select Base Resume</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">Choose which resume to use as a template (default selected)</p>
            <div className="space-y-3 mb-6">
              {mockResumes.slice(0, 6).map((resume) => (
                <div
                  key={resume.id}
                  onClick={() => setSelectedResume(resume.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedResume === resume.id
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/20'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className={selectedResume === resume.id ? 'text-purple-600' : 'text-zinc-500'} />
                      <div>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{resume.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{resume.tags.slice(0, 3).join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {resume.isDefault && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded">DEFAULT</span>
                      )}
                      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{resume.atsScore}% ATS</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 font-semibold rounded-lg hover:border-purple-600 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all"
              >
                <MagicWand size={20} weight="duotone" />
                Generate Tailored Resume
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Generated Resume */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {isGenerating ? (
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-12 text-center">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Generating your tailored resume...</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">AI is analyzing the job description and optimizing your resume</p>
              </div>
            ) : generatedResume && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Resume Generated Successfully!</h2>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">ATS Score:</span>
                          <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-bold rounded">{generatedResume.atsScore}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">Keywords Matched:</span>
                          <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">{generatedResume.matchedKeywords.length}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 font-semibold rounded-lg hover:border-purple-600 transition-all flex items-center gap-2">
                        <Copy size={18} />
                        Copy
                      </button>
                      <button className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2">
                        <Download size={18} />
                        Download
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {generatedResume.matchedKeywords.map((keyword, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white/50 dark:bg-zinc-900/30 text-xs font-medium text-purple-700 dark:text-purple-400 rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-900 dark:text-zinc-50 leading-relaxed">{generatedResume.content}</pre>
                </div>
                <button
                  onClick={() => { setStep(1); setGeneratedResume(null); setJobDescription(''); }}
                  className="w-full py-3 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 font-semibold rounded-lg hover:border-purple-600 transition-all"
                >
                  Generate Another Resume
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ResumeGenerator;