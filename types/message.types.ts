import { Document, Model } from 'mongoose'
import { Language } from './global'

export interface MessageAttachment {
    _id?: string
    type: 'text' | 'image' | 'audio' | 'video' | 'file'
    url: string
    filename: string
    size: number
}

export interface IMessage {
    senderId: string
    receiverId?: string
    groupId?: string
    content: string
    originalLanguage: Language
    translatedContent: Map<Language, string>
    type: 'text' | 'image' | 'audio' | 'video' | 'file'
    attachments: MessageAttachment[]
    isRead: boolean
    createdAt?: Date
    updatedAt?: Date
}

export interface IMessageDocument extends IMessage, Document {
    markAsRead(): Promise<IMessageDocument>
    addTranslation(language: Language, translation: string): Promise<IMessageDocument>
    getTranslation(language: Language): string
    addAttachment(attachment: MessageAttachment): Promise<IMessageDocument>
    removeAttachment(attachmentId: string): Promise<IMessageDocument>
}

export interface IMessageModel extends Model<IMessageDocument> {
    findBySender(senderId: string): Promise<IMessageDocument[]>
    findByReceiver(receiverId: string): Promise<IMessageDocument[]>
    findByGroup(groupId: string): Promise<IMessageDocument[]>
    findConversation(user1Id: string, user2Id: string): Promise<IMessageDocument[]>
    findUnread(userId: string): Promise<IMessageDocument[]>
    findUnreadInGroup(groupId: string, userId: string): Promise<IMessageDocument[]>
}
