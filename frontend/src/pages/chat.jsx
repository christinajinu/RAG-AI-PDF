import { useState } from 'react';

function Chat() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
const uploadFile = async (e) => {
    const form = new FormData();
    form.append('file', e.target.files[0]);
console.log(form);

    await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: form,
    });

    alert('Indexed!');
  };

 
  const ask = async () => {
    const res = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <>
    <div>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={ask}>Ask</button>

      <p>{answer}</p>
    </div>
    <div>
      <input type="file" onChange={uploadFile} />
    </div>
    </>
  );
}

export default Chat;
