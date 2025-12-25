import 'dotenv/config';
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { registerSocketHandlers } from "./sockets/socketManager.js";
import { logInfo } from "./utils/logger.js";

const PORT  = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

registerSocketHandlers(io);

server.listen(PORT, () => logInfo(`Server running on port ${PORT}`));
