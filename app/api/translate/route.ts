import { NextRequest, NextResponse } from 'next/server'

interface TranslateRequest {
    text: string
    sourceLanguage: string
    targetLanguage: string
    context?: string
    preserveFormatting?: boolean
    includePronunciation?: boolean
    includeCulturalNotes?: boolean
}

interface TranslateResponse {
    translatedText: string
    confidence: number
    pronunciation?: string
    culturalNotes?: string[]
    alternatives?: string[]
    detectedLanguage?: string
    processingTime: number
}

export async function POST(request: NextRequest) {
    try {
        const body: TranslateRequest = await request.json()
        const { text, sourceLanguage, targetLanguage, context, preserveFormatting, includePronunciation, includeCulturalNotes } = body

        if (!text || !sourceLanguage || !targetLanguage) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const startTime = Date.now()

        // AI-powered translation with context awareness
        const translation = await performAITranslation({
            text,
            sourceLanguage,
            targetLanguage,
            context,
            preserveFormatting,
            includePronunciation,
            includeCulturalNotes
        })

        const processingTime = Date.now() - startTime

        const response: TranslateResponse = {
            ...translation,
            processingTime
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error('Translation error:', error)
        return NextResponse.json(
            { error: 'Translation failed' },
            { status: 500 }
        )
    }
}

async function performAITranslation(params: TranslateRequest) {
    const { text, sourceLanguage, targetLanguage, context, includePronunciation, includeCulturalNotes } = params

    // Simulate AI translation with enhanced features
    const translations = {
        'he-ar': {
            'שלום': 'مرحبا',
            'תודה': 'شكرا',
            'בבקשה': 'من فضلك',
            'סליחה': 'آسف',
            'איך אתה?': 'كيف حالك؟',
            'אני בסדר': 'أنا بخير',
            'מה השעה?': 'كم الساعة؟',
            'איפה השירותים?': 'أين الحمام؟'
        },
        'ar-he': {
            'مرحبا': 'שלום',
            'شكرا': 'תודה',
            'من فضلك': 'בבקשה',
            'آسف': 'סליחה',
            'كيف حالك؟': 'איך אתה?',
            'أنا بخير': 'אני בסדר',
            'كم الساعة؟': 'מה השעה?',
            'أين الحمام؟': 'איפה השירותים?'
        },
        'he-en': {
            'שלום': 'Hello',
            'תודה': 'Thank you',
            'בבקשה': 'Please',
            'סליחה': 'Sorry',
            'איך אתה?': 'How are you?',
            'אני בסדר': 'I\'m fine',
            'מה השעה?': 'What time is it?',
            'איפה השירותים?': 'Where is the bathroom?'
        },
        'en-he': {
            'Hello': 'שלום',
            'Thank you': 'תודה',
            'Please': 'בבקשה',
            'Sorry': 'סליחה',
            'How are you?': 'איך אתה?',
            'I\'m fine': 'אני בסדר',
            'What time is it?': 'מה השעה?',
            'Where is the bathroom?': 'איפה השירותים?'
        }
    }

    const translationKey = `${sourceLanguage}-${targetLanguage}`
    const translationDict = translations[translationKey as keyof typeof translations] || {}

    // AI-powered translation logic
    let translatedText = text
    let confidence = 0.8
    let pronunciation = ''
    let culturalNotes: string[] = []
    let alternatives: string[] = []

    // Direct translation lookup
    if (translationDict[text]) {
        translatedText = translationDict[text]
        confidence = 0.95
    } else {
        // Simulate AI translation for unknown text
        translatedText = simulateAITranslation(text, sourceLanguage, targetLanguage)
        confidence = 0.75
    }

    // Add pronunciation if requested
    if (includePronunciation) {
        pronunciation = generatePronunciation(translatedText, targetLanguage)
    }

    // Add cultural notes if requested
    if (includeCulturalNotes) {
        culturalNotes = generateCulturalNotes(text, translatedText, sourceLanguage, targetLanguage)
    }

    // Generate alternatives
    alternatives = generateAlternatives(translatedText, targetLanguage)

    // Apply context-aware adjustments
    if (context) {
        const contextAdjusted = applyContextAdjustment(translatedText, context)
        if (contextAdjusted !== translatedText) {
            alternatives.unshift(contextAdjusted)
            translatedText = contextAdjusted
            confidence += 0.1
        }
    }

    return {
        translatedText,
        confidence: Math.min(confidence, 1.0),
        pronunciation,
        culturalNotes,
        alternatives: alternatives.slice(0, 3), // Limit to 3 alternatives
        detectedLanguage: sourceLanguage
    }
}

function simulateAITranslation(text: string, sourceLang: string, targetLang: string): string {
    // Simulate AI translation with language-specific patterns
    const patterns = {
        'he-ar': (t: string) => t.split('').reverse().join('') + ' (AI)',
        'ar-he': (t: string) => t.split('').reverse().join('') + ' (AI)',
        'he-en': (t: string) => `[EN] ${t} [AI Translation]`,
        'en-he': (t: string) => `[HE] ${t} [תרגום AI]`
    }

    const pattern = patterns[`${sourceLang}-${targetLang}` as keyof typeof patterns]
    return pattern ? pattern(text) : `[${targetLang.toUpperCase()}] ${text} [AI]`
}

function generatePronunciation(text: string, language: string): string {
    const pronunciations = {
        'ar': {
            'مرحبا': 'mar-ha-ban',
            'شكرا': 'shu-kran',
            'من فضلك': 'min fa-dlik'
        },
        'he': {
            'שלום': 'sha-lom',
            'תודה': 'to-da',
            'בבקשה': 'be-va-ka-sha'
        },
        'en': {
            'Hello': 'he-LO',
            'Thank you': 'THANK yoo',
            'Please': 'PLEEZ'
        }
    }

    return pronunciations[language as keyof typeof pronunciations]?.[text] || `[${language} pronunciation]`
}

function generateCulturalNotes(text: string, translated: string, sourceLang: string, targetLang: string): string[] {
    const notes: string[] = []

    // Add cultural context based on language pairs
    if (sourceLang === 'he' && targetLang === 'ar') {
        notes.push('בתרבות הערבית, חשוב להביע כבוד בפנייה לאנשים מבוגרים')
        notes.push('המילה "مرحبا" משמשת גם לפתיחת שיחה וגם לפרידה')
    } else if (sourceLang === 'ar' && targetLang === 'he') {
        notes.push('בעברית, נהוג להשתמש במילים רשמיות יותר במצבים פורמליים')
        notes.push('המילה "שלום" יכולה לשמש גם לפתיחה וגם לפרידה')
    }

    return notes
}

function generateAlternatives(text: string, language: string): string[] {
    // Generate alternative translations
    const alternatives = {
        'ar': [`${text} (بديل 1)`, `${text} (بديل 2)`],
        'he': [`${text} (אלטרנטיבה 1)`, `${text} (אלטרנטיבה 2)`],
        'en': [`${text} (alternative 1)`, `${text} (alternative 2)`]
    }

    return alternatives[language as keyof typeof alternatives] || []
}

function applyContextAdjustment(text: string, context: string): string {
    // Apply context-aware adjustments
    if (context.includes('formal')) {
        return `[Formal] ${text}`
    } else if (context.includes('casual')) {
        return `[Casual] ${text}`
    } else if (context.includes('business')) {
        return `[Business] ${text}`
    }

    return text
}