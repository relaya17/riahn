import mongoose, { Schema, Document } from 'mongoose'
import { Notification, NotificationType } from '@/types'

export interface INotification extends Omit<Notification, '_id'>, Document { }

const NotificationSchema = new Schema<INotification>({
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },
    type: {
        type: String,
        enum: ['lesson_completed', 'new_message', 'forum_reply', 'achievement_unlocked', 'friend_request', 'group_invite'],
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },
    data: {
        type: Schema.Types.Mixed,
        default: null,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

// Indexes for better performance
NotificationSchema.index({ userId: 1, createdAt: -1 })
NotificationSchema.index({ userId: 1, isRead: 1 })
NotificationSchema.index({ type: 1 })
NotificationSchema.index({ createdAt: -1 })

// Virtual for age in days
NotificationSchema.virtual('ageInDays').get(function () {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - this.createdAt.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

// Virtual for is recent
NotificationSchema.virtual('isRecent').get(function () {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - this.createdAt.getTime())
    const diffHours = diffTime / (1000 * 60 * 60)
    return diffHours < 24
})

// Pre-save middleware
NotificationSchema.pre('save', function (next) {
    // Auto-expire notifications older than 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    if (this.createdAt < thirtyDaysAgo) {
        return next(new Error('Notification is too old'))
    }

    next()
})

// Static methods
NotificationSchema.statics.findByUser = function (userId: string) {
    return this.find({ userId }).sort({ createdAt: -1 })
}

NotificationSchema.statics.findUnread = function (userId: string) {
    return this.find({ userId, isRead: false }).sort({ createdAt: -1 })
}

NotificationSchema.statics.findByType = function (type: NotificationType) {
    return this.find({ type }).sort({ createdAt: -1 })
}

NotificationSchema.statics.findRecent = function (userId: string, days: number = 7) {
    const date = new Date()
    date.setDate(date.getDate() - days)

    return this.find({
        userId,
        createdAt: { $gte: date }
    }).sort({ createdAt: -1 })
}

NotificationSchema.statics.markAllAsRead = function (userId: string) {
    return this.updateMany({ userId, isRead: false }, { isRead: true })
}

NotificationSchema.statics.deleteOld = function (days: number = 30) {
    const date = new Date()
    date.setDate(date.getDate() - days)

    return this.deleteMany({ createdAt: { $lt: date } })
}

// Instance methods
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

// Export the model
export const NotificationModel = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema)


