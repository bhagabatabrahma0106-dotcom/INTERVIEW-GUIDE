import { useRef, type MouseEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { type Category } from '../../data/categories';
import { questions } from '../../data/questions';
import { useAppStore } from '../../store/useAppStore';
import ProgressRing from './ProgressRing';

interface TopicCardProps {
  category: Category;
  index: number;
}

export default function TopicCard({ category, index }: TopicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { completed } = useAppStore();

  const catQs = questions.filter(
    (q) => q.category.toLowerCase() === category.name.toLowerCase()
  );
  const doneCount = catQs.filter((q) => completed.includes(q.id)).length;
  const progressPercent = catQs.length > 0 ? (doneCount / catQs.length) * 100 : 0;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    cardRef.current.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
  }

  function handleMouseLeave() {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  }

  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        id={`topic-card-${category.id}`}
        ref={cardRef}
        role="button"
        tabIndex={0}
        onClick={() => navigate(`/category/${category.id}`)}
        onKeyDown={(e) => e.key === 'Enter' && navigate(`/category/${category.id}`)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] backdrop-blur-[20px]"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Hover glow border */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 1px ${category.color}50, 0 0 24px ${category.color}25`,
          }}
        />

        {/* Top accent gradient strip */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(90deg, transparent, ${category.color}, transparent)` }}
        />

        {/* Background glow blob */}
        <div
          className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{ background: category.color }}
        />

        <div className="relative p-6">
          {/* Top row: icon + progress ring */}
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
              style={{ boxShadow: `0 0 16px ${category.color}30` }}
            >
              <Icon className="w-5 h-5" style={{ color: category.color }} />
            </div>

            {catQs.length > 0 && (
              <ProgressRing
                progress={progressPercent}
                size={44}
                strokeWidth={4}
                color={category.color}
              />
            )}
          </div>

          {/* Category name */}
          <h3 className="text-base font-bold mb-1.5 text-[var(--color-text-primary)] group-hover:text-[var(--color-text-accent)] transition-colors">
            {category.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-2 mb-4">
            {category.description}
          </p>

          {/* Footer row */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[var(--color-text-muted)] px-2 py-0.5 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)]">
              {category.questionCount} questions
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--color-text-muted)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Section heading helper ──────────────────────────────────────────────────────
export function SectionHeading({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-8">
      {label && (
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-2 block">
          {label}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">{children}</h2>
    </div>
  );
}
