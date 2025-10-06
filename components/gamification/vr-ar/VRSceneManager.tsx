'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { Badge } from '@/components/core/badge'
import { Progress } from '@/components/core/progress'
import { Play, Eye, Clock, Target, Trophy } from 'lucide-react'
import { VRScene } from './types'

interface VRSceneManagerProps {
  scenes: VRScene[]
  onSceneSelect: (scene: VRScene) => void
  currentScene: VRScene | null
}

export function VRSceneManager({ scenes, onSceneSelect, currentScene }: VRSceneManagerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {scenes.map((scene) => (
        <Card key={scene.id} className={`cursor-pointer transition-all ${
          currentScene?.id === scene.id ? 'ring-2 ring-primary' : ''
        }`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{scene.name}</CardTitle>
            <div className="flex gap-2">
              <Badge variant={scene.difficulty === 'easy' ? 'secondary' : scene.difficulty === 'medium' ? 'default' : 'destructive'}>
                {scene.difficulty}
              </Badge>
              <Badge variant="outline">{scene.language.toUpperCase()}</Badge>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">{scene.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>{scene.duration} דקות</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4" />
                <span>{scene.objectives.length} מטרות</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4" />
                <span>{scene.rewards.length} פרסים</span>
              </div>
            </div>

            <Progress value={scene.progress} className="mb-3" />

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => onSceneSelect(scene)}
                className="flex-1"
              >
                <Play className="w-4 h-4 mr-2" />
                התחל
              </Button>

              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

