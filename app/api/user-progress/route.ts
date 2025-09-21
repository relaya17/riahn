import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { UserProgressModel } from '@/models/UserProgress'
import { ApiResponse } from '@/types'

export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')
        const language = searchParams.get('language')

        if (!userId) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'User ID is required',
            }, { status: 400 })
        }

        let query: { userId: string; language?: string } = { userId }
        if (language) {
            query = { ...query, language }
        }

        const userProgress = await UserProgressModel.find(query)

        return NextResponse.json<ApiResponse>({
            success: true,
            data: userProgress,
            message: 'User progress retrieved successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get user progress',
        }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const body = await request.json()
        const { userId, language, level } = body

        if (!userId || !language || !level) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'User ID, language, and level are required',
            }, { status: 400 })
        }

        // Check if user progress already exists
        const existingProgress = await UserProgressModel.findOne({ userId, language })
        if (existingProgress) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'User progress already exists for this language',
            }, { status: 400 })
        }

        const userProgress = new UserProgressModel({
            userId,
            language,
            level,
            totalLessons: 0,
            completedLessons: 0,
            totalTimeSpent: 0,
            streak: 0,
            achievements: [],
            lastActivity: new Date(),
        })

        await userProgress.save()

        return NextResponse.json<ApiResponse>({
            success: true,
            data: userProgress,
            message: 'User progress created successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create user progress',
        }, { status: 500 })
    }
}


