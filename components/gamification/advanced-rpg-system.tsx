'use client'

import React, { useState, useEffect } from 'react'
import { Sword, Shield, Star, Crown, Zap, Heart, Trophy, Target, Users, Map, BookOpen, Gem, Flame } from 'lucide-react'

// Helper function for progress bar width - inline styles are used directly

interface Player {
  id: string
  name: string
  level: number
  experience: number
  experienceToNext: number
  health: number
  maxHealth: number
  mana: number
  maxMana: number
  strength: number
  intelligence: number
  agility: number
  charisma: number
  class: PlayerClass
  skills: Skill[]
  inventory: Item[]
  achievements: Achievement[]
  quests: Quest[]
  currentLocation: string
  gold: number
  reputation: number
}

interface PlayerClass {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bonuses: {
    strength: number
    intelligence: number
    agility: number
    charisma: number
  }
  specialAbilities: string[]
}

interface Skill {
  id: string
  name: string
  level: number
  maxLevel: number
  experience: number
  category: 'combat' | 'magic' | 'social' | 'crafting'
  description: string
  icon: React.ComponentType<{ className?: string }>
}

interface Item {
  id: string
  name: string
  type: 'weapon' | 'armor' | 'accessory' | 'consumable' | 'quest'
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  stats: {
    strength?: number
    intelligence?: number
    agility?: number
    charisma?: number
    health?: number
    mana?: number
  }
  description: string
  icon: React.ComponentType<{ className?: string }>
  value: number
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum'
  points: number
  unlockedAt: Date
  category: string
}

interface Quest {
  id: string
  title: string
  description: string
  type: 'main' | 'side' | 'daily' | 'weekly'
  difficulty: 'easy' | 'medium' | 'hard' | 'epic'
  rewards: {
    experience: number
    gold: number
    items?: Item[]
  }
  objectives: QuestObjective[]
  status: 'available' | 'active' | 'completed'
  progress: number
  maxProgress: number
}

interface QuestObjective {
  id: string
  description: string
  completed: boolean
  progress: number
  maxProgress: number
}

