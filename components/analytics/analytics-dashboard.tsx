'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  BookOpen, 
  Clock,
  Target,
  Award,
  Calendar,
  Download,
  Eye,
  Star
} from 'lucide-react'

interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  newUsers: number
  retentionRate: number
  totalLessons: number
  completedLessons: number
  averageSessionTime: number
  totalMessages: number
  userEngagement: number
  topLanguages: Array<{
    language: string
    users: number
    growth: number
  }>
  dailyActivity: Array<{
    date: string
    users: number
    lessons: number
    messages: number
  }>
  userProgress: Array<{
    level: string
    count: number
    percentage: number
  }>
  popularContent: Array<{
    title: string
    type: string
    views: number
    rating: number
  }>
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [timeRange, setTimeRange] = useState('7d')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      setData({
        totalUsers: 1247,
        activeUsers: 892,
        newUsers: 156,
        retentionRate: 78.5,
        totalLessons: 5432,
        completedLessons: 3210,
        averageSessionTime: 24.5,
        totalMessages: 15678,
        userEngagement: 85.2,
        topLanguages: [
          { language: 'עברית', users: 456, growth: 12.5 },
          { language: 'אנגלית', users: 389, growth: 8.3 },
          { language: 'ערבית', users: 234, growth: 15.7 },
          { language: 'ספרדית', users: 168, growth: 6.2 }
        ],
        dailyActivity: [
          { date: '2024-01-01', users: 45, lessons: 123, messages: 234 },
          { date: '2024-01-02', users: 52, lessons: 145, messages: 267 },
          { date: '2024-01-03', users: 48, lessons: 134, messages: 245 },
          { date: '2024-01-04', users: 61, lessons: 167, messages: 289 },
          { date: '2024-01-05', users: 55, lessons: 156, messages: 278 },
          { date: '2024-01-06', users: 67, lessons: 189, messages: 312 },
          { date: '2024-01-07', users: 72, lessons: 198, messages: 334 }
        ],
        userProgress: [
          { level: 'מתחיל', count: 456, percentage: 36.6 },
          { level: 'בינוני', count: 389, percentage: 31.2 },
          { level: 'מתקדם', count: 234, percentage: 18.8 },
          { level: 'מומחה', count: 168, percentage: 13.4 }
        ],
        popularContent: [
          { title: 'מילים בסיסיות בעברית', type: 'שיעור', views: 1234, rating: 4.8 },
          { title: 'דקדוק עברי', type: 'שיעור', views: 987, rating: 4.6 },
          { title: 'שיחה יומיומית', type: 'שיעור', views: 876, rating: 4.7 },
          { title: 'תרבות ישראלית', type: 'מאמר', views: 654, rating: 4.5 }
        ]
      })
      setIsLoading(false)
    }, 1000)
  }, [timeRange])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            אנליטיקה מתקדמת
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            options={[
              { value: '24h', label: '24 שעות אחרונות' },
              { value: '7d', label: '7 ימים אחרונים' },
              { value: '30d', label: '30 ימים אחרונים' },
              { value: '90d', label: '90 ימים אחרונים' }
            ]}
          />
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            ייצא דוח
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  סה&quot;כ משתמשים
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {data.totalUsers.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">+{data.newUsers} חדשים</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  משתמשים פעילים
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {data.activeUsers.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">{data.retentionRate}% שימור</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  שיעורים הושלמו
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {data.completedLessons.toLocaleString()}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">
                    {Math.round((data.completedLessons / data.totalLessons) * 100)}% השלמה
                  </span>
                </div>
              </div>
              <BookOpen className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  זמן ממוצע
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {data.averageSessionTime} דק&apos;
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">{data.userEngagement}% מעורבות</span>
                </div>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Languages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span>שפות פופולריות</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topLanguages.map((lang, index) => (
                <div key={lang.language} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {lang.language}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {lang.users} משתמשים
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {lang.growth > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        lang.growth > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {lang.growth > 0 ? '+' : ''}{lang.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Progress Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              <span>התפלגות רמות משתמשים</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.userProgress.map((progress) => (
                <div key={progress.level}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {progress.level}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {progress.count} ({progress.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 analytics-progress"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>פעילות יומית</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-2">
            {data.dailyActivity.map((day, index) => {
              const maxUsers = Math.max(...data.dailyActivity.map(d => d.users))
              const height = (day.users / maxUsers) * 100
              
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-700 analytics-chart"
                  />
                  <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 text-center">
                    <div>{new Date(day.date).toLocaleDateString('he-IL', { weekday: 'short' })}</div>
                    <div className="font-medium">{day.users}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Popular Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            <span>תוכן פופולרי</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.popularContent.map((content, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {content.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {content.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {content.views}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {content.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
