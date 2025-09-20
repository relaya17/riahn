const { createServer } = require('http');
const { Server } = require('socket.io');
const express = require('express');
const next = require('next');

// Node.js globals
const process = global.process;

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_SOCKET_URL || 'https://languageconnect.onrender.com'
      : 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  console.log('🔌 Client connected:', socket.id);

  socket.on('authenticate', data => {
    console.log('🔐 Authentication attempt:', data);
    socket.data.userId = data.userId;
    socket.emit('authenticated');
  });

  socket.on('sendMessage', data => {
    console.log('💬 Message from', socket.id, ':', data);
    socket.broadcast.emit('newMessage', {
      ...data,
      senderId: socket.data.userId ?? 'unknown',
      timestamp: new Date().toISOString(),
    });
  });

  socket.on('typing', data => {
    socket.broadcast.emit('userTyping', {
      userId: socket.data.userId ?? 'unknown',
      isTyping: data.isTyping,
      chatId: data.chatId,
    });
  });

  socket.on('joinGroup', groupId => {
    socket.join(`group_${groupId}`);
    console.log(`👥 User ${socket.id} joined group ${groupId}`);
  });

  socket.on('leaveGroup', groupId => {
    socket.leave(`group_${groupId}`);
    console.log(`👥 User ${socket.id} left group ${groupId}`);
  });

  socket.on('disconnect', reason => {
    console.log(`🔌 Client ${socket.id} disconnected. Reason: ${reason}`);
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    connectedClients: io.engine.clientsCount,
  });
});

// Next.js
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: './' });
const nextHandler = nextApp.getRequestHandler();

nextApp
  .prepare()
  .then(() => {
    app.all('*', nextHandler);

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`🔌 Socket.IO server ready for connections`);
      console.log(`📊 Health check at http://localhost:${PORT}/health`);
    });
  })
  .catch(ex => {
    console.error('Failed to start server:', ex);
    process.exit(1);
  });
