const embeddingService = require('../services/embeddingService');
exports.processDocument = async (req, res) => {
  try {
    const filePath = req.file.path;
    const assetId = await embeddingService.processAndStoreEmbedding(filePath, req.file.originalname);
    res.status(200).json({ assetId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing document' });
  }
};
