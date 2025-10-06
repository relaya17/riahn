'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Button } from '@/components/core/button'
import { MessageCircle, Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! How can I help you today?',
      sender: 'AI',
      timestamp: new Date(),
      translated: false
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date(),
        translated: false
      }
      setMessages([...messages, message])
      setNewMessage('')
      
      // הוספת תגובה אוטומטית
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: `Thank you for your message: "${newMessage}". How else can I help you?`,
          sender: 'AI',
          timestamp: new Date(),
          translated: false
        }
        setMessages(prev => [...prev, aiResponse])
      }, 1000)
    }
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // כאן יהיה קוד להפעלת זיהוי דיבור
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Chat
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Practice your language skills in chat with automatic translation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  שיחה עם AI
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                        {message.translated && (
                          <p className="text-xs opacity-70 mt-1">תורגם</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="הקלד הודעה..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <Button
                      variant="outline"
                      onClick={handleVoiceInput}
                      className={isListening ? 'bg-red-500 text-white' : ''}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Language Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">הגדרות שפה</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">שפת מקור</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>עברית</option>
                    <option>אנגלית</option>
                    <option>ספרדית</option>
                    <option>צרפתית</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">שפת יעד</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>אנגלית</option>
                    <option>עברית</option>
                    <option>ספרדית</option>
                    <option>צרפתית</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Audio Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">בקרת אודיו</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  onClick={toggleMute}
                  className="w-full"
                >
                  {isMuted ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                  {isMuted ? 'השתק' : 'השמע'}
                </Button>
                <div>
                  <label className="block text-sm font-medium mb-2">עוצמת קול</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="w-full"
                    disabled={isMuted}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Learning Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">סטטיסטיקות למידה</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>הודעות היום</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span>זמן שיחה</span>
                  <span className="font-semibold">25 דקות</span>
                </div>
                <div className="flex justify-between">
                  <span>מילים חדשות</span>
                  <span className="font-semibold">8</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
