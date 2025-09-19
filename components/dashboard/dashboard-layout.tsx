'use client'

import { useState } from 'react'
import { useAuth, useLanguage } from '@/components/providers'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { DashboardHome } from './dashboard-home'
import { LessonsPage } from './lessons-page'
import { GlobalConnectPage } from './global-connect-page'
import LearningChatPage from '@/app/learning-chat/page'
import { ForumsPage } from './forums-page'
import { ProfilePage } from './profile-page'
import { SettingsPage } from './settings-page'
import FeaturesPage from '@/app/features/page'

export type DashboardPage = 'home' | 'lessons' | 'connect' | 'learning-chat' | 'features' | 'forums' | 'profile' | 'settings'

export function DashboardLayout() {
  const [currentPage, setCurrentPage] = useState<DashboardPage>('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()
  const { isRTL } = useLanguage()

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <DashboardHome />
      case 'lessons':
        return <LessonsPage />
      case 'connect':
        return <GlobalConnectPage />
          case 'learning-chat':
            return <LearningChatPage />
          case 'features':
            return <FeaturesPage />
          case 'forums':
            return <ForumsPage />
      case 'profile':
        return <ProfilePage />
      case 'settings':
        return <SettingsPage />
      default:
        return <DashboardHome />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:mr-64' : 'lg:mr-16'}`}>
        {/* Header */}
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          currentPage={currentPage}
        />

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
