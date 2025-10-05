import { Document, Model } from 'mongoose'

export interface Achievement {
    id: string
    name: string
    description: string
    icon: string
    unlockedAt?: Date
}

export interface IUserProgress {
    userId: string
    language: 'he' | 'ar' | 'en' | 'si' | 'ta'
    level: 'beginner' | 'intermediate' | 'advanced' | 'native'
    totalLessons: number
    completedLessons: number
    totalTimeSpent: number
    streak: number
    achievements: Achievement[]
    lastActivity: Date
    createdAt?: Date
    updatedAt?: Date

    // Virtuals
    progressPercentage?: number
    timeSpentHours?: number
    averageTimePerLesson?: number
    completionRate?: number
}

// Document + Methods
export interface IUserProgressDocument extends IUserProgress, Document {
    completeLesson(timeSpent?: number): Promise<IUserProgressDocument>
    addAchievement(achievement: Achievement): Promise<IUserProgressDocument>
}

// Model + Statics
export interface IUserProgressModel extends Model<IUserProgressDocument> {
    findByUser(userId: string): Promise<IUserProgressDocument[]>
    findByLanguage(language: string): Promise<IUserProgressDocument[]>
    findByLevel(level: string): Promise<IUserProgressDocument[]>
    findTopStreaks(limit?: number): Promise<IUserProgressDocument[]>
}
