import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User, { IUser } from '@/models/User'
import { ApiResponse } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        await connectDB() // מתחברים ל־MongoDB

        const { searchParams } = new URL(req.url)
        const language = searchParams.get('language')
        const level = searchParams.get('level')
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')

        const query: Record<string, unknown> = { isVerified: true }

        if (language) {
            query.learningLanguages = { $in: [language] }
        }
        if (level) {
            query.currentLevel = level
        }

        const skip = (page - 1) * limit

        const users: IUser[] = await User.find(query)
            .select('-password') // לא להחזיר סיסמה
            .sort({ lastActive: -1 })
            .skip(skip)
            .limit(limit)
            .lean()

        const total = await User.countDocuments(query)

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                users,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            },
            message: 'Users retrieved successfully'
        })
    } catch (error: unknown) {
        console.error('MongoDB error:', error)
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDB()

        const body = await req.json()
        const { email, password, name, nativeLanguage, learningLanguages } = body

        if (!email || !password || !name || !nativeLanguage || !learningLanguages) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Email, password, name, native language, and learning languages are required'
            }, { status: 400 })
        }

        // בדיקה אם המשתמש כבר קיים
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'User with this email already exists'
            }, { status: 409 })
        }

        const user = new User({
            email,
            password,
            name,
            nativeLanguage,
            learningLanguages,
            currentLevel: 'beginner',
            totalPoints: 0,
            streak: 0,
            isVerified: false,
            preferences: {
                theme: 'system',
                notifications: true,
                language: 'en'
            },
            achievements: []
        })

        await user.save()

        // לא להחזיר סיסמה
        const userResponse = user.toObject()
        delete userResponse.password

        return NextResponse.json<ApiResponse>({
            success: true,
            data: userResponse,
            message: 'User created successfully'
        }, { status: 201 })

    } catch (error: unknown) {
        console.error('Create user error:', error)
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create user'
        }, { status: 500 })
    }
}
