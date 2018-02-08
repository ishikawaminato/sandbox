const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.Server(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
let viewerCount = 0;
let commentCount = 0;

app.use("/static", express.static("public"));
app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`));

io.on("connection", socket => {
  console.log(`a user connected`);

  viewerCount++;
  console.log(viewerCount);
  io.emit("count", viewerCount);
  io.emit("comment-count", commentCount);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    viewerCount--;
    console.log(viewerCount);
    io.emit("count", viewerCount);
  });
  socket.on("chat message", async msg => {
    console.log(msg);
    // msg = {type: "string", message: "string"}
    io.emit("chat message", msg.message);
    io.emit("comment-count", ++commentCount);
  });
});

server.listen(port, () => {
  console.log(`start: ${port}`);
});
