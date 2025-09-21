import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { ForumPostModel } from '@/models/ForumPost'
import { ApiResponse } from '@/types'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const post = await ForumPostModel.findById(params.id)
            .populate('authorId', 'name profileImage')
            .populate('comments.authorId', 'name profileImage')

        if (!post) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Forum post not found',
            }, { status: 404 })
        }

        // Increment view count
        post.views += 1
        await post.save()

        return NextResponse.json<ApiResponse>({
            success: true,
            data: post,
            message: 'Forum post retrieved successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get forum post',
        }, { status: 500 })
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const body = await request.json()
        const { title, content, category, tags, isPublished } = body

        const post = await ForumPostModel.findById(params.id)
        if (!post) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Forum post not found',
            }, { status: 404 })
        }

        // Update fields if provided
        if (title !== undefined) post.title = title
        if (content !== undefined) post.content = content
        if (category !== undefined) post.category = category
        if (tags !== undefined) post.tags = tags
        if (isPublished !== undefined) post.isPublished = isPublished

        post.updatedAt = new Date()
        await post.save()

        // Populate author info
        await post.populate('authorId', 'name profileImage')

        return NextResponse.json<ApiResponse>({
            success: true,
            data: post,
            message: 'Forum post updated successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update forum post',
        }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const post = await ForumPostModel.findByIdAndDelete(params.id)
        if (!post) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Forum post not found',
            }, { status: 404 })
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            data: post,
            message: 'Forum post deleted successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete forum post',
        }, { status: 500 })
    }
}



