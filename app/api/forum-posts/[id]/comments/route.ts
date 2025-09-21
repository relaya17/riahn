import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import ForumPostModel from '@/models/ForumPost'
import { ApiResponse } from '@/types'
import mongoose from 'mongoose'

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const body = await request.json()
        const { content, authorId, parentId: _parentId } = body

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

        // Create new comment ID
        const newCommentId = new mongoose.Types.ObjectId()

        // Add comment to post
        post.comments.push(newCommentId)
        await post.save()

        // Populate author info for the new comment
        await post.populate('comments.authorId', 'name profileImage')

        // Find the newly added comment
        const addedComment = post.comments.find((comment: { _id: { toString(): string } }) =>
            comment._id.toString() === newCommentId.toString()
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



