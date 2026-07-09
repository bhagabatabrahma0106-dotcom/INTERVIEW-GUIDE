import {
  Database,
  Table2,
  BarChart3,
  Code2,
  TrendingUp,
  Brain,
  Shield,
  MessageSquare,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  bgGlow: string;
  description: string;
  sections: number[];
  questionCount: number;
}

export const categories: Category[] = [
  {
    id: 'sql',
    name: 'SQL',
    icon: Database,
    color: '#6366f1',
    gradient: 'from-indigo-500/20 to-purple-500/20',
    bgGlow: 'rgba(99, 102, 241, 0.15)',
    description: 'Master SQL fundamentals, joins, aggregations, window functions, and real-world query patterns.',
    sections: [1, 2, 3, 4, 5, 6, 7, 8],
    questionCount: 80,
  },
  {
    id: 'excel',
    name: 'Excel',
    icon: Table2,
    color: '#10b981',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    bgGlow: 'rgba(16, 185, 129, 0.15)',
    description: 'VLOOKUP, INDEX-MATCH, Pivot Tables, Power Query, conditional formatting, and formulas.',
    sections: [10],
    questionCount: 15,
  },
  {
    id: 'python',
    name: 'Python',
    icon: Code2,
    color: '#f59e0b',
    gradient: 'from-amber-500/20 to-orange-500/20',
    bgGlow: 'rgba(245, 158, 11, 0.15)',
    description: 'Pandas, NumPy, data cleaning, EDA, visualization, and Pythonic data manipulation.',
    sections: [13, 14],
    questionCount: 25,
  },
  {
    id: 'tableau',
    name: 'Tableau',
    icon: BarChart3,
    color: '#3b82f6',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    bgGlow: 'rgba(59, 130, 246, 0.15)',
    description: 'Dimensions, measures, LOD expressions, dashboard actions, and visualization best practices.',
    sections: [11],
    questionCount: 15,
  },
  {
    id: 'statistics',
    name: 'Statistics',
    icon: TrendingUp,
    color: '#ec4899',
    gradient: 'from-pink-500/20 to-rose-500/20',
    bgGlow: 'rgba(236, 72, 153, 0.15)',
    description: 'Probability, distributions, hypothesis testing, regression, and A/B testing.',
    sections: [12],
    questionCount: 15,
  },
  {
    id: 'behavioral',
    name: 'Behavioral',
    icon: MessageSquare,
    color: '#a855f7',
    gradient: 'from-purple-500/20 to-fuchsia-500/20',
    bgGlow: 'rgba(168, 85, 247, 0.15)',
    description: 'Interview closing questions, experience-based answers, and project walkthroughs.',
    sections: [9],
    questionCount: 10,
  },
  {
    id: 'governance',
    name: 'Data Governance',
    icon: Shield,
    color: '#22d3ee',
    gradient: 'from-cyan-500/20 to-sky-500/20',
    bgGlow: 'rgba(34, 211, 238, 0.15)',
    description: 'Data quality, integrity, security, and governance frameworks.',
    sections: [],
    questionCount: 0,
  },
  {
    id: 'business',
    name: 'Business Cases',
    icon: Brain,
    color: '#f43f5e',
    gradient: 'from-rose-500/20 to-red-500/20',
    bgGlow: 'rgba(244, 63, 94, 0.15)',
    description: 'Real-world business scenario analysis and case study approaches.',
    sections: [],
    questionCount: 0,
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySection(sectionId: number): Category | undefined {
  return categories.find((c) => c.sections.includes(sectionId));
}
