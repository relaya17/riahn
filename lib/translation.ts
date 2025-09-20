import axios from 'axios'
import { Language, TranslationRequest, TranslationResponse } from '@/types'

// Google Translate API configuration
const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY
const GOOGLE_TRANSLATE_URL = 'https://translation.googleapis.com/language/translate/v2'

// Microsoft Translator API configuration
const MICROSOFT_TRANSLATE_API_KEY = process.env.MICROSOFT_TRANSLATE_API_KEY
const MICROSOFT_TRANSLATE_URL = 'https://api.cognitive.microsofttranslator.com/translate'

// Language mapping for different APIs
const LANGUAGE_MAP: Record<Language, string> = {
    he: 'he',
    ar: 'ar',
    en: 'en',
    fr: 'fr',
    es: 'es',
    de: 'de',
    it: 'it',
    pt: 'pt',
    ru: 'ru',
    ja: 'ja',
    ko: 'ko',
    zh: 'zh',
    hi: 'hi', // Hindi
    si: 'si', // Sinhala
    ta: 'ta', // Tamil
}

// Note: Language levels are handled separately from translation languages
// They are mapped to actual translation languages (e.g., all levels -> 'en')

/**
 * Translate text using Google Translate API
 */
export async function translateWithGoogle(
    request: TranslationRequest
): Promise<TranslationResponse> {
    if (!GOOGLE_TRANSLATE_API_KEY) {
        throw new Error('Google Translate API key not configured')
    }

    try {
        const response = await axios.post(
            `${GOOGLE_TRANSLATE_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`,
            {
                q: request.text,
                source: LANGUAGE_MAP[request.sourceLanguage],
                target: LANGUAGE_MAP[request.targetLanguage],
                format: 'text',
            }
        )

        const translation = response.data.data.translations[0]

        return {
            translatedText: translation.translatedText,
            sourceLanguage: request.sourceLanguage,
            targetLanguage: request.targetLanguage,
            confidence: 1.0, // Google doesn't provide confidence scores
            detectedLanguage: (translation.detectedSourceLanguage as Language) || 'en',
        }
    } catch (error) {
        console.error('Google Translate API error:', error)
        throw new Error('Translation failed')
    }
}

/**
 * Translate text using Microsoft Translator API
 */
export async function translateWithMicrosoft(
    request: TranslationRequest
): Promise<TranslationResponse> {
    if (!MICROSOFT_TRANSLATE_API_KEY) {
        throw new Error('Microsoft Translator API key not configured')
    }

    try {
        const response = await axios.post(
            `${MICROSOFT_TRANSLATE_URL}?api-version=3.0&from=${LANGUAGE_MAP[request.sourceLanguage]}&to=${LANGUAGE_MAP[request.targetLanguage]}`,
            [{ text: request.text }],
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': MICROSOFT_TRANSLATE_API_KEY,
                    'Content-Type': 'application/json',
                },
            }
        )

        const translation = response.data[0]

        return {
            translatedText: translation.translations[0].text,
            sourceLanguage: request.sourceLanguage,
            targetLanguage: request.targetLanguage,
            confidence: translation.translations[0].confidence || 0.8,
            detectedLanguage: (translation.detectedLanguage?.language as Language) || 'en',
        }
    } catch (error) {
        console.error('Microsoft Translator API error:', error)
        throw new Error('Translation failed')
    }
}

/**
 * Main translation function that tries multiple providers
 */
export async function translateText(
    request: TranslationRequest
): Promise<TranslationResponse> {
    // If source and target languages are the same, return original text
    if (request.sourceLanguage === request.targetLanguage) {
        return {
            translatedText: request.text,
            sourceLanguage: request.sourceLanguage,
            targetLanguage: request.targetLanguage,
            confidence: 1.0,
            detectedLanguage: request.sourceLanguage || 'en',
        }
    }

    // Try Google Translate first, fallback to Microsoft
    try {
        return await translateWithGoogle(request)
    } catch (googleError) {
        console.warn('Google Translate failed, trying Microsoft:', googleError)
        try {
            return await translateWithMicrosoft(request)
        } catch (microsoftError) {
            console.error('All translation services failed:', microsoftError)
            throw new Error('Translation service unavailable')
        }
    }
}

/**
 * Batch translate multiple texts
 */
export async function translateBatch(
    requests: TranslationRequest[]
): Promise<TranslationResponse[]> {
    const promises = requests.map(request => translateText(request))
    return Promise.all(promises)
}

/**
 * Detect language of text
 */
export async function detectLanguage(text: string): Promise<Language> {
    try {
        // Use Google Translate for language detection
        const response = await axios.post(
            `${GOOGLE_TRANSLATE_URL}/detect?key=${GOOGLE_TRANSLATE_API_KEY}`,
            {
                q: text,
            }
        )

        const detectedLanguage = response.data.data.detections[0][0].language

        // Map detected language to our Language type
        const languageMap: Record<string, Language> = {
            'he': 'he',
            'ar': 'ar',
            'en': 'en',
            'si': 'si',
            'ta': 'ta',
        }

        return languageMap[detectedLanguage] || 'en'
    } catch (error) {
        console.error('Language detection failed:', error)
        return 'en' // Default to English
    }
}

/**
 * Get supported languages
 */
export function getSupportedLanguages(): Array<{ code: Language; name: string; nativeName: string }> {
    return [
        { code: 'he', name: 'Hebrew', nativeName: 'עברית' },
        { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'si', name: 'Sinhala', nativeName: 'සිංහල' },
        { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    ]
}
