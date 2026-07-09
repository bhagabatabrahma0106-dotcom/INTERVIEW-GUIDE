import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, Play, BookOpen } from 'lucide-react';
import LearningUniverse from '../components/3d/LearningUniverse';
import { categories, getCategoryById } from '../data/categories';
import { questions } from '../data/questions';
import { useAppStore } from '../store/useAppStore';
import { DifficultyBadge } from '../components/ui/Badge';
import GlassCard from '../components/ui/GlassCard';

export default function UniversePage() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { completed, streak } = useAppStore();

  const activeCategory = useMemo(() => {
    return activeCategoryId ? getCategoryById(activeCategoryId) : null;
  }, [activeCategoryId]);

  const activeQuestions = useMemo(() => {
    if (!activeCategory) return [];
    return questions.filter(q => q.category.toLowerCase() === activeCategory.name.toLowerCase());
  }, [activeCategory]);

  const completedCount = useMemo(() => {
    return activeQuestions.filter(q => completed.includes(q.id)).length;
  }, [activeQuestions, completed]);

  const overallCompleted = completed.length;
  const overallProgress = (overallCompleted / questions.length) * 100 || 0;

  return (
    <div className="relative w-full h-[calc(100vh-64px)] lg:h-screen overflow-hidden bg-[#030014]">
      {/* 3D Scene Background */}
      <LearningUniverse 
        activeCategoryId={activeCategoryId} 
        onSelectCategory={setActiveCategoryId} 
      />

      {/* Global UI Overlay (When no node is focused) */}
      <AnimatePresence>
        {!activeCategoryId && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-6 left-6 right-6 md:left-auto md:right-8 z-10 pointer-events-none"
          >
            <GlassCard className="p-4 flex items-center gap-6 pointer-events-auto max-w-sm ml-auto" hover3d={false}>
              <div>
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-bold mb-1">Overall Progress</div>
                <div className="text-2xl font-bold">{Math.round(overallProgress)}%</div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-bold mb-1">Streak</div>
                <div className="text-2xl font-bold text-amber-400 flex items-center gap-1">
                  {streak} <span className="text-sm">days</span>
                </div>
              </div>
            </GlassCard>
            
            <div className="text-center mt-6 hidden md:block">
              <span className="px-4 py-2 rounded-full glass border border-white/10 text-sm text-[var(--color-text-secondary)] pointer-events-none shadow-lg">
                Drag to rotate • Click a node to explore
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Focused Node Overlay (Sidebar/Modal) */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 bottom-0 w-full md:w-[450px] glass-strong border-l border-white/10 z-20 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 relative overflow-hidden shrink-0">
              <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${activeCategory.gradient} opacity-20 -z-10`} />
              
              <button
                onClick={() => setActiveCategoryId(null)}
                className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Universe
              </button>
              
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <activeCategory.icon className="w-8 h-8" style={{ color: activeCategory.color }} />
                {activeCategory.name}
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2">
                {activeCategory.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  {activeQuestions.length} Questions
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  {completedCount} Completed
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {activeQuestions.map((q, i) => {
                const isDone = completed.includes(q.id);
                return (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate(`/question/${q.id}`)}
                    className={`p-4 rounded-xl cursor-pointer border transition-all group ${isDone ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/5 border-white/5 hover:border-indigo-500/30 hover:bg-white/10'}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${isDone ? 'text-emerald-400' : 'text-[var(--color-text-muted)]'}`}>Q{q.id}</span>
                        <DifficultyBadge difficulty={q.difficulty} />
                      </div>
                      {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </div>
                    <h4 className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-white transition-colors line-clamp-2 pr-4">
                      {q.question}
                    </h4>
                  </motion.div>
                );
              })}
            </div>

            {/* Start Practice Button */}
            <div className="p-4 border-t border-white/10 shrink-0">
              <button
                onClick={() => navigate(`/category/${activeCategory.id}`)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors shadow-lg"
              >
                <Play className="w-4 h-4" /> Full List View
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

