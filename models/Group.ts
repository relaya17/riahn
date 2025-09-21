import mongoose, { Schema, Document, Types } from 'mongoose'

// ============================
// Data Interfaces (לשימוש בקוד)
// ============================

export interface GroupMember {
    userId: Types.ObjectId
    role: 'member' | 'admin' | 'moderator'
    joinedAt: Date
}

export interface IGroupMemberDocument extends GroupMember, Document { }

export interface Group {
    name: string
    description: string
    members: GroupMember[]
    messages: string[]
    maxMembers?: number
    isPrivate: boolean
    createdBy?: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

// ============================
// Mongoose Document Interfaces
// ============================

export interface IGroupDocument extends Group, Document { }

export interface IGroupModel extends mongoose.Model<IGroupDocument> { }

// ============================
// Subdocument Schema
// ============================

const GroupMemberSchema = new Schema<IGroupMemberDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        role: {
            type: String,
            enum: ['member', 'admin', 'moderator'],
            default: 'member',
            required: true,
        },
        joinedAt: { type: Date, default: Date.now },
    },
    { _id: false } // לא צור _id אוטומטי לכל member
)

// ============================
// Main Group Schema
// ============================

const GroupSchema = new Schema<IGroupDocument>(
    {
        name: { type: String, required: true, trim: true, maxlength: 100 },
        description: { type: String, required: true, trim: true, maxlength: 500 },
        members: { type: [GroupMemberSchema], default: [] },
        messages: { type: [String], default: [] },
        maxMembers: { type: Number },
        isPrivate: { type: Boolean, default: false },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
        toJSON: { virtuals: false }, // מונע מורכבות מיותרת
        toObject: { virtuals: false },
    }
)

// Index for faster queries
GroupSchema.index({ createdAt: -1 })

// ============================
// Export Model
// ============================

export const GroupModel = mongoose.models.Group
    ? (mongoose.models.Group as unknown as IGroupModel)
    : mongoose.model<IGroupDocument, IGroupModel>('Group', GroupSchema)
