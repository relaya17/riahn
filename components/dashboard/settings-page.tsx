'use client'

import React, { useState } from 'react'
import { useAuth, useLanguage } from '@/components/providers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { LoadingSpinner } from '@/components/ui/loading'
import {
  Settings,
  User,
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  Monitor,
  Eye,
  EyeOff,
  Save,
  Key,
  Mail,
  Trash2,
  Download,
  Upload,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { getLanguageInfo } from '@/lib/utils'

export function SettingsPage() {
  const { user } = useAuth()
  const { t, currentLanguage, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('general')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [settings, setSettings] = useState({
    // General Settings
    language: currentLanguage,
    theme: theme,
    timezone: 'Asia/Jerusalem',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    lessonReminders: true,
    messageNotifications: true,
    forumNotifications: true,
    achievementNotifications: true,
    
    // Privacy Settings
    showOnlineStatus: true,
    allowMessages: true,
    showProgress: true,
    showProfile: true,
    
    // Security Settings
    twoFactorAuth: false,
    loginAlerts: true,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const languages = [
    { value: 'he', label: 'עברית' },
    { value: 'ar', label: 'العربية' },
    { value: 'en', label: 'English' },
    { value: 'si', label: 'සිංහල' },
    { value: 'ta', label: 'தமிழ்' },
    { value: 'fr', label: 'Français' },
    { value: 'es', label: 'Español' },
    { value: 'de', label: 'Deutsch' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' },
    { value: 'ru', label: 'Русский' },
    { value: 'zh', label: '中文' },
    { value: 'ja', label: '日本語' },
    { value: 'ko', label: '한국어' },
    { value: 'hi', label: 'हिन्दी' },
  ]

  const themes = [
    { value: 'light', label: 'בהיר', icon: Sun },
    { value: 'dark', label: 'כהה', icon: Moon },
    { value: 'system', label: 'מערכת', icon: Monitor },
  ]

  const timezones = [
    { value: 'Asia/Jerusalem', label: 'ירושלים (UTC+2)' },
    { value: 'Asia/Dubai', label: 'דובאי (UTC+4)' },
    { value: 'Europe/London', label: 'לונדון (UTC+0)' },
    { value: 'America/New_York', label: 'ניו יורק (UTC-5)' },
  ]

  const tabs = [
    { id: 'general', label: 'כללי', icon: Settings },
    { id: 'notifications', label: 'התראות', icon: Bell },
    { id: 'privacy', label: 'פרטיות', icon: Eye },
    { id: 'security', label: 'אבטחה', icon: Shield },
    { id: 'account', label: 'חשבון', icon: User },
  ]

  const handleSettingChange = (key: string, value: unknown) => {
    setSettings({ ...settings, [key]: value })
    
    // Apply changes immediately for certain settings
    if (key === 'language') {
      setLanguage(value as string)
      localStorage.setItem('language', String(value))
    }
    if (key === 'theme') {
      setTheme(value as string)
    }
  }

  const handleSaveSettings = () => {
    // Here you would save the settings to the server
    console.log('Saving settings:', settings)
    // Show success message
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      // Show error message
      return
    }
    
    // Here you would change the password
    console.log('Changing password')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    // Show success message
  }

  const handleDeleteAccount = () => {
    // Show confirmation dialog
    if (confirm('האם אתה בטוח שברצונך למחוק את החשבון? פעולה זו לא ניתנת לביטול.')) {
      // Delete account
      console.log('Deleting account')
    }
  }

  const handleExportData = () => {
    // Export user data
    console.log('Exporting data')
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('settings.language')}
              </label>
              <Select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                options={languages}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('settings.theme')}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {themes.map((themeOption) => {
                  const Icon = themeOption.icon
                  return (
                    <button
                      key={themeOption.value}
                      onClick={() => handleSettingChange('theme', themeOption.value)}
                      className={`p-3 rounded-lg border text-center ${
                        settings.theme === themeOption.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <Icon className="h-5 w-5 mx-auto mb-2" />
                      <span className="text-sm">{themeOption.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                אזור זמן
              </label>
              <Select
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                options={timezones}
              />
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">התראות אימייל</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">קבל התראות בדוא&quot;ל</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer" htmlFor="email-notifications" aria-label="Toggle email notifications">
                  <input
                    id="email-notifications"
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">התראות דחיפה</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">קבל התראות באפליקציה</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer" htmlFor="push-notifications" aria-label="Toggle push notifications">
                  <input
                    id="push-notifications"
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">תזכורות שיעורים</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">קבל תזכורות לשיעורים יומיים</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer" htmlFor="lesson-reminders" aria-label="Toggle lesson reminders">
                  <input
                    id="lesson-reminders"
                    type="checkbox"
                    checked={settings.lessonReminders}
                    onChange={(e) => handleSettingChange('lessonReminders', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">התראות הודעות</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">קבל התראות על הודעות חדשות</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer" htmlFor="message-notifications" aria-label="Toggle message notifications">
                  <input
                    id="message-notifications"
                    type="checkbox"
                    checked={settings.messageNotifications}
                    onChange={(e) => handleSettingChange('messageNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        )

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">הצג סטטוס מקוון</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">אפשר לאחרים לראות שאתה מקוון</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer" htmlFor="show-online-status" aria-label="Toggle show online status">
                  <input
                    id="show-online-status"
                    type="checkbox"
                    checked={settings.showOnlineStatus}
                    onChange={(e) => handleSettingChange('showOnlineStatus', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">אפשר הודעות</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">אפשר לאחרים לשלוח לך הודעות</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer" htmlFor="allow-messages" aria-label="Toggle allow messages">
                  <input
                    id="allow-messages"
                    type="checkbox"
                    checked={settings.allowMessages}
                    onChange={(e) => handleSettingChange('allowMessages', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">הצג התקדמות</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">אפשר לאחרים לראות את ההתקדמות שלך</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer" htmlFor="show-progress" aria-label="Toggle show progress">
                  <input
                    id="show-progress"
                    type="checkbox"
                    checked={settings.showProgress}
                    onChange={(e) => handleSettingChange('showProgress', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        )

      case 'security':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">אימות דו-שלבי</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">הוסף שכבת אבטחה נוספת לחשבון שלך</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer" htmlFor="two-factor-auth" aria-label="Toggle two factor authentication">
                  <input
                    id="two-factor-auth"
                    type="checkbox"
                    checked={settings.twoFactorAuth}
                    onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">התראות כניסה</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">קבל התראות על כניסות לחשבון</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer" htmlFor="login-alerts" aria-label="Toggle login alerts">
                  <input
                    id="login-alerts"
                    type="checkbox"
                    checked={settings.loginAlerts}
                    onChange={(e) => handleSettingChange('loginAlerts', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">שינוי סיסמה</h4>
              <div className="space-y-4">
                <Input
                  type={showCurrentPassword ? 'text' : 'password'}
                  label="סיסמה נוכחית"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  label="סיסמה חדשה"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="אישור סיסמה"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />
                <Button onClick={handleChangePassword}>
                  <Key className="h-4 w-4 mr-2" />
                  שנה סיסמה
                </Button>
              </div>
            </div>
          </div>
        )

      case 'account':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">פרטי חשבון</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{user?.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">
                      {getLanguageInfo(user?.nativeLanguage || 'he').name}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">נתונים</h4>
              <div className="space-y-3">
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-2" />
                  ייצא נתונים
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  ייבא נתונים
                </Button>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="font-medium text-red-600 dark:text-red-400 mb-4">אזור מסוכן</h4>
              <div className="space-y-3">
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  מחק חשבון
                </Button>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  מחיקת החשבון היא פעולה בלתי הפיכה. כל הנתונים שלך יימחקו לצמיתות.
                </p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('settings.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('settings.subtitle')}
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 text-right hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        activeTab === tab.id
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-2 border-blue-600'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                {React.createElement(tabs.find(tab => tab.id === activeTab)?.icon || Settings, { className: "h-5 w-5" })}
                <span>{tabs.find(tab => tab.id === activeTab)?.label}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderTabContent()}
              
              {activeTab !== 'account' && (
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    שמור הגדרות
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
