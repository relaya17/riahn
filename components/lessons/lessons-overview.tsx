'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/components/providers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdvancedCard } from '@/components/ui/advanced-card'
import { ProgressRing } from '@/components/ui/progress-ring'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { mockLessons } from '@/data/mockData'
import { 
  BookOpen, 
  Play, 
  Clock, 
  Star, 
  Search,
  TrendingUp,
  Award,
  Target,
  ChevronRight
} from 'lucide-react'

export interface LessonsOverviewProps {
  groupId?: string | null
}

export function LessonsOverview({ groupId }: LessonsOverviewProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [lessons] = useState(mockLessons)
  const [filteredLessons, setFilteredLessons] = useState(mockLessons)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    let filtered = lessons

    if (searchTerm) {
      filtered = filtered.filter(lesson => 
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(lesson => lesson.level === selectedLevel)
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(lesson => lesson.category === selectedCategory)
    }

    setFilteredLessons(filtered)
  }, [searchTerm, selectedLevel, selectedCategory, lessons])

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'hard': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const categories = [
    { value: 'all', label: 'כל הקטגוריות' },
    { value: 'vocabulary', label: 'אוצר מילים' },
    { value: 'grammar', label: 'דקדוק' },
    { value: 'conversation', label: 'שיחה' },
    { value: 'pronunciation', label: 'הגייה' },
    { value: 'writing', label: 'כתיבה' },
    { value: 'reading', label: 'קריאה' }
  ]

  const levels = [
    { value: 'all', label: 'כל הרמות' },
    { value: 'beginner', label: 'מתחיל' },
    { value: 'intermediate', label: 'בינוני' },
    { value: 'advanced', label: 'מתקדם' }
  ]

  return (
    <div className="space-y-6">
      {/* Group Welcome Message */}
      {groupId && (
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {t('lessons.groupWelcome')}
              </h2>
              <p className="text-green-100 text-sm">
                {t('lessons.groupWelcomeDesc')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('lessons.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t('lessons.subtitle')}
          </p>
        </div>
        <Button onClick={() => router.push('/letters')}>
          <BookOpen className="h-4 w-4 mr-2" />
          {t('lessons.letterLearning')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AdvancedCard
          title={t('lessons.totalLessons')}
          variant="gradient"
          size="md"
          hover={true}
          glow={false}
        >
          <div className="text-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-2 animate-pulse-glow">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <AnimatedCounter
              value={lessons.length}
              className="text-2xl font-bold text-blue-600"
            />
          </div>
        </AdvancedCard>

        <AdvancedCard
          title={t('lessons.averageProgress')}
          variant="gradient"
          size="md"
          hover={true}
          glow={false}
        >
          <div className="text-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit mx-auto mb-2 animate-pulse-glow">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <AnimatedCounter
              value={Math.round(lessons.reduce((sum, lesson) => sum + lesson.progress, 0) / lessons.length)}
              className="text-2xl font-bold text-green-600"
              suffix="%"
            />
          </div>
        </AdvancedCard>

        <AdvancedCard
          title={t('lessons.completed')}
          variant="gradient"
          size="md"
          hover={true}
          glow={false}
        >
          <div className="text-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full w-fit mx-auto mb-2 animate-pulse-glow">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <AnimatedCounter
              value={lessons.filter(lesson => lesson.progress === 100).length}
              className="text-2xl font-bold text-yellow-600"
            />
          </div>
        </AdvancedCard>

        <AdvancedCard
          title={t('lessons.totalMinutes')}
          variant="gradient"
          size="md"
          hover={true}
          glow={false}
        >
          <div className="text-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-fit mx-auto mb-2 animate-pulse-glow">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <AnimatedCounter
              value={lessons.reduce((sum, lesson) => sum + lesson.duration, 0)}
              className="text-2xl font-bold text-purple-600"
            />
          </div>
        </AdvancedCard>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t('lessons.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <Select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              options={levels}
            />
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={categories}
            />
          </div>
        </CardContent>
      </Card>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <Card key={lesson.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {lesson.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(lesson.level)}`}>
                    {lesson.level === 'beginner' ? 'מתחיל' :
                     lesson.level === 'intermediate' ? 'בינוני' : 'מתקדם'}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {lesson.duration} דק&apos;
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {/* Progress Ring */}
                <div className="flex items-center justify-center">
                  <ProgressRing
                    progress={lesson.progress}
                    size={60}
                    strokeWidth={4}
                    color="#3b82f6"
                    showPercentage={false}
                  >
                    <div className="text-center">
                      <div className="text-xs font-bold text-blue-600">
                        {lesson.progress}%
                      </div>
                    </div>
                  </ProgressRing>
                </div>

                {/* Tags */}
                {lesson.tags && lesson.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {lesson.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {lesson.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs">
                        +{lesson.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Difficulty */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className={`h-4 w-4 ${getDifficultyColor(lesson.difficulty)}`} />
                    <span className={`text-sm font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                      {lesson.difficulty === 'easy' ? 'קל' :
                       lesson.difficulty === 'medium' ? 'בינוני' : 'קשה'}
                    </span>
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={() => router.push(`/lessons/${lesson.id}`)}
                    className="flex items-center gap-1"
                  >
                    {lesson.progress === 100 ? (
                      <>
                        <Star className="h-3 w-3" />
                        {t('lessons.review')}
                      </>
                    ) : lesson.progress > 0 ? (
                      <>
                        <Play className="h-3 w-3" />
                        {t('lessons.continue')}
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3" />
                        {t('lessons.start')}
                      </>
                    )}
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredLessons.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('lessons.noLessonsFound')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('lessons.tryDifferentFilters')}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('')
                setSelectedLevel('all')
                setSelectedCategory('all')
              }}
            >
              {t('lessons.clearFilters')}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
