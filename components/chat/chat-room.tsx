import { useEffect, useState } from 'react'
import { useSocket } from '../providers/socket-provider'

interface Message {
  content: string
  senderId: string
  timestamp: string
  chatId: string
}

export function ChatRoom({ chatId }: { chatId: string }) {
  const { emit, on, off } = useSocket()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [usersTyping, setUsersTyping] = useState<string[]>([])
  const [usersOnline, setUsersOnline] = useState<string[]>([])

  useEffect(() => {
    // הצטרפות לחדר
    emit('joinGroup', chatId)

    const handleNewMessage = (msg: Message) => {
      setMessages((prev) => [...prev, msg])
    }

    const handleTyping = (data: { userId: string; chatId: string; isTyping: boolean }) => {
      setUsersTyping((prev) => {
        if (data.isTyping) return [...new Set([...prev, data.userId])]
        return prev.filter((id) => id !== data.userId)
      })
    }

    const handleUsersInRoom = (data: { chatId: string; users: string[] }) => {
      if (data.chatId === chatId) setUsersOnline(data.users)
    }

    on('newMessage', handleNewMessage)
    on('userTyping', handleTyping)
    on('usersInRoom', handleUsersInRoom)

    return () => {
      emit('leaveGroup', chatId)
      off('newMessage', handleNewMessage)
      off('userTyping', handleTyping)
      off('usersInRoom', handleUsersInRoom)
    }
  }, [chatId, emit, on, off])

  const handleSend = () => {
    if (!newMessage.trim()) return
    emit('sendMessage', { content: newMessage, chatId })
    setNewMessage('')
    setIsTyping(false)
    emit('typing', { chatId, isTyping: false })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)
    if (!isTyping) {
      setIsTyping(true)
      emit('typing', { chatId, isTyping: true })
    }
  }

  return (
    <div className="chat-room">
      <h3>Chat Room: {chatId}</h3>

      <div className="online-users">
        <strong>Online:</strong> {usersOnline.join(', ')}
      </div>
      {usersTyping.length > 0 && <div className="typing-indicator">{usersTyping.join(', ')} typing...</div>}

      <div className="messages-container">
        {messages.map((m, i) => (
          <div key={i} className="message">
            <b>{m.senderId}</b>: {m.content} <small>({new Date(m.timestamp).toLocaleTimeString()})</small>
          </div>
        ))}
      </div>

      <input 
        type="text" 
        value={newMessage} 
        onChange={handleChange} 
        onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
        placeholder="Type your message..."
        aria-label="Message input"
        className="message-input"
      />
      <button onClick={handleSend} className="send-button">Send</button>
    </div>
  )
}
