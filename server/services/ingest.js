// CHUNKING AND EMBEDDING SERVICE

const fs = require('fs');
const pdf = require('pdf-parse');

const Document = require('../models/document');
const genAI = require('../gemini');

const CHUNK_SIZE = 800;
const CHUNK_OVERLAP = 150;

// -------- Chunk Function ----------
function chunkText(text, size, overlap) {
  const chunks = [];

  for (let i = 0; i < text.length; i += size - overlap) {
    chunks.push(text.slice(i, i + size));
  }

  return chunks;
}

const ingestPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);

    const text = pdfData.text;

    const chunks = chunkText(text, CHUNK_SIZE, CHUNK_OVERLAP);

    for (const chunk of chunks) {
      // ✅ CORRECT embedding call
      const response = await genAI.models.embedContent({
        model: 'gemini-embedding-001',
        contents: chunk,
      });

      const embedding = response.embeddings[0].values;
console.log(embedding.length);

     const doc = new Document({
        content: chunk,
        embedding,
      });
await doc.save();
    }

    console.log('✅ Ingestion complete');
  } catch (err) {
    console.error('❌ Ingestion failed:', err);
  }
};

module.exports = ingestPDF;
