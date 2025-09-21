import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { GroupModel } from '@/models/Group'
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

        const group = await GroupModel.findById(params.id)
        if (!group) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Group not found',
            }, { status: 404 })
        }

        // Check if user is already a member
        if (group.members.includes(userId)) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'User is already a member of this group',
            }, { status: 400 })
        }

        // Add user to group
        group.members.push(userId)
        group.memberCount = group.members.length
        group.updatedAt = new Date()

        await group.save()

        // Populate admin and members info
        await group.populate('adminId', 'name profileImage')
        await group.populate('members', 'name profileImage')

        return NextResponse.json<ApiResponse>({
            success: true,
            data: group,
            message: 'User added to group successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to add user to group',
        }, { status: 500 })
    }
}

export async function DELETE(
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

        const group = await GroupModel.findById(params.id)
        if (!group) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Group not found',
            }, { status: 404 })
        }

        // Check if user is a member
        if (!group.members.includes(userId)) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'User is not a member of this group',
            }, { status: 400 })
        }

        // Cannot remove admin
        if (group.adminId.toString() === userId) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Cannot remove group admin',
            }, { status: 400 })
        }

        // Remove user from group
        group.members = group.members.filter(id => id.toString() !== userId)
        group.memberCount = group.members.length
        group.updatedAt = new Date()

        await group.save()

        // Populate admin and members info
        await group.populate('adminId', 'name profileImage')
        await group.populate('members', 'name profileImage')

        return NextResponse.json<ApiResponse>({
            success: true,
            data: group,
            message: 'User removed from group successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to remove user from group',
        }, { status: 500 })
    }
}



