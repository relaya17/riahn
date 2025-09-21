import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { LessonModel } from '@/models/Lesson'
import { ApiResponse } from '@/types'

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const body = await request.json()
        const { userId } = body

        if (!userId) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'User ID is required',
            }, { status: 400 })
        }

        // Add lesson to saved lessons
        const lesson = await LessonModel.findById(params.id)
        if (!lesson) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Lesson not found',
            }, { status: 404 })
        }

        // Check if lesson is already saved
        if (lesson.savedBy.includes(userId)) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Lesson is already saved',
            }, { status: 400 })
        }

        lesson.savedBy.push(userId)
        await lesson.save()

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                lesson: lesson,
            },
            message: 'Lesson saved successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to save lesson',
        }, { status: 500 })
    }
}



