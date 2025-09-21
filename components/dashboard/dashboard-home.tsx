'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useLanguage } from '@/components/providers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdvancedCard } from '@/components/ui/advanced-card'
import { ProgressRing } from '@/components/ui/progress-ring'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { StaggerAnimation, RevealOnScroll, Magnetic } from '@/components/ui/advanced-animations'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Users,
  MessageSquare,
  TrendingUp,
  Award,
  Clock,
  Play,
  Star,
  Target,
  Globe,
  ChevronRight,
} from 'lucide-react'
import { getLanguageInfo, getLevelInfo } from '@/lib/utils'
import { WorldMap } from '@/components/map/world-map'

export function DashboardHome() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalLessons: 0,
    completedLessons: 0,
    streak: 0,
    achievements: 0,
    totalTime: 0,
  })

  const [recentLessons] = useState([
    {
      id: '1',
      title: 'מילים בסיסיות בעברית',
      progress: 75,
      level: 'beginner',
      language: 'he',
      duration: 15,
    },
    {
      id: '2',
      title: 'דקדוק בסיסי',
      progress: 45,
      level: 'beginner',
      language: 'he',
      duration: 20,
    },
    {
      id: '3',
      title: 'שיחה יומיומית',
      progress: 30,
      level: 'intermediate',
      language: 'he',
      duration: 25,
    },
  ])

  const [quickActions] = useState([
    {
      title: t('dashboard.quickActions.startLesson'),
      description: t('dashboard.quickActions.startLessonDesc'),
      icon: Play,
      color: 'bg-blue-500',
      href: '/lessons',
    },
    {
      title: t('dashboard.quickActions.findPartners'),
      description: t('dashboard.quickActions.findPartnersDesc'),
      icon: Users,
      color: 'bg-green-500',
      href: '/connect',
    },
    {
      title: t('dashboard.quickActions.joinForum'),
      description: t('dashboard.quickActions.joinForumDesc'),
      icon: MessageSquare,
      color: 'bg-purple-500',
      href: '/forums',
    },
    {
      title: t('chat.crossLanguageTitle'),
      description: t('chat.crossLanguageDesc'),
      icon: Globe,
      color: 'bg-indigo-500',
      href: '/cross-language-chat',
    },
  ])

  const [achievements] = useState([
    {
      id: '1',
      title: 'מתחיל חדש',
      description: 'השלמת השיעור הראשון',
      icon: Star,
      unlocked: true,
      date: '2024-01-15',
    },
    {
      id: '2',
      title: 'רצף למידה',
      description: '7 ימים רצופים של למידה',
      icon: Clock,
      unlocked: true,
      date: '2024-01-20',
    },
    {
      id: '3',
      title: 'מתקדם',
      description: 'השלמת 10 שיעורים',
      icon: Target,
      unlocked: false,
      date: null,
    },
  ])

  useEffect(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalLessons: 25,
        completedLessons: 18,
        streak: 7,
        achievements: 12,
        totalTime: 450,
      })
    }, 1000)
  }, [])

  const progressPercentage = stats.totalLessons > 0 
    ? Math.round((stats.completedLessons / stats.totalLessons) * 100) 
    : 0

  return (
    <div className="space-y-6 relative min-h-screen">
      
      {/* Content */}
      <div className="relative z-10">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 sm:p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              {t('dashboard.welcome')}, {user?.name}!
            </h2>
            <p className="text-blue-100">
              {t('dashboard.welcomeMessage')}
            </p>
          </div>
          <div className="hidden md:block">
            <Globe className="h-16 w-16 text-white/20" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <RevealOnScroll direction="up" delay={200}>
        <StaggerAnimation delay={150}>
          {[
            <div key="stats-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Magnetic strength={0.2}>
              <AdvancedCard
                title={t('dashboard.stats.totalLessons')}
                variant="gradient"
                size="md"
                hover={true}
                glow={false}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <AnimatedCounter
                      value={stats.totalLessons}
                      className="text-2xl font-bold text-gray-900 dark:text-white"
                    />
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-500 animate-pulse-glow" />
                </div>
              </AdvancedCard>
            </Magnetic>

            <Magnetic strength={0.2}>
              <AdvancedCard
                title={t('dashboard.stats.completed')}
                variant="gradient"
                size="md"
                hover={true}
                glow={false}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <AnimatedCounter
                      value={stats.completedLessons}
                      className="text-2xl font-bold text-gray-900 dark:text-white"
                    />
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500 animate-pulse-glow" />
                </div>
              </AdvancedCard>
            </Magnetic>

            <Magnetic strength={0.2}>
              <AdvancedCard
                title={t('dashboard.stats.streak')}
                variant="gradient"
                size="md"
                hover={true}
                glow={false}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <AnimatedCounter
                      value={stats.streak}
                      className="text-2xl font-bold text-gray-900 dark:text-white"
                      suffix=" ימים"
                    />
                  </div>
                  <Clock className="h-8 w-8 text-orange-500 animate-pulse-glow" />
                </div>
              </AdvancedCard>
            </Magnetic>

            <Magnetic strength={0.2}>
              <AdvancedCard
                title={t('dashboard.stats.achievements')}
                variant="gradient"
                size="md"
                hover={true}
                glow={false}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <AnimatedCounter
                      value={stats.achievements}
                      className="text-2xl font-bold text-gray-900 dark:text-white"
                    />
                  </div>
                  <Award className="h-8 w-8 text-yellow-500 animate-pulse-glow" />
                </div>
              </AdvancedCard>
            </Magnetic>
          </div>
          ]}
        </StaggerAnimation>
      </RevealOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Progress Overview */}
        <div className="lg:col-span-2">
          <AdvancedCard
            title={t('dashboard.progressOverview')}
            variant="glass"
            size="lg"
            hover={false}
            glow={false}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <ProgressRing
                  progress={progressPercentage}
                  size={120}
                  strokeWidth={8}
                  color="#3b82f6"
                  showPercentage={true}
                />
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t('dashboard.overallProgress')}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3" role="progressbar" aria-label={`Overall progress: ${progressPercentage}%`}>
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.totalTime}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('dashboard.minutesLearned')}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {getLanguageInfo(user?.nativeLanguage || 'he').name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t('dashboard.nativeLanguage')}
                    </p>
                  </div>
                </div>
              </div>
            </AdvancedCard>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.quickActions.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start space-x-3 space-x-reverse h-auto p-4"
                    onClick={() => router.push(action.href)}
                  >
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{action.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {action.description}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Button>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* World Map Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <span>מפת משתמשים גלובלית</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WorldMap onUserClick={(user) => console.log('User clicked:', user)} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Lessons */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2 space-x-reverse">
                <BookOpen className="h-5 w-5" />
                <span>{t('dashboard.recentLessons')}</span>
              </span>
              <Button variant="ghost" size="sm">
                {t('dashboard.viewAll')}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLessons.map((lesson) => {
                const levelInfo = getLevelInfo(lesson.level)
                return (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {lesson.title}
                      </h4>
                      <div className="flex items-center space-x-2 space-x-reverse mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${levelInfo.color}`}>
                          {levelInfo.name}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {lesson.duration} דקות
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-16">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2" role="progressbar" aria-label={`${lesson.title} progress: ${lesson.progress}%`}>
                          <div
                            className="bg-blue-500 h-2 rounded-full dashboard-progress"
                          />
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">
                          {lesson.progress}%
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Play className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <Award className="h-5 w-5" />
              <span>{t('dashboard.recentAchievements')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={achievement.id}
                    className={`flex items-center space-x-3 space-x-reverse p-3 rounded-lg ${
                      achievement.unlocked
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                        : 'bg-gray-50 dark:bg-gray-800'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        achievement.unlocked
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </p>
                      {achievement.unlocked && achievement.date && (
                        <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                          {new Date(achievement.date).toLocaleDateString('he-IL')}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  )
}
