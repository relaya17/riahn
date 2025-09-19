'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PersonalAITutor } from '@/components/ai/personal-ai-tutor'
import { ARLanguageLearning } from '@/components/ar/ar-language-learning'
import { NeuralTranslator } from '@/components/ai/neural-translator'
import { CertificateSystem } from '@/components/blockchain/certificate-system'
import { VirtualClassroom } from '@/components/metaverse/virtual-classroom'
import { 
  Brain, 
  Camera, 
  Languages, 
  Shield, 
  Globe,
  Star,
  Zap,
  Rocket,
  Award,
  TrendingUp,
  Users,
  BookOpen,
  Target,
  Lightbulb,
  Crown,
  Diamond,
  Sparkles
} from 'lucide-react'

type RevolutionaryTab = 'ai-tutor' | 'ar-learning' | 'neural-translation' | 'blockchain' | 'metaverse'

export default function RevolutionaryPage() {
  const [activeTab, setActiveTab] = useState<RevolutionaryTab>('ai-tutor')

  const tabs = [
    {
      id: 'ai-tutor' as RevolutionaryTab,
      name: 'מורה AI אישי',
      icon: Brain,
      description: 'מורה AI עם זיהוי קול מתקדם',
      color: 'from-blue-400 to-purple-500',
      badge: 'HOT'
    },
    {
      id: 'ar-learning' as RevolutionaryTab,
      name: 'למידה ב-AR',
      icon: Camera,
      description: 'למידה במציאות רבודה',
      color: 'from-purple-400 to-pink-500',
      badge: 'NEW'
    },
    {
      id: 'neural-translation' as RevolutionaryTab,
      name: 'תרגום נוירלי',
      icon: Languages,
      description: 'AI חכם לתרגום מדויק',
      color: 'from-green-400 to-blue-500',
      badge: 'AI'
    },
    {
      id: 'blockchain' as RevolutionaryTab,
      name: 'תעודות בלוקצ\'יין',
      icon: Shield,
      description: 'תעודות מאובטחות ובלתי ניתנות לזיוף',
      color: 'from-yellow-400 to-orange-500',
      badge: 'SECURE'
    },
    {
      id: 'metaverse' as RevolutionaryTab,
      name: 'כיתה במטאוורס',
      icon: Globe,
      description: 'למידה בסביבה תלת-ממדית',
      color: 'from-pink-400 to-purple-500',
      badge: '3D'
    }
  ]

  const revolutionaryFeatures = [
    {
      icon: Brain,
      title: 'מורה AI אישי',
      description: 'מורה מלאכותי חכם שמתאים את עצמו לסגנון הלמידה שלך',
      features: ['זיהוי קול מתקדם', 'ניתוח הגייה', 'התאמה אישית', 'מעקב התקדמות'],
      impact: 'מהפכה בלמידה אישית',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Camera,
      title: 'למידה במציאות רבודה',
      description: 'למד שפות על ידי סריקת העולם סביבך',
      features: ['זיהוי אובייקטים', 'תרגום בזמן אמת', 'סביבות וירטואליות', 'אינטראקציה טבעית'],
      impact: 'מיזוג העולם הפיזי והדיגיטלי',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Languages,
      title: 'תרגום נוירלי מתקדם',
      description: 'AI חכם שמבין הקשר, תרבות וניואנסים',
      features: ['הבנת הקשר', 'הערות תרבותיות', 'אלטרנטיבות', 'ניתוח רגשי'],
      impact: 'תרגום ברמה אנושית',
      color: 'from-green-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'תעודות בלוקצ\'יין',
      description: 'תעודות מאובטחות, מאומתות ובלתי ניתנות לזיוף',
      features: ['אבטחה מקסימלית', 'אימות מיידי', 'שקיפות מלאה', 'ערך דיגיטלי'],
      impact: 'מהפכה בהסמכות דיגיטליות',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Globe,
      title: 'כיתה במטאוורס',
      description: 'למידה בסביבה תלת-ממדית אינטראקטיבית',
      features: ['סביבות וירטואליות', 'אווטרים', 'אינטראקציה טבעית', 'חוויה ממשית'],
      impact: 'עתיד הלמידה הדיגיטלית',
      color: 'from-pink-500 to-purple-600'
    }
  ]

  const stats = [
    { label: 'טכנולוגיות AI', value: '15+', icon: Brain, color: 'text-blue-500' },
    { label: 'סביבות AR/VR', value: '8', icon: Camera, color: 'text-purple-500' },
    { label: 'שפות נתמכות', value: '50+', icon: Languages, color: 'text-green-500' },
    { label: 'תעודות מאובטחות', value: '10K+', icon: Shield, color: 'text-yellow-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full">
              <Rocket className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
              תכונות פורצות דרך
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            טכנולוגיות מתקדמות שמשנות את הדרך שבה אנחנו לומדים שפות
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              חלוצים בטכנולוגיה • מובילים בעתיד • פורצים גבולות
            </span>
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="text-center">
                <CardContent className="p-6">
                  <div className={`p-3 rounded-full w-fit mx-auto mb-2 ${stat.color.replace('text-', 'bg-').replace('-500', '-100')} dark:bg-opacity-20`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Feature Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 relative"
                >
                  <Icon className="h-4 w-4" />
                  {tab.name}
                  {tab.badge && (
                    <span className={`absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full ${
                      tab.badge === 'HOT' ? 'bg-red-500 text-white' :
                      tab.badge === 'NEW' ? 'bg-green-500 text-white' :
                      tab.badge === 'AI' ? 'bg-blue-500 text-white' :
                      tab.badge === 'SECURE' ? 'bg-yellow-500 text-white' :
                      'bg-purple-500 text-white'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
            <CardTitle className="flex items-center gap-2">
              {tabs.find(tab => tab.id === activeTab)?.icon && (
                <>
                  {(() => {
                    const Icon = tabs.find(tab => tab.id === activeTab)!.icon
                    return <Icon className="h-6 w-6 text-blue-500" />
                  })()}
                  <span>{tabs.find(tab => tab.id === activeTab)?.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    - {tabs.find(tab => tab.id === activeTab)?.description}
                  </span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {activeTab === 'ai-tutor' && <PersonalAITutor />}
            {activeTab === 'ar-learning' && <ARLanguageLearning />}
            {activeTab === 'neural-translation' && <NeuralTranslator />}
            {activeTab === 'blockchain' && <CertificateSystem />}
            {activeTab === 'metaverse' && <VirtualClassroom />}
          </CardContent>
        </Card>

        {/* Revolutionary Features Overview */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            מהפכה טכנולוגית בלמידת שפות
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {revolutionaryFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {feature.impact}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {feature.features.map((feat, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                        טכנולוגיה פורצת דרך
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
            <CardContent className="p-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Diamond className="h-12 w-12" />
                <h2 className="text-4xl font-bold">
                  מוכן למהפכה?
                </h2>
                <Diamond className="h-12 w-12" />
              </div>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                הצטרף לעתיד למידת השפות עם הטכנולוגיות המתקדמות ביותר בעולם
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Rocket className="h-5 w-5 mr-2" />
                  התחל מהפכה
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  למד עוד
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
