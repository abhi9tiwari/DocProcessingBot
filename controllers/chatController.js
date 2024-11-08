// controllers/chatController.js

const chatService = require('../services/chatService');

exports.startChat = (req, res) => {
  const { assetId } = req.body;
  const chatThreadId = chatService.startNewChat(assetId);
  res.status(200).json({ chatThreadId });
};

exports.sendMessage = async (req, res) => {
  const { chatThreadId, message } = req.body;
  try {
    const response = await chatService.processMessage(chatThreadId, message);
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing message' });
  }
};

exports.getChatHistory = (req, res) => {
  const { chatThreadId } = req.query;
  const history = chatService.getChatHistory(chatThreadId);
  if (!history) return res.status(404).json({ error: 'Chat thread not found' });
  res.status(200).json({ messages: history });
};
