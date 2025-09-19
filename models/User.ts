import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
    _id: string
    email: string
    password: string
    name: string
    avatar?: string
    bio?: string
    nativeLanguage: string
    learningLanguages: string[]
    currentLevel: string
    totalPoints: number
    streak: number
    lastActive: Date
    isVerified: boolean
    preferences: {
        theme: 'light' | 'dark' | 'system'
        notifications: boolean
        language: string
    }
    achievements: string[]
    createdAt: Date
    updatedAt: Date
    comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        maxlength: 500
    },
    nativeLanguage: {
        type: String,
        required: true,
        default: 'en'
    },
    learningLanguages: [{
        type: String,
        required: true
    }],
    currentLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
        default: 'beginner'
    },
    totalPoints: {
        type: Number,
        default: 0
    },
    streak: {
        type: Number,
        default: 0
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    preferences: {
        theme: {
            type: String,
            enum: ['light', 'dark', 'system'],
            default: 'system'
        },
        notifications: {
            type: Boolean,
            default: true
        },
        language: {
            type: String,
            default: 'en'
        }
    },
    achievements: [{
        type: String
    }]
}, {
    timestamps: true
})

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(12)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error as Error)
    }
})

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
}

// Remove password from JSON output
UserSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.password
    return userObject
}

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)