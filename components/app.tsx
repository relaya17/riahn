import { SocketProvider } from './providers/socket-provider'
import { ChatRoom } from './chat/chat-room'

export default function App() {
  const userId = 'user123'
  const token = 'user123token'
  const chatId = 'room1'

  return (
    <SocketProvider userId={userId} token={token}>
      <ChatRoom chatId={chatId} />
    </SocketProvider>
  )
}
