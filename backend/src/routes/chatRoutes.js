const express = require('express');
const router = express.Router();
const { getMessages, getRooms, createRoom } = require('../controllers/chatController');

router.route('/messages/:room').get(getMessages);
router.route('/rooms').get(getRooms).post(createRoom);

module.exports = router;
