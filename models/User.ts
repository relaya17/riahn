import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

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

export interface IUserDocument extends IUser {
    comparePassword(candidatePassword: string): Promise<boolean>
}

export interface IUserModel extends mongoose.Model<IUserDocument> { }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserSchema = new Schema<any>({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    name: { type: String, required: true, trim: true },
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
}, { timestamps: true })

// Hash password before saving
UserSchema.pre('save', async function (next) {
    const thisDoc = this as unknown as IUserDocument
    if (!thisDoc.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(12)
        thisDoc.password = await bcrypt.hash(thisDoc.password, salt)
        next()
    } catch (error) {
        next(error as Error)
    }
})

// Compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const thisDoc = this as unknown as IUserDocument
    return bcrypt.compare(candidatePassword, thisDoc.password)
}

// Remove password from JSON
UserSchema.methods.toJSON = function () {
    const obj = this.toObject()
    delete obj.password
    return obj
}

// Export Model (with TS assertion to avoid "union too complex")
export const UserModel = mongoose.models.User
    ? (mongoose.models.User as unknown as IUserModel)
    : mongoose.model<IUserDocument, IUserModel>('User', UserSchema)

export default UserModel
