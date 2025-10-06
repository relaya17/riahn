'use client'

import { useRef, useEffect } from 'react'

interface SoundEffectProps {
  sound: 'click' | 'success' | 'error' | 'notification' | 'typing' | 'hover'
  volume?: number
  enabled?: boolean
  onChange?: () => void
}

export function useSoundEffects() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const soundsRef = useRef<Map<string, AudioBuffer>>(new Map())

  useEffect(() => {
    // Initialize AudioContext
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    // Generate sound buffers
    const generateSound = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
      if (!audioContextRef.current) return null

      const audioContext = audioContextRef.current
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
      oscillator.type = type

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)

      return { oscillator, gainNode, duration }
    }

    // Pre-generate sounds
    const sounds = {
      click: generateSound(800, 0.1, 'square'),
      success: generateSound(523, 0.3, 'sine'), // C5
      error: generateSound(200, 0.5, 'sawtooth'),
      notification: generateSound(1000, 0.2, 'triangle'),
      typing: generateSound(1200, 0.05, 'square'),
      hover: generateSound(600, 0.1, 'sine')
    }

    return () => {
      // Cleanup
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const playSound = (soundType: SoundEffectProps['sound'], volume: number = 0.1) => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Sound configurations
    const soundConfigs = {
      click: { frequency: 800, duration: 0.1, type: 'square' as OscillatorType },
      success: { frequency: 523, duration: 0.3, type: 'sine' as OscillatorType },
      error: { frequency: 200, duration: 0.5, type: 'sawtooth' as OscillatorType },
      notification: { frequency: 1000, duration: 0.2, type: 'triangle' as OscillatorType },
      typing: { frequency: 1200, duration: 0.05, type: 'square' as OscillatorType },
      hover: { frequency: 600, duration: 0.1, type: 'sine' as OscillatorType }
    }

    const config = soundConfigs[soundType]
    oscillator.frequency.setValueAtTime(config.frequency, audioContext.currentTime)
    oscillator.type = config.type

    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + config.duration)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + config.duration)
  }

  return { playSound }
}

// Hook for keyboard sound effects
export function useKeyboardSounds(enabled: boolean = true) {
  const { playSound } = useSoundEffects()

  useEffect(() => {
    if (!enabled) return

    const handleKeyPress = (e: KeyboardEvent) => {
      // Only play sound for certain keys
      if (['Enter', 'Space', 'Tab', 'Escape'].includes(e.key)) {
        playSound('click', 0.05)
      } else if (e.key.length === 1) {
        // Regular character keys
        playSound('typing', 0.03)
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [enabled, playSound])

  return { playSound }
}

// Component for sound-enabled buttons
interface SoundButtonProps {
  children: React.ReactNode
  onClick?: () => void
  sound?: SoundEffectProps['sound']
  volume?: number
  className?: string
  [key: string]: any
}

export function SoundButton({ 
  children, 
  onClick, 
  sound = 'click', 
  volume = 0.1, 
  className,
  ...props 
}: SoundButtonProps) {
  const { playSound } = useSoundEffects()

  const handleClick = () => {
    playSound(sound, volume)
    onClick?.()
  }

  return (
    <button
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

// Component for sound-enabled inputs
interface SoundInputProps {
  sound?: SoundEffectProps['sound']
  volume?: number
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  [key: string]: any
}

export function SoundInput({ 
  sound = 'typing', 
  volume = 0.05, 
  className,
  onChange,
  ...props 
}: SoundInputProps) {
  const { playSound } = useSoundEffects()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playSound(sound, volume)
    onChange?.(e)
  }

  return (
    <input
      className={className}
      onChange={handleChange}
      {...props}
    />
  )
}
