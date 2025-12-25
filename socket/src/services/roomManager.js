// roomManager.js - in-memory room management
// Uses Map and Set for O(1) operations. Designed to be simple and fast.

class RoomManager {
    constructor() {
      // roomId -> { ownerId, users:Set, maxSize, createdAt }
      this.rooms = new Map();
    }
  
    createRoom(roomId, ownerId, maxSize = 4) {
      if (!roomId) throw new Error('roomId required');
      if (this.rooms.has(roomId)) return null; // already exists
  
      const room = {
        ownerId,
        users: new Set([ownerId]),
        maxSize,
        createdAt: Date.now()
      };
  
      this.rooms.set(roomId, room);
      return this._serializeRoom(roomId, room);
    }
  
    joinRoom(roomId, userId) {
      const room = this.rooms.get(roomId);
      if (!room) return { error: 'ROOM_NOT_FOUND' };
      if (room.users.has(userId)) return { ok: true, already: true, room: this._serializeRoom(roomId, room) };
      if (room.users.size >= room.maxSize) return { error: 'ROOM_FULL' };
  
      room.users.add(userId);
      return { ok: true, room: this._serializeRoom(roomId, room) };
    }
  
    leaveRoom(roomId, userId) {
      const room = this.rooms.get(roomId);
      if (!room) return { error: 'ROOM_NOT_FOUND' };
  
      room.users.delete(userId);
  
      if (room.users.size === 0) {
        this.rooms.delete(roomId);
        return { destroyed: true };
      }
  
      // if owner left and room still has users, assign new owner (first user)
      if (room.ownerId === userId && room.users.size > 0) {
        room.ownerId = [...room.users][0];
      }
  
      return { ok: true, room: this._serializeRoom(roomId, room) };
    }
  
    destroyRoom(roomId, requesterId) {
      const room = this.rooms.get(roomId);
      if (!room) return { error: 'ROOM_NOT_FOUND' };
      if (room.ownerId !== requesterId) return { error: 'NOT_OWNER' };
  
      this.rooms.delete(roomId);
      return { ok: true };
    }
  
    getRoom(roomId) {
      const room = this.rooms.get(roomId);
      return room ? this._serializeRoom(roomId, room) : null;
    }
  
    listRooms() {
      const out = [];
      for (const [roomId, room] of this.rooms.entries()) {
        out.push(this._serializeRoom(roomId, room));
      }
      // return newest first
      return out.sort((a, b) => b.createdAt - a.createdAt);
    }
  
    _serializeRoom(roomId, room) {
      return {
        roomId,
        ownerId: room.ownerId,
        users: Array.from(room.users),
        participantCount: room.users.size,
        maxSize: room.maxSize,
        createdAt: room.createdAt
      };
    }
  }
  
  module.exports = new RoomManager();
  