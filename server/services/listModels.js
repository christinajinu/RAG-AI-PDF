require('dotenv').config();

const { GoogleGenAI } = require('@google/genai');

const genAI = new GoogleGenAI({
  apiKey: "AIzaSyD78rG0UZz98A0vG89BjbJkfnhSoub5IQk",
});

async function listModels() {
  try {
    const response = await genAI.models.list();

    // for (const model of response.models) {
  console.log('TYPE:', typeof response);
  console.log('RAW RESPONSE:');
  console.dir(response, { depth: null });
    // }
  } catch (err) {
    console.error(err);
  }
}

listModels();

module.exports = listModels;