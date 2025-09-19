'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Languages, 
  Zap, 
  Target,
  TrendingUp,
  Globe
} from 'lucide-react'

interface LanguageDetectorProps {
  text: string
  onLanguageDetected?: (language: string, confidence: number) => void
}

interface LanguageDetectionResult {
  language: string
  confidence: number
  alternatives: Array<{
    language: string
    confidence: number
  }>
}

export function LanguageDetector({ text, onLanguageDetected }: LanguageDetectorProps) {
  const [detectionResult, setDetectionResult] = useState<LanguageDetectionResult | null>(null)
  const [isDetecting, setIsDetecting] = useState(false)

  useEffect(() => {
    if (text.trim().length > 3) {
      detectLanguage(text)
    } else {
      setDetectionResult(null)
    }
  }, [text])

  const detectLanguage = async (inputText: string) => {
    setIsDetecting(true)
    
    try {
      // Simulate AI language detection
      const result = await simulateLanguageDetection(inputText)
      setDetectionResult(result)
      onLanguageDetected?.(result.language, result.confidence)
    } catch (error) {
      console.error('Language detection error:', error)
    } finally {
      setIsDetecting(false)
    }
  }

  const simulateLanguageDetection = async (inputText: string): Promise<LanguageDetectionResult> => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500))

    // Simple language detection based on character patterns
    const hebrewPattern = /[\u0590-\u05FF]/
    const arabicPattern = /[\u0600-\u06FF]/
    const englishPattern = /[a-zA-Z]/
    const sinhalaPattern = /[\u0D80-\u0DFF]/
    const tamilPattern = /[\u0B80-\u0BFF]/

    let detectedLanguage = 'unknown'
    let confidence = 0.5

    if (hebrewPattern.test(inputText)) {
      detectedLanguage = 'he'
      confidence = 0.9
    } else if (arabicPattern.test(inputText)) {
      detectedLanguage = 'ar'
      confidence = 0.9
    } else if (sinhalaPattern.test(inputText)) {
      detectedLanguage = 'si'
      confidence = 0.9
    } else if (tamilPattern.test(inputText)) {
      detectedLanguage = 'ta'
      confidence = 0.9
    } else if (englishPattern.test(inputText)) {
      detectedLanguage = 'en'
      confidence = 0.8
    }

    const alternatives = [
      { language: 'he', confidence: 0.1 },
      { language: 'ar', confidence: 0.1 },
      { language: 'en', confidence: 0.1 },
      { language: 'si', confidence: 0.1 },
      { language: 'ta', confidence: 0.1 }
    ].filter(alt => alt.language !== detectedLanguage)

    return {
      language: detectedLanguage,
      confidence,
      alternatives: alternatives.slice(0, 3)
    }
  }

  const getLanguageName = (code: string) => {
    const names = {
      'he': 'עברית',
      'ar': 'ערבית',
      'en': 'אנגלית',
      'si': 'סינהלית',
      'ta': 'טמילית',
      'unknown': 'לא ידוע'
    }
    return names[code as keyof typeof names] || code
  }

  const getLanguageFlag = (code: string) => {
    const flags = {
      'he': '🇮🇱',
      'ar': '🇸🇦',
      'en': '🇺🇸',
      'si': '🇱🇰',
      'ta': '🇱🇰',
      'unknown': '❓'
    }
    return flags[code as keyof typeof flags] || '❓'
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100 dark:bg-green-900/20'
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
    return 'text-red-600 bg-red-100 dark:bg-red-900/20'
  }

  if (!text.trim()) {
    return null
  }

  return (
    <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-400">
          <Target className="h-5 w-5" />
          <span>זיהוי שפה</span>
          {isDetecting && (
            <Zap className="h-4 w-4 animate-pulse" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {detectionResult ? (
          <div className="space-y-3">
            {/* Primary Detection */}
            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getLanguageFlag(detectionResult.language)}</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {getLanguageName(detectionResult.language)}
                  </p>
                  <p className="text-sm text-gray-500">
                    שפה מזוהה
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(detectionResult.confidence)}`}>
                {Math.round(detectionResult.confidence * 100)}%
              </div>
            </div>

            {/* Alternatives */}
            {detectionResult.alternatives.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  אפשרויות נוספות:
                </p>
                <div className="space-y-2">
                  {detectionResult.alternatives.map((alt, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getLanguageFlag(alt.language)}</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {getLanguageName(alt.language)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {Math.round(alt.confidence * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Insights */}
            <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-400">
                  תובנות AI
                </span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {detectionResult.confidence >= 0.8 
                  ? 'זיהוי שפה ברמת ביטחון גבוהה'
                  : detectionResult.confidence >= 0.6
                  ? 'זיהוי שפה ברמת ביטחון בינונית'
                  : 'זיהוי שפה ברמת ביטחון נמוכה - מומלץ לבדוק ידנית'
                }
              </p>
            </div>
          </div>
        ) : isDetecting ? (
          <div className="flex items-center justify-center p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 animate-pulse text-blue-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                מזהה שפה...
              </span>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
