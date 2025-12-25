import { logInfo } from "../utils/logger.js";
import { verifyToken } from "./auth.js";

export function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    logInfo(`Socket connected: ${socket.id}`);

    // STEP 1: Authenticate with JWT token
    socket.on("auth:token", ({ token }) => {
      const payload = verifyToken(token);
      if (!payload) return socket.emit("auth:failed", "Invalid token");
      socket.username = payload.username;
      socket.emit("auth:success", { username: payload.username });
      logInfo(`User authenticated: ${socket.username}`);
    });

    // STEP 2: Register dynamic events
    socket.on("register:event", ({ eventName }) => {
      if (!socket.username) return socket.emit("auth:failed", "Login required");
      logInfo(`Registering dynamic event: ${eventName}`);

      if (!socket._dynamicEvents) socket._dynamicEvents = [];
      if (socket._dynamicEvents.includes(eventName)) return;

      socket._dynamicEvents.push(eventName);

      socket.on(eventName, (payload) => {
        logInfo(`Event '${eventName}' fired by ${socket.username}`);
        socket.broadcast.emit(eventName, { from: socket.username, data: payload });
      });
    });

    socket.on("disconnect", () => {
      logInfo(`Socket disconnected: ${socket.id}`);
    });
  });
}
