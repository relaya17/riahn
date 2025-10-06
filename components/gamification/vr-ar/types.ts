// Common types for VR/AR learning components

export interface VRScene {
  id: string
  name: string
  description: string
  language: string
  difficulty: 'easy' | 'medium' | 'hard'
  duration: number
  objectives: string[]
  rewards: string[]
  isCompleted: boolean
  progress: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  points: number
  isUnlocked: boolean
  unlockedAt?: Date
}

export interface PlayerStats {
  level: number
  xp: number
  xpToNext: number
  streak: number
  totalLessons: number
  accuracy: number
  speed: number
  achievements: Achievement[]
}

export interface VRSession {
  scene: VRScene
  startTime: Date
  endTime?: Date
  score: number
  mistakes: number
  timeSpent: number
  completed: boolean
}

export interface VRSettings {
  graphicsQuality: 'low' | 'medium' | 'high'
  soundEnabled: boolean
  voiceCommands: boolean
  hapticFeedback: boolean
  language: string
}
