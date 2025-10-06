'use client'

import { AccessibilityButton } from '@/components/accessibility/accessibility-button'
import AdvancedPerformanceMonitor from '@/components/performance/advanced-performance-monitor'
import ErrorMonitor from '@/components/error/error-monitor'
import QuickPerformance from '@/components/performance/quick-performance'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AccessibilityButton />
    </>
  )
}

export function DashboardProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AdvancedPerformanceMonitor />
      <ErrorMonitor />
      <QuickPerformance />
    </>
  )
}

// LayoutProviders - currently unused, but kept for future layout-specific needs
// You can customize this when you need different providers for specific layouts
