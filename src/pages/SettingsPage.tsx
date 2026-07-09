import { Settings as SettingsIcon, Monitor, Moon, Trash2 } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

export default function SettingsPage() {
  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all your progress? This action cannot be undone.')) {
      localStorage.removeItem('interview-guide-storage');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-glass)] border border-[var(--color-border-default)] flex items-center justify-center">
          <SettingsIcon className="w-6 h-6 text-[var(--color-text-primary)]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-[var(--color-text-secondary)]">Manage your app preferences</p>
        </div>
      </div>

      <div className="space-y-6">
        <GlassCard className="p-6" hover3d={false}>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-indigo-400" /> Appearance
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <div>
                <div className="font-medium">Theme</div>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  Currently locked to Dark mode for the best visual experience.
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center gap-2 text-sm font-medium">
                <Moon className="w-4 h-4" /> Dark
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6" hover3d={false}>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-rose-400" /> Danger Zone
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 gap-4">
              <div>
                <div className="font-medium text-rose-400">Clear all data</div>
                <div className="text-sm text-rose-100/70">Reset all progress, streaks, and bookmarks.</div>
              </div>
              <button
                onClick={handleClearData}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium transition-colors text-sm whitespace-nowrap cursor-pointer"
              >
                Reset Progress
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
