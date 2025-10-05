'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { 
  Search, 
  Filter, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Globe,
  Star,
  Clock,
  TrendingUp,
  Award,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface SearchResult {
  id: string
  type: 'user' | 'lesson' | 'forum' | 'article'
  title: string
  description: string
  relevance: number
  language?: string
  level?: string
  author?: string
  tags?: string[]
  timestamp?: Date
  rating?: number
  participants?: number
}

interface AdvancedSearchProps {
  isOpen: boolean
  onClose: () => void
  onResultClick?: (result: SearchResult) => void
}

export function AdvancedSearch({ isOpen, onClose, onResultClick }: AdvancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [filters, setFilters] = useState({
    type: 'all',
    language: 'all',
    level: 'all',
    sortBy: 'relevance'
  })
  const [showFilters, setShowFilters] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [popularSearches] = useState([
    'עברית למתחילים',
    'דקדוק עברי',
    'שיחה יומיומית',
    'מילים בסיסיות',
    'תרבות ישראלית'
  ])

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: '1',
      type: 'lesson',
      title: 'מילים בסיסיות בעברית',
      description: 'למד מילים בסיסיות בעברית עם דוגמאות ותרגילים',
      relevance: 95,
      language: 'he',
      level: 'beginner',
      author: 'Sarah Johnson',
      tags: ['מילים', 'בסיסי', 'עברית'],
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      rating: 4.8
    },
    {
      id: '2',
      type: 'user',
      title: 'Sarah Johnson',
      description: 'דוברת אנגלית שמלמדת עברית. 5 שנות ניסיון',
      relevance: 88,
      language: 'en',
      level: 'advanced',
      tags: ['מורה', 'אנגלית', 'עברית'],
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      rating: 4.9
    },
    {
      id: '3',
      type: 'forum',
      title: 'איך ללמוד עברית מהר?',
      description: 'דיון על שיטות למידה מהירות של עברית',
      relevance: 82,
      language: 'he',
      level: 'intermediate',
      author: 'Ahmed Al-Rashid',
      tags: ['למידה', 'מהיר', 'טיפים'],
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      participants: 23
    },
    {
      id: '4',
      type: 'lesson',
      title: 'דקדוק עברי מתקדם',
      description: 'שיעור מתקדם על דקדוק עברי עם תרגילים',
      relevance: 78,
      language: 'he',
      level: 'advanced',
      author: 'David Cohen',
      tags: ['דקדוק', 'מתקדם', 'עברית'],
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      rating: 4.6
    },
    {
      id: '5',
      type: 'article',
      title: 'תרבות ישראלית - מדריך למתחילים',
      description: 'מאמר מקיף על התרבות הישראלית והמסורות',
      relevance: 75,
      language: 'he',
      level: 'beginner',
      author: 'Maria Garcia',
      tags: ['תרבות', 'ישראל', 'מסורות'],
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      rating: 4.7
    }
  ]

  useEffect(() => {
    if (searchQuery.length > 2) {
      performSearch()
    } else {
      setSearchResults([])
    }
  }, [searchQuery, filters])

  const performSearch = async () => {
    setIsSearching(true)
    
    // Simulate API call
    setTimeout(() => {
      let results = mockResults.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )

      // Apply filters
      if (filters.type !== 'all') {
        results = results.filter(result => result.type === filters.type)
      }
      if (filters.language !== 'all') {
        results = results.filter(result => result.language === filters.language)
      }
      if (filters.level !== 'all') {
        results = results.filter(result => result.level === filters.level)
      }

      // Sort results
      results.sort((a, b) => {
        switch (filters.sortBy) {
          case 'relevance':
            return b.relevance - a.relevance
          case 'rating':
            return (b.rating || 0) - (a.rating || 0)
          case 'newest':
            return (b.timestamp?.getTime() || 0) - (a.timestamp?.getTime() || 0)
          default:
            return b.relevance - a.relevance
        }
      })

      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)])
    }
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="h-4 w-4 text-blue-500" />
      case 'lesson': return <BookOpen className="h-4 w-4 text-green-500" />
      case 'forum': return <MessageSquare className="h-4 w-4 text-purple-500" />
      case 'article': return <Globe className="h-4 w-4 text-orange-500" />
      default: return <Search className="h-4 w-4 text-gray-500" />
    }
  }

  const getResultTypeLabel = (type: string) => {
    switch (type) {
      case 'user': return 'משתמש'
      case 'lesson': return 'שיעור'
      case 'forum': return 'פורום'
      case 'article': return 'מאמר'
      default: return 'תוצאה'
    }
  }

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getLevelLabel = (level?: string) => {
    switch (level) {
      case 'beginner': return 'מתחיל'
      case 'intermediate': return 'בינוני'
      case 'advanced': return 'מתקדם'
      default: return 'כל הרמות'
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Search Panel */}
      <div className="absolute top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-xl">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Search className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                חיפוש מתקדם
              </h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="חפש שיעורים, משתמשים, פורומים..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pr-12 text-lg py-3"
              autoFocus
            />
            {isSearching && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              מסננים
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      סוג תוכן
                    </label>
                    <Select
                      value={filters.type}
                      onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                      options={[
                        { value: 'all', label: 'הכל' },
                        { value: 'lesson', label: 'שיעורים' },
                        { value: 'user', label: 'משתמשים' },
                        { value: 'forum', label: 'פורומים' },
                        { value: 'article', label: 'מאמרים' }
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      שפה
                    </label>
                    <Select
                      value={filters.language}
                      onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value }))}
                      options={[
                        { value: 'all', label: 'כל השפות' },
                        { value: 'he', label: 'עברית' },
                        { value: 'en', label: 'אנגלית' },
                        { value: 'ar', label: 'ערבית' },
                        { value: 'es', label: 'ספרדית' }
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      רמה
                    </label>
                    <Select
                      value={filters.level}
                      onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
                      options={[
                        { value: 'all', label: 'כל הרמות' },
                        { value: 'beginner', label: 'מתחיל' },
                        { value: 'intermediate', label: 'בינוני' },
                        { value: 'advanced', label: 'מתקדם' }
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      מיון
                    </label>
                    <Select
                      value={filters.sortBy}
                      onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                      options={[
                        { value: 'relevance', label: 'רלוונטיות' },
                        { value: 'rating', label: 'דירוג' },
                        { value: 'newest', label: 'החדשים ביותר' }
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Results */}
          {searchQuery.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  תוצאות חיפוש ({searchResults.length})
                </h3>
                {searchResults.length > 0 && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    מיון לפי: {filters.sortBy === 'relevance' ? 'רלוונטיות' :
                               filters.sortBy === 'rating' ? 'דירוג' : 'החדשים ביותר'}
                  </div>
                )}
              </div>

              {searchResults.length === 0 && !isSearching ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      לא נמצאו תוצאות
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      נסה לשנות את מילות החיפוש או המסננים
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {searchResults.map((result) => (
                    <Card
                      key={result.id}
                      className="cursor-pointer hover:shadow-md transition-all"
                      onClick={() => onResultClick?.(result)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {getResultIcon(result.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                  {result.title}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                  {result.description}
                                </p>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-xs">
                                    {getResultTypeLabel(result.type)}
                                  </span>
                                  {result.level && (
                                    <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(result.level)}`}>
                                      {getLevelLabel(result.level)}
                                    </span>
                                  )}
                                  {result.rating && (
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3 text-yellow-500" />
                                      <span className="text-xs text-gray-600 dark:text-gray-400">
                                        {result.rating}
                                      </span>
                                    </div>
                                  )}
                                  {result.participants && (
                                    <div className="flex items-center gap-1">
                                      <Users className="h-3 w-3 text-gray-500" />
                                      <span className="text-xs text-gray-600 dark:text-gray-400">
                                        {result.participants}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="text-right text-sm text-gray-500">
                                {result.timestamp && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {result.timestamp.toLocaleDateString('he-IL')}
                                  </div>
                                )}
                                <div className="mt-1">
                                  <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-2 py-1 rounded">
                                    {result.relevance}% רלוונטי
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    חיפושים אחרונים
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSearch(search)}
                        className="flex items-center gap-2"
                      >
                        <Clock className="h-3 w-3" />
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  חיפושים פופולריים
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSearch(search)}
                      className="flex items-center gap-2"
                    >
                      <TrendingUp className="h-3 w-3" />
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
