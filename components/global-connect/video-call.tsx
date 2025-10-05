'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Phone, 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Volume2, 
  VolumeX,
  Settings,
  MessageCircle,
  Maximize,
  Minimize
} from 'lucide-react'
import { User } from '@/types'

interface VideoCallProps {
  currentUser: User
  otherUser: User
  onEndCall: () => void
  onToggleChat?: () => void
  isGroupCall?: boolean
  participants?: User[]
}

export function VideoCall({
  currentUser,
  otherUser,
  onEndCall,
  onToggleChat,
  isGroupCall = false,
  participants = []
}: VideoCallProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isSpeakerOff, setIsSpeakerOff] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting')

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const callStartTime = useRef<number>(Date.now())

  useEffect(() => {
    // Initialize WebRTC connection
    initializeCall()
    
    // Start call timer
    const timer = setInterval(() => {
      setCallDuration(Math.floor((Date.now() - callStartTime.current) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const initializeCall = async () => {
    try {
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream
      }

      // Simulate connection establishment
      setTimeout(() => {
        setConnectionStatus('connected')
      }, 2000)

    } catch (error) {
      console.error('Error accessing media devices:', error)
      setConnectionStatus('disconnected')
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // Implement actual mute/unmute logic
  }

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff)
    // Implement actual video on/off logic
  }

  const toggleSpeaker = () => {
    setIsSpeakerOff(!isSpeakerOff)
    // Implement actual speaker on/off logic
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    // Implement fullscreen logic
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connecting': return 'text-yellow-500'
      case 'connected': return 'text-green-500'
      case 'disconnected': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className={`fixed inset-0 bg-black z-50 ${isFullscreen ? '' : 'p-4'}`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/50 text-white">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${getConnectionStatusColor().replace('text-', 'bg-')}`}></div>
            <div>
              <h2 className="font-semibold">
                {isGroupCall ? `Group Call (${participants.length + 1})` : otherUser.name}
              </h2>
              <p className="text-sm text-gray-300">
                {connectionStatus === 'connected' ? formatDuration(callDuration) : 'Connecting...'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onToggleChat && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleChat}
                className="text-white hover:bg-white/20"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="text-white hover:bg-white/20"
            >
              <Settings className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Video Area */}
        <div className="flex-1 relative">
          {/* Remote Video */}
          <div className="absolute inset-0">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            
            {/* Video Off Overlay */}
            {isVideoOff && (
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">
                      {otherUser.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-lg font-medium">{otherUser.name}</p>
                  <p className="text-sm text-gray-400">Video is off</p>
                </div>
              </div>
            )}
          </div>

          {/* Local Video */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-900 rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Local Video Off Overlay */}
            {isVideoOff && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-sm font-bold">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs">You</p>
                </div>
              </div>
            )}
          </div>

          {/* Group Call Participants */}
          {isGroupCall && participants.length > 0 && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex gap-2 overflow-x-auto">
                {participants.map((participant) => (
                  <div key={participant._id} className="flex-shrink-0 w-20 h-16 bg-gray-800 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {participant.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-6 bg-black/50">
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={toggleMute}
              className={`w-12 h-12 rounded-full ${
                isMuted 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>

            <Button
              onClick={toggleVideo}
              className={`w-12 h-12 rounded-full ${
                isVideoOff 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </Button>

            <Button
              onClick={toggleSpeaker}
              className={`w-12 h-12 rounded-full ${
                isSpeakerOff 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {isSpeakerOff ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>

            <Button
              onClick={onEndCall}
              className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600"
            >
              <Phone className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute top-16 right-4 w-64 bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-semibold mb-4">Call Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="audio-input" className="block text-sm font-medium mb-2">Audio Input</label>
                <select id="audio-input" className="w-full p-2 border rounded-md" aria-label="Audio Input">
                  <option>Default Microphone</option>
                  <option>USB Microphone</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="audio-output" className="block text-sm font-medium mb-2">Audio Output</label>
                <select id="audio-output" className="w-full p-2 border rounded-md" aria-label="Audio Output">
                  <option>Default Speaker</option>
                  <option>Headphones</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="video-input" className="block text-sm font-medium mb-2">Video Input</label>
                <select id="video-input" className="w-full p-2 border rounded-md" aria-label="Video Input">
                  <option>Default Camera</option>
                  <option>USB Camera</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
