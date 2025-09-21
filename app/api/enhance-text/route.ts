import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

interface EnhanceTextRequest {
    text: string
    enhancementType: string
    language: string
}

interface EnhancementResult {
    originalText: string
    enhancedText: string
    improvements: string[]
    suggestions: string[]
    readabilityScore: number
    processingTime: number
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession()
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body: EnhanceTextRequest = await request.json()
        const { text, enhancementType, language } = body

        if (!text || !enhancementType || !language) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const startTime = Date.now()

        // AI-powered text enhancement
        const result = await performTextEnhancement({
            text,
            enhancementType,
            language
        })

        const processingTime = Date.now() - startTime

        const response: EnhancementResult = {
            ...result,
            processingTime
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error('Text enhancement error:', error)
        return NextResponse.json(
            { error: 'Text enhancement failed' },
            { status: 500 }
        )
    }
}

async function performTextEnhancement(params: EnhanceTextRequest) {
    const { text, enhancementType, language } = params

    // Simulate AI text enhancement
    const enhancements = {
        grammar: {
            he: {
                'אני הולך לבית': 'אני הולך לבית.',
                'מה השעה': 'מה השעה?',
                'זה טוב מאוד': 'זה טוב מאוד!'
            },
            ar: {
                'أنا أذهب إلى البيت': 'أنا أذهب إلى البيت.',
                'كم الساعة': 'كم الساعة؟',
                'هذا جيد جدا': 'هذا جيد جداً!'
            },
            en: {
                'i am going home': 'I am going home.',
                'what time is it': 'What time is it?',
                'this is very good': 'This is very good!'
            }
        },
        style: {
            he: {
                'זה טוב': 'זה מצוין',
                'אני אוהב את זה': 'אני מאוד אוהב את זה',
                'זה קשה': 'זה מאתגר'
            },
            ar: {
                'هذا جيد': 'هذا ممتاز',
                'أحب هذا': 'أحب هذا كثيراً',
                'هذا صعب': 'هذا تحدي'
            },
            en: {
                'this is good': 'this is excellent',
                'i like this': 'i really like this',
                'this is hard': 'this is challenging'
            }
        },
        clarity: {
            he: {
                'זה דבר': 'זה חפץ',
                'אני עושה משהו': 'אני מבצע פעולה',
                'זה קורה': 'זה מתרחש'
            },
            ar: {
                'هذا شيء': 'هذا جسم',
                'أفعل شيئاً': 'أقوم بعمل',
                'هذا يحدث': 'هذا يقع'
            },
            en: {
                'this thing': 'this object',
                'i do something': 'i perform an action',
                'this happens': 'this occurs'
            }
        },
        formal: {
            he: {
                'שלום': 'שלום רב',
                'תודה': 'תודה רבה',
                'בבקשה': 'אנא'
            },
            ar: {
                'مرحبا': 'السلام عليكم',
                'شكرا': 'شكراً جزيلاً',
                'من فضلك': 'أرجوك'
            },
            en: {
                'hello': 'good day',
                'thanks': 'thank you very much',
                'please': 'kindly'
            }
        },
        casual: {
            he: {
                'שלום רב': 'היי',
                'תודה רבה': 'תודה',
                'אנא': 'בבקשה'
            },
            ar: {
                'السلام عليكم': 'أهلاً',
                'شكراً جزيلاً': 'شكراً',
                'أرجوك': 'من فضلك'
            },
            en: {
                'good day': 'hey',
                'thank you very much': 'thanks',
                'kindly': 'please'
            }
        }
    }

    const languageEnhancements = enhancements[enhancementType as keyof typeof enhancements]?.[language as keyof typeof enhancements.grammar] || {}

    let enhancedText = text
    const improvements: string[] = []
    const suggestions: string[] = []

    // Apply enhancements
    for (const [original, enhanced] of Object.entries(languageEnhancements)) {
        if (text.includes(original)) {
            enhancedText = enhancedText.replace(original, String(enhanced))
            improvements.push(`שיפור: "${original}" → "${enhanced}"`)
        }
    }

    // Add AI-generated improvements
    if (enhancementType === 'grammar') {
        if (!text.endsWith('.') && !text.endsWith('!') && !text.endsWith('?')) {
            enhancedText += '.'
            improvements.push('הוספת נקודה בסוף המשפט')
        }

        if (text.includes('אני') && !text.includes('אני ')) {
            enhancedText = enhancedText.replace('אני', 'אני ')
            improvements.push('הוספת רווח אחרי "אני"')
        }
    }

    if (enhancementType === 'style') {
        if (text.includes('טוב')) {
            suggestions.push('נסה להשתמש במילים יותר מגוונות כמו "מצוין", "נהדר", "מעולה"')
        }

        if (text.includes('זה')) {
            suggestions.push('נסה להיות יותר ספציפי במקום להשתמש ב"זה"')
        }
    }

    if (enhancementType === 'clarity') {
        if (text.length < 20) {
            suggestions.push('נסה להוסיף פרטים נוספים כדי להבהיר את הכוונה')
        }

        if (text.includes('זה') || text.includes('זהו')) {
            suggestions.push('החלף "זה" בשם עצם ספציפי יותר')
        }
    }

    // Calculate readability score
    const readabilityScore = calculateReadabilityScore(enhancedText, language)

    return {
        originalText: text,
        enhancedText,
        improvements,
        suggestions,
        readabilityScore
    }
}

function calculateReadabilityScore(text: string, language: string): number {
    // Simple readability calculation
    const words = text.split(/\s+/).length
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const characters = text.replace(/\s/g, '').length

    if (sentences === 0) return 0

    const avgWordsPerSentence = words / sentences
    const avgCharsPerWord = characters / words

    let score = 100

    // Penalize very long sentences
    if (avgWordsPerSentence > 20) score -= 20
    else if (avgWordsPerSentence > 15) score -= 10

    // Penalize very long words
    if (avgCharsPerWord > 8) score -= 15
    else if (avgCharsPerWord > 6) score -= 8

    // Bonus for good punctuation
    if (text.includes('.') || text.includes('!') || text.includes('?')) {
        score += 5
    }

    // Language-specific adjustments
    if (language === 'he' || language === 'ar') {
        // Hebrew and Arabic tend to have longer words
        score += 5
    }

    return Math.max(0, Math.min(100, Math.round(score)))
}
