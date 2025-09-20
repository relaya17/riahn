import mongoose, { Schema } from 'mongoose'
import { IGroupDocument, IGroupModel, GroupMember } from '../types/group.types'

// Member Schema
const GroupMemberSchema = new Schema<GroupMember>(
    {
        userId: { type: String, required: true, ref: 'User' },
        role: { type: String, enum: ['member', 'admin', 'moderator'], default: 'member' },
        joinedAt: { type: Date, default: Date.now },
    },
    { _id: false }
)

// Group Schema
const GroupSchema = new Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 100 },
        description: { type: String, required: true, trim: true, maxlength: 500 },
        members: [GroupMemberSchema],
        messages: { type: [String], default: [] },
        maxMembers: { type: Number },
        isPrivate: { type: Boolean, default: false },
        createdBy: { type: String },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

// Indexes
GroupSchema.index({ createdAt: -1 })

// Virtuals
GroupSchema.virtual('memberCount').get(function (this: any) {
    return this.members.length
})

GroupSchema.virtual('isFull').get(function (this: any) {
    return this.maxMembers ? this.members.length >= this.maxMembers : false
})

GroupSchema.virtual('canJoin').get(function (this: any) {
    return !this.isPrivate && !(this.maxMembers ? this.members.length >= this.maxMembers : false)
})

// Statics
GroupSchema.statics.findByUser = function (userId: string) {
    return this.find({ 'members.userId': userId }).sort({ createdAt: -1 })
}

GroupSchema.statics.findPublic = function () {
    return this.find({ isPrivate: false }).sort({ createdAt: -1 })
}

GroupSchema.statics.findAvailable = function () {
    return this.find({
        isPrivate: false,
        $expr: { $lt: [{ $size: '$members' }, '$maxMembers'] },
    }).sort({ createdAt: -1 })
}

// Methods
GroupSchema.methods.addMember = async function (
    this: any,
    userId: string,
    role: 'member' | 'admin' | 'moderator' = 'member'
) {
    if (this.maxMembers && this.members.length >= this.maxMembers) throw new Error('Group is full')
    if (this.members.find((m: any) => m.userId === userId)) throw new Error('User is already a member')
    this.members.push({ userId, role, joinedAt: new Date() })
    return this.save()
}

GroupSchema.methods.removeMember = async function (this: any, userId: string) {
    if (userId === this.createdBy) throw new Error('Cannot remove group creator')
    this.members = this.members.filter((m: any) => m.userId !== userId)
    return this.save()
}

GroupSchema.methods.updateMemberRole = async function (
    this: any,
    userId: string,
    role: 'member' | 'admin' | 'moderator'
) {
    const member = this.members.find((m: any) => m.userId === userId)
    if (!member) throw new Error('User is not a member of this group')
    member.role = role
    return this.save()
}

GroupSchema.methods.isMember = function (this: any, userId: string) {
    return this.members.some((m: any) => m.userId === userId)
}

GroupSchema.methods.isAdmin = function (this: any, userId: string) {
    const m = this.members.find((m: any) => m.userId === userId)
    return m ? m.role === 'admin' || m.role === 'moderator' : false
}

GroupSchema.methods.canModerate = function (this: any, userId: string) {
    return this.isAdmin(userId) || userId === this.createdBy
}

GroupSchema.methods.addMessage = function (this: any, messageId: string) {
    this.messages.push(messageId)
    return this.save()
}

GroupSchema.methods.removeMessage = function (this: any, messageId: string) {
    this.messages = this.messages.filter((id: any) => id.toString() !== messageId)
    return this.save()
}

// Export Model (עם תיקון ל־TS)
// FIXED: Use type assertion to avoid TS `union too complex`
export const GroupModel = mongoose.models.Group
    ? (mongoose.models.Group as unknown as IGroupModel)
    : mongoose.model<IGroupDocument, IGroupModel>('Group', GroupSchema)

// Default export for convenience
export default GroupModel
