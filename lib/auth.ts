import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { Session } from 'next-auth'
import User, { IUser } from '@/models/User'
import { connectDB } from '@/lib/mongodb'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here'

export interface AuthUser {
    id: string
    _id: string
    email: string
    name: string
    avatar?: string
    profileImage?: string
    nativeLanguage: string
    learningLanguages: string[]
    currentLevel: string
    totalPoints: number
    streak: number
}

export function generateToken(user: IUser): string {
    return jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
        JWT_SECRET,
        { expiresIn: '7d' }
    )
}

export function verifyToken(token: string): { userId: string; email: string } | null {
    try {
        return jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
    } catch (error) {
        return null
    }
}

export async function getCurrentUserFromSession(session: Session | null): Promise<AuthUser | null> {
    if (!session?.user?.email) {
        return null
    }

    try {
        await connectDB()
        const user = await User.findOne({ email: session.user.email }).select('-password')

        if (!user) {
            return null
        }

        return {
            id: user._id.toString(),
            _id: user._id.toString(),
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            profileImage: user.avatar,
            nativeLanguage: user.nativeLanguage,
            learningLanguages: user.learningLanguages,
            currentLevel: user.currentLevel,
            totalPoints: user.totalPoints,
            streak: user.streak
        }
    } catch (dbError) {
        console.warn('Database connection failed, using mock user:', dbError)
        return null
    }
}

export async function getCurrentUser(request: NextRequest): Promise<AuthUser | null> {
    try {
        const token = request.cookies.get('auth-token')?.value

        if (!token) {
            return null
        }

        const decoded = verifyToken(token)
        if (!decoded) {
            return null
        }

        try {
            await connectDB()
            const user = await User.findById(decoded.userId).select('-password')

            if (!user) {
                return null
            }

            return {
                id: user._id.toString(),
                _id: user._id.toString(),
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                profileImage: user.avatar,
                nativeLanguage: user.nativeLanguage,
                learningLanguages: user.learningLanguages,
                currentLevel: user.currentLevel,
                totalPoints: user.totalPoints,
                streak: user.streak
            }
        } catch (dbError) {
            console.warn('Database connection failed, using mock user:', dbError)

            // Return mock user for development
            return {
                id: decoded.userId,
                _id: decoded.userId,
                email: decoded.email,
                name: 'Demo User',
                avatar: undefined,
                profileImage: undefined,
                nativeLanguage: 'he',
                learningLanguages: ['en', 'ar'],
                currentLevel: 'beginner',
                totalPoints: 0,
                streak: 0
            }
        }
    } catch (error) {
        console.error('Error getting current user:', error)
        return null
    }
}

export async function authenticateUser(email: string, password: string): Promise<{ user: AuthUser; token: string } | null> {
    try {
        await connectDB()
        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return null
        }

        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            return null
        }

        const token = generateToken(user)

        return {
            user: {
                id: user._id.toString(),
                _id: user._id.toString(),
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                profileImage: user.avatar,
                nativeLanguage: user.nativeLanguage,
                learningLanguages: user.learningLanguages,
                currentLevel: user.currentLevel,
                totalPoints: user.totalPoints,
                streak: user.streak
            },
            token
        }
    } catch (error) {
        console.error('Error authenticating user:', error)
        return null
    }
}

export async function createUser(userData: {
    email: string
    password: string
    name: string
    nativeLanguage: string
    learningLanguages: string[]
}): Promise<{ user: AuthUser; token: string } | null> {
    try {
        await connectDB()

        // Check if user already exists
        const existingUser = await User.findOne({ email: userData.email })
        if (existingUser) {
            return null
        }

        const user = new User(userData)
        await user.save()

        const token = generateToken(user)

        return {
            user: {
                id: user._id.toString(),
                _id: user._id.toString(),
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                profileImage: user.avatar,
                nativeLanguage: user.nativeLanguage,
                learningLanguages: user.learningLanguages,
                currentLevel: user.currentLevel,
                totalPoints: user.totalPoints,
                streak: user.streak
            },
            token
        }
    } catch (error) {
        console.error('Error creating user:', error)
        return null
    }
}

export async function resetPassword(email: string, newPassword: string): Promise<boolean> {
    try {
        await connectDB()
        const user = await User.findOne({ email })

        if (!user) {
            return false
        }

        user.password = newPassword
        await user.save()
        return true
    } catch (error) {
        console.error('Error resetting password:', error)
        return false
    }
}

// NextAuth configuration
export const authOptions = {
    providers: [],
    callbacks: {
        async jwt({ token, user }: { token: Record<string, unknown>; user: Record<string, unknown> }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }: { session: Record<string, unknown>; token: Record<string, unknown> }) {
            if (token && session.user) {
                (session.user as Record<string, unknown>).id = token.id
            }
            return session
        }
    }
}