//SEMANTIC RETRIEVAL +LLM
const openai=require("../openai");
const Document=require("../models/document");
const askQue=async(question)=>{
    //Get embedding for the question
    const response=await openai.embeddings.create({
        model:"text-embedding-3-small",
        input:question,
    });
    const queryVector=response.data[0].embedding;
    //Find relevant documents vector search
   const results=await Document.agggregate([
    {
        $vectorSearch:{ //semantic search engine
            queryVector:queryVector,
            path:"embedding",
            numCandidates:100,//consider 100 closest vectors or docs
            limit:5,//return top 5
            index:"default" //name of the vector index
    }}
   ]);

const context = results.map((r) => r.content).join('\n'); //extracting only text field removing db metadata
//The LLM is now acting like a writer, not a search engine
//Grounded Prompting

const completion = await openai.chat.completions.create({
  model: 'gpt-4.1-mini',
  messages: [
    {
      role: 'system',//rule maker 
      content:
        "Answer ONLY using the provided context. If not found, say you don't know.",
    },
    {
      role: 'user',//-que asker
      content: `
Context:
${context}

Question:
${question}
        `,
    },
  ],
});
return completion.choices[0].message.content;
}
module.exports={
    askQue  
}