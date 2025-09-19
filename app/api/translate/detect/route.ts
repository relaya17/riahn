import { NextRequest, NextResponse } from 'next/server'

interface DetectRequest {
    text: string
}

interface DetectResponse {
    language: string
    confidence: number
}

export async function POST(request: NextRequest) {
    try {
        const body: DetectRequest = await request.json()
        const { text } = body

        if (!text || !text.trim()) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 })
        }

        // Simple language detection based on character patterns
        const detectedLanguage = detectLanguage(text)

        const response: DetectResponse = {
            language: detectedLanguage.language,
            confidence: detectedLanguage.confidence
        }

        return NextResponse.json({
            success: true,
            data: response
        })
    } catch (error) {
        console.error('Language detection error:', error)
        return NextResponse.json(
            { error: 'Language detection failed' },
            { status: 500 }
        )
    }
}

function detectLanguage(text: string): { language: string; confidence: number } {
    // Hebrew detection
    if (/[\u0590-\u05FF]/.test(text)) {
        return { language: 'he', confidence: 0.95 }
    }

    // Arabic detection
    if (/[\u0600-\u06FF]/.test(text)) {
        return { language: 'ar', confidence: 0.95 }
    }

    // Sinhala detection
    if (/[\u0D80-\u0DFF]/.test(text)) {
        return { language: 'si', confidence: 0.95 }
    }

    // Tamil detection
    if (/[\u0B80-\u0BFF]/.test(text)) {
        return { language: 'ta', confidence: 0.95 }
    }

    // Chinese detection
    if (/[\u4E00-\u9FFF]/.test(text)) {
        return { language: 'zh', confidence: 0.90 }
    }

    // Japanese detection
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) {
        return { language: 'ja', confidence: 0.90 }
    }

    // Korean detection
    if (/[\uAC00-\uD7AF]/.test(text)) {
        return { language: 'ko', confidence: 0.90 }
    }

    // Hindi detection
    if (/[\u0900-\u097F]/.test(text)) {
        return { language: 'hi', confidence: 0.90 }
    }

    // Cyrillic detection (Russian)
    if (/[\u0400-\u04FF]/.test(text)) {
        return { language: 'ru', confidence: 0.85 }
    }

    // Latin-based languages detection
    const latinText = text.toLowerCase()

    // French common words
    if (/\b(le|la|les|de|du|des|un|une|et|ou|mais|pour|avec|sur|dans|par|est|sont|avoir|être|faire|aller|venir|voir|savoir|pouvoir|vouloir|devoir|falloir|valoir|pleuvoir|neiger)\b/.test(latinText)) {
        return { language: 'fr', confidence: 0.80 }
    }

    // Spanish common words
    if (/\b(el|la|los|las|de|del|un|una|y|o|pero|para|con|sobre|en|por|es|son|tener|ser|hacer|ir|venir|ver|saber|poder|querer|deber|llover|nevar)\b/.test(latinText)) {
        return { language: 'es', confidence: 0.80 }
    }

    // German common words
    if (/\b(der|die|das|den|dem|des|ein|eine|einen|einem|eines|und|oder|aber|für|mit|über|in|von|zu|ist|sind|haben|sein|machen|gehen|kommen|sehen|wissen|können|wollen|müssen|regnen|schneien)\b/.test(latinText)) {
        return { language: 'de', confidence: 0.80 }
    }

    // Italian common words
    if (/\b(il|la|lo|gli|le|di|del|della|dei|delle|un|una|e|o|ma|per|con|su|in|da|a|è|sono|avere|essere|fare|andare|venire|vedere|sapere|potere|volere|dovere|piovere|nevicare)\b/.test(latinText)) {
        return { language: 'it', confidence: 0.80 }
    }

    // Portuguese common words
    if (/\b(o|a|os|as|de|do|da|dos|das|um|uma|e|ou|mas|para|com|sobre|em|por|é|são|ter|ser|fazer|ir|vir|ver|saber|poder|querer|dever|chover|nevar)\b/.test(latinText)) {
        return { language: 'pt', confidence: 0.80 }
    }

    // Default to English for Latin script
    return { language: 'en', confidence: 0.70 }
}