const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const root = path.resolve(__dirname, '../../public');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.woff2': 'font/woff2', '.md': 'text/plain; charset=utf-8', '.json': 'application/json' };
http.createServer((req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost'), requested = decodeURIComponent(url.pathname), file = path.resolve(root, '.' + (requested.endsWith('/') ? requested + 'index.html' : requested));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
    fs.readFile(file, (error, data) => { if (error) { res.writeHead(404); return res.end('Not found'); } res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(data); });
  } catch (_) { res.writeHead(400); res.end('Bad request'); }
}).listen(4173, '127.0.0.1', () => process.stdout.write('Hamdee demo: http://127.0.0.1:4173/hamdee-crm/index.html\n'));
