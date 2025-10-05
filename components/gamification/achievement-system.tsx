'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Trophy, 
  Star, 
  Target, 
  BookOpen, 
  MessageCircle,
  Users,
  Award,
  Zap,
  Crown,
  Flame,
  CheckCircle,
  Lock
} from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: 'learning' | 'social' | 'streak' | 'special'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  points: number
  unlocked: boolean
  progress: number
  maxProgress: number
  unlockedAt?: Date
  requirements: string[]
}

interface UserStats {
  totalPoints: number
  level: number
  currentLevelPoints: number
  nextLevelPoints: number
  streak: number
  totalLessons: number
  totalMessages: number
  totalFriends: number
  achievementsUnlocked: number
  totalAchievements: number
}

export function AchievementSystem() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'learning' | 'social' | 'streak' | 'special'>('all')
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false)

  useEffect(() => {
    // Mock achievements data
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'מתחיל חדש',
        description: 'השלמת השיעור הראשון',
        icon: Star,
        category: 'learning',
        rarity: 'common',
        points: 10,
        unlocked: true,
        progress: 1,
        maxProgress: 1,
        unlockedAt: new Date('2024-01-15'),
        requirements: ['השלם שיעור אחד']
      },
      {
        id: '2',
        title: 'רצף למידה',
        description: '7 ימים רצופים של למידה',
        icon: Flame,
        category: 'streak',
        rarity: 'rare',
        points: 50,
        unlocked: true,
        progress: 7,
        maxProgress: 7,
        unlockedAt: new Date('2024-01-20'),
        requirements: ['למד 7 ימים ברצף']
      },
      {
        id: '3',
        title: 'מתקדם',
        description: 'השלמת 10 שיעורים',
        icon: Target,
        category: 'learning',
        rarity: 'rare',
        points: 100,
        unlocked: true,
        progress: 10,
        maxProgress: 10,
        unlockedAt: new Date('2024-02-01'),
        requirements: ['השלם 10 שיעורים']
      },
      {
        id: '4',
        title: 'חברותי',
        description: 'שלח 100 הודעות',
        icon: MessageCircle,
        category: 'social',
        rarity: 'common',
        points: 25,
        unlocked: false,
        progress: 67,
        maxProgress: 100,
        requirements: ['שלח 100 הודעות']
      },
      {
        id: '5',
        title: 'מומחה שפה',
        description: 'השלמת 50 שיעורים',
        icon: Crown,
        category: 'learning',
        rarity: 'epic',
        points: 250,
        unlocked: false,
        progress: 23,
        maxProgress: 50,
        requirements: ['השלם 50 שיעורים']
      },
      {
        id: '6',
        title: 'מלך הרצף',
        description: '30 ימים רצופים של למידה',
        icon: Trophy,
        category: 'streak',
        rarity: 'legendary',
        points: 500,
        unlocked: false,
        progress: 7,
        maxProgress: 30,
        requirements: ['למד 30 ימים ברצף']
      },
      {
        id: '7',
        title: 'חבר חדש',
        description: 'הוסף 5 חברים',
        icon: Users,
        category: 'social',
        rarity: 'common',
        points: 30,
        unlocked: false,
        progress: 2,
        maxProgress: 5,
        requirements: ['הוסף 5 חברים']
      },
      {
        id: '8',
        title: 'חכם חצות',
        description: 'למד אחרי חצות',
        icon: Zap,
        category: 'special',
        rarity: 'rare',
        points: 75,
        unlocked: false,
        progress: 0,
        maxProgress: 1,
        requirements: ['למד אחרי חצות']
      }
    ]

    setAchievements(mockAchievements)

    // Mock user stats
    setUserStats({
      totalPoints: 160,
      level: 3,
      currentLevelPoints: 60,
      nextLevelPoints: 100,
      streak: 7,
      totalLessons: 23,
      totalMessages: 67,
      totalFriends: 2,
      achievementsUnlocked: 3,
      totalAchievements: 8
    })
  }, [])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50 dark:bg-gray-800'
      case 'rare': return 'border-blue-300 bg-blue-50 dark:bg-blue-900/20'
      case 'epic': return 'border-purple-300 bg-purple-50 dark:bg-purple-900/20'
      case 'legendary': return 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20'
      default: return 'border-gray-300 bg-gray-50 dark:bg-gray-800'
    }
  }

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'נפוץ'
      case 'rare': return 'נדיר'
      case 'epic': return 'אפי'
      case 'legendary': return 'אגדי'
      default: return 'לא ידוע'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'learning': return BookOpen
      case 'social': return Users
      case 'streak': return Flame
      case 'special': return Zap
      default: return Award
    }
  }
  void getCategoryIcon // Suppress unused variable warning

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'learning': return 'למידה'
      case 'social': return 'חברתי'
      case 'streak': return 'רצף'
      case 'special': return 'מיוחד'
      default: return 'כל הקטגוריות'
    }
  }
  void getCategoryLabel // Suppress unused variable warning

  const filteredAchievements = achievements.filter(achievement => {
    const categoryMatch = selectedCategory === 'all' || achievement.category === selectedCategory
    const unlockedMatch = !showUnlockedOnly || achievement.unlocked
    return categoryMatch && unlockedMatch
  })

  const categories = [
    { id: 'all', label: 'כל הקטגוריות', icon: Award },
    { id: 'learning', label: 'למידה', icon: BookOpen },
    { id: 'social', label: 'חברתי', icon: Users },
    { id: 'streak', label: 'רצף', icon: Flame },
    { id: 'special', label: 'מיוחד', icon: Zap }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Trophy className="h-6 w-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          מערכת הישגים
        </h2>
      </div>

      {/* User Stats */}
      {userStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full w-fit mx-auto mb-2">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                רמה {userStats.level}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {userStats.currentLevelPoints}/{userStats.nextLevelPoints} נקודות
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300 achievement-progress"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full w-fit mx-auto mb-2">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {userStats.totalPoints}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                נקודות סה&quot;כ
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full w-fit mx-auto mb-2">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {userStats.streak}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                ימי רצף
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-fit mx-auto mb-2">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {userStats.achievementsUnlocked}/{userStats.totalAchievements}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                הישגים נפתחו
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id as 'all' | 'learning' | 'social' | 'streak' | 'special')}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {category.label}
            </Button>
          )
        })}
        <Button
          variant={showUnlockedOnly ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowUnlockedOnly(!showUnlockedOnly)}
          className="flex items-center gap-2"
        >
          <CheckCircle className="h-4 w-4" />
          רק נפתחו
        </Button>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => {
          const Icon = achievement.icon
          const progressPercentage = (achievement.progress / achievement.maxProgress) * 100
          void progressPercentage // Suppress unused variable warning
          
          return (
            <Card
              key={achievement.id}
              className={`transition-all hover:shadow-lg ${
                achievement.unlocked 
                  ? getRarityColor(achievement.rarity)
                  : 'opacity-60'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                    {achievement.unlocked ? (
                      <Icon className="h-6 w-6 text-white" />
                    ) : (
                      <Lock className="h-6 w-6 text-gray-500" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-semibold ${
                        achievement.unlocked 
                          ? 'text-gray-900 dark:text-white' 
                          : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {achievement.points}
                        </span>
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-3 ${
                      achievement.unlocked 
                        ? 'text-gray-600 dark:text-gray-400' 
                        : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <span>התקדמות</span>
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 achievement-progress ${
                            achievement.unlocked
                              ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                              : 'bg-gradient-to-r from-blue-400 to-purple-500'
                          }`}
                        />
                      </div>
                    </div>
                    
                    {/* Rarity Badge */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        achievement.rarity === 'common' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                        achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                        achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {getRarityLabel(achievement.rarity)}
                      </span>
                      
                      {achievement.unlocked && achievement.unlockedAt && (
                        <span className="text-xs text-gray-500">
                          {achievement.unlockedAt.toLocaleDateString('he-IL')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Achievement Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            <span>דרישות הישגים</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.filter(a => !a.unlocked).map((achievement) => (
              <div key={achievement.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  {achievement.title}
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {achievement.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

