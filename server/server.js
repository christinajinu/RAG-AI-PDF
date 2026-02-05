require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const ingestPDF = require('./services/ingest');
const askQuestion = require('./services/query');

mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  await ingestPDF(req.file.path);
  res.send('Document indexed successfully');
});

app.post('/chat', async (req, res) => {
  const answer = await askQuestion(req.body.question);
  res.json({ answer });
});

app.listen(5000, () => console.log('Server running'));
