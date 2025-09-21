'use client'

import { Card, CardContent } from '@/components/ui/card'
import { 
  Trophy, 
  Star, 
  Target, 
  Clock, 
  BookOpen, 
  Users,
  Award,
  Zap,
  Crown,
  Medal
} from 'lucide-react'

interface AchievementBadgeProps {
  achievement: {
    id: string
    name: string
    description: string
    icon: string
    category: 'learning' | 'social' | 'streak' | 'special'
    rarity: 'common' | 'rare' | 'epic' | 'legendary'
    unlockedAt?: Date
    progress?: number
    maxProgress?: number
  }
  isUnlocked: boolean
  onClick?: () => void
}

export function AchievementBadge({ achievement, isUnlocked, onClick }: AchievementBadgeProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return Trophy
      case 'star': return Star
      case 'target': return Target
      case 'clock': return Clock
      case 'book': return BookOpen
      case 'users': return Users
      case 'award': return Award
      case 'zap': return Zap
      case 'crown': return Crown
      case 'medal': return Medal
      default: return Trophy
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50 dark:bg-gray-800'
      case 'rare': return 'border-blue-300 bg-blue-50 dark:bg-blue-900/20'
      case 'epic': return 'border-purple-300 bg-purple-50 dark:bg-purple-900/20'
      case 'legendary': return 'border-orange-300 bg-orange-50 dark:bg-orange-900/20'
      default: return 'border-gray-300 bg-gray-50 dark:bg-gray-800'
    }
  }

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 dark:text-gray-400'
      case 'rare': return 'text-blue-600 dark:text-blue-400'
      case 'epic': return 'text-purple-600 dark:text-purple-400'
      case 'legendary': return 'text-orange-600 dark:text-orange-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'learning': return '📚'
      case 'social': return '👥'
      case 'streak': return '🔥'
      case 'special': return '⭐'
      default: return '🏆'
    }
  }

  const Icon = getIcon(achievement.icon)
  const progress = achievement.progress || 0
  const maxProgress = achievement.maxProgress || 1
  // const progressPercentage = Math.min((progress / maxProgress) * 100, 100)

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isUnlocked 
          ? getRarityColor(achievement.rarity) 
          : 'border-gray-200 bg-gray-50 dark:bg-gray-800 opacity-60'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            isUnlocked 
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
          }`}>
            <Icon className="h-5 w-5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-semibold text-sm ${
                isUnlocked 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {achievement.name}
              </h3>
              <span className="text-xs">
                {getCategoryIcon(achievement.category)}
              </span>
            </div>
            
            <p className={`text-xs ${
              isUnlocked 
                ? 'text-gray-600 dark:text-gray-400' 
                : 'text-gray-500 dark:text-gray-500'
            }`}>
              {achievement.description}
            </p>
            
            {!isUnlocked && achievement.progress !== undefined && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>התקדמות</span>
                  <span>{progress}/{maxProgress}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-300 achievement-progress"
                  />
                </div>
              </div>
            )}
            
            {isUnlocked && achievement.unlockedAt && (
              <p className={`text-xs mt-1 ${getRarityTextColor(achievement.rarity)}`}>
                נפתח ב-{new Date(achievement.unlockedAt).toLocaleDateString('he-IL')}
              </p>
            )}
          </div>
          
          <div className={`text-xs font-medium ${getRarityTextColor(achievement.rarity)}`}>
            {achievement.rarity.toUpperCase()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
