import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingFallback from './components/LoadingFallback';

const HomePage = lazy(() => import('./pages/HomePage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const EventDetailsPage = lazy(() => import('./pages/EventDetailsPage'));
const AIRegistrationPage = lazy(() => import('./pages/AIRegistrationPage'));
const JoinClubPage = lazy(() => import('./pages/JoinClubPage'));

function App() {
  return (
    <ErrorBoundary>
      <BaseLayout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="/register/ai" element={<AIRegistrationPage />} />
            <Route path="/join" element={<JoinClubPage />} />
          </Routes>
        </Suspense>
      </BaseLayout>
    </ErrorBoundary>
  );
}

export default App;

