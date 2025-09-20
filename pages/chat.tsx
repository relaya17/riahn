'use client';

import { useSocket } from '../hooks/useSocket';
import { useEffect } from 'react';

export default function ChatPage() {
  const { authenticate, sendMessage, setTyping, joinGroup } = useSocket();

  useEffect(() => {
    authenticate('user123', 'fakeToken');
    joinGroup('group1');
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">💬 Chat</h1>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <button
              onClick={() => sendMessage('group1', 'Hello from client!')}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >
              Send Message
            </button>
            <button
              onClick={() => setTyping('group1', true)}
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
            >
              Typing...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
