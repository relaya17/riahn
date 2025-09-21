import type { Metadata } from 'next'
import { Inter, Heebo, Cairo } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'react-hot-toast'
import { AccessibilityButton } from '@/components/accessibility/accessibility-button'
import { AdvancedPerformanceMonitor } from '@/components/performance/advanced-performance-monitor'
import { ErrorMonitor, ErrorBoundary } from '@/components/error/error-monitor'
import { QuickPerformance } from '@/components/performance/quick-performance'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const heebo = Heebo({ 
  subsets: ['hebrew'],
  variable: '--font-heebo',
  display: 'swap',
})

const cairo = Cairo({ 
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LanguageConnect - חיבור בין שפות ותרבויות',
  description: 'אפליקציה ללימוד שפות וחיבור בין משתמשים מכל העולם',
  keywords: ['שפות', 'לימוד', 'תרגום', 'חיבור', 'תרבות'],
  authors: [{ name: 'LanguageConnect Team' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/sary.jpg',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#10b981'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${heebo.variable} ${cairo.variable} min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800`}>
        <ErrorBoundary>
          <Providers>
            {children}
            <AccessibilityButton />
            <AdvancedPerformanceMonitor />
            <ErrorMonitor />
            <QuickPerformance />
          </Providers>
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
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </ErrorBoundary>
      </body>
    </html>
  )
}
