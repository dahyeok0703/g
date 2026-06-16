import { Link, useRouteError } from 'react-router-dom';

export function NotFoundPage() {
  const error = useRouteError() as { statusText?: string; message?: string } | null;
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-mono text-5xl font-bold text-hud-danger">404</p>
      <p className="text-hud-ink-soft">
        {error?.statusText || error?.message || '경로를 찾을 수 없습니다.'}
      </p>
      <Link
        to="/"
        className="rounded-md border border-hud-line px-4 py-2 font-mono text-sm text-hud-ink transition-colors hover:border-hud-accent-dim hover:text-hud-accent"
      >
        ← 국가 전력으로
      </Link>
    </div>
  );
}
