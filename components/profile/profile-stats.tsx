'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Target,
  TrendingUp,
  Calendar,
  Award,
  Users
} from 'lucide-react'

interface ProfileStatsProps {
  stats: {
    totalLessons: number
    completedLessons: number
    streak: number
    totalTime: number
    level: string
    points: number
    achievements: number
    friends: number
  }
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours} שעות ${mins} דקות` : `${mins} דקות`
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'text-green-600 bg-green-100'
      case 'intermediate': return 'text-blue-600 bg-blue-100'
      case 'advanced': return 'text-purple-600 bg-purple-100'
      case 'expert': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Lessons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                שיעורים כולל
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalLessons}
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      {/* Completed Lessons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                שיעורים הושלמו
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.completedLessons}
              </p>
              <p className="text-xs text-gray-500">
                {Math.round((stats.completedLessons / stats.totalLessons) * 100)}% הושלם
              </p>
            </div>
            <Trophy className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>

      {/* Streak */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                רצף ימים
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.streak}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </CardContent>
      </Card>

      {/* Total Time */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                זמן כולל
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatTime(stats.totalTime)}
              </p>
            </div>
            <Clock className="h-8 w-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>

      {/* Level */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                רמה
              </p>
              <p className={`text-2xl font-bold ${getLevelColor(stats.level)}`}>
                {stats.level}
              </p>
            </div>
            <Target className="h-8 w-8 text-indigo-500" />
          </div>
        </CardContent>
      </Card>

      {/* Points */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                נקודות
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.points.toLocaleString()}
              </p>
            </div>
            <Award className="h-8 w-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                הישגים
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.achievements}
              </p>
            </div>
            <Trophy className="h-8 w-8 text-pink-500" />
          </div>
        </CardContent>
      </Card>

      {/* Friends */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                חברים
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.friends}
              </p>
            </div>
            <Users className="h-8 w-8 text-cyan-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
