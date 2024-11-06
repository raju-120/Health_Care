/* require('dotenv').config({path: '../../.env'}); */
import dotenv from "dotenv";
import connectDB from "./db/dbIndex.js";
import http from "http"
import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import Message from "./models/message.model.js";
import bodyParser from "body-parser";



//routes
import authRouter from "./routes/auth.router.js";
import dropPostRouter from "./routes/post.routes.js";
import commentsRouter from "./routes/comment.routes.js";
import MessageRouter from "./routes/message.routes.js";
import AdvertiseRouter from "./routes/advertise.route.js";
import Appointments from "./routes/booking.route.js";
import Payment from './routes/payment.route.js';
import BloodDonner from './routes/bloodDonner.route.js';
import Medicine from './routes/medicine.route.js';
import ComplainedBox from './routes/coomplain.route.js';
import Prescriptions from './routes/prescription.route.js';
import PatientRegForm from './routes/patient.route.js';
/* import { handlePDFUpload } from "./middlewares/multer.middleware.js"; */



const app = express();

app.use(cors());
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

const socketIdMap = new Map();

io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // User joins room
    socket.on('joinRoom', ({ userId }) => {
        socketIdMap.set(userId, socket.id);
        socket.join(userId);
    });

    // Handle WebRTC offer
    socket.on('offer', ({ offer, to, from }) => {
        io.to(to).emit('offer', { offer, from });
    });

   // Handle WebRTC offer
socket.on('offer', ({ offer, to, from }) => {
    io.to(to).emit('offer', { offer, from });
});

// Handle WebRTC answer
socket.on('answer', ({ answer, to, from }) => {
    io.to(to).emit('answer', { answer, from });
});

// Handle ICE candidates
socket.on('ice-candidate', ({ candidate, to, from }) => {
    io.to(to).emit('ice-candidate', { candidate, from });
});


    socket.on('sendMessage', async ({ from, to, message, senderusername, receiverusername, pdfBuffer, pdfContentType }) => {
        try {
            const newMessage = new Message({
                senderId: from,
                receiverId: to,
                message,
                senderusername,
                receiverusername,
                pdfFile: pdfBuffer && pdfContentType ? {  // Use 'pdfFile' to match schema
                    data: Buffer.from(pdfBuffer),  // Convert from ArrayBuffer to Buffer
                    contentType: pdfContentType
                } : null,
            });
            await newMessage.save();

            // Emit the message back to both sender and receiver
            io.to(to).emit('receiveMessage', newMessage);
            io.to(from).emit('receiveMessage', newMessage);
        } catch (error) {
            console.error("Error processing PDF:", error.message);
        }
    });

    // user disconnect
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        for (let [userId, id] of socketIdMap.entries()) {
            if (id === socket.id) {
                socketIdMap.delete(userId);
                break;
            }
        }
    });
});



  

  
app.use("/api/auth", authRouter);
app.use("/api/posts", dropPostRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/message", MessageRouter);
app.use("/api/add", AdvertiseRouter);
app.use("/api/appointment",Appointments );
app.use("/api/payment", Payment);
app.use("/api/donner", BloodDonner);

app.use("/api/medicine",Medicine );

app.use("/api/prescription", Prescriptions);

app.use("/api/patient", PatientRegForm);

app.use("/api/complainbox",ComplainedBox );



dotenv.config({
    path: '../../env'
});

/* app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
}); */

connectDB()
.then(() =>{
    server.listen(process.env.PORT || 5001, ()=>{
        console.log(`Server is running on ${process.env.PORT}`)
    });
})
.catch((error) =>{
    console.log('Mongo Db Connection failed!', error);
})




export {io, socketIdMap};