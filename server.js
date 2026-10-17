// server.js - Patoks Na Manok Multi-Device Shared Sync Server
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const DB_FILE = path.join(__dirname, 'db.json');

// Initialize central db.json if missing
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ initialized: false, users: [], ledger: [] }, null, 2));
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // API Route: Get Database
  if (req.url === '/api/db' && req.method === 'GET') {
    fs.readFile(DB_FILE, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Failed to read database' }));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
    return;
  }

  // API Route: Save Database
  if (req.url === '/api/db' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // Serve Static Files
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(err.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain' });
      res.end(err.code === 'ENOENT' ? '404 Not Found' : `Server Error: ${err.code}`);
    } else {
      let extname = path.extname(filePath);
      let contentType = 'text/html';
      if (extname === '.js') contentType = 'text/javascript';
      if (extname === '.css') contentType = 'text/css';
      if (extname === '.json') contentType = 'application/json';
      if (extname === '.png') contentType = 'image/png';
      if (extname === '.ico') contentType = 'image/x-icon';

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log(`==================================================`);
  console.log(`  Patoks Na Manok Multi-Device Server Running!`);
  console.log(`==================================================`);
  console.log(`Local Access: http://localhost:${PORT}`);
  
  const interfaces = os.networkInterfaces();
  console.log(`\nLAN Access from other devices on Wi-Fi:`);
  for (let devName in interfaces) {
    for (let iface of interfaces[devName]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(`  👉 http://${iface.address}:${PORT}`);
      }
    }
  }
  console.log(`==================================================\n`);
});
