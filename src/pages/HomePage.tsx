import { useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowDown, BookOpen, Clock, Code, ChevronRight } from 'lucide-react';
import { categories } from '../data/categories';
import { useAppStore } from '../store/useAppStore';
import { questions } from '../data/questions';
import TopicCard, { SectionHeading } from '../components/ui/TopicCard';
import GlassCard from '../components/ui/GlassCard';
import { ErrorBoundary3D } from '../components/three/ErrorBoundary3D';

const HeroCluster = lazy(() => import('../components/three/HeroCluster'));

// ── Stat card ──────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  sub: string;
  accentClass: string;
  iconBgClass: string;
  delay: number;
}

function StatCard({ icon: Icon, value, sub, accentClass, iconBgClass, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard hover3d={false} className="p-5 flex items-center gap-4">
        <div className={`w-11 h-11 rounded-xl ${iconBgClass} flex items-center justify-center shrink-0`}>
          <Icon className={`w-5 h-5 ${accentClass}`} />
        </div>
        <div>
          <div className="text-xl font-bold text-[var(--color-text-primary)]">{value}</div>
          <div className="text-xs text-[var(--color-text-secondary)]">{sub}</div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ── Hero section ───────────────────────────────────────────────────────────────
function HeroSection({ heroRef }: { heroRef: React.RefObject<HTMLDivElement | null> }) {
  const navigate = useNavigate();

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D cluster canvas — non-blocking progressive enhancement */}
      <ErrorBoundary3D>
        <Suspense fallback={null}>
          <HeroCluster containerRef={heroRef} />
        </Suspense>
      </ErrorBoundary3D>

      {/* Radial vignette so text stays readable over the 3D scene */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(10,10,15,0) 20%, rgba(10,10,15,0.75) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Hero copy — floats above canvas */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4 flex flex-col items-center gap-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet-500/25 text-[11px] font-semibold tracking-widest uppercase text-[var(--color-text-accent)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          Data Analyst Interview Prep
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
        >
          Master your{' '}
          <span className="text-gradient">
            Data Analyst
          </span>{' '}
          interview.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-xl leading-relaxed"
        >
          160+ curated questions across SQL, Python, Excel, Tableau, Statistics &amp; Behavioral —
          with code-highlighted answers, mock sessions, and progress tracking.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <button
            id="hero-cta-start"
            onClick={() => navigate('/category/sql')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              boxShadow: '0 0 24px rgba(124,58,237,0.4), 0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            Start Learning <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-cta-mock"
            onClick={() => navigate('/mock-interview')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/15 text-[var(--color-text-primary)] font-semibold text-sm hover:border-[var(--color-border-accent)] transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Take Mock Interview
          </button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--color-text-muted)]"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Stats row ──────────────────────────────────────────────────────────────────
function StatsRow() {
  const { streak, completed } = useAppStore();
  const completedCount = completed.length;
  const total = questions.length;
  const progress = Math.round((completedCount / total) * 100) || 0;

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={BookOpen}
          value={`${completedCount} / ${total}`}
          sub="Questions Completed"
          accentClass="text-emerald-400"
          iconBgClass="bg-emerald-500/15"
          delay={0}
        />
        <StatCard
          icon={Clock}
          value={`${streak} days`}
          sub="Current Streak"
          accentClass="text-amber-400"
          iconBgClass="bg-amber-500/15"
          delay={0.08}
        />
        <StatCard
          icon={Code}
          value={`${progress}%`}
          sub="Overall Progress"
          accentClass="text-violet-400"
          iconBgClass="bg-violet-500/15"
          delay={0.16}
        />
      </div>
    </section>
  );
}

// ── Topic grid ─────────────────────────────────────────────────────────────────
function TopicGrid() {
  return (
    <section className="py-4 px-4 max-w-7xl mx-auto w-full">
      <SectionHeading label="Topics">Browse categories</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {categories.map((cat, i) => (
          <TopicCard key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </section>
  );
}

// ── Recently viewed ────────────────────────────────────────────────────────────
function RecentlyViewed() {
  const navigate = useNavigate();
  const { recentlyViewed } = useAppStore();
  const recent = recentlyViewed.slice(0, 4);
  if (recent.length === 0) return null;

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto w-full pb-20">
      <SectionHeading label="Pick up where you left off">Continue Learning</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {recent.map((id, i) => {
          const q = questions.find((q) => q.id === id);
          if (!q) return null;
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <GlassCard
                onClick={() => navigate(`/question/${id}`)}
                hover3d={false}
                className="p-4 flex items-start gap-3 group hover:border-[var(--color-border-accent)]"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1 block">
                    {q.category}
                  </span>
                  <h4 className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-white transition-colors line-clamp-2">
                    {q.question}
                  </h4>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-text-accent)] shrink-0 mt-1 transition-colors" />
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ── Page root ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative -mt-4 -mx-4 lg:-mt-8 lg:-mx-8">
      <HeroSection heroRef={heroRef} />
      <StatsRow />
      <TopicGrid />
      <RecentlyViewed />
    </div>
  );
}
