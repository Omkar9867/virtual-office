const { createServer } = require("http");
const next = require("next");
const parse = require("url").parse;
const WebSocket = require("./lib/websocket");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    // const {pathname, query} = parsedUrl;
    handle(req, res, parsedUrl);
  });
  server.on("upgrade", (req, socket, head) => {
    WebSocket.handleUpgrade(req, socket, head, (ws) => {
      WebSocket.emit("connection", ws, req);
    });
  });
  server.listen(5000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:5000");
  });
});
