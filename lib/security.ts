import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Security configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'
const BCRYPT_ROUNDS = 12
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32)
const IV_LENGTH = 16

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100

// Security headers
export const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self' data:;
    connect-src 'self' https://api.firebase.com https://*.googleapis.com;
    frame-src 'none';
  `.replace(/\s+/g, ' ').trim()
}

// Password security
export class PasswordSecurity {
    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, BCRYPT_ROUNDS)
    }

    static async verifyPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }

    static validatePasswordStrength(password: string): {
        isValid: boolean
        score: number
        feedback: string[]
    } {
        const feedback: string[] = []
        let score = 0

        // Length check
        if (password.length < 8) {
            feedback.push('הסיסמה חייבת להכיל לפחות 8 תווים')
        } else {
            score += 1
        }

        // Uppercase check
        if (!/[A-Z]/.test(password)) {
            feedback.push('הסיסמה חייבת להכיל לפחות אות גדולה אחת')
        } else {
            score += 1
        }

        // Lowercase check
        if (!/[a-z]/.test(password)) {
            feedback.push('הסיסמה חייבת להכיל לפחות אות קטנה אחת')
        } else {
            score += 1
        }

        // Number check
        if (!/\d/.test(password)) {
            feedback.push('הסיסמה חייבת להכיל לפחות מספר אחד')
        } else {
            score += 1
        }

        // Special character check
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            feedback.push('הסיסמה חייבת להכיל לפחות תו מיוחד אחד')
        } else {
            score += 1
        }

        // Common password check
        const commonPasswords = [
            'password', '123456', '123456789', 'qwerty', 'abc123',
            'password123', 'admin', 'letmein', 'welcome', 'monkey'
        ]

        if (commonPasswords.includes(password.toLowerCase())) {
            feedback.push('הסיסמה נפוצה מדי')
            score -= 2
        }

        return {
            isValid: score >= 4,
            score: Math.max(0, score),
            feedback
        }
    }
}

// JWT Security
export class JWTSecurity {
    static generateToken(payload: Record<string, unknown>): string {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions)
    }

    static verifyToken(token: string): Record<string, unknown> | null {
        try {
            return jwt.verify(token, JWT_SECRET) as Record<string, unknown>
        } catch (error) {
            throw new Error('Invalid token')
        }
    }

    static decodeToken(token: string): Record<string, unknown> | null {
        return jwt.decode(token) as Record<string, unknown> | null
    }
}

// Data Encryption
export class DataEncryption {
    static encrypt(text: string): string {
        const iv = crypto.randomBytes(IV_LENGTH)
        const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY)
        let encrypted = cipher.update(text, 'utf8', 'hex')
        encrypted += cipher.final('hex')
        return iv.toString('hex') + ':' + encrypted
    }

    static decrypt(encryptedText: string): string {
        const textParts = encryptedText.split(':')
        textParts.shift() // Remove IV part (not used in this implementation)
        const encryptedData = textParts.join(':')
        const decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTION_KEY)
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
        decrypted += decipher.final('utf8')
        return decrypted
    }

    static hashData(data: string): string {
        return crypto.createHash('sha256').update(data).digest('hex')
    }
}

// Rate Limiting
export class RateLimiter {
    private static requests: Map<string, { count: number; resetTime: number }> = new Map()

    static checkLimit(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
        const now = Date.now()
        const userRequests = this.requests.get(identifier)

        if (!userRequests || now > userRequests.resetTime) {
            // Reset or create new entry
            this.requests.set(identifier, {
                count: 1,
                resetTime: now + RATE_LIMIT_WINDOW
            })
            return {
                allowed: true,
                remaining: RATE_LIMIT_MAX_REQUESTS - 1,
                resetTime: now + RATE_LIMIT_WINDOW
            }
        }

        if (userRequests.count >= RATE_LIMIT_MAX_REQUESTS) {
            return {
                allowed: false,
                remaining: 0,
                resetTime: userRequests.resetTime
            }
        }

        userRequests.count++
        return {
            allowed: true,
            remaining: RATE_LIMIT_MAX_REQUESTS - userRequests.count,
            resetTime: userRequests.resetTime
        }
    }

    static cleanup(): void {
        const now = Date.now()
        for (const [key, value] of this.requests.entries()) {
            if (now > value.resetTime) {
                this.requests.delete(key)
            }
        }
    }
}

// Input Sanitization
export class InputSanitizer {
    static sanitizeString(input: string): string {
        return input
            .trim()
            .replace(/[<>]/g, '') // Remove potential HTML tags
            .replace(/javascript:/gi, '') // Remove javascript: protocol
            .replace(/on\w+=/gi, '') // Remove event handlers
    }

    static sanitizeEmail(email: string): string {
        return email.toLowerCase().trim()
    }

    static sanitizeHTML(html: string): string {
        // Basic HTML sanitization - in production, use a proper library like DOMPurify
        return html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
            .replace(/on\w+="[^"]*"/gi, '')
            .replace(/javascript:/gi, '')
    }

    static validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    static validatePhoneNumber(phone: string): boolean {
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
        return phoneRegex.test(phone.replace(/[\s\-()]/g, ''))
    }
}

// Security Audit
export class SecurityAudit {
    static logSecurityEvent(event: string, details: Record<string, unknown>, severity: 'low' | 'medium' | 'high' = 'medium'): void {
        const logEntry = {
            timestamp: new Date().toISOString(),
            event,
            details,
            severity,
            ip: details.ip || 'unknown',
            userAgent: details.userAgent || 'unknown'
        }

        console.log(`[SECURITY ${severity.toUpperCase()}]`, logEntry)

        // In production, send to security monitoring service
        if (process.env.NODE_ENV === 'production') {
            // Send to security monitoring service (e.g., Sentry, DataDog, etc.)
        }
    }

    static detectSuspiciousActivity(userId: string, activity: string): boolean {
        // Simple suspicious activity detection
        const suspiciousPatterns = [
            /admin/i,
            /drop\s+table/i,
            /delete\s+from/i,
            /union\s+select/i,
            /script/i,
            /javascript/i
        ]

        return suspiciousPatterns.some(pattern => pattern.test(activity))
    }
}

// CSRF Protection
export class CSRFProtection {
    static generateToken(): string {
        return crypto.randomBytes(32).toString('hex')
    }

    static validateToken(token: string, sessionToken: string): boolean {
        return token === sessionToken
    }
}

// Session Security
export class SessionSecurity {
    static generateSessionId(): string {
        return crypto.randomBytes(32).toString('hex')
    }

    static validateSession(sessionId: string, userId: string): boolean {
        // In production, validate against database
        return Boolean(sessionId && userId)
    }

    static invalidateSession(sessionId: string): void {
        // In production, remove from database
        console.log(`Session invalidated: ${sessionId}`)
    }
}

// Cleanup expired rate limit entries every hour
setInterval(() => {
    RateLimiter.cleanup()
}, 60 * 60 * 1000)
