'use client'

import React, { useState, useEffect, useRef } from 'react'
import { PenTool, Image, Video, Mic, Upload, Download, Share2, Heart, Star, Edit3, Trash2, Play, Pause, Volume2, VolumeX, Camera, Palette, Type, Layers, Save, Eye, EyeOff } from 'lucide-react'

interface CreativeProject {
  id: string
  title: string
  description: string
  type: 'text' | 'image' | 'video' | 'audio' | 'presentation'
  content: string
  thumbnail?: string
  tags: string[]
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  isPublic: boolean
  likes: number
  views: number
  createdAt: Date
  updatedAt: Date
  author: {
    name: string
    avatar: string
  }
}

interface Template {
  id: string
  name: string
  description: string
  type: 'lesson' | 'quiz' | 'story' | 'presentation' | 'game'
  thumbnail: string
  category: string
  difficulty: string
  estimatedTime: number
  isPremium: boolean
}

interface MediaAsset {
  id: string
  name: string
  type: 'image' | 'video' | 'audio'
  url: string
  size: number
  duration?: number
  tags: string[]
  uploadedAt: Date
}

export function CreativeTools() {
  const [activeTab, setActiveTab] = useState<'create' | 'projects' | 'templates' | 'media'>('create')
  const [selectedProject, setSelectedProject] = useState<CreativeProject | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [currentContent, setCurrentContent] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const sampleProjects: CreativeProject[] = [
    {
      id: '1',
      title: 'שיעור עברית - אוצר מילים יומי',
      description: 'שיעור אינטראקטיבי ללימוד אוצר מילים עברי',
      type: 'presentation',
      content: 'שיעור על אוצר מילים יומי בעברית...',
      thumbnail: '/images/hebrew-vocab.jpg',
      tags: ['עברית', 'אוצר מילים', 'מתחילים'],
      language: 'עברית',
      level: 'beginner',
      isPublic: true,
      likes: 45,
      views: 234,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-15'),
      author: {
        name: 'דוד כהן',
        avatar: '/images/david-cohen.jpg'
      }
    },
    {
      id: '2',
      title: 'סיפור קצר באנגלית',
      description: 'סיפור קצר ללימוד אנגלית עם איורים',
      type: 'text',
      content: 'Once upon a time, there was a little girl...',
      tags: ['אנגלית', 'סיפור', 'קריאה'],
      language: 'אנגלית',
      level: 'intermediate',
      isPublic: true,
      likes: 32,
      views: 156,
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-14'),
      author: {
        name: 'Sarah Johnson',
        avatar: '/images/sarah-johnson.jpg'
      }
    }
  ]

  const sampleTemplates: Template[] = [
    {
      id: '1',
      name: 'שיעור אינטראקטיבי',
      description: 'תבנית לשיעור אינטראקטיבי עם שאלות ותשובות',
      type: 'lesson',
      thumbnail: '/images/lesson-template.jpg',
      category: 'חינוך',
      difficulty: 'קל',
      estimatedTime: 30,
      isPremium: false
    },
    {
      id: '2',
      name: 'חידון רב ברירה',
      description: 'תבנית לחידון עם שאלות רב ברירה',
      type: 'quiz',
      thumbnail: '/images/quiz-template.jpg',
      category: 'חינוך',
      difficulty: 'בינוני',
      estimatedTime: 20,
      isPremium: false
    },
    {
      id: '3',
      name: 'מצגת אינטראקטיבית',
      description: 'תבנית למצגת עם אנימציות ואינטראקטיביות',
      type: 'presentation',
      thumbnail: '/images/presentation-template.jpg',
      category: 'עסקים',
      difficulty: 'קשה',
      estimatedTime: 60,
      isPremium: true
    }
  ]

  const sampleMediaAssets: MediaAsset[] = [
    {
      id: '1',
      name: 'background-music.mp3',
      type: 'audio',
      url: '/audio/background-music.mp3',
      size: 2.5,
      duration: 180,
      tags: ['מוזיקה', 'רקע', 'רגוע'],
      uploadedAt: new Date('2024-01-10')
    },
    {
      id: '2',
      name: 'hebrew-alphabet.jpg',
      type: 'image',
      url: '/images/hebrew-alphabet.jpg',
      size: 1.2,
      tags: ['עברית', 'אלפבית', 'חינוך'],
      uploadedAt: new Date('2024-01-12')
    }
  ]

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (error) {
      console.error('Error starting video recording:', error)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <Type className="w-5 h-5" />
      case 'image': return <Image className="w-5 h-5" />
      case 'video': return <Video className="w-5 h-5" />
      case 'audio': return <Mic className="w-5 h-5" />
      case 'presentation': return <Layers className="w-5 h-5" />
      default: return <PenTool className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text': return 'bg-blue-100 text-blue-800'
      case 'image': return 'bg-green-100 text-green-800'
      case 'video': return 'bg-red-100 text-red-800'
      case 'audio': return 'bg-purple-100 text-purple-800'
      case 'presentation': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <PenTool className="w-12 h-12 text-purple-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Creative Tools
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          כלי יצירה מתקדמים ליצירת תוכן חינוכי אינטראקטיבי ומעורר השראה
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4">
        {[
          { id: 'create', name: 'יצירה', icon: PenTool },
          { id: 'projects', name: 'פרויקטים', icon: Layers },
          { id: 'templates', name: 'תבניות', icon: Edit3 },
          { id: 'media', name: 'מדיה', icon: Image }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-purple-50'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-semibold">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Create Tab */}
      {activeTab === 'create' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">יצירת תוכן חדש</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Text Editor */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Type className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">עורך טקסט</h3>
                  <p className="text-gray-600 text-sm">צור סיפורים, מאמרים ושיעורים</p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    התחל יצירה
                  </button>
                </div>
              </div>

              {/* Image Editor */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Image className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">עורך תמונות</h3>
                  <p className="text-gray-600 text-sm">ערוך תמונות ויצור גרפיקה</p>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    התחל יצירה
                  </button>
                </div>
              </div>

              {/* Video Editor */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <Video className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">עורך וידאו</h3>
                  <p className="text-gray-600 text-sm">צור סרטונים ושיעורי וידאו</p>
                  <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                    התחל יצירה
                  </button>
                </div>
              </div>

              {/* Audio Recorder */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Mic className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">מקליט אודיו</h3>
                  <p className="text-gray-600 text-sm">הקלט שיעורים ופודקאסטים</p>
                  <button 
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-full py-2 rounded-lg transition-colors ${
                      isRecording 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {isRecording ? 'עצור הקלטה' : 'התחל הקלטה'}
                  </button>
                </div>
              </div>

              {/* Presentation Builder */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                    <Layers className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">בונה מצגות</h3>
                  <p className="text-gray-600 text-sm">צור מצגות אינטראקטיביות</p>
                  <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
                    התחל יצירה
                  </button>
                </div>
              </div>

              {/* Canvas Drawing */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                    <Palette className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">ציור דיגיטלי</h3>
                  <p className="text-gray-600 text-sm">צייר ואייר עם כלים דיגיטליים</p>
                  <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors">
                    התחל יצירה
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">פעולות מהירות</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">העלאת קבצים</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-3">גרור קבצים לכאן או לחץ לבחירה</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
                  >
                    בחר קבצים
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">קבצים שהועלו</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700 truncate">{file.name}</span>
                      <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">הפרויקטים שלי</h2>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              פרויקט חדש
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(project.type)}`}>
                      {project.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="font-semibold">{project.language}</div>
                    <div className="text-sm opacity-90">{project.level}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{project.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{project.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {project.isPublic ? (
                        <Eye className="w-4 h-4 text-green-600" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={project.isPublic ? 'text-green-600' : 'text-gray-400'}>
                        {project.isPublic ? 'ציבורי' : 'פרטי'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      ערוך
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">תבניות מוכנות</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {template.isPremium && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Premium
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="font-semibold">{template.category}</div>
                    <div className="text-sm opacity-90">{template.difficulty}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{template.name}</h3>
                  
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>זמן משוער: {template.estimatedTime} דקות</span>
                    <span className="capitalize">{template.type}</span>
                  </div>
                  
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    השתמש בתבנית
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Media Tab */}
      {activeTab === 'media' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">ספריית המדיה</h2>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              העלה מדיה
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleMediaAssets.map((asset) => (
              <div key={asset.id} className="bg-white rounded-2xl shadow-lg p-4">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  {asset.type === 'image' ? (
                    <Image className="w-8 h-8 text-gray-400" />
                  ) : asset.type === 'video' ? (
                    <Video className="w-8 h-8 text-gray-400" />
                  ) : (
                    <Mic className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                
                <h3 className="font-semibold text-gray-800 mb-2 truncate">{asset.name}</h3>
                
                <div className="space-y-1 text-sm text-gray-600">
                  <div>גודל: {formatFileSize(asset.size * 1024 * 1024)}</div>
                  {asset.duration && (
                    <div>משך: {formatDuration(asset.duration)}</div>
                  )}
                  <div>הועלה: {asset.uploadedAt.toLocaleDateString('he-IL')}</div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {asset.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                    השתמש
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
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
