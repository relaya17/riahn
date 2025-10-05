import mongoose, { Schema } from 'mongoose'
import { IMessageDocument, IMessageModel, MessageAttachment } from '../types/message.types'
import { Language } from '../types/global'

// ----------------------
// Re-export types for convenience
// ----------------------
export type { IMessageDocument, IMessageModel, MessageAttachment } from '../types/message.types'

// ----------------------
// Schemas
// ----------------------
const MessageAttachmentSchema = new Schema<MessageAttachment>(
    {
        type: { type: String, enum: ['text', 'image', 'audio', 'video', 'file'], required: true },
        url: { type: String, required: true },
        filename: { type: String, required: true },
        size: { type: Number, required: true },
    },
    { _id: true }
)

const MessageSchema = new Schema<IMessageDocument, IMessageModel>(
    {
        senderId: { type: String, required: true, ref: 'User' },
        receiverId: { type: String, ref: 'User', default: null },
        groupId: { type: String, ref: 'Group', default: null },
        content: { type: String, required: true, trim: true, maxlength: 2000 },
        originalLanguage: { type: String, enum: ['he', 'ar', 'en', 'si', 'ta'], required: true },
        translatedContent: { type: Map, of: String, default: {} },
        type: { type: String, enum: ['text', 'image', 'audio', 'video', 'file'], default: 'text' },
        attachments: [MessageAttachmentSchema],
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

// ----------------------
// Virtuals
// ----------------------
MessageSchema.virtual('messageType').get(function (this: IMessageDocument) {
    return this.attachments.length > 0 ? this.attachments[0].type : this.type
})

MessageSchema.virtual('isGroupMessage').get(function (this: IMessageDocument) {
    return !!this.groupId
})

// ----------------------
// Pre-save validation
// ----------------------
MessageSchema.pre('save', function (next) {
    if (!this.receiverId && !this.groupId) return next(new Error('Message must have either receiverId or groupId'))
    if (this.receiverId && this.groupId) return next(new Error('Message cannot have both receiverId and groupId'))
    next()
})

// ----------------------
// Statics
// ----------------------
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
    return this.find({ groupId, senderId: { $ne: userId }, isRead: false }).sort({ createdAt: -1 })
}

// ----------------------
// Methods
// ----------------------
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
    this.attachments = this.attachments.filter(att => att._id.toString() !== attachmentId)
    return this.save()
}

// ----------------------
// FIXED: Use type assertion to avoid TS `union too complex` error
export const MessageModel = mongoose.models.Message
    ? (mongoose.models.Message as unknown as IMessageModel)
    : mongoose.model<IMessageDocument, IMessageModel>('Message', MessageSchema)

// Default export for convenience
export default MessageModel
