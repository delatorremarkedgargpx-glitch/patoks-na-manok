// server.js - Patoks Na Manok LAN & Render Ready Server
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  
  // Prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
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
  console.log(`  Patoks Na Manok System Server Running!`);
  console.log(`==================================================`);
  console.log(`Local Access: http://localhost:${PORT}`);
  
  const interfaces = os.networkInterfaces();
  console.log(`
LAN Access from other devices on Wi-Fi:`);
  for (let devName in interfaces) {
    for (let iface of interfaces[devName]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(`  👉 http://${iface.address}:${PORT}`);
      }
    }
  }
  console.log(`==================================================
`);
});
