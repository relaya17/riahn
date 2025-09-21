import mongoose, { Schema, Document } from 'mongoose'

export interface ILesson extends Document {
    title: string
    description: string
    content: string
    language: string
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    category: string
    tags: string[]
    duration: number
    difficulty: number
    rating: number
    totalRatings: number
    isPublished: boolean
    author: mongoose.Types.ObjectId
    thumbnail?: string
    audioUrl?: string
    videoUrl?: string
    exercises: {
        type: 'multiple-choice' | 'fill-blank' | 'translation' | 'listening'
        question: string
        options?: string[]
        correctAnswer: string
        explanation?: string
    }[]
}

export interface ILessonDocument extends ILesson { }

export interface ILessonModel extends mongoose.Model<ILessonDocument> { }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LessonSchema = new Schema<any>({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    language: { type: String, required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'], required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    duration: { type: Number, required: true, min: 1 },
    difficulty: { type: Number, min: 1, max: 5, default: 1 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalRatings: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    thumbnail: { type: String },
    audioUrl: { type: String },
    videoUrl: { type: String },
    exercises: [{
        type: { type: String, enum: ['multiple-choice', 'fill-blank', 'translation', 'listening'], required: true },
        question: { type: String, required: true },
        options: [{ type: String }],
        correctAnswer: { type: String, required: true },
        explanation: { type: String }
    }]
}, { timestamps: true })

// Indexes
LessonSchema.index({ language: 1, level: 1 })
LessonSchema.index({ category: 1 })
LessonSchema.index({ author: 1 })
LessonSchema.index({ isPublished: 1 })

export const LessonModel = mongoose.models.Lesson
    ? (mongoose.models.Lesson as unknown as ILessonModel)
    : mongoose.model<ILessonDocument, ILessonModel>('Lesson', LessonSchema)
export default LessonModel
