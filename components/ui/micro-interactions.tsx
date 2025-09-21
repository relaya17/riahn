'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface RippleEffectProps {
  className?: string
  children: React.ReactNode
  color?: string
  duration?: number
}

export function RippleEffect({ 
  className, 
  children, 
  color = 'rgba(59, 130, 246, 0.3)',
  duration = 600 
}: RippleEffectProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    }
    
    setRipples(prev => [...prev, newRipple])
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, duration)
  }

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onClick={handleClick}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            backgroundColor: color,
            borderRadius: '50%',
            animationDuration: `${duration}ms`
          }}
        />
      ))}
    </div>
  )
}

interface HoverGlowProps {
  className?: string
  children: React.ReactNode
  glowColor?: string
  intensity?: 'low' | 'medium' | 'high'
}

export function HoverGlow({ 
  className, 
  children, 
  glowColor = 'rgba(59, 130, 246, 0.5)',
  intensity = 'medium'
}: HoverGlowProps) {
  const intensityClasses = {
    low: 'hover:shadow-lg hover:shadow-blue-500/20',
    medium: 'hover:shadow-xl hover:shadow-blue-500/30',
    high: 'hover:shadow-2xl hover:shadow-blue-500/40'
  }

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-in-out',
        intensityClasses[intensity],
        className
      )}
      style={{
        '--glow-color': glowColor
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

interface MagneticButtonProps {
  className?: string
  children: React.ReactNode
  strength?: number
  onClick?: () => void
}

export function MagneticButton({ 
  className, 
  children, 
  strength = 0.3,
  onClick 
}: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      className={cn('transition-transform duration-200 ease-out', className)}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}

export function TypewriterText({ 
  text, 
  speed = 50, 
  className,
  onComplete 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

interface FloatingActionProps {
  className?: string
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  duration?: number
}

export function FloatingAction({ 
  className, 
  children, 
  direction = 'up',
  distance = 10,
  duration = 2000
}: FloatingActionProps) {
  const directionClasses = {
    up: 'animate-float',
    down: 'animate-bounce',
    left: 'animate-pulse',
    right: 'animate-pulse'
  }

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-in-out',
        directionClasses[direction],
        className
      )}
      style={{
        animationDuration: `${duration}ms`,
        animationIterationCount: 'infinite'
      }}
    >
      {children}
    </div>
  )
}
