const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  content: String,

  // store embedding as array
  embedding: {
    type: [Number],
    index: 'vector', // requires Atlas vector index
  },
});

module.exports = mongoose.model('Document', DocumentSchema);
