'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Crown, 
  Star, 
  Users, 
  Brain, 
  Eye, 
  Check,
  X,
  ArrowRight,
  Sparkles,
  Gift,
  Globe,
  Heart,
  Target,
  Award,
  Building
} from 'lucide-react'

interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  period: 'monthly' | 'yearly' | 'lifetime'
  features: string[]
  limitations: string[]
  popular?: boolean
  color: string
  icon: React.ComponentType<{ className?: string }>
  targetAudience: string
  conversionGoal: string
}

interface UserProfile {
  level: 'beginner' | 'intermediate' | 'advanced'
  usage: 'light' | 'moderate' | 'heavy'
  budget: 'low' | 'medium' | 'high'
  goals: string[]
  preferredFeatures: string[]
}

interface DynamicPricing {
  basePrice: number
  adjustments: {
    level: number
    usage: number
    budget: number
    seasonality: number
  }
  finalPrice: number
  discount: number
}

export default function SmartPricing() {
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [userProfile, setUserProfile] = useState<UserProfile>({
    level: 'beginner',
    usage: 'light',
    budget: 'medium',
    goals: [],
    preferredFeatures: []
  })
  const [showPersonalization, setShowPersonalization] = useState(false)
  const [dynamicPricing, setDynamicPricing] = useState<DynamicPricing | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const pricingPlans: PricingPlan[] = [
    {
      id: 'free',
      name: 'חינמי',
      description: 'מושלם למתחילים',
      price: 0,
      period: 'monthly',
      features: [
        '3 שיעורים ביום',
        'גישה לקהילה בסיסית',
        'AI Tutor בסיסי',
        'תמיכה בדוא"ל'
      ],
      limitations: [
        'ללא שיעורי VR/AR',
        'ללא מורה פרטי AI',
        'ללא תעודות',
        'פרסומות'
      ],
      color: 'from-gray-500 to-gray-600',
      icon: Gift,
      targetAudience: 'מתחילים',
      conversionGoal: 'upgrade_to_premium'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'הכי פופולרי',
      price: 9.99,
      originalPrice: 19.99,
      period: 'monthly',
      features: [
        'שיעורים בלתי מוגבלים',
        'AI Tutor מתקדם',
        'זיהוי רגשות',
        'קהילה מלאה',
        'תמיכה 24/7',
        'ללא פרסומות'
      ],
      limitations: [
        'ללא שיעורי VR/AR',
        'ללא תעודות NFT'
      ],
      popular: true,
      color: 'from-blue-500 to-purple-600',
      icon: Star,
      targetAudience: 'לומדים פעילים',
      conversionGoal: 'upgrade_to_pro'
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'למתקדמים',
      price: 19.99,
      originalPrice: 39.99,
      period: 'monthly',
      features: [
        'כל תכונות Premium',
        'שיעורי VR/AR',
        'מורה פרטי AI',
        'תעודות NFT',
        'ניתוח מתקדם',
        'הדרכות מותאמות'
      ],
      limitations: [],
      color: 'from-purple-500 to-pink-600',
      icon: Crown,
      targetAudience: 'מתקדמים',
      conversionGoal: 'retention'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'לחברות',
      price: 50,
      period: 'monthly',
      features: [
        'כל תכונות Pro',
        'ניהול משתמשים',
        'דוחות מתקדמים',
        'API מותאם',
        'תמיכה ייעודית',
        'הדרכות מותאמות'
      ],
      limitations: [],
      color: 'from-green-500 to-emerald-600',
      icon: Building,
      targetAudience: 'חברות',
      conversionGoal: 'enterprise_sales'
    }
  ]

  const goals = [
    { id: 'travel', label: 'נסיעות', icon: Globe },
    { id: 'career', label: 'קריירה', icon: Award },
    { id: 'education', label: 'השכלה', icon: Brain },
    { id: 'social', label: 'חברתי', icon: Users },
    { id: 'hobby', label: 'תחביב', icon: Heart }
  ]

  const features = [
    { id: 'ai-tutor', label: 'AI Tutor מתקדם', icon: Brain },
    { id: 'vr-ar', label: 'VR/AR', icon: Eye },
    { id: 'social', label: 'למידה חברתית', icon: Users },
    { id: 'certificates', label: 'תעודות', icon: Award },
    { id: 'analytics', label: 'ניתוח מתקדם', icon: Target }
  ]

  // חישוב מחיר דינמי
  useEffect(() => {
    const calculateDynamicPricing = () => {
      const basePrice = pricingPlans.find(p => p.id === 'premium')?.price || 9.99
      
      const adjustments = {
        level: userProfile.level === 'advanced' ? 0.2 : userProfile.level === 'intermediate' ? 0.1 : 0,
        usage: userProfile.usage === 'heavy' ? 0.15 : userProfile.usage === 'moderate' ? 0.05 : 0,
        budget: userProfile.budget === 'high' ? 0.1 : userProfile.budget === 'low' ? -0.1 : 0,
        seasonality: 0.05 // 5% הנחה עונתית
      }

      const totalAdjustment = Object.values(adjustments).reduce((sum, adj) => sum + adj, 0)
      const finalPrice = basePrice * (1 + totalAdjustment)
      const discount = Math.max(0, totalAdjustment * 100)

      setDynamicPricing({
        basePrice,
        adjustments,
        finalPrice,
        discount
      })
    }

    if (showPersonalization) {
      calculateDynamicPricing()
    }
  }, [userProfile, showPersonalization])

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const getPrice = (plan: PricingPlan) => {
    if (plan.id === 'free') return 0
    
    let price = plan.price
    if (billingPeriod === 'yearly') {
      price = price * 12 * 0.8 // 20% הנחה לשנתי
    }
    
    return price
  }

  const getPeriodText = (plan: PricingPlan) => {
    if (plan.id === 'free') return 'תמיד חינם'
    if (billingPeriod === 'yearly') return 'לשנה'
    return 'לחודש'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            תמחור חכם ומותאם אישית
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            AI מתקדם מתאים את המחיר והתוכן בדיוק עבורך
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
              חודשי
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              aria-label="החלף בין תשלום חודשי לשנתי"
              className="relative w-12 h-6 bg-gray-600 rounded-full transition-colors"
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
            <span className={`text-sm ${billingPeriod === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
              שנתי
            </span>
            {billingPeriod === 'yearly' && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                חיסכון 20%
              </span>
            )}
          </div>

          {/* Personalization Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPersonalization(!showPersonalization)}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center mx-auto"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            התאמה אישית חכמה
          </motion.button>
        </motion.div>

        {/* Personalization Panel */}
        <AnimatePresence>
          {showPersonalization && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8"
            >
              <h3 className="text-xl font-semibold text-white mb-6">התאמה אישית</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Level */}
                <div>
                  <label className="block text-white font-medium mb-3">רמת למידה</label>
                  <div className="space-y-2">
                    {['beginner', 'intermediate', 'advanced'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setUserProfile(prev => ({ ...prev, level: level as 'beginner' | 'intermediate' | 'advanced' }))}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          userProfile.level === level
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {level === 'beginner' ? 'מתחיל' :
                         level === 'intermediate' ? 'בינוני' : 'מתקדם'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Usage */}
                <div>
                  <label className="block text-white font-medium mb-3">רמת שימוש</label>
                  <div className="space-y-2">
                    {['light', 'moderate', 'heavy'].map((usage) => (
                      <button
                        key={usage}
                        onClick={() => setUserProfile(prev => ({ ...prev, usage: usage as 'light' | 'moderate' | 'heavy' }))}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          userProfile.usage === usage
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {usage === 'light' ? 'קל' :
                         usage === 'moderate' ? 'בינוני' : 'כבד'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-white font-medium mb-3">תקציב</label>
                  <div className="space-y-2">
                    {['low', 'medium', 'high'].map((budget) => (
                      <button
                        key={budget}
                        onClick={() => setUserProfile(prev => ({ ...prev, budget: budget as 'low' | 'medium' | 'high' }))}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          userProfile.budget === budget
                            ? 'bg-blue-500 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {budget === 'low' ? 'נמוך' :
                         budget === 'medium' ? 'בינוני' : 'גבוה'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Goals */}
              <div className="mt-6">
                <label className="block text-white font-medium mb-3">מטרות למידה</label>
                <div className="flex flex-wrap gap-3">
                  {goals.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => {
                        setUserProfile(prev => ({
                          ...prev,
                          goals: prev.goals.includes(goal.id)
                            ? prev.goals.filter(g => g !== goal.id)
                            : [...prev.goals, goal.id]
                        }))
                      }}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                        userProfile.goals.includes(goal.id)
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <goal.icon className="w-4 h-4 mr-2" />
                      {goal.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Pricing Display */}
              {dynamicPricing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">מחיר מותאם אישית</h4>
                      <p className="text-gray-300 text-sm">AI חישב את המחיר המושלם עבורך</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        ${dynamicPricing.finalPrice.toFixed(2)}
                      </div>
                      {dynamicPricing.discount > 0 && (
                        <div className="text-green-400 text-sm">
                          חיסכון {dynamicPricing.discount.toFixed(1)}%
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ${
                plan.popular
                  ? 'border-blue-500/50 shadow-lg shadow-blue-500/20'
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    הכי פופולרי
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold text-white">
                      ${getPrice(plan)}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ${plan.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="text-gray-400 text-sm">{getPeriodText(plan)}</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="text-white font-semibold">כולל:</h4>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {plan.limitations.length > 0 && (
                <div className="space-y-2 mb-6">
                  <h4 className="text-white font-semibold">לא כולל:</h4>
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-center space-x-2">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span className="text-gray-400 text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.id === 'free'
                    ? 'bg-gray-600 hover:bg-gray-700 text-white'
                    : `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg`
                }`}
              >
                {plan.id === 'free' ? 'התחל חינם' : 'בחר תוכנית'}
                <ArrowRight className="w-4 h-4 inline ml-2" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md w-full text-center"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">הצלחה!</h3>
                <p className="text-gray-300 mb-6">
                  בחרת בתוכנית {pricingPlans.find(p => p.id === selectedPlan)?.name}
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  המשך
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">שאלות נפוצות</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-2">איך עובד התמחור החכם?</h4>
              <p className="text-gray-300 text-sm">
                AI מתקדם שלנו מנתח את הפרופיל שלך ומתאים את המחיר והתוכן בדיוק עבורך.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">האם יש החזר כספי?</h4>
              <p className="text-gray-300 text-sm">
                כן! יש לנו מדיניות החזר כספי של 30 יום ללא שאלות.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">איך עובדת ההנחה השנתית?</h4>
              <p className="text-gray-300 text-sm">
                תשלום שנתי חוסך לך 20% מהמחיר החודשי.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">האם אוכל לשנות תוכנית?</h4>
              <p className="text-gray-300 text-sm">
                כן, תוכל לשדרג או להוריד תוכנית בכל עת.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
