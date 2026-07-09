import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Check, X, SkipForward, Eye, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/questions';
import { useAppStore } from '../store/useAppStore';
import GlassCard from '../components/ui/GlassCard';
import { DifficultyBadge } from '../components/ui/Badge';
import ProgressRing from '../components/ui/ProgressRing';

export default function MockInterviewPage() {
  const navigate = useNavigate();
  const { mockSession, startMockSession, answerMockQuestion, nextMockQuestion, endMockSession } = useAppStore();
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes per question

  // Timer logic
  useEffect(() => {
    if (!mockSession || showAnswer || mockSession.endTime) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowAnswer(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mockSession, showAnswer, mockSession?.currentIndex]);

  const handleStart = () => {
    // Generate 10 random questions
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selectedIds = shuffled.slice(0, 10).map(q => q.id);
    startMockSession(selectedIds);
    setShowAnswer(false);
    setTimeLeft(120);
  };

  const handleAnswer = (result: 'correct' | 'incorrect' | 'skipped') => {
    if (!mockSession) return;
    answerMockQuestion(mockSession.questionIds[mockSession.currentIndex], result);
    
    if (mockSession.currentIndex === mockSession.questionIds.length - 1) {
      endMockSession();
    } else {
      nextMockQuestion();
      setShowAnswer(false);
      setTimeLeft(120);
    }
  };

  if (!mockSession) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center space-y-8">
        <div className="w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center">
          <Play className="w-10 h-10 text-indigo-400 translate-x-1" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">Ready for a Mock Interview?</h1>
          <p className="text-[var(--color-text-secondary)] text-lg mb-8">
            Test your knowledge with 10 random questions from the database. 
            You'll have 2 minutes to answer each question before the answer is revealed.
          </p>
          <button
            onClick={handleStart}
            className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)]"
          >
            Start Session
          </button>
        </div>
      </div>
    );
  }

  if (mockSession.endTime) {
    const total = mockSession.questionIds.length;
    const correct = Object.values(mockSession.answers).filter(v => v === 'correct').length;
    const incorrect = Object.values(mockSession.answers).filter(v => v === 'incorrect').length;
    const skipped = total - correct - incorrect;
    
    return (
      <div className="max-w-3xl mx-auto space-y-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Interview Complete</h1>
          <p className="text-[var(--color-text-secondary)]">Here's how you did</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-8 flex flex-col items-center justify-center" hover3d={false} glowColor="rgba(16,185,129,0.3)">
            <ProgressRing progress={(correct / total) * 100} size={120} color="#10b981" />
            <div className="mt-4 text-emerald-400 font-bold">Accuracy</div>
          </GlassCard>

          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <GlassCard className="p-6 flex flex-col items-center justify-center text-center" hover3d={false}>
              <div className="text-3xl font-bold text-emerald-400 mb-1">{correct}</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Correct</div>
            </GlassCard>
            <GlassCard className="p-6 flex flex-col items-center justify-center text-center" hover3d={false}>
              <div className="text-3xl font-bold text-rose-400 mb-1">{incorrect}</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Incorrect</div>
            </GlassCard>
            <GlassCard className="p-6 flex flex-col items-center justify-center text-center" hover3d={false}>
              <div className="text-3xl font-bold text-amber-400 mb-1">{skipped}</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Skipped</div>
            </GlassCard>
            <GlassCard className="p-6 flex flex-col items-center justify-center text-center" hover3d={false}>
              <div className="text-3xl font-bold text-indigo-400 mb-1">{total}</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Total Questions</div>
            </GlassCard>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-8">
          <button
            onClick={handleStart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-xl glass hover:bg-white/5 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const currentQId = mockSession.questionIds[mockSession.currentIndex];
  const question = questions.find(q => q.id === currentQId)!;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Header Stats */}
      <div className="flex items-center justify-between p-4 glass rounded-xl">
        <div className="flex items-center gap-4">
          <span className="font-bold text-indigo-400">
            Question {mockSession.currentIndex + 1} <span className="text-[var(--color-text-muted)] font-normal">/ {mockSession.questionIds.length}</span>
          </span>
          <DifficultyBadge difficulty={question.difficulty} />
        </div>
        <div className={`flex items-center gap-2 font-mono font-bold ${timeLeft < 30 ? 'text-rose-400 animate-pulse' : 'text-[var(--color-text-secondary)]'}`}>
          <Clock className="w-4 h-4" />
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${((mockSession.currentIndex) / mockSession.questionIds.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <GlassCard className="p-8 md:p-12" hover3d={false}>
        <div className="text-sm font-medium text-indigo-400 mb-4 uppercase tracking-wider">{question.category}</div>
        <h2 className="text-2xl md:text-3xl font-bold leading-relaxed">
          {question.question}
        </h2>
      </GlassCard>

      {/* Answer Area */}
      <AnimatePresence mode="wait">
        {!showAnswer ? (
          <motion.div
            key="hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center py-12"
          >
            <button
              onClick={() => setShowAnswer(true)}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 hover:text-indigo-200 transition-all border border-indigo-500/30"
            >
              <Eye className="w-5 h-5" /> Reveal Answer
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <GlassCard className="p-6 md:p-8 border-indigo-500/30" hover3d={false}>
              <h3 className="text-lg font-bold mb-4 text-indigo-400">Answer</h3>
              <div className="prose prose-invert max-w-none text-[var(--color-text-primary)]">
                {question.answer}
              </div>
            </GlassCard>

            <div className="fixed bottom-0 left-0 right-0 p-4 glass-strong border-t border-[var(--color-border-subtle)] z-50 flex justify-center gap-4">
              <button
                onClick={() => handleAnswer('correct')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 transition-all font-medium"
              >
                <Check className="w-5 h-5" /> I knew this
              </button>
              <button
                onClick={() => handleAnswer('incorrect')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30 transition-all font-medium"
              >
                <X className="w-5 h-5" /> Missed it
              </button>
              <button
                onClick={() => handleAnswer('skipped')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-[var(--color-text-secondary)] hover:bg-white/10 transition-all"
              >
                <SkipForward className="w-5 h-5" /> Skip
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

