import type { Metadata } from 'next'
import { Inter, Heebo, Cairo } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import Footer from '@/components/core/footer'
import ClientWrapper from './client-wrapper'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const heebo = Heebo({ subsets: ['hebrew'], variable: '--font-heebo', display: 'swap' })
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo', display: 'swap' })

export const metadata: Metadata = {
  title: 'LanguageConnect - Connecting Languages and Cultures',
  description: 'Advanced language learning platform with AI-powered translation and cultural understanding',
  keywords: ['language learning', 'translation', 'AI', 'cultural exchange', 'multilingual'],
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
  themeColor: '#10b981',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${heebo.variable} ${cairo.variable} min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800`}
      >
        <Providers>
          <ClientWrapper>
            {children}
          </ClientWrapper>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
