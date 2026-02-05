//CHUNKING AND EMBEDDING SERVICE
const fs = require('fs');
const pdf = require('pdf-parse');
const Document = require('../models/document');
const openai = require('../openai');
const CHUNK_SIZE = 800; // characters
const CHUNK_OVERLAP = 150; // characters
function chunkText(text, size, overlap) {
  const chunks = [];

  for (let i = 0; i < text.length; i += size - overlap) {
    chunks.push(text.slice(i, i + size));
  }

  return chunks;
}
const ingestPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdf(dataBuffer);
  const text = pdfData.text;
  const chunks = chunkText(text, CHUNK_SIZE, CHUNK_OVERLAP);
  for (const chunk of chunks) {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: chunk,
    });
    const embedding = response.data[0].embedding;
    const doc = new Document({ content: chunk, embedding: embedding });
    await doc.save();
  }
  console.log('Ingestion complete');
};
module.exports = ingestPDF;
