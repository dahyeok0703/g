import { Component, type ErrorInfo, type ReactNode } from 'react';

interface State {
  error: Error | null;
}

// App-level error boundary so a render fault in one feature doesn't blank the
// whole console (spec §13: 에러 처리).
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[GMDB] render error', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <p className="font-mono text-xl text-hud-danger">⚠ 화면 렌더링 오류</p>
          <p className="max-w-md text-sm text-hud-ink-soft">{this.state.error.message}</p>
          <button
            onClick={() => this.setState({ error: null })}
            className="rounded-md border border-hud-line px-4 py-2 font-mono text-sm text-hud-ink hover:border-hud-accent-dim hover:text-hud-accent"
          >
            다시 시도
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
