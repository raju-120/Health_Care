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
    console.log('New client connected');
  
    socket.on('sendMessage', async ({ from, to, message }) => {
      const newMessage = new Message({ from, to, message });
      await newMessage.save();
      io.to(to).emit('receiveMessage', newMessage);
      io.to(from).emit('receiveMessage', newMessage);  // Ensure sender also gets the message
    });
  
    socket.on('messageRead', async ({ messageId, username }) => {
      await Message.findByIdAndUpdate(messageId, { $addToSet: { readBy: username } });
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
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