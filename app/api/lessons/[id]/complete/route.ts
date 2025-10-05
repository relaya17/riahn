import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { LessonModel } from '@/models/Lesson'
import { UserProgressModel } from '@/models/UserProgress'
import { ApiResponse } from '@/types'

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const body = await request.json()
        const { userId, timeSpent, score } = body

        if (!userId) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'User ID is required',
            }, { status: 400 })
        }

        // Mark lesson as completed
        const lesson = await LessonModel.findById(params.id)
        if (!lesson) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Lesson not found',
            }, { status: 404 })
        }

        lesson.isCompleted = true
        lesson.progress = 100
        lesson.completedAt = new Date()
        if (score !== undefined) {
            lesson.score = score
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
                totalLessons: 1,
                completedLessons: 1,
                totalTimeSpent: timeSpent || 0,
                streak: 1,
                achievements: [],
            })
        } else {
            // Add lesson if not already added
            if (userProgress.totalLessons === 0) {
                userProgress.totalLessons = 1
            }

            // Update completion count
            userProgress.completedLessons += 1

            // Add time spent
            if (timeSpent) {
                userProgress.totalTimeSpent += timeSpent
            }

            // Update streak
            const today = new Date()
            const lastActivity = userProgress.lastActivity
            if (lastActivity) {
                const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))
                if (daysDiff === 1) {
                    userProgress.streak += 1
                } else if (daysDiff > 1) {
                    userProgress.streak = 1
                }
            } else {
                userProgress.streak = 1
            }
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
            message: 'Lesson completed successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to complete lesson',
        }, { status: 500 })
    }
}



