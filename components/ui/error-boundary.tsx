'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-400">
              <AlertTriangle className="h-5 w-5" />
              שגיאה בטעינת הרכיב
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-red-700 dark:text-red-300">
              אירעה שגיאה בטעינת הרכיב. אנא נסה שוב.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-sm text-red-600 dark:text-red-400">
                <summary className="cursor-pointer font-medium">פרטי השגיאה</summary>
                <pre className="mt-2 whitespace-pre-wrap bg-red-100 dark:bg-red-900/30 p-2 rounded">
                  {this.state.error.message}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <Button 
              onClick={this.handleRetry}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              נסה שוב
            </Button>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}

