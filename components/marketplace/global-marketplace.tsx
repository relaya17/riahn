'use client'

import React, { useState, useEffect } from 'react'
import { ShoppingCart, Star, Users, DollarSign, Globe, Filter, Search, Heart, Share2, Download, Play, Award, TrendingUp, Clock, Shield, CreditCard } from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  instructor: {
    name: string
    avatar: string
    rating: number
    students: number
    courses: number
  }
  price: number
  originalPrice?: number
  currency: string
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: number
  lessons: number
  students: number
  rating: number
  reviews: number
  thumbnail: string
  category: string
  tags: string[]
  isFeatured: boolean
  isOnSale: boolean
  createdAt: Date
  lastUpdated: Date
  preview?: string
  certificate: boolean
  lifetimeAccess: boolean
  mobileAccess: boolean
}

interface Instructor {
  id: string
  name: string
  title: string
  avatar: string
  bio: string
  rating: number
  students: number
  courses: number
  languages: string[]
  specialties: string[]
  joinedDate: Date
  isVerified: boolean
  socialLinks: {
    website?: string
    youtube?: string
    linkedin?: string
  }
}

interface Review {
  id: string
  courseId: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  date: Date
  helpful: number
  verified: boolean
}

export function GlobalMarketplace() {
  const [courses, setCourses] = useState<Course[]>([])
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [activeTab, setActiveTab] = useState<'courses' | 'instructors' | 'categories'>('courses')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState('popular')
  const [cart, setCart] = useState<Course[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])

  const sampleCourses: Course[] = [
    {
      id: '1',
      title: 'עברית למתחילים - מהבסיס ועד השיחה',
      description: 'למד עברית מהבסיס עם מורה מנוסה. קורס מקיף הכולל דקדוק, אוצר מילים ושיחה.',
      instructor: {
        name: 'דוד כהן',
        avatar: '/images/david-cohen.jpg',
        rating: 4.9,
        students: 1250,
        courses: 8
      },
      price: 199,
      originalPrice: 299,
      currency: 'ILS',
      language: 'עברית',
      level: 'beginner',
      duration: 1200, // minutes
      lessons: 45,
      students: 1250,
      rating: 4.8,
      reviews: 156,
      thumbnail: '/images/hebrew-basics.jpg',
      category: 'שפות',
      tags: ['עברית', 'מתחילים', 'דקדוק', 'שיחה'],
      isFeatured: true,
      isOnSale: true,
      createdAt: new Date('2024-01-01'),
      lastUpdated: new Date('2024-01-15'),
      certificate: true,
      lifetimeAccess: true,
      mobileAccess: true
    },
    {
      id: '2',
      title: 'Advanced English Conversation',
      description: 'Master advanced English conversation skills with native speakers and real-world scenarios.',
      instructor: {
        name: 'Sarah Johnson',
        avatar: '/images/sarah-johnson.jpg',
        rating: 4.8,
        students: 2100,
        courses: 12
      },
      price: 89,
      currency: 'USD',
      language: 'אנגלית',
      level: 'advanced',
      duration: 1800,
      lessons: 60,
      students: 2100,
      rating: 4.7,
      reviews: 234,
      thumbnail: '/images/english-advanced.jpg',
      category: 'שפות',
      tags: ['אנגלית', 'מתקדמים', 'שיחה', 'ביטחון עצמי'],
      isFeatured: false,
      isOnSale: false,
      createdAt: new Date('2024-01-05'),
      lastUpdated: new Date('2024-01-20'),
      certificate: true,
      lifetimeAccess: true,
      mobileAccess: true
    }
  ]

  const sampleInstructors: Instructor[] = [
    {
      id: '1',
      name: 'דוד כהן',
      title: 'מורה עברית מומחה',
      avatar: '/images/david-cohen.jpg',
      bio: 'מורה עברית עם 15 שנות ניסיון. מומחה בהוראת עברית לדוברי שפות אחרות.',
      rating: 4.9,
      students: 1250,
      courses: 8,
      languages: ['עברית', 'אנגלית', 'ערבית'],
      specialties: ['עברית למתחילים', 'דקדוק', 'שיחה'],
      joinedDate: new Date('2020-01-01'),
      isVerified: true,
      socialLinks: {
        website: 'https://davidhebrew.com',
        youtube: 'https://youtube.com/davidhebrew'
      }
    }
  ]

  const categories = [
    { id: 'all', name: 'כל הקטגוריות', count: 0 },
    { id: 'שפות', name: 'שפות', count: 45 },
    { id: 'תרבות', name: 'תרבות', count: 23 },
    { id: 'עסקים', name: 'עסקים', count: 18 },
    { id: 'טכנולוגיה', name: 'טכנולוגיה', count: 12 }
  ]

  const languages = [
    { id: 'all', name: 'כל השפות' },
    { id: 'עברית', name: 'עברית' },
    { id: 'אנגלית', name: 'אנגלית' },
    { id: 'ערבית', name: 'ערבית' },
    { id: 'ספרדית', name: 'ספרדית' },
    { id: 'צרפתית', name: 'צרפתית' }
  ]

  const levels = [
    { id: 'all', name: 'כל הרמות' },
    { id: 'beginner', name: 'מתחילים' },
    { id: 'intermediate', name: 'בינוני' },
    { id: 'advanced', name: 'מתקדמים' }
  ]

  useEffect(() => {
    setCourses(sampleCourses)
    setInstructors(sampleInstructors)
  }, [])

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1]
    
    return matchesSearch && matchesCategory && matchesLanguage && matchesLevel && matchesPrice
  })

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.students - a.students
      case 'rating':
        return b.rating - a.rating
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return 0
    }
  })

  const addToCart = (course: Course) => {
    if (!cart.find(c => c.id === course.id)) {
      setCart(prev => [...prev, course])
    }
  }

  const toggleWishlist = (courseId: string) => {
    setWishlist(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: currency === 'ILS' ? 'ILS' : 'USD'
    }).format(price)
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours} שעות ${mins} דקות` : `${mins} דקות`
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Globe className="w-12 h-12 text-green-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Global Marketplace
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          שוק גלובלי לקורסי שפות עם מורים מומחים מכל העולם
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="חפש קורסים, מורים או נושאים..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              aria-label="בחר קטגוריה"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} {category.count > 0 && `(${category.count})`}
                </option>
              ))}
            </select>
            
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              aria-label="בחר שפה"
            >
              {languages.map(language => (
                <option key={language.id} value={language.id}>{language.name}</option>
              ))}
            </select>
            
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              aria-label="בחר רמה"
            >
              {levels.map(level => (
                <option key={level.id} value={level.id}>{level.name}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              aria-label="מיין לפי"
            >
              <option value="popular">פופולריות</option>
              <option value="rating">דירוג</option>
              <option value="price-low">מחיר: נמוך לגבוה</option>
              <option value="price-high">מחיר: גבוה לנמוך</option>
              <option value="newest">חדש ביותר</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4">
        {[
          { id: 'courses', name: 'קורסים', icon: Play, count: courses.length },
          { id: 'instructors', name: 'מורים', icon: Users, count: instructors.length },
          { id: 'categories', name: 'קטגוריות', icon: Award, count: categories.length - 1 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'courses' | 'instructors' | 'categories')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-green-50'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-semibold">{tab.name}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {sortedCourses.length} קורסים נמצאו
            </h2>
            
            {cart.length > 0 && (
              <div className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg">
                <ShoppingCart className="w-5 h-5" />
                <span>{cart.length} פריטים בעגלה</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {course.isOnSale && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      מבצע
                    </div>
                  )}
                  
                  {course.isFeatured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      מומלץ
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm opacity-90">{course.language}</div>
                  </div>
                  
                  <button
                    onClick={() => toggleWishlist(course.id)}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                      wishlist.includes(course.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    aria-label={wishlist.includes(course.id) ? "הסר מרשימת המשאלות" : "הוסף לרשימת המשאלות"}
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(course.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                    <span className="text-sm text-gray-600">{course.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(course.duration)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Play className="w-4 h-4" />
                      <span>{course.lessons} שיעורים</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{course.rating}</span>
                      <span className="text-sm text-gray-600">({course.reviews})</span>
                    </div>
                    
                    <div className="text-right">
                      {course.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPrice(course.originalPrice, course.currency)}
                        </div>
                      )}
                      <div className="text-lg font-bold text-green-600">
                        {formatPrice(course.price, course.currency)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addToCart(course)}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>הוסף לעגלה</span>
                    </button>
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      aria-label="צפה בפרטים"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructors Tab */}
      {activeTab === 'instructors' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">מורים מומחים</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-bold text-gray-800">{instructor.name}</h3>
                      {instructor.isVerified && (
                        <Shield className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-gray-600">{instructor.title}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{instructor.bio}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">דירוג</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{instructor.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">תלמידים</span>
                    <span className="font-semibold">{instructor.students.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">קורסים</span>
                    <span className="font-semibold">{instructor.courses}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-2">שפות</h4>
                  <div className="flex flex-wrap gap-2">
                    {instructor.languages.map((language, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  צפה בקורסים
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">קטגוריות</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(1).map((category) => (
              <div key={category.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                  <p className="text-gray-600">{category.count} קורסים</p>
                  
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    צפה בקורסים
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
