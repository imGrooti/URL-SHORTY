import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [longUrl, setLongUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/shrink', { url });
      setShortUrl(response.data.shortUrl);
      setLongUrl(response.data.longUrl);
      setError('');
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
      setShortUrl('');
      setLongUrl('');
    }
  };

  return (
    <div className="App">
      <div className="box">
        <h1>URL-SHORTY</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your URL"
            required
          />
          <button type="submit">SHRINK IT</button>
        </form>
        {shortUrl && (
          <div className="output">
            <p><strong>Original URL:</strong> {longUrl}</p>
            <p><strong>Shortened URL:</strong> <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
            <p><strong>Scan QR Code:</strong></p>
            <div className="qr-code">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(shortUrl)}`} alt={`QR Code for ${shortUrl}`} />
            </div>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;