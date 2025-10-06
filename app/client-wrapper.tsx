'use client'

import { ClientProviders } from '@/components/providers/client-providers'
import AdvancedPerformanceMonitor from '@/components/performance/advanced-performance-monitor'
import ErrorMonitor from '@/components/error/error-monitor'
import QuickPerformance from '@/components/performance/quick-performance'
import { Toaster } from 'react-hot-toast'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientProviders>
        {children}
      </ClientProviders>
      <AdvancedPerformanceMonitor />
      <ErrorMonitor />
      <QuickPerformance />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px',
            padding: '12px 16px',
          },
          success: {
            iconTheme: { primary: '#22c55e', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
    </>
  )
}
