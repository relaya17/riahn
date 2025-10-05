'use client'

import { useState } from 'react'
import { useAuth, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Home,
  BookOpen,
  Users,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Globe,
  TrendingUp,
  Award,
  Clock,
  MessageCircle,
  Star,
} from 'lucide-react'
import { DashboardPage } from './dashboard-layout'
import { getInitials, getLanguageInfo } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  currentPage: DashboardPage
  onPageChange: (page: DashboardPage) => void
}

const navigationItems = [
  {
    id: 'home' as DashboardPage,
    label: 'dashboard.home',
    icon: Home,
    badge: null,
  },
  {
    id: 'lessons' as DashboardPage,
    label: 'dashboard.lessons',
    icon: BookOpen,
    badge: null,
  },
  {
    id: 'connect' as DashboardPage,
    label: 'dashboard.connect',
    icon: Users,
    badge: null,
  },
      {
        id: 'learning-chat' as DashboardPage,
        label: 'dashboard.learningChat',
        icon: MessageCircle,
        badge: 'NEW',
      },
      {
        id: 'features' as DashboardPage,
        label: 'dashboard.features',
        icon: Star,
        badge: 'HOT',
      },
  {
    id: 'forums' as DashboardPage,
    label: 'dashboard.forums',
    icon: MessageSquare,
    badge: null,
  },
  {
    id: 'profile' as DashboardPage,
    label: 'dashboard.profile',
    icon: User,
    badge: null,
  },
  {
    id: 'settings' as DashboardPage,
    label: 'dashboard.settings',
    icon: Settings,
    badge: null,
  },
]

export function Sidebar({ isOpen, onClose, currentPage, onPageChange }: SidebarProps) {
  const { user, signOut } = useAuth()
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const sidebarWidth = isCollapsed ? 'w-16' : 'w-64'

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white dark:bg-gray-800 shadow-lg z-50 transition-all duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:translate-x-0 ${sidebarWidth} border-l border-gray-200 dark:border-gray-700`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {!isCollapsed && (
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  LanguageConnect
                </span>
              </div>
            )}
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex h-8 w-8"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* User Profile */}
          {!isCollapsed && user && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        getInitials(user.name)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {getLanguageInfo(user.nativeLanguage).name}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id

              return (
                <Button
                  key={item.id}
                  variant={isActive ? 'default' : 'ghost'}
                  className={`w-full justify-start space-x-3 space-x-reverse ${
                    isCollapsed ? 'px-2' : 'px-3'
                  }`}
                  onClick={() => {
                    onPageChange(item.id)
                    onClose()
                  }}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-right">{t(item.label)}</span>
                      {item.badge && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Button>
              )
            })}
          </nav>

          {/* Quick Stats */}
          {!isCollapsed && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-400">התקדמות</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">75%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-600 dark:text-gray-400">הישגים</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">12</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-gray-600 dark:text-gray-400">רצף ימים</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">7</span>
                </div>
              </div>
            </div>
          )}

          {/* Sign Out */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="ghost"
              className={`w-full justify-start space-x-3 space-x-reverse text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 ${
                isCollapsed ? 'px-2' : 'px-3'
              }`}
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>יציאה</span>}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
