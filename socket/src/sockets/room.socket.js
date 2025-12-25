// room.socket.js - socket handlers for room lifecycle
const roomManager = require('../services/roomManager');
const logger = require('../utils/logger');

// 🔥 GLOBAL — shared across all socket connections
const connectedUsers = new Map();  
module.exports = (io) => {
  io.on('connection', (socket) => {
    logger.info('socket connected: ' + socket.id);

    // Store userId in socket on auth. For demo we accept client-provided userId.
    // In production replace with JWT auth (see middleware/auth.js)
    socket.on('auth', ({ userName,userId }, ack) => {
    try {
      // Save new session
      //connectedUsers.set(userId, socket.id);
      socket.userName = userName;
      socket.userId = userId;
      logger.info(`socket ${socket.id} authed as ${userName} - ${userId}`);
      ack && ack({ ok: true, user: { userName,userId } });
    } catch (e) {
        logger.error(e);
        ack && ack({ error: e.message });
      } 
    });

    // create_room
    socket.on('room:create', ({ roomId, maxSize }, ack) => {
      try {
        if (!socket.userId) return ack && ack({ error: 'UNAUTHENTICATED' });
        const created = roomManager.createRoom(roomId, socket.userId, maxSize || 4);
        if (!created) return ack && ack({ error: 'ROOM_ALREADY_EXISTS' });

        socket.join(roomId);
        io.to(roomId).emit('room_created', created);
        ack && ack({ ok: true, room: created });
      } catch (e) {
        logger.error(e);
        ack && ack({ error: e.message });
      }
    });

    // join_room
    socket.on('room:join', ({ roomId }, ack) => {
      try {
        if (!socket.userId) return ack && ack({ error: 'UNAUTHENTICATED' });
        const result = roomManager.joinRoom(roomId, socket.userId);
        if (result.error) return ack && ack({ error: result.error });

        socket.join(roomId);
        const room = result.room;
        io.to(roomId).emit('room_users', room);
        ack && ack({ ok: true, room });
      } catch (e) {
        logger.error(e);
        ack && ack({ error: e.message });
      }
    });

    // leave_room
    socket.on('room:leave', ({ roomId }, ack) => {
      try {
        if (!socket.userId) return ack && ack({ error: 'UNAUTHENTICATED' });

        const result = roomManager.leaveRoom(roomId, socket.userId);
        socket.leave(roomId);

        if (result.destroyed) {
          io.to(roomId).emit('room_destroyed', { roomId });
        } else if (result.room) {
          io.to(roomId).emit('room_users', result.room);
        }

        ack && ack({ ok: true, result });
      } catch (e) {
        logger.error(e);
        ack && ack({ error: e.message });
      }
    });

    // destroy_room
    socket.on('room:destroy', ({ roomId }, ack) => {
      try {
        if (!socket.userId) return ack && ack({ error: 'UNAUTHENTICATED' });
        const res = roomManager.destroyRoom(roomId, socket.userId);
        if (res.error) return ack && ack({ error: res.error });

        // notify participants and force-leave
        io.to(roomId).emit('room_destroyed', { roomId });
        // Force all sockets to leave the room
        io.socketsLeave(roomId);

        ack && ack({ ok: true });
      } catch (e) {
        logger.error(e);
        ack && ack({ error: e.message });
      }
    });

    // list rooms
    socket.on('room:list', (payload, ack) => {
      try {
        const rooms = roomManager.listRooms();
        ack && ack({ ok: true, rooms });
      } catch (e) {
        logger.error(e);
        ack && ack({ error: e.message });
      }
    });

    // simple chat/send message event (broadcasts to room)
    socket.on('send_message', ({ roomId, message }, ack) => {
      try {
        if (!socket.userId) return ack && ack({ error: 'UNAUTHENTICATED' });
        const room = roomManager.getRoom(roomId);
        if (!room) return ack && ack({ error: 'ROOM_NOT_FOUND' });

        const payload = { from: socket.userId, message, ts: Date.now() };
        io.to(roomId).emit('message', payload);
        ack && ack({ ok: true });
      } catch (e) {
        logger.error(e);
        ack && ack({ error: e.message });
      }
    });

    socket.on('disconnecting', () => {
      // On disconnect, attempt to remove user from all rooms they are part of
      const rooms = Array.from(socket.rooms).filter((r) => r !== socket.id);
      for (const r of rooms) {
        try {
          const res = roomManager.leaveRoom(r, socket.userId);
          if (res && res.room) {
            io.to(r).emit('room_users', res.room);
          } else if (res && res.destroyed) {
            io.to(r).emit('room_destroyed', { roomId: r });
          }
        } catch (err) {
          logger.error(err);
        }
      }
    });

    socket.on('disconnect', (reason) => {
      logger.info(`socket ${socket.id} disconnected: ${reason}`);
    });
  });
};

