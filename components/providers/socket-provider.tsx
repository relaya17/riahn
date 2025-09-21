'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'

interface ClientToServerEvents {
  authenticate: (data: { userId: string; token: string }) => void
  sendMessage: (data: { content: string; chatId: string }) => void
  typing: (data: { chatId: string; isTyping: boolean }) => void
  joinGroup: (groupId: string) => void
  leaveGroup: (groupId: string) => void
}

interface ServerToClientEvents {
  authenticated: () => void
  newMessage: (msg: { content: string; senderId: string; timestamp: string }) => void
  userTyping: (data: { userId: string; chatId: string; isTyping: boolean }) => void
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
  token,
}: {
  children: ReactNode
  userId: string
  token: string
}) {
  const [socket, setSocket] = useState<TypedSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000'
    const newSocket: TypedSocket = io(socketUrl, {
      auth: { userId, token },
      transports: ['websocket', 'polling'],
    })

    newSocket.on('connect', () => setIsConnected(true))
    newSocket.on('disconnect', () => setIsConnected(false))

    setSocket(newSocket)

    return () => newSocket.disconnect()
  }, [userId, token])

  const emit = <K extends keyof ClientToServerEvents>(
    event: K,
    data: Parameters<ClientToServerEvents[K]>[0]
  ) => socket?.emit(event, data)

  const on = <K extends keyof ServerToClientEvents>(
    event: K,
    callback: ServerToClientEvents[K]
  ) => socket?.on(event, callback)

  const off = <K extends keyof ServerToClientEvents>(
    event: K,
    callback?: ServerToClientEvents[K]
  ) => {
    if (callback) socket?.off(event, callback)
    else socket?.removeAllListeners(event)
  }

  return (
    <SocketContext.Provider value={{ socket, isConnected, emit, on, off }}>
      {children}
    </SocketContext.Provider>
  )
}
