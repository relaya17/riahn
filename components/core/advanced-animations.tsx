import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

// Parallax scrolling effect
interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export function Parallax({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className 
}: ParallaxProps) {
  const [offset, setOffset] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const rate = scrolled * -speed
        
        let transform = ''
        switch (direction) {
          case 'up':
            transform = `translateY(${rate}px)`
            break
          case 'down':
            transform = `translateY(${-rate}px)`
            break
          case 'left':
            transform = `translateX(${rate}px)`
            break
          case 'right':
            transform = `translateX(${-rate}px)`
            break
        }
        
        elementRef.current.style.transform = transform
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, direction])

  return (
    <div ref={elementRef} className={cn('will-change-transform', className)}>
      {children}
    </div>
  )
}

// Stagger animation for lists
interface StaggerAnimationProps {
  children: React.ReactNode[]
  delay?: number
  className?: string
}

export function StaggerAnimation({ 
  children, 
  delay = 100,
  className 
}: StaggerAnimationProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(entry.target.parentNode?.children || []).indexOf(entry.target)
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index])
            }, index * delay)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      const items = containerRef.current.children
      Array.from(items).forEach(item => observer.observe(item))
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={containerRef} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            'transition-all duration-500 ease-out',
            visibleItems.includes(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          )}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

// Magnetic hover effect
interface MagneticProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function Magnetic({ 
  children, 
  strength = 0.3,
  className 
}: MagneticProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const elementRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      
      setPosition({ x: deltaX, y: deltaY })
    }
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('transition-transform duration-200 ease-out', className)}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      {children}
    </div>
  )
}

// Typewriter effect
interface TypewriterProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
}

export function Typewriter({ 
  text, 
  speed = 50, 
  delay = 0,
  className,
  onComplete 
}: TypewriterProps) {
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

  useEffect(() => {
    if (delay > 0) {
      const timeout = setTimeout(() => {
        setCurrentIndex(0)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [delay])

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// Floating animation
interface FloatingProps {
  children: React.ReactNode
  intensity?: number
  duration?: number
  className?: string
}

export function Floating({ 
  children, 
  intensity = 10,
  duration = 3,
  className 
}: FloatingProps) {
  return (
    <div
      className={cn('animate-float', className)}
      style={{
        animationDuration: `${duration}s`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDirection: 'alternate'
      }}
    >
      {children}
    </div>
  )
}

// Morphing shape animation
interface MorphingShapeProps {
  shapes?: string[]
  duration?: number
  className?: string
}

export function MorphingShape({ 
  shapes = [
    'M20,20 L80,20 L80,80 L20,80 Z',
    'M50,10 L90,50 L50,90 L10,50 Z',
    'M20,50 Q50,10 80,50 Q50,90 20,50 Z'
  ],
  duration = 2,
  className 
}: MorphingShapeProps) {
  const [currentShape, setCurrentShape] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape(prev => (prev + 1) % shapes.length)
    }, duration * 1000)

    return () => clearInterval(interval)
  }, [shapes.length, duration])

  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      className={cn('transition-all duration-1000 ease-in-out', className)}
    >
      <path
        d={shapes[currentShape]}
        fill="currentColor"
        className="transition-all duration-1000 ease-in-out"
      />
    </svg>
  )
}

// Particle system
interface ParticleSystemProps {
  particleCount?: number
  className?: string
}

export function ParticleSystem({ 
  particleCount = 50,
  className 
}: ParticleSystemProps) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
  }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2
    }))
    setParticles(newParticles)
  }, [particleCount])

  useEffect(() => {
    const animate = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + 100) % 100,
        y: (particle.y + particle.vy + 100) % 100
      })))
    }

    const interval = setInterval(animate, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-500 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity
          }}
        />
      ))}
    </div>
  )
}

// Reveal animation on scroll
interface RevealOnScrollProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  delay?: number
  className?: string
}

export function RevealOnScroll({ 
  children, 
  direction = 'up',
  delay = 0,
  className 
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translateY(20px)'
        case 'down': return 'translateY(-20px)'
        case 'left': return 'translateX(20px)'
        case 'right': return 'translateX(-20px)'
        case 'fade': return 'translateY(0)'
        default: return 'translateY(20px)'
      }
    }
    return 'translateY(0)'
  }

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        transform: getTransform()
      }}
    >
      {children}
    </div>
  )
}

// Glitch effect
interface GlitchProps {
  children: React.ReactNode
  intensity?: number
  className?: string
}

export function Glitch({ 
  children, 
  intensity = 1,
  className 
}: GlitchProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 100)
    }, Math.random() * 5000 + 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={cn(
        'relative',
        isGlitching && 'animate-pulse',
        className
      )}
      style={{
        filter: isGlitching ? `hue-rotate(${Math.random() * 360}deg)` : 'none'
      }}
    >
      {children}
      {isGlitching && (
        <div className="absolute inset-0 bg-red-500 opacity-20 mix-blend-difference animate-ping" />
      )}
    </div>
  )
}

// Liquid blob animation
interface LiquidBlobProps {
  className?: string
  color?: string
}

export function LiquidBlob({ 
  className,
  color = '#3b82f6'
}: LiquidBlobProps) {
  return (
    <div className={cn('relative', className)}>
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="animate-pulse"
      >
        <defs>
          <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M40,100 Q40,40 100,40 Q160,40 160,100 Q160,160 100,160 Q40,160 40,100 Z"
          fill="url(#blobGradient)"
          className="animate-pulse"
        />
      </svg>
    </div>
  )
}
