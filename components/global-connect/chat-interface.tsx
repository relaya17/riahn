'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Send, 
  Smile, 
  Paperclip, 
  Phone, 
  Video,
  MoreVertical,
  Globe,
  Volume2,
  Copy
} from 'lucide-react'
import { IMessage, User } from '@/types'
import { TranslationWidget } from '@/components/translation/translation-widget'

interface ChatInterfaceProps {
  currentUser: User
  otherUser: User
  chatId: string
  onSendMessage?: (message: string) => void
  onStartCall?: (type: 'audio' | 'video') => void
}

export function ChatInterface({
  currentUser,
  otherUser,
  chatId,
  onSendMessage,
  onStartCall
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping] = useState(false)
  const [showTranslator, setShowTranslator] = useState(false)
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchMessages()
  }, [chatId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/messages?senderId=${currentUser._id}&receiverId=${otherUser._id}`)
      const data = await response.json()
      
      if (data.success) {
        setMessages(data.data.messages || [])
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    const messageText = newMessage.trim()
    setNewMessage('')

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: currentUser._id,
          receiverId: otherUser._id,
          content: messageText,
          messageType: 'text',
          language: currentUser.nativeLanguage || 'en'
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setMessages(prev => [...prev, data.data])
        onSendMessage?.(messageText)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setNewMessage(messageText) // Restore message on error
    }
  }

  const translateMessage = async (message: IMessage, targetLanguage: string) => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: message.content,
          sourceLanguage: message.originalLanguage,
          targetLanguage: targetLanguage
        })
      })

      const data = await response.json()
      
      if (data.success) {
        // Update message with translation
        setMessages(prev => prev.map(msg => 
          msg.senderId === message.senderId && msg.createdAt?.getTime() === message.createdAt?.getTime() 
            ? {
                ...msg,
                translatedContent: {
                  ...msg.translatedContent,
                  [targetLanguage]: data.data.translatedText
                }
              }
            : msg
        ))
      }
    } catch (error) {
      console.error('Error translating message:', error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const speakText = (text: string, language: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === 'he' ? 'he-IL' : 
                      language === 'ar' ? 'ar-SA' : 
                      language === 'en' ? 'en-US' :
                      language === 'si' ? 'si-LK' :
                      language === 'ta' ? 'ta-IN' : 'en-US'
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <img
            src={otherUser.profileImage || '/default-avatar.png'}
            alt={otherUser.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{otherUser.name}</h3>
            <p className="text-sm text-gray-500">
              {otherUser.isOnline ? 'Online' : `Last seen ${formatTime(otherUser.lastSeen)}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTranslator(!showTranslator)}
          >
            <Globe className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onStartCall?.('audio')}
          >
            <Phone className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onStartCall?.('video')}
          >
            <Video className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              // TODO: Add more options menu
              console.log('More options clicked')
            }}
            title="More options"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Translation Widget */}
      {showTranslator && (
        <div className="p-4 border-b bg-gray-50">
          <TranslationWidget 
            compact={true}
            sourceLanguage={currentUser.nativeLanguage}
            targetLanguage={otherUser.nativeLanguage}
          />
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="text-center text-gray-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.senderId === currentUser._id
            const targetLang = isOwnMessage ? otherUser.nativeLanguage : currentUser.nativeLanguage
            const translation = message.translatedContent?.[targetLang]
            
            return (
              <div
                key={`${message.senderId}-${message.createdAt?.getTime()}`}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-1' : 'order-2'}`}>
                  <Card className={`p-3 ${
                    isOwnMessage 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    
                    {translation && (
                      <div className={`mt-2 pt-2 border-t ${
                        isOwnMessage ? 'border-blue-400' : 'border-gray-200'
                      }`}>
                        <p className={`text-xs ${
                          isOwnMessage ? 'text-blue-100' : 'text-gray-600'
                        }`}>
                          Translation: {translation}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${
                        isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.createdAt)}
                      </span>
                      
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyText(message.content)}
                          className="p-1 h-auto"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakText(message.content, message.originalLanguage)}
                          className="p-1 h-auto"
                        >
                          <Volume2 className="w-3 h-3" />
                        </Button>
                        
                        {!translation && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => translateMessage(
                              message, 
                              isOwnMessage ? otherUser.nativeLanguage : currentUser.nativeLanguage
                            )}
                            className="p-1 h-auto"
                          >
                            <Globe className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
                
                {!isOwnMessage && (
                  <img
                    src={otherUser.profileImage || '/default-avatar.png'}
                    alt={otherUser.name}
                    className="w-8 h-8 rounded-full ml-2 order-1"
                  />
                )}
              </div>
            )
          })
        )}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="w-4 h-4" />
          </Button>
          
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
            />
            
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          
          <Button 
            onClick={sendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}


