import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ChevronDown } from 'lucide-react';

interface SQLAnimatorProps {
  sqlCode: string;
}

const SQL_CLAUSES = ['SELECT', 'FROM', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'OFFSET', 'WINDOW', 'PARTITION BY', 'WITH'];

function parseSQLClauses(code: string): { clause: string; content: string }[] {
  const lines = code.split('\n');
  const parsed: { clause: string; content: string }[] = [];
  let currentClause = '';
  let currentContent = '';

  for (const line of lines) {
    const trimmed = line.trim().toUpperCase();
    const foundClause = SQL_CLAUSES.find(
      (c) => trimmed.startsWith(c) || trimmed.startsWith('-- ')
    );

    if (foundClause && trimmed.startsWith(foundClause)) {
      if (currentClause) {
        parsed.push({ clause: currentClause, content: currentContent.trim() });
      }
      currentClause = foundClause;
      currentContent = line;
    } else if (trimmed.startsWith('DELETE') || trimmed.startsWith('INSERT') || trimmed.startsWith('UPDATE') || trimmed.startsWith('CREATE') || trimmed.startsWith('DROP') || trimmed.startsWith('TRUNCATE') || trimmed.startsWith('BEGIN') || trimmed.startsWith('COMMIT')) {
      if (currentClause) {
        parsed.push({ clause: currentClause, content: currentContent.trim() });
      }
      currentClause = line.trim().split(/\s/)[0];
      currentContent = line;
    } else {
      currentContent += '\n' + line;
    }
  }

  if (currentClause) {
    parsed.push({ clause: currentClause, content: currentContent.trim() });
  }

  return parsed.length > 0 ? parsed : [{ clause: 'SQL', content: code }];
}

export default function SQLAnimator({ sqlCode }: SQLAnimatorProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const clauses = parseSQLClauses(sqlCode);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= clauses.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [isPlaying, clauses.length]);

  const handlePlay = () => {
    setActiveStep(-1);
    setIsPlaying(true);
    setTimeout(() => setActiveStep(0), 100);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStep(-1);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors disabled:opacity-50 text-sm font-medium"
        >
          <Play className="w-4 h-4" />
          {isPlaying ? 'Running...' : 'Run Animation'}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-[var(--color-text-secondary)] hover:bg-white/10 transition-colors text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* SQL Execution Pipeline */}
      <div className="space-y-1">
        <AnimatePresence>
          {clauses.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.3 }}
              animate={{
                opacity: activeStep >= index ? 1 : 0.3,
                scale: activeStep === index ? 1.02 : 1,
                x: activeStep === index ? 8 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Connector arrow */}
              {index > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeStep >= index ? 0.6 : 0.1 }}
                  className="flex justify-center py-0.5"
                >
                  <ChevronDown className="w-4 h-4 text-indigo-400" />
                </motion.div>
              )}

              <div
                className={`rounded-lg px-4 py-2 font-mono text-sm border transition-all duration-300 ${
                  activeStep === index
                    ? 'bg-indigo-500/15 border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.15)]'
                    : activeStep > index
                    ? 'bg-emerald-500/10 border-emerald-500/20'
                    : 'bg-white/[0.02] border-white/5'
                }`}
              >
                <span
                  className={`font-bold ${
                    activeStep === index
                      ? 'text-indigo-400'
                      : activeStep > index
                      ? 'text-emerald-400'
                      : 'text-[var(--color-text-muted)]'
                  }`}
                >
                  {item.clause}
                </span>
                <span className="text-[var(--color-text-secondary)] ml-2">
                  {item.content.replace(new RegExp(`^${item.clause}`, 'i'), '').trim()}
                </span>

                {/* Active indicator */}
                {activeStep === index && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-500 rounded-full"
                    style={{ boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)' }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Output indicator */}
      <AnimatePresence>
        {activeStep >= clauses.length - 1 && !isPlaying && activeStep >= 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Query executed successfully — Results ready
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
