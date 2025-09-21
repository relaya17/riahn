import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { LessonModel } from '@/models/Lesson'
import { ApiResponse } from '@/types'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string; language: string } }
) {
    try {
        await connectDB()

        // Get lesson
        const lesson = await LessonModel.findById(params.id)
        if (!lesson) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Lesson not found',
            }, { status: 404 })
        }

        // Find translation
        const translation = lesson.translations?.[params.language]
        if (!translation) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Translation not found',
            }, { status: 404 })
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                translation: lesson.translations[params.language],
            },
            message: 'Translation retrieved successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to get translation',
        }, { status: 500 })
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string; language: string } }
) {
    try {
        await connectDB()

        const body = await request.json()
        const { content } = body

        if (!content) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Content is required',
            }, { status: 400 })
        }

        // Get lesson
        const lesson = await LessonModel.findById(params.id)
        if (!lesson) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Lesson not found',
            }, { status: 404 })
        }

        // Find and update translation
        const translation = lesson.translations?.[params.language]
        if (!translation) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Translation not found',
            }, { status: 404 })
        }

        lesson.translations[params.language] = content

        await lesson.save()

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                translation: lesson.translations[params.language],
            },
            message: 'Translation updated successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to update translation',
        }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string; language: string } }
) {
    try {
        await connectDB()

        // Get lesson
        const lesson = await LessonModel.findById(params.id)
        if (!lesson) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Lesson not found',
            }, { status: 404 })
        }

        // Find and remove translation
        if (!lesson.translations?.[params.language]) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Translation not found',
            }, { status: 404 })
        }

        delete lesson.translations[params.language]
        await lesson.save()

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                lesson: lesson,
            },
            message: 'Translation deleted successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to delete translation',
        }, { status: 500 })
    }
}