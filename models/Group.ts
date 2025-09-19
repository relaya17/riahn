import mongoose, { Schema, Document } from 'mongoose'
import { Group, GroupMember, Language, LanguageLevel } from '@/types'

export interface IGroup extends Omit<Group, '_id'>, Document { }

const GroupMemberSchema = new Schema<GroupMember>({
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },
    role: {
        type: String,
        enum: ['member', 'admin', 'moderator'],
        default: 'member',
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    },
}, { _id: false })

const GroupSchema = new Schema<IGroup>({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
    },
    language: {
        type: String,
        enum: ['he', 'ar', 'en', 'si', 'ta'],
        required: true,
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'native'],
        required: true,
    },
    members: [GroupMemberSchema],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
    }],
    isPublic: {
        type: Boolean,
        default: true,
    },
    maxMembers: {
        type: Number,
        default: 50,
        min: 2,
        max: 1000,
    },
    createdBy: {
        type: String,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

// Indexes for better performance
GroupSchema.index({ language: 1, level: 1 })
GroupSchema.index({ isPublic: 1 })
GroupSchema.index({ createdBy: 1 })
GroupSchema.index({ 'members.userId': 1 })
GroupSchema.index({ createdAt: -1 })

// Virtual for member count
GroupSchema.virtual('memberCount').get(function () {
    return this.members.length
})

// Virtual for is full
GroupSchema.virtual('isFull').get(function () {
    return this.members.length >= this.maxMembers
})

// Virtual for can join
GroupSchema.virtual('canJoin').get(function () {
    return this.isPublic && !this.isFull
})

// Pre-save middleware
GroupSchema.pre('save', function (next) {
    // Ensure creator is a member
    const creatorExists = this.members.some(member => member.userId === this.createdBy)
    if (!creatorExists) {
        this.members.push({
            userId: this.createdBy,
            role: 'admin',
            joinedAt: new Date(),
        })
    }

    next()
})

// Static methods
GroupSchema.statics.findByLanguage = function (language: Language) {
    return this.find({ language, isPublic: true }).sort({ createdAt: -1 })
}

GroupSchema.statics.findByLevel = function (level: LanguageLevel) {
    return this.find({ level, isPublic: true }).sort({ createdAt: -1 })
}

GroupSchema.statics.findPublic = function () {
    return this.find({ isPublic: true }).sort({ createdAt: -1 })
}

GroupSchema.statics.findByUser = function (userId: string) {
    return this.find({ 'members.userId': userId }).sort({ createdAt: -1 })
}

GroupSchema.statics.findAvailable = function () {
    return this.find({
        isPublic: true,
        $expr: { $lt: [{ $size: '$members' }, '$maxMembers'] }
    }).sort({ createdAt: -1 })
}

// Instance methods
GroupSchema.methods.addMember = function (userId: string, role: 'member' | 'admin' | 'moderator' = 'member') {
    if (this.isFull) {
        throw new Error('Group is full')
    }

    const existingMember = this.members.find(member => member.userId === userId)
    if (existingMember) {
        throw new Error('User is already a member')
    }

    this.members.push({
        userId,
        role,
        joinedAt: new Date(),
    })

    return this.save()
}

GroupSchema.methods.removeMember = function (userId: string) {
    if (userId === this.createdBy) {
        throw new Error('Cannot remove group creator')
    }

    this.members = this.members.filter(member => member.userId !== userId)
    return this.save()
}

GroupSchema.methods.updateMemberRole = function (userId: string, role: 'member' | 'admin' | 'moderator') {
    const member = this.members.find(member => member.userId === userId)
    if (!member) {
        throw new Error('User is not a member of this group')
    }

    member.role = role
    return this.save()
}

GroupSchema.methods.isMember = function (userId: string) {
    return this.members.some(member => member.userId === userId)
}

GroupSchema.methods.isAdmin = function (userId: string) {
    const member = this.members.find(member => member.userId === userId)
    return member && (member.role === 'admin' || member.role === 'moderator')
}

GroupSchema.methods.canModerate = function (userId: string) {
    return this.isAdmin(userId) || userId === this.createdBy
}

GroupSchema.methods.addMessage = function (messageId: string) {
    this.messages.push(messageId)
    return this.save()
}

GroupSchema.methods.removeMessage = function (messageId: string) {
    this.messages = this.messages.filter(id => id.toString() !== messageId)
    return this.save()
}

// Export the model
export const GroupModel = mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema)


