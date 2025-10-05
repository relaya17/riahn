'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/providers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { LoadingSpinner } from '@/components/ui/loading'
import {
  BookOpen,
  Play,
  Clock,
  Star,
  Filter,
  Search,
  ChevronRight,
  CheckCircle,
  Lock,
} from 'lucide-react'
import { getLevelInfo, getLanguageInfo } from '@/lib/utils'

export function LessonsPage() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedLanguage, setSelectedLanguage] = useState('all')

  const [lessons] = useState([
    {
      id: '1',
      title: 'מילים בסיסיות בעברית',
      description: 'למד מילים בסיסיות בעברית לשימוש יומיומי',
      level: 'beginner',
      language: 'he',
      duration: 15,
      progress: 75,
      isCompleted: false,
      isLocked: false,
      rating: 4.8,
      students: 1250,
      category: 'vocabulary',
    },
    {
      id: '2',
      title: 'דקדוק בסיסי',
      description: 'הבנת יסודות הדקדוק העברי',
      level: 'beginner',
      language: 'he',
      duration: 20,
      progress: 45,
      isCompleted: false,
      isLocked: false,
      rating: 4.6,
      students: 980,
      category: 'grammar',
    },
    {
      id: '3',
      title: 'שיחה יומיומית',
      description: 'ביטויים נפוצים לשיחה יומיומית',
      level: 'intermediate',
      language: 'he',
      duration: 25,
      progress: 30,
      isCompleted: false,
      isLocked: false,
      rating: 4.9,
      students: 2100,
      category: 'conversation',
    },
    {
      id: '4',
      title: 'תרבות ישראלית',
      description: 'הכרת התרבות והמסורות הישראליות',
      level: 'advanced',
      language: 'he',
      duration: 30,
      progress: 0,
      isCompleted: false,
      isLocked: true,
      rating: 4.7,
      students: 750,
      category: 'culture',
    },
    {
      id: '5',
      title: 'עברית עסקית',
      description: 'עברית למקום העבודה',
      level: 'advanced',
      language: 'he',
      duration: 35,
      progress: 0,
      isCompleted: false,
      isLocked: true,
      rating: 4.5,
      students: 450,
      category: 'business',
    },
  ])

  const [categories] = useState([
    { value: 'all', label: 'כל הקטגוריות' },
    { value: 'vocabulary', label: 'אוצר מילים' },
    { value: 'grammar', label: 'דקדוק' },
    { value: 'conversation', label: 'שיחה' },
    { value: 'culture', label: 'תרבות' },
    { value: 'business', label: 'עסקים' },
  ])

  const [levels] = useState([
    { value: 'all', label: 'כל הרמות' },
    { value: 'beginner', label: 'מתחיל' },
    { value: 'intermediate', label: 'בינוני' },
    { value: 'advanced', label: 'מתקדם' },
  ])

  const [languages] = useState([
    { value: 'all', label: 'כל השפות' },
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
  ])

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === 'all' || lesson.level === selectedLevel
    const matchesLanguage = selectedLanguage === 'all' || lesson.language === selectedLanguage
    
    return matchesSearch && matchesLevel && matchesLanguage
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vocabulary':
        return '📚'
      case 'grammar':
        return '📝'
      case 'conversation':
        return '💬'
      case 'culture':
        return '🏛️'
      case 'business':
        return '💼'
      default:
        return '📖'
    }
  }

  return (
    <div className="space-y-6 relative min-h-screen">
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('lessons.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('lessons.subtitle')}
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
          <Play className="h-4 w-4 mr-2" />
          {t('lessons.startLearning')}
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('lessons.searchLessons')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            
            <Select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              options={levels}
              placeholder={t('lessons.selectLevel')}
            />
            
            <Select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              options={languages}
              placeholder={t('lessons.selectLanguage')}
            />
            
            <Button variant="outline" className="justify-start">
              <Filter className="h-4 w-4 mr-2" />
              {t('lessons.moreFilters')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t('lessons.stats.totalLessons')}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {lessons.length}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t('lessons.stats.completed')}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {lessons.filter(l => l.isCompleted).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t('lessons.stats.inProgress')}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {lessons.filter(l => l.progress > 0 && !l.isCompleted).length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => {
          const levelInfo = getLevelInfo(lesson.level)
          const languageInfo = getLanguageInfo(lesson.language)
          
          return (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-2xl">{getCategoryIcon(lesson.category)}</span>
                    <div>
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      <div className="flex items-center space-x-2 space-x-reverse mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${levelInfo.color}`}>
                          {levelInfo.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {languageInfo.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  {lesson.isLocked && (
                    <Lock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {lesson.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{lesson.duration} דקות</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{lesson.rating}</span>
                    </div>
                  </div>
                  
                  {lesson.progress > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">התקדמות</span>
                        <span>{lesson.progress}%</span>
                      </div>
                      <div 
                        className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2" 
                        role="progressbar" 
                        aria-label={`${lesson.title} progress: ${lesson.progress}%`}
                      >
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full dashboard-progress"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {lesson.students} תלמידים
                    </span>
                    <Button
                      size="sm"
                      disabled={lesson.isLocked}
                      className={lesson.isLocked ? 'opacity-50' : ''}
                    >
                      {lesson.progress > 0 ? (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          המשך
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          התחל
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredLessons.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('lessons.noLessonsFound')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('lessons.tryDifferentFilters')}
            </p>
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  )
}
