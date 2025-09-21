'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff,
  MessageCircle,
  Hand,
  Settings,
  Volume2,
  VolumeX,
  Camera,
  Globe,
  Star,
  Award,
  BookOpen,
  Zap,
  Headphones,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  Clock,
  MapPin,
  Share,
  Download,
  Upload,
  FileText,
  Image,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

interface VirtualUser {
  id: string
  name: string
  avatar: string
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  isMuted: boolean
  isVideoOn: boolean
  isHandRaised: boolean
  language: string
  level: string
  status: 'online' | 'away' | 'busy'
  device: 'desktop' | 'mobile' | 'vr' | 'ar'
}

interface VirtualClassroom {
  id: string
  name: string
  description: string
  language: string
  level: string
  instructor: string
  maxStudents: number
  currentStudents: number
  startTime: Date
  duration: number
  environment: 'classroom' | 'library' | 'garden' | 'space' | 'underwater'
  features: string[]
}

interface VirtualObject {
  id: string
  name: string
  type: 'whiteboard' | 'screen' | 'book' | 'tool' | 'decoration'
  position: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  interactive: boolean
  content?: string
}

export function VirtualClassroom() {
  const [isInClassroom, setIsInClassroom] = useState(false)
  const [currentClassroom, setCurrentClassroom] = useState<VirtualClassroom | null>(null)
  const [users, setUsers] = useState<VirtualUser[]>([])
  const [virtualObjects, setVirtualObjects] = useState<VirtualObject[]>([])
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [selectedEnvironment, setSelectedEnvironment] = useState<'classroom' | 'library' | 'garden' | 'space' | 'underwater'>('classroom')
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('excellent')
  const [currentUser, setCurrentUser] = useState<VirtualUser>({
    id: 'current_user',
    name: 'אתה',
    avatar: '👤',
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    isMuted: false,
    isVideoOn: true,
    isHandRaised: false,
    language: 'עברית',
    level: 'בינוני',
    status: 'online',
    device: 'desktop'
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Mock classroom data
    const mockClassroom: VirtualClassroom = {
      id: 'class_001',
      name: 'כיתת עברית וירטואלית',
      description: 'לימוד עברית בסביבה וירטואלית מתקדמת',
      language: 'עברית',
      level: 'בינוני',
      instructor: 'ד"ר רונית כהן',
      maxStudents: 20,
      currentStudents: 8,
      startTime: new Date(),
      duration: 60,
      environment: selectedEnvironment,
      features: ['לוח לבן אינטראקטיבי', 'מסך שיתוף', 'צ\'אט', 'הקלטה']
    }

    setCurrentClassroom(mockClassroom)

    // Mock users
    const mockUsers: VirtualUser[] = [
      {
        id: '1',
        name: 'שרה לוי',
        avatar: '👩',
        position: { x: -2, y: 0, z: -3 },
        rotation: { x: 0, y: 0, z: 0 },
        isMuted: false,
        isVideoOn: true,
        isHandRaised: false,
        language: 'עברית',
        level: 'מתחיל',
        status: 'online',
        device: 'desktop'
      },
      {
        id: '2',
        name: 'אחמד חסן',
        avatar: '👨',
        position: { x: 2, y: 0, z: -3 },
        rotation: { x: 0, y: 0, z: 0 },
        isMuted: true,
        isVideoOn: false,
        isHandRaised: true,
        language: 'ערבית',
        level: 'בינוני',
        status: 'online',
        device: 'mobile'
      },
      {
        id: '3',
        name: 'ד"ר רונית כהן',
        avatar: '👩‍🏫',
        position: { x: 0, y: 0, z: -5 },
        rotation: { x: 0, y: 0, z: 0 },
        isMuted: false,
        isVideoOn: true,
        isHandRaised: false,
        language: 'עברית',
        level: 'מומחה',
        status: 'online',
        device: 'desktop'
      }
    ]

    setUsers(mockUsers)

    // Mock virtual objects
    const mockObjects: VirtualObject[] = [
      {
        id: 'whiteboard_1',
        name: 'לוח לבן',
        type: 'whiteboard',
        position: { x: 0, y: 2, z: -6 },
        scale: { x: 4, y: 2, z: 0.1 },
        rotation: { x: 0, y: 0, z: 0 },
        interactive: true,
        content: 'שיעור עברית - נושא: דקדוק'
      },
      {
        id: 'screen_1',
        name: 'מסך שיתוף',
        type: 'screen',
        position: { x: 0, y: 1, z: -4 },
        scale: { x: 3, y: 2, z: 0.1 },
        rotation: { x: 0, y: 0, z: 0 },
        interactive: true,
        content: 'מצגת: מילים חדשות'
      }
    ]

    setVirtualObjects(mockObjects)
  }, [selectedEnvironment])

  const joinClassroom = () => {
    setIsInClassroom(true)
    // Simulate joining classroom
    setTimeout(() => {
      setUsers(prev => [...prev, currentUser])
    }, 1000)
  }

  const leaveClassroom = () => {
    setIsInClassroom(false)
    setUsers(prev => prev.filter(user => user.id !== 'current_user'))
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    setCurrentUser(prev => ({ ...prev, isMuted: !isMuted }))
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    setCurrentUser(prev => ({ ...prev, isVideoOn: !isVideoOn }))
  }

  const toggleHandRaise = () => {
    setIsHandRaised(!isHandRaised)
    setCurrentUser(prev => ({ ...prev, isHandRaised: !isHandRaised }))
  }

  const getEnvironmentIcon = (env: string) => {
    switch (env) {
      case 'classroom': return '🏫'
      case 'library': return '📚'
      case 'garden': return '🌳'
      case 'space': return '🚀'
      case 'underwater': return '🐠'
      default: return '🏫'
    }
  }

  const getEnvironmentName = (env: string) => {
    switch (env) {
      case 'classroom': return 'כיתה'
      case 'library': return 'ספרייה'
      case 'garden': return 'גן'
      case 'space': return 'חלל'
      case 'underwater': return 'תת-ימי'
      default: return 'כיתה'
    }
  }

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop': return <Monitor className="h-4 w-4" />
      case 'mobile': return <Smartphone className="h-4 w-4" />
      case 'vr': return <Headphones className="h-4 w-4" />
      case 'ar': return <Camera className="h-4 w-4" />
      default: return <Monitor className="h-4 w-4" />
    }
  }

  const getConnectionIcon = (quality: string) => {
    switch (quality) {
      case 'excellent': return <Wifi className="h-4 w-4 text-green-500" />
      case 'good': return <Wifi className="h-4 w-4 text-yellow-500" />
      case 'poor': return <WifiOff className="h-4 w-4 text-red-500" />
      default: return <Wifi className="h-4 w-4 text-green-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  כיתה וירטואלית במטאוורס
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  למידה אינטראקטיבית בסביבה תלת-ממדית
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getConnectionIcon(connectionQuality)}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {connectionQuality === 'excellent' ? 'חיבור מעולה' :
                 connectionQuality === 'good' ? 'חיבור טוב' : 'חיבור חלש'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {!isInClassroom ? (
        /* Classroom Selection */
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>בחר כיתה</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentClassroom && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {currentClassroom.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {currentClassroom.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">שפה:</span>
                        <p className="font-medium">{currentClassroom.language}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">רמה:</span>
                        <p className="font-medium">{currentClassroom.level}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">מרצה:</span>
                        <p className="font-medium">{currentClassroom.instructor}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">תלמידים:</span>
                        <p className="font-medium">{currentClassroom.currentStudents}/{currentClassroom.maxStudents}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={joinClassroom}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    הצטרף לכיתה
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <span>בחר סביבה</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'classroom', name: 'כיתה', icon: '🏫' },
                  { id: 'library', name: 'ספרייה', icon: '📚' },
                  { id: 'garden', name: 'גן', icon: '🌳' },
                  { id: 'space', name: 'חלל', icon: '🚀' },
                  { id: 'underwater', name: 'תת-ימי', icon: '🐠' }
                ].map((env) => (
                  <Button
                    key={env.id}
                    variant={selectedEnvironment === env.id ? 'default' : 'outline'}
                    onClick={() => setSelectedEnvironment(env.id as 'classroom' | 'library' | 'garden' | 'space' | 'underwater')}
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <span className="text-2xl">{env.icon}</span>
                    <span className="text-sm">{env.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Virtual Classroom Interface */
        <div className="space-y-6">
          {/* 3D Viewport */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <span>כיתה וירטואלית - {getEnvironmentName(selectedEnvironment)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-96 bg-gradient-to-b from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg"
                />
                
                {/* 3D Scene Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="bg-black/50 text-white px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getEnvironmentIcon(selectedEnvironment)}</span>
                      <span>{currentClassroom?.name}</span>
                    </div>
                  </div>
                  <div className="bg-black/50 text-white px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{users.length} תלמידים</span>
                    </div>
                  </div>
                </div>

                {/* Virtual Objects */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex gap-2">
                    {virtualObjects.map((obj) => (
                      <div
                        key={obj.id}
                        className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 shadow-lg"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {obj.type === 'whiteboard' ? '📝' :
                             obj.type === 'screen' ? '📺' :
                             obj.type === 'book' ? '📖' : '🔧'}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {obj.name}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {obj.content}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Audio/Video Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  <span>בקרת אודיו/וידאו</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    variant={isMuted ? "destructive" : "default"}
                    onClick={toggleMute}
                    className="flex-1"
                  >
                    {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    {isMuted ? 'השתק' : 'השמע'}
                  </Button>
                  <Button
                    variant={isVideoOn ? "default" : "outline"}
                    onClick={toggleVideo}
                    className="flex-1"
                  >
                    {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    {isVideoOn ? 'וידאו' : 'וידאו'}
                  </Button>
                </div>
                <div className="mt-4">
                  <Button
                    variant={isHandRaised ? "default" : "outline"}
                    onClick={toggleHandRaise}
                    className="w-full"
                  >
                    <Hand className="h-4 w-4 mr-2" />
                    {isHandRaised ? 'הוריד יד' : 'הרם יד'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>משתתפים</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl">{user.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </span>
                          {user.isHandRaised && <Hand className="h-4 w-4 text-yellow-500" />}
                          {user.device === 'vr' && <Headphones className="h-4 w-4 text-purple-500" />}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {user.language} • {user.level}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {user.isMuted ? (
                          <MicOff className="h-3 w-3 text-red-500" />
                        ) : (
                          <Mic className="h-3 w-3 text-green-500" />
                        )}
                        {user.isVideoOn ? (
                          <Video className="h-3 w-3 text-green-500" />
                        ) : (
                          <VideoOff className="h-3 w-3 text-gray-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Classroom Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  <span>כלי כיתה</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4">
                  <Button
                    variant="destructive"
                    onClick={leaveClassroom}
                    className="w-full"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    עזוב כיתה
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
