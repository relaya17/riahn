'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MessageCircle, 
  Users, 
  TrendingUp,
  BookOpen,
  Award,
  HelpCircle
} from 'lucide-react'
import { ForumCategory } from '@/types'

interface ForumCategoriesProps {
  onCategorySelect?: (category: ForumCategory) => void
  selectedCategory?: ForumCategory
}


export function ForumCategories({ onCategorySelect, selectedCategory }: ForumCategoriesProps) {
  const categories = [
    {
      id: 'general' as ForumCategory,
      name: 'כללי',
      description: 'דיונים כלליים על לימוד שפות',
      icon: MessageCircle,
      color: 'bg-blue-500',
      stats: { posts: 245, replies: 1234, lastActivity: new Date() }
    },
    {
      id: 'grammar-help' as ForumCategory,
      name: 'עזרה בדקדוק',
      description: 'שאלות ותשובות על דקדוק',
      icon: BookOpen,
      color: 'bg-green-500',
      stats: { posts: 189, replies: 567, lastActivity: new Date() }
    },
    {
      id: 'pronunciation' as ForumCategory,
      name: 'הגייה',
      description: 'טיפים ושיטות לשיפור ההגייה',
      icon: TrendingUp,
      color: 'bg-purple-500',
      stats: { posts: 98, replies: 234, lastActivity: new Date() }
    },
    {
      id: 'culture' as ForumCategory,
      name: 'תרבות',
      description: 'למידה על תרבויות שונות',
      icon: Users,
      color: 'bg-orange-500',
      stats: { posts: 156, replies: 445, lastActivity: new Date() }
    },
    {
      id: 'resources' as ForumCategory,
      name: 'משאבים',
      description: 'שיתוף משאבי למידה',
      icon: BookOpen,
      color: 'bg-yellow-500',
      stats: { posts: 78, replies: 189, lastActivity: new Date() }
    },
    {
      id: 'success-stories' as ForumCategory,
      name: 'סיפורי הצלחה',
      description: 'חוויות והצלחות בלימוד שפות',
      icon: Award,
      color: 'bg-pink-500',
      stats: { posts: 67, replies: 123, lastActivity: new Date() }
    }
  ]

  const formatLastActivity = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (hours < 1) return 'לפני כמה דקות'
    if (hours < 24) return `לפני ${hours} שעות`
    return `לפני ${days} ימים`
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          קטגוריות פורום
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          בחר קטגוריה כדי לראות דיונים רלוונטיים
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selectedCategory === category.id
          
          return (
            <Card 
              key={category.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
              onClick={() => onCategorySelect?.(category.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${category.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">פוסטים:</span>
                    <span className="font-medium">{category.stats.posts}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">תגובות:</span>
                    <span className="font-medium">{category.stats.replies}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">פעילות אחרונה:</span>
                    <span className="font-medium">{formatLastActivity(category.stats.lastActivity)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Help */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg text-white">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                זקוק לעזרה?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                אם אתה לא בטוח איפה לפרסם את השאלה שלך, התחל בקטגוריה &quot;כללי&quot; או צור קשר עם המנהלים.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
