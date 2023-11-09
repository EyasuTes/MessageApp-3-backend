const express = require("express");
const app = express();
const cors = require("cors");

const dotenv = require("dotenv");
const mongodbConnect = require("./config/db.js");
const userRoutes = require("./routes/userRoutes");
const chatsRoutes = require("./routes/chatsRoutes");
const messageRoutes = require("./routes/messageRoutes");
const contactRoutes = require("./routes/contactRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler.js");
const { Socket } = require("socket.io");

dotenv.config();

const corsOptions = {
  origin: "*",
  methods: "*",
  allowedHeaders: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
mongodbConnect();

app.use("/api/user", userRoutes);
app.use("/api/chats", chatsRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/contact", contactRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(3001);
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("join_Room", (room) => {
    socket.join(room);
    console.log("joined room " + room);
  });
  socket.on("message", (message, selected) => {
    console.log(message);
    socket.to(selected._id).emit("receive_message", message);
  });
});
