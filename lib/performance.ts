// Performance monitoring utilities

export class PerformanceMonitor {
    private static instance: PerformanceMonitor
    private metrics: Map<string, number> = new Map()

    static getInstance(): PerformanceMonitor {
        if (!PerformanceMonitor.instance) {
            PerformanceMonitor.instance = new PerformanceMonitor()
        }
        return PerformanceMonitor.instance
    }

    startTiming(name: string): void {
        this.metrics.set(name, performance.now())
    }

    endTiming(name: string): number {
        const startTime = this.metrics.get(name)
        if (!startTime) {
            console.warn(`No start time found for metric: ${name}`)
            return 0
        }

        const duration = performance.now() - startTime
        this.metrics.delete(name)

        // Log performance metrics in development
        if (process.env.NODE_ENV === 'development') {
            console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`)
        }

        return duration
    }

    measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
        this.startTiming(name)
        return fn().finally(() => {
            this.endTiming(name)
        })
    }

    measureSync<T>(name: string, fn: () => T): T {
        this.startTiming(name)
        const result = fn()
        this.endTiming(name)
        return result
    }
}

// Web Vitals monitoring
export function reportWebVitals(metric: { name: string; value: number; delta: number; id: string }) {
    if (process.env.NODE_ENV === 'development') {
        console.log('Web Vitals:', metric)
    }

    // Send to analytics service in production
    if (process.env.NODE_ENV === 'production') {
        // Example: Send to Google Analytics, Mixpanel, etc.
        // gtag('event', metric.name, {
        //   value: Math.round(metric.value),
        //   event_category: 'Web Vitals'
        // })
    }
}

// Memory usage monitoring
export function getMemoryUsage() {
    if ('memory' in performance) {
        const memory = (performance as Performance & { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory
        return {
            used: Math.round(memory.usedJSHeapSize / 1048576), // MB
            total: Math.round(memory.totalJSHeapSize / 1048576), // MB
            limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
        }
    }
    return null
}

// Network monitoring
export function getNetworkInfo() {
    if ('connection' in navigator) {
        const connection = (navigator as Navigator & { connection?: { effectiveType: string; downlink: number; rtt: number } }).connection
        return {
            effectiveType: connection.effectiveType,
            downlink: connection.downlink,
            rtt: connection.rtt,
            saveData: connection.saveData
        }
    }
    return null
}

// Bundle size monitoring
export function logBundleSize() {
    if (process.env.NODE_ENV === 'development') {
        const scripts = document.querySelectorAll('script[src]')
        let totalSize = 0

        scripts.forEach(script => {
            const src = script.getAttribute('src')
            if (src && src.includes('_next/static')) {
                // This is a simplified example - in reality you'd need to fetch and measure
                console.log('Script loaded:', src)
            }
        })
    }
}
