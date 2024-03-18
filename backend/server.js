const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;

connectDB(); //connection to the mongo

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("api running");
});

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, console.log(`server listening on port: ${port}`.yellow.bold));
