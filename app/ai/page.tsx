'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AITranslator } from '@/components/ai/ai-translator'
import { LanguageDetector } from '@/components/ai/language-detector'
import { TextEnhancer } from '@/components/ai/text-enhancer'
import { 
  Sparkles, 
  Languages, 
  Target, 
  Wand2,
  Brain,
  Zap,
  Globe,
  BookOpen
} from 'lucide-react'

type AITool = 'translator' | 'detector' | 'enhancer'

export default function AIPage() {
  const [activeTool, setActiveTool] = useState<AITool>('translator')
  const [sharedText, setSharedText] = useState('')

  const tools = [
    {
      id: 'translator' as AITool,
      name: 'AI Translator',
      description: 'תרגום חכם עם הקשר והגייה',
      icon: Languages,
      color: 'from-blue-500 to-cyan-500',
      features: ['תרגום בזמן אמת', 'הגייה', 'הערות תרבותיות', 'תרגומים חלופיים']
    },
    {
      id: 'detector' as AITool,
      name: 'Language Detector',
      description: 'זיהוי שפה אוטומטי עם AI',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      features: ['זיהוי שפה מדויק', 'רמת ביטחון', 'אפשרויות נוספות', 'תובנות AI']
    },
    {
      id: 'enhancer' as AITool,
      name: 'Text Enhancer',
      description: 'שיפור טקסט עם בינה מלאכותית',
      icon: Wand2,
      color: 'from-purple-500 to-pink-500',
      features: ['תיקון דקדוק', 'שיפור סגנון', 'הבהרה', 'ניקוד קריאות']
    }
  ]

  const handleTextShare = (text: string) => {
    setSharedText(text)
  }

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'translator':
        return <AITranslator onTranslation={(result) => handleTextShare(result.translatedText)} />
      case 'detector':
        return <LanguageDetector text={sharedText} />
      case 'enhancer':
        return <TextEnhancer initialText={sharedText} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              AI Language Tools
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            כלי בינה מלאכותית מתקדמים ללימוד שפות, תרגום ושיפור טקסט
          </p>
        </div>

        {/* Tool Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {tools.map((tool) => {
            const Icon = tool.icon
            const isActive = activeTool === tool.id
            
            return (
              <Card 
                key={tool.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isActive 
                    ? 'ring-2 ring-blue-500 shadow-lg transform scale-105' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => setActiveTool(tool.id)}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto p-4 rounded-full bg-gradient-to-r ${tool.color} mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{tool.name}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {tool.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Zap className="h-3 w-3 text-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* AI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm opacity-90">שפות נתמכות</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm opacity-90">דיוק זיהוי</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <Wand2 className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm opacity-90">כלי AI</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-90">זמינות</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Tool */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-500" />
              <span>{tools.find(t => t.id === activeTool)?.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {renderActiveTool()}
          </CardContent>
        </Card>

        {/* AI Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            תכונות מתקדמות
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-4">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">למידה מתמדת</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ה-AI שלנו משתפר כל הזמן ומתאים את עצמו להעדפות שלך
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit mx-auto mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">מהירות גבוהה</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  תוצאות מיידיות עם עיבוד מהיר וחכם
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full w-fit mx-auto mb-4">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">תמיכה רב-לשונית</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  תמיכה מלאה בעברית, ערבית, אנגלית ועוד
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
