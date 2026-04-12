import React, { useMemo } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import {
  mockBusinessCandidates, mockJobs, mockAnalytics,
  mockOutreachLogs, mockBenchStats, mockTeamMembers
} from '../../data/mockData';
import {
  Users, Briefcase, EnvelopeSimple, ArrowUp, Clock,
  LinkedinLogo, Warning, XCircle, ArrowRight,
  ArrowBendUpRight, ChartBar, UserCircle
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const BENCH_REF_DATE = new Date('2025-02-09');
const daysSince = (dateStr) => Math.floor((BENCH_REF_DATE - new Date(dateStr)) / 86400000);

const initials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

const avatarColors = [
  'bg-blue-600', 'bg-emerald-600', 'bg-violet-600',
  'bg-amber-600', 'bg-rose-600', 'bg-teal-600',
  'bg-indigo-600', 'bg-orange-600', 'bg-cyan-600', 'bg-pink-600'
];
const avatarColor = (id) => avatarColors[(id - 1) % avatarColors.length];

// ─── KPI Card ─────────────────────────────────────────────────────────────────
const KpiCard = ({ label, value, sub, icon: Icon, iconBg, iconColor, badge, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay }}
    className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
  >
    <div className="flex items-start justify-between mb-3">
      <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center`}>
        <Icon size={18} weight="duotone" className={iconColor} />
      </div>
      {badge && (
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-0.5">
          <ArrowUp size={9} weight="bold" />{badge}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-0.5">{value}</p>
    <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{label}</p>
    {sub && <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">{sub}</p>}
  </motion.div>
);

// ─── Weekly Bar Chart ─────────────────────────────────────────────────────────
const WeeklyBarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.total));
  return (
    <div className="flex items-end gap-2 h-32 pt-2">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">{d.total}</span>
          <div className="w-full flex flex-col gap-0.5" style={{ height: `${Math.max((d.total / max) * 88, 4)}px` }}>
            <div
              className="w-full bg-violet-400 dark:bg-violet-500 rounded-t-sm"
              style={{ height: `${(d.followups / d.total) * 100}%`, minHeight: d.followups > 0 ? '3px' : '0' }}
              title={`${d.followups} follow-ups`}
            />
            <div className="w-full bg-blue-500 dark:bg-blue-400 flex-1 rounded-b-sm" title={`${d.emails} emails`} />
          </div>
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Skills Demand Chart ──────────────────────────────────────────────────────
const SkillsChart = ({ data }) => {
  const max = data[0]?.count || 1;
  return (
    <div className="space-y-2.5">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-xs text-zinc-600 dark:text-zinc-300 w-20 shrink-0 font-medium">{item.skill}</span>
          <div className="flex-1 h-5 bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.count / max) * 100}%` }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.05 }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-400 dark:to-blue-500 rounded-md"
            />
          </div>
          <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 w-10 text-right shrink-0">{item.count}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Activity Item ────────────────────────────────────────────────────────────
