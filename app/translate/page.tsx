'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/providers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { Languages, Copy, Volume2, Star } from 'lucide-react'

export default function TranslatePage() {
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState('he')
  const [targetLanguage, setTargetLanguage] = useState('en')
  const [isTranslating, setIsTranslating] = useState(false)

  const languages = [
    { code: 'he', name: 'עברית', flag: '🇮🇱' },
    { code: 'en', name: 'אנגלית', flag: '🇺🇸' },
    { code: 'es', name: 'ספרדית', flag: '🇪🇸' },
    { code: 'fr', name: 'צרפתית', flag: '🇫🇷' },
    { code: 'ar', name: 'ערבית', flag: '🇸🇦' },
    { code: 'de', name: 'גרמנית', flag: '🇩🇪' }
  ]

  const handleTranslate = async () => {
    if (!sourceText.trim()) return
    
    setIsTranslating(true)
    
    // סימולציה של תרגום עם תוכן אמיתי
    setTimeout(() => {
      const translations: Record<string, string> = {
        'שלום': 'Hello',
        'תודה': 'Thank you',
        'אני': 'I',
        'אתה': 'You',
        'בית': 'House',
        'מים': 'Water',
        'אוכל': 'Food',
        'ספר': 'Book'
      }
      
      const translated = translations[sourceText] || `תרגום של: "${sourceText}"`
      setTranslatedText(translated)
      setIsTranslating(false)
    }, 1500)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleSpeak = (text: string, language: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language
    speechSynthesis.speak(utterance)
  }

  const handleSwapLanguages = () => {
    const tempLang = sourceLanguage
    setSourceLanguage(targetLanguage)
    setTargetLanguage(tempLang)
    
    const tempText = sourceText
    setSourceText(translatedText)
    setTranslatedText(tempText)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            תרגום מתקדם
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            תרגם טקסטים עם AI מתקדם והבנה תרבותית
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Source Text */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                טקסט מקור
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">שפת מקור</label>
                <select
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <textarea
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  placeholder="הקלד טקסט לתרגום..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg resize-none"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleSpeak(sourceText, sourceLanguage)}
                  disabled={!sourceText}
                  variant="outline"
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  השמע
                </Button>
                <Button
                  onClick={() => handleCopy(sourceText)}
                  disabled={!sourceText}
                  variant="outline"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  העתק
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Translated Text */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                תרגום
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">שפת יעד</label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <textarea
                  value={translatedText}
                  readOnly
                  placeholder={isTranslating ? "מתרגם..." : "התרגום יופיע כאן..."}
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg resize-none bg-gray-50"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleSpeak(translatedText, targetLanguage)}
                  disabled={!translatedText}
                  variant="outline"
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  השמע
                </Button>
                <Button
                  onClick={() => handleCopy(translatedText)}
                  disabled={!translatedText}
                  variant="outline"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  העתק
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Translation Controls */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-4">
            <Button
              onClick={handleSwapLanguages}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Languages className="h-4 w-4" />
              החלף שפות
            </Button>
            <Button
              onClick={handleTranslate}
              disabled={!sourceText || isTranslating}
              className="flex items-center gap-2"
            >
              {isTranslating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  מתרגם...
                </>
              ) : (
                <>
                  <Languages className="h-4 w-4" />
                  תרגם
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Translation History */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              היסטוריית תרגומים
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium">שלום עולם</p>
                  <p className="text-sm text-gray-500">עברית → אנגלית</p>
                </div>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium">How are you?</p>
                  <p className="text-sm text-gray-500">אנגלית → עברית</p>
                </div>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
