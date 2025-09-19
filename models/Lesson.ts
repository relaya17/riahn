import mongoose, { Document, Schema } from 'mongoose'

export interface ILesson extends Document {
    _id: string
    title: string
    description: string
    content: string
    language: string
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
    category: string
    tags: string[]
    duration: number // in minutes
    difficulty: number // 1-5
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
    createdAt: Date
    updatedAt: Date
}

const LessonSchema = new Schema<ILesson>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    difficulty: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalRatings: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    thumbnail: {
        type: String
    },
    audioUrl: {
        type: String
    },
    videoUrl: {
        type: String
    },
    exercises: [{
        type: {
            type: String,
            enum: ['multiple-choice', 'fill-blank', 'translation', 'listening'],
            required: true
        },
        question: {
            type: String,
            required: true
        },
        options: [{
            type: String
        }],
        correctAnswer: {
            type: String,
            required: true
        },
        explanation: {
            type: String
        }
    }]
}, {
    timestamps: true
})

export default mongoose.models.Lesson || mongoose.model<ILesson>('Lesson', LessonSchema)