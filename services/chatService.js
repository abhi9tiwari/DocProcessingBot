// services/chatService.js

const { v4: uuidv4 } = require('uuid');
const chromadb = require('chromadb');
const use = require('@tensorflow-models/universal-sentence-encoder');

let chatThreads = {};

// login for new chat
function startNewChat(assetId) {
  const chatThreadId = uuidv4();
  chatThreads[chatThreadId] = { assetId, messages: [] };
  return chatThreadId;
}

// logic for chat processing
async function processMessage(chatThreadId, message) {
  const chatThread = chatThreads[chatThreadId];
  if (!chatThread) throw new Error('Chat thread not found');

  const model = await use.load();
  const embedding = await model.embed([message]);
  const result = await chromadb.query({
    embedding: embedding.arraySync()[0],
    filter: { id: chatThread.assetId },
  });

  const response = `RAG Response based on embeddings: ${JSON.stringify(result)}`;
  chatThread.messages.push({ user: message, bot: response });
  return response;
}

// retrieve chat history
function getChatHistory(chatThreadId) {
  return chatThreads[chatThreadId]?.messages || null;
}

module.exports = {
  startNewChat,
  processMessage,
  getChatHistory,
};
