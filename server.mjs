import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.PORT || 8000);
const root = process.cwd();

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);
    let pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    pathname = normalize(pathname).replace(/^\\+/, "");
    const filePath = join(root, pathname);
    const content = await readFile(filePath);
    response.writeHead(200, { "Content-Type": contentTypes[extname(filePath)] || "text/plain; charset=utf-8" });
    response.end(content);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not Found");
  }
});

server.listen(port, () => {
  console.log(`Demo server running at http://127.0.0.1:${port}`);
});