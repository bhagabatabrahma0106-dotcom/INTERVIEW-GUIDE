import { lazy, Suspense, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Mail, Phone, MapPin, GitBranch, Globe, ExternalLink,
  Briefcase, GraduationCap, Award, Code2, BarChart3,
  Database, Layers, ChevronRight, Star, Zap, ArrowDown,
} from 'lucide-react';
import { ErrorBoundary3D } from '../components/three/ErrorBoundary3D';

const ProfileScene = lazy(() => import('../components/three/ProfileScene'));

// ─── Data ────────────────────────────────────────────────────────────────────

const PROFILE = {
  name: 'Bhagabata Brahma',
  title: 'Data Analyst',
  location: 'Whitefield, Bengaluru, KA – 560066',
  summary: 'Results-driven Data Analyst with ~10 months of hands-on experience in Data Analysis, Data Governance, Data Quality Management, and Reporting. Skilled in SQL, MS Excel, Tableau, Python, and Collibra. Experienced with Microsoft Dynamics 365 F&O and SSRS. Pursuing B.Tech (2026) with an 80% academic record.',
  contact: {
    email: 'bhagabatabrahma0106@gmail.com',
    phone: '+91 6371206662',
    github: 'github.com/bhagabatabrahma0106-dotcom',
    portfolio: 'jerry-s-portfolio-web.vercel.app',
    linkedin: 'linkedin.com/in/bhagabata-brahma',
  },
};

const SKILLS = [
  {
    icon: Database, label: 'SQL & Databases', color: '#52B7FF',
    items: ['SQL Server', 'DDL / DML', 'Joins & Aggregations', 'Data Validation', 'ETL Pipelines'],
  },
  {
    icon: BarChart3, label: 'Visualization & BI', color: '#22d3ee',
    items: ['Tableau (5+ Dashboards)', 'MS Excel Advanced', 'Pivot Tables', 'VLOOKUP / XLOOKUP'],
  },
  {
    icon: Code2, label: 'Programming', color: '#e89f00',
    items: ['Python – Pandas, NumPy', 'X++ (Basic)', 'SSRS Reports', 'GPT-Assisted Analysis'],
  },
  {
    icon: Layers, label: 'Data Governance', color: '#10b981',
    items: ['Collibra Platform', 'Data Stewardship', 'Data Lineage', 'Metadata Management'],
  },
];

const EXPERIENCE = [
  {
    company: 'Data Gyan', role: 'Data Analyst Intern',
    period: 'Oct 2024 – Feb 2025', location: 'Bengaluru', color: '#52B7FF',
    highlights: [
      'Consolidated 10,000+ records from LinkedIn, conferences, vendor lists',
      'Authored 50+ SQL scripts for ETL operations in SQL Server',
      'Built 5+ Tableau dashboards — reduced manual reporting by ~30%',
      'Resolved 500+ Data Quality issues, improving accuracy by ~25%',
      'Implemented Governance workflows in Collibra (business glossary, lineage)',
    ],
  },
  {
    company: 'Ghora Technologies', role: 'Technical Trainee – MS Dynamics 365 F&O',
    period: 'Jan 2025 – June 2025', location: 'Bengaluru', color: '#e89f00',
    highlights: [
      'Completed 100+ guided sessions in Dynamics 365 F&O architecture',
      'Mastered advanced SQL: multi-table joins, subqueries, 100+ practice problems',
      'Developed SSRS reports for Purchase Orders & Sales Orders',
      'Analysed FDDs for client implementations (Bangladesh, Zimbabwe)',
      'Studied end-to-end AR/AP flows and financial data pipelines',
    ],
  },
];

const EDUCATION = [
  { degree: 'B.Tech', institution: 'Satyasai Engineering College (SSEC)', year: '2026', score: '80%' },
  { degree: 'Class XII (+2)', institution: 'CHSE, Odisha', year: '2022', score: '77%' },
];

const CERTIFICATIONS = [
  'Collibra Data Governance & Data Catalog – Collibra Platform',
  'Data Management Internship Program – Data Gyan, Bengaluru',
  'SQL for Data Analysis – Hands-on with SQL Server',
];

const ACHIEVEMENTS = [
  'Maintained 80% GPA throughout B.Tech engineering programme',
  'Delivered full-cycle Data Management project — raw data to dashboard',
  'Earned hands-on Collibra expertise (enterprise-grade, highly sought-after)',
  'Built consolidated master dataset in SQL Server from 8+ source categories',
  'Tableau dashboards directly supported strategic client-facing decisions',
];

// ─── Reusable small components ───────────────────────────────────────────────

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-medium"
      style={{ background: `${color}18`, color: `${color}cc`, border: `1px solid ${color}30` }}>
      {label}
    </span>
  );
}

function SectionTitle({ icon: Icon, title, accent }: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string; accent: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${accent}20` }}>
        <Icon className="w-4 h-4" style={{ color: accent }} />
      </div>
      <h2 className="text-base font-bold text-[var(--color-text-primary)] tracking-wide">{title}</h2>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right,${accent}50,transparent)` }} />
    </div>
  );
}

function ContactRow({ icon: Icon, label, href }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; href?: string;
}) {
  const inner = (
    <span className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
      <Icon className="w-3.5 h-3.5 text-[var(--color-text-accent)] shrink-0" />
      <span className="truncate">{label}</span>
    </span>
  );
  return href
    ? <a href={`https://${href}`} target="_blank" rel="noopener noreferrer">{inner}</a>
    : <>{inner}</>;
}

// ─── LEFT PANEL ──────────────────────────────────────────────────────────────

function LeftPanel({ onScrollDown }: { onScrollDown: () => void }) {
  const [useAIHeadshot, setUseAIHeadshot] = useState(true);

  return (
    <div className="flex flex-col justify-center min-h-screen px-8 lg:px-12 xl:px-16 py-16 max-w-2xl">

      {/* ── CyberCrest Tagline Eyebrow ── */}
      <div className="flex items-center gap-3 mb-6 w-full max-w-sm">
        <div className="cyber-tagline-line" />
        <div className="text-[10px] tracking-[0.25em] font-black uppercase text-[#52B7FF] whitespace-nowrap">
          Expert-Led Data Analysis
        </div>
        <div className="cyber-tagline-line" />
      </div>

      {/* ── Identity ── */}
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-6 mb-8">
        
        {/* Avatar with CyberCrest neon glowing border style */}
        <div className="relative shrink-0 group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#52B7FF] via-[#037BCF] to-violet-600 opacity-60 blur-md transition duration-1000 group-hover:opacity-90 group-hover:duration-200 animate-pulse" />
          
          <div className="relative w-22 h-22 rounded-2xl overflow-hidden border border-white/10 bg-[#070714] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105">
            <motion.img
              src="/profile.jpg"
              alt="Bhagabata Brahma"
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ opacity: useAIHeadshot ? 0 : 1, scale: useAIHeadshot ? 1.08 : 1 }}
              transition={{ duration: 0.4 }}
            />
            <motion.img
              src="/profile_enhanced.jpg"
              alt="Bhagabata Brahma (AI Enhanced)"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: useAIHeadshot ? 1 : 0, scale: useAIHeadshot ? 1 : 0.92 }}
              transition={{ duration: 0.4 }}
            />
          </div>
          
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border border-black shadow-md"
            style={{ background: 'linear-gradient(135deg,#52B7FF,#037BCF)', color: 'white' }}
            title="Active & Available">
            ✓
          </span>
        </div>

        {/* Name & Titles */}
        <div>
          <h1 className="text-3xl lg:text-4.5xl font-black tracking-tight leading-tight">
            <span className="text-cyber-blue">{PROFILE.name}</span>
          </h1>
          <p className="text-xs font-black text-cyber-orange uppercase tracking-widest mt-1">{PROFILE.title}</p>
          
          {/* Toggle Headshot Switch button */}
          <button
            onClick={() => setUseAIHeadshot(!useAIHeadshot)}
            className="mt-2.5 flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black tracking-wider uppercase border transition-all duration-200 hover:border-[#52B7FF]/50 hover:bg-[#52B7FF]/5 active:scale-95 cursor-pointer select-none"
            style={{
              background: useAIHeadshot ? 'rgba(82,183,255,0.12)' : 'rgba(255,255,255,0.03)',
              borderColor: useAIHeadshot ? 'rgba(82,183,255,0.3)' : 'rgba(255,255,255,0.1)',
              color: useAIHeadshot ? '#52B7FF' : 'var(--color-text-secondary)',
            }}
          >
            <span>{useAIHeadshot ? '🤖 AI Enhanced' : '👤 Original'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#52B7FF] animate-pulse" />
          </button>
        </div>
      </motion.div>

      {/* ── Contact links inside a clean cyber card border ── */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8 p-4 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]">
        <ContactRow icon={Mail}        label={PROFILE.contact.email} />
        <ContactRow icon={Phone}       label={PROFILE.contact.phone} />
        <ContactRow icon={GitBranch}   label="GitHub Profile"    href={PROFILE.contact.github} />
        <ContactRow icon={Globe}       label="Portfolio Site"    href={PROFILE.contact.portfolio} />
        <ContactRow icon={ExternalLink} label="LinkedIn Profile" href={PROFILE.contact.linkedin} />
      </motion.div>

      {/* ── Summary ── */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.22 }}
        className="mb-8 p-5 rounded-2xl border border-[var(--color-border-accent)] bg-[var(--color-bg-card)]">
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{PROFILE.summary}</p>
      </motion.div>

      {/* ── Quick skills ── */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.32 }}
        className="mb-10">
        <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-3 font-semibold">
          Core Tools
        </p>
        <div className="flex flex-wrap gap-2">
          {['SQL Server','Tableau','MS Excel','Python','Collibra','Dynamics 365','SSRS','Power BI concepts'].map(s => (
            <Tag key={s} label={s} color="#52B7FF" />
          ))}
        </div>
      </motion.div>

      {/* ── Rotating Glow Button cue ── */}
      <div>
        <button onClick={onScrollDown} className="btn-cyber-glow cursor-pointer mt-2 select-none active:scale-95 transition-all">
          <div className="btn-cyber-glow-track" />
          <div className="btn-cyber-glow-inner text-xs font-bold tracking-wider text-white uppercase">
            <span>Explore Portfolio</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#52B7FF] animate-bounce" />
          </div>
        </button>
      </div>
    </div>
  );
}

// ─── HERO with split layout and overlapping full-screen 3D background ───────

function ProfileHero({ onScrollDown }: { onScrollDown: () => void }) {
  return (
    <section id="profile-hero" className="relative min-h-screen w-full overflow-hidden"
      style={{ background: 'var(--color-bg-primary)' }}>

      {/* 3D Background - full screen on all screen sizes */}
      <div className="absolute inset-0 z-0">
        <ErrorBoundary3D>
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-violet-500 animate-ping" />
            </div>
          }>
            <ProfileScene />
          </Suspense>
        </ErrorBoundary3D>
      </div>

      {/* Dark vignette overlay for optimal contrast and legibility */}
      <div className="absolute inset-0 z-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 50%, rgba(10,10,15,0.15) 0%, rgba(10,10,15,0.7) 50%, rgba(10,10,15,0.92) 100%)'
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* ── Left side: Profile details inside a highly readable glass panel ── */}
        <div className="flex-1 lg:flex-[0_0_52%] xl:flex-[0_0_46%] bg-black/60 lg:bg-black/45 backdrop-blur-[14px] border-r border-white/5 flex flex-col justify-center shadow-[25px_0_50px_rgba(0,0,0,0.6)]">
          <LeftPanel onScrollDown={onScrollDown} />
        </div>

        {/* ── Right side: Pure clear view to display the 3D scene on large screens ── */}
        <div className="hidden lg:flex flex-1" />
      </div>
    </section>
  );
}

// ─── DETAILS sections (solid background, fully readable, CyberCrest themed) ───

function SkillsSection() {
  return (
    <div id="skills" className="scroll-mt-24">
      <SectionTitle icon={Code2} title="Core Competencies & Technical Skills" accent="#52B7FF" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SKILLS.map((skill, i) => (
          <motion.div key={skill.label}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
            className="cyber-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(82,183,255,0.1)' }}>
                <skill.icon className="w-4 h-4 text-[#52B7FF]" />
              </div>
              <span className="font-bold text-sm text-[#52B7FF]">{skill.label}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skill.items.map(item => <Tag key={item} label={item} color="#52B7FF" />)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ExperienceSection() {
  return (
    <div id="experience" className="scroll-mt-24">
      <SectionTitle icon={Briefcase} title="Professional Experience" accent="#e89f00" />
      <div className="space-y-5">
        {EXPERIENCE.map((exp, i) => (
          <motion.div key={exp.company}
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
            className="cyber-card p-6">
            <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
              <div>
                <h3 className="font-bold text-[var(--color-text-primary)] text-base">{exp.role}</h3>
                <p className="text-xs font-bold text-cyber-orange mt-1 uppercase tracking-wider">{exp.company}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-[var(--color-text-muted)] font-mono">{exp.period}</div>
                <div className="flex items-center gap-1 text-[11px] text-[var(--color-text-muted)] justify-end mt-0.5">
                  <MapPin className="w-3 h-3" />{exp.location}
                </div>
              </div>
            </div>
            <ul className="space-y-2">
              {exp.highlights.map(h => (
                <li key={h} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-cyber-orange" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function EducationSection() {
  return (
    <div id="education" className="scroll-mt-24">
      <SectionTitle icon={GraduationCap} title="Education" accent="#52B7FF" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {EDUCATION.map((edu, i) => (
          <motion.div key={edu.degree}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
            className="cyber-card p-6 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-[var(--color-text-primary)] text-sm">{edu.degree}</h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{edu.institution}</p>
              <p className="text-[11px] text-[var(--color-text-muted)] font-mono">{edu.year}</p>
            </div>
            <div className="text-2xl font-black text-cyber-blue shrink-0">{edu.score}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CertsAndAchievements() {
  return (
    <div id="certs" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Certifications */}
      <div>
        <SectionTitle icon={Award} title="Certifications & Training" accent="#e89f00" />
        <div className="space-y-3">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div key={cert}
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
              className="cyber-card p-4 flex items-start gap-3">
              <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span className="text-sm text-[var(--color-text-secondary)]">{cert}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <SectionTitle icon={Star} title="Achievements & Highlights" accent="#52B7FF" />
        <div className="space-y-3">
          {ACHIEVEMENTS.map((ach, i) => (
            <motion.div key={ach}
              initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
              className="cyber-card p-4 flex items-start gap-3">
              <Star className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="text-sm text-[var(--color-text-secondary)]">{ach}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CTA to interview prep ───────────────────────────────────────────────────

function InterviewCTA() {
  const navigate = useNavigate();
  return (
    <section className="py-24 px-6 lg:px-16 xl:px-24"
      style={{ background: 'var(--color-bg-secondary)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto text-center rounded-3xl p-10 relative overflow-hidden border border-[#52B7FF]/25 shadow-lg"
        style={{
          background: 'radial-gradient(110% 110% at 0% 0%, #0d1224 0%, rgba(4, 4, 16, 0.95) 100%)',
        }}>
        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(82,183,255,0.15) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,159,0,0.1) 0%, transparent 70%)' }} />

        <div className="relative z-10 space-y-6">
          {/* Eyebrow Tagline */}
          <div className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto">
            <div className="cyber-tagline-line" />
            <div className="text-[9px] tracking-[0.25em] font-black uppercase text-[#52B7FF]">
              PREPARATION GATEWAY
            </div>
            <div className="cyber-tagline-line" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black leading-tight text-[var(--color-text-primary)]">
            Ready to test your <span className="text-cyber-blue">Data Analyst</span> skills?
          </h2>
          <p className="text-[var(--color-text-secondary)] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            160+ curated interview questions across SQL, Python, Excel, Tableau, Statistics & Behavioral — complete with clean answers, mock sessions, and progress stats.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center pt-3">
            <button onClick={() => navigate('/home')} className="btn-cyber-glow cursor-pointer active:scale-95 transition-all select-none">
              <div className="btn-cyber-glow-track" />
              <div className="btn-cyber-glow-inner text-xs font-bold text-[var(--color-text-primary)] uppercase">
                <span>Browse Questions</span>
                <ChevronRight className="w-4 h-4 text-[#52B7FF]" />
              </div>
            </button>
            <button onClick={() => navigate('/mock-interview')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-[var(--color-text-primary)] font-bold text-xs hover:border-[#52B7FF] hover:bg-[#52B7FF]/5 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer">
              Take Mock Interview
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Page root ───────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const detailsRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('skills');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      const sections = ['skills', 'experience', 'education', 'certs'];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative -mt-4 -mx-4 lg:-mt-8 lg:-mx-8 select-none" style={{ background: 'var(--color-bg-primary)' }}>
      {/* Hero: split left/right */}
      <ProfileHero onScrollDown={() => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Details: layout with vertical sticky side tracker */}
      <div ref={detailsRef} className="relative max-w-6xl mx-auto w-full px-6 lg:px-12 py-20 flex gap-12">
        {/* Sticky Scroll Navigator on Desktop (matches CyberCrest layout tracking) */}
        <div className="hidden xl:block w-48 shrink-0">
          <div className="sticky top-28 flex flex-col gap-6 pl-4 border-l border-white/5">
            <button
              onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
              className={`scroll-navigator-dot text-left cursor-pointer transition-all ${activeSection === 'skills' ? 'is-active' : ''}`}
            >
              01 / SKILLS
            </button>
            <button
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              className={`scroll-navigator-dot text-left cursor-pointer transition-all ${activeSection === 'experience' ? 'is-active' : ''}`}
            >
              02 / EXPERIENCE
            </button>
            <button
              onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })}
              className={`scroll-navigator-dot text-left cursor-pointer transition-all ${activeSection === 'education' ? 'is-active' : ''}`}
            >
              03 / EDUCATION
            </button>
            <button
              onClick={() => document.getElementById('certs')?.scrollIntoView({ behavior: 'smooth' })}
              className={`scroll-navigator-dot text-left cursor-pointer transition-all ${activeSection === 'certs' ? 'is-active' : ''}`}
            >
              04 / CREDENTIALS
            </button>
          </div>
        </div>

        {/* Main Details Panel */}
        <div className="flex-1 space-y-20 min-w-0">
          <SkillsSection />
          <ExperienceSection />
          <EducationSection />
          <CertsAndAchievements />
        </div>
      </div>

      <InterviewCTA />
    </div>
  );
}
