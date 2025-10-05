import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { NotificationModel } from '@/models/Notification'
import { ApiResponse } from '@/types'

export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')
        const isRead = searchParams.get('isRead')
        const type = searchParams.get('type')
        const limit = parseInt(searchParams.get('limit') || '20')
        const page = parseInt(searchParams.get('page') || '1')

        if (!userId) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'User ID is required',
            }, { status: 400 })
        }

        const query: Record<string, unknown> = { userId }

        if (isRead !== null) {
            query.isRead = isRead === 'true'
        }

        if (type) {
            query.type = type
        }

        const skip = (page - 1) * limit

        const notifications = await NotificationModel.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)

        const total = await NotificationModel.countDocuments(query)
        const unreadCount = await NotificationModel.countDocuments({
            userId,
            isRead: false
        })

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                notifications,
                unreadCount,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                },
            },
            message: 'Notifications retrieved successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get notifications',
        }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const body = await request.json()
        const { userId, title, message, type, data } = body

        if (!userId || !title || !message || !type) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'User ID, title, message, and type are required',
            }, { status: 400 })
        }

        const notification = new NotificationModel({
            userId,
            title,
            message,
            type,
            data: data || {},
            isRead: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        await notification.save()

        return NextResponse.json<ApiResponse>({
            success: true,
            data: notification,
            message: 'Notification created successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create notification',
        }, { status: 500 })
    }
}


