'use client'

import { AccessibilityButton } from '@/components/accessibility/accessibility-button'

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
    </>
  )
}

// LayoutProviders - currently unused, but kept for future layout-specific needs
// You can customize this when you need different providers for specific layouts
