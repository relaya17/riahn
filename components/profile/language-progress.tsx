'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Target, 
  TrendingUp,
  Calendar,
  Play,
  CheckCircle,
  Clock
} from 'lucide-react'

interface LanguageProgressProps {
  language: {
    code: string
    name: string
    flag: string
    level: string
    progress: number
    totalLessons: number
    completedLessons: number
    streak: number
    lastStudied: Date
    nextLesson?: {
      id: string
      title: string
      difficulty: string
    }
  }
  onStartLesson?: (lessonId: string) => void
  onViewProgress?: () => void
}

export function LanguageProgress({ language, onStartLesson, onViewProgress }: LanguageProgressProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'intermediate': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      case 'advanced': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20'
      case 'expert': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const formatLastStudied = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'היום'
    if (days === 1) return 'אתמול'
    if (days < 7) return `לפני ${days} ימים`
    return date.toLocaleDateString('he-IL')
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{language.flag}</div>
            <div>
              <CardTitle className="text-lg">{language.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(language.level)}`}>
                  {language.level}
                </span>
                <span className="text-sm text-gray-500">
                  {language.completedLessons}/{language.totalLessons} שיעורים
                </span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onViewProgress}>
            צפה בהתקדמות
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">התקדמות כללית</span>
            <span className="font-medium">{language.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 language-progress-bar"
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-orange-500" />
            <div>
              <p className="text-xs text-gray-500">רצף ימים</p>
              <p className="font-semibold">{language.streak}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">לימוד אחרון</p>
              <p className="font-semibold text-sm">{formatLastStudied(language.lastStudied)}</p>
            </div>
          </div>
        </div>

        {/* Next Lesson */}
        {language.nextLesson && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm">השיעור הבא</h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(language.nextLesson.difficulty)}`}>
                {language.nextLesson.difficulty}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {language.nextLesson.title}
            </p>
            <Button 
              size="sm" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
              onClick={() => onStartLesson?.(language.nextLesson!.id)}
            >
              <Play className="h-4 w-4 mr-2" />
              התחל שיעור
            </Button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              כל השיעורים
            </Button>
            <Button variant="outline" size="sm">
              <Target className="h-4 w-4 mr-2" />
              מטרות
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
