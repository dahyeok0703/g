import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { BrowserPage } from './features/browser/BrowserPage';
import { CatalogPage } from './features/catalog/CatalogPage';
import { CreatorPage } from './features/creator/CreatorPage';
import { ComparePage } from './features/compare/ComparePage';
import { SimulatorPage } from './features/simulator/SimulatorPage';
import { NotFoundPage } from './components/NotFoundPage';

// Stage 0: routing skeleton. Feature pages are placeholders that later stages
// fill in. Code-splitting / lazy loading is deferred to Stage 13.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <BrowserPage /> },
      { path: 'catalog', element: <CatalogPage /> },
      { path: 'creator', element: <CreatorPage /> },
      { path: 'compare', element: <ComparePage /> },
      { path: 'simulator', element: <SimulatorPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
