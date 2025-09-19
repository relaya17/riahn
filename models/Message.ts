import mongoose, { Schema, Document } from 'mongoose'
import { Message, MessageType, MessageAttachment, Language } from '@/types'

export interface IMessage extends Omit<Message, '_id'>, Document { }

const MessageAttachmentSchema = new Schema<MessageAttachment>({
    type: {
        type: String,
        enum: ['text', 'image', 'audio', 'video', 'file'],
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
}, { _id: false })

const MessageSchema = new Schema<IMessage>({
    senderId: {
        type: String,
        required: true,
        ref: 'User',
    },
    receiverId: {
        type: String,
        ref: 'User',
        default: null,
    },
    groupId: {
        type: String,
        ref: 'Group',
        default: null,
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
    },
    originalLanguage: {
        type: String,
        enum: ['he', 'ar', 'en', 'si', 'ta'],
        required: true,
    },
    translatedContent: {
        type: Map,
        of: String,
        default: new Map(),
    },
    type: {
        type: String,
        enum: ['text', 'image', 'audio', 'video', 'file'],
        default: 'text',
    },
    attachments: [MessageAttachmentSchema],
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
MessageSchema.index({ senderId: 1, createdAt: -1 })
MessageSchema.index({ receiverId: 1, createdAt: -1 })
MessageSchema.index({ groupId: 1, createdAt: -1 })
MessageSchema.index({ isRead: 1 })
MessageSchema.index({ createdAt: -1 })

// Virtual for message type
MessageSchema.virtual('messageType').get(function () {
    if (this.attachments && this.attachments.length > 0) {
        return this.attachments[0].type
    }
    return this.type
})

// Virtual for is group message
MessageSchema.virtual('isGroupMessage').get(function () {
    return !!this.groupId
})

// Pre-save middleware
MessageSchema.pre('save', function (next) {
    // Ensure either receiverId or groupId is set
    if (!this.receiverId && !this.groupId) {
        return next(new Error('Message must have either receiverId or groupId'))
    }

    // Ensure not both receiverId and groupId are set
    if (this.receiverId && this.groupId) {
        return next(new Error('Message cannot have both receiverId and groupId'))
    }

    next()
})

// Static methods
MessageSchema.statics.findBySender = function (senderId: string) {
    return this.find({ senderId }).sort({ createdAt: -1 })
}

MessageSchema.statics.findByReceiver = function (receiverId: string) {
    return this.find({ receiverId }).sort({ createdAt: -1 })
}

MessageSchema.statics.findByGroup = function (groupId: string) {
    return this.find({ groupId }).sort({ createdAt: -1 })
}

MessageSchema.statics.findConversation = function (user1Id: string, user2Id: string) {
    return this.find({
        $or: [
            { senderId: user1Id, receiverId: user2Id },
            { senderId: user2Id, receiverId: user1Id }
        ]
    }).sort({ createdAt: -1 })
}

MessageSchema.statics.findUnread = function (userId: string) {
    return this.find({ receiverId: userId, isRead: false }).sort({ createdAt: -1 })
}

MessageSchema.statics.findUnreadInGroup = function (groupId: string, userId: string) {
    return this.find({
        groupId,
        senderId: { $ne: userId },
        isRead: false
    }).sort({ createdAt: -1 })
}

// Instance methods
MessageSchema.methods.markAsRead = function () {
    this.isRead = true
    return this.save()
}

MessageSchema.methods.addTranslation = function (language: Language, translation: string) {
    this.translatedContent.set(language, translation)
    return this.save()
}

MessageSchema.methods.getTranslation = function (language: Language) {
    return this.translatedContent.get(language) || this.content
}

MessageSchema.methods.addAttachment = function (attachment: MessageAttachment) {
    this.attachments.push(attachment)
    return this.save()
}

MessageSchema.methods.removeAttachment = function (attachmentId: string) {
    this.attachments = this.attachments.filter((item: { _id: { toString(): string } }) => item._id.toString() !== attachmentId)
    return this.save()
}

// Export the model
export const MessageModel = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema)


