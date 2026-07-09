import { motion } from 'framer-motion';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { Trophy, Target, Zap, Brain, TrendingUp } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { categories } from '../data/categories';
import { questions } from '../data/questions';
import GlassCard from '../components/ui/GlassCard';

export default function DashboardPage() {
  const { streak, completed, bookmarks } = useAppStore();

  const totalQuestions = questions.length;
  const completedCount = completed.length;
  const progressPercent = (completedCount / totalQuestions) * 100 || 0;

  // Radar chart data
  const radarData = categories.map(cat => {
    const catTotal = questions.filter(q => q.category.toLowerCase() === cat.name.toLowerCase()).length;
    const catCompleted = questions.filter(q => q.category.toLowerCase() === cat.name.toLowerCase() && completed.includes(q.id)).length;
    return {
      subject: cat.name,
      A: catTotal > 0 ? (catCompleted / catTotal) * 100 : 0,
      fullMark: 100,
    };
  });

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-6 border-t border-[var(--color-border-accent)]" hover3d={false}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{Math.round(progressPercent)}%</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Completion Rate</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-t border-amber-500/30" hover3d={false}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{streak}</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Day Streak</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-t border-emerald-500/30" hover3d={false}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{completedCount}</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Questions Solved</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-t border-rose-500/30" hover3d={false}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{bookmarks.length}</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Bookmarks</div>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <GlassCard className="p-6 flex flex-col items-center" hover3d={false}>
          <h3 className="text-lg font-bold w-full mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" /> Topic Mastery
          </h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Completion %" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Progress Bars */}
        <GlassCard className="p-6" hover3d={false}>
          <h3 className="text-lg font-bold mb-6">Detailed Progress</h3>
          <div className="space-y-6">
            {categories.map((cat, index) => {
              const catTotal = questions.filter(q => q.category.toLowerCase() === cat.name.toLowerCase()).length;
              if (catTotal === 0) return null;
              
              const catCompleted = questions.filter(q => q.category.toLowerCase() === cat.name.toLowerCase() && completed.includes(q.id)).length;
              const percent = (catCompleted / catTotal) * 100;
              
              return (
                <motion.div 
                  key={cat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-[var(--color-text-primary)]">{cat.name}</span>
                    <span className="text-[var(--color-text-secondary)]">{catCompleted} / {catTotal}</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full relative"
                      style={{ backgroundColor: cat.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

