// room.routes.js - minimal REST endpoints for listing and fetching rooms
const express = require('express');
const router = express.Router();
const roomManager = require('../services/roomManager');
const { jsonResponse } = require('../utils/response');

// list active rooms
router.get('/', (req, res) => {
  const rooms = roomManager.listRooms();
  return res.json(jsonResponse(true, { rooms }));
});

// get a single room
router.get('/:roomId', (req, res) => {
  const room = roomManager.getRoom(req.params.roomId);
  if (!room) return res.status(404).json(jsonResponse(false, null, 'Room not found'));
  return res.json(jsonResponse(true, { room }));
});

module.exports = router;
