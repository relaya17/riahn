import mongoose, { Schema, Document, Model } from 'mongoose'

// Achievement type
export interface Achievement {
    id: string
    name: string
    description: string
    icon: string
    unlockedAt?: Date
}

// IUserProgress interface
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

// Achievement Schema
const AchievementSchema = new Schema<Achievement>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    unlockedAt: { type: Date, default: Date.now }
}, { _id: false })

// UserProgress Schema
const UserProgressSchema = new Schema<IUserProgressDocument>({
    userId: { type: String, required: true, ref: 'User' },
    language: { type: String, enum: ['he', 'ar', 'en', 'si', 'ta'], required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'native'], required: true },
    totalLessons: { type: Number, default: 0, min: 0 },
    completedLessons: { type: Number, default: 0, min: 0 },
    totalTimeSpent: { type: Number, default: 0, min: 0 },
    streak: { type: Number, default: 0, min: 0 },
    achievements: [AchievementSchema],
    lastActivity: { type: Date, default: Date.now },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

// Virtuals
UserProgressSchema.virtual('progressPercentage').get(function (this: IUserProgressDocument) {
    return this.totalLessons ? Math.round((this.completedLessons / this.totalLessons) * 100) : 0
})
UserProgressSchema.virtual('timeSpentHours').get(function (this: IUserProgressDocument) {
    return Math.round(this.totalTimeSpent / 60 * 100) / 100
})
UserProgressSchema.virtual('averageTimePerLesson').get(function (this: IUserProgressDocument) {
    return this.completedLessons ? Math.round(this.totalTimeSpent / this.completedLessons) : 0
})
UserProgressSchema.virtual('completionRate').get(function (this: IUserProgressDocument) {
    return this.totalLessons ? Math.round((this.completedLessons / this.totalLessons) * 100) : 0
})

// Pre-save hook
UserProgressSchema.pre('save', function (this: IUserProgressDocument, next) {
    if (this.completedLessons > this.totalLessons) this.completedLessons = this.totalLessons
    this.lastActivity = new Date()
    next()
})

// Statics
UserProgressSchema.statics.findByUser = function (userId: string) {
    return this.find({ userId })
}
UserProgressSchema.statics.findByLanguage = function (language: string) {
    return this.find({ language })
}
UserProgressSchema.statics.findByLevel = function (level: string) {
    return this.find({ level })
}
UserProgressSchema.statics.findTopStreaks = function (limit: number = 10) {
    return this.find().sort({ streak: -1 }).limit(limit)
}

// Methods
UserProgressSchema.methods.completeLesson = function (this: IUserProgressDocument, timeSpent: number = 0) {
    this.completedLessons += 1
    this.totalTimeSpent += timeSpent
    this.lastActivity = new Date()
    return this.save()
}

UserProgressSchema.methods.addAchievement = function (this: IUserProgressDocument, achievement: Achievement) {
    this.achievements.push(achievement)
    return this.save()
}

// Export Model (with TS assertion to avoid "union too complex")
export const UserProgressModel: IUserProgressModel = mongoose.models.UserProgress
    ? (mongoose.models.UserProgress as unknown as IUserProgressModel)
    : mongoose.model<IUserProgressDocument, IUserProgressModel>('UserProgress', UserProgressSchema)

export default UserProgressModel
