import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import ForumPostModel from '@/models/ForumPost'
import { ApiResponse } from '@/types'

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const body = await request.json()
        const { content, authorId, parentId } = body

        if (!content || !authorId) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Content and author ID are required',
            }, { status: 400 })
        }

        const post = await ForumPostModel.findById(params.id)
        if (!post) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Forum post not found',
            }, { status: 404 })
        }

        // Create new comment
        const newComment = {
            _id: new (require('mongoose').Types.ObjectId)(),
            content,
            authorId,
            parentId: parentId || undefined,
            likes: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        // Add comment to post
        post.comments.push(newComment)
        await post.save()

        // Populate author info for the new comment
        await post.populate('comments.authorId', 'name profileImage')

        // Find the newly added comment
        const addedComment = post.comments.find((comment: { _id: { toString(): string } }) =>
            comment._id.toString() === newComment._id.toString()
        )

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                comment: addedComment,
                post: post,
            },
            message: 'Comment added successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to add comment',
        }, { status: 500 })
    }
}



