'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from './providers'
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../socket-types'

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>

interface SocketContextType {
  socket: TypedSocket | null
  isConnected: boolean
  emit: (event: string, data: any) => void
  on: (event: string, callback: (...args: any[]) => void) => void
  off: (event: string, callback?: (...args: any[]) => void) => void
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
  const [socket, setSocket] = useState<TypedSocket | null>(null)
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

    // Temporarily disable Socket.IO connection
    console.log('🔌 Socket.IO temporarily disabled - using Next.js only')
    
    // const socketUrl = process.env.NODE_ENV === 'production' 
    //   ? process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'
    //   : 'http://localhost:5005'
    
    // const newSocket = io(socketUrl, {
    //   auth: {
    //     userId: user._id,
    //     token: user._id, // In production, use JWT token
    //   },
    //   transports: ['websocket', 'polling'],
    //   path: '/api/socket',
    // })

    // Socket.IO temporarily disabled
    // setSocket(null)
    // setIsConnected(false)
  }, [user])

  const emit = (event: string, data: any) => {
    if (socket && isConnected) {
      socket.emit(event as any, data)
    }
  }

  const on = (event: string, callback: (...args: any[]) => void) => {
    if (socket) {
      socket.on(event as any, callback)
    }
  }

  const off = (event: string, callback?: (...args: any[]) => void) => {
    if (socket) {
      if (callback) {
        socket.off(event as any, callback)
      } else {
        socket.removeAllListeners(event as any)
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