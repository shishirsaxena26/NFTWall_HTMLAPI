require('dotenv').config();
const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const SocketManager = require('./sockets/socketManager');
const registerRoomEvents = require('./events/roomEvents');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Dynamic socket
const socketMgr = new SocketManager(io);
registerRoomEvents(socketMgr); // register room events dynamically
socketMgr.bootstrap();

server.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
