import mongoose, { Schema, Document, Model } from 'mongoose';

// ---------------------- ForumReply Interface ----------------------
export interface IForumReply extends Document {
    content: string;
    author: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// ---------------------- ForumReply Schema ----------------------
const ForumReplySchema = new Schema<IForumReply>(
    {
        content: { type: String, required: true, trim: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    { timestamps: true }
);

// ---------------------- ForumReply Model ----------------------
export const ForumReplyModel: Model<IForumReply> = mongoose.models.ForumReply
    ? (mongoose.models.ForumReply as Model<IForumReply>)
    : mongoose.model<IForumReply>('ForumReply', ForumReplySchema);

export default ForumReplyModel;
