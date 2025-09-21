import React, { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Activity, 
  Zap, 
  Clock, 
  Database, 
  Wifi, 
  Cpu, 
  HardDrive,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  RefreshCw
} from 'lucide-react'

interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  fcp: number | null // First Contentful Paint
  ttfb: number | null // Time to First Byte
  
  // Additional metrics
  memoryUsage: number | null
  networkSpeed: number | null
  cpuUsage: number | null
  renderTime: number | null
  
  // Custom metrics
  componentRenderTime: Record<string, number>
  apiResponseTime: Record<string, number>
  imageLoadTime: Record<string, number>
}

interface PerformanceThresholds {
  lcp: { good: 2500, needsImprovement: 4000 }
  fid: { good: 100, needsImprovement: 300 }
  cls: { good: 0.1, needsImprovement: 0.25 }
  fcp: { good: 1800, needsImprovement: 3000 }
  ttfb: { good: 800, needsImprovement: 1800 }
}

const thresholds: PerformanceThresholds = {
  lcp: { good: 2500, needsImprovement: 4000 },
  fid: { good: 100, needsImprovement: 300 },
  cls: { good: 0.1, needsImprovement: 0.25 },
  fcp: { good: 1800, needsImprovement: 3000 },
  ttfb: { good: 800, needsImprovement: 1800 }
}

