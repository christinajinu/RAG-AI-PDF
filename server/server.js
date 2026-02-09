require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const ingestPDF = require('./services/ingest');
const askQuestion = require('./services/query');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Proper Mongo Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ Mongo connection failed:', err);
    process.exit(1); // stop server if DB fails
  });
  console.log('KEY:', process.env.GEMINI_KEY);

// ✅ Multer
const upload = multer({ dest: 'uploads/' });

// ✅ Upload Route
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    console.log('Uploading:', req.file.originalname);

    await ingestPDF(req.file.path);

    res.send('✅ Uploaded successfully');
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).send('Upload failed');
  }
});

// ✅ Chat Route
app.post('/chat', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).send('Question is required.');
    }

    const answer = await askQuestion(question);

    res.json({ answer });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).send('Chat failed');
  }
});

// ✅ Start Server ONLY after everything loads
app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
