import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

/**
 * Props for the ErrorBoundary component
 */
interface ErrorBoundaryProps {
  /** Child components to render when no error occurs */
  children: ReactNode
  /** Optional custom fallback UI to render when an error occurs */
  fallback?: ReactNode
}

/**
 * Internal state for the ErrorBoundary component
 */
interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean
  /** The caught error object, if any */
  error?: Error
}

/**
 * ErrorBoundary component that catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 *
 * This follows React 19 best practices for error handling and provides a better user experience
 * when unexpected errors occur in the application.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  /**
   * Static method called when an error is thrown during rendering
   * Updates state to trigger the error UI
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  /**
   * Lifecycle method called when an error is caught
   * Used for logging errors to external services
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In production, you would typically log this to a monitoring service
    // like Sentry, LogRocket, or similar
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  /**
   * Handles retry action by resetting the error state
   */
  private handleRetry = (): void => {
    this.setState({ hasError: false, error: undefined })
  }

  /**
   * Renders the error UI or children based on error state
   */
  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI with modern design
      return (
        <div className='min-h-screen flex items-center justify-center bg-bg-primary px-4'>
          <div className='max-w-md w-full text-center'>
            {/* Error Icon */}
            <div className='mb-6'>
              <svg
                className='mx-auto h-16 w-16 text-error-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                />
              </svg>
            </div>

            {/* Error Message */}
            <h1 className='text-2xl font-bold text-text-primary mb-3'>
              Oops! Something went wrong
            </h1>
            <p className='text-text-secondary mb-8 leading-relaxed'>
              We're sorry, but something unexpected happened. Please try
              refreshing the page or contact support if the problem persists.
            </p>

            {/* Development Error Details */}
            {import.meta.env.DEV && this.state.error && (
              <details className='mb-8 text-left bg-neutral-50 rounded-lg p-4 border border-neutral-200'>
                <summary className='cursor-pointer text-sm font-medium text-text-secondary hover:text-text-primary transition-colors'>
                  🔍 Error Details (Development Only)
                </summary>
                <pre className='mt-3 text-xs bg-neutral-100 p-3 rounded border overflow-auto text-error-600 font-mono'>
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              <button
                onClick={this.handleRetry}
                className={
                  'bg-primary-600 hover:bg-primary-700 text-white font-medium ' +
                  'py-3 px-6 rounded-lg transition-colors duration-fast ' +
                  'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ' +
                  'active:bg-primary-800'
                }
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className={
                  'bg-neutral-100 hover:bg-neutral-200 text-text-primary font-medium ' +
                  'py-3 px-6 rounded-lg transition-colors duration-fast ' +
                  'focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 ' +
                  'border border-neutral-300'
                }
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
