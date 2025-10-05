import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Lesson from '@/models/Lesson'

export const dynamic = 'force-dynamic'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const lesson = await Lesson.findById(params.id)
            .populate('author', 'name avatar')

        if (!lesson) {
            return NextResponse.json(
                { error: 'Lesson not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ lesson })
    } catch (error) {
        console.error('Get lesson error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}