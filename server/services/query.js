// SEMANTIC RETRIEVAL + LLM

const genAI = require('../gemini');
const Document = require('../models/document');

const askQuestion = async (question) => {
  try {
    // ✅ 1. Create embedding for the question
    const embeddingResult = await genAI.models.embedContent({
      model: 'gemini-embedding-001',
      contents: question,
    });

    const queryVector = embeddingResult.embeddings[0].values;

    // ✅ 2. Vector Search
    const results = await Document.aggregate([
      {
        $vectorSearch: {
          queryVector,
          path: 'embedding',
          numCandidates: 100,
          limit: 5,
          index: 'vector_index', // ensure this matches your index name
        },
      },
    ]);
console.log(results,"hh");

    // ✅ 3. Build Context
    const context = results.map((r) => r.content).join('\n');

    // 🚨 Guard (VERY important)
    if (!context) {
      return 'No relevant documents found.';
    }

    // ✅ 4. Generate Answer
    const prompt = `
You are a document assistant.

Answer ONLY using the provided context.
If the answer is not present, say "I don't know."

Context:
${context}

Question:
${question}
`;

    const result = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return result.text;
  } catch (error) {
    console.error('Error in askQuestion:', error);
    throw error;
  }
};

module.exports = askQuestion;
