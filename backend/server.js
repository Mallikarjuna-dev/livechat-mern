const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;

const path = require("path");

connectDB(); //connection to the mongo

const app = express();

app.use(cors());

app.use(express.json()); // to eccept json data

// app.get("/", (req, res) => {
//   res.send("API running successfully");
// });

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));

// ------------------------Deployment-------------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// ------------------------Deployment-------------------------------------

app.use(notFound);
app.use(errorHandler);

const server = app.listen(
  port,
  console.log(`server listening on port: ${port}`.yellow.bold)
);

// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

const { Server } = require("socket.io");
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://livechat-mern.onrender.com",
  },
});


io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user room " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    // try {
    // console.log(newMessageRecieved)

    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
    // } catch (error) {
    //   console.error("Error handling new message:", error);
    // }
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
    // socket.leave(userData._id);
  });
});
