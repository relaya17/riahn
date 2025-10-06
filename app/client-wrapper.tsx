'use client'

import { ClientProviders } from '@/components/providers/client-providers'
import DevTools from '@/components/dev-tools'
import { Toaster } from 'react-hot-toast'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientProviders>
        {children}
      </ClientProviders>
      <DevTools />
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
