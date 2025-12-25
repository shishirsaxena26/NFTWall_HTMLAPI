// For now controllers are small — controllers can be used when you want more complex REST logic

exports.getRooms = (req, res) => {
    const roomManager = require('../services/roomManager');
    const rooms = roomManager.listRooms();
    res.json({ ok: true, rooms });
  };
  
  exports.getRoom = (req, res) => {
    const roomManager = require('../services/roomManager');
    const room = roomManager.getRoom(req.params.roomId);
    if (!room) return res.status(404).json({ ok: false, error: 'not_found' });
    res.json({ ok: true, room });
  };
  