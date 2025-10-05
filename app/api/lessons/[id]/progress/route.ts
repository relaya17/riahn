import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { LessonModel } from '@/models/Lesson'
import { UserProgressModel } from '@/models/UserProgress'
import { ApiResponse } from '@/types'

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const body = await request.json()
        const { userId, progress, timeSpent } = body

        if (!userId || progress === undefined) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'User ID and progress are required',
            }, { status: 400 })
        }

        // Update lesson progress
        const lesson = await LessonModel.findById(params.id)
        if (!lesson) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Lesson not found',
            }, { status: 404 })
        }

        lesson.progress = Math.min(Math.max(progress, 0), 100)
        if (lesson.progress >= 100) {
            lesson.isCompleted = true
        }
        await lesson.save()

        // Update user progress
        let userProgress = await UserProgressModel.findOne({
            userId,
            language: lesson.language
        })

        if (!userProgress) {
            userProgress = new UserProgressModel({
                userId,
                language: lesson.language,
                level: lesson.level,
                totalLessons: 0,
                completedLessons: 0,
                totalTimeSpent: 0,
                streak: 0,
                achievements: [],
            })
        }

        // Add lesson if not already added
        if (userProgress.totalLessons === 0) {
            userProgress.totalLessons = 1
        }

        // Update completion status
        if (lesson.isCompleted && lesson.progress === 100) {
            userProgress.completedLessons += 1
        }

        // Add time spent
        if (timeSpent) {
            userProgress.totalTimeSpent += timeSpent
        }

        // Update last activity
        userProgress.lastActivity = new Date()

        await userProgress.save()

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                lesson: lesson,
                userProgress: userProgress,
            },
            message: 'Progress updated successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to update progress',
        }, { status: 500 })
    }
}



