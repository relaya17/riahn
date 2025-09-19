import mongoose, { Document, Schema } from 'mongoose'

export interface IForumReply extends Document {
    _id: string
    content: string
    author: mongoose.Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

export interface IForumPost extends Document {
    _id: string
    title: string
    content: string
    author: mongoose.Types.ObjectId
    category: string
    language: string
    tags: string[]
    likes: number
    replies: IForumReply[]
    views: number
    isPinned: boolean
    isLocked: boolean
    createdAt: Date
    updatedAt: Date
    lastReply?: Date
}

const ForumReplySchema = new Schema<IForumReply>({
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

const ForumPostSchema = new Schema<IForumPost>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    likes: {
        type: Number,
        default: 0
    },
    replies: [ForumReplySchema],
    views: {
        type: Number,
        default: 0
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    lastReply: {
        type: Date
    }
}, {
    timestamps: true
})

// Update lastReply when a reply is added
ForumPostSchema.pre('save', function (next) {
    if (this.replies && this.replies.length > 0) {
        const lastReply = this.replies[this.replies.length - 1]
        this.lastReply = lastReply.createdAt
    }
    next()
})

const ForumPostModel = mongoose.models.ForumPost || mongoose.model<IForumPost>('ForumPost', ForumPostSchema)

export { ForumPostModel }
export default ForumPostModel