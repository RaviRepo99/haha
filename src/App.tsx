import { lazy, Suspense } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingFallback from './components/LoadingFallback';

const HomePage = lazy(() => import('./pages/HomePage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const EventDetailsPage = lazy(() => import('./pages/EventDetailsPage'));
const AIRegistrationPage = lazy(() => import('./pages/AIRegistrationPage'));
const JoinClubPage = lazy(() => import('./pages/JoinClubPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ResourcesPortalPage = lazy(() => import('./pages/ResourcesPortalPage'));
const RecentDownloadsPage = lazy(() => import('./pages/RecentDownloadsPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
const ResultViewPage = lazy(() => import('./pages/ResultViewPage'));
const FavoritesPage = () => <div className="p-8 text-center">Favorites page coming soon.</div>;

function App() {
  const location = useLocation();
  const isPortalRoute = location.pathname === '/login' || location.pathname.startsWith('/resources');
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('ccrc-resources-auth') === 'true';

  const appRoutes = (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/register/ai" element={<AIRegistrationPage />} />
        <Route path="/join" element={<JoinClubPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/result/view" element={<ResultViewPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/resources/dashboard" replace /> : <LoginPage />} />
        <Route path="/resources" element={isAuthenticated ? <Navigate to="/resources/dashboard" replace /> : <LoginPage />} />
        <Route path="/resources/dashboard" element={isAuthenticated ? <ResourcesPortalPage /> : <Navigate to="/resources" replace />} />
        <Route path="/resources/favorites" element={isAuthenticated ? <FavoritesPage /> : <Navigate to="/resources" replace />} />
        <Route path="/resources/recent" element={isAuthenticated ? <RecentDownloadsPage /> : <Navigate to="/resources" replace />} />
      </Routes>
    </Suspense>
  );

  return (
    <ErrorBoundary>
      {isPortalRoute ? appRoutes : <BaseLayout>{appRoutes}</BaseLayout>}
    </ErrorBoundary>
  );
}

export default App;

