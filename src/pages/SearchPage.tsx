import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Filter, Clock, Bookmark, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '../hooks/useSearch';
import { useAppStore } from '../store/useAppStore';
import { categories } from '../data/categories';
import SearchBar from '../components/ui/SearchBar';
import GlassCard from '../components/ui/GlassCard';
import { DifficultyBadge } from '../components/ui/Badge';

export default function SearchPage() {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, bookmarks, completed, recentlyViewed } = useAppStore();
  
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'bookmarks' | 'completed'>('all');

  const results = useSearch(searchQuery, {
    category: filterCategory || undefined,
    difficulty: filterDifficulty || undefined,
    bookmarkedOnly: filterType === 'bookmarks',
    completedOnly: filterType === 'completed',
    bookmarks,
    completed,
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Search Header */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold">What do you want to learn?</h1>
        <p className="text-[var(--color-text-secondary)]">Search across 160+ interview questions and answers.</p>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        autoFocus
        className="max-w-2xl mx-auto shadow-2xl"
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 py-4 border-b border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <Filter className="w-4 h-4" /> Filters:
        </div>
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)] rounded-lg px-3 py-1.5 text-sm text-[var(--color-text-primary)] outline-none focus:border-indigo-500"
        >
          <option value="">All Topics</option>
          {categories.map(c => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>

        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)] rounded-lg px-3 py-1.5 text-sm text-[var(--color-text-primary)] outline-none focus:border-indigo-500"
        >
          <option value="">All Difficulties</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <div className="flex bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)] rounded-lg overflow-hidden">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-sm transition-colors ${filterType === 'all' ? 'bg-indigo-500/20 text-indigo-400' : 'text-[var(--color-text-muted)] hover:text-white'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('bookmarks')}
            className={`px-3 py-1.5 text-sm flex items-center gap-1.5 transition-colors ${filterType === 'bookmarks' ? 'bg-amber-500/20 text-amber-400' : 'text-[var(--color-text-muted)] hover:text-white'}`}
          >
            <Bookmark className="w-3.5 h-3.5" /> Bookmarks
          </button>
          <button
            onClick={() => setFilterType('completed')}
            className={`px-3 py-1.5 text-sm flex items-center gap-1.5 transition-colors ${filterType === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'text-[var(--color-text-muted)] hover:text-white'}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="pt-4 space-y-4">
        {results.length === 0 ? (
          <div className="text-center py-20 text-[var(--color-text-muted)] space-y-4">
            <SearchIcon className="w-12 h-12 mx-auto opacity-20" />
            <p>No results found for "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterCategory('');
                setFilterDifficulty('');
                setFilterType('all');
              }}
              className="text-indigo-400 hover:underline text-sm"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-[var(--color-text-muted)] mb-4 font-medium uppercase tracking-wider">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </p>
            <AnimatePresence>
              {results.map((q, index) => {
                const isDone = completed.includes(q.id);
                return (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: Math.min(index * 0.05, 0.5) }}
                  >
                    <GlassCard
                      onClick={() => navigate(`/question/${q.id}`)}
                      hover3d={false}
                      className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 group transition-colors ${isDone ? 'border-emerald-500/30' : 'hover:border-indigo-500/50'}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-xs font-bold ${isDone ? 'text-emerald-400' : 'text-[var(--color-text-muted)]'}`}>
                            Q{q.id}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
                          <span className="text-xs font-medium text-indigo-300 uppercase tracking-wider">
                            {q.category}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
                          <DifficultyBadge difficulty={q.difficulty} />
                        </div>
                        <h3 className="font-semibold text-[var(--color-text-primary)] group-hover:text-white transition-colors">
                          {q.question}
                        </h3>
                      </div>
                      
                      {q.tags && (
                        <div className="flex flex-wrap gap-1.5 shrink-0 sm:max-w-[200px] justify-start sm:justify-end">
                          {q.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[var(--color-text-secondary)] border border-white/5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </GlassCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

