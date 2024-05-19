/* require('dotenv').config({path: '../../.env'}); */
import dotenv from "dotenv";
import connectDB from "./db/dbIndex.js";
import http from "http"
import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import Message from "./models/message.model.js";


//routes
import authRouter from "./routes/auth.router.js";
import dropPostRouter from "./routes/post.routes.js";
import commentsRouter from "./routes/comment.routes.js";
import MessageRouter from "./routes/message.routes.js";
import AdvertiseRouter from "./routes/advertise.route.js";



const app = express();

app.use(cors());
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

const socketIdMap = new Map();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_room', ({ senderId, receiverId }) => {
      const room = [senderId, receiverId].sort().join('_');
      socket.join(room);
      socketIdMap.set(senderId, socket.id); // Store the sender's socket ID
      console.log(`User ${senderId} and ${receiverId} joined room: ${room}`);
  });

  socket.on('send_message', ({ senderId, receiverId, message }) => {
      const room = [senderId, receiverId].sort().join('_');
      const newMessage = { senderId, receiverId, message, createdAt: new Date() };
      io.to(room).emit('receive_message', newMessage);
  });

  socket.on('disconnect', () => {
      for (let [userId, socketId] of socketIdMap.entries()) {
          if (socketId === socket.id) {
              socketIdMap.delete(userId);
              break;
          }
      }
      console.log('User disconnected:', socket.id);
  });
});

/* app.use("/api/user",userRouter); */
app.use("/api/auth", authRouter);
app.use("/api/posts", dropPostRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/message", MessageRouter);
app.use("/api/add", AdvertiseRouter);


dotenv.config({
    path: '../../env'
});

/* app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
}); */

connectDB()
.then(() =>{
    server.listen(process.env.PORT || 5000, ()=>{
        console.log(`Server is running on ${process.env.PORT}`)
    });
})
.catch((error) =>{
    console.log('Mongo Db Connection failed!', error);
})




export {io, socketIdMap};