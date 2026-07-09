import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Fallback UI shown when WebGL fails. Defaults to a gradient div. */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Wraps any <Canvas> so that WebGL failures degrade gracefully.
 * The rest of the page stays interactive regardless.
 */
export class ErrorBoundary3D extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: { componentStack?: string | null }) {
    console.warn('[3D ErrorBoundary] WebGL scene failed:', error.message, info.componentStack);
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at 60% 40%, rgba(124,58,237,0.12) 0%, rgba(10,10,15,0) 70%)',
              pointerEvents: 'none',
            }}
          />
        )
      );
    }
    return this.props.children;
  }
}
