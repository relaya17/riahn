import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  AlertTriangle, 
  Bug, 
  RefreshCw, 
  CheckCircle, 
  XCircle,
  Activity,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff
} from 'lucide-react'
import { errorHandler, ErrorType, ErrorSeverity } from '@/lib/error-handler'
import { cn } from '@/lib/utils'

interface ErrorMonitorProps {
  className?: string
}

export function ErrorMonitor({ className }: ErrorMonitorProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [errorStats, setErrorStats] = useState({
    total: 0,
    byType: {} as Record<ErrorType, number>,
    bySeverity: {} as Record<ErrorSeverity, number>,
    recent: []
  })
  const [isMonitoring, setIsMonitoring] = useState(true)

  useEffect(() => {
    if (!isMonitoring) return

    const updateStats = () => {
      const stats = errorHandler.getErrorStats()
      setErrorStats(stats)
    }

    // Update stats immediately
    updateStats()

    // Update stats every 5 seconds
    const interval = setInterval(updateStats, 5000)

    return () => clearInterval(interval)
  }, [isMonitoring])

  const getSeverityColor = (severity: ErrorSeverity): string => {
    switch (severity) {
      case ErrorSeverity.CRITICAL:
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20'
      case ErrorSeverity.HIGH:
        return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/20'
      case ErrorSeverity.MEDIUM:
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20'
      case ErrorSeverity.LOW:
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20'
    }
  }

  const getTypeIcon = (type: ErrorType) => {
    switch (type) {
      case ErrorType.NETWORK:
        return '🌐'
      case ErrorType.AUTHENTICATION:
        return '🔐'
      case ErrorType.VALIDATION:
        return '✅'
      case ErrorType.SERVER:
        return '🖥️'
      case ErrorType.CLIENT:
        return '💻'
      default:
        return '❓'
    }
  }

  const clearErrors = () => {
    errorHandler.clearErrors()
    setErrorStats({
      total: 0,
      byType: {} as Record<ErrorType, number>,
      bySeverity: {} as Record<ErrorSeverity, number>,
      recent: []
    })
  }

  const testError = () => {
    errorHandler.reportError(
      'Test error for monitoring system',
      ErrorType.CLIENT,
      ErrorSeverity.LOW,
      { test: true }
    )
  }

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        variant="outline"
        size="sm"
        className={cn(
          'fixed bottom-4 right-4 z-50',
          errorStats.total > 0 && 'animate-pulse',
          className
        )}
      >
        <Bug className="h-4 w-4 mr-2" />
        שגיאות
        {errorStats.total > 0 && (
          <Badge className="ml-2 bg-red-500 text-white">
            {errorStats.total}
          </Badge>
        )}
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 max-h-96 overflow-y-auto">
      <Card className="shadow-lg border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bug className="h-5 w-5" />
              ניטור שגיאות
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsMonitoring(!isMonitoring)}
                variant="outline"
                size="sm"
                className={cn(
                  isMonitoring ? 'text-green-600' : 'text-gray-400'
                )}
              >
                {isMonitoring ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
              <Button
                onClick={clearErrors}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setIsVisible(false)}
                variant="outline"
                size="sm"
              >
                ×
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Error Statistics */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-1">
              <Activity className="h-4 w-4" />
              סטטיסטיקות
            </h4>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {errorStats.total}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  סה"כ שגיאות
                </div>
              </div>
              
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-lg font-bold text-red-600">
                  {errorStats.bySeverity[ErrorSeverity.CRITICAL] || 0}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  קריטיות
                </div>
              </div>
            </div>
          </div>

          {/* Error Types */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">סוגי שגיאות</h4>
            <div className="space-y-2">
              {Object.entries(errorStats.byType).map(([type, count]) => (
                count > 0 && (
                  <div key={type} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span>{getTypeIcon(type as ErrorType)}</span>
                      <span className="font-medium">{type}</span>
                    </div>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Error Severities */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">רמות חומרה</h4>
            <div className="space-y-2">
              {Object.entries(errorStats.bySeverity).map(([severity, count]) => (
                count > 0 && (
                  <div key={severity} className="flex items-center justify-between text-xs">
                    <span className="font-medium">{severity}</span>
                    <Badge className={getSeverityColor(severity as ErrorSeverity)}>
                      {count}
                    </Badge>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Recent Errors */}
          {errorStats.recent.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">שגיאות אחרונות</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {errorStats.recent.slice(0, 3).map((error, index) => (
                  <div key={index} className="text-xs p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium truncate">{error.message}</span>
                      <Badge className={getSeverityColor(error.severity)}>
                        {error.severity}
                      </Badge>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {new Date(error.timestamp).toLocaleTimeString('he-IL')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 border-t space-y-2">
            <Button
              onClick={testError}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              בדיקת שגיאה
            </Button>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {isMonitoring ? 'מנטר פעיל' : 'מנטר מושבת'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Error boundary component
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo })
    
    // Report error to error handler
    errorHandler.handleError({
      type: ErrorType.CLIENT,
      severity: ErrorSeverity.HIGH,
      message: error.message,
      details: {
        componentStack: errorInfo.componentStack,
        errorBoundary: true
      },
      timestamp: new Date(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      stack: error.stack
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <XCircle className="h-5 w-5" />
                שגיאה באפליקציה
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                אירעה שגיאה לא צפויה. השגיאה נשלחה לצוות הפיתוח.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-xs">
                  <summary className="cursor-pointer font-medium">
                    פרטי שגיאה (פיתוח)
                  </summary>
                  <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded overflow-auto">
                    {this.state.error.message}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
              
              <div className="flex gap-2">
                <Button
                  onClick={() => window.location.reload()}
                  className="flex-1"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  טען מחדש
                </Button>
                <Button
                  onClick={() => this.setState({ hasError: false })}
                  variant="outline"
                  className="flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  נסה שוב
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
