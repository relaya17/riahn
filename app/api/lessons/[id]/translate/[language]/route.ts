import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
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
        const translation = lesson.translations.find(t => t.language === params.language)
        if (!translation) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Translation not found',
            }, { status: 404 })
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                translation: translation,
            },
            message: 'Translation retrieved successfully',
        })
    } catch (error: any) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error.message || 'Failed to get translation',
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
        const translation = lesson.translations.find(t => t.language === params.language)
        if (!translation) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Translation not found',
            }, { status: 404 })
        }

        translation.content = content
        translation.updatedAt = new Date()

        await lesson.save()

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                translation: translation,
            },
            message: 'Translation updated successfully',
        })
    } catch (error: any) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error.message || 'Failed to update translation',
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
        const translationIndex = lesson.translations.findIndex(t => t.language === params.language)
        if (translationIndex === -1) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Translation not found',
            }, { status: 404 })
        }

        lesson.translations.splice(translationIndex, 1)
        await lesson.save()

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                lesson: lesson,
            },
            message: 'Translation deleted successfully',
        })
    } catch (error: any) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error.message || 'Failed to delete translation',
        }, { status: 500 })
    }
}