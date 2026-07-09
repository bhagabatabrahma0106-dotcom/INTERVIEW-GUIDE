import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bookmark, CheckCircle2, ChevronLeft, ChevronRight, Copy, Share2, Lightbulb, AlertTriangle, BookOpen, Presentation } from 'lucide-react';
import { useState, useEffect } from 'react';
import { questions } from '../data/questions';
import { useAppStore } from '../store/useAppStore';
import { DifficultyBadge } from '../components/ui/Badge';
import CodeBlock from '../components/ui/CodeBlock';
import GlassCard from '../components/ui/GlassCard';
import SQLAnimator from '../components/sql/SQLAnimator';

type TabType = 'answer' | 'code' | 'animation' | 'insights';

export default function QuestionPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const id = parseInt(questionId || '0', 10);
  
  const { 
    isBookmarked, toggleBookmark, 
    isCompleted, toggleCompleted,
    addRecentlyViewed
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<TabType>('answer');

  const question = questions.find(q => q.id === id);
  const currentIndex = questions.findIndex(q => q.id === id);
  const prevQuestion = currentIndex > 0 ? questions[currentIndex - 1] : null;
  const nextQuestion = currentIndex < questions.length - 1 ? questions[currentIndex + 1] : null;

  useEffect(() => {
    if (question) {
      addRecentlyViewed(question.id);
    }
  }, [question, addRecentlyViewed]);

  if (!question) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-4">Question not found</h2>
        <button onClick={() => navigate('/')} className="text-indigo-400 hover:underline">Return Home</button>
      </div>
    );
  }

  const bookmarked = isBookmarked(id);
  const completed = isCompleted(id);

  const tabs = [
    { id: 'answer', label: 'Answer' },
    ...(question.sqlCode || question.pythonCode ? [{ id: 'code', label: 'Code' }] : []),
    ...(question.sqlCode && question.category === 'SQL' ? [{ id: 'animation', label: 'Execution' }] : []),
    ...(question.tips || question.mistakes || question.takeaways ? [{ id: 'insights', label: 'Insights' }] : []),
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/category/${question.category.toLowerCase()}`)}
          className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {question.category}
        </button>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleBookmark(id)}
            className={`p-2 rounded-lg transition-colors ${bookmarked ? 'bg-amber-500/20 text-amber-400' : 'bg-white/5 text-[var(--color-text-muted)] hover:bg-white/10'}`}
            title="Bookmark"
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-400' : ''}`} />
          </button>
          <button
            onClick={() => toggleCompleted(id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${completed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-[var(--color-text-secondary)] hover:bg-white/10'}`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="hidden sm:inline">{completed ? 'Completed' : 'Mark Complete'}</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider bg-white/5 px-2 py-1 rounded">
            Q{question.id}
          </span>
          <DifficultyBadge difficulty={question.difficulty} />
          <span className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-glass)] px-2 py-1 rounded-full border border-[var(--color-border-subtle)]">
            {question.sectionTitle}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white">
          {question.question}
        </h1>
        <div className="flex flex-wrap gap-2">
          {question.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-[var(--color-text-muted)] border border-white/5">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <GlassCard hover3d={false} className="overflow-hidden border border-[var(--color-border-default)]">
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-[var(--color-border-subtle)] scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`relative px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? 'text-indigo-400' : 'text-[var(--color-text-muted)] hover:text-white'}`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'answer' && (
                <div className="prose prose-invert max-w-none text-[var(--color-text-primary)] leading-relaxed text-base md:text-lg whitespace-pre-line">
                  {question.answer}
                  {question.example && (
                    <div className="mt-6 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                      <strong className="block text-indigo-400 text-sm mb-2 uppercase tracking-wide">Example</strong>
                      {question.example}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-4">
                  {question.sqlCode && <CodeBlock code={question.sqlCode} language="sql" />}
                  {question.pythonCode && <CodeBlock code={question.pythonCode} language="python" />}
                </div>
              )}

              {activeTab === 'animation' && question.sqlCode && (
                <SQLAnimator sqlCode={question.sqlCode} />
              )}

              {activeTab === 'insights' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {question.tips && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                        <Lightbulb className="w-5 h-5" /> Pro Tip
                      </div>
                      <p className="text-sm text-emerald-100/80">{question.tips}</p>
                    </div>
                  )}
                  
                  {question.mistakes && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                      <div className="flex items-center gap-2 text-rose-400 font-semibold mb-2">
                        <AlertTriangle className="w-5 h-5" /> Common Mistake
                      </div>
                      <p className="text-sm text-rose-100/80">{question.mistakes}</p>
                    </div>
                  )}

                  {question.takeaways && (
                    <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 md:col-span-2">
                      <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-2">
                        <BookOpen className="w-5 h-5" /> Key Takeaway
                      </div>
                      <p className="text-sm text-cyan-100/80">{question.takeaways}</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </GlassCard>

      {/* Prev/Next Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border-subtle)]">
        {prevQuestion ? (
          <button
            onClick={() => navigate(`/question/${prevQuestion.id}`)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors text-[var(--color-text-secondary)] hover:text-white group max-w-[45%]"
          >
            <ChevronLeft className="w-5 h-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left overflow-hidden hidden sm:block">
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Previous</div>
              <div className="text-sm font-medium truncate">{prevQuestion.question}</div>
            </div>
          </button>
        ) : <div />}

        {nextQuestion ? (
          <button
            onClick={() => navigate(`/question/${nextQuestion.id}`)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors text-[var(--color-text-secondary)] hover:text-white group max-w-[45%] text-right"
          >
            <div className="overflow-hidden hidden sm:block">
              <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Next</div>
              <div className="text-sm font-medium truncate">{nextQuestion.question}</div>
            </div>
            <ChevronRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : <div />}
      </div>
    </div>
  );
}

