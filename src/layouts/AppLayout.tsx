import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import {
  Menu, X, Search, Bookmark, Trophy, Settings, GraduationCap, LayoutDashboard, Globe, ChevronDown, User, Home, Database, Table2, Code2, BarChart3, TrendingUp, MessageSquare
} from 'lucide-react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { ErrorBoundary3D } from '../components/three/ErrorBoundary3D';

const Background3D = lazy(() => import('../three/Background3D'));

interface NavDropdownItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TOPIC_ITEMS: NavDropdownItem[] = [
  { path: '/category/sql', label: 'SQL Database', icon: Database },
  { path: '/category/excel', label: 'MS Excel', icon: Table2 },
  { path: '/category/python', label: 'Python Coding', icon: Code2 },
  { path: '/category/tableau', label: 'Tableau BI', icon: BarChart3 },
  { path: '/category/statistics', label: 'Statistics', icon: TrendingUp },
  { path: '/category/behavioral', label: 'Behavioral Prep', icon: MessageSquare },
];

const TOOL_ITEMS: NavDropdownItem[] = [
  { path: '/universe', label: '3D Universe', icon: Globe },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/search', label: 'Search Index', icon: Search },
  { path: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
];

export default function AppLayout() {
  const { streak } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'topics' | 'tools' | null>(null);

  // Ensure light mode is cleared
  useEffect(() => {
    document.documentElement.classList.remove('light');
  }, []);

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#020208] text-white">
      {/* 3D Background */}
      <ErrorBoundary3D>
        <Suspense fallback={null}>
          <Background3D />
        </Suspense>
      </ErrorBoundary3D>

      {/* CyberCrest Style Top Navigation Header */}
      <header className="relative z-50 bg-[#040410]/75 backdrop-blur-[12px] border-b border-white/5 h-16 flex items-center justify-between px-6 lg:px-12 shrink-0 select-none">
        
        {/* Left Side: Avatar Branding */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 shrink-0 shadow-[0_0_12px_rgba(82,183,255,0.3)] transition-transform duration-300 group-hover:scale-105">
            <img src="/profile_enhanced.jpg" alt="Bhagabata Brahma" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white group-hover:text-[#52B7FF] transition-colors leading-tight">
              Bhagabata Brahma
            </h1>
            <p className="text-[9px] text-[var(--color-text-muted)] leading-none mt-0.5">
              Data Analyst Portfolio
            </p>
          </div>
        </div>

        {/* Center: Main Nav Links & Dropdowns */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          
          <NavLink to="/" end className={({ isActive }) => 
            `transition-colors hover:text-[#52B7FF] ${isActive ? 'text-[#52B7FF]' : 'text-[var(--color-text-secondary)]'}`
          }>
            Profile
          </NavLink>

          <NavLink to="/home" className={({ isActive }) => 
            `transition-colors hover:text-[#52B7FF] ${isActive ? 'text-[#52B7FF]' : 'text-[var(--color-text-secondary)]'}`
          }>
            Prep Home
          </NavLink>

          {/* Topics Dropdown (matches CyberCrest multi-column sub-navigation) */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('topics')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={`flex items-center gap-1 transition-colors hover:text-[#52B7FF] cursor-pointer ${location.pathname.startsWith('/category') ? 'text-[#52B7FF]' : 'text-[var(--color-text-secondary)]'}`}>
              <span>Topics</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'topics' ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'topics' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 w-96"
                >
                  <div className="bg-[#070714] border border-white/5 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] grid grid-cols-2 gap-2">
                    {TOPIC_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all text-xs font-semibold text-[var(--color-text-secondary)] hover:text-white group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-[#52B7FF]/30 transition-colors">
                            <Icon className="w-3.5 h-3.5 text-[#52B7FF]" />
                          </div>
                          <span>{item.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tools Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('tools')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={`flex items-center gap-1 transition-colors hover:text-[#52B7FF] cursor-pointer ${['/universe', '/dashboard', '/search', '/bookmarks'].includes(location.pathname) ? 'text-[#52B7FF]' : 'text-[var(--color-text-secondary)]'}`}>
              <span>Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === 'tools' ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {activeDropdown === 'tools' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 w-48"
                >
                  <div className="bg-[#070714] border border-white/5 rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-1">
                    {TOOL_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all text-xs font-semibold text-[var(--color-text-secondary)] hover:text-white group"
                        >
                          <Icon className="w-4 h-4 text-[#52B7FF] shrink-0" />
                          <span>{item.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </nav>

        {/* Right Side: CTA Button, Streak & Settings */}
        <div className="flex items-center gap-4">
          {/* Streak Indicator */}
          {streak > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-bold font-mono">
              <Trophy className="w-3.5 h-3.5" />
              <span>{streak}d STREAK 🔥</span>
            </div>
          )}

          {/* Glowing CTA - Take Mock Interview */}
          <button 
            onClick={() => navigate('/mock-interview')}
            className="btn-cyber-glow cursor-pointer hidden md:inline-flex active:scale-95 transition-transform"
          >
            <div className="btn-cyber-glow-track" />
            <div className="btn-cyber-glow-inner text-[10px] font-black tracking-widest uppercase text-white py-2 px-4">
              <span>Mock Interview</span>
              <GraduationCap className="w-3.5 h-3.5 text-[#52B7FF]" />
            </div>
          </button>

          {/* Settings cog */}
          <button 
            onClick={() => navigate('/settings')}
            className={`p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer ${location.pathname === '/settings' ? 'text-[#52B7FF]' : 'text-[var(--color-text-secondary)]'}`}
            title="Settings"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>

          {/* Hamburger Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-white transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-16 inset-x-0 bg-[#040410]/95 backdrop-blur-[16px] border-b border-white/5 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="px-6 py-6 space-y-6">
              
              {/* Primary Pages */}
              <div className="flex flex-col gap-3 font-semibold">
                <NavLink to="/" end className="text-sm py-1.5 border-b border-white/5 block hover:text-[#52B7FF]">
                  My Profile
                </NavLink>
                <NavLink to="/home" className="text-sm py-1.5 border-b border-white/5 block hover:text-[#52B7FF]">
                  Preparation Home
                </NavLink>
                <NavLink to="/mock-interview" className="text-sm py-1.5 border-b border-white/5 block hover:text-[#52B7FF]">
                  Mock Interview
                </NavLink>
              </div>

              {/* Topics Grid */}
              <div>
                <p className="text-[10px] tracking-[0.2em] font-black uppercase text-[#52B7FF] mb-3">
                  Topics
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {TOPIC_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5 text-xs font-semibold hover:text-[#52B7FF]"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#52B7FF] shrink-0" />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>

              {/* Tools List */}
              <div>
                <p className="text-[10px] tracking-[0.2em] font-black uppercase text-[#52B7FF] mb-3">
                  Tools & Dashboard
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {TOOL_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5 text-xs font-semibold hover:text-[#52B7FF]"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#52B7FF] shrink-0" />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Pages Viewport */}
      <main className="flex-1 overflow-y-auto relative z-10" id="main-scroll-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="p-4 lg:p-8 max-w-7xl mx-auto w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}
