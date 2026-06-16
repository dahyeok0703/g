import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { NotFoundPage } from './components/NotFoundPage';
import { Loading } from './components/Loading';

// Route-level code splitting (spec §1, §13). Browser is eager (landing); the
// chart-heavy routes (Compare/Simulator pull in Recharts) and the rest load on
// demand so the initial bundle stays lean.
import { BrowserPage } from './features/browser/BrowserPage';

const lazyPage = (factory: () => Promise<Record<string, unknown>>, name: string) =>
  lazy(() => factory().then((m) => ({ default: m[name] as React.ComponentType })));

const CountryPage = lazyPage(() => import('./features/browser/CountryPage'), 'CountryPage');
const CatalogPage = lazyPage(() => import('./features/catalog/CatalogPage'), 'CatalogPage');
const CreatorPage = lazyPage(() => import('./features/creator/CreatorPage'), 'CreatorPage');
const ComparePage = lazyPage(() => import('./features/compare/ComparePage'), 'ComparePage');
const SimulatorPage = lazyPage(() => import('./features/simulator/SimulatorPage'), 'SimulatorPage');

const withSuspense = (node: React.ReactNode) => <Suspense fallback={<Loading />}>{node}</Suspense>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <BrowserPage /> },
      { path: 'country/:id', element: withSuspense(<CountryPage />) },
      { path: 'catalog', element: withSuspense(<CatalogPage />) },
      { path: 'creator', element: withSuspense(<CreatorPage />) },
      { path: 'compare', element: withSuspense(<ComparePage />) },
      { path: 'simulator', element: withSuspense(<SimulatorPage />) },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
