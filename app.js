/**
 * @author: Shrutika Yawale
 * Tech stack: Node, Express, Html
 */

const express = require("express");
const app = express();
const PORT = 3000;
const { historyData } = require("./sample");
//middlewares
app.use(express.static("public"));

//routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const server = app.listen(PORT, () => {
  console.log(`Server started at - ${new Date()}`);
  console.log("go to http://localhost:3000");
});

//io logic here
const io = require("socket.io")(server);

io.on("connect", (socket) => {
  console.log("server connected");
  /**
   * This is the old data which will be fetched from data base
   * for this sample project I am taking it from constant
   */

  socket.emit("history", historyData);

  socket.on("sendMessage1", (data) => {
    console.log("sendMessage 1 ", data);
    //here will have to add the data to db in order to display it when user comes next time
    socket.emit("replyMessage", data.message);
  });

  socket.on("sendMessage2", (data) => {
    console.log("sendMessage 2", data);
    //here will have to add the data to db in order to display it when user comes next time
    socket.emit("replyMessage", data.message);
  });
});
