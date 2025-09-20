'use client'

import React, { useState } from 'react'
import { Globe, MapPin, Users, Calendar, Star, Clock } from 'lucide-react'

interface CulturalEvent {
  id: string
  title: string
  description: string
  country: string
  city: string
  date: Date
  type: 'festival' | 'tradition' | 'food' | 'music' | 'dance' | 'art'
  image: string
  video?: string
  audio?: string
  participants: number
  language: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number
  isLive: boolean
  isUpcoming: boolean
}

interface VirtualTour {
  id: string
  title: string
  description: string
  location: string
  guide: string
  language: string
  duration: number
  image: string
  landmarks: string[]
  culturalHighlights: string[]
  isAvailable: boolean
}

interface NativeSpeaker {
  id: string
  name: string
  country: string
  language: string
  specialties: string[]
  avatar: string
  rating: number
  isOnline: boolean
  nextAvailable: Date
  pricePerHour: number
}

export function CulturalImmersion() {
  const [activeTab, setActiveTab] = useState<'events' | 'tours' | 'speakers'>('events')
  const [selectedEvent, setSelectedEvent] = useState<CulturalEvent | null>(null)

  const culturalEvents: CulturalEvent[] = [
    {
      id: '1',
      title: 'חגיגת יום העצמאות הישראלי',
      description: 'חוו את חגיגות יום העצמאות הישראלי עם מוזיקה, ריקודים ומאכלים מסורתיים',
      country: 'ישראל',
      city: 'תל אביב',
      date: new Date('2024-05-14'),
      type: 'festival',
      image: '/images/israel-independence.jpg',
      video: '/videos/israel-independence.mp4',
      participants: 1250,
      language: 'עברית',
      difficulty: 'beginner',
      duration: 120,
      isLive: false,
      isUpcoming: true
    },
    {
      id: '2',
      title: 'טקס התה היפני',
      description: 'למד על אמנות התה היפנית המסורתית עם מומחה מקומי',
      country: 'יפן',
      city: 'קיוטו',
      date: new Date('2024-04-20'),
      type: 'tradition',
      image: '/images/japanese-tea.jpg',
      video: '/videos/japanese-tea.mp4',
      participants: 45,
      language: 'יפנית',
      difficulty: 'intermediate',
      duration: 90,
      isLive: true,
      isUpcoming: false
    },
    {
      id: '3',
      title: 'בישול פסטה איטלקית',
      description: 'למד לבשל פסטה איטלקית אותנטית עם שף מקומי',
      country: 'איטליה',
      city: 'רומא',
      date: new Date('2024-04-25'),
      type: 'food',
      image: '/images/italian-pasta.jpg',
      video: '/videos/italian-pasta.mp4',
      participants: 78,
      language: 'איטלקית',
      difficulty: 'beginner',
      duration: 150,
      isLive: false,
      isUpcoming: true
    }
  ]

  const virtualTours: VirtualTour[] = [
    {
      id: '1',
      title: 'סיור וירטואלי בפריז',
      description: 'גלה את יופייה של פריז עם מדריך מקומי',
      location: 'פריז, צרפת',
      guide: 'מארי דובואה',
      language: 'צרפתית',
      duration: 60,
      image: '/images/paris-tour.jpg',
      landmarks: ['מגדל אייפל', 'הלובר', 'נוטרדאם', 'שאנז אליזה'],
      culturalHighlights: ['אומנות צרפתית', 'בישול צרפתי', 'היסטוריה', 'אופנה'],
      isAvailable: true
    },
    {
      id: '2',
      title: 'מסע דרך הודו',
      description: 'חווה את התרבות והמסורות של הודו',
      location: 'דלהי, הודו',
      guide: 'ראג\' קומאר',
      language: 'הינדי',
      duration: 90,
      image: '/images/india-tour.jpg',
      landmarks: ['טאג\' מהאל', 'המצודה האדומה', 'מקדש לוטוס', 'שוק צ\'אנדני צ\'וק'],
      culturalHighlights: ['יוגה', 'מטבח הודי', 'מוזיקה קלאסית', 'פסטיבלים'],
      isAvailable: true
    }
  ]

  const nativeSpeakers: NativeSpeaker[] = [
    {
      id: '1',
      name: 'אנה גרסיה',
      country: 'ספרד',
      language: 'ספרדית',
      specialties: ['בישול', 'היסטוריה', 'מוזיקה'],
      avatar: '/images/anna-garcia.jpg',
      rating: 4.9,
      isOnline: true,
      nextAvailable: new Date(),
      pricePerHour: 25
    },
    {
      id: '2',
      name: 'יוקי טנאקה',
      country: 'יפן',
      language: 'יפנית',
      specialties: ['אמנות', 'זן', 'טכנולוגיה'],
      avatar: '/images/yuki-tanaka.jpg',
      rating: 4.8,
      isOnline: false,
      nextAvailable: new Date(Date.now() + 2 * 60 * 60 * 1000),
      pricePerHour: 30
    }
  ]

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'festival': return '🎉'
      case 'tradition': return '🏛️'
      case 'food': return '🍽️'
      case 'music': return '🎵'
      case 'dance': return '💃'
      case 'art': return '🎨'
      default: return '🌍'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours} שעות ${mins} דקות` : `${mins} דקות`
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Globe className="w-12 h-12 text-green-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Cultural Immersion
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          חווה תרבויות שונות מכל העולם דרך אירועים חיים, סיורים וירטואליים ומפגשים עם דוברי שפת אם
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4">
        {[
          { id: 'events', name: 'אירועים תרבותיים', icon: Calendar },
          { id: 'tours', name: 'סיורים וירטואליים', icon: MapPin },
          { id: 'speakers', name: 'דוברי שפת אם', icon: Users }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'events' | 'tours' | 'speakers')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-green-50'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-semibold">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Cultural Events */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturalEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="text-2xl">{getEventTypeIcon(event.type)}</span>
                    {event.isLive && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        LIVE
                      </span>
                    )}
                    {event.isUpcoming && (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        בקרוב
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="font-semibold">{event.country}</div>
                    <div className="text-sm opacity-90">{event.city}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{event.participants}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(event.difficulty)}`}>
                      {event.difficulty}
                    </span>
                    <span className="text-sm text-gray-500">{formatDuration(event.duration)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Virtual Tours */}
      {activeTab === 'tours' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {virtualTours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedTour(tour)}
              >
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="font-semibold">{tour.location}</div>
                    <div className="text-sm opacity-90">עם {tour.guide}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{tour.title}</h3>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">אתרים מרכזיים:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tour.landmarks.map((landmark, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {landmark}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">תרבות:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tour.culturalHighlights.map((highlight, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">{formatDuration(tour.duration)}</span>
                    <span className="text-sm font-semibold text-green-600">{tour.language}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Native Speakers */}
      {activeTab === 'speakers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nativeSpeakers.map((speaker) => (
              <div
                key={speaker.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedSpeaker(speaker)}
              >
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    {speaker.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{speaker.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold">{speaker.rating}</span>
                      </div>
                    </div>
                    
                    <div className="text-gray-600 mb-3">
                      <div className="font-semibold">{speaker.country}</div>
                      <div className="text-sm">{speaker.language}</div>
                    </div>
                    
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-700 mb-2">התמחויות:</h4>
                      <div className="flex flex-wrap gap-2">
                        {speaker.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {speaker.isOnline ? 'זמין עכשיו' : `זמין ב-${formatDate(speaker.nextAvailable)}`}
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        ${speaker.pricePerHour}/שעה
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="aspect-video bg-gray-200 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="text-2xl">{getEventTypeIcon(selectedEvent.type)}</span>
                {selectedEvent.isLive && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    LIVE
                  </span>
                )}
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="font-semibold text-xl">{selectedEvent.title}</div>
                <div className="text-sm opacity-90">{selectedEvent.country}, {selectedEvent.city}</div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-6">{selectedEvent.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-500">תאריך</div>
                  <div className="font-semibold">{formatDate(selectedEvent.date)}</div>
                </div>
                <div className="text-center">
                  <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-500">משתתפים</div>
                  <div className="font-semibold">{selectedEvent.participants}</div>
                </div>
                <div className="text-center">
                  <Globe className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-500">שפה</div>
                  <div className="font-semibold">{selectedEvent.language}</div>
                </div>
                <div className="text-center">
                  <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-500">משך</div>
                  <div className="font-semibold">{formatDuration(selectedEvent.duration)}</div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                  הצטרף עכשיו
                </button>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  סגור
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
