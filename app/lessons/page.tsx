'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/providers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { BookOpen, Play, CheckCircle, Clock, Star } from 'lucide-react'

export default function LessonsPage() {
  const { t } = useLanguage()
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)

  const lessons = [
    {
      id: 1,
      title: 'שיעור בסיסי - מילים ראשונות',
      description: 'למד את המילים הבסיסיות ביותר בשפה החדשה',
      duration: '15 דקות',
      difficulty: 'קל',
      progress: 0,
      completed: false
    },
    {
      id: 2,
      title: 'שיחה יומיומית',
      description: 'תרגל שיחות בסיסיות כמו ברכות ושאלות פשוטות',
      duration: '25 דקות',
      difficulty: 'בינוני',
      progress: 30,
      completed: false
    },
    {
      id: 3,
      title: 'דקדוק בסיסי',
      description: 'למד את כללי הדקדוק החשובים ביותר',
      duration: '35 דקות',
      difficulty: 'קשה',
      progress: 0,
      completed: false
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'קל': return 'text-green-600 bg-green-100'
      case 'בינוני': return 'text-yellow-600 bg-yellow-100'
      case 'קשה': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            שיעורים אינטראקטיביים
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            למידה מותאמת אישית עם מעקב התקדמות
          </p>
        </div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <BookOpen className="h-8 w-8 text-emerald-500" />
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                      {lesson.difficulty}
                    </span>
                    {lesson.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                </div>
                <CardTitle className="text-xl">{lesson.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {lesson.description}
                </p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {lesson.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {lesson.difficulty}
                  </div>
                </div>

                {/* Progress Bar */}
                {lesson.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>התקדמות</span>
                      <span>{lesson.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${lesson.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full"
                  onClick={() => setSelectedLesson(lesson.id)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {lesson.completed ? 'חזור לשיעור' : 'התחל שיעור'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Lesson Modal */}
        {selectedLesson && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle>שיעור נבחר</CardTitle>
              </CardHeader>
              <CardContent>
                <p>כאן יוצג תוכן השיעור האינטראקטיבי...</p>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => setSelectedLesson(null)}>
                    סגור
                  </Button>
                  <Button variant="outline">
                    המשך שיעור
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}