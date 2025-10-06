'use client'

import AdvancedPerformanceMonitor from '@/components/performance/advanced-performance-monitor'
import ErrorMonitor from '@/components/error/error-monitor'
import QuickPerformance from '@/components/performance/quick-performance'

export default function DevTools() {
  const showDevTools = process.env.NEXT_PUBLIC_DEV_TOOLS === 'true'

  if (!showDevTools) return null

  return (
    <>
      <AdvancedPerformanceMonitor />
      <ErrorMonitor />
      <QuickPerformance />
    </>
  )
}
