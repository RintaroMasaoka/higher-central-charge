import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const root = resolve('dist');
const port = Number(process.argv[2] || 4173);
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.woff2':'font/woff2', '.woff':'font/woff', '.ttf':'font/ttf' };
const server = createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const prefix = process.env.VITE_SITE_BASE_PATH || '';
    if (prefix && pathname.startsWith(prefix + '/')) pathname = pathname.slice(prefix.length);
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + '/')) { res.writeHead(403); res.end(); return; }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache' });
    res.end(body);
  } catch { res.writeHead(404, { 'Content-Type':'text/plain; charset=utf-8' }); res.end('ページが見つかりません。'); }
});
server.listen(port, '127.0.0.1', () => console.log('Study note: http://127.0.0.1:' + port + (process.env.VITE_SITE_BASE_PATH || '') + '/overview/'));
