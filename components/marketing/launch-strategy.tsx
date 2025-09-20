'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Target, 
  Globe, 
  Star,
  Award,
  BarChart3,
  Activity,
  Eye,
  Plus,
  Share2,
  DollarSign,
  Zap,
  TrendingUp
} from 'lucide-react'

interface Campaign {
  id: string
  name: string
  type: 'social' | 'influencer' | 'paid' | 'organic' | 'viral'
  status: 'planning' | 'active' | 'completed' | 'paused'
  budget: number
  spent: number
  reach: number
  engagement: number
  conversions: number
  roi: number
  startDate: string
  endDate: string
  platforms: string[]
  targetAudience: string
  creative: string
}

interface Influencer {
  id: string
  name: string
  platform: string
  followers: number
  engagement: number
  category: string
  price: number
  status: 'contacted' | 'negotiating' | 'confirmed' | 'completed'
  content: string
  expectedReach: number
}

interface ViralContent {
  id: string
  title: string
  type: 'video' | 'meme' | 'challenge' | 'story'
  platform: string
  views: number
  shares: number
  likes: number
  comments: number
  virality: number
  status: 'trending' | 'viral' | 'declining'
}

export default function LaunchStrategy() {
  const [activeTab, setActiveTab] = useState('overview')
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [influencers, setInfluencers] = useState<Influencer[]>([])
  const [viralContent, setViralContent] = useState<ViralContent[]>([])
  const [showCreateCampaign, setShowCreateCampaign] = useState(false)

  // סימולציה של נתונים
  useEffect(() => {
    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'RIAHN Launch - Hebrew Learning',
        type: 'social',
        status: 'active',
        budget: 50000,
        spent: 12500,
        reach: 250000,
        engagement: 8.5,
        conversions: 1250,
        roi: 340,
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        platforms: ['Instagram', 'TikTok', 'YouTube'],
        targetAudience: 'Hebrew learners 18-35',
        creative: 'AI Tutor demo videos'
      },
      {
        id: '2',
        name: 'VR Learning Experience',
        type: 'influencer',
        status: 'active',
        budget: 25000,
        spent: 8750,
        reach: 180000,
        engagement: 12.3,
        conversions: 890,
        roi: 280,
        startDate: '2024-01-20',
        endDate: '2024-02-20',
        platforms: ['YouTube', 'Instagram'],
        targetAudience: 'Tech enthusiasts',
        creative: 'VR demo with influencers'
      }
    ]

    const mockInfluencers: Influencer[] = [
      {
        id: '1',
        name: 'שרה כהן',
        platform: 'Instagram',
        followers: 150000,
        engagement: 4.2,
        category: 'Education',
        price: 5000,
        status: 'confirmed',
        content: 'Hebrew learning journey',
        expectedReach: 45000
      },
      {
        id: '2',
        name: 'TechReviewer',
        platform: 'YouTube',
        followers: 500000,
        engagement: 6.8,
        category: 'Technology',
        price: 15000,
        status: 'negotiating',
        content: 'VR learning review',
        expectedReach: 120000
      }
    ]

    const mockViralContent: ViralContent[] = [
      {
        id: '1',
        title: 'AI Tutor learns Hebrew in 5 minutes',
        type: 'video',
        platform: 'TikTok',
        views: 2500000,
        shares: 45000,
        likes: 180000,
        comments: 12000,
        virality: 95,
        status: 'viral'
      },
      {
        id: '2',
        title: 'VR Hebrew Market Challenge',
        type: 'challenge',
        platform: 'Instagram',
        views: 1200000,
        shares: 25000,
        likes: 95000,
        comments: 8500,
        virality: 78,
        status: 'trending'
      }
    ]

    setCampaigns(mockCampaigns)
    setInfluencers(mockInfluencers)
    setViralContent(mockViralContent)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400'
      case 'completed': return 'bg-blue-500/20 text-blue-400'
      case 'paused': return 'bg-yellow-500/20 text-yellow-400'
      case 'planning': return 'bg-gray-500/20 text-gray-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'social': return <Share2 className="w-4 h-4" />
      case 'influencer': return <Star className="w-4 h-4" />
      case 'paid': return <DollarSign className="w-4 h-4" />
      case 'organic': return <Globe className="w-4 h-4" />
      case 'viral': return <Zap className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Launch Strategy & Marketing
          </h1>
          <p className="text-gray-300 text-lg">
            אסטרטגיית השקה מהפכנית לפריצת דרך בשוק למידת השפות
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          {[
            { id: 'overview', label: 'סקירה כללית', icon: BarChart3 },
            { id: 'campaigns', label: 'קמפיינים', icon: Target },
            { id: 'influencers', label: 'Influencers', icon: Star },
            { id: 'viral', label: 'תוכן ויראלי', icon: Zap },
            { id: 'analytics', label: 'אנליטיקס', icon: Activity }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
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
              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">סה&quot;כ השקעה</p>
                      <p className="text-2xl font-bold text-white">$75K</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="mt-2">
                    <span className="text-green-400 text-sm">+15% מהתקציב</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">הגעה</p>
                      <p className="text-2xl font-bold text-white">430K</p>
                    </div>
                    <Eye className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="mt-2">
                    <span className="text-blue-400 text-sm">+25% השבוע</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">המרות</p>
                      <p className="text-2xl font-bold text-white">2.1K</p>
                    </div>
                    <Target className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="mt-2">
                    <span className="text-purple-400 text-sm">+40% השבוע</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">ROI ממוצע</p>
                      <p className="text-2xl font-bold text-white">310%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="mt-2">
                    <span className="text-yellow-400 text-sm">+12% השבוע</span>
                  </div>
                </div>
              </div>

              {/* Campaign Performance */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">ביצועי קמפיינים</h3>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                          {getTypeIcon(campaign.type)}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{campaign.name}</h4>
                          <p className="text-gray-400 text-sm">{campaign.platforms.join(', ')}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-white font-bold">{formatNumber(campaign.reach)}</p>
                          <p className="text-gray-400 text-xs">הגעה</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white font-bold">{campaign.conversions}</p>
                          <p className="text-gray-400 text-xs">המרות</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white font-bold">{campaign.roi}%</p>
                          <p className="text-gray-400 text-xs">ROI</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'campaigns' && (
            <motion.div
              key="campaigns"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">קמפיינים פעילים</h2>
                <button
                  onClick={() => setShowCreateCampaign(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  קמפיין חדש
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">{campaign.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">תקציב:</span>
                        <span className="text-white">${formatNumber(campaign.budget)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">הוצאה:</span>
                        <span className="text-white">${formatNumber(campaign.spent)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">הגעה:</span>
                        <span className="text-white">{formatNumber(campaign.reach)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">המרות:</span>
                        <span className="text-white">{campaign.conversions}</span>
                      </div>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        data-progress={Math.round((campaign.spent / campaign.budget) * 100)}
                      ></div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                        ערוך
                      </button>
                      <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors">
                        פרטים
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'influencers' && (
            <motion.div
              key="influencers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white">Influencer Marketing</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {influencers.map((influencer) => (
                  <div key={influencer.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{influencer.name}</h3>
                        <p className="text-gray-400 text-sm">{influencer.platform} • {influencer.category}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">עוקבים:</span>
                        <span className="text-white">{formatNumber(influencer.followers)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">אנגייג&apos;מנט:</span>
                        <span className="text-white">{influencer.engagement}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">מחיר:</span>
                        <span className="text-white">${formatNumber(influencer.price)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">הגעה צפויה:</span>
                        <span className="text-white">{formatNumber(influencer.expectedReach)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        influencer.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                        influencer.status === 'negotiating' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {influencer.status}
                      </span>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                        צור קשר
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'viral' && (
            <motion.div
              key="viral"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white">תוכן ויראלי</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {viralContent.map((content) => (
                  <div key={content.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">{content.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        content.status === 'viral' ? 'bg-red-500/20 text-red-400' :
                        content.status === 'trending' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {content.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">צפיות:</span>
                        <span className="text-white">{formatNumber(content.views)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">שיתופים:</span>
                        <span className="text-white">{formatNumber(content.shares)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">לייקים:</span>
                        <span className="text-white">{formatNumber(content.likes)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ויראליות:</span>
                        <span className="text-white">{content.virality}%</span>
                      </div>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                        data-progress={content.virality}
                      ></div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                        צפה
                      </button>
                      <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors">
                        שתף
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white">אנליטיקס מתקדמים</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">ביצועי פלטפורמות</h3>
                  <div className="space-y-4">
                    {[
                      { platform: 'Instagram', reach: 180000, engagement: 8.5, conversions: 650 },
                      { platform: 'TikTok', reach: 150000, engagement: 12.3, conversions: 420 },
                      { platform: 'YouTube', reach: 100000, engagement: 6.8, conversions: 180 }
                    ].map((platform) => (
                      <div key={platform.platform} className="flex items-center justify-between">
                        <span className="text-white">{platform.platform}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-400 text-sm">{formatNumber(platform.reach)}</span>
                          <span className="text-gray-400 text-sm">{platform.engagement}%</span>
                          <span className="text-gray-400 text-sm">{platform.conversions}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">קהל יעד</h3>
                  <div className="space-y-4">
                    {[
                      { segment: 'גילאי 18-25', percentage: 45, color: 'bg-blue-500' },
                      { segment: 'גילאי 26-35', percentage: 35, color: 'bg-green-500' },
                      { segment: 'גילאי 36-45', percentage: 20, color: 'bg-purple-500' }
                    ].map((segment) => (
                      <div key={segment.segment}>
                        <div className="flex justify-between mb-1">
                          <span className="text-white text-sm">{segment.segment}</span>
                          <span className="text-gray-400 text-sm">{segment.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`${segment.color} h-2 rounded-full transition-all duration-300`}
                            data-progress={segment.percentage}
                          ></div>
                        </div>
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
