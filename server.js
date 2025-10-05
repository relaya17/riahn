// server.js
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const expressApp = express();
  const server = createServer(expressApp);

  // Socket.IO
  const io = new Server(server, {
    cors: {
      origin: '*', // כאן אפשר להגביל לדומיין הספציפי שלך
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', socket => {
    console.log('🔗 משתמש התחבר:', socket.id);

    socket.on('authenticate', data => {
      socket.data.userId = data.userId;
      socket.data.username = data.username;
      socket.emit('authenticated');
      console.log('🔐 משתמש אומת:', data.username);
    });

    socket.on('joinGroup', groupId => {
      socket.join(`group_${groupId}`);
      updateUsersInRoom(groupId);
      console.log(`👥 משתמש ${socket.data.username} הצטרף לחדר ${groupId}`);
    });

    socket.on('leaveGroup', groupId => {
      socket.leave(`group_${groupId}`);
      updateUsersInRoom(groupId);
      console.log(`👥 משתמש ${socket.data.username} עזב את החדר ${groupId}`);
    });

    socket.on('sendMessage', data => {
      console.log('📩 הודעה:', data);
      socket.to(`group_${data.chatId}`).emit('newMessage', {
        content: data.content,
        senderId: socket.data.userId,
        chatId: data.chatId,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on('typing', data => {
      socket.to(`group_${data.chatId}`).emit('userTyping', {
        userId: socket.data.userId,
        chatId: data.chatId,
        isTyping: data.isTyping,
      });
    });

    socket.on('disconnecting', () => {
      socket.rooms.forEach(room => {
        if (room.startsWith('group_')) {
          updateUsersInRoom(room.replace('group_', ''));
        }
      });
    });

    socket.on('disconnect', () => {
      console.log('❌ משתמש התנתק:', socket.id);
    });

    function updateUsersInRoom(groupId) {
      const room = io.sockets.adapter.rooms.get(`group_${groupId}`);
      const users = room
        ? Array.from(room)
            .map(id => io.sockets.sockets.get(id)?.data?.username)
            .filter(Boolean)
        : [];

      io.to(`group_${groupId}`).emit('usersInRoom', { chatId: groupId, users });
    }
  });

  // Next.js routes
  expressApp.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`🚀 Ready on http://localhost:${PORT}`);
  });
});
