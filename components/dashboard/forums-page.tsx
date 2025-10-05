'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/components/providers'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { AdvancedCard } from '@/components/ui/advanced-card'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { LoadingSpinner } from '@/components/ui/loading'
import { ForumPostCard } from '@/components/forums/forum-post-card'
import { ForumPostForm, ForumPostFormData } from '@/components/forums/forum-post-form'
import { ForumCategories } from '@/components/forums/forum-categories'
import {
  MessageSquare,
  Search,
  Filter,
  Plus,
  ThumbsUp,
  MessageCircle,
  Eye,
  Clock,
  User,
  Pin,
  Lock,
  ChevronRight,
  BookOpen,
  Users,
  TrendingUp,
} from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'
import { ForumPost, ForumCategory } from '@/types'

export function ForumsPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [viewMode, setViewMode] = useState<'posts' | 'categories'>('posts')

  const [posts, setPosts] = useState([
    {
      _id: '1',
      id: '1',
      title: 'איך ללמוד עברית מהר יותר?',
      content: 'אני לומד עברית כבר חודשיים ואני רוצה לדעת איך לשפר את הלמידה שלי...',
      author: {
        name: 'אחמד חסן',
        avatar: null,
        level: 'intermediate',
      },
      authorId: 'user_1',
      category: 'grammar-help',
      language: 'he',
      tags: ['עברית', 'למידה', 'טיפים'],
      likes: 24,
      replies: [],
      views: 156,
      isPinned: true,
      isLocked: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      updatedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      lastReply: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    },
    {
      _id: '2',
      id: '2',
      title: 'Best resources for learning Arabic pronunciation',
      content: 'I\'m struggling with Arabic pronunciation, especially the different sounds...',
      author: {
        name: 'Sarah Johnson',
        avatar: null,
        level: 'beginner',
      },
      authorId: 'user_2',
      category: 'pronunciation',
      language: 'en',
      tags: ['Arabic', 'pronunciation', 'resources'],
      likes: 18,
      replies: [],
      views: 89,
      isPinned: false,
      isLocked: false,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      lastReply: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    },
    {
      _id: '3',
      id: '3',
      title: 'תרבות ישראלית - חגים ומסורות',
      content: 'אני רוצה להבין יותר על התרבות הישראלית, במיוחד על החגים והמסורות...',
      author: {
        name: 'רבקה כהן',
        avatar: null,
        level: 'advanced',
      },
      authorId: 'user_3',
      category: 'culture',
      language: 'he',
      tags: ['תרבות', 'חגים', 'ישראל'],
      likes: 31,
      replies: [],
      views: 203,
      isPinned: false,
      isLocked: false,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      lastReply: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      _id: '4',
      id: '4',
      title: 'Success story: From zero to fluent in 6 months',
      content: 'I want to share my journey learning Hebrew from complete beginner to conversational level...',
      author: {
        name: 'David Miller',
        avatar: null,
        level: 'advanced',
      },
      authorId: 'user_4',
      category: 'success-stories',
      language: 'en',
      tags: ['success', 'Hebrew', 'journey'],
      likes: 45,
      replies: [],
      views: 312,
      isPinned: false,
      isLocked: false,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      lastReply: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    },
    {
      _id: '5',
      id: '5',
      title: 'משאבים מומלצים ללימוד ערבית',
      content: 'איזה ספרים, אפליקציות וקורסים אתם ממליצים ללימוד ערבית?',
      author: {
        name: 'מיכל לוי',
        avatar: null,
        level: 'intermediate',
      },
      authorId: 'user_5',
      category: 'resources',
      language: 'he',
      tags: ['ערבית', 'משאבים', 'ספרים'],
      likes: 12,
      replies: [],
      views: 67,
      isPinned: false,
      isLocked: false,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      lastReply: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    },
  ])

  const [categories] = useState([
    { value: 'all', label: 'כל הקטגוריות' },
    { value: 'general', label: 'כללי' },
    { value: 'grammar-help', label: 'עזרה בדקדוק' },
    { value: 'pronunciation', label: 'הגייה' },
    { value: 'culture', label: 'תרבות' },
    { value: 'resources', label: 'משאבים' },
    { value: 'success-stories', label: 'סיפורי הצלחה' },
  ])

  const [languages] = useState([
    { value: 'all', label: 'כל השפות' },
    { value: 'he', label: 'עברית' },
    { value: 'ar', label: 'ערבית' },
    { value: 'en', label: 'אנגלית' },
    { value: 'si', label: 'סינהלית' },
    { value: 'ta', label: 'טמילית' },
    { value: 'fr', label: 'צרפתית' },
    { value: 'es', label: 'ספרדית' },
    { value: 'de', label: 'גרמנית' },
    { value: 'it', label: 'איטלקית' },
    { value: 'pt', label: 'פורטוגזית' },
    { value: 'ru', label: 'רוסית' },
    { value: 'zh', label: 'סינית' },
    { value: 'ja', label: 'יפנית' },
    { value: 'ko', label: 'קוריאנית' },
    { value: 'hi', label: 'הינדי' },
  ])

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('forumPosts')
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts)
        setPosts(parsedPosts)
      } catch (error) {
        console.error('Error loading posts from localStorage:', error)
      }
    }
  }, [])

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem('forumPosts', JSON.stringify(posts))
  }, [posts])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesLanguage = selectedLanguage === 'all' || post.language === selectedLanguage
    
    return matchesSearch && matchesCategory && matchesLanguage
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general':
        return '💬'
      case 'grammar-help':
        return '📝'
      case 'pronunciation':
        return '🗣️'
      case 'culture':
        return '🏛️'
      case 'resources':
        return '📚'
      case 'success-stories':
        return '🏆'
      default:
        return '💬'
    }
  }

  const getCategoryName = (category: string) => {
    const categoryObj = categories.find(cat => cat.value === category)
    return categoryObj ? categoryObj.label : category
  }

  const handleCreatePost = async (formData: ForumPostFormData) => {
    try {
      // Create new post object
      const newPost = {
        _id: Date.now().toString(),
        id: Date.now().toString(),
        title: formData.title,
        content: formData.content,
        author: {
          name: 'משתמש חדש',
          avatar: null,
          level: 'beginner'
        },
        authorId: 'new_user',
        category: formData.category,
        tags: formData.tags,
        language: formData.language,
        likes: 0,
        views: 0,
        replies: [],
        isPinned: false,
        isLocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastReply: new Date()
      }
      
      // Add to posts list
      setPosts(prevPosts => [newPost, ...prevPosts])
      setShowCreateForm(false)
      
      // Show success message
      alert('הפוסט נוצר בהצלחה!')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('שגיאה ביצירת הפוסט')
    }
  }

  const handleLikePost = (postId: string) => {
    // Update likes count
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post._id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    )
  }

  const handleBookmarkPost = (postId: string) => {
    // Toggle bookmark status (you could store this in localStorage)
    const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]')
    const isBookmarked = bookmarkedPosts.includes(postId)
    
    if (isBookmarked) {
      const updatedBookmarks = bookmarkedPosts.filter((id: string) => id !== postId)
      localStorage.setItem('bookmarkedPosts', JSON.stringify(updatedBookmarks))
      alert('הפוסט הוסר מהמועדפים')
    } else {
      bookmarkedPosts.push(postId)
      localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarkedPosts))
      alert('הפוסט נוסף למועדפים')
    }
  }

  const handleSharePost = (postId: string) => {
    // Share the post URL
    const postUrl = `${window.location.origin}/forums/post/${postId}`
    if (navigator.share) {
      navigator.share({
        title: 'פוסט מעניין בפורום',
        url: postUrl
      })
    } else {
      navigator.clipboard.writeText(postUrl)
      // You could show a toast notification here
      alert('הקישור הועתק ללוח')
    }
  }

  const handleReplyToPost = (postId: string) => {
    // Navigate to post detail page
    router.push(`/forums/post/${postId}`)
  }

  const handleDeletePost = (postId: string) => {
    if (confirm('האם אתה בטוח שברצונך למחוק את הפוסט?')) {
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId))
      alert('הפוסט נמחק בהצלחה')
    }
  }

  // Calculate statistics
  const getStats = () => {
    const totalPosts = posts.length
    const totalReplies = posts.reduce((sum, post) => sum + post.replies.length, 0)
    const totalViews = posts.reduce((sum, post) => sum + post.views, 0)
    const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0)
    const activeUsers = new Set(posts.map(post => post.authorId)).size
    
    return {
      totalPosts,
      totalReplies,
      totalViews,
      totalLikes,
      activeUsers
    }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('forums.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('forums.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <Button
              variant={viewMode === 'posts' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('posts')}
            >
              פוסטים
            </Button>
            <Button
              variant={viewMode === 'categories' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('categories')}
            >
              קטגוריות
            </Button>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-500 to-purple-600"
            onClick={() => {
              setShowCreateForm(true)
              // Scroll to form
              setTimeout(() => {
                const formElement = document.getElementById('create-post-form')
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth' })
                }
              }, 100)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('forums.createPost')}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t('forums.stats.totalPosts')}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalPosts}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t('forums.stats.totalReplies')}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalReplies}
                </p>
              </div>
              <MessageCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t('forums.stats.totalViews')}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalViews}
                </p>
              </div>
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t('forums.stats.activeUsers')}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.activeUsers}
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('forums.searchPosts')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={categories}
              placeholder={t('forums.selectCategory')}
            />
            
            <Select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              options={languages}
              placeholder={t('forums.selectLanguage')}
            />
            
            <Button variant="outline" className="justify-start">
              <Filter className="h-4 w-4 mr-2" />
              {t('forums.moreFilters')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create Post Form */}
      {showCreateForm && (
        <div id="create-post-form">
          <ForumPostForm
            onSubmit={handleCreatePost}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {/* Content based on view mode */}
      {viewMode === 'categories' ? (
        <ForumCategories
          onCategorySelect={(category) => {
            setSelectedCategory(category)
            setViewMode('posts')
          }}
          selectedCategory={selectedCategory as ForumCategory}
        />
      ) : (
        <>
          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <ForumPostCard
                key={post.id}
                post={post as ForumPost}
                onLike={handleLikePost}
                onBookmark={handleBookmarkPost}
                onShare={handleSharePost}
                onReply={handleReplyToPost}
                onDelete={handleDeletePost}
              />
            ))}
          </div>
        </>
      )}

      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('forums.noPostsFound')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('forums.tryDifferentFilters')}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
