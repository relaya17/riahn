import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, Session } from 'next-auth'
import { authOptions, getCurrentUserFromSession } from '@/lib/auth'
import { SecurityAudit, RateLimiter, InputSanitizer } from '@/lib/security'

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession()
        const user = await getCurrentUserFromSession(session as Session | null)

        if (!user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Rate limiting
        const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
        const rateLimitResult = RateLimiter.checkLimit(`learning-chat-${clientIP}`)

        if (!rateLimitResult.allowed) {
            SecurityAudit.logSecurityEvent('LEARNING_CHAT_RATE_LIMIT', {
                ip: clientIP,
                userId: user.id
            }, 'medium')

            return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
        }

        const body = await request.json()
        const { message, fromLanguage, toLanguage, partnerId } = body

        if (!message || !fromLanguage || !toLanguage) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Sanitize input
        const sanitizedMessage = InputSanitizer.sanitizeString(message)

        // Detect if message contains learning content
        const learningKeywords = [
            'learn', 'study', 'practice', 'grammar', 'vocabulary',
            'לומד', 'לימוד', 'תרגול', 'דקדוק', 'אוצר מילים',
            'aprender', 'estudiar', 'práctica', 'gramática', 'vocabulario',
            'apprendre', 'étudier', 'pratique', 'grammaire', 'vocabulaire',
            'تعلم', 'دراسة', 'ممارسة', 'قواعد', 'مفردات'
        ]

        const isLearningMessage = learningKeywords.some(keyword =>
            sanitizedMessage.toLowerCase().includes(keyword.toLowerCase())
        )

        // Generate learning response
        const learningResponse = await generateLearningResponse(
            sanitizedMessage,
            fromLanguage,
            toLanguage,
            isLearningMessage
        )

        // Log learning activity
        SecurityAudit.logSecurityEvent('LEARNING_CHAT_MESSAGE', {
            ip: clientIP,
            userId: user.id,
            partnerId,
            fromLanguage,
            toLanguage,
            messageLength: sanitizedMessage.length,
            isLearningMessage
        }, 'low')

        return NextResponse.json({
            success: true,
            response: learningResponse,
            isLearningMessage,
            timestamp: new Date().toISOString()
        })

    } catch (error) {
        console.error('Learning chat error:', error)
        SecurityAudit.logSecurityEvent('LEARNING_CHAT_ERROR', {
            error: error instanceof Error ? error.message : 'Unknown error'
        }, 'high')

        return NextResponse.json(
            { error: 'Learning chat failed' },
            { status: 500 }
        )
    }
}

