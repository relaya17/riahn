import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { LessonModel } from '@/models/Lesson'
import { ApiResponse } from '@/types'
import mongoose from 'mongoose'

export const dynamic = 'force-dynamic'

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB()

        const body = await request.json()
        const { userId, rating, feedback } = body

        if (!userId || rating === undefined) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'User ID and rating are required',
            }, { status: 400 })
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Rating must be between 1 and 5',
            }, { status: 400 })
        }

        // Add rating to lesson
        const lesson = await LessonModel.findById(params.id)
        if (!lesson) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Lesson not found',
            }, { status: 404 })
        }

        // Check if user already rated this lesson
        const existingRating = lesson.ratings?.find(r => r.userId.toString() === userId)
        if (existingRating) {
            // Update existing rating
            existingRating.rating = rating
        } else {
            // Add new rating
            if (!lesson.ratings) {
                lesson.ratings = []
            }
            lesson.ratings.push({
                userId: new mongoose.Types.ObjectId(userId),
                rating
            })
        }

        // Calculate average rating
        const totalRating = lesson.ratings?.reduce((sum, r) => sum + r.rating, 0) || 0
        lesson.averageRating = lesson.ratings?.length ? totalRating / lesson.ratings.length : 0

        await lesson.save()

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                lesson: lesson,
                rating: {
                    userId,
                    rating,
                    feedback,
                },
            },
            message: 'Rating added successfully',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: (error as Error).message || 'Failed to add rating',
        }, { status: 500 })
    }
}



