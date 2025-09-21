'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Brain, 
  Languages, 
  Volume2, 
  VolumeX,
  Copy,
  Check,
  Zap,
  Target,
  TrendingUp,
  Star,
  Globe,
  Mic,
  MicOff,
  Camera,
  Image,
  FileText,
  Download,
  Share,
  Settings,
  History,
  Bookmark,
  Lightbulb
} from 'lucide-react'

interface TranslationResult {
  id: string
  originalText: string
  translatedText: string
  sourceLanguage: string
  targetLanguage: string
  confidence: number
  alternatives: string[]
  context: string
  culturalNotes: string[]
  pronunciation: string
  timestamp: Date
  type: 'text' | 'voice' | 'image' | 'document' | 'real-time' | 'batch' | 'context'
}

interface LanguageModel {
  code: string
  name: string
  flag: string
  neuralModel: string
  accuracy: number
  speed: number
  features: string[]
}

export function NeuralTranslator() {
  const [inputText, setInputText] = useState('')
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null)
  const [sourceLanguage, setSourceLanguage] = useState('auto')
  const [targetLanguage, setTargetLanguage] = useState('he')
  const [isTranslating, setIsTranslating] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [translationHistory, setTranslationHistory] = useState<TranslationResult[]>([])
  const [copied, setCopied] = useState(false)
  const [selectedMode, setSelectedMode] = useState<'text' | 'voice' | 'image' | 'document' | 'real-time' | 'batch' | 'context'>('text')

  const languages: LanguageModel[] = [
    {
      code: 'auto',
      name: 'זיהוי אוטומטי',
      flag: '🤖',
      neuralModel: 'GPT-4 Vision',
      accuracy: 98,
      speed: 95,
      features: ['זיהוי שפה', 'הקשר', 'ניתוח רגשי']
    },
    {
      code: 'he',
      name: 'עברית',
      flag: '🇮🇱',
      neuralModel: 'HebrewBERT',
      accuracy: 99,
      speed: 90,
      features: ['דקדוק', 'ניקוד', 'סלנג']
    },
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸',
      neuralModel: 'GPT-4',
      accuracy: 99,
      speed: 95,
      features: ['גרמר', 'אידיומים', 'הקשר עסקי']
    },
    {
      code: 'ar',
      name: 'العربية',
      flag: '🇸🇦',
      neuralModel: 'AraBERT',
      accuracy: 97,
      speed: 88,
      features: ['דיאלקטים', 'קוראן', 'פואטיקה']
    },
    {
      code: 'es',
      name: 'Español',
      flag: '🇪🇸',
      neuralModel: 'BETO',
      accuracy: 96,
      speed: 92,
      features: ['דיאלקטים', 'תרבות', 'היסטוריה']
    },
    {
      code: 'fr',
      name: 'Français',
      flag: '🇫🇷',
      neuralModel: 'CamemBERT',
      accuracy: 98,
      speed: 94,
      features: ['אלגנטיות', 'תרבות', 'אמנות']
    }
  ]

  const translateText = async () => {
    if (!inputText.trim()) return

    setIsTranslating(true)
    
    // Simulate neural translation
    setTimeout(() => {
      const result: TranslationResult = {
        id: Date.now().toString(),
        originalText: inputText,
        translatedText: simulateTranslation(inputText, sourceLanguage, targetLanguage),
        sourceLanguage: sourceLanguage === 'auto' ? 'he' : sourceLanguage,
        targetLanguage,
        confidence: Math.random() * 20 + 80, // 80-100%
        alternatives: generateAlternatives(inputText, targetLanguage),
        context: generateContext(inputText),
        culturalNotes: generateCulturalNotes(inputText, targetLanguage),
        pronunciation: generatePronunciation(inputText, targetLanguage),
        timestamp: new Date(),
        type: selectedMode
      }
      
      setTranslationResult(result)
      setTranslationHistory(prev => [result, ...prev.slice(0, 9)]) // Keep last 10
      setIsTranslating(false)
    }, 1500)
  }

  const simulateTranslation = (text: string, from: string, to: string): string => {
    // Mock translation logic
    const translations: Record<string, Record<string, string>> = {
      'hello': {
        'he': 'שלום',
        'ar': 'مرحبا',
        'es': 'Hola',
        'fr': 'Bonjour'
      },
      'שלום': {
        'en': 'Hello',
        'ar': 'مرحبا',
        'es': 'Hola',
        'fr': 'Bonjour'
      },
      'مرحبا': {
        'he': 'שלום',
        'en': 'Hello',
        'es': 'Hola',
        'fr': 'Bonjour'
      }
    }
    
    const lowerText = text.toLowerCase()
    return translations[lowerText]?.[to] || `[תרגום ל${languages.find(l => l.code === to)?.name || to}]`
  }

  const generateAlternatives = (text: string, targetLang: string): string[] => {
    return [
      `אלטרנטיבה 1 ל${text}`,
      `אלטרנטיבה 2 ל${text}`,
      `אלטרנטיבה 3 ל${text}`
    ]
  }

  const generateContext = (text: string): string => {
    return `הקשר: הטקסט "${text}" משמש בדרך כלל במצבים רשמיים ובלתי רשמיים כאחד.`
  }

  const generateCulturalNotes = (text: string, targetLang: string): string[] => {
    return [
      `הערה תרבותית: ב${languages.find(l => l.code === targetLang)?.name || targetLang} יש חשיבות מיוחדת לנימוסים`,
      `טיפ: נסה להשתמש בהבעות פנים מתאימות`,
      `מידע נוסף: זהו ביטוי נפוץ בשיחה יומיומית`
    ]
  }

  const generatePronunciation = (text: string, targetLang: string): string => {
    return `הגייה: ${text} נהגה כ-${text.split('').join('-')}`
  }

  const speakText = (text: string, language: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === 'he' ? 'he-IL' : 
                      language === 'ar' ? 'ar-SA' : 
                      language === 'es' ? 'es-ES' :
                      language === 'fr' ? 'fr-FR' : 'en-US'
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const getLanguageName = (code: string) => {
    return languages.find(l => l.code === code)?.name || code
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-green-600'
    if (confidence >= 85) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 95) return 'מעולה'
    if (confidence >= 85) return 'טוב'
    return 'בינוני'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                תרגום נוירלי מתקדם
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                AI חכם לתרגום מדויק עם הבנת הקשר ותרבות
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Translation Modes */}
      <div className="flex gap-2">
        {[
          { id: 'text', name: 'טקסט', icon: FileText },
          { id: 'voice', name: 'קול', icon: Mic },
          { id: 'image', name: 'תמונה', icon: Image },
          { id: 'document', name: 'מסמך', icon: FileText }
        ].map((mode) => {
          const Icon = mode.icon
          return (
            <Button
              key={mode.id}
              variant={selectedMode === mode.id ? 'default' : 'outline'}
              onClick={() => setSelectedMode(mode.id as 'real-time' | 'batch' | 'context' | 'voice')}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {mode.name}
            </Button>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              <span>טקסט לתרגום</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Language Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  שפת מקור
                </label>
                <select
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                  aria-label="בחר שפת מקור"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  שפת יעד
                </label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                  aria-label="בחר שפת יעד"
                >
                  {languages.filter(l => l.code !== 'auto').map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Text Input */}
            <div>
              <textarea
                placeholder="הקלד טקסט לתרגום..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={translateText}
                disabled={!inputText.trim() || isTranslating}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600"
              >
                {isTranslating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    מתרגם...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    תרגם
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setIsListening(!isListening)}
                className={isListening ? 'text-red-500' : ''}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Translation Result */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              <span>תוצאות תרגום</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {translationResult ? (
              <div className="space-y-4">
                {/* Main Translation */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {getLanguageName(translationResult.sourceLanguage)} → {getLanguageName(translationResult.targetLanguage)}
                      </span>
                      <span className={`text-sm font-medium ${getConfidenceColor(translationResult.confidence)}`}>
                        {translationResult.confidence.toFixed(1)}% ({getConfidenceLabel(translationResult.confidence)})
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(translationResult.translatedText)}
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {translationResult.translatedText}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => speakText(translationResult.translatedText, translationResult.targetLanguage)}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {translationResult.pronunciation}
                    </span>
                  </div>
                </div>

                {/* Alternatives */}
                {translationResult.alternatives.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">אלטרנטיבות:</h4>
                    <div className="space-y-2">
                      {translationResult.alternatives.map((alt, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <span className="text-sm">{alt}</span>
                          <Button size="sm" variant="ghost">
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Context */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">הקשר:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    {translationResult.context}
                  </p>
                </div>

                {/* Cultural Notes */}
                {translationResult.culturalNotes.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      הערות תרבותיות:
                    </h4>
                    <div className="space-y-2">
                      {translationResult.culturalNotes.map((note, index) => (
                        <div key={index} className="text-sm text-gray-600 dark:text-gray-400 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  הזן טקסט כדי לקבל תרגום נוירלי מתקדם
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Language Models Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            <span>מודלים נוירליים</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {languages.map((lang) => (
              <div key={lang.code} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{lang.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{lang.neuralModel}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>דיוק:</span>
                    <span className="font-medium">{lang.accuracy}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>מהירות:</span>
                    <span className="font-medium">{lang.speed}%</span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {lang.features.join(' • ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Translation History */}
      {translationHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              <span>היסטוריית תרגומים</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {translationHistory.slice(0, 5).map((translation) => (
                <div key={translation.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {translation.originalText}
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {translation.translatedText}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button size="sm" variant="ghost">
                        <Volume2 className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
