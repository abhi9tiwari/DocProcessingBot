// routes/chatRoutes.js

const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

// define routes for chat functionality
router.post('/start', chatController.startChat);
router.post('/message', chatController.sendMessage);
router.get('/history', chatController.getChatHistory);

module.exports = router;
