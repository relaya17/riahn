import mongoose, { Schema, Model, Document } from 'mongoose';

// ---------------------- ForumReply ----------------------
export interface IForumReply extends Document {
    content: string;
    author: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ForumReplySchema = new Schema<IForumReply>({
    content: { type: String, required: true, trim: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const ForumReplyModel: Model<IForumReply> =
    mongoose.models.ForumReply as Model<IForumReply> ||
    mongoose.model<IForumReply>('ForumReply', ForumReplySchema);

// ---------------------- ForumPost ----------------------
export interface IForumPost extends Document {
    title: string;
    content: string;
    author: mongoose.Types.ObjectId;
    category: string;
    language: string;
    tags: string[];
    likes: mongoose.Types.ObjectId[];
    comments: mongoose.Types.ObjectId[];
    replies: mongoose.Types.ObjectId[];
    views: number;
    isPublished: boolean;
    isPinned: boolean;
    isLocked: boolean;
    lastReply?: Date;
    createdAt: Date;
    updatedAt: Date;

    addReply(replyId: string): Promise<void>;
    removeReply(replyId: string): Promise<void>;
}

const ForumPostSchema = new Schema<IForumPost>({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    language: { type: String, required: true },
    tags: [{ type: String }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'ForumReply' }],
    replies: [{ type: Schema.Types.ObjectId, ref: 'ForumReply' }],
    views: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    isPinned: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: false },
    lastReply: { type: Date }
}, { timestamps: true });

// Middleware לעדכון lastReply
ForumPostSchema.pre<IForumPost>('save', async function (next) {
    if (this.replies && this.replies.length > 0) {
        const lastReplyId = this.replies[this.replies.length - 1];
        const lastReply = await ForumReplyModel.findById(lastReplyId);
        if (lastReply) this.lastReply = lastReply.createdAt;
    }
    next();
});

// Instance methods
ForumPostSchema.methods.addReply = async function (replyId: string) {
    this.replies.push(replyId);
    await this.save();
};

ForumPostSchema.methods.removeReply = async function (replyId: string) {
    this.replies = this.replies.filter(id => id.toString() !== replyId);
    await this.save();
};

// Export model
export const ForumPostModel: Model<IForumPost> =
    mongoose.models.ForumPost
        ? (mongoose.models.ForumPost as unknown as Model<IForumPost>)
        : mongoose.model<IForumPost>('ForumPost', ForumPostSchema);

export default ForumPostModel;
