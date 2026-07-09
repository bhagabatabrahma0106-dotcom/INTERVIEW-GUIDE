import { motion } from 'framer-motion';

interface BadgeProps {
  text: string;
  variant?: 'beginner' | 'intermediate' | 'advanced' | 'default';
  size?: 'sm' | 'md';
}

const variantStyles = {
  beginner: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  intermediate: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  advanced: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
  default: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',
};

const sizeStyles = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
};

export default function Badge({ text, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center font-semibold rounded-full border ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {text}
    </motion.span>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const variant = difficulty.toLowerCase() as 'beginner' | 'intermediate' | 'advanced';
  return <Badge text={difficulty} variant={variant} size="md" />;
}
