'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Helper function for progress bar width
const getProgressWidth = (percentage: number) => ({ width: `${percentage}%` })
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  Clock, 
  Target,
  Zap,
  Brain,
  Heart,
  Trophy,
  Star,
  Download,
  Filter,
  Calendar,
  RefreshCw,
  Settings,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react'

interface AnalyticsData {
  users: {
    total: number
    active: number
    new: number
    returning: number
  }
  engagement: {
    sessionDuration: number
    pagesPerSession: number
    bounceRate: number
    conversionRate: number
  }
  learning: {
    lessonsCompleted: number
    averageScore: number
    streakDays: number
    languagesLearned: number
  }
  revenue: {
    total: number
    monthly: number
    conversion: number
    churn: number
  }
}

interface ABTest {
  id: string
  name: string
  status: 'running' | 'paused' | 'completed'
  variants: {
    name: string
    traffic: number
    conversion: number
    users: number
  }[]
  startDate: Date
  endDate?: Date
}

interface UserBehavior {
  event: string
  count: number
  trend: 'up' | 'down' | 'stable'
  change: number
}

export default function AdvancedAnalytics() {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('7d')
  const [isLoading, setIsLoading] = useState(false)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    users: { total: 125000, active: 45000, new: 8500, returning: 36500 },
    engagement: { sessionDuration: 18.5, pagesPerSession: 4.2, bounceRate: 32.5, conversionRate: 12.8 },
    learning: { lessonsCompleted: 1250000, averageScore: 87.3, streakDays: 7.2, languagesLearned: 3.1 },
    revenue: { total: 1250000, monthly: 180000, conversion: 8.5, churn: 5.2 }
  })
  const [abTests, setABTests] = useState<ABTest[]>([
    {
      id: '1',
      name: 'AI Tutor Personality',
      status: 'running',
      variants: [
        { name: 'Encouraging', traffic: 50, conversion: 15.2, users: 2500 },
        { name: 'Professional', traffic: 50, conversion: 12.8, users: 2500 }
      ],
      startDate: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Pricing Page Design',
      status: 'completed',
      variants: [
        { name: 'Original', traffic: 50, conversion: 8.5, users: 1500 },
        { name: 'New Design', traffic: 50, conversion: 12.3, users: 1500 }
      ],
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-14')
    }
  ])
  const [userBehavior, setUserBehavior] = useState<UserBehavior[]>([
    { event: 'Lesson Started', count: 45000, trend: 'up', change: 12.5 },
    { event: 'Lesson Completed', count: 38000, trend: 'up', change: 8.3 },
    { event: 'Social Interaction', count: 25000, trend: 'up', change: 15.7 },
    { event: 'VR Session', count: 8500, trend: 'up', change: 22.1 },
    { event: 'Premium Upgrade', count: 3200, trend: 'up', change: 5.2 },
    { event: 'App Uninstall', count: 1200, trend: 'down', change: -3.1 }
  ])

  const tabs = [
    { id: 'overview', name: 'סקירה כללית', icon: BarChart3 },
    { id: 'users', name: 'משתמשים', icon: Users },
    { id: 'engagement', name: 'מעורבות', icon: Eye },
    { id: 'learning', name: 'למידה', icon: Brain },
    { id: 'revenue', name: 'הכנסות', icon: TrendingUp },
    { id: 'ab-tests', name: 'A/B Tests', icon: Target }
  ]

  const timeRanges = [
    { value: '1d', label: 'יום אחרון' },
    { value: '7d', label: '7 ימים' },
    { value: '30d', label: '30 ימים' },
    { value: '90d', label: '90 ימים' }
  ]

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />
      case 'down': return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
      default: return <TrendingUp className="w-4 h-4 text-gray-400" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400'
      case 'down': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const refreshData = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+12.5%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {formatNumber(analyticsData.users.total)}
          </div>
          <div className="text-gray-400 text-sm">משתמשים כולל</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+8.3%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {analyticsData.engagement.sessionDuration}דק&apos;
          </div>
          <div className="text-gray-400 text-sm">זמן ממוצע</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+15.7%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {formatNumber(analyticsData.learning.lessonsCompleted)}
          </div>
          <div className="text-gray-400 text-sm">שיעורים הושלמו</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
            </div>
            <span className="text-green-400 text-sm font-medium">+5.2%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            ${formatNumber(analyticsData.revenue.monthly)}
          </div>
          <div className="text-gray-400 text-sm">הכנסה חודשית</div>
        </motion.div>
      </div>

      {/* User Behavior */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-6">התנהגות משתמשים</h3>
        <div className="space-y-4">
          {userBehavior.map((behavior, index) => (
            <motion.div
              key={behavior.event}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {getTrendIcon(behavior.trend)}
                <span className="text-white font-medium">{behavior.event}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-white font-bold">{formatNumber(behavior.count)}</span>
                <span className={`text-sm font-medium ${getTrendColor(behavior.trend)}`}>
                  {behavior.change > 0 ? '+' : ''}{behavior.change}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderABTests = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">A/B Tests</h3>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
          צור מבחן חדש
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {abTests.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">{test.name}</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                test.status === 'running' ? 'bg-green-500/20 text-green-400' :
                test.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {test.status === 'running' ? 'פעיל' :
                 test.status === 'completed' ? 'הושלם' : 'מושהה'}
              </span>
            </div>

            <div className="space-y-4">
              {test.variants.map((variant, variantIndex) => (
                <div key={variantIndex} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{variant.name}</span>
                    <span className="text-sm text-gray-400">{variant.traffic}% תנועה</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">המרות:</span>
                      <span className="text-white font-bold ml-2">{variant.conversion}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">משתמשים:</span>
                      <span className="text-white font-bold ml-2">{formatNumber(variant.users)}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={getProgressWidth(variant.traffic)}
                        data-progress={variant.traffic}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>התחיל: {test.startDate.toLocaleDateString('he-IL')}</span>
                {test.endDate && (
                  <span>הסתיים: {test.endDate.toLocaleDateString('he-IL')}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Analytics מתקדמים</h1>
            <p className="text-gray-300">מעקב אחר ביצועים והתנהגות משתמשים</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              aria-label="בחר טווח זמן"
              className="bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
            
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              רענן
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.name}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'ab-tests' && renderABTests()}
          {activeTab === 'users' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">ניתוח משתמשים</h3>
              <p className="text-gray-300">תוכן ניתוח משתמשים יופיע כאן...</p>
            </div>
          )}
          {activeTab === 'engagement' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">ניתוח מעורבות</h3>
              <p className="text-gray-300">תוכן ניתוח מעורבות יופיע כאן...</p>
            </div>
          )}
          {activeTab === 'learning' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">ניתוח למידה</h3>
              <p className="text-gray-300">תוכן ניתוח למידה יופיע כאן...</p>
            </div>
          )}
          {activeTab === 'revenue' && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">ניתוח הכנסות</h3>
              <p className="text-gray-300">תוכן ניתוח הכנסות יופיע כאן...</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
