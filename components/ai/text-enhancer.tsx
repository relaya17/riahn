'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { 
  Sparkles, 
  RefreshCw, 
  Copy, 
  Wand2,
  BookOpen,
  MessageSquare,
  FileText,
  Target
} from 'lucide-react'
import { useToast } from '@/components/ui/toast'

interface TextEnhancerProps {
  initialText?: string
  onEnhanced?: (result: EnhancementResult) => void
}

interface EnhancementResult {
  originalText: string
  enhancedText: string
  improvements: string[]
  suggestions: string[]
  readabilityScore: number
  processingTime: number
}

export function TextEnhancer({ initialText = '', onEnhanced }: TextEnhancerProps) {
  const [text, setText] = useState(initialText)
  const [enhancedText, setEnhancedText] = useState('')
  const [enhancementType, setEnhancementType] = useState('grammar')
  const [language, setLanguage] = useState('he')
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [result, setResult] = useState<EnhancementResult | null>(null)
  
  const { success, error } = useToast()

  const enhancementTypes = [
    { value: 'grammar', label: 'תיקון דקדוק', icon: BookOpen },
    { value: 'style', label: 'שיפור סגנון', icon: Wand2 },
    { value: 'clarity', label: 'הבהרה', icon: Target },
    { value: 'formal', label: 'הפיכה לרשמי', icon: FileText },
    { value: 'casual', label: 'הפיכה ללא רשמי', icon: MessageSquare }
  ]

  const languages = [
    { value: 'he', label: 'עברית' },
    { value: 'ar', label: 'ערבית' },
    { value: 'en', label: 'אנגלית' },
    { value: 'si', label: 'סינהלית' },
    { value: 'ta', label: 'טמילית' }
  ]

  const handleEnhance = async () => {
    if (!text.trim()) return

    setIsEnhancing(true)
    try {
      const response = await fetch('/api/enhance-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          enhancementType,
          language
        }),
      })

      if (!response.ok) {
        throw new Error('Text enhancement failed')
      }

      const result: EnhancementResult = await response.json()
      setEnhancedText(result.enhancedText)
      setResult(result)
      onEnhanced?.(result)
      
      success('הטקסט שופר בהצלחה!')
    } catch (err) {
      error('שגיאה בשיפור הטקסט')
      console.error('Enhancement error:', err)
    } finally {
      setIsEnhancing(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    success('הטקסט הועתק ללוח')
  }

  const getReadabilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100 dark:bg-green-900/20'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
    return 'text-red-600 bg-red-100 dark:bg-red-900/20'
  }

  const getReadabilityLabel = (score: number) => {
    if (score >= 80) return 'קריאות מעולה'
    if (score >= 60) return 'קריאות טובה'
    if (score >= 40) return 'קריאות בינונית'
    return 'קריאות נמוכה'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-purple-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          AI Text Enhancer
        </h2>
      </div>

      {/* Configuration */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                סוג שיפור
              </label>
              <Select
                value={enhancementType}
                onChange={(e) => setEnhancementType(e.target.value)}
                options={enhancementTypes.map(type => ({
                  value: type.value,
                  label: type.label
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                שפה
              </label>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                options={languages}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span>טקסט לשיפור</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="הקלד את הטקסט שתרצה לשפר..."
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              rows={6}
            />
            <Button
              onClick={handleEnhance}
              disabled={isEnhancing || !text.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600"
            >
              {isEnhancing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  משפר...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  שפר עם AI
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Text */}
      {enhancedText && result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                <span>טקסט משופר</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getReadabilityColor(result.readabilityScore)}`}>
                  {getReadabilityLabel(result.readabilityScore)} ({result.readabilityScore}/100)
                </span>
                <span className="text-xs text-gray-500">
                  {result.processingTime}ms
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                <p className="text-gray-900 dark:text-white leading-relaxed">
                  {enhancedText}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(enhancedText)}
                className="absolute top-2 right-2"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            {/* Improvements */}
            {result.improvements.length > 0 && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">
                  שיפורים שבוצעו:
                </h4>
                <ul className="space-y-1">
                  {result.improvements.map((improvement, index) => (
                    <li key={index} className="text-sm text-green-700 dark:text-green-300 flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggestions */}
            {result.suggestions.length > 0 && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">
                  הצעות נוספות:
                </h4>
                <ul className="space-y-1">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
                      <span className="text-blue-600 mt-1">💡</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
