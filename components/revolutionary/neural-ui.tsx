'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Zap, Users, Trophy, Star, Sparkles } from 'lucide-react'

interface NeuralNode {
  id: string
  x: number
  y: number
  size: number
  color: string
  pulse: boolean
}

interface NeuralUIProps {
  userProgress?: number
  activeConnections?: number
  achievements?: number
}

export default function NeuralUI({ 
  userProgress = 0, 
  activeConnections = 0, 
  achievements = 0 
}: NeuralUIProps) {
  const [nodes, setNodes] = useState<NeuralNode[]>([])
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    // יצירת רשת נוירונים דינמית
    const generateNeuralNetwork = () => {
      const newNodes: NeuralNode[] = []
      const nodeCount = 15 + Math.floor(userProgress / 10)
      
      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: `node-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 4 + Math.random() * 8,
          color: getNodeColor(i, userProgress),
          pulse: Math.random() > 0.7
        })
      }
      setNodes(newNodes)
    }

    generateNeuralNetwork()
    const interval = setInterval(generateNeuralNetwork, 3000)
    return () => clearInterval(interval)
  }, [userProgress])

  const getNodeColor = (index: number, progress: number): string => {
    const colors = [
      '#3b82f6', // כחול
      '#10b981', // ירוק
      '#f59e0b', // צהוב
      '#ef4444', // אדום
      '#8b5cf6', // סגול
      '#06b6d4', // ציאן
    ]
    
    if (progress > 80) return colors[1] // ירוק למתקדמים
    if (progress > 50) return colors[2] // צהוב לבינוניים
    return colors[index % colors.length]
  }

  const stats = [
    { icon: Brain, value: userProgress, label: 'התקדמות', color: 'text-blue-500' },
    { icon: Users, value: activeConnections, label: 'חיבורים', color: 'text-green-500' },
    { icon: Trophy, value: achievements, label: 'הישגים', color: 'text-yellow-500' },
  ]

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* רקע נוירונים */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {nodes.map((node, index) => (
            <motion.circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={node.color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: node.pulse ? [0.3, 1, 0.3] : 0.6,
                scale: node.pulse ? [1, 1.2, 1] : 1
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: index * 0.1
              }}
            />
          ))}
          
          {/* חיבורים בין נוירונים */}
          {nodes.slice(0, -1).map((node, index) => {
            const nextNode = nodes[index + 1]
            if (!nextNode) return null
            
            return (
              <motion.line
                key={`connection-${index}`}
                x1={node.x}
                y1={node.y}
                x2={nextNode.x}
                y2={nextNode.y}
                stroke="url(#gradient)"
                strokeWidth="0.5"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: index * 0.1 }}
              />
            )
          })}
          
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* תוכן מרכזי */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Brain className="w-16 h-16 text-white" />
          </motion.div>
          
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            RIAHN
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            פלטפורמת לימוד השפות המהפכנית הראשונה בעולם
            <br />
            עם AI מתקדם, למידה חברתית וגיימיפיקציה חכמה
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 inline mr-2" />
            התחל את המסע שלך
          </motion.button>
        </motion.div>

        {/* סטטיסטיקות */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-3 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}%
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* חלקיקים צפים */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
