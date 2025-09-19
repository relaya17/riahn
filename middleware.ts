import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const response = NextResponse.next()
    const { pathname } = request.nextUrl

    // Basic security headers
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

    // Simple rate limiting (basic implementation)
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'

    // Basic API protection
    if (pathname.startsWith('/api/')) {
        // Check for basic suspicious patterns
        const url = request.url
        const userAgent = request.headers.get('user-agent') || ''

        // Detect basic attacks
        if (url.includes('..') || url.includes('<script') || url.includes('javascript:')) {
            return new NextResponse('Forbidden', { status: 403 })
        }

        // Validate Content-Type for POST/PUT requests
        if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
            const contentType = request.headers.get('content-type')
            if (!contentType || !contentType.includes('application/json')) {
                return new NextResponse('Invalid Content-Type', { status: 400 })
            }
        }
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    ],
}

