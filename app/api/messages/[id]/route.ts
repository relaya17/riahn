import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { MessageModel } from '@/models/Message'
import { ApiResponse } from '@/types'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const message = await MessageModel.findById(params.id)
            .populate('senderId', 'name profileImage')
            .populate('receiverId', 'name profileImage')

        if (!message) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Message not found',
            }, { status: 404 })
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            data: message,
            message: 'Message retrieved successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get message',
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
        const { content, isRead, translations } = body

        const message = await MessageModel.findById(params.id)
        if (!message) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Message not found',
            }, { status: 404 })
        }

        // Update fields if provided
        if (content !== undefined) message.content = content
        if (isRead !== undefined) message.isRead = isRead
        if (translations !== undefined) {
            // Update translated content
            Object.entries(translations).forEach(([language, translation]) => {
                message.translatedContent.set(language as any, String(translation))
            })
        }

        message.updatedAt = new Date()
        await message.save()

        // Populate sender and receiver info
        await message.populate('senderId', 'name profileImage')
        if (message.receiverId) {
            await message.populate('receiverId', 'name profileImage')
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            data: message,
            message: 'Message updated successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update message',
        }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const message = await MessageModel.findByIdAndDelete(params.id)
        if (!message) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Message not found',
            }, { status: 404 })
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            data: message,
            message: 'Message deleted successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete message',
        }, { status: 500 })
    }
}



