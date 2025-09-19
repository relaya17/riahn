'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from './providers'
import { SocketEvents } from '@/types'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  emit: (event: keyof SocketEvents, data: unknown) => void
  on: (event: keyof SocketEvents, callback: (...args: unknown[]) => void) => void
  off: (event: keyof SocketEvents, callback?: (...args: unknown[]) => void) => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export function useSocket() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect()
        setSocket(null)
        setIsConnected(false)
      }
      return
    }

    // Temporarily disable socket connection to avoid errors
    // const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:2252'
    // const newSocket = io(socketUrl, {
    //   auth: {
    //     userId: user._id,
    //     token: user._id, // In production, use JWT token
    //   },
    //   transports: ['websocket', 'polling'],
    // })
    
    const newSocket = null // Disable socket temporarily

    // Temporarily disable socket event handlers
    // newSocket.on('connect', () => {
    //   console.log('Socket connected:', newSocket.id)
    //   setIsConnected(true)
    // })

    // newSocket.on('disconnect', () => {
    //   console.log('Socket disconnected')
    //   setIsConnected(false)
    // })

    // newSocket.on('connect_error', (error) => {
    //   console.error('Socket connection error:', error)
    //   setIsConnected(false)
    // })

    setSocket(newSocket)

    return () => {
      // newSocket.close()
    }
  }, [user])

  const emit = (event: keyof SocketEvents, data: unknown) => {
    if (socket && isConnected) {
      socket.emit(event, data)
    }
  }

  const on = (event: keyof SocketEvents, callback: (...args: unknown[]) => void) => {
    if (socket) {
      socket.on(event, callback)
    }
  }

  const off = (event: keyof SocketEvents, callback?: (...args: unknown[]) => void) => {
    if (socket) {
      if (callback) {
        socket.off(event, callback)
      } else {
        socket.removeAllListeners(event)
      }
    }
  }

  const value = {
    socket,
    isConnected,
    emit,
    on,
    off,
  }

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}
