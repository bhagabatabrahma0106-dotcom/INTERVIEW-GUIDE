import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search questions, topics, SQL queries...',
  autoFocus = false,
  className = '',
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative group ${className}`}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
      <div className="relative glass rounded-xl flex items-center gap-3 px-4 py-3 border border-[var(--color-border-subtle)] focus-within:border-[var(--color-border-accent)] transition-colors duration-300">
        <Search className="w-5 h-5 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-accent-indigo)] transition-colors" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none"
        />
        {value && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => onChange('')}
            className="p-1 rounded-lg hover:bg-white/5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-[var(--color-text-muted)] font-mono">
          ⌘K
        </kbd>
      </div>
    </motion.div>
  );
}
