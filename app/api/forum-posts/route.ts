import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { ForumPostModel } from '@/models/ForumPost'
import { ApiResponse } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')
        const language = searchParams.get('language')
        const authorId = searchParams.get('authorId')
        const tags = searchParams.get('tags')
        const limit = parseInt(searchParams.get('limit') || '20')
        const page = parseInt(searchParams.get('page') || '1')

        const query: Record<string, unknown> = { isPublished: true }

        if (category) {
            query.category = category
        }

        if (language) {
            query.language = language
        }

        if (authorId) {
            query.authorId = authorId
        }

        if (tags) {
            const tagArray = tags.split(',')
            query.tags = { $in: tagArray }
        }

        const skip = (page - 1) * limit

        const posts = await ForumPostModel.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .populate('authorId', 'name profileImage')

        const total = await ForumPostModel.countDocuments(query)

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                posts,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                },
            },
            message: 'Forum posts retrieved successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get forum posts',
        }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const body = await request.json()
        const { title, content, authorId, category, language, tags } = body

        if (!title || !content || !authorId || !category || !language) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Title, content, author ID, category, and language are required',
            }, { status: 400 })
        }

        const post = new ForumPostModel({
            title,
            content,
            authorId,
            category,
            language,
            tags: tags || [],
            isPublished: true,
            views: 0,
            likes: [],
            comments: [],
            translations: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        await post.save()

        // Populate author info
        await post.populate('authorId', 'name profileImage')

        return NextResponse.json<ApiResponse>({
            success: true,
            data: post,
            message: 'Forum post created successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create forum post',
        }, { status: 500 })
    }
}


