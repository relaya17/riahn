import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { NotificationModel } from '@/models/Notification'
import { ApiResponse } from '@/types'

export async function PUT(request: NextRequest) {
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

        // Mark all unread notifications as read for the user
        const result = await NotificationModel.updateMany(
            { userId, isRead: false },
            {
                isRead: true,
                updatedAt: new Date()
            }
        )

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                modifiedCount: result.modifiedCount,
            },
            message: `${result.modifiedCount} notifications marked as read`,
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to mark notifications as read',
        }, { status: 500 })
    }
}



