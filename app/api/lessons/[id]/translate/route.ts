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
        const { targetLanguage, content } = body

        if (!targetLanguage || !content) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Target language and content are required',
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

        // Check if translation already exists
        const existingTranslation = lesson.translations?.[targetLanguage]
        if (existingTranslation) {
            return NextResponse.json<ApiResponse>({
                success: true,
                data: {
                    translation: existingTranslation,
                },
                message: 'Translation already exists',
            })
        }

        // Add new translation
        if (!lesson.translations) {
            lesson.translations = {}
        }
        lesson.translations[targetLanguage] = content
        await lesson.save()

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                translation: lesson.translations[targetLanguage],
            },
            message: 'Translation added successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to add translation',
        }, { status: 500 })
    }
}



