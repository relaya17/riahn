'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { LoadingPage } from '@/components/ui/loading'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return <LoadingPage message="טוען את הדשבורד..." />
  }

  if (!user) {
    return <LoadingPage message="מעביר לעמוד הכניסה..." />
  }

  return <DashboardLayout />
}
