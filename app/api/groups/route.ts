import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { GroupModel } from '@/models/Group'
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

        const groups = await GroupModel.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .populate('adminId', 'name profileImage')
            .populate('members', 'name profileImage')

        const total = await GroupModel.countDocuments(query)

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
        const { name, description, adminId, language, type, isPrivate } = body

        if (!name || !adminId || !language) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Name, admin ID, and language are required',
            }, { status: 400 })
        }

        const group = new GroupModel({
            name,
            description: description || '',
            adminId,
            members: [adminId], // Admin is automatically a member
            language,
            type: type || 'learning',
            isPrivate: isPrivate || false,
            memberCount: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        await group.save()

        // Populate admin and members info
        await group.populate('adminId', 'name profileImage')
        await group.populate('members', 'name profileImage')

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



