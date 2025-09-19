'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import NeuralUI from '@/components/revolutionary/neural-ui'
import EmotionAITutor from '@/components/ai/emotion-ai-tutor'
import RealTimeLearningChat from '@/components/social/real-time-learning-chat'
import VRARLearning from '@/components/gamification/vr-ar-learning'
import SmartPricing from '@/components/monetization/smart-pricing'
import AdvancedAnalytics from '@/components/analytics/advanced-analytics'
import LaunchStrategy from '@/components/marketing/launch-strategy'
import SEOOptimizer from '@/components/seo/seo-optimizer'
// import BusinessIntelligence from '@/components/analytics/business-intelligence'
import { 
  Brain, 
  Users, 
  Eye, 
  Zap, 
  Star, 
  Trophy,
  ArrowRight,
  Play,
  Sparkles,
  Target,
  Award,
  Globe,
  DollarSign,
  BarChart3,
  Rocket,
  Search,
  TrendingUp
} from 'lucide-react'

export default function RevolutionaryPage() {
  const [activeTab, setActiveTab] = useState('neural-ui')
  const [isDemoMode, setIsDemoMode] = useState(false)

  const features = [
    {
      id: 'neural-ui',
      name: 'ממשק נוירונים',
      description: 'ממשק משתמש מהפכני עם רשת נוירונים דינמית',
      icon: Brain,
      color: 'from-blue-500 to-purple-600',
      component: NeuralUI
    },
    {
      id: 'ai-tutor',
      name: 'AI עם זיהוי רגשות',
      description: 'מורה פרטי שמבין איך אתה מרגיש ומתאים את השיעור',
      icon: Zap,
      color: 'from-green-500 to-teal-600',
      component: EmotionAITutor
    },
    {
      id: 'social-learning',
      name: 'למידה חברתית',
      description: 'למד עם אנשים אמיתיים מכל העולם בזמן אמת',
      icon: Users,
      color: 'from-pink-500 to-rose-600',
      component: RealTimeLearningChat
    },
    {
      id: 'vr-ar',
      name: 'VR & AR',
      description: 'חווה שפות בסביבות אמיתיות עם טכנולוגיה מתקדמת',
      icon: Eye,
      color: 'from-orange-500 to-red-600',
      component: VRARLearning
    },
    {
      id: 'smart-pricing',
      name: 'תמחור חכם',
      description: 'AI מתקדם מתאים את המחיר והתוכן בדיוק עבורך',
      icon: DollarSign,
      color: 'from-emerald-500 to-cyan-600',
      component: SmartPricing
    },
    {
      id: 'analytics',
      name: 'אנליטיקס מתקדמים',
      description: 'מעקב אחר ביצועים והתנהגות משתמשים',
      icon: BarChart3,
      color: 'from-violet-500 to-purple-600',
      component: AdvancedAnalytics
    },
    {
      id: 'launch-strategy',
      name: 'אסטרטגיית השקה',
      description: 'אסטרטגיית השקה מהפכנית לפריצת דרך בשוק',
      icon: Rocket,
      color: 'from-rose-500 to-pink-600',
      component: LaunchStrategy
    },
    {
      id: 'seo-optimizer',
      name: 'אופטימיזציית SEO',
      description: 'אופטימיזציה מתקדמת למנועי חיפוש וניתוח מתחרים',
      icon: Search,
      color: 'from-teal-500 to-green-600',
      component: SEOOptimizer
    },
    // {
    //   id: 'business-intelligence',
    //   name: 'בינה עסקית',
    //   description: 'ניתוח עסקי מתקדם וקבלת החלטות מבוססת נתונים',
    //   icon: TrendingUp,
    //   color: 'from-indigo-500 to-blue-600',
    //   component: BusinessIntelligence
    // }
  ]

  const stats = [
    { label: 'משתמשים פעילים', value: '2.5M+', icon: Users },
    { label: 'שפות נתמכות', value: '50+', icon: Globe },
    { label: 'שיעורים הושלמו', value: '100M+', icon: Trophy },
    { label: 'דירוג ממוצע', value: '4.9/5', icon: Star }
  ]

  const ActiveComponent = features.find(f => f.id === activeTab)?.component

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* כותרת ראשית */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-16 h-16 text-yellow-400" />
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                RIAHN
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              פלטפורמת לימוד השפות המהפכנית הראשונה בעולם
              <br />
              <span className="text-yellow-400">עם AI מתקדם, למידה חברתית וגיימיפיקציה חכמה</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDemoMode(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center"
              >
                <Play className="w-5 h-5 mr-2" />
                התחל דמו חינם
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center"
              >
                <Target className="w-5 h-5 mr-2" />
                למד עוד
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* סטטיסטיקות */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* תכונות מהפכניות */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            תכונות מהפכניות
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            טכנולוגיות מתקדמות שמשנות את הדרך שבה אנחנו לומדים שפות
          </p>
        </motion.div>

        {/* טאבים */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {features.map((feature) => (
            <motion.button
              key={feature.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(feature.id)}
              className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === feature.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <feature.icon className="w-5 h-5 mr-2" />
              {feature.name}
            </motion.button>
          ))}
        </div>

        {/* תוכן פעיל */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20 overflow-hidden"
        >
          {ActiveComponent && <ActiveComponent />}
        </motion.div>
      </div>

      {/* CTA סופי */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl p-12 border border-white/20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            מוכן להתחיל את המסע שלך?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            הצטרף למיליוני אנשים שכבר גילו את הדרך המהפכנית ללמוד שפות
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-green-500/25 transition-all duration-300 flex items-center"
            >
              <Award className="w-5 h-5 mr-2" />
              התחל עכשיו - חינם
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center"
            >
              <Globe className="w-5 h-5 mr-2" />
              צפה בדמו
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* מודל דמו */}
      {isDemoMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">דמו חינם - RIAHN</h3>
              <button
                onClick={() => setIsDemoMode(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-gray-300 mb-6">
                גלה את העתיד של לימוד השפות עם הטכנולוגיות המהפכניות שלנו
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3">מה תקבל בדמו:</h4>
                  <ul className="text-gray-300 space-y-2 text-left">
                    <li>• 3 שיעורי AI עם זיהוי רגשות</li>
                    <li>• גישה לקהילה החברתית</li>
                    <li>• 1 שיעור VR/AR</li>
                    <li>• ממשק נוירונים מתקדם</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-3">איך זה עובד:</h4>
                  <ul className="text-gray-300 space-y-2 text-left">
                    <li>1. בחר את השפה שלך</li>
                    <li>2. AI יזהה את הרגש שלך</li>
                    <li>3. השיעור יתאים אישית</li>
                    <li>4. למד עם אנשים אמיתיים</li>
                  </ul>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsDemoMode(false)
                  setActiveTab('neural-ui')
                }}
                className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
              >
                התחל דמו עכשיו
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}