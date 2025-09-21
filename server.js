// server.js
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const expressApp = express();
  const server = createServer(expressApp);

  // Socket.IO
  const io = new Server(server, {
    cors: {
      origin: "*", // כאן אפשר להגביל לדומיין הספציפי שלך
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("🔗 משתמש התחבר:", socket.id);

    socket.on("message", (msg) => {
      console.log("📩 הודעה:", msg);
      io.emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log("❌ משתמש התנתק:", socket.id);
    });
  });

  // Next.js routes
  expressApp.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`🚀 Ready on http://localhost:${PORT}`);
  });
});