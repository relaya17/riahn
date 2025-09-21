import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Group, { IGroup } from '@/models/Group'
import { ApiResponse } from '@/types'

export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')
        const language = searchParams.get('language')
        const type = searchParams.get('type')
        const limit = parseInt(searchParams.get('limit') || '20')
        const page = parseInt(searchParams.get('page') || '1')

        let query = {}

        if (userId) {
            query = { members: userId }
        }

        if (language) {
            query = { ...query, language }
        }

        if (type) {
            query = { ...query, type }
        }

        const skip = (page - 1) * limit

        const groups: IGroup[] = await Group.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .populate('createdBy', 'name avatar')
            .populate('members.userId', 'name avatar')
            .lean()

        const total = await Group.countDocuments(query)

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                groups,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit),
                },
            },
            message: 'Groups retrieved successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get groups',
        }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const body = await request.json()
        const { name, description, adminId, language, type: _type, isPrivate } = body

        if (!name || !adminId || !language) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Name, admin ID, and language are required',
            }, { status: 400 })
        }

        const group = new Group({
            name,
            description: description || '',
            createdBy: adminId,
            members: [{ userId: adminId, role: 'admin', joinedAt: new Date() }],
            messages: [],
            isPrivate: isPrivate || false,
        })

        await group.save()

        // Populate createdBy and members info
        await group.populate('createdBy', 'name avatar')
        await group.populate('members.userId', 'name avatar')

        return NextResponse.json<ApiResponse>({
            success: true,
            data: group,
            message: 'Group created successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create group',
        }, { status: 500 })
    }
}



