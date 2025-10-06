'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { Brain, Target, Trophy, Clock, Star, Play, CheckCircle } from 'lucide-react'

export default function LearningPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    {
      id: 'alphabet',
      title: 'אלפבית',
      description: 'למד את האותיות והצלילים',
      icon: '🔤',
      color: 'from-blue-500 to-cyan-500',
      lessons: 12,
      completed: 3
    },
    {
      id: 'numbers',
      title: 'מספרים',
      description: 'למד לספור ולכתוב מספרים',
      icon: '🔢',
      color: 'from-green-500 to-emerald-500',
      lessons: 8,
      completed: 2
    },
    {
      id: 'colors',
      title: 'צבעים',
      description: 'זהה ולמד צבעים שונים',
      icon: '🎨',
      color: 'from-purple-500 to-pink-500',
      lessons: 6,
      completed: 1
    },
    {
      id: 'animals',
      title: 'חיות',
      description: 'למד על חיות וצלילים שלהן',
      icon: '🐾',
      color: 'from-orange-500 to-red-500',
      lessons: 15,
      completed: 5
    },
    {
      id: 'family',
      title: 'משפחה',
      description: 'למד על בני משפחה',
      icon: '👨‍👩‍👧‍👦',
      color: 'from-yellow-500 to-orange-500',
      lessons: 10,
      completed: 4
    },
    {
      id: 'food',
      title: 'אוכל',
      description: 'למד על מאכלים וטעמים',
      icon: '🍎',
      color: 'from-teal-500 to-green-500',
      lessons: 9,
      completed: 2
    }
  ]

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            מרכז הלמידה
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            למידה אינטראקטיבית עם משחקים ואיורים
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Brain className="h-12 w-12 text-blue-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">24</h3>
              <p className="text-gray-600 dark:text-gray-300">שיעורים הושלמו</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">8</h3>
              <p className="text-gray-600 dark:text-gray-300">תעודות</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">156</h3>
              <p className="text-gray-600 dark:text-gray-300">נקודות</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 text-purple-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">12h</h3>
              <p className="text-gray-600 dark:text-gray-300">זמן למידה</p>
            </CardContent>
          </Card>
        </div>

        {/* Learning Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{category.icon}</div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{category.completed}/{category.lessons}</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {category.description}
                </p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>התקדמות</span>
                    <span>{getProgressPercentage(category.completed, category.lessons)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${getProgressPercentage(category.completed, category.lessons)}%` }}
                    ></div>
                  </div>
                </div>

                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  {category.completed > 0 ? 'המשך למידה' : 'התחל למידה'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Category Modal */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {categories.find(c => c.id === selectedCategory)?.icon}
                  {categories.find(c => c.id === selectedCategory)?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {categories.find(c => c.id === selectedCategory)?.description}
                </p>
                
                <div className="grid gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-semibold mb-2">שיעור 1: מבוא</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      למד את הבסיסים של הנושא
                    </p>
                    <Button size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      התחל
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-semibold mb-2">שיעור 2: תרגול</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      תרגל את מה שלמדת
                    </p>
                    <Button size="sm" variant="outline">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      הושלם
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-6">
                  <Button onClick={() => setSelectedCategory(null)}>
                    סגור
                  </Button>
                  <Button variant="outline">
                    התחל למידה
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
