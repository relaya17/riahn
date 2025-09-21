import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { UserProgressModel } from '@/models/UserProgress'
import { ApiResponse } from '@/types'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const userProgress = await UserProgressModel.findById(params.id)
        if (!userProgress) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'User progress not found',
            }, { status: 404 })
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            data: userProgress,
            message: 'User progress retrieved successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to get user progress',
        }, { status: 500 })
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const body = await request.json()
        const { totalLessons, completedLessons, totalTimeSpent, streak, achievements } = body

        const userProgress = await UserProgressModel.findById(params.id)
        if (!userProgress) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'User progress not found',
            }, { status: 404 })
        }

        // Update fields if provided
        if (totalLessons !== undefined) userProgress.totalLessons = totalLessons
        if (completedLessons !== undefined) userProgress.completedLessons = completedLessons
        if (totalTimeSpent !== undefined) userProgress.totalTimeSpent = totalTimeSpent
        if (streak !== undefined) userProgress.streak = streak
        if (achievements !== undefined) userProgress.achievements = achievements

        userProgress.lastActivity = new Date()
        await userProgress.save()

        return NextResponse.json<ApiResponse>({
            success: true,
            data: userProgress,
            message: 'User progress updated successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to update user progress',
        }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const userProgress = await UserProgressModel.findByIdAndDelete(params.id)
        if (!userProgress) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'User progress not found',
            }, { status: 404 })
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            data: userProgress,
            message: 'User progress deleted successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to delete user progress',
        }, { status: 500 })
    }
}



