import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { NotificationModel } from '@/models/Notification'
import { ApiResponse } from '@/types'

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const body = await request.json()
        const { isRead } = body

        const notification = await NotificationModel.findById(params.id)
        if (!notification) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Notification not found',
            }, { status: 404 })
        }

        // Update fields if provided
        if (isRead !== undefined) notification.isRead = isRead

        notification.updatedAt = new Date()
        await notification.save()

        return NextResponse.json<ApiResponse>({
            success: true,
            data: notification,
            message: 'Notification updated successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to update notification',
        }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const notification = await NotificationModel.findByIdAndDelete(params.id)
        if (!notification) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Notification not found',
            }, { status: 404 })
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            data: notification,
            message: 'Notification deleted successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to delete notification',
        }, { status: 500 })
    }
}


