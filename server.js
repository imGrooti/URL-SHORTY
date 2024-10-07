const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/shrink', async (req, res) => {
    const longUrl = req.body.url;

    const url = "https://api.t.ly/api/v1/link/shorten";

    const headers = {
        headers: {
            "Authorization": `Bearer ${process.env.TLY_API_KEY}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    };

    const body = {
        "long_url": longUrl,
        "domain": "https://t.ly/",
        "expire_at_datetime": "2035-01-17 15:00:00",
        "description": "Social Media Link",
        "public_stats": true
    };

    try {
        const result = await axios.post(url, body, headers);
        const shortUrl = result.data.short_url;
        res.json({ shortUrl, longUrl });
    } catch (error) {
        console.error("Error shortening URL: ", error.message);
        res.status(500).json({ error: "Failed to shorten URL. Please try again." });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});