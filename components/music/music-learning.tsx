'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Music, Play, Pause, Volume2, Mic, MicOff, Heart, Star, Share2, Download, Repeat, Shuffle, SkipBack, SkipForward } from 'lucide-react'

interface Song {
  id: string
  title: string
  artist: string
  language: string
  genre: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number
  lyrics: string
  translation: string
  audioUrl: string
  imageUrl: string
  isFavorite: boolean
  rating: number
  plays: number
  lyricsWithTimestamps: LyricsLine[]
}

interface LyricsLine {
  timestamp: number
  original: string
  translation: string
  isHighlighted: boolean
}

interface KaraokeSession {
  id: string
  song: Song
  score: number
  accuracy: number
  wordsCorrect: number
  totalWords: number
  startTime: Date
  endTime?: Date
}

export function MusicLearning() {
  const [songs, setSongs] = useState<Song[]>([])
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isKaraokeMode, setIsKaraokeMode] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [karaokeSession, setKaraokeSession] = useState<KaraokeSession | null>(null)
  const [activeTab, setActiveTab] = useState<'songs' | 'karaoke' | 'rhythm'>('songs')
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all')
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  // Sample data
  const sampleSongs: Song[] = [
    {
      id: '1',
      title: 'שלום עליכם',
      artist: 'שרה\'לה שרון',
      language: 'עברית',
      genre: 'מסורתי',
      difficulty: 'beginner',
      duration: 180,
      lyrics: 'שלום עליכם מלאכי השרת\nמלאכי עליון\nממלך מלכי המלכים\nהקדוש ברוך הוא',
      translation: 'Peace be upon you, ministering angels\nAngels of the Most High\nFrom the King of kings of kings\nThe Holy One, blessed be He',
      audioUrl: '/audio/shalom-aleichem.mp3',
      imageUrl: '/images/shalom-aleichem.jpg',
      isFavorite: false,
      rating: 4.8,
      plays: 1250,
      lyricsWithTimestamps: [
        { timestamp: 0, original: 'שלום עליכם מלאכי השרת', translation: 'Peace be upon you, ministering angels', isHighlighted: false },
        { timestamp: 15, original: 'מלאכי עליון', translation: 'Angels of the Most High', isHighlighted: false },
        { timestamp: 30, original: 'ממלך מלכי המלכים', translation: 'From the King of kings of kings', isHighlighted: false },
        { timestamp: 45, original: 'הקדוש ברוך הוא', translation: 'The Holy One, blessed be He', isHighlighted: false }
      ]
    },
    {
      id: '2',
      title: 'La Vie En Rose',
      artist: 'Édith Piaf',
      language: 'צרפתית',
      genre: 'שאנסון',
      difficulty: 'intermediate',
      duration: 195,
      lyrics: 'Des yeux qui font baiser les miens\nUn rire qui se perd sur sa bouche\nVoilà le portrait sans retouche\nDe l\'homme auquel j\'appartiens',
      translation: 'Eyes that make mine kiss\nA laugh that gets lost on his mouth\nHere is the portrait without retouching\nOf the man to whom I belong',
      audioUrl: '/audio/la-vie-en-rose.mp3',
      imageUrl: '/images/la-vie-en-rose.jpg',
      isFavorite: true,
      rating: 4.9,
      plays: 2100,
      lyricsWithTimestamps: [
        { timestamp: 0, original: 'Des yeux qui font baiser les miens', translation: 'Eyes that make mine kiss', isHighlighted: false },
        { timestamp: 20, original: 'Un rire qui se perd sur sa bouche', translation: 'A laugh that gets lost on his mouth', isHighlighted: false },
        { timestamp: 40, original: 'Voilà le portrait sans retouche', translation: 'Here is the portrait without retouching', isHighlighted: false },
        { timestamp: 60, original: 'De l\'homme auquel j\'appartiens', translation: 'Of the man to whom I belong', isHighlighted: false }
      ]
    }
  ]

  useEffect(() => {
    setSongs(sampleSongs)
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current
      
      const updateTime = () => setCurrentTime(audio.currentTime)
      const updateDuration = () => setDuration(audio.duration)
      
      audio.addEventListener('timeupdate', updateTime)
      audio.addEventListener('loadedmetadata', updateDuration)
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime)
        audio.removeEventListener('loadedmetadata', updateDuration)
      }
    }
  }, [currentSong])

  const playPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
  }

  const toggleFavorite = (songId: string) => {
    setSongs(songs.map(song => 
      song.id === songId ? { ...song, isFavorite: !song.isFavorite } : song
    ))
  }

  const startKaraoke = (song: Song) => {
    setCurrentSong(song)
    setIsKaraokeMode(true)
    setKaraokeSession({
      id: Date.now().toString(),
      song,
      score: 0,
      accuracy: 0,
      wordsCorrect: 0,
      totalWords: song.lyrics.split(' ').length,
      startTime: new Date()
    })
  }

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredSongs = songs.filter(song => {
    const genreMatch = selectedGenre === 'all' || song.genre === selectedGenre
    const languageMatch = selectedLanguage === 'all' || song.language === selectedLanguage
    return genreMatch && languageMatch
  })

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Music className="w-12 h-12 text-pink-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Music & Rhythm Learning
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          למד שפות דרך מוזיקה, שירים וקריוקי אינטראקטיבי
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4">
        {[
          { id: 'songs', name: 'שירים', icon: Music },
          { id: 'karaoke', name: 'קריוקי', icon: Mic },
          { id: 'rhythm', name: 'קצב', icon: Volume2 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-pink-50'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-semibold">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Songs Tab */}
      {activeTab === 'songs' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                aria-label="בחר ז'אנר מוזיקה"
              >
                <option value="all">כל הז'אנרים</option>
                <option value="מסורתי">מסורתי</option>
                <option value="שאנסון">שאנסון</option>
                <option value="פופ">פופ</option>
                <option value="רוק">רוק</option>
                <option value="ג'אז">ג'אז</option>
              </select>
              
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                aria-label="בחר שפה"
              >
                <option value="all">כל השפות</option>
                <option value="עברית">עברית</option>
                <option value="צרפתית">צרפתית</option>
                <option value="אנגלית">אנגלית</option>
                <option value="ספרדית">ספרדית</option>
                <option value="איטלקית">איטלקית</option>
              </select>
            </div>
          </div>

          {/* Songs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSongs.map((song) => (
              <div
                key={song.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-square bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => toggleFavorite(song.id)}
                      className={`p-2 rounded-full transition-colors ${
                        song.isFavorite ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      aria-label={song.isFavorite ? "הסר ממועדפים" : "הוסף למועדפים"}
                    >
                      <Heart className={`w-5 h-5 ${song.isFavorite ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="font-semibold">{song.genre}</div>
                    <div className="text-sm opacity-90">{song.language}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{song.title}</h3>
                  <p className="text-gray-600 mb-3">{song.artist}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(song.difficulty)}`}>
                      {song.difficulty}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">{song.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{formatTime(song.duration)}</span>
                    <span>{song.plays} השמעות</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentSong(song)}
                      className="flex-1 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>השמע</span>
                    </button>
                    <button
                      onClick={() => startKaraoke(song)}
                      className="px-4 py-2 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors"
                      aria-label="התחל קריוקי"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Karaoke Tab */}
      {activeTab === 'karaoke' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Mic className="w-6 h-6 text-pink-600" />
              <span>קריוקי אינטראקטיבי</span>
            </h2>
            <p className="text-gray-600 mb-6">
              שיר יחד עם השיר וקבל ציון על הדיוק שלך
            </p>

            {karaokeSession ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-pink-800 mb-2">
                    {karaokeSession.song.title}
                  </h3>
                  <p className="text-pink-700 mb-4">{karaokeSession.song.artist}</p>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-pink-600">{karaokeSession.score}</div>
                      <div className="text-sm text-gray-600">ציון</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{karaokeSession.accuracy}%</div>
                      <div className="text-sm text-gray-600">דיוק</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{karaokeSession.wordsCorrect}/{karaokeSession.totalWords}</div>
                      <div className="text-sm text-gray-600">מילים נכונות</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">מילות השיר:</h4>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    {karaokeSession.song.lyricsWithTimestamps.map((line, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg transition-colors ${
                          line.isHighlighted ? 'bg-pink-100 border-l-4 border-pink-500' : 'bg-white'
                        }`}
                      >
                        <div className="font-semibold text-gray-800">{line.original}</div>
                        <div className="text-sm text-gray-600">{line.translation}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={startRecording}
                    disabled={isRecording}
                    className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    <span>{isRecording ? 'מקליט...' : 'התחל הקלטה'}</span>
                  </button>
                  <button
                    onClick={stopRecording}
                    disabled={!isRecording}
                    className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    עצור
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">בחר שיר לקריוקי</h3>
                <p className="text-gray-500">עבור לטאב "שירים" ובחר שיר להתחיל קריוקי</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rhythm Tab */}
      {activeTab === 'rhythm' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center space-x-2">
              <Volume2 className="w-6 h-6 text-pink-600" />
              <span>למידת קצב</span>
            </h2>
            <p className="text-gray-600 mb-6">
              למד את הקצב והמקצב של השפה דרך תרגילים אינטראקטיביים
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-pink-800 mb-3">תרגיל קצב בסיסי</h3>
                <p className="text-pink-700 mb-4">למד את הקצב הבסיסי של השפה</p>
                <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors">
                  התחל תרגיל
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">תרגיל מקצב מתקדם</h3>
                <p className="text-purple-700 mb-4">תרגל מקצבים מורכבים יותר</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  התחל תרגיל
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audio Player */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-gray-400" />
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{currentSong.title}</h4>
                <p className="text-sm text-gray-600">{currentSong.artist}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="שיר קודם"
                >
                  <SkipBack className="w-5 h-5 text-gray-600" />
                </button>
                
                <button
                  onClick={playPause}
                  className="p-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                
                <button 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="שיר הבא"
                >
                  <SkipForward className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-gray-600" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20"
                aria-label="עוצמת קול"
              />
              </div>
            </div>
            
            <div className="mt-3">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleTimeChange}
                className="w-full"
                aria-label="התקדמות השיר"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
          
          <audio
            ref={audioRef}
            src={currentSong.audioUrl}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      )}
    </div>
  )
}
