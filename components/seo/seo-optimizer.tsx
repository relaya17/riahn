'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  TrendingUp, 
  Target, 
  BarChart3, 
  AlertCircle,
  FileText,
  Tag,
  Hash,
  Settings,
  RefreshCw,
  Minimize,
  Plus
} from 'lucide-react'

interface SEOKeyword {
  keyword: string
  volume: number
  difficulty: number
  cpc: number
  trend: 'up' | 'down' | 'stable'
  position: number
  url: string
  competitor: string
}

interface SEOMetric {
  name: string
  value: number
  target: number
  status: 'good' | 'warning' | 'critical'
  trend: number
  description: string
}

interface Competitor {
  name: string
  domain: string
  traffic: number
  keywords: number
  backlinks: number
  domainRating: number
  organicTraffic: number
  paidTraffic: number
}

export default function SEOOptimizer() {
  const [activeTab, setActiveTab] = useState('overview')
  const [keywords, setKeywords] = useState<SEOKeyword[]>([])
  const [metrics, setMetrics] = useState<SEOMetric[]>([])
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    const mockKeywords: SEOKeyword[] = [
      {
        keyword: 'learn hebrew online',
        volume: 12000,
        difficulty: 45,
        cpc: 2.5,
        trend: 'up',
        position: 3,
        url: '/learn-hebrew',
        competitor: 'hebrewpod101.com'
      },
      {
        keyword: 'hebrew language course',
        volume: 8500,
        difficulty: 38,
        cpc: 3.2,
        trend: 'stable',
        position: 5,
        url: '/courses/hebrew',
        competitor: 'duolingo.com'
      },
      {
        keyword: 'ai language tutor',
        volume: 15000,
        difficulty: 52,
        cpc: 4.1,
        trend: 'up',
        position: 2,
        url: '/ai-tutor',
        competitor: 'babbel.com'
      }
    ]

    const mockMetrics: SEOMetric[] = [
      {
        name: 'Organic Traffic',
        value: 45000,
        target: 60000,
        status: 'good',
        trend: 15.2,
        description: 'Monthly organic visitors'
      },
      {
        name: 'Keyword Rankings',
        value: 1250,
        target: 2000,
        status: 'warning',
        trend: 8.5,
        description: 'Keywords in top 100'
      },
      {
        name: 'Backlinks',
        value: 340,
        target: 500,
        status: 'warning',
        trend: 12.3,
        description: 'Quality backlinks'
      },
      {
        name: 'Page Speed',
        value: 85,
        target: 90,
        status: 'good',
        trend: 5.2,
        description: 'Core Web Vitals score'
      }
    ]

    const mockCompetitors: Competitor[] = [
      {
        name: 'Duolingo',
        domain: 'duolingo.com',
        traffic: 120000000,
        keywords: 250000,
        backlinks: 1500000,
        domainRating: 95,
        organicTraffic: 80000000,
        paidTraffic: 40000000
      },
      {
        name: 'Babbel',
        domain: 'babbel.com',
        traffic: 45000000,
        keywords: 180000,
        backlinks: 850000,
        domainRating: 88,
        organicTraffic: 30000000,
        paidTraffic: 15000000
      },
      {
        name: 'HebrewPod101',
        domain: 'hebrewpod101.com',
        traffic: 8500000,
        keywords: 45000,
        backlinks: 120000,
        domainRating: 72,
        organicTraffic: 6000000,
        paidTraffic: 2500000
      }
    ]

    setKeywords(mockKeywords)
    setMetrics(mockMetrics)
    setCompetitors(mockCompetitors)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500/20 text-green-400'
      case 'warning': return 'bg-yellow-500/20 text-yellow-400'
      case 'critical': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-400" />
      case 'down': return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
      case 'stable': return <Minimize className="w-4 h-4 text-gray-400" />
      default: return <Minimize className="w-4 h-4 text-gray-400" />
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const runSEOAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      // כאן יהיה קוד לניתוח SEO אמיתי
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            SEO Optimizer
          </h1>
          <p className="text-gray-300 text-lg">
            אופטימיזציה מתקדמת למנועי חיפוש וניתוח מתחרים
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          {[
            { id: 'overview', label: 'סקירה כללית', icon: BarChart3 },
            { id: 'keywords', label: 'מילות מפתח', icon: Hash },
            { id: 'competitors', label: 'מתחרים', icon: Target },
            { id: 'content', label: 'תוכן', icon: FileText },
            { id: 'technical', label: 'טכני', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-green-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* SEO Score */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-white">87</span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">SEO Score</h3>
                <p className="text-gray-300">מעולה! אתר מוכן למנועי חיפוש</p>
                <button
                  onClick={runSEOAnalysis}
                  disabled={isAnalyzing}
                  className="mt-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center mx-auto"
                >
                  {isAnalyzing ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  {isAnalyzing ? 'מנתח...' : 'הרץ ניתוח SEO'}
                </button>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric) => (
                  <div key={metric.name} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-medium">{metric.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(metric.status)}`}>
                        {metric.status}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">
                      {formatNumber(metric.value)}
                    </div>
                    <div className="text-sm text-gray-400 mb-3">
                      יעד: {formatNumber(metric.target)}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          metric.status === 'good' ? 'bg-green-500' :
                          metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        data-progress={Math.min(Math.round((metric.value / metric.target) * 100), 100)}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">{metric.description}</span>
                      <span className={`text-sm ${metric.trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.trend > 0 ? '+' : ''}{metric.trend}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'keywords' && (
            <motion.div
              key="keywords"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">מילות מפתח</h2>
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  הוסף מילת מפתח
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="text-left p-4 text-white font-medium">מילת מפתח</th>
                        <th className="text-left p-4 text-white font-medium">נפח</th>
                        <th className="text-left p-4 text-white font-medium">קושי</th>
                        <th className="text-left p-4 text-white font-medium">CPC</th>
                        <th className="text-left p-4 text-white font-medium">מיקום</th>
                        <th className="text-left p-4 text-white font-medium">מגמה</th>
                        <th className="text-left p-4 text-white font-medium">פעולות</th>
                      </tr>
                    </thead>
                    <tbody>
                      {keywords.map((keyword) => (
                        <tr key={keyword.keyword} className="border-t border-white/10">
                          <td className="p-4">
                            <div>
                              <div className="text-white font-medium">{keyword.keyword}</div>
                              <div className="text-gray-400 text-sm">{keyword.url}</div>
                            </div>
                          </td>
                          <td className="p-4 text-white">{formatNumber(keyword.volume)}</td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    keyword.difficulty < 30 ? 'bg-green-500' :
                                    keyword.difficulty < 60 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  data-progress={keyword.difficulty}
                                ></div>
                              </div>
                              <span className="text-white text-sm">{keyword.difficulty}</span>
                            </div>
                          </td>
                          <td className="p-4 text-white">${keyword.cpc}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              keyword.position <= 3 ? 'bg-green-500/20 text-green-400' :
                              keyword.position <= 10 ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              #{keyword.position}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center">
                              {getTrendIcon(keyword.trend)}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                                ערוך
                              </button>
                              <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors">
                                פרטים
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'competitors' && (
            <motion.div
              key="competitors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white">ניתוח מתחרים</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {competitors.map((competitor) => (
                  <div key={competitor.name} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{competitor.name}</h3>
                        <p className="text-gray-400 text-sm">{competitor.domain}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{competitor.domainRating}</div>
                        <div className="text-gray-400 text-xs">DR</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">טרפיק:</span>
                        <span className="text-white">{formatNumber(competitor.traffic)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">מילות מפתח:</span>
                        <span className="text-white">{formatNumber(competitor.keywords)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">בקלינקים:</span>
                        <span className="text-white">{formatNumber(competitor.backlinks)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">אורגני:</span>
                        <span className="text-white">{formatNumber(competitor.organicTraffic)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">משולם:</span>
                        <span className="text-white">{formatNumber(competitor.paidTraffic)}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                        ניתוח
                      </button>
                      <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors">
                        השווה
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'content' && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white">אופטימיזציית תוכן</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">בדיקת תוכן</h3>
                  <div className="space-y-4">
                    {[
                      { item: 'כותרות H1', status: 'good', count: 12 },
                      { item: 'כותרות H2-H6', status: 'good', count: 45 },
                      { item: 'תמונות עם Alt', status: 'warning', count: 8 },
                      { item: 'קישורים פנימיים', status: 'good', count: 23 },
                      { item: 'מטא תיאורים', status: 'good', count: 15 }
                    ].map((item) => (
                      <div key={item.item} className="flex items-center justify-between">
                        <span className="text-white">{item.item}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">{item.count}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">המלצות</h3>
                  <div className="space-y-4">
                    {[
                      'הוסף alt text לתמונות חסרות',
                      'שפר את צפיפות מילות המפתח',
                      'הוסף קישורים פנימיים נוספים',
                      'שפר את מהירות הטעינה',
                      'הוסף structured data'
                    ].map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'technical' && (
            <motion.div
              key="technical"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white">SEO טכני</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">ביצועים</h3>
                  <div className="space-y-4">
                    {[
                      { metric: 'Page Speed', value: 85, status: 'good' },
                      { metric: 'Core Web Vitals', value: 92, status: 'good' },
                      { metric: 'Mobile Friendly', value: 100, status: 'good' },
                      { metric: 'SSL Certificate', value: 100, status: 'good' },
                      { metric: 'Crawl Errors', value: 2, status: 'warning' }
                    ].map((metric) => (
                      <div key={metric.metric} className="flex items-center justify-between">
                        <span className="text-white">{metric.metric}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">{metric.value}{metric.metric.includes('Errors') ? '' : '%'}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(metric.status)}`}>
                            {metric.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">מבנה אתר</h3>
                  <div className="space-y-4">
                    {[
                      { item: 'Sitemap', status: 'good' },
                      { item: 'Robots.txt', status: 'good' },
                      { item: 'Schema Markup', status: 'warning' },
                      { item: 'Canonical URLs', status: 'good' },
                      { item: '404 Pages', status: 'good' }
                    ].map((item) => (
                      <div key={item.item} className="flex items-center justify-between">
                        <span className="text-white">{item.item}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
