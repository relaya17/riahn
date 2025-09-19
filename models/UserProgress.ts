import mongoose, { Schema, Document } from 'mongoose'
import { UserProgress, Achievement, Language, LanguageLevel } from '@/types'

export interface IUserProgress extends Omit<UserProgress, '_id'>, Document { }

const AchievementSchema = new Schema<Achievement>({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    unlockedAt: {
        type: Date,
        default: Date.now,
    },
}, { _id: false })

const UserProgressSchema = new Schema<IUserProgress>({
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },
    language: {
        type: String,
        enum: ['he', 'ar', 'en', 'si', 'ta'],
        required: true,
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'native'],
        required: true,
    },
    totalLessons: {
        type: Number,
        default: 0,
        min: 0,
    },
    completedLessons: {
        type: Number,
        default: 0,
        min: 0,
    },
    totalTimeSpent: {
        type: Number,
        default: 0,
        min: 0,
    },
    streak: {
        type: Number,
        default: 0,
        min: 0,
    },
    achievements: [AchievementSchema],
    lastActivity: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

// Indexes for better performance
UserProgressSchema.index({ userId: 1, language: 1 }, { unique: true })
UserProgressSchema.index({ userId: 1 })
UserProgressSchema.index({ language: 1 })
UserProgressSchema.index({ level: 1 })
UserProgressSchema.index({ streak: -1 })
UserProgressSchema.index({ lastActivity: -1 })

// Virtual for progress percentage
UserProgressSchema.virtual('progressPercentage').get(function () {
    if (this.totalLessons === 0) return 0
    return Math.round((this.completedLessons / this.totalLessons) * 100)
})

// Virtual for time spent in hours
UserProgressSchema.virtual('timeSpentHours').get(function () {
    return Math.round(this.totalTimeSpent / 60 * 100) / 100
})

// Virtual for average time per lesson
UserProgressSchema.virtual('averageTimePerLesson').get(function () {
    if (this.completedLessons === 0) return 0
    return Math.round(this.totalTimeSpent / this.completedLessons)
})

// Virtual for completion rate
UserProgressSchema.virtual('completionRate').get(function () {
    if (this.totalLessons === 0) return 0
    return Math.round((this.completedLessons / this.totalLessons) * 100)
})

// Pre-save middleware
UserProgressSchema.pre('save', function (next) {
    // Ensure completed lessons don't exceed total lessons
    if (this.completedLessons > this.totalLessons) {
        this.completedLessons = this.totalLessons
    }

    // Update last activity
    this.lastActivity = new Date()

    next()
})

// Static methods
UserProgressSchema.statics.findByUser = function (userId: string) {
    return this.find({ userId }).sort({ language: 1 })
}

UserProgressSchema.statics.findByLanguage = function (language: Language) {
    return this.find({ language }).sort({ progressPercentage: -1 })
}

UserProgressSchema.statics.findByLevel = function (level: LanguageLevel) {
    return this.find({ level }).sort({ progressPercentage: -1 })
}

UserProgressSchema.statics.findTopPerformers = function (limit: number = 10) {
    return this.find().sort({ progressPercentage: -1 }).limit(limit)
}

UserProgressSchema.statics.findLongestStreaks = function (limit: number = 10) {
    return this.find().sort({ streak: -1 }).limit(limit)
}

UserProgressSchema.statics.findMostTimeSpent = function (limit: number = 10) {
    return this.find().sort({ totalTimeSpent: -1 }).limit(limit)
}

// Instance methods
UserProgressSchema.methods.addLesson = function () {
    this.totalLessons += 1
    return this.save()
}

UserProgressSchema.methods.completeLesson = function () {
    this.completedLessons += 1
    return this.save()
}

UserProgressSchema.methods.addTimeSpent = function (minutes: number) {
    this.totalTimeSpent += minutes
    return this.save()
}

UserProgressSchema.methods.incrementStreak = function () {
    this.streak += 1
    return this.save()
}

UserProgressSchema.methods.resetStreak = function () {
    this.streak = 0
    return this.save()
}

UserProgressSchema.methods.addAchievement = function (achievement: Achievement) {
    const existingAchievement = this.achievements.find(a => a.id === achievement.id)
    if (!existingAchievement) {
        this.achievements.push(achievement)
    }
    return this.save()
}

UserProgressSchema.methods.removeAchievement = function (achievementId: string) {
    this.achievements = this.achievements.filter(a => a.id !== achievementId)
    return this.save()
}

UserProgressSchema.methods.updateLevel = function (newLevel: LanguageLevel) {
    this.level = newLevel
    return this.save()
}

UserProgressSchema.methods.getAchievement = function (achievementId: string) {
    return this.achievements.find(a => a.id === achievementId)
}

UserProgressSchema.methods.hasAchievement = function (achievementId: string) {
    return this.achievements.some(a => a.id === achievementId)
}

// Export the model
export const UserProgressModel = mongoose.models.UserProgress || mongoose.model<IUserProgress>('UserProgress', UserProgressSchema)


