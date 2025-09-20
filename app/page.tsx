'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers'
import { LoadingPage } from '@/components/ui/loading'
import { AuthScreen } from '@/components/auth/auth-screen'

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

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
