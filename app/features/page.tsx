'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AchievementSystem } from '@/components/gamification/achievement-system'
import { SocialFeed } from '@/components/social/social-feed'
import { AnalyticsDashboard } from '@/components/analytics/analytics-dashboard'
import { 
  Trophy, 
  Users, 
  BarChart3, 
  Star,
  MessageCircle,
  BookOpen,
  Globe,
  Zap
} from 'lucide-react'

type FeatureTab = 'achievements' | 'social' | 'analytics'

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<FeatureTab>('achievements')

  const tabs = [
    {
      id: 'achievements' as FeatureTab,
      name: 'מערכת הישגים',
      icon: Trophy,
      description: 'פתח הישגים וזכה בנקודות',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'social' as FeatureTab,
      name: 'פיד חברתי',
      icon: Users,
      description: 'שתף את ההתקדמות שלך',
      color: 'from-blue-400 to-purple-500'
    },
    {
      id: 'analytics' as FeatureTab,
      name: 'אנליטיקה',
      icon: BarChart3,
      description: 'צפה בסטטיסטיקות מפורטות',
      color: 'from-green-400 to-emerald-500'
    }
  ]

  const features = [
    {
      icon: Trophy,
      title: 'מערכת הישגים מתקדמת',
      description: 'פתח הישגים מיוחדים וזכה בנקודות על ההתקדמות שלך',
      benefits: ['נקודות על כל פעילות', 'הישגים נדירים ואגדיים', 'מערכת רמות', 'תגמולים מיוחדים']
    },
    {
      icon: Users,
      title: 'קהילה חברתית',
      description: 'התחבר עם לומדי שפות אחרים ושתף את המסע שלך',
      benefits: ['פיד חברתי', 'שיתוף הישגים', 'קבוצות למידה', 'מנטורים']
    },
    {
      icon: BarChart3,
      title: 'אנליטיקה מפורטת',
      description: 'צפה בהתקדמות שלך עם סטטיסטיקות מפורטות',
      benefits: ['מעקב התקדמות', 'סטטיסטיקות זמן אמת', 'דוחות מפורטים', 'המלצות מותאמות']
    },
    {
      icon: Globe,
      title: 'מפה גלובלית',
      description: 'ראה לומדי שפות מכל העולם והתחבר איתם',
      benefits: ['מיקום משתמשים', 'חיפוש לפי אזור', 'סטטיסטיקות גלובליות', 'חיבורים מקומיים']
    },
    {
      icon: MessageCircle,
      title: 'צ\'אט ללמידה',
      description: 'תרגל שפות עם דוברי שפת אם עם תרגום אוטומטי',
      benefits: ['תרגום בזמן אמת', 'הגייה נכונה', 'הערות תרבותיות', 'זיהוי רמת קושי']
    },
    {
      icon: Zap,
      title: 'AI מתקדם',
      description: 'כלי AI חכמים לתרגום, זיהוי שפה ושיפור טקסט',
      benefits: ['תרגום חכם', 'זיהוי שפה אוטומטי', 'שיפור טקסט', 'המלצות מותאמות']
    }
  ]

  const stats = [
    { label: 'משתמשים פעילים', value: '1,247', icon: Users, color: 'text-blue-500' },
    { label: 'הישגים נפתחו', value: '15,432', icon: Trophy, color: 'text-yellow-500' },
    { label: 'הודעות נשלחו', value: '89,567', icon: MessageCircle, color: 'text-green-500' },
    { label: 'שיעורים הושלמו', value: '23,891', icon: BookOpen, color: 'text-purple-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              תכונות מתקדמות
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            גלה את כל הכלים המתקדמים שיעזרו לך ללמוד שפות בצורה יעילה ומהנה
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardContent className="p-6 text-center">
                  <div className={`p-3 rounded-full w-fit mx-auto mb-2 ${stat.color.replace('text-', 'bg-').replace('-500', '-100')} dark:bg-opacity-20`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Feature Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {tab.name}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
            <CardTitle className="flex items-center gap-2">
              {tabs.find(tab => tab.id === activeTab)?.icon && (
                <>
                  {(() => {
                    const Icon = tabs.find(tab => tab.id === activeTab)!.icon
                    return <Icon className="h-6 w-6 text-blue-500" />
                  })()}
                  <span>{tabs.find(tab => tab.id === activeTab)?.name}</span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {activeTab === 'achievements' && <AchievementSystem />}
            {activeTab === 'social' && <SocialFeed />}
            {activeTab === 'analytics' && <AnalyticsDashboard />}
          </CardContent>
        </Card>

        {/* All Features Overview */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            כל התכונות שלנו
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">
                מוכן להתחיל את המסע שלך?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                הצטרף לאלפי לומדי שפות שכבר משתמשים בתכונות המתקדמות שלנו
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <BookOpen className="h-5 w-5 mr-2" />
                  התחל ללמוד
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Users className="h-5 w-5 mr-2" />
                  הצטרף לקהילה
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
