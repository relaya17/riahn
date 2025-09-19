import { NextRequest, NextResponse } from 'next/server'
import { createUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    try {
        const { email, password, name, nativeLanguage, learningLanguages } = await request.json()

        if (!email || !password || !name || !nativeLanguage || !learningLanguages) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            )
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters long' },
                { status: 400 }
            )
        }

        const result = await createUser({
            email,
            password,
            name,
            nativeLanguage,
            learningLanguages
        })

        if (!result) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 409 }
            )
        }

        const response = NextResponse.json({
            message: 'Registration successful',
            user: result.user
        })

        // Set HTTP-only cookie
        response.cookies.set('auth-token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 // 7 days
        })

        return response
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}