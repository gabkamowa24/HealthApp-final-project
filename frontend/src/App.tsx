import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Bookmarks } from './pages/Bookmarks';
import { Home } from './pages/Home';
import { TopicDetail } from './pages/TopicDetail';

export const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/topics/:id" element={<TopicDetail />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
    </Routes>
  </Layout>
);

