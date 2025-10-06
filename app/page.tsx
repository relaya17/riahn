'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers'
import { LoadingPage } from '@/components/core/loading'

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    } else if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  if (loading) {
    return <LoadingPage message="Loading application..." />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white animate-fade-in mb-4">
          LanguageConnect
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Connecting Languages and Cultures
        </p>
      </div>
    </div>
  )
}

