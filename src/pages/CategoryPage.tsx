import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { getCategoryById } from '../data/categories';
import { questions } from '../data/questions';
import GlassCard from '../components/ui/GlassCard';
import { useAppStore } from '../store/useAppStore';
import { DifficultyBadge } from '../components/ui/Badge';
import { useState, useMemo } from 'react';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { completed } = useAppStore();
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null);

  const category = getCategoryById(categoryId || '');
  
  const categoryQuestions = useMemo(() => {
    let q = questions.filter(q => q.category.toLowerCase() === category?.name.toLowerCase());
    if (filterDifficulty) {
      q = q.filter(q => q.difficulty === filterDifficulty);
    }
    return q;
  }, [category, filterDifficulty]);

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-4">Category not found</h2>
        <button onClick={() => navigate('/')} className="text-indigo-400 hover:underline">Return Home</button>
      </div>
    );
  }

  const Icon = category.icon;
  const completedCount = categoryQuestions.filter(q => completed.includes(q.id)).length;
  const progressPercent = categoryQuestions.length > 0 ? (completedCount / categoryQuestions.length) * 100 : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-white transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl glass-strong p-8 md:p-12 border-t border-[var(--color-border-accent)]">
        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${category.gradient} rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3`} />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`} style={{ boxShadow: `0 0 30px ${category.bgGlow}` }}>
              <Icon className="w-8 h-8" style={{ color: category.color }} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.name}</h1>
              <p className="text-[var(--color-text-secondary)] max-w-lg text-sm md:text-base">
                {category.description}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="text-2xl font-bold">{completedCount} <span className="text-sm text-[var(--color-text-muted)] font-normal">/ {categoryQuestions.length}</span></div>
            <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div 
                className="h-full rounded-full"
                style={{ backgroundColor: category.color }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setFilterDifficulty(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${!filterDifficulty ? 'bg-white text-black' : 'glass text-[var(--color-text-secondary)] hover:text-white'}`}
        >
          All Difficulties
        </button>
        {['Beginner', 'Intermediate', 'Advanced'].map(diff => (
          <button
            key={diff}
            onClick={() => setFilterDifficulty(diff)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filterDifficulty === diff ? 'bg-white text-black' : 'glass text-[var(--color-text-secondary)] hover:text-white'}`}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Question List */}
      <div className="space-y-4">
        {categoryQuestions.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-text-muted)]">
            <Lock className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No questions found for the selected filters.</p>
          </div>
        ) : (
          categoryQuestions.map((q, index) => {
            const isDone = completed.includes(q.id);
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <GlassCard
                  onClick={() => navigate(`/question/${q.id}`)}
                  hover3d={false}
                  className={`p-5 flex items-start gap-4 group transition-colors ${isDone ? 'border-emerald-500/30' : 'hover:border-[var(--color-border-default)]'}`}
                >
                  <div className="mt-1 shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-white/20 group-hover:border-white/40 transition-colors" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider truncate">
                        {q.sectionTitle}
                      </span>
                      <DifficultyBadge difficulty={q.difficulty} />
                    </div>
                    <h3 className="font-semibold text-base md:text-lg text-[var(--color-text-primary)] group-hover:text-white transition-colors mb-2 line-clamp-2">
                      {q.question}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {q.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-center self-center sm:self-auto pt-4 sm:pt-0">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}