const ActivityItem = ({ log, idx }) => {
  const isFollowup = log.is_followup;
  const isBounced  = log.status === 'Bounced';
  const ts = new Date(log.timestamp);
  const diffH = Math.round((BENCH_REF_DATE - ts) / 3600000);
  const timeAgo = diffH < 1 ? 'Just now' : diffH < 24 ? `${diffH}h ago` : `${Math.floor(diffH / 24)}d ago`;

  let icon = EnvelopeSimple, iconBg = 'bg-blue-50 dark:bg-blue-500/10', iconColor = 'text-blue-600 dark:text-blue-400';
  let label = 'Email sent';
  if (isBounced)  { icon = XCircle; iconBg = 'bg-red-50 dark:bg-red-500/10'; iconColor = 'text-red-600 dark:text-red-400'; label = 'Email bounced'; }
  else if (isFollowup) { icon = ArrowBendUpRight; iconBg = 'bg-violet-50 dark:bg-violet-500/10'; iconColor = 'text-violet-600 dark:text-violet-400'; label = 'Follow-up sent'; }

  const Icon = icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.04 }}
      className="flex items-start gap-3 py-2.5 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
    >
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${iconBg}`}>
        <Icon size={14} weight="duotone" className={iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{label}</p>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">{log.candidate}</span>
          {' → '}{log.job}
        </p>
        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 flex items-center gap-1">
          <Clock size={9} /> {timeAgo}
          <span className="ml-1 text-zinc-300 dark:text-zinc-600">·</span>
          <UserCircle size={9} className="ml-0.5" /> {log.actor}
        </p>
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const BusinessDashboard = () => {

  // ── Computed values ──
  const benchSize = mockBusinessCandidates.length;
  const totalEmailsSent = mockBenchStats.reduce((s, c) => s + c.emailsSent, 0);
  const totalFollowups  = mockBenchStats.reduce((s, c) => s + c.followupsSent, 0);
  const totalBounced    = mockBenchStats.reduce((s, c) => s + c.bouncedCount, 0);

  const emailsSentToday   = mockOutreachLogs.filter(l => l.timestamp.startsWith('2025-02-09') && !l.is_followup && l.status !== 'Bounced').length;
  const followupsThisWeek = mockOutreachLogs.filter(l => l.is_followup).length;
  const bouncedThisWeek   = mockOutreachLogs.filter(l => l.status === 'Bounced').length;

  // ── Matched jobs today ── jobs whose skills intersect any bench candidate's skills
  const matchedJobs = useMemo(() => {
    return mockJobs.map(job => {
      const matches = mockBusinessCandidates.filter(c =>
        c.skills.some(skill => job.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase()))
      );
      return matches.length > 0 ? { job, matches } : null;
    }).filter(Boolean);
  }, []);

  // ── Bench candidate table merged with stats ──
  const benchTable = mockBusinessCandidates.map(c => {
    const stats = mockBenchStats.find(s => s.candidateId === c.id) || {};
    const idle = daysSince(stats.lastActivityDate || '2025-01-01') >= 7;
    return { ...c, ...stats, idle };
  });

  // ── Weekly outreach (Mon–Sun: week of Feb 3–9 2025) ──
  const weeklyData = [
    { label: 'Mon', emails: 5,  followups: 2,  total: 7  },
    { label: 'Tue', emails: 8,  followups: 3,  total: 11 },
    { label: 'Wed', emails: 11, followups: 4,  total: 15 },
    { label: 'Thu', emails: 7,  followups: 2,  total: 9  },
    { label: 'Fri', emails: 10, followups: 4,  total: 14 },
    { label: 'Sat', emails: 2,  followups: 1,  total: 3  },
    { label: 'Sun', emails: 1,  followups: 0,  total: 1  },
  ];

  // ── Skills demand top 10 ──
  const skillsDemand = [
    { skill: 'Java',        count: 234 },
    { skill: 'Python',      count: 189 },
    { skill: 'React',       count: 167 },
    { skill: 'AWS',         count: 156 },
    { skill: 'DevOps',      count: 142 },
    { skill: '.NET',        count: 118 },
    { skill: 'Kubernetes',  count: 97  },
    { skill: 'Docker',      count: 89  },
    { skill: 'Spring Boot', count: 76  },
    { skill: 'TypeScript',  count: 64  },
  ];

  // ── Recent activity — email_sent / followup_sent / email_bounced only ──
  const recentLogs = [...mockOutreachLogs]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 10);

  // ── Team activity summary ──
  const teamActivity = mockTeamMembers.slice(0, 3).map(m => ({
    ...m,
    todayCount: mockOutreachLogs.filter(l => l.actor === m.name && l.timestamp.startsWith('2025-02-09')).length
  }));

  return (
    <DashboardLayout userType="business">
      <div className="max-w-[1800px] mx-auto" data-testid="business-dashboard">

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Dashboard</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Staffing operations — scraper activity, bench, and outreach</p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            ROW 1 — 6 KPI cards (Scraper | Outreach)
        ══════════════════════════════════════════════════════ */}
        <div className="mb-6">
          {/* Group labels */}
          <div className="grid grid-cols-2 gap-4 mb-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
              <ChartBar size={11} /> Scraper Activity
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
              <EnvelopeSimple size={11} /> Outreach Activity
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
            {/* — SCRAPER — */}
            <KpiCard label="Dice Jobs Today"   value={mockAnalytics.jobsScraped.today > 50 ? 43 : mockAnalytics.jobsScraped.today}
              sub="New listings" icon={Briefcase}     iconBg="bg-orange-50 dark:bg-orange-500/10" iconColor="text-orange-500 dark:text-orange-400" badge="+8%" delay={0} />
            <KpiCard label="LinkedIn Jobs Today" value={mockAnalytics.jobsScraped.today}
              sub="Posts scraped" icon={LinkedinLogo}  iconBg="bg-blue-50 dark:bg-blue-500/10"   iconColor="text-blue-600 dark:text-blue-400"   badge="+12%" delay={0.04} />
            <KpiCard label="Total Jobs This Week" value={mockAnalytics.jobsScraped.week.toLocaleString()}
              sub="All sources"  icon={ChartBar}       iconBg="bg-zinc-100 dark:bg-zinc-800"      iconColor="text-zinc-600 dark:text-zinc-400"   delay={0.08} />
            {/* — OUTREACH — */}
            <KpiCard label="Bench Size"        value={benchSize}
              sub="Active candidates"  icon={Users}           iconBg="bg-emerald-50 dark:bg-emerald-500/10" iconColor="text-emerald-600 dark:text-emerald-400" delay={0.12} />
            <KpiCard label="Emails Sent Today" value={emailsSentToday}
              sub="Initial outreach"   icon={EnvelopeSimple}  iconBg="bg-indigo-50 dark:bg-indigo-500/10"   iconColor="text-indigo-600 dark:text-indigo-400"  badge="+3" delay={0.16} />
            <KpiCard label="Follow-ups This Week" value={`${followupsThisWeek}`}
              sub={`+ ${bouncedThisWeek} bounced`} icon={ArrowBendUpRight} iconBg="bg-violet-50 dark:bg-violet-500/10" iconColor="text-violet-600 dark:text-violet-400" delay={0.2} />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            ROW 2 — 3-State Funnel  |  Matched Jobs Today
        ══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">

          {/* Left: 3-state funnel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.22 }}
            className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
            data-testid="outreach-funnel"
          >
            <h2 className="text-sm font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Outreach Pipeline</h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-5">Honest 3-state view — no reply tracking</p>
            <div className="flex items-stretch gap-0">
              {[
                { label: 'On Bench',     value: benchSize,       sub: 'candidates ready',   color: 'bg-zinc-100 dark:bg-zinc-800', text: 'text-zinc-900 dark:text-zinc-50', sub2: 'text-zinc-500' },
                { label: 'Emails Sent',  value: totalEmailsSent, sub: 'total initial emails',color: 'bg-blue-50 dark:bg-blue-500/10', text: 'text-blue-700 dark:text-blue-300', sub2: 'text-blue-500/70' },
                { label: 'Follow-ups',   value: totalFollowups,  sub: 'follow-up emails sent', color: 'bg-violet-50 dark:bg-violet-500/10', text: 'text-violet-700 dark:text-violet-300', sub2: 'text-violet-500/70' },
              ].map((stage, i) => (
                <React.Fragment key={i}>
                  <div className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl ${stage.color}`}>
                    <p className={`text-3xl font-bold font-outfit ${stage.text}`}>{stage.value}</p>
                    <p className={`text-xs font-semibold mt-1 ${stage.text}`}>{stage.label}</p>
                    <p className={`text-[10px] text-center mt-0.5 ${stage.sub2} dark:opacity-80`}>{stage.sub}</p>
                  </div>
                  {i < 2 && (
                    <div className="flex items-center px-2 shrink-0">
                      <ArrowRight size={16} className="text-zinc-300 dark:text-zinc-600" weight="bold" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            {/* Bounced note */}
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <XCircle size={14} className="text-red-500 flex-shrink-0" weight="duotone" />
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold text-red-600 dark:text-red-400">{totalBounced} bounced</span> total — check email addresses
              </p>
            </div>
          </motion.div>

          {/* Right: Matched Jobs Today */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.26 }}
            className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
            data-testid="matched-jobs-today"
          >
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Matched Jobs Today</h2>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                {matchedJobs.length} matches
              </span>
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-3">Scraped jobs whose skills overlap your bench candidates</p>
            <div className="space-y-2.5 max-h-52 overflow-y-auto pr-0.5">
              {matchedJobs.slice(0, 6).map(({ job, matches }, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 truncate">{job.role_title}</p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">{job.author_company} · {job.engagement_type} · {job.rate_raw}</p>
                    {/* Matching candidates inline */}
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <span className="text-[9px] font-bold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mr-0.5">Matches:</span>
                      {matches.slice(0, 3).map((c, ci) => (
                        <span key={ci} className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-semibold text-white ${avatarColor(c.id)}`}>
                          {initials(c.name)}
                        </span>
                      ))}
                      {matches.length > 3 && (
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">+{matches.length - 3}</span>
                      )}
                    </div>
                  </div>
                  <div className={`flex-shrink-0 px-2 py-1 rounded-md text-[10px] font-bold border ${job.engagement_type === 'C2C' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' : 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20'}`}>
                    {job.engagement_type}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════
            ROW 3 — Bench Table  |  Skills Demand Chart
        ══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">

          {/* Left: Bench candidates table */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
            className="lg:col-span-3 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden"
            data-testid="bench-candidates-table"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <h2 className="text-sm font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Bench Candidates</h2>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">Idle = no activity in 7+ days</p>
              </div>
              <a href="/business/candidates" className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                All <ArrowRight size={12} weight="bold" />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800">
                  <tr>
                    {['Candidate', 'Emails Sent', 'Follow-ups', 'Last Activity', 'Status'].map((h, i) => (
                      <th key={i} className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ${i === 0 ? 'text-left' : 'text-center'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {benchTable.map((c, idx) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 + idx * 0.04 }}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                      data-testid={`bench-row-${c.id}`}
                    >
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full ${avatarColor(c.id)} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                            {initials(c.name)}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">{c.name}</p>
                            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate max-w-[100px]">{c.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{c.emailsSent}</span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="text-sm font-bold text-violet-600 dark:text-violet-400">{c.followupsSent}</span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`text-[11px] ${c.idle ? 'text-red-500 dark:text-red-400 font-semibold' : 'text-zinc-400 dark:text-zinc-500'}`}>
                          {c.idle
                            ? `${daysSince(c.lastActivityDate)}d ago`
                            : c.lastActivityDate === '2025-02-09' ? 'Today' : `${daysSince(c.lastActivityDate)}d ago`
                          }
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        {c.idle ? (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20">
                            <Warning size={9} weight="fill" /> Idle
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                            Active
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Right: Skills Demand Chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.32 }}
            className="lg:col-span-2 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
            data-testid="skills-demand-chart"
          >
            <h2 className="text-sm font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Skills in Demand</h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-4">Top 10 skills from scraped jobs — last 30 days</p>
            <SkillsChart data={skillsDemand} />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════
            ROW 4 — Weekly Bar Chart  |  Activity + Team
        ══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Left: Weekly outreach bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.36 }}
            className="lg:col-span-2 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
            data-testid="weekly-outreach-chart"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-sm font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Weekly Outreach</h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Emails sent Mon–Sun this week</p>
              </div>
              {/* Legend */}
              <div className="flex gap-3 text-[10px] text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-blue-500 inline-block" /> Email</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-violet-400 inline-block" /> Follow-up</span>
              </div>
            </div>
            <WeeklyBarChart data={weeklyData} />
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
              <span>Total: <span className="font-bold text-zinc-800 dark:text-zinc-200">{weeklyData.reduce((s, d) => s + d.total, 0)}</span> outreach this week</span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <ArrowUp size={11} weight="bold" />+18% vs last week
              </span>
            </div>
          </motion.div>

          {/* Right: Recent Activity + Team */}
          <div className="lg:col-span-3 space-y-5">

            {/* Recent Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.38 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
              data-testid="activity-feed"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-outfit font-semibold text-zinc-900 dark:text-zinc-50">Recent Activity</h2>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">Email sent · Follow-up sent · Bounced only</p>
                </div>
              </div>
              <div>
                {recentLogs.map((log, idx) => (
                  <ActivityItem key={log.id} log={log} idx={idx} />
                ))}
              </div>
            </motion.div>

            {/* Team Activity */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.42 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5"
              data-testid="team-activity"
            >
              <h2 className="text-sm font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-3">Team Activity Today</h2>
              <div className="space-y-2.5">
                {teamActivity.map((member, idx) => {
                  const benchStat = mockBusinessCandidates.filter(c => c.benchRecruiter === member.name).length;
                  return (
                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                      <div className={`w-8 h-8 rounded-full ${avatarColor(idx + 1)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {initials(member.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{member.name}</p>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{member.role} · {benchStat} candidates</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{member.todayCount}</p>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500">sent today</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BusinessDashboard;
