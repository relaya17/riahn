import { NextRequest, NextResponse } from 'next/server'
import { resetPassword } from '@/lib/auth'
import { ApiResponse } from '@/types'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email } = body

        if (!email) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Email is required',
            }, { status: 400 })
        }

        await resetPassword(email)

        return NextResponse.json<ApiResponse>({
            success: true,
            message: 'Password reset email sent',
        })
    } catch (error: unknown) {
        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Password reset failed',
        }, { status: 400 })
    }
}


