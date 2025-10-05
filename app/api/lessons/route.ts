import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Lesson from '@/models/Lesson'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)
        const language = searchParams.get('language')
        const level = searchParams.get('level')
        const category = searchParams.get('category')
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')

        const query: Record<string, unknown> = { isPublished: true }

        if (language) query.language = language
        if (level) query.level = level
        if (category) query.category = category

        const lessons = await Lesson.find(query)
            .populate('author', 'name avatar')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)

        const total = await Lesson.countDocuments(query)

        return NextResponse.json({
            lessons,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('Get lessons error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}