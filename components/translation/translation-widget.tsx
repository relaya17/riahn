'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { LoadingSpinner } from '@/components/ui/loading'
import { 
  ArrowRightLeft, 
  Copy, 
  Volume2, 
  RefreshCw,
  Globe
} from 'lucide-react'
import { Language, TranslationResponse } from '@/types'
import { useLanguage } from '@/components/providers'

interface TranslationWidgetProps {
  initialText?: string
  sourceLanguage?: Language
  targetLanguage?: Language
  onTranslation?: (result: TranslationResponse) => void
  compact?: boolean
}

export function TranslationWidget({
  initialText = '',
  sourceLanguage = 'en',
  targetLanguage = 'he',
  onTranslation,
  compact = false
}: TranslationWidgetProps) {
  const { t } = useLanguage()
  const [sourceText, setSourceText] = useState(initialText)
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLang, setSourceLang] = useState<Language>(sourceLanguage)
  const [targetLang, setTargetLang] = useState<Language>(targetLanguage)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [languages, setLanguages] = useState<Array<{ code: Language; name: string; nativeName: string }>>([])

  useEffect(() => {
    fetchSupportedLanguages()
  }, [])

  useEffect(() => {
    if (initialText && initialText !== sourceText) {
      setSourceText(initialText)
      if (initialText.trim()) {
        handleTranslate()
      }
    }
  }, [initialText])

  const fetchSupportedLanguages = async () => {
    try {
      const response = await fetch('/api/translate/languages')
      const data = await response.json()
      
      if (data.success) {
        setLanguages(data.data)
      }
    } catch (error) {
      console.error('Error fetching languages:', error)
    }
  }

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError('Please enter text to translate')
      return
    }

    if (sourceLang === targetLang) {
      setError('Source and target languages cannot be the same')
      return
    }

    try {
      setLoading(true)
      setError('')

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
        }),
      })

      const data = await response.json()

      if (data.success) {
        const result = data.data as TranslationResponse
        setTranslatedText(result.translatedText)
        onTranslation?.(result)
      } else {
        setError(data.error || 'Translation failed')
      }
    } catch (error) {
      console.error('Translation error:', error)
      setError('Translation service is unavailable')
    } finally {
      setLoading(false)
    }
  }

  const handleDetectLanguage = async () => {
    if (!sourceText.trim()) return

    try {
      setLoading(true)
      
      const response = await fetch('/api/translate/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: sourceText }),
      })

      const data = await response.json()

      if (data.success) {
        setSourceLang(data.data.language)
      }
    } catch (error) {
      console.error('Language detection error:', error)
    } finally {
      setLoading(false)
    }
  }

  const swapLanguages = () => {
    const tempLang = sourceLang
    setSourceLang(targetLang)
    setTargetLang(tempLang)
    
    // Swap texts as well
    const tempText = sourceText
    setSourceText(translatedText)
    setTranslatedText(tempText)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
    })
  }

  const speakText = (text: string, language: Language) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === 'he' ? 'he-IL' : 
                      language === 'ar' ? 'ar-SA' : 
                      language === 'en' ? 'en-US' :
                      language === 'si' ? 'si-LK' :
                      language === 'ta' ? 'ta-IN' : 'en-US'
      speechSynthesis.speak(utterance)
    }
  }

  const getLanguageOptions = () => {
    return languages.map(lang => ({
      value: lang.code,
      label: `${lang.name} (${lang.nativeName})`
    }))
  }

  return (
    <Card className={`${compact ? 'p-4' : 'p-6'} space-y-4`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-semibold flex items-center gap-2`}>
          <Globe className="w-5 h-5" />
          Translator
        </h3>
        
        {sourceText.trim() && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleDetectLanguage}
            disabled={loading}
          >
            Auto-detect
          </Button>
        )}
      </div>

      {/* Language Selection */}
      <div className="flex items-center gap-2">
        <select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value as Language)}
          disabled={loading}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Source language"
        >
          {getLanguageOptions().map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <Button
          variant="ghost"
          size="sm"
          onClick={swapLanguages}
          disabled={loading}
          className="p-2"
        >
          <ArrowRightLeft className="w-4 h-4" />
        </Button>

        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value as Language)}
          disabled={loading}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Target language"
        >
          {getLanguageOptions().map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Translation Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Source Text */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">
              {languages.find(l => l.code === sourceLang)?.name || 'Source'}
            </label>
            <div className="flex gap-1">
              {sourceText && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(sourceText)}
                    className="p-1"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakText(sourceText, sourceLang)}
                    className="p-1"
                  >
                    <Volume2 className="w-3 h-3" />
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Enter text to translate..."
            className={`w-full ${compact ? 'h-24' : 'h-32'} p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            disabled={loading}
          />
        </div>

        {/* Translated Text */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">
              {languages.find(l => l.code === targetLang)?.name || 'Translation'}
            </label>
            <div className="flex gap-1">
              {translatedText && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(translatedText)}
                    className="p-1"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakText(translatedText, targetLang)}
                    className="p-1"
                  >
                    <Volume2 className="w-3 h-3" />
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className={`w-full ${compact ? 'h-24' : 'h-32'} p-3 border border-gray-200 rounded-lg bg-gray-50 overflow-y-auto`}>
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <LoadingSpinner />
              </div>
            ) : translatedText ? (
              <p className="text-gray-900">{translatedText}</p>
            ) : (
              <p className="text-gray-500">Translation will appear here...</p>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSourceText('')
            setTranslatedText('')
            setError('')
          }}
          disabled={loading || (!sourceText && !translatedText)}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          {t('translation.clear')}
        </Button>

        <Button
          onClick={handleTranslate}
          disabled={loading || !sourceText.trim() || sourceLang === targetLang}
        >
          {loading ? (
            <>
              <LoadingSpinner className="w-4 h-4 mr-2" />
              {t('translation.translating')}
            </>
          ) : (
            t('translation.translate')
          )}
        </Button>
      </div>
    </Card>
  )
}


