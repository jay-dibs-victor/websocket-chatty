const Message = require('../models/Message');
const Room = require('../models/Room');

// @desc  Get messages for a room
// @route GET /api/messages/:room
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc  Get all rooms
// @route GET /api/rooms
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc  Create a room
// @route POST /api/rooms
const createRoom = async (req, res) => {
  try {
    const { name, description } = req.body;
    const room = new Room({ name, description });
    const createdRoom = await room.save();
    res.status(201).json(createdRoom);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getMessages, getRooms, createRoom };