export function AdvancedPerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    memoryUsage: null,
    networkSpeed: null,
    cpuUsage: null,
    renderTime: null,
    componentRenderTime: {},
    apiResponseTime: {},
    imageLoadTime: {}
  })
  
  const [isVisible, setIsVisible] = useState(false)
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [alerts, setAlerts] = useState<string[]>([])

  // Get performance rating
  const getPerformanceRating = (value: number | null, metric: keyof PerformanceThresholds): 'good' | 'needs-improvement' | 'poor' => {
    if (value === null) return 'poor'
    const threshold = thresholds[metric]
    if (value <= threshold.good) return 'good'
    if (value <= threshold.needsImprovement) return 'needs-improvement'
    return 'poor'
  }

  // Get rating color
  const getRatingColor = (rating: 'good' | 'needs-improvement' | 'poor'): string => {
    switch (rating) {
      case 'good': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20'
      case 'poor': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20'
    }
  }

  // Get rating icon
  const getRatingIcon = (rating: 'good' | 'needs-improvement' | 'poor') => {
    switch (rating) {
      case 'good': return <CheckCircle className="h-4 w-4" />
      case 'needs-improvement': return <AlertTriangle className="h-4 w-4" />
      case 'poor': return <AlertTriangle className="h-4 w-4" />
    }
  }

  // Measure Core Web Vitals
  const measureCoreWebVitals = useCallback(() => {
    if (typeof window === 'undefined') return

    // LCP - Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { size: number }
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // FID - First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }))
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // CLS - Cumulative Layout Shift
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            setMetrics(prev => ({ ...prev, cls: clsValue }))
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // FCP - First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }))
          }
        })
      })
      fcpObserver.observe({ entryTypes: ['paint'] })
    }

    // TTFB - Time to First Byte
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigation) {
      setMetrics(prev => ({ ...prev, ttfb: navigation.responseStart - navigation.requestStart }))
    }
  }, [])

  // Measure memory usage
  const measureMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      const usedMB = Math.round(memory.usedJSHeapSize / 1048576)
      setMetrics(prev => ({ ...prev, memoryUsage: usedMB }))
    }
  }, [])

  // Measure network speed
  const measureNetworkSpeed = useCallback(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      const speed = connection.downlink || 0
      setMetrics(prev => ({ ...prev, networkSpeed: speed }))
    }
  }, [])

  // Start monitoring
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true)
    measureCoreWebVitals()
    measureMemoryUsage()
    measureNetworkSpeed()
    
    // Monitor component render times
    const startTime = performance.now()
    setMetrics(prev => ({ ...prev, renderTime: startTime }))
  }, [measureCoreWebVitals, measureMemoryUsage, measureNetworkSpeed])

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false)
  }, [])

  // Reset metrics
  const resetMetrics = useCallback(() => {
    setMetrics({
      lcp: null,
      fid: null,
      cls: null,
      fcp: null,
      ttfb: null,
      memoryUsage: null,
      networkSpeed: null,
      cpuUsage: null,
      renderTime: null,
      componentRenderTime: {},
      apiResponseTime: {},
      imageLoadTime: {}
    })
    setAlerts([])
  }, [])

  // Generate performance alerts
  useEffect(() => {
    const newAlerts: string[] = []
    
    if (metrics.lcp && metrics.lcp > thresholds.lcp.needsImprovement) {
      newAlerts.push(`LCP גבוה: ${Math.round(metrics.lcp)}ms`)
    }
    if (metrics.fid && metrics.fid > thresholds.fid.needsImprovement) {
      newAlerts.push(`FID גבוה: ${Math.round(metrics.fid)}ms`)
    }
    if (metrics.cls && metrics.cls > thresholds.cls.needsImprovement) {
      newAlerts.push(`CLS גבוה: ${metrics.cls.toFixed(3)}`)
    }
    if (metrics.memoryUsage && metrics.memoryUsage > 100) {
      newAlerts.push(`שימוש גבוה בזיכרון: ${metrics.memoryUsage}MB`)
    }
    
    setAlerts(newAlerts)
  }, [metrics])

  // Auto-start monitoring on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      startMonitoring()
    }
  }, [startMonitoring])

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 left-4 z-50"
      >
        <Activity className="h-4 w-4 mr-2" />
        ביצועים
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80 max-h-96 overflow-y-auto">
      <Card className="shadow-lg border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5" />
              ניטור ביצועים
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                onClick={isMonitoring ? stopMonitoring : startMonitoring}
                variant="outline"
                size="sm"
                className={cn(
                  isMonitoring ? 'text-red-600' : 'text-green-600'
                )}
              >
                {isMonitoring ? 'עצור' : 'התחל'}
              </Button>
              <Button
                onClick={resetMetrics}
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
          {/* Alerts */}
          {alerts.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                התראות
              </h4>
              {alerts.map((alert, index) => (
                <div key={index} className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                  {alert}
                </div>
              ))}
            </div>
          )}

          {/* Core Web Vitals */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-1">
              <Zap className="h-4 w-4" />
              Core Web Vitals
            </h4>
            
            <div className="grid grid-cols-1 gap-2">
              {[
                { key: 'lcp', label: 'LCP', value: metrics.lcp, unit: 'ms' },
                { key: 'fid', label: 'FID', value: metrics.fid, unit: 'ms' },
                { key: 'cls', label: 'CLS', value: metrics.cls, unit: '' },
                { key: 'fcp', label: 'FCP', value: metrics.fcp, unit: 'ms' },
                { key: 'ttfb', label: 'TTFB', value: metrics.ttfb, unit: 'ms' }
              ].map(({ key, label, value, unit }) => {
                const rating = getPerformanceRating(value, key as keyof PerformanceThresholds)
                return (
                  <div key={key} className="flex items-center justify-between text-xs">
                    <span className="font-medium">{label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        {value ? `${Math.round(value)}${unit}` : 'N/A'}
                      </span>
                      <Badge className={cn('text-xs', getRatingColor(rating))}>
                        {getRatingIcon(rating)}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* System Metrics */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-1">
              <Cpu className="h-4 w-4" />
              מדדי מערכת
            </h4>
            
            <div className="grid grid-cols-1 gap-2">
              {[
                { key: 'memory', label: 'זיכרון', value: metrics.memoryUsage, unit: 'MB', icon: Database },
                { key: 'network', label: 'רשת', value: metrics.networkSpeed, unit: 'Mbps', icon: Wifi },
                { key: 'render', label: 'זמן רינדור', value: metrics.renderTime, unit: 'ms', icon: Clock }
              ].map(({ key, label, value, unit, icon: Icon }) => (
                <div key={key} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Icon className="h-3 w-3" />
                    <span className="font-medium">{label}</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {value ? `${Math.round(value)}${unit}` : 'N/A'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Score */}
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">ציון ביצועים</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-blue-600">
                  {(() => {
                    const scores = [
                      getPerformanceRating(metrics.lcp, 'lcp'),
                      getPerformanceRating(metrics.fid, 'fid'),
                      getPerformanceRating(metrics.cls, 'cls')
                    ].filter(score => score !== 'poor')
                    
                    const goodCount = scores.filter(score => score === 'good').length
                    return Math.round((goodCount / 3) * 100)
                  })()}
                </span>
                <span className="text-xs text-gray-500">/100</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Hook for measuring component performance
export function usePerformanceMonitor(componentName: string) {
  const [renderTime, setRenderTime] = useState<number | null>(null)

  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const duration = endTime - startTime
      setRenderTime(duration)
      
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`Component ${componentName} render time: ${duration.toFixed(2)}ms`)
      }
    }
  }, [componentName])

  return renderTime
}

// Hook for measuring API response times
export function useApiPerformanceMonitor() {
  const [apiTimes, setApiTimes] = useState<Record<string, number>>({})

  const measureApiCall = useCallback(async <T,>(
    apiCall: () => Promise<T>,
    endpoint: string
  ): Promise<T> => {
    const startTime = performance.now()
    
    try {
      const result = await apiCall()
      const endTime = performance.now()
      const duration = endTime - startTime
      
      setApiTimes(prev => ({
        ...prev,
        [endpoint]: duration
      }))
      
      return result
    } catch (error) {
      const endTime = performance.now()
      const duration = endTime - startTime
      
      setApiTimes(prev => ({
        ...prev,
        [endpoint]: duration
      }))
      
      throw error
    }
  }, [])

  return { apiTimes, measureApiCall }
}