async function generateLearningResponse(
    message: string,
    fromLanguage: string,
    toLanguage: string,
    isLearningMessage: boolean
) {
    // In a real application, you would:
    // 1. Use AI/ML to generate contextual responses
    // 2. Integrate with language learning APIs
    // 3. Provide grammar corrections and suggestions
    // 4. Generate cultural context and explanations

    const learningResponses = {
        en: [
            "That's great! I can help you practice. What specific topic would you like to work on?",
            "Excellent! Let's practice together. Try using some new vocabulary you've learned.",
            "Wonderful! I'm here to help you improve. What's your biggest challenge in learning?",
            "Fantastic! Let's have a conversation. Don't worry about making mistakes - that's how we learn!",
            "Great! I love helping people learn. What would you like to talk about today?"
        ],
        he: [
            "זה נהדר! אני יכול לעזור לך לתרגל. על איזה נושא ספציפי תרצה לעבוד?",
            "מעולה! בואו נתרגל יחד. נסה להשתמש באוצר מילים חדש שלמדת.",
            "נפלא! אני כאן כדי לעזור לך להשתפר. מה האתגר הגדול ביותר שלך בלמידה?",
            "פנטסטי! בואו נשוחח. אל תדאג מטעויות - כך אנחנו לומדים!",
            "נהדר! אני אוהב לעזור לאנשים ללמוד. על מה תרצה לדבר היום?"
        ],
        es: [
            "¡Excelente! Puedo ayudarte a practicar. ¿En qué tema específico te gustaría trabajar?",
            "¡Perfecto! Practiquemos juntos. Intenta usar vocabulario nuevo que hayas aprendido.",
            "¡Maravilloso! Estoy aquí para ayudarte a mejorar. ¿Cuál es tu mayor desafío al aprender?",
            "¡Fantástico! Conversemos. No te preocupes por cometer errores - ¡así es como aprendemos!",
            "¡Genial! Me encanta ayudar a las personas a aprender. ¿De qué te gustaría hablar hoy?"
        ],
        fr: [
            "C'est formidable ! Je peux t'aider à pratiquer. Sur quel sujet spécifique aimerais-tu travailler ?",
            "Parfait ! Pratiquons ensemble. Essaie d'utiliser du nouveau vocabulaire que tu as appris.",
            "Merveilleux ! Je suis là pour t'aider à t'améliorer. Quel est ton plus grand défi dans l'apprentissage ?",
            "Fantastique ! Conversons. Ne t'inquiète pas de faire des erreurs - c'est comme ça qu'on apprend !",
            "Génial ! J'adore aider les gens à apprendre. De quoi aimerais-tu parler aujourd'hui ?"
        ],
        ar: [
            "هذا رائع! يمكنني مساعدتك في التدريب. في أي موضوع محدد تريد العمل؟",
            "ممتاز! دعنا نتدرب معاً. حاول استخدام مفردات جديدة تعلمتها.",
            "رائع! أنا هنا لمساعدتك على التحسن. ما هو أكبر تحدٍ لك في التعلم؟",
            "رائع! دعنا نتحدث. لا تقلق من ارتكاب الأخطاء - هكذا نتعلم!",
            "عظيم! أحب مساعدة الناس على التعلم. عن ماذا تريد التحدث اليوم؟"
        ]
    }

    const casualResponses = {
        en: [
            "That's interesting! Tell me more about it.",
            "I see! What do you think about that?",
            "Really? That sounds fascinating!",
            "I understand. How do you feel about it?",
            "That's cool! I'd love to hear more."
        ],
        he: [
            "זה מעניין! ספר לי עוד על זה.",
            "אני רואה! מה אתה חושב על זה?",
            "באמת? זה נשמע מרתק!",
            "אני מבין. איך אתה מרגיש לגבי זה?",
            "זה מגניב! אני אשמח לשמוע עוד."
        ],
        es: [
            "¡Eso es interesante! Cuéntame más sobre eso.",
            "¡Veo! ¿Qué piensas sobre eso?",
            "¿De verdad? ¡Eso suena fascinante!",
            "Entiendo. ¿Cómo te sientes al respecto?",
            "¡Eso es genial! Me encantaría escuchar más."
        ],
        fr: [
            "C'est intéressant ! Raconte-moi plus à ce sujet.",
            "Je vois ! Qu'est-ce que tu en penses ?",
            "Vraiment ? Ça a l'air fascinant !",
            "Je comprends. Comment te sens-tu à ce sujet ?",
            "C'est cool ! J'aimerais en entendre plus."
        ],
        ar: [
            "هذا مثير للاهتمام! أخبرني المزيد عن ذلك.",
            "أرى! ما رأيك في ذلك؟",
            "حقاً؟ هذا يبدو رائعاً!",
            "أفهم. كيف تشعر حيال ذلك؟",
            "هذا رائع! أود أن أسمع المزيد."
        ]
    }

    const responses = isLearningMessage
        ? learningResponses[toLanguage as keyof typeof learningResponses] || learningResponses.en
        : casualResponses[toLanguage as keyof typeof casualResponses] || casualResponses.en

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    return {
        text: randomResponse,
        isLearning: isLearningMessage,
        suggestions: isLearningMessage ? generateLearningSuggestions(toLanguage) : [],
        culturalNote: generateCulturalNote(randomResponse, toLanguage),
        difficulty: isLearningMessage ? 'medium' : 'easy'
    }
}

function generateLearningSuggestions(language: string): string[] {
    const suggestions = {
        en: [
            "Try using past tense",
            "Use more descriptive adjectives",
            "Practice asking questions",
            "Include time expressions"
        ],
        he: [
            "נסה להשתמש בזמן עבר",
            "השתמש בתיאורים יותר מפורטים",
            "תרגל שאילת שאלות",
            "כלול ביטויי זמן"
        ],
        es: [
            "Intenta usar el tiempo pasado",
            "Usa más adjetivos descriptivos",
            "Practica hacer preguntas",
            "Incluye expresiones de tiempo"
        ],
        fr: [
            "Essaie d'utiliser le passé",
            "Utilise plus d'adjectifs descriptifs",
            "Pratique les questions",
            "Inclus des expressions temporelles"
        ],
        ar: [
            "حاول استخدام الماضي",
            "استخدم صفات وصفية أكثر",
            "تدرب على طرح الأسئلة",
            "أدرج تعبيرات زمنية"
        ]
    }

    return suggestions[language as keyof typeof suggestions] || suggestions.en
}

function generateCulturalNote(text: string, language: string): string {
    const culturalNotes = {
        en: "In English-speaking cultures, it's common to ask follow-up questions to show interest in the conversation.",
        he: "בתרבות דוברת עברית, נהוג לשאול שאלות המשך כדי להראות עניין בשיחה.",
        es: "En las culturas de habla hispana, es común hacer preguntas de seguimiento para mostrar interés en la conversación.",
        fr: "Dans les cultures francophones, il est courant de poser des questions de suivi pour montrer de l'intérêt dans la conversation.",
        ar: "في الثقافات الناطقة بالعربية، من الشائع طرح أسئلة متابعة لإظهار الاهتمام بالمحادثة."
    }

    return culturalNotes[language as keyof typeof culturalNotes] || culturalNotes.en
}
