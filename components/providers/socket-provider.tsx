'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'

interface ClientToServerEvents {
  authenticate: (data: { userId: string; username: string; token?: string }) => void
  sendMessage: (data: { content: string; chatId: string }) => void
  typing: (data: { chatId: string; isTyping: boolean }) => void
  joinGroup: (groupId: string) => void
  leaveGroup: (groupId: string) => void
}

interface ServerToClientEvents {
  authenticated: () => void
  newMessage: (msg: { content: string; senderId: string; senderName: string; timestamp: string }) => void
  userTyping: (data: { userId: string; username: string; chatId: string; isTyping: boolean }) => void
  usersInRoom: (data: { chatId: string; users: string[] }) => void
}

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>

interface SocketContextType {
  socket: TypedSocket | null
  isConnected: boolean
  emit: <K extends keyof ClientToServerEvents>(
    event: K,
    data: Parameters<ClientToServerEvents[K]>[0]
  ) => void
  on: <K extends keyof ServerToClientEvents>(
    event: K,
    callback: ServerToClientEvents[K]
  ) => void
  off: <K extends keyof ServerToClientEvents>(
    event: K,
    callback?: ServerToClientEvents[K]
  ) => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export function useSocket() {
  const context = useContext(SocketContext)
  if (!context) throw new Error('useSocket must be used within a SocketProvider')
  return context
}

export function SocketProvider({
  children,
  userId,
  username,
  token,
}: {
  children: ReactNode
  userId: string
  username: string
  token?: string
}) {
  const [socket, setSocket] = useState<TypedSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!userId) return

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000'
    const newSocket: TypedSocket = io(socketUrl, {
      transports: ['websocket', 'polling'],
    })

    newSocket.on('connect', () => {
      setIsConnected(true)
      newSocket.emit('authenticate', { userId, username, token })
    })

    newSocket.on('disconnect', () => setIsConnected(false))
    newSocket.on('connect_error', (err) => console.error('Socket connection error', err))

    setSocket(newSocket)

    return () => newSocket.disconnect()
  }, [userId, username, token])

  const emit = <K extends keyof ClientToServerEvents>(
    event: K,
    data: Parameters<ClientToServerEvents[K]>[0]
  ) => socket?.emit(event, data)

  const on = <K extends keyof ServerToClientEvents>(
    event: K,
    callback: ServerToClientEvents[K] & ((...args: any[]) => void)
  ) => {
    socket?.on(event as string, callback as (...args: any[]) => void)
  }

  const off = <K extends keyof ServerToClientEvents>(
    event: K,
    callback?: ServerToClientEvents[K] & ((...args: any[]) => void)
  ) => {
    if (callback) socket?.off(event as string, callback as (...args: any[]) => void)
    else socket?.removeAllListeners(event as string)
  }

  return (
    <SocketContext.Provider value={{ socket, isConnected, emit, on, off }}>
      {children}
    </SocketContext.Provider>
  )
}
