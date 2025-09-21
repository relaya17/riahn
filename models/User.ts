import mongoose, { Document, Schema, Model, models } from 'mongoose'
import bcrypt from 'bcryptjs'

// Interface TypeScript למשתמש
export interface IUser extends Document {
    email: string
    password: string
    name: string
    avatar?: string
    bio?: string
    nativeLanguage: string
    learningLanguages: string[]
    currentLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'
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
    comparePassword(candidatePassword: string): Promise<boolean>
}

// Schema של Mongoose
const UserSchema: Schema<IUser> = new Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, minlength: 6 },
        name: { type: String, required: true, trim: true, maxlength: 50 },
        avatar: { type: String, default: null },
        bio: { type: String, maxlength: 500 },
        nativeLanguage: { type: String, required: true, default: 'en' },
        learningLanguages: [{ type: String, required: true }],
        currentLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'], default: 'beginner' },
        totalPoints: { type: Number, default: 0 },
        streak: { type: Number, default: 0 },
        lastActive: { type: Date, default: Date.now },
        isVerified: { type: Boolean, default: false },
        preferences: {
            theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
            notifications: { type: Boolean, default: true },
            language: { type: String, default: 'en' },
        },
        achievements: [{ type: String }]
    },
    { timestamps: true }
)

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

// Compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
}

// Remove password from JSON
UserSchema.methods.toJSON = function () {
    const obj = this.toObject()
    delete obj.password
    return obj
}

// בדיקה אם המודל כבר קיים (ב־Next.js זה מונע שגיאות Hot Reload)
const User: Model<IUser> = models.User || mongoose.model<IUser>('User', UserSchema)

export default User
