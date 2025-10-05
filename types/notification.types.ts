import { Document, Model } from 'mongoose'

export type NotificationType = 'lesson_completed' | 'new_message' | 'forum_reply' | 'achievement_unlocked' | 'friend_request' | 'group_invite'

export interface INotification {
    userId: string
    type: NotificationType
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

// Document + Methods
export interface INotificationDocument extends INotification, Document {
    markAsRead(): Promise<INotificationDocument>
    markAsUnread(): Promise<INotificationDocument>
    updateData(newData: Record<string, unknown>): Promise<INotificationDocument>
}

// Model + Statics
export interface INotificationModel extends Model<INotificationDocument> {
    findByUser(userId: string): Promise<INotificationDocument[]>
    findUnread(userId: string): Promise<INotificationDocument[]>
    findByType(type: string): Promise<INotificationDocument[]>
    findRecent(userId: string, days?: number): Promise<INotificationDocument[]>
    markAllAsRead(userId: string): Promise<void>
    deleteOld(days?: number): Promise<void>
}
