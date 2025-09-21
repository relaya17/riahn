import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { MessageModel } from '@/models/Message'
import { ApiResponse } from '@/types'

export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)
        const senderId = searchParams.get('senderId')
        const receiverId = searchParams.get('receiverId')
        const groupId = searchParams.get('groupId')
        const limit = parseInt(searchParams.get('limit') || '20')
        const page = parseInt(searchParams.get('page') || '1')

        let query = {}

        if (senderId && receiverId) {
            // Get messages between two users
            query = {
                $or: [
                    { senderId, receiverId },
                    { senderId: receiverId, receiverId: senderId }
                ]
            }
        } else if (groupId) {
            // Get group messages
            query = { groupId }
        } else if (senderId) {
            // Get all messages from a sender
            query = { senderId }
        }

        const skip = (page - 1) * limit

        const messages = await MessageModel.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .populate('senderId', 'name profileImage')
            .populate('receiverId', 'name profileImage')

        const total = await MessageModel.countDocuments(query)

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                messages,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                },
            },
            message: 'Messages retrieved successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get messages',
        }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const body = await request.json()
        const { senderId, receiverId, groupId, content, messageType, language } = body

        if (!senderId || !content) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Sender ID and content are required',
            }, { status: 400 })
        }

        if (!receiverId && !groupId) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Either receiver ID or group ID is required',
            }, { status: 400 })
        }

        const message = new MessageModel({
            senderId,
            receiverId,
            groupId,
            content,
            messageType: messageType || 'text',
            language: language || 'en',
            isRead: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        await message.save()

        // Populate sender and receiver info
        await message.populate('senderId', 'name profileImage')
        if (receiverId) {
            await message.populate('receiverId', 'name profileImage')
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            data: message,
            message: 'Message sent successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to send message',
        }, { status: 500 })
    }
}


