'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useLanguage } from '@/components/providers'
import { LoadingPage } from '@/components/ui/loading'
import { AuthScreen } from '@/components/auth/auth-screen'

export default function HomePage() {
  const { user, loading } = useAuth()
  const { setLanguage } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    // Set default language based on browser or user preference
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0]
      const supportedLanguages = ['he', 'ar', 'en', 'si', 'ta']
      if (supportedLanguages.includes(browserLang)) {
        setLanguage(browserLang)
      } else {
        setLanguage('he') // Default to Hebrew
      }
    }
  }, [setLanguage])

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return <LoadingPage message="טוען את האפליקציה..." />
  }

  if (user) {
    return <LoadingPage message="מעביר לדשבורד..." />
  }

  return <AuthScreen />
}
