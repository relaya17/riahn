import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { GroupModel } from '@/models/Group'
import { ApiResponse } from '@/types'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const group = await GroupModel.findById(params.id)
            .populate('adminId', 'name profileImage')
            .populate('members', 'name profileImage')

        if (!group) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Group not found',
            }, { status: 404 })
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            data: group,
            message: 'Group retrieved successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to get group',
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
        const { name, description, isPrivate } = body

        const group = await GroupModel.findById(params.id)
        if (!group) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Group not found',
            }, { status: 404 })
        }

        // Update fields if provided
        if (name !== undefined) group.name = name
        if (description !== undefined) group.description = description
        if (isPrivate !== undefined) group.isPrivate = isPrivate

        group.updatedAt = new Date()
        await group.save()

        // Populate admin and members info
        await group.populate('adminId', 'name profileImage')
        await group.populate('members', 'name profileImage')

        return NextResponse.json<ApiResponse>({
            success: true,
            data: group,
            message: 'Group updated successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to update group',
        }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const group = await GroupModel.findByIdAndDelete(params.id)
        if (!group) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Group not found',
            }, { status: 404 })
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            data: group,
            message: 'Group deleted successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to delete group',
        }, { status: 500 })
    }
}



