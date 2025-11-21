import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { StatusMessage } from './components/StatusMessage';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const TopicDetail = lazy(() => import('./pages/TopicDetail').then(module => ({ default: module.TopicDetail })));
const Bookmarks = lazy(() => import('./pages/Bookmarks').then(module => ({ default: module.Bookmarks })));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <StatusMessage message="Loading..." />
  </div>
);

export const App = () => (
  <Layout>
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics/:id" element={<TopicDetail />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
      </Routes>
    </Suspense>
  </Layout>
);

