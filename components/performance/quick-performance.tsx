'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Zap, 
  Activity, 
  Wifi, 
  Battery,
  Cpu,
  HardDrive,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

interface QuickPerformanceProps {
  className?: string
}

export function QuickPerformance({ className }: QuickPerformanceProps) {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    memoryUsage: 0,
    networkSpeed: 'unknown',
    batteryLevel: 0,
    performanceScore: 0
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isOptimized, setIsOptimized] = useState(false)

  useEffect(() => {
    const measurePerformance = () => {
      // Measure load time
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const loadTime = navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0

      // Get memory usage
      const memory = (performance as any).memory
      const memoryUsage = memory ? Math.round(memory.usedJSHeapSize / 1024 / 1024) : 0

      // Get network speed
      const connection = (navigator as any).connection
      const networkSpeed = connection ? connection.effectiveType || 'unknown' : 'unknown'

      // Get battery level
      const getBatteryLevel = async () => {
        if ('getBattery' in navigator) {
          try {
            const battery = await (navigator as any).getBattery()
            return Math.round(battery.level * 100)
          } catch {
            return 0
          }
        }
        return 0
      }

      getBatteryLevel().then(batteryLevel => {
        // Calculate performance score
        let score = 100
        if (loadTime > 2000) score -= 20
        if (loadTime > 3000) score -= 30
        if (memoryUsage > 100) score -= 15
        if (memoryUsage > 200) score -= 25
        if (networkSpeed === 'slow-2g' || networkSpeed === '2g') score -= 20
        if (batteryLevel < 20) score -= 10

        setMetrics({
          loadTime,
          memoryUsage,
          networkSpeed,
          batteryLevel,
          performanceScore: Math.max(0, score)
        })
      })
    }

    measurePerformance()
    const interval = setInterval(measurePerformance, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const getPerformanceColor = (score: number): string => {
    if (score >= 80) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20'
    if (score >= 40) return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/20'
    return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20'
  }

  const getPerformanceIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="h-4 w-4" />
    if (score >= 60) return <Activity className="h-4 w-4" />
    return <TrendingDown className="h-4 w-4" />
  }

  const optimizePerformance = () => {
    // Clear caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name)
        })
      })
    }

    // Clear unused memory (if available)
    if ('memory' in performance) {
      // Force garbage collection if available
      if ('gc' in window) {
        (window as any).gc()
      }
    }

    setIsOptimized(true)
    setTimeout(() => setIsOptimized(false), 3000)
  }

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        variant="outline"
        size="sm"
        className={cn(
          'fixed bottom-20 right-4 z-50',
          metrics.performanceScore < 60 && 'animate-pulse',
          className
        )}
      >
        <Zap className="h-4 w-4 mr-2" />
        ביצועים
        <Badge className={cn('ml-2', getPerformanceColor(metrics.performanceScore))}>
          {metrics.performanceScore}
        </Badge>
      </Button>
    )
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 w-64">
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Zap className="h-4 w-4" />
            ביצועים מהירים
          </h3>
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
          >
            ×
          </Button>
        </div>

        {/* Performance Score */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium">ציון ביצועים</span>
            <Badge className={getPerformanceColor(metrics.performanceScore)}>
              {getPerformanceIcon(metrics.performanceScore)}
              {metrics.performanceScore}
            </Badge>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={cn(
                'h-2 rounded-full transition-all duration-500',
                metrics.performanceScore >= 80 ? 'bg-green-500' :
                metrics.performanceScore >= 60 ? 'bg-yellow-500' :
                metrics.performanceScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
              )}
              style={{ width: `${metrics.performanceScore}%` }}
            />
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              <span>זמן טעינה</span>
            </div>
            <span className="font-medium">{Math.round(metrics.loadTime)}ms</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <HardDrive className="h-3 w-3" />
              <span>זיכרון</span>
            </div>
            <span className="font-medium">{metrics.memoryUsage}MB</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Wifi className="h-3 w-3" />
              <span>רשת</span>
            </div>
            <span className="font-medium">{metrics.networkSpeed}</span>
          </div>

          {metrics.batteryLevel > 0 && (
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <Battery className="h-3 w-3" />
                <span>סוללה</span>
              </div>
              <span className="font-medium">{metrics.batteryLevel}%</span>
            </div>
          )}
        </div>

        {/* Optimize Button */}
        <Button
          onClick={optimizePerformance}
          variant="outline"
          size="sm"
          className="w-full"
          disabled={isOptimized}
        >
          {isOptimized ? (
            <>
              <Cpu className="h-4 w-4 mr-2 animate-spin" />
              מאופטם!
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              אופטימיזציה
            </>
          )}
        </Button>

        {/* Status */}
        <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          {metrics.performanceScore >= 80 ? 'ביצועים מעולים' :
           metrics.performanceScore >= 60 ? 'ביצועים טובים' :
           metrics.performanceScore >= 40 ? 'ביצועים בינוניים' : 'נדרשת אופטימיזציה'}
        </div>
      </div>
    </div>
  )
}
