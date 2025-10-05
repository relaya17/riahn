'use client'

import { useState, useEffect } from 'react'
import { useAuth, useLanguage } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  Menu,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Globe,
  Moon,
  Sun,
  ChevronDown,
} from 'lucide-react'
import { DashboardPage } from './dashboard-layout'
import { getInitials, getLanguageInfo } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { NotificationCenter } from '@/components/notifications/notification-center'
import { AdvancedSearch } from '@/components/search/advanced-search'

interface HeaderProps {
  onMenuClick: () => void
  currentPage: DashboardPage
}

export function Header({ onMenuClick, currentPage }: HeaderProps) {
  const { user, signOut } = useAuth()
  const { t, currentLanguage, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const languages = [
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
    { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  ]

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0]

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode)
    localStorage.setItem('language', languageCode)
    setShowLanguageMenu(false)
  }

  const getPageTitle = () => {
    switch (currentPage) {
      case 'home':
        return t('dashboard.home')
      case 'lessons':
        return t('dashboard.lessons')
      case 'connect':
        return t('dashboard.connect')
      case 'forums':
        return t('dashboard.forums')
      case 'profile':
        return t('dashboard.profile')
      case 'settings':
        return t('dashboard.settings')
      default:
        return t('dashboard.home')
    }
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {getPageTitle()}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('dashboard.welcome')}, {user?.name}
              </p>
            </div>
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('dashboard.search')}
                className="pr-10 cursor-pointer"
                onClick={() => setShowSearch(true)}
                readOnly
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="h-9 w-9"
              >
                <span className="text-lg">{currentLang.flag}</span>
              </Button>

              {showLanguageMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="py-2">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`w-full px-4 py-2 text-right hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 space-x-reverse ${
                          currentLanguage === language.code
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span>{language.name}</span>
                        {currentLanguage === language.code && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const newTheme = theme === 'dark' ? 'light' : 'dark'
                  console.log('Changing theme from', theme, 'to', newTheme)
                  setTheme(newTheme)
                }}
                className="h-9 w-9"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}

            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 relative"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 space-x-reverse h-9 px-2"
              >
                <div className="h-7 w-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : (
                    getInitials(user?.name || 'U')
                  )}
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>

              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user?.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          getInitials(user?.name || 'U')
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user?.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-right hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 space-x-reverse text-gray-700 dark:text-gray-300">
                      <User className="h-4 w-4" />
                      <span>פרופיל</span>
                    </button>
                    <button className="w-full px-4 py-2 text-right hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 space-x-reverse text-gray-700 dark:text-gray-300">
                      <Settings className="h-4 w-4" />
                      <span>הגדרות</span>
                    </button>
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-right hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3 space-x-reverse text-red-600 dark:text-red-400"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>יציאה</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t('dashboard.search')}
              className="pr-10 cursor-pointer"
              onClick={() => setShowSearch(true)}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Notification Center */}
      <NotificationCenter 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* Advanced Search */}
      <AdvancedSearch 
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        onResultClick={(result) => {
          console.log('Search result clicked:', result)
          setShowSearch(false)
        }}
      />
    </header>
  )
}
