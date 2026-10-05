import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.mp4':  'video/mp4',
  '.webm': 'video/webm',
  '.ogg':  'video/ogg',
};

http.createServer((req, res) => {
  // Clean URLs, mirroring vercel.json (trailingSlash: true): ignore the query string,
  // serve folder/index.html for trailing-slash URLs, and redirect a bare directory URL
  // to its trailing-slash form so relative links resolve the same as in production.
  const [rawPath, query] = req.url.split(/\?(.*)/s);
  let urlPath = rawPath;
  try { urlPath = decodeURIComponent(rawPath); } catch {}
  let filePath = path.join(__dirname, urlPath);
  if (urlPath.endsWith('/')) filePath = path.join(filePath, 'index.html');
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isDirectory()) {
      res.writeHead(308, { Location: `${rawPath}/${query ? `?${query}` : ''}` });
      res.end();
      return;
    }
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    const fileSize = stat.size;
    const rangeHeader = req.headers['range'];

    if (rangeHeader) {
      // Parse Range: bytes=start-end
      const parts = rangeHeader.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      res.writeHead(206, {
        'Content-Range':  `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges':  'bytes',
        'Content-Length': chunkSize,
        'Content-Type':   contentType,
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type':   contentType,
        'Accept-Ranges':  'bytes',
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
