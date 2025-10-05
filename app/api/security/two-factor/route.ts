import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, Session } from 'next-auth'
import { authOptions, getCurrentUserFromSession } from '@/lib/auth'
import { SecurityAudit, RateLimiter } from '@/lib/security'

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession()
        const user = await getCurrentUserFromSession(session as Session | null)

        if (!user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Rate limiting
        const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
        const rateLimitResult = RateLimiter.checkLimit(`2fa-${clientIP}`)

        if (!rateLimitResult.allowed) {
            SecurityAudit.logSecurityEvent('2FA_RATE_LIMIT', {
                ip: clientIP,
                userId: user.id
            }, 'high')

            return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
        }

        const body = await request.json()
        const { action, code } = body

        if (!action || !code) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        if (!['enable', 'disable'].includes(action)) {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
        }

        // Validate 2FA code (in real app, use proper 2FA library like speakeasy)
        const isValidCode = validate2FACode(code, user.id)

        if (!isValidCode) {
            SecurityAudit.logSecurityEvent('INVALID_2FA_CODE', {
                ip: clientIP,
                userId: user.id,
                action
            }, 'medium')

            return NextResponse.json({ error: 'Invalid 2FA code' }, { status: 400 })
        }

        // In a real application, you would:
        // 1. Update user's 2FA status in database
        // 2. Generate and store backup codes
        // 3. Send confirmation email/SMS

        SecurityAudit.logSecurityEvent('2FA_TOGGLED', {
            ip: clientIP,
            userId: user.id,
            action,
            userAgent: request.headers.get('user-agent')
        }, 'medium')

        return NextResponse.json({
            success: true,
            message: `2FA ${action === 'enable' ? 'enabled' : 'disabled'} successfully`,
            twoFactorEnabled: action === 'enable'
        })

    } catch (error) {
        console.error('2FA toggle error:', error)
        SecurityAudit.logSecurityEvent('2FA_TOGGLE_ERROR', {
            error: error instanceof Error ? error.message : 'Unknown error'
        }, 'high')

        return NextResponse.json(
            { error: '2FA operation failed' },
            { status: 500 }
        )
    }
}

function validate2FACode(code: string, userId: string): boolean {
    // In a real application, you would:
    // 1. Use a proper 2FA library like speakeasy
    // 2. Validate against the user's secret key
    // 3. Check for time-based codes (TOTP) or counter-based codes (HOTP)

    // For demo purposes, accept any 6-digit code
    return /^\d{6}$/.test(code)
}
