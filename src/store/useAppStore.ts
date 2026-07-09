import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MockSession {
  questionIds: number[];
  currentIndex: number;
  answers: Record<number, 'correct' | 'incorrect' | 'skipped'>;
  startTime: number;
  endTime?: number;
}

interface AppState {
  // Bookmarks
  bookmarks: number[];
  toggleBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;

  // Completed
  completed: number[];
  toggleCompleted: (id: number) => void;
  isCompleted: (id: number) => boolean;

  // Recently viewed
  recentlyViewed: number[];
  addRecentlyViewed: (id: number) => void;

  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Mock interview
  mockSession: MockSession | null;
  startMockSession: (questionIds: number[]) => void;
  answerMockQuestion: (questionId: number, result: 'correct' | 'incorrect' | 'skipped') => void;
  nextMockQuestion: () => void;
  endMockSession: () => void;

  // Streak
  streak: number;
  lastActiveDate: string | null;
  updateStreak: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Bookmarks
      bookmarks: [],
      toggleBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(id)
            ? state.bookmarks.filter((b) => b !== id)
            : [...state.bookmarks, id],
        })),
      isBookmarked: (id) => get().bookmarks.includes(id),

      // Completed
      completed: [],
      toggleCompleted: (id) =>
        set((state) => ({
          completed: state.completed.includes(id)
            ? state.completed.filter((c) => c !== id)
            : [...state.completed, id],
        })),
      isCompleted: (id) => get().completed.includes(id),

      // Recently viewed
      recentlyViewed: [],
      addRecentlyViewed: (id) =>
        set((state) => ({
          recentlyViewed: [id, ...state.recentlyViewed.filter((r) => r !== id)].slice(0, 20),
        })),

      // Sidebar
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Mock interview
      mockSession: null,
      startMockSession: (questionIds) =>
        set({
          mockSession: {
            questionIds,
            currentIndex: 0,
            answers: {},
            startTime: Date.now(),
          },
        }),
      answerMockQuestion: (questionId, result) =>
        set((state) => ({
          mockSession: state.mockSession
            ? {
                ...state.mockSession,
                answers: { ...state.mockSession.answers, [questionId]: result },
              }
            : null,
        })),
      nextMockQuestion: () =>
        set((state) => ({
          mockSession: state.mockSession
            ? {
                ...state.mockSession,
                currentIndex: Math.min(
                  state.mockSession.currentIndex + 1,
                  state.mockSession.questionIds.length - 1
                ),
              }
            : null,
        })),
      endMockSession: () =>
        set((state) => ({
          mockSession: state.mockSession
            ? { ...state.mockSession, endTime: Date.now() }
            : null,
        })),

      // Streak
      streak: 0,
      lastActiveDate: null,
      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastActiveDate, streak } = get();
        if (lastActiveDate === today) return;

        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        set({
          streak: lastActiveDate === yesterday ? streak + 1 : 1,
          lastActiveDate: today,
        });
      },
    }),
    {
      name: 'interview-guide-storage',
      partialize: (state) => ({
        bookmarks: state.bookmarks,
        completed: state.completed,
        recentlyViewed: state.recentlyViewed,
        streak: state.streak,
        lastActiveDate: state.lastActiveDate,
      }),
    }
  )
);
