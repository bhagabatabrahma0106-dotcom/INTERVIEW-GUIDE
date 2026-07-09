import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import QuestionPage from './pages/QuestionPage';
import SearchPage from './pages/SearchPage';
import MockInterviewPage from './pages/MockInterviewPage';
import DashboardPage from './pages/DashboardPage';
import BookmarksPage from './pages/BookmarksPage';
import SettingsPage from './pages/SettingsPage';
import UniversePage from './pages/UniversePage';
import { useAppStore } from './store/useAppStore';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const updateStreak = useAppStore(state => state.updateStreak);

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Profile page is the landing page */}
          <Route index element={<ProfilePage />} />
          {/* Interview prep home */}
          <Route path="home" element={<HomePage />} />
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route path="question/:questionId" element={<QuestionPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="mock-interview" element={<MockInterviewPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="universe" element={<UniversePage />} />
          <Route path="bookmarks" element={<BookmarksPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </>
  );
}
