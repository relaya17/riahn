import { toast } from 'react-hot-toast'

// Error types
export enum ErrorType {
    NETWORK = 'NETWORK',
    VALIDATION = 'VALIDATION',
    AUTHENTICATION = 'AUTHENTICATION',
    AUTHORIZATION = 'AUTHORIZATION',
    NOT_FOUND = 'NOT_FOUND',
    SERVER = 'SERVER',
    CLIENT = 'CLIENT',
    UNKNOWN = 'UNKNOWN'
}

// Error severity levels
export enum ErrorSeverity {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL'
}

// Error interface
export interface AppError {
    type: ErrorType
    severity: ErrorSeverity
    message: string
    code?: string | number
    details?: Record<string, unknown>
    timestamp: Date
    userId?: string
    sessionId?: string
    url?: string
    userAgent?: string
    stack?: string
}

// Error handler class
export class ErrorHandler {
    private static instance: ErrorHandler
    private errorQueue: AppError[] = []
    private maxQueueSize = 100
    private isOnline = true

    private constructor() {
        this.setupGlobalErrorHandlers()
        this.setupNetworkMonitoring()
    }

    public static getInstance(): ErrorHandler {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler()
        }
        return ErrorHandler.instance
    }

    // Setup global error handlers
    private setupGlobalErrorHandlers() {
        // Only setup in browser environment
        if (typeof window === 'undefined') return
        
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError({
                type: ErrorType.CLIENT,
                severity: ErrorSeverity.HIGH,
                message: 'Unhandled Promise Rejection',
                details: { reason: event.reason },
                timestamp: new Date(),
                url: window.location.href,
                userAgent: navigator.userAgent
            })
        })

        // Handle JavaScript errors
        window.addEventListener('error', (event) => {
            this.handleError({
                type: ErrorType.CLIENT,
                severity: ErrorSeverity.HIGH,
                message: event.message,
                details: {
                    filename: event.filename,
                    lineno: event.lineno,
                    colno: event.colno
                },
                timestamp: new Date(),
                url: window.location.href,
                userAgent: navigator.userAgent,
                stack: event.error?.stack
            })
        })

        // Handle resource loading errors
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.handleError({
                    type: ErrorType.CLIENT,
                    severity: ErrorSeverity.MEDIUM,
                    message: 'Resource Loading Error',
                    details: {
                        tagName: (event.target as HTMLElement)?.tagName,
                        src: (event.target as HTMLImageElement)?.src || (event.target as HTMLElement)?.getAttribute('src')
                    },
                    timestamp: new Date(),
                    url: window.location.href
                })
            }
        }, true)
    }

    // Setup network monitoring
    private setupNetworkMonitoring() {
        // Only setup in browser environment
        if (typeof window === 'undefined') return
        
        // Monitor online/offline status
        window.addEventListener('online', () => {
            this.isOnline = true
            this.processErrorQueue()
        })

        window.addEventListener('offline', () => {
            this.isOnline = false
        })

        // Monitor fetch errors
        const originalFetch = window.fetch
        window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
            try {
                const response = await originalFetch(input, init)

                if (!response.ok) {
                    this.handleError({
                        type: ErrorType.NETWORK,
                        severity: this.getSeverityFromStatus(response.status),
                        message: `HTTP ${response.status}: ${response.statusText}`,
                        code: response.status,
                        details: {
                            url: typeof input === 'string' ? input : input.toString(),
                            method: init?.method || 'GET'
                        },
                        timestamp: new Date(),
                        url: window.location.href
                    })
                }

                return response
            } catch (error) {
                this.handleError({
                    type: ErrorType.NETWORK,
                    severity: ErrorSeverity.HIGH,
                    message: 'Network Request Failed',
                    details: {
                        url: typeof input === 'string' ? input : input.toString(),
                        method: init?.method || 'GET',
                        error: error instanceof Error ? error.message : 'Unknown error'
                    },
                    timestamp: new Date(),
                    url: window.location.href
                })
                throw error
            }
        }
    }

    // Get severity from HTTP status code
    private getSeverityFromStatus(status: number): ErrorSeverity {
        if (status >= 500) return ErrorSeverity.HIGH
        if (status >= 400) return ErrorSeverity.MEDIUM
        return ErrorSeverity.LOW
    }

    // Main error handling method
    public handleError(error: Partial<AppError>): void {
        const fullError: AppError = {
            type: error.type || ErrorType.UNKNOWN,
            severity: error.severity || ErrorSeverity.MEDIUM,
            message: error.message || 'Unknown error occurred',
            code: error.code,
            details: error.details,
            timestamp: error.timestamp || new Date(),
            userId: error.userId,
            sessionId: error.sessionId,
            url: error.url || window.location.href,
            userAgent: error.userAgent || navigator.userAgent,
            stack: error.stack
        }

        // Add to queue
        this.addToQueue(fullError)

        // Show user notification
        this.showUserNotification(fullError)

        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Error handled:', fullError)
        }

        // Auto-recovery attempts
        this.attemptAutoRecovery(fullError)
    }

    // Add error to queue
    private addToQueue(error: AppError): void {
        this.errorQueue.push(error)

        // Maintain queue size
        if (this.errorQueue.length > this.maxQueueSize) {
            this.errorQueue.shift()
        }

        // Try to send to server if online
        if (this.isOnline) {
            this.sendToServer(error)
        }
    }

    // Show user notification
    private showUserNotification(error: AppError): void {
        const message = this.getUserFriendlyMessage(error)

        switch (error.severity) {
            case ErrorSeverity.CRITICAL:
                toast.error(`🚨 ${message}`, { duration: 10000 })
                break
            case ErrorSeverity.HIGH:
                toast.error(`⚠️ ${message}`, { duration: 7000 })
                break
            case ErrorSeverity.MEDIUM:
                toast.error(message, { duration: 5000 })
                break
            case ErrorSeverity.LOW:
                toast(message, { duration: 3000 })
                break
        }
    }

    // Get user-friendly error message
    private getUserFriendlyMessage(error: AppError): string {
        switch (error.type) {
            case ErrorType.NETWORK:
                return 'בעיית חיבור לאינטרנט. אנא בדוק את החיבור שלך.'
            case ErrorType.AUTHENTICATION:
                return 'נדרשת התחברות מחדש. אנא התחבר שוב.'
            case ErrorType.AUTHORIZATION:
                return 'אין לך הרשאה לבצע פעולה זו.'
            case ErrorType.NOT_FOUND:
                return 'הדף או המשאב המבוקש לא נמצא.'
            case ErrorType.VALIDATION:
                return 'הנתונים שהוזנו אינם תקינים.'
            case ErrorType.SERVER:
                return 'שגיאה בשרת. אנא נסה שוב מאוחר יותר.'
            default:
                return error.message || 'אירעה שגיאה לא צפויה.'
        }
    }

    // Attempt auto-recovery
    private attemptAutoRecovery(error: AppError): void {
        switch (error.type) {
            case ErrorType.NETWORK:
                // Retry network requests after delay
                setTimeout(() => {
                    if (this.isOnline) {
                        this.processErrorQueue()
                    }
                }, 5000)
                break

            case ErrorType.AUTHENTICATION:
                // Redirect to login
                setTimeout(() => {
                    window.location.href = '/auth'
                }, 2000)
                break

            case ErrorType.CLIENT:
                // Try to reload page for critical client errors
                if (error.severity === ErrorSeverity.CRITICAL) {
                    setTimeout(() => {
                        if (confirm('אירעה שגיאה קריטית. האם ברצונך לטעון מחדש את הדף?')) {
                            window.location.reload()
                        }
                    }, 3000)
                }
                break
        }
    }

    // Send error to server
    private async sendToServer(error: AppError): Promise<void> {
        try {
            await fetch('/api/errors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(error)
            })
        } catch (sendError) {
            // If sending fails, keep in queue for later
            console.warn('Failed to send error to server:', sendError)
        }
    }

    // Process error queue when back online
    private async processErrorQueue(): Promise<void> {
        if (!this.isOnline || this.errorQueue.length === 0) return

        const errorsToSend = [...this.errorQueue]
        this.errorQueue = []

        for (const error of errorsToSend) {
            await this.sendToServer(error)
        }
    }

    // Manual error reporting
    public reportError(
        message: string,
        type: ErrorType = ErrorType.UNKNOWN,
        severity: ErrorSeverity = ErrorSeverity.MEDIUM,
        details?: Record<string, unknown>
    ): void {
        this.handleError({
            type,
            severity,
            message,
            details,
            timestamp: new Date(),
            url: window.location.href,
            userAgent: navigator.userAgent
        })
    }

    // Get error statistics
    public getErrorStats(): {
        total: number
        byType: Record<ErrorType, number>
        bySeverity: Record<ErrorSeverity, number>
        recent: AppError[]
    } {
        const byType = {} as Record<ErrorType, number>
        const bySeverity = {} as Record<ErrorSeverity, number>

        // Initialize counters
        Object.values(ErrorType).forEach(type => byType[type] = 0)
        Object.values(ErrorSeverity).forEach(severity => bySeverity[severity] = 0)

        // Count errors
        this.errorQueue.forEach(error => {
            byType[error.type]++
            bySeverity[error.severity]++
        })

        return {
            total: this.errorQueue.length,
            byType,
            bySeverity,
            recent: this.errorQueue.slice(-10)
        }
    }

    // Clear error queue
    public clearErrors(): void {
        this.errorQueue = []
    }
}

// Global error handler instance
export const errorHandler = ErrorHandler.getInstance()

// Convenience functions
export const reportError = (
    message: string,
    type?: ErrorType,
    severity?: ErrorSeverity,
    details?: Record<string, unknown>
) => errorHandler.reportError(message, type, severity, details)

export const reportNetworkError = (error: Error, url?: string) => {
    errorHandler.handleError({
        type: ErrorType.NETWORK,
        severity: ErrorSeverity.HIGH,
        message: error.message,
        details: { url, originalError: error.message },
        timestamp: new Date(),
        url: window.location.href
    })
}

export const reportValidationError = (field: string, message: string) => {
    errorHandler.handleError({
        type: ErrorType.VALIDATION,
        severity: ErrorSeverity.LOW,
        message: `Validation error in ${field}: ${message}`,
        details: { field, validationMessage: message },
        timestamp: new Date(),
        url: window.location.href
    })
}

export const reportAuthError = (message: string) => {
    errorHandler.handleError({
        type: ErrorType.AUTHENTICATION,
        severity: ErrorSeverity.MEDIUM,
        message,
        timestamp: new Date(),
        url: window.location.href
    })
}
