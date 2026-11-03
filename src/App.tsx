import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/AdminLayout';
import DashboardPage from './pages/DashboardPage';

function Page({ title }: { title: string }) {
  return (
    <div className="container-fluid py-4">
      <h1 className="h3 mb-3">{title}</h1>
      <p className="text-muted">
        Migrating content to React. Original page markup will be ported here.
      </p>
    </div>
  );
}

const pages = [
  ['analytics', 'Analytics'],
  ['users', 'Users'],
  ['products', 'Products'],
  ['orders', 'Orders'],
  ['reports', 'Reports'],
  ['messages', 'Messages'],
  ['calendar', 'Calendar'],
  ['files', 'File Manager'],
  ['forms', 'Forms'],
  ['settings', 'Settings'],
  ['security', 'Security'],
  ['help', 'Help'],
  ['elements', 'Elements'],
] as const;

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<DashboardPage />} />
        {pages.map(([slug, title]) => (
          <Route key={slug} path={slug} element={<Page title={title} />} />
        ))}
      </Route>
      <Route path="login" element={<Page title="Sign in" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}