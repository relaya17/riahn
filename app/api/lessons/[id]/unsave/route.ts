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

        // Remove lesson from saved lessons
        const lesson = await LessonModel.findById(params.id)
        if (!lesson) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Lesson not found',
            }, { status: 404 })
        }

        // Check if lesson is saved
        if (!lesson.savedBy.includes(userId)) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Lesson is not saved',
            }, { status: 400 })
        }

        lesson.savedBy = lesson.savedBy.filter(id => id !== userId)
        await lesson.save()

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                lesson: lesson,
            },
            message: 'Lesson unsaved successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to unsave lesson',
        }, { status: 500 })
    }
}



