'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { useLanguage } from '@/components/providers'
import { 
  Activity, 
  Zap, 
  Clock, 
  HardDrive, 
  Wifi, 
  Battery,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react'

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  memoryUsage: number
  networkSpeed: string
  deviceType: 'mobile' | 'tablet' | 'desktop'
  batteryLevel?: number
  connectionType: string
}

export function PerformanceMonitor() {
  const { t } = useLanguage()
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const loadTime = navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0
      
      // Measure render time
      const renderStart = performance.now()
      const renderTime = performance.now() - renderStart

      // Get memory usage (if available)
      const memory = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory
      const memoryUsage = memory ? Math.round(memory.usedJSHeapSize / 1024 / 1024) : 0

      // Detect device type
      const userAgent = navigator.userAgent
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      const isTablet = /iPad|Android(?=.*Tablet)/i.test(userAgent)
      const deviceType = isMobile ? (isTablet ? 'tablet' : 'mobile') : 'desktop'

      // Get connection info
      const connection = (navigator as unknown as {
        connection?: { effectiveType?: string; type?: string }
        mozConnection?: { effectiveType?: string; type?: string }
        webkitConnection?: { effectiveType?: string; type?: string }
      }).connection ||
      (navigator as unknown as { mozConnection?: { effectiveType?: string; type?: string } }).mozConnection ||
      (navigator as unknown as { webkitConnection?: { effectiveType?: string; type?: string } }).webkitConnection
      const networkSpeed = connection ? connection.effectiveType || 'unknown' : 'unknown'
      const connectionType = connection ? connection.type || 'unknown' : 'unknown'

      // Get battery info (if available)
      const getBatteryLevel = async () => {
        if ('getBattery' in navigator) {
          try {
            const battery = await (navigator as unknown as { getBattery: () => Promise<{ level: number }> }).getBattery()
            return Math.round(battery.level * 100)
          } catch {
            return undefined
          }
        }
        return undefined
      }

      getBatteryLevel().then(batteryLevel => {
        setMetrics({
          loadTime,
          renderTime,
          memoryUsage,
          networkSpeed,
          deviceType,
          batteryLevel,
          connectionType
        })
      })
    }

    // Measure performance after page load
    if (document.readyState === 'complete') {
      measurePerformance()
    } else {
      window.addEventListener('load', measurePerformance)
    }

    return () => {
      window.removeEventListener('load', measurePerformance)
    }
  }, [])

  const getPerformanceGrade = (loadTime: number) => {
    if (loadTime < 1000) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' }
    if (loadTime < 2000) return { grade: 'B', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (loadTime < 3000) return { grade: 'C', color: 'text-orange-600', bg: 'bg-orange-100' }
    return { grade: 'D', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile': return <Smartphone className="h-5 w-5" />
      case 'tablet': return <Tablet className="h-5 w-5" />
      default: return <Monitor className="h-5 w-5" />
    }
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

    // Clear localStorage (optional)
    // localStorage.clear()

    // Reload page
    window.location.reload()
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          className="rounded-full w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
          aria-label="פתח מוניטור ביצועים"
          title="מוניטור ביצועים"
        >
          <Activity className="h-5 w-5" />
        </Button>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-80">
          <CardContent className="p-4">
            <div className="text-center">
              <Activity className="h-8 w-8 mx-auto mb-2 animate-pulse" />
              <p>מדידת ביצועים...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const performanceGrade = getPerformanceGrade(metrics.loadTime)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 max-h-96 overflow-y-auto">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5" />
              מוניטור ביצועים
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Performance Grade */}
          <div className={`p-3 rounded-lg ${performanceGrade.bg}`}>
            <div className="flex items-center justify-between">
              <span className="font-medium">ציון ביצועים</span>
              <span className={`text-2xl font-bold ${performanceGrade.color}`}>
                {performanceGrade.grade}
              </span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <Clock className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">זמן טעינה</div>
                <div className="text-sm font-medium">{metrics.loadTime.toFixed(0)}ms</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <Zap className="h-4 w-4 text-yellow-600" />
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">זמן רינדור</div>
                <div className="text-sm font-medium">{metrics.renderTime.toFixed(0)}ms</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <HardDrive className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">זיכרון</div>
                <div className="text-sm font-medium">{metrics.memoryUsage}MB</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <Wifi className="h-4 w-4 text-purple-600" />
              <div>
                <div className="text-xs text-gray-600 dark:text-gray-400">רשת</div>
                <div className="text-sm font-medium">{metrics.networkSpeed}</div>
              </div>
            </div>
          </div>

          {/* Device Info */}
          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
            {getDeviceIcon(metrics.deviceType)}
            <div className="flex-1">
              <div className="text-xs text-gray-600 dark:text-gray-400">מכשיר</div>
              <div className="text-sm font-medium">
                {metrics.deviceType === 'mobile' ? 'נייד' : 
                 metrics.deviceType === 'tablet' ? 'טאבלט' : 'מחשב'}
              </div>
            </div>
            {metrics.batteryLevel && (
              <div className="flex items-center gap-1">
                <Battery className="h-4 w-4" />
                <span className="text-sm">{metrics.batteryLevel}%</span>
              </div>
            )}
          </div>

          {/* Connection Type */}
          <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
            סוג חיבור: {metrics.connectionType}
          </div>

          {/* Optimization Button */}
          <Button
            onClick={optimizePerformance}
            className="w-full"
            variant="outline"
            size="sm"
          >
            <Zap className="h-4 w-4 mr-2" />
            אופטימיזציה מהירה
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

