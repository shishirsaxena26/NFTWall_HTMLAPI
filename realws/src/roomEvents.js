const roomManager = require('../sockets/roomManager');

function registerRoomEvents(socketMgr) {

    // Create Room
    socketMgr.registerEvent('room:create', (socket, data, ack) => {
        const { roomId, userId, maxSize } = data;
        if (!userId) return ack && ack({ error: 'UNAUTHENTICATED' });

        const room = roomManager.createRoom(roomId, userId, maxSize);
        socket.join(roomId);
        socketMgr.io.to(roomId).emit('room_created', room);
        ack && ack({ ok: true, room });
    });

    // Join Room
    socketMgr.registerEvent('room:join', (socket, data, ack) => {
        const { roomId, userId } = data;
        const result = roomManager.joinRoom(roomId, userId);
        if (result.error) return ack && ack({ error: result.error });

        socket.join(roomId);
        socketMgr.io.to(roomId).emit('room_users', result.room);
        ack && ack({ ok: true, room: result.room });
    });

    // Leave Room
    socketMgr.registerEvent('room:leave', (socket, data, ack) => {
        const { roomId, userId } = data;
        const result = roomManager.leaveRoom(roomId, userId);
        socket.leave(roomId);
        if (result.destroyed) socketMgr.io.to(roomId).emit('room_destroyed', { roomId });
        else socketMgr.io.to(roomId).emit('room_users', result.room);
        ack && ack({ ok: true, result });
    });

    // Destroy Room
    socketMgr.registerEvent('room:destroy', (socket, data, ack) => {
        const { roomId, userId } = data;
        const result = roomManager.destroyRoom(roomId, userId);
        socketMgr.io.to(roomId).emit('room_destroyed', { roomId });
        socketMgr.io.socketsLeave(roomId);
        ack && ack({ ok: true, result });
    });

    // List Rooms
    socketMgr.registerEvent('room:list', (socket, data, ack) => {
        const rooms = roomManager.listRooms();
        ack && ack({ ok: true, rooms });
    });
}

module.exports = registerRoomEvents;
