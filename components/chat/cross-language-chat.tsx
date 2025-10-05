'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/components/providers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { MessageCircle, Send, Languages, Volume2, Copy, Check } from 'lucide-react'

interface ChatMessage {
  id: string
  text: string
  translatedText: string
  originalLanguage: string
  targetLanguage: string
  sender: 'user1' | 'user2'
  timestamp: Date
  isTranslated: boolean
  confidence?: number
  pronunciation?: string
  culturalNotes?: string[]
}

interface User {
  id: string
  name: string
  language: string
  avatar?: string
}

export function CrossLanguageChat() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Demo users with different languages
  const users: User[] = [
    { id: 'user1', name: 'אחמד', language: 'ar', avatar: '👨‍💼' },
    { id: 'user2', name: 'Sarah', language: 'en', avatar: '👩‍💻' }
  ]

  const [currentUser, setCurrentUser] = useState<User>(users[0])
  const [targetUser, setTargetUser] = useState<User>(users[1])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const detectLanguage = async (text: string): Promise<string> => {
    try {
      const response = await fetch('/api/translate/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      const data = await response.json()
      return data.data?.language || 'en'
    } catch (error) {
      console.error('Language detection failed:', error)
      return 'en'
    }
  }

  const translateText = async (text: string, sourceLang: string, targetLang: string) => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
          context: 'chat',
          includePronunciation: true,
          includeCulturalNotes: true
        })
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Translation failed:', error)
      return { translatedText: text, confidence: 0 }
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    setIsTranslating(true)
    
    try {
      // Detect the language of the message
      const detectedLanguage = await detectLanguage(newMessage)
      
      // Translate the message to the target user's language
      const translation = await translateText(newMessage, detectedLanguage, targetUser.language)
      
      const message: ChatMessage = {
        id: Date.now().toString(),
        text: newMessage,
        translatedText: translation.translatedText,
        originalLanguage: detectedLanguage,
        targetLanguage: targetUser.language,
        sender: currentUser.id as 'user1' | 'user2',
        timestamp: new Date(),
        isTranslated: true,
        confidence: translation.confidence,
        pronunciation: translation.pronunciation,
        culturalNotes: translation.culturalNotes
      }

      setMessages(prev => [...prev, message])
      setNewMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsTranslating(false)
    }
  }

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const speakText = (text: string, language: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === 'ar' ? 'ar-SA' : language === 'he' ? 'he-IL' : 'en-US'
      speechSynthesis.speak(utterance)
    }
  }

  const getLanguageFlag = (language: string) => {
    const flags: Record<string, string> = {
      'he': '🇮🇱',
      'ar': '🇸🇦',
      'en': '🇺🇸',
      'fr': '🇫🇷',
      'es': '🇪🇸',
      'de': '🇩🇪',
      'it': '🇮🇹',
      'pt': '🇵🇹',
      'ru': '🇷🇺',
      'zh': '🇨🇳',
      'ja': '🇯🇵',
      'ko': '🇰🇷',
      'hi': '🇮🇳',
      'si': '🇱🇰',
      'ta': '🇮🇳'
    }
    return flags[language] || '🌐'
  }

  const getLanguageName = (language: string) => {
    const names: Record<string, string> = {
      'he': 'עברית',
      'ar': 'العربية',
      'en': 'English',
      'fr': 'Français',
      'es': 'Español',
      'de': 'Deutsch',
      'it': 'Italiano',
      'pt': 'Português',
      'ru': 'Русский',
      'zh': '中文',
      'ja': '日本語',
      'ko': '한국어',
      'hi': 'हिन्दी',
      'si': 'සිංහල',
      'ta': 'தமிழ்'
    }
    return names[language] || language.toUpperCase()
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            {t('chat.crossLanguageTitle')}
          </CardTitle>
          <p className="text-blue-100 text-sm">
            {t('chat.crossLanguageDesc')}
          </p>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* User Selection */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{t('chat.currentUser')}:</span>
                  <Select
                    value={currentUser.id}
                    onChange={(e) => {
                      const value = e.target.value
                      const user = users.find(u => u.id === value)
                      if (user) setCurrentUser(user)
                    }}
                    options={users.map(user => ({
                      value: user.id,
                      label: `${user.avatar} ${user.name} (${getLanguageFlag(user.language)} ${getLanguageName(user.language)})`
                    }))}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{t('chat.targetUser')}:</span>
                  <Select
                    value={targetUser.id}
                    onChange={(e) => {
                      const value = e.target.value
                      const user = users.find(u => u.id === value)
                      if (user) setTargetUser(user)
                    }}
                    options={users.map(user => ({
                      value: user.id,
                      label: `${user.avatar} ${user.name} (${getLanguageFlag(user.language)} ${getLanguageName(user.language)})`
                    }))}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Languages className="w-4 h-4" />
                {t('chat.autoTranslate')}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>{t('chat.noMessages')}</p>
                <p className="text-sm">{t('chat.startConversation')}</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === currentUser.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${message.sender === currentUser.id ? 'order-2' : 'order-1'}`}>
                    <div className={`p-3 rounded-lg ${
                      message.sender === currentUser.id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-800'
                    }`}>
                      {/* Original Message */}
                      <div className="mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs opacity-75">
                            {getLanguageFlag(message.originalLanguage)} {getLanguageName(message.originalLanguage)}
                          </span>
                          {message.confidence && (
                            <span className="text-xs opacity-75">
                              ({Math.round(message.confidence * 100)}%)
                            </span>
                          )}
                        </div>
                        <p className="text-sm">{message.text}</p>
                      </div>

                      {/* Translated Message */}
                      {message.isTranslated && (
                        <div className="border-t border-white/20 pt-2">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs opacity-75">
                              {getLanguageFlag(message.targetLanguage)} {getLanguageName(message.targetLanguage)}
                            </span>
                            <span className="text-xs opacity-75">({t('chat.translated')})</span>
                          </div>
                          <p className="text-sm font-medium">{message.translatedText}</p>
                        </div>
                      )}

                      {/* Message Actions */}
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/20">
                        <button
                          onClick={() => speakText(message.translatedText, message.targetLanguage)}
                          className="p-1 hover:bg-white/20 rounded transition-colors"
                          title={t('chat.speak')}
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(message.translatedText, message.id)}
                          className="p-1 hover:bg-white/20 rounded transition-colors"
                          title={t('chat.copy')}
                        >
                          {copiedMessageId === message.id ? (
                            <Check className="w-3 h-3 text-green-300" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>

                      {/* Cultural Notes */}
                      {message.culturalNotes && message.culturalNotes.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-white/20">
                          <p className="text-xs opacity-75 mb-1">{t('chat.culturalNotes')}:</p>
                          {message.culturalNotes.map((note, index) => (
                            <p key={index} className="text-xs opacity-75">{note}</p>
                          ))}
                        </div>
                      )}

                      {/* Pronunciation */}
                      {message.pronunciation && (
                        <div className="mt-2 pt-2 border-t border-white/20">
                          <p className="text-xs opacity-75">
                            {t('chat.pronunciation')}: {message.pronunciation}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className={`text-xs text-gray-500 mt-1 ${message.sender === currentUser.id ? 'text-right' : 'text-left'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={t('chat.typeMessage')}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isTranslating}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isTranslating}
                className="px-6"
              >
                {isTranslating ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
              <span>
                {t('chat.writingIn')}: {getLanguageFlag(currentUser.language)} {getLanguageName(currentUser.language)}
              </span>
              <span>→</span>
              <span>
                {t('chat.willBeTranslatedTo')}: {getLanguageFlag(targetUser.language)} {getLanguageName(targetUser.language)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
