"use client"

import { AccessibilityButton } from '@/components/accessibility/accessibility-button'
import { AdvancedPerformanceMonitor } from '@/components/performance/advanced-performance-monitor'
import { ErrorMonitor, ErrorBoundary } from '@/components/error/error-monitor'
import { QuickPerformance } from '@/components/performance/quick-performance'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
      <AccessibilityButton />
      <AdvancedPerformanceMonitor />
      <ErrorMonitor />
      <QuickPerformance />
    </>
  )
}
