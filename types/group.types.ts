import { Document, Model } from 'mongoose'

export interface GroupMember {
    userId: string
    role: 'member' | 'admin' | 'moderator'
    joinedAt: Date
}

export interface IGroup {
    name: string
    description: string
    members: GroupMember[]
    messages: string[]
    maxMembers?: number
    isPrivate?: boolean
    createdBy?: string
    createdAt?: Date
    updatedAt?: Date

    // Virtuals
    memberCount?: number
    isFull?: boolean
    canJoin?: boolean
}

// Document + Methods
export interface IGroupDocument extends IGroup, Document {
    addMember(userId: string, role?: 'member' | 'admin' | 'moderator'): Promise<IGroupDocument>
    removeMember(userId: string): Promise<IGroupDocument>
    updateMemberRole(userId: string, role: 'member' | 'admin' | 'moderator'): Promise<IGroupDocument>
    isMember(userId: string): boolean
    isAdmin(userId: string): boolean
    canModerate(userId: string): boolean
    addMessage(messageId: string): Promise<IGroupDocument>
    removeMessage(messageId: string): Promise<IGroupDocument>
}

// Model + Statics
export interface IGroupModel extends Model<IGroupDocument> {
    findByUser(userId: string): Promise<IGroupDocument[]>
    findPublic(): Promise<IGroupDocument[]>
    findAvailable(): Promise<IGroupDocument[]>
}
