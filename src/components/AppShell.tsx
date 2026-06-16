import { NavLink, Outlet } from 'react-router-dom';
import { ErrorBoundary } from './ErrorBoundary';
import {
  Globe2,
  Boxes,
  Hammer,
  GitCompareArrows,
  Swords,
  Radar,
  type LucideIcon,
} from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  labelKo: string;
  icon: LucideIcon;
  end?: boolean;
}

const NAV: NavItem[] = [
  { to: '/', label: 'BROWSER', labelKo: '국가 전력', icon: Globe2, end: true },
  { to: '/catalog', label: 'CATALOG', labelKo: '무기·플랫폼', icon: Boxes },
  { to: '/creator', label: 'CREATOR', labelKo: '제작기', icon: Hammer },
  { to: '/compare', label: 'COMPARE', labelKo: '비교', icon: GitCompareArrows },
  { to: '/simulator', label: 'WAR SIM', labelKo: '시뮬레이션', icon: Swords },
];

export function AppShell() {
  return (
    <div className="flex min-h-full flex-col bg-hud-bg md:flex-row">
      {/* Sidebar (desktop) / bottom bar (mobile) */}
      <aside className="sticky top-0 z-20 flex shrink-0 flex-row items-center gap-1 border-b border-hud-line bg-hud-panel/80 px-3 py-2 backdrop-blur md:h-screen md:w-60 md:flex-col md:items-stretch md:gap-1 md:border-b-0 md:border-r md:px-3 md:py-5">
        <div className="mr-2 flex items-center gap-2 px-2 md:mb-6 md:mr-0">
          <Radar size={20} className="text-hud-accent" />
          <div className="hidden leading-tight md:block">
            <div className="font-mono text-sm font-bold tracking-wider text-hud-ink">
              GMDB
            </div>
            <div className="hud-label">military database</div>
          </div>
        </div>

        <nav className="flex flex-1 flex-row gap-1 overflow-x-auto md:flex-col md:overflow-visible">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  'group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors',
                  isActive
                    ? 'bg-hud-accent-dim/25 text-hud-ink'
                    : 'text-hud-ink-soft hover:bg-hud-panel-2 hover:text-hud-ink',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={18}
                    className={
                      isActive ? 'text-hud-accent' : 'text-hud-ink-soft group-hover:text-hud-ink'
                    }
                  />
                  <span className="hidden flex-col md:flex">
                    <span className="font-mono text-[11px] tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-xs text-hud-ink-soft">{item.labelKo}</span>
                  </span>
                  <span className="font-mono text-[11px] tracking-wider md:hidden">
                    {item.labelKo}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden px-2 md:block">
          <div className="hud-label">v0.0 · stage 0</div>
        </div>
      </aside>

      {/* Main content */}
      <main className="relative min-w-0 flex-1">
        <div className="pointer-events-none absolute inset-0 bg-grid bg-[size:32px_32px] opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}
