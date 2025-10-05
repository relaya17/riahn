import { Server } from 'socket.io'
import Group from '@/models/Group'
import { connectDB } from '@/lib/mongodb'

interface SocketData {
  userId: string
  username: string
}

let io: Server | undefined

export const initSocket = () => {
  if (io) return io // אם כבר אתחולנו, מחזירים

  io = new Server({
    path: '/api/socket',
    cors: { origin: '*' },
  })

  io.on('connection', (socket) => {
    console.log('✅ Socket connected', socket.id)

    // Authentication
    socket.on('authenticate', async (data: SocketData) => {
      socket.data = data
      console.log('🔐 User authenticated:', data.userId)
    })

    // הצטרפות לקבוצה
    socket.on('joinGroup', (groupId: string) => {
      socket.join(groupId)
      console.log(`${socket.data.userId} joined group ${groupId}`)
    })

    // עזיבת קבוצה
    socket.on('leaveGroup', (groupId: string) => {
      socket.leave(groupId)
      console.log(`${socket.data.userId} left group ${groupId}`)
    })

    // שליחת הודעה
    socket.on('sendMessage', async ({ chatId, content }) => {
      await connectDB()
      const group = await Group.findById(chatId)
      if (!group) return

      const message = {
        content,
        senderId: socket.data.userId,
        timestamp: new Date(),
      }
      group.messages.push(message)
      await group.save()

      io?.to(chatId).emit('newMessage', message)
    })

    // משתמש מקליד
    socket.on('typing', ({ chatId, isTyping }) => {
      socket.to(chatId).emit('userTyping', {
        userId: socket.data.userId,
        chatId,
        isTyping,
      })
    })

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected', socket.id)
    })
  })

  return io
}
