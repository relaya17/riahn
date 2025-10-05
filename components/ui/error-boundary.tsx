'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    })

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: log to error tracking service
      // logErrorToService(error, errorInfo)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  handleReportBug = () => {
    const errorDetails = {
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    }

    // In a real app, you would send this to your error reporting service
    console.log('Bug report:', errorDetails)
    
    // For now, copy to clipboard
    navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2))
    alert('פרטי השגיאה הועתקו ללוח. אנא שלח אותם לצוות התמיכה.')
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">
                אופס! משהו השתבש
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                מצטערים, אירעה שגיאה לא צפויה. אנא נסה שוב או פנה לתמיכה.
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                    פרטי השגיאה (מצב פיתוח):
                  </h3>
                  <pre className="text-sm text-red-700 dark:text-red-300 overflow-auto">
                    {this.state.error.message}
                    {this.state.error.stack && (
                      <>
                        {'\n\nStack Trace:\n'}
                        {this.state.error.stack}
                      </>
                    )}
                  </pre>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={this.handleRetry}
                  className="flex-1"
                  variant="default"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  נסה שוב
                </Button>
                
                <Button
                  onClick={this.handleGoHome}
                  className="flex-1"
                  variant="outline"
                >
                  <Home className="w-4 h-4 mr-2" />
                  חזור לעמוד הבית
                </Button>
                
                <Button
                  onClick={this.handleReportBug}
                  className="flex-1"
                  variant="outline"
                >
                  <Bug className="w-4 h-4 mr-2" />
                  דווח על באג
                </Button>
              </div>

              {/* Help Text */}
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                <p>
                  אם הבעיה נמשכת, אנא פנה לתמיכה הטכנית שלנו.
                </p>
                <p className="mt-1">
                  <a 
                    href="mailto:support@languageconnect.com" 
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    support@languageconnect.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook for functional components to handle errors
export function useErrorHandler() {
  return (error: Error, errorInfo?: string) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo)
    
    // In a real app, you would send this to your error reporting service
    if (process.env.NODE_ENV === 'production') {
      // logErrorToService(error, { errorInfo })
    }
  }
}

// Higher-order component for error boundaries
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

// Async error boundary for handling async errors
export class AsyncErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo })
    
    // Handle async errors
    if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
      // Handle chunk loading errors (common with code splitting)
      window.location.reload()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">שגיאה בטעינת התוכן</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            יש בעיה בטעינת התוכן. אנא רענן את הדף.
          </p>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            רענן דף
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}