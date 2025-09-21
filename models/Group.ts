import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IGroupMember {
    userId: string
    role: 'member' | 'admin' | 'moderator'
    joinedAt?: Date
}

export interface IGroup extends Document {
    name: string
    description: string
    members: IGroupMember[]
    messages: {
        senderId: string
        content: string
        timestamp: Date
    }[]
    maxMembers?: number
    memberCount?: number
    adminId?: string
    isPrivate: boolean
    createdBy: string
    createdAt: Date
    updatedAt: Date
}

const GroupMemberSchema = new Schema<IGroupMember>(
    {
        userId: { type: String, required: true, ref: 'User' },
        role: { type: String, enum: ['member', 'admin', 'moderator'], default: 'member' },
        joinedAt: { type: Date, default: Date.now },
    },
    { _id: false }
)

const MessageSchema = new Schema(
    {
        senderId: { type: String, required: true, ref: 'User' },
        content: { type: String, required: true, trim: true },
        timestamp: { type: Date, default: Date.now },
    },
    { _id: false }
)

const GroupSchema = new Schema<IGroup>(
    {
        name: { type: String, required: true, trim: true, maxlength: 100 },
        description: { type: String, required: true, trim: true, maxlength: 500 },
        members: { type: [GroupMemberSchema], default: [] },
        messages: { type: [MessageSchema], default: [] },
        maxMembers: { type: Number, default: 50 },
        memberCount: { type: Number, default: 0 },
        adminId: { type: String, ref: 'User' },
        isPrivate: { type: Boolean, default: false },
        createdBy: { type: String, required: true },
    },
    { timestamps: true }
)

// Indexים שימושיים
GroupSchema.index({ createdAt: -1 })
GroupSchema.index({ name: 1 })

// Singleton export למניעת שגיאות במודולים חמים
const Group: Model<IGroup> = mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema)
export const GroupModel = Group
export default Group