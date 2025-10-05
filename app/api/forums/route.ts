import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import ForumPost from '@/models/ForumPost'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')
        const language = searchParams.get('language')
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')

        const query: Record<string, unknown> = {}

        if (category) query.category = category
        if (language) query.language = language

        const posts = await ForumPost.find(query)
            .populate('author', 'name avatar')
            .populate('replies.author', 'name avatar')
            .sort({ isPinned: -1, createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)

        const total = await ForumPost.countDocuments(query)

        return NextResponse.json({
            posts,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('Get forum posts error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
