import mongoose, { Schema, Document, Model } from 'mongoose'

// ----------------- Interfaces -----------------
export interface INotification {
    userId: string
    type: 'lesson_completed' | 'new_message' | 'forum_reply' | 'achievement_unlocked' | 'friend_request' | 'group_invite'
    title: string
    message: string
    data?: Record<string, unknown>
    isRead: boolean
    createdAt?: Date
    updatedAt?: Date

    // Virtuals
    ageInDays?: number
    isRecent?: boolean
}

// Document עם Methods
export interface INotificationDocument extends INotification, Document {
    markAsRead(): Promise<INotificationDocument>
    markAsUnread(): Promise<INotificationDocument>
    updateData(newData: Record<string, unknown>): Promise<INotificationDocument>
}

// Model עם Statics
export interface INotificationModel extends Model<INotificationDocument> {
    findByUser(userId: string): Promise<INotificationDocument[]>
    findUnread(userId: string): Promise<INotificationDocument[]>
    findByType(type: string): Promise<INotificationDocument[]>
    findRecent(userId: string, days?: number): Promise<INotificationDocument[]>
    markAllAsRead(userId: string): Promise<void>
    deleteOld(days?: number): Promise<void>
}

// ----------------- Schema -----------------
const NotificationSchema = new Schema<INotificationDocument>(
    {
        userId: { type: String, required: true, ref: 'User' },
        type: {
            type: String,
            enum: ['lesson_completed', 'new_message', 'forum_reply', 'achievement_unlocked', 'friend_request', 'group_invite'],
            required: true
        },
        title: { type: String, required: true, trim: true, maxlength: 200 },
        message: { type: String, required: true, trim: true, maxlength: 500 },
        data: { type: Schema.Types.Mixed, default: {} },
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

// Indexes
NotificationSchema.index({ userId: 1, createdAt: -1 })
NotificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 })
NotificationSchema.index({ type: 1 })
NotificationSchema.index({ createdAt: -1 })

// Virtuals
NotificationSchema.virtual('ageInDays').get(function (this: INotificationDocument) {
    const now = new Date()
    const createdAt = this.createdAt || now
    return Math.ceil((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
})

NotificationSchema.virtual('isRecent').get(function (this: INotificationDocument) {
    const now = new Date()
    const createdAt = this.createdAt || now
    return (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60) < 24
})

// Pre-save
NotificationSchema.pre<INotificationDocument>('save', function (next) {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const createdAt = this.createdAt || new Date()
    if (createdAt < thirtyDaysAgo) return next(new Error('Notification is too old'))
    next()
})

// Statics
NotificationSchema.statics.findByUser = function (userId: string) {
    return this.find({ userId }).sort({ createdAt: -1 })
}

NotificationSchema.statics.findUnread = function (userId: string) {
    return this.find({ userId, isRead: false }).sort({ createdAt: -1 })
}

NotificationSchema.statics.findByType = function (type: string) {
    return this.find({ type }).sort({ createdAt: -1 })
}

NotificationSchema.statics.findRecent = function (userId: string, days: number = 7) {
    const date = new Date()
    date.setDate(date.getDate() - days)
    return this.find({ userId, createdAt: { $gte: date } }).sort({ createdAt: -1 })
}

NotificationSchema.statics.markAllAsRead = async function (userId: string) {
    await this.updateMany({ userId, isRead: false }, { isRead: true })
}

NotificationSchema.statics.deleteOld = async function (days: number = 30) {
    const date = new Date()
    date.setDate(date.getDate() - days)
    await this.deleteMany({ createdAt: { $lt: date } })
}

// Methods
NotificationSchema.methods.markAsRead = function () {
    this.isRead = true
    return this.save()
}

NotificationSchema.methods.markAsUnread = function () {
    this.isRead = false
    return this.save()
}

NotificationSchema.methods.updateData = function (newData: Record<string, unknown>) {
    this.data = { ...this.data, ...newData }
    return this.save()
}

// ----------------- Export Model -----------------
export const NotificationModel: INotificationModel =
    (mongoose.models.Notification as unknown as INotificationModel) ||
    mongoose.model<INotificationDocument, INotificationModel>('Notification', NotificationSchema)
