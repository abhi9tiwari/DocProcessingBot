const fs = require('fs');
const use = require('@tensorflow-models/universal-sentence-encoder');
const { ChromaClient } = require("chromadb");
const chromadb = new ChromaClient();

// business login for doc processing
async function processAndStoreEmbedding(filePath, originalName) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const model = await use.load();
  const embeddings = await model.embed([fileContent]);
  const assetId = `asset_${Date.now()}`;

  await chromadb.store({
    id: assetId,
    embedding: embeddings.arraySync()[0],
    metadata: { filePath: originalName },
  });

  return assetId;
}

module.exports = {
  processAndStoreEmbedding,
};
