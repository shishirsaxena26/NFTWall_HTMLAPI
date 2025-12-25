// server.js - starts HTTP + Socket.IO server and wires socket handlers
require('dotenv').config();
const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const roomSocket = require('./sockets/room.socket');
const logger = require('./utils/logger');


const PORT = process.env.PORT;
const HOST = process.env.HOST;


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: ["http://ezetrade.ai", "https://ezetrade.ai", 
      "http://api.stbots.io", "https://api.stbots.io", "*"],
      methods: ["GET","POST"],
      credentials: true
    },
    transports: ["polling","websocket"]
  });


// attach socket handlers (namespaced for clarity)
roomSocket(io);


server.listen(PORT,HOST, () => {
logger.info(`Server listening on port ${HOST}:${PORT}`);
});


// graceful shutdown
process.on('SIGINT', () => {
logger.info('Shutting down...');
server.close(() => process.exit(0));
});