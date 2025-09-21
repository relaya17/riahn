'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

// Client -> Server events
interface ClientToServerEvents {
  authenticate: (data: { userId: string; username: string }) => void
  sendMessage: (data: { content: string; chatId: string }) => void
  typing: (data: { chatId: string; isTyping: boolean }) => void
  joinGroup: (groupId: string) => void
  leaveGroup: (groupId: string) => void
}

// Server -> Client events
interface ServerToClientEvents {
  authenticated: () => void
  newMessage: (msg: { content: string; senderId: string; timestamp: string; chatId: string }) => void
  userTyping: (data: { userId: string; chatId: string; isTyping: boolean }) => void
  usersInRoom: (data: { chatId: string; users: string[] }) => void
}

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>

// Helper type to safely handle Socket.IO events
type SafeSocket = {
  on: <K extends keyof ServerToClientEvents>(event: K, listener: ServerToClientEvents[K]) => SafeSocket
  off: <K extends keyof ServerToClientEvents>(event: K, listener?: ServerToClientEvents[K]) => SafeSocket
  emit: <K extends keyof ClientToServerEvents>(event: K, ...args: Parameters<ClientToServerEvents[K]>) => boolean
  disconnect: () => void
}

interface SocketContextType {
  socket: SafeSocket | null
  isConnected: boolean
  messages: Record<string, { content: string; senderId: string; timestamp: string }[]>
  typingStatus: Record<string, Record<string, boolean>>
  emit: <K extends keyof ClientToServerEvents>(
    event: K,
    ...args: Parameters<ClientToServerEvents[K]>
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
}: {
  children: ReactNode
  userId: string
  username: string
}) {
  const [socket, setSocket] = useState<SafeSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState<Record<string, { content: string; senderId: string; timestamp: string }[]>>({})
  const [typingStatus, setTypingStatus] = useState<Record<string, Record<string, boolean>>>({})

  useEffect(() => {
    if (!userId) return

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000'
    const rawSocket = io(socketUrl, { transports: ['websocket', 'polling'] })
    const newSocket: SafeSocket = rawSocket as unknown as SafeSocket

    ;(rawSocket as TypedSocket).on('connect', () => {
      setIsConnected(true)
      newSocket.emit('authenticate', { userId, username })
    })

    ;(rawSocket as TypedSocket).on('disconnect', () => setIsConnected(false))

    // Handle new messages
    newSocket.on('newMessage', (msg) => {
      setMessages(prev => {
        const chatMsgs = prev[msg.chatId] || []
        return { ...prev, [msg.chatId]: [...chatMsgs, msg] }
      })
    })

    // Handle typing updates
    newSocket.on('userTyping', ({ chatId, userId: typingUserId, isTyping }) => {
      setTypingStatus(prev => {
        const chatTyping = prev[chatId] || {}
        return { ...prev, [chatId]: { ...chatTyping, [typingUserId]: isTyping } }
      })
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
      setSocket(null)
      setIsConnected(false)
    }
  }, [userId, username])

  const emit = useCallback(
    <K extends keyof ClientToServerEvents>(event: K, ...args: Parameters<ClientToServerEvents[K]>) => {
      socket?.emit(event, ...args)
    },
    [socket]
  )

  const on = useCallback(
    <K extends keyof ServerToClientEvents>(event: K, callback: ServerToClientEvents[K]) => {
      socket?.on(event, callback)
    },
    [socket]
  )

  const off = useCallback(
    <K extends keyof ServerToClientEvents>(event: K, callback?: ServerToClientEvents[K]) => {
      socket?.off(event, callback)
    },
    [socket]
  )

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, messages, typingStatus, emit, on, off }}
    >
      {children}
    </SocketContext.Provider>
  )
}