export function AdvancedRPGSystem() {
  const [player, setPlayer] = useState<Player | null>(null)
  const [activeTab, setActiveTab] = useState<'character' | 'quests' | 'skills' | 'inventory' | 'achievements'>('character')
  const [showClassSelection, setShowClassSelection] = useState(false)

  const playerClasses: PlayerClass[] = [
    {
      id: 'warrior',
      name: 'לוחם',
      description: 'מומחה בקרב פנים אל פנים',
      icon: Sword,
      color: 'red',
      bonuses: { strength: 3, intelligence: 1, agility: 2, charisma: 0 },
      specialAbilities: ['מכה כפולה', 'הגנה משופרת', 'זעם קרב']
    },
    {
      id: 'mage',
      name: 'קוסם',
      description: 'מומחה בקסמים וחכמה',
      icon: Zap,
      color: 'blue',
      bonuses: { strength: 0, intelligence: 4, agility: 1, charisma: 1 },
      specialAbilities: ['קסם אש', 'קסם קרח', 'קסם ריפוי']
    },
    {
      id: 'rogue',
      name: 'נוכל',
      description: 'זריז וחכם',
      icon: Target,
      color: 'green',
      bonuses: { strength: 1, intelligence: 2, agility: 3, charisma: 0 },
      specialAbilities: ['התגנבות', 'מכה קריטית', 'הרעלה']
    },
    {
      id: 'bard',
      name: 'נגן',
      description: 'כריזמטי ומשכנע',
      icon: Star,
      color: 'purple',
      bonuses: { strength: 0, intelligence: 2, agility: 1, charisma: 3 },
      specialAbilities: ['שירה מקסמת', 'השפעה חברתית', 'מוזיקה מרפאת']
    }
  ]

  const sampleSkills: Skill[] = [
    {
      id: 'hebrew-speaking',
      name: 'דיבור עברית',
      level: 5,
      maxLevel: 10,
      experience: 750,
      category: 'social',
      description: 'יכולת לדבר עברית ברמה מתקדמת',
      icon: BookOpen
    },
    {
      id: 'grammar-mastery',
      name: 'שליטה בדקדוק',
      level: 3,
      maxLevel: 10,
      experience: 450,
      category: 'magic',
      description: 'הבנה עמוקה של כללי הדקדוק',
      icon: Zap
    },
    {
      id: 'conversation-flow',
      name: 'זרימת שיחה',
      level: 4,
      maxLevel: 10,
      experience: 600,
      category: 'social',
      description: 'יכולת לנהל שיחה טבעית',
      icon: Users
    }
  ]

  const sampleQuests: Quest[] = [
    {
      id: 'daily-practice',
      title: 'תרגול יומי',
      description: 'השלם 5 שיעורים היום',
      type: 'daily',
      difficulty: 'easy',
      rewards: { experience: 100, gold: 50 },
      objectives: [
        { id: '1', description: 'השלם 5 שיעורים', completed: false, progress: 3, maxProgress: 5 }
      ],
      status: 'active',
      progress: 3,
      maxProgress: 5
    },
    {
      id: 'grammar-master',
      title: 'אדון הדקדוק',
      description: 'הגע לרמה 5 במיומנות דקדוק',
      type: 'main',
      difficulty: 'medium',
      rewards: { experience: 500, gold: 200 },
      objectives: [
        { id: '1', description: 'הגע לרמה 5 בדקדוק', completed: false, progress: 3, maxProgress: 5 }
      ],
      status: 'active',
      progress: 3,
      maxProgress: 5
    }
  ]

  const sampleAchievements: Achievement[] = [
    {
      id: 'first-lesson',
      name: 'השיעור הראשון',
      description: 'השלמת השיעור הראשון',
      icon: Star,
      rarity: 'bronze',
      points: 10,
      unlockedAt: new Date('2024-01-01'),
      category: 'learning'
    },
    {
      id: 'streak-master',
      name: 'אדון הרצף',
      description: '7 ימים רצופים של למידה',
      icon: Flame,
      rarity: 'silver',
      points: 50,
      unlockedAt: new Date('2024-01-15'),
      category: 'dedication'
    }
  ]

  useEffect(() => {
    // Initialize player if not exists
    if (!player) {
      setShowClassSelection(true)
    }
  }, [player])

  const selectClass = (playerClass: PlayerClass) => {
    const newPlayer: Player = {
      id: '1',
      name: 'שחקן',
      level: 1,
      experience: 0,
      experienceToNext: 100,
      health: 100 + playerClass.bonuses.strength * 10,
      maxHealth: 100 + playerClass.bonuses.strength * 10,
      mana: 50 + playerClass.bonuses.intelligence * 10,
      maxMana: 50 + playerClass.bonuses.intelligence * 10,
      strength: 10 + playerClass.bonuses.strength,
      intelligence: 10 + playerClass.bonuses.intelligence,
      agility: 10 + playerClass.bonuses.agility,
      charisma: 10 + playerClass.bonuses.charisma,
      class: playerClass,
      skills: sampleSkills,
      inventory: [],
      achievements: sampleAchievements,
      quests: sampleQuests,
      currentLocation: 'הכפר הראשי',
      gold: 100,
      reputation: 0
    }
    setPlayer(newPlayer)
    setShowClassSelection(false)
  }

  const completeQuest = (questId: string) => {
    if (!player) return

    const quest = player.quests.find(q => q.id === questId)
    if (!quest || quest.status !== 'active') return

    const updatedPlayer = { ...player }
    const questIndex = updatedPlayer.quests.findIndex(q => q.id === questId)
    
    if (questIndex !== -1) {
      updatedPlayer.quests[questIndex].status = 'completed'
      updatedPlayer.experience += quest.rewards.experience
      updatedPlayer.gold += quest.rewards.gold
      
      // Check for level up
      if (updatedPlayer.experience >= updatedPlayer.experienceToNext) {
        updatedPlayer.level += 1
        updatedPlayer.experience -= updatedPlayer.experienceToNext
        updatedPlayer.experienceToNext = Math.floor(updatedPlayer.experienceToNext * 1.2)
        updatedPlayer.maxHealth += 10
        updatedPlayer.health = updatedPlayer.maxHealth
        updatedPlayer.maxMana += 5
        updatedPlayer.mana = updatedPlayer.maxMana
      }
    }
    
    setPlayer(updatedPlayer)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600'
      case 'uncommon': return 'text-green-600'
      case 'rare': return 'text-blue-600'
      case 'epic': return 'text-purple-600'
      case 'legendary': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-orange-100 text-orange-800'
      case 'epic': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (showClassSelection) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <Crown className="w-16 h-16 text-yellow-500 mx-auto" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              בחר את הדמות שלך
            </h1>
            <p className="text-xl text-gray-600">
              כל דמות מתמחה בתחומים שונים של למידת שפות
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {playerClasses.map((playerClass) => (
              <div
                key={playerClass.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => selectClass(playerClass)}
              >
                <div className="text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-${playerClass.color}-100 flex items-center justify-center`}>
                    <playerClass.icon className={`w-8 h-8 text-${playerClass.color}-600`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800">{playerClass.name}</h3>
                  <p className="text-gray-600 text-sm">{playerClass.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700">בונוסים:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>כוח:</span>
                        <span className="font-semibold">+{playerClass.bonuses.strength}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>חכמה:</span>
                        <span className="font-semibold">+{playerClass.bonuses.intelligence}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>זריזות:</span>
                        <span className="font-semibold">+{playerClass.bonuses.agility}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>כריזמה:</span>
                        <span className="font-semibold">+{playerClass.bonuses.charisma}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700">יכולות מיוחדות:</h4>
                    <div className="space-y-1">
                      {playerClass.specialAbilities.map((ability, index) => (
                        <div key={index} className="text-sm text-gray-600 bg-gray-50 rounded px-2 py-1">
                          {ability}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!player) return null

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Crown className="w-12 h-12 text-yellow-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            RPG Learning System
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          למד שפות כמו במשחק RPG עם דמויות, משימות והישגים
        </p>
      </div>

      {/* Player Stats */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-full bg-${player.class.color}-100 flex items-center justify-center`}>
              <player.class.icon className={`w-8 h-8 text-${player.class.color}-600`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{player.name}</h2>
              <p className="text-gray-600">{player.class.name} - רמה {player.level}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-600">ניסיון</div>
            <div className="text-lg font-bold text-blue-600">{player.experience}/{player.experienceToNext}</div>
            <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 rpg-experience-progress"
                style={{'--progress-width': `${(player.experience / player.experienceToNext) * 100}%`} as React.CSSProperties & { '--progress-width': string }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-red-600">{player.health}/{player.maxHealth}</div>
            <div className="text-sm text-gray-600">בריאות</div>
          </div>
          <div className="text-center">
            <Zap className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-600">{player.mana}/{player.maxMana}</div>
            <div className="text-sm text-gray-600">מאנה</div>
          </div>
          <div className="text-center">
            <Gem className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-yellow-600">{player.gold}</div>
            <div className="text-sm text-gray-600">זהב</div>
          </div>
          <div className="text-center">
            <Star className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-600">{player.reputation}</div>
            <div className="text-sm text-gray-600">מוניטין</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4">
        {[
          { id: 'character', name: 'דמות', icon: Crown },
          { id: 'quests', name: 'משימות', icon: Target },
          { id: 'skills', name: 'מיומנויות', icon: BookOpen },
          { id: 'inventory', name: 'ציוד', icon: Shield },
          { id: 'achievements', name: 'הישגים', icon: Trophy }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'character' | 'quests' | 'skills' | 'inventory' | 'achievements')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-yellow-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-yellow-50'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-semibold">{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Character Tab */}
      {activeTab === 'character' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Sword className="w-5 h-5 text-gray-600" />
              <span>סטטיסטיקות</span>
            </h3>
            <div className="space-y-4">
              {[
                { name: 'כוח', value: player.strength, icon: Sword, color: 'red' },
                { name: 'חכמה', value: player.intelligence, icon: Zap, color: 'blue' },
                { name: 'זריזות', value: player.agility, icon: Target, color: 'green' },
                { name: 'כריזמה', value: player.charisma, icon: Star, color: 'purple' }
              ].map((stat) => (
                <div key={stat.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
                    <span className="font-semibold">{stat.name}</span>
                  </div>
                  <span className="text-lg font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Map className="w-5 h-5 text-gray-600" />
              <span>מיקום נוכחי</span>
            </h3>
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold text-gray-800">{player.currentLocation}</div>
              <div className="text-gray-600">אתה נמצא במיקום הבסיסי שלך</div>
            </div>
          </div>
        </div>
      )}

      {/* Quests Tab */}
      {activeTab === 'quests' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {player.quests.map((quest) => (
              <div
                key={quest.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => console.log('Quest selected:', quest)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{quest.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(quest.difficulty)}`}>
                    {quest.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{quest.description}</p>
                
                <div className="space-y-2 mb-4">
                  {quest.objectives.map((objective) => (
                    <div key={objective.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{objective.description}</span>
                      <span className="text-sm font-semibold">{objective.progress}/{objective.maxProgress}</span>
                    </div>
                  ))}
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300 rpg-quest-progress"
                    style={{'--quest-progress': `${(quest.progress / quest.maxProgress) * 100}%`} as React.CSSProperties & { '--quest-progress': string }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    פרס: {quest.rewards.experience} ניסיון, {quest.rewards.gold} זהב
                  </div>
                  {quest.progress >= quest.maxProgress && quest.status === 'active' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        completeQuest(quest.id)
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      השלם
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {player.skills.map((skill) => (
              <div key={skill.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <skill.icon className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{skill.name}</h3>
                    <p className="text-sm text-gray-600">רמה {skill.level}/{skill.maxLevel}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{skill.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>ניסיון</span>
                    <span>{skill.experience}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300 rpg-skill-progress"
                      style={{'--skill-progress': `${(skill.experience / (skill.level * 100)) * 100}%`} as React.CSSProperties & { '--skill-progress': string }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {player.achievements.map((achievement) => (
              <div key={achievement.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <achievement.icon className={`w-8 h-8 ${getRarityColor(achievement.rarity)}`} />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{achievement.name}</h3>
                    <p className="text-sm text-gray-600">{achievement.category}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{achievement.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${getRarityColor(achievement.rarity)}`}>
                    {achievement.rarity.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-600">{achievement.points} נקודות</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
