import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import mongoose, { Schema, Document, Model } from 'mongoose'
import { z } from 'zod'

// ----------------------
// 1. סכימת ולידציה עם Zod
// ----------------------
const ErrorSchemaZod = z.object({
    type: z.string().min(1, 'Type is required'),
    severity: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']),
    message: z.string().min(1, 'Message is required'),
    code: z.union([z.string(), z.number()]).optional(),
    details: z.record(z.string(), z.unknown()).optional(),
    timestamp: z.union([z.string().datetime(), z.date()]).optional(),
    userId: z.string().optional(),
    sessionId: z.string().optional(),
    url: z.string().url().optional(),
    userAgent: z.string().optional(),
    stack: z.string().optional(),
    resolved: z.boolean().optional(),
    resolvedAt: z.union([z.string().datetime(), z.date()]).optional(),
    resolvedBy: z.string().optional(),
})

// ----------------------
// 2. טיפוסים לתגובות API
// ----------------------
interface ValidationError {
    field: string
    message: string
}

interface ApiResponse<T = unknown> {
    success: boolean
    data?: T
    error?: string | ValidationError[]
    message?: string
}

interface ErrorCreateResponse {
    id: string
    message: string
}

// ----------------------
// 3. ממשק MongoDB
// ----------------------
export interface IError extends Document {
    type: string
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
    message: string
    code?: string | number
    details?: Record<string, unknown>
    timestamp: Date
    userId?: string
    sessionId?: string
    url?: string
    userAgent?: string
    stack?: string
    resolved: boolean
    resolvedAt?: Date | null
    resolvedBy?: string
}

// ----------------------
// 4. סכימת מונגו
// ----------------------
const ErrorSchema = new Schema<IError>(
    {
        type: { type: String, required: true },
        severity: { type: String, enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'], required: true },
        message: { type: String, required: true },
        code: Schema.Types.Mixed,
        details: Schema.Types.Mixed,
        timestamp: { type: Date, required: true },
        userId: String,
        sessionId: String,
        url: String,
        userAgent: String,
        stack: String,
        resolved: { type: Boolean, default: false },
        resolvedAt: Date,
        resolvedBy: String,
    },
    { timestamps: true }
)

const ErrorModel: Model<IError> =
    mongoose.models.Error || mongoose.model<IError>('Error', ErrorSchema)

// ----------------------
// 5. POST - יצירת שגיאה
// ----------------------
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
    try {
        await connectDB()
        const rawData = await request.json()

        const parsed = ErrorSchemaZod.safeParse(rawData)
        if (!parsed.success) {
            // החזרת שגיאות Zod בצורה מסודרת
            const formattedErrors: ValidationError[] = parsed.error.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message
            }))
            return NextResponse.json<ApiResponse>({
                success: false,
                error: formattedErrors
            }, { status: 400 })
        }

        const errorData = {
            ...parsed.data,
            timestamp: parsed.data.timestamp ? new Date(parsed.data.timestamp) : new Date(),
            resolved: parsed.data.resolved ?? false,
        }

        const error = new ErrorModel(errorData)
        await error.save()

        if (parsed.data.severity === 'CRITICAL') {
            console.error('🚨 CRITICAL ERROR:', parsed.data)
        }

        return NextResponse.json<ApiResponse>({
            success: true,
            data: {
                id: error._id.toString(),
                message: 'Error report saved successfully'
            }
        })
    } catch (err: unknown) {
        console.error('❌ Error saving error report:', err)
        return NextResponse.json<ApiResponse>({
            success: false,
            error: 'Failed to save error report',
            message: err instanceof Error ? err.message : 'Unknown error'
        }, { status: 500 })
    }
}

// ----------------------
// 6. GET - שליפת שגיאות
// ----------------------
export async function GET(request: NextRequest) {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '50', 10)
        const severity = searchParams.get('severity')
        const type = searchParams.get('type')
        const resolved = searchParams.get('resolved')

        const query: Record<string, unknown> = {}
        if (severity) query.severity = severity
        if (type) query.type = type
        if (resolved !== null) query.resolved = resolved === 'true'

        const errors: IError[] = await ErrorModel.find(query)
            .sort({ timestamp: -1 })
            .limit(limit)
            .lean()

        const stats = await ErrorModel.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    critical: { $sum: { $cond: [{ $eq: ['$severity', 'CRITICAL'] }, 1, 0] } },
                    high: { $sum: { $cond: [{ $eq: ['$severity', 'HIGH'] }, 1, 0] } },
                    medium: { $sum: { $cond: [{ $eq: ['$severity', 'MEDIUM'] }, 1, 0] } },
                    low: { $sum: { $cond: [{ $eq: ['$severity', 'LOW'] }, 1, 0] } },
                    resolved: { $sum: { $cond: ['$resolved', 1, 0] } },
                },
            },
        ])

        return NextResponse.json({
            errors,
            stats: stats[0] || {
                total: 0,
                critical: 0,
                high: 0,
                medium: 0,
                low: 0,
                resolved: 0,
            },
        })
    } catch (err: unknown) {
        console.error('❌ Error fetching errors:', err)
        return NextResponse.json({ error: 'Failed to fetch errors' }, { status: 500 })
    }
}

// ----------------------
// 7. PATCH - עדכון שגיאה
// ----------------------
export async function PATCH(request: NextRequest) {
    try {
        await connectDB()
        const { id, resolved, resolvedBy } = (await request.json()) as {
            id: string
            resolved?: boolean
            resolvedBy?: string
        }

        if (!id) {
            return NextResponse.json({ error: 'Error ID is required' }, { status: 400 })
        }

        const updateData: Partial<IError> = {}
        if (resolved !== undefined) {
            updateData.resolved = resolved
            updateData.resolvedAt = resolved ? new Date() : null
        }
        if (resolvedBy) {
            updateData.resolvedBy = resolvedBy
        }

        const error = await ErrorModel.findByIdAndUpdate(id, updateData, { new: true }).lean<IError | null>()

        if (!error) {
            return NextResponse.json({ error: 'Error not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, error })
    } catch (err: unknown) {
        console.error('❌ Error updating error:', err)
        return NextResponse.json({ error: 'Failed to update error' }, { status: 500 })
    }
}
