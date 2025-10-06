'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Badge } from '@/components/core/badge'
import { Achievement } from './types'

interface AchievementPanelProps {
  achievements: Achievement[]
}

export function AchievementPanel({ achievements }: AchievementPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏆 הישגים
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border ${
                achievement.isUnlocked
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-muted border-muted-foreground/20 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{achievement.name}</h4>
                  <p className="text-xs text-muted-foreground mb-1">
                    {achievement.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant={achievement.isUnlocked ? 'default' : 'secondary'}>
                      {achievement.points} נקודות
                    </Badge>
                    {achievement.isUnlocked && achievement.unlockedAt && (
                      <span className="text-xs text-muted-foreground">
                        נפתח: {achievement.unlockedAt.toLocaleDateString('he-IL')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

