# DOCUMENT SEARCH APPLICATION/Doc Intelligence Service

User uploads PDF
      ↓
Extract text
      ↓
Split into chunks
      ↓
Convert chunks → vectors (embeddings)
      ↓
Store in MongoDB
      ↓
User asks question
      ↓
Convert question → vector
      ↓
Similarity search
      ↓
Send relevant chunks to LLM
      ↓
Grounded answer



Stage 1 → Upload PDF
Stage 2 → Chunk text
Stage 3 → Gemini embeddings
Stage 4 → Store vectors (Mongo)
Stage 5 → Embed question (Gemini)
Stage 6 → Vector search
Stage 7 → Build grounded prompt
Stage 8 → Gemini generates answer 
 # pdf-parse

 LLMs cannot read files.

They only understand text tokens.
file to raw text.
# Chunking with overlap
search optimisation..
# Embeddings
converts text to numbers.
embeddings capture meaning.
Embedding model translates language → math.
Vector DB compares math → finds meaning.
LLM translates math-backed context → language.
MongoDB is just storing this array.embedded number arrays..embedding model is there inside openAI.
Mongodb runs $vectorSearch..it calculates distance between the vectors.uses osine similarity i.e., are these vectors pointing in same direction then similar.
Vector DB = fast similarity math.
How does vector search work?”
“Text is converted into embeddings — numerical vectors representing semantic meaning. The database then uses cosine similarity to retrieve vectors pointing in similar directions, enabling meaning-based search instead of keyword matching.


I implemented a semantic retrieval system where documents are chunked, embedded, stored with vector indexing in MongoDB, and dynamically retrieved to ground LLM responses.”