'use client'

import { useState } from 'react'
import { useAuth, useLanguage } from '@/components/providers'
import type { Language, LanguageLevel } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { LoadingSpinner } from '@/components/ui/loading'
import { OptimizedAvatar } from '@/components/ui/optimized-image'
import { ProfileStats } from '@/components/profile/profile-stats'
import { AchievementBadge } from '@/components/profile/achievement-badge'
import { LanguageProgress } from '@/components/profile/language-progress'
import {
  User,
  Edit,
  Save,
  X,
  Camera,
  Award,
  TrendingUp,
  Clock,
  BookOpen,
  MessageCircle,
  Globe,
  Settings,
  Shield,
  Bell,
  Eye,
  EyeOff,
} from 'lucide-react'
import { getInitials, getLanguageInfo, getLevelInfo } from '@/lib/utils'

export function ProfilePage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'אני אוהב ללמוד שפות חדשות ולפגוש אנשים מכל העולם',
    location: 'תל אביב, ישראל',
    website: 'https://example.com',
    nativeLanguage: user?.nativeLanguage || 'he',
    learningLanguages: user?.learningLanguages || ['ar', 'en'],
    currentLevel: user?.currentLevel || 'intermediate',
  })

  const [stats] = useState({
    totalLessons: 45,
    completedLessons: 32,
    totalTime: 1250, // minutes
    streak: 12,
    level: 'intermediate',
    points: 2450,
    achievements: 8,
    friends: 24,
  })

  const [userLanguages] = useState([
    {
      code: 'ar',
      name: 'ערבית',
      flag: '🇸🇦',
      level: 'intermediate',
      progress: 65,
      totalLessons: 30,
      completedLessons: 20,
      streak: 8,
      lastStudied: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      nextLesson: {
        id: 'ar-21',
        title: 'מילים בסיסיות - חלק ב',
        difficulty: 'medium'
      }
    },
    {
      code: 'en',
      name: 'אנגלית',
      flag: '🇺🇸',
      level: 'advanced',
      progress: 85,
      totalLessons: 25,
      completedLessons: 22,
      streak: 12,
      lastStudied: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      nextLesson: {
        id: 'en-23',
        title: 'דקדוק מתקדם',
        difficulty: 'hard'
      }
    }
  ])

  const [achievements] = useState([
    {
      id: '1',
      name: 'מתחיל חדש',
      description: 'השלמת השיעור הראשון',
      icon: 'star',
      category: 'learning' as const,
      rarity: 'common' as const,
      unlockedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'רצף למידה',
      description: '10 ימים רצופים של למידה',
      icon: 'zap',
      category: 'streak' as const,
      rarity: 'rare' as const,
      unlockedAt: new Date('2024-01-25'),
    },
    {
      id: '3',
      name: 'מתקדם',
      description: 'השלמת 25 שיעורים',
      icon: 'book',
      category: 'learning' as const,
      rarity: 'epic' as const,
      unlockedAt: new Date('2024-02-10'),
    },
    {
      id: '4',
      name: 'חברותי',
      description: 'יצירת 10 קשרים חדשים',
      icon: 'users',
      category: 'social' as const,
      rarity: 'rare' as const,
      unlockedAt: new Date('2024-02-15'),
    },
    {
      id: '5',
      name: 'מומחה',
      description: 'השלמת 50 שיעורים',
      icon: 'crown',
      category: 'special' as const,
      rarity: 'legendary' as const,
      progress: 32,
      maxProgress: 50,
    },
  ])

  const [recentActivity] = useState([
    {
      id: '1',
      type: 'lesson_completed',
      title: 'השלמת שיעור: מילים בסיסיות בעברית',
      time: 'לפני שעתיים',
      icon: BookOpen,
    },
    {
      id: '2',
      type: 'connection_made',
      title: 'יצרת קשר עם אחמד חסן',
      time: 'לפני 4 שעות',
      icon: MessageCircle,
    },
    {
      id: '3',
      type: 'achievement_unlocked',
      title: 'פתחת הישג: רצף למידה',
      time: 'אתמול',
      icon: Award,
    },
    {
      id: '4',
      type: 'forum_post',
      title: 'פרסמת בפורום: איך ללמוד עברית מהר יותר?',
      time: 'לפני יומיים',
      icon: MessageCircle,
    },
  ])

  const languageOptions = [
    { value: 'he', label: 'עברית' },
    { value: 'ar', label: 'ערבית' },
    { value: 'en', label: 'אנגלית' },
    { value: 'si', label: 'סינהלית' },
    { value: 'ta', label: 'טמילית' },
    { value: 'fr', label: 'צרפתית' },
    { value: 'es', label: 'ספרדית' },
    { value: 'de', label: 'גרמנית' },
    { value: 'it', label: 'איטלקית' },
    { value: 'pt', label: 'פורטוגזית' },
    { value: 'ru', label: 'רוסית' },
    { value: 'zh', label: 'סינית' },
    { value: 'ja', label: 'יפנית' },
    { value: 'ko', label: 'קוריאנית' },
    { value: 'hi', label: 'הינדי' },
  ]

  const levels = [
    { value: 'beginner', label: 'מתחיל' },
    { value: 'intermediate', label: 'בינוני' },
    { value: 'advanced', label: 'מתקדם' },
    { value: 'native', label: 'שפת אם' },
  ]

  const handleSave = () => {
    // Here you would save the profile data
    setIsEditing(false)
    // Show success message
  }

  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      bio: 'אני אוהב ללמוד שפות חדשות ולפגוש אנשים מכל העולם',
      location: 'תל אביב, ישראל',
      website: 'https://example.com',
      nativeLanguage: user?.nativeLanguage || 'he',
      learningLanguages: user?.learningLanguages || ['ar', 'en'],
      currentLevel: user?.currentLevel || 'intermediate',
    })
    setIsEditing(false)
  }

  const progressPercentage = stats.totalLessons > 0 
    ? Math.round((stats.completedLessons / stats.totalLessons) * 100) 
    : 0

  return (
    <div className="space-y-6 relative min-h-screen">
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('profile.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('profile.subtitle')}
          </p>
        </div>
        <div className="flex space-x-3 space-x-reverse">
          {isEditing ? (
            <>
              <Button onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                {t('common.cancel')}
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                {t('common.save')}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              {t('profile.editProfile')}
            </Button>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <ProfileStats stats={stats} />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <User className="h-5 w-5" />
                <span>{t('profile.basicInfo')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-6 space-x-reverse">
                <div className="relative">
                  <OptimizedAvatar
                    src={user?.profileImage}
                    alt={user?.name || 'User'}
                    size="xl"
                    className="h-24 w-24"
                    priority={true}
                    fallback={
                      <div className="h-24 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {getInitials(user?.name || 'U')}
                      </div>
                    }
                  />
                  {isEditing && (
                    <button 
                      className="absolute bottom-0 right-0 h-8 w-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600"
                      aria-label="Change profile picture"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                <div className="flex-1">
                  {isEditing ? (
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      label={t('profile.name')}
                    />
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {profileData.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {profileData.email}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isEditing ? (
                  <>
                    <Input
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      label={t('profile.location')}
                    />
                    <Input
                      value={profileData.website}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                      label={t('profile.website')}
                    />
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('profile.location')}
                      </label>
                      <p className="text-gray-900 dark:text-white">{profileData.location}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('profile.website')}
                      </label>
                      <a
                        href={profileData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {profileData.website}
                      </a>
                    </div>
                  </>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('profile.bio')}
                </label>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    rows={3}
                    aria-label="Bio"
                    placeholder="ספר על עצמך..."
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{profileData.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <Globe className="h-5 w-5" />
                <span>{t('profile.languageSettings')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('profile.nativeLanguage')}
                  </label>
                  {isEditing ? (
                    <Select
                      value={profileData.nativeLanguage}
                      onChange={(e) => setProfileData({ ...profileData, nativeLanguage: e.target.value as Language })}
                      options={languageOptions}
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">
                      {getLanguageInfo(profileData.nativeLanguage).name}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('profile.currentLevel')}
                  </label>
                  {isEditing ? (
                    <Select
                      value={profileData.currentLevel}
                      onChange={(e) => setProfileData({ ...profileData, currentLevel: e.target.value as LanguageLevel })}
                      options={levels}
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">
                      {getLevelInfo(profileData.currentLevel).name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('profile.learningLanguages')}
                </label>
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-2">
                    {languageOptions.map((language) => (
                      <label key={language.value} className="flex items-center space-x-2 space-x-reverse">
                        <input
                          type="checkbox"
                          checked={profileData.learningLanguages.includes(language.value as Language)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setProfileData({
                                ...profileData,
                                learningLanguages: [...profileData.learningLanguages, language.value as Language]
                              })
                            } else {
                              setProfileData({
                                ...profileData,
                                learningLanguages: profileData.learningLanguages.filter(lang => lang !== language.value)
                              })
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <span>{language.label}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profileData.learningLanguages.map((lang) => (
                      <span
                        key={lang}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm"
                      >
                        {getLanguageInfo(lang).name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Language Progress */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              התקדמות בשפות
            </h3>
            {userLanguages.map((language) => (
              <LanguageProgress
                key={language.code}
                language={language}
                onStartLesson={(lessonId) => {
                  console.log('Starting lesson:', lessonId)
                }}
                onViewProgress={() => {
                  console.log('Viewing progress for:', language.name)
                }}
              />
            ))}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <Clock className="h-5 w-5" />
                <span>{t('profile.recentActivity')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="flex items-center space-x-3 space-x-reverse">
                      <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <Award className="h-5 w-5" />
                <span>{t('profile.achievements')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    achievement={achievement}
                    isUnlocked={!!achievement.unlockedAt}
                    onClick={() => {
                      console.log('Achievement clicked:', achievement.name)
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  )
}
