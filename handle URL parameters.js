
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Simple object to store our URL mappings
const urlDatabase = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Main Page UI
app.get('/', (req, res) => {
    res.send(`
        <html>
            <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h2>🔗 Simple URL Shortener</h2>
                <form action="/shorten" method="POST">
                    <input type="url" name="longUrl" placeholder="Paste long URL here" required style="padding: 8px; width: 250px;">
                    <button type="submit" style="padding: 8px; cursor: pointer;">Shorten</button>
                </form>
                <p>Try pasting a link like <i>https://google.com</i></p>
            </body>
        </html>
    `);
});

// Route to create a short ID
app.post('/shorten', (req, res) => {
    const { longUrl } = req.body;
    const shortId = Math.random().toString(36).substring(2, 7); // Generate 5-char ID
    
    urlDatabase[shortId] = longUrl;
    
    const shortUrl = `http://localhost:${PORT}/${shortId}`;
    res.send(`<h3>Success! Your short link: <a href="${shortUrl}">${shortUrl}</a></h3><br><a href="/">Go Back</a>`);
});

// Redirect route
app.get('/:id', (req, res) => {
    const longUrl = urlDatabase[req.params.id];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
