import { NextResponse } from 'next/server'
import { Server } from 'socket.io'
import { connectDB } from '@/lib/mongodb'
import Group from '@/models/Group'

export const GET = async () => {
    if (!globalThis.io) {
        const io = new Server({
            cors: { origin: '*', methods: ['GET', 'POST'] },
        })

        io.on('connection', (socket) => {
            console.log('🔌 Client connected:', socket.id)

            socket.on('authenticate', async (data: { userId: string; token: string }) => {
                console.log('🔐 Authentication attempt:', data)
                socket.data.userId = data.userId
                socket.emit('authenticated')
            })

            socket.on('sendMessage', async (msg: { chatId: string; content: string }) => {
                console.log('💬 Message from', socket.data.userId, msg)
                await connectDB()
                await Group.findByIdAndUpdate(msg.chatId, { $push: { messages: msg.content } })
                socket.broadcast.emit('newMessage', {
                    ...msg,
                    senderId: socket.data.userId,
                    timestamp: new Date().toISOString(),
                })
            })

            socket.on('typing', (data: { chatId: string; isTyping: boolean }) => {
                socket.broadcast.emit('userTyping', { userId: socket.data.userId, ...data })
            })

            socket.on('disconnect', () => console.log(`🔌 Client disconnected: ${socket.id}`))
        })

        globalThis.io = io
    }

    return NextResponse.json({ status: 'Socket server running' })
}
