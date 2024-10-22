const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

// Load SSL certificate and private key
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'private.key')),
    cert: fs.readFileSync(path.join(__dirname, 'selfsigned.crt')),
};

// Middleware to parse JSON requests
app.use(express.json());

// Basic route example
app.get('/', (req, res) => {
    res.send('Hello, secure world!');
});

// Example API endpoint
app.get('/api/data', (req, res) => {
    res.json({ message: 'This is a secure API response' });
});

// Start the server
const PORT = 443; // Standard port for HTTPS
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});
