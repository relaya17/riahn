'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { Badge } from '@/components/core/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/core/tabs'
import {
  Eye,
  Camera,
  Trophy,
  Target,
  Mic,
  CheckCircle,
  AlertCircle,
  Pause,
  Play,
  MicOff,
  X,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react'
import { VRSceneManager } from './vr-ar/VRSceneManager'
import { AchievementPanel } from './vr-ar/AchievementPanel'
import { vrScenes, achievements } from './vr-ar/vrData'
import { VRScene, PlayerStats, VRSettings } from './vr-ar/types'

export default function VRARLearning() {
  const [isVRMode, setIsVRMode] = useState(false)
  const [isARMode, setIsARMode] = useState(false)
  const [currentScene, setCurrentScene] = useState<VRScene | null>(null)
  const [activeTab, setActiveTab] = useState('scenes')
  const [settings, setSettings] = useState<VRSettings>({
    graphicsQuality: 'medium',
    soundEnabled: true,
    voiceCommands: true,
    hapticFeedback: false,
    language: 'he'
  })

  const playerStats: PlayerStats = {
    level: 12,
    xp: 2450,
    xpToNext: 500,
    streak: 7,
    totalLessons: 45,
    accuracy: 87,
    speed: 120,
    achievements: achievements.filter(a => a.isUnlocked)
  }

  const handleSceneSelect = (scene: VRScene) => {
    setCurrentScene(scene)
    setActiveTab('game')
  }

  const toggleVRMode = () => {
    setIsVRMode(!isVRMode)
    setIsARMode(false)
  }

  const toggleARMode = () => {
    setIsARMode(!isARMode)
    setIsVRMode(false)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">למידה ב-VR/AR</h1>
        <p className="text-muted-foreground">
          חווה למידת שפות בסביבה וירטואלית או רבודה
        </p>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-4">
          <Button
            variant={isVRMode ? 'default' : 'outline'}
            size="lg"
            onClick={toggleVRMode}
            className="flex items-center gap-2"
          >
            <Eye className="w-5 h-5" />
            מצב VR
          </Button>

          <Button
            variant={isARMode ? 'default' : 'outline'}
            size="lg"
            onClick={toggleARMode}
            className="flex items-center gap-2"
          >
            <Camera className="w-5 h-5" />
            מצב AR
          </Button>
        </div>
      </div>

      {/* Player Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            סטטיסטיקות שחקן
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{playerStats.level}</div>
              <div className="text-sm text-muted-foreground">רמה</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{playerStats.xp}</div>
              <div className="text-sm text-muted-foreground">נקודות</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{playerStats.streak}</div>
              <div className="text-sm text-muted-foreground">רצף</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{playerStats.accuracy}%</div>
              <div className="text-sm text-muted-foreground">דיוק</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scenes">סצנות זמינות</TabsTrigger>
          <TabsTrigger value="achievements">הישגים</TabsTrigger>
          <TabsTrigger value="settings">הגדרות</TabsTrigger>
        </TabsList>

        <TabsContent value="scenes" className="space-y-6">
          <VRSceneManager
            scenes={vrScenes}
            onSceneSelect={handleSceneSelect}
            currentScene={currentScene}
          />
        </TabsContent>

        <TabsContent value="achievements">
          <AchievementPanel achievements={achievements} />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                הגדרות VR/AR
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    איכות גרפיקה
                  </label>
                  <select
                    value={settings.graphicsQuality}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      graphicsQuality: e.target.value as any
                    }))}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="low">נמוכה</option>
                    <option value="medium">בינונית</option>
                    <option value="high">גבוהה</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="sound"
                    checked={settings.soundEnabled}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      soundEnabled: e.target.checked
                    }))}
                  />
                  <label htmlFor="sound" className="flex items-center gap-2">
                    {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    צלילים
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="voice"
                    checked={settings.voiceCommands}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      voiceCommands: e.target.checked
                    }))}
                  />
                  <label htmlFor="voice" className="flex items-center gap-2">
                    <Mic className="w-4 h-4" />
                    פקודות קוליות
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="haptic"
                    checked={settings.hapticFeedback}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      hapticFeedback: e.target.checked
                    }))}
                  />
                  <label htmlFor="haptic" className="flex items-center gap-2">
                    📳 משוב הפטי
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

