import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bookmark, ChevronRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { questions } from '../data/questions';
import GlassCard from '../components/ui/GlassCard';
import { DifficultyBadge } from '../components/ui/Badge';

export default function BookmarksPage() {
  const navigate = useNavigate();
  const { bookmarks, toggleBookmark } = useAppStore();

  const bookmarkedQuestions = questions.filter(q => bookmarks.includes(q.id));

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
          <Bookmark className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Saved Bookmarks</h1>
          <p className="text-[var(--color-text-secondary)]">Review your saved questions</p>
        </div>
      </div>

      {bookmarkedQuestions.length === 0 ? (
        <div className="text-center py-20 text-[var(--color-text-muted)] space-y-4">
          <Bookmark className="w-12 h-12 mx-auto opacity-20" />
          <p>You haven't bookmarked any questions yet.</p>
          <button
            onClick={() => navigate('/')}
            className="text-indigo-400 hover:underline text-sm"
          >
            Browse Topics
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {bookmarkedQuestions.map((q, index) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <GlassCard
                  onClick={() => navigate(`/question/${q.id}`)}
                  hover3d={false}
                  className="p-5 flex items-center gap-4 group hover:border-[var(--color-border-accent)] cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-[var(--color-text-muted)]">Q{q.id}</span>
                      <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
                      <span className="text-xs font-medium text-amber-300 uppercase tracking-wider">{q.category}</span>
                      <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
                      <DifficultyBadge difficulty={q.difficulty} />
                    </div>
                    <h3 className="font-semibold text-base md:text-lg text-[var(--color-text-primary)] group-hover:text-white transition-colors line-clamp-2">
                      {q.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(q.id);
                      }}
                      className="p-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors"
                      title="Remove Bookmark"
                    >
                      <Bookmark className="w-5 h-5 fill-amber-400" />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-all ml-2 hidden sm:flex">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

