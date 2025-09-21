import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { ForumPostModel } from '@/models/ForumPost'
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

        const post = await ForumPostModel.findById(params.id)
        if (!post) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Forum post not found',
            }, { status: 404 })
        }

        // Check if user already liked the post
        const hasLiked = post.likes.includes(userId)

        if (hasLiked) {
            // Unlike the post
            post.likes = post.likes.filter(id => id !== userId)
        } else {
            // Like the post
            post.likes.push(userId)
        }

        await post.save()

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                post: post,
                action: hasLiked ? 'unliked' : 'liked',
                likesCount: post.likes.length,
            },
            message: `Post ${hasLiked ? 'unliked' : 'liked'} successfully`,
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to like/unlike post',
        }, { status: 500 })
    }
}



