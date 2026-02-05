function Upload() {
  const uploadFile = async (e) => {
    const form = new FormData();
    form.append('file', e.target.files[0]);

    await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: form,
    });

    alert('Indexed!');
  };

  return <input type="file" onChange={uploadFile} />;
}

export default Upload;
