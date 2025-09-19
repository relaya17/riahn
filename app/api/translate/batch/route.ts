import { NextRequest, NextResponse } from 'next/server'
import { translateBatch } from '@/lib/translation'
import { ApiResponse, TranslationRequest, TranslationResponse } from '@/types'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { requests } = body as { requests: TranslationRequest[] }

        if (!requests || !Array.isArray(requests) || requests.length === 0) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Requests array is required and must not be empty',
            }, { status: 400 })
        }

        if (requests.length > 100) {
            return NextResponse.json<ApiResponse>({
                success: false,
                error: 'Maximum 100 requests allowed per batch',
            }, { status: 400 })
        }

        // Validate each request
        for (const req of requests) {
            if (!req.text || !req.sourceLanguage || !req.targetLanguage) {
                return NextResponse.json<ApiResponse>({
                    success: false,
                    error: 'Each request must have text, sourceLanguage, and targetLanguage',
                }, { status: 400 })
            }

            if (req.text.length > 1000) {
                return NextResponse.json<ApiResponse>({
                    success: false,
                    error: 'Each text must be maximum 1000 characters for batch translation',
                }, { status: 400 })
            }
        }

        const translationResults = await translateBatch(requests)

        return NextResponse.json<ApiResponse<TranslationResponse[]>>({
            success: true,
            data: translationResults,
            message: `${translationResults.length} translations completed successfully`,
        })
    } catch (error: unknown) {
        console.error('Batch translation API error:', error)

        return NextResponse.json<ApiResponse>({
            success: false,
            error: error instanceof Error ? error.message : 'Batch translation failed',
        }, { status: 500 })
    }
}


