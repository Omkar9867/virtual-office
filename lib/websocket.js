const WebSocket = require("ws");
const wss = new WebSocket.Server({ noServer: true });

const clients = new Map();

wss.on("connection", (ws, req) => {
  const userId = new URL(
    req.url,
    `http://${req.headers.host}`
  ).searchParams.get("userId");
  clients.set(userId, ws);

  // Broadcast updated presence list
  const updatePresence = () => {
    const presence = Array.from(clients.keys()).map((id) => ({
      id,
      status: clients.get(id).status,
    }));
    clients.forEach(({ ws }) => {
      ws.send(JSON.stringify({ type: "presence", presence }));
    });
  };

  updatePresence();

  ws.on("message", (msg) => {
    const data = JSON.parse(msg);
    clients.forEach((client, id) => {
      if (id !== userId && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  ws.on("close", () => {
    clients.delete(userId);
  });
});

module.exports = wss;
