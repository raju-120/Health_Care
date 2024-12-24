#!/usr/bin/env node
import dotenv from "dotenv";
import connectDB from "./db/dbIndex.js";
import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import Message from "./models/message.model.js";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.router.js";
import dropPostRouter from "./routes/post.routes.js";
import commentsRouter from "./routes/comment.routes.js";
import MessageRouter from "./routes/message.routes.js";
import AdvertiseRouter from "./routes/advertise.route.js";
import Appointments from "./routes/booking.route.js";
import Payment from "./routes/payment.route.js";
import BloodDonner from "./routes/bloodDonner.route.js";
import Medicine from "./routes/medicine.route.js";
import ComplainedBox from "./routes/coomplain.route.js";
import Prescriptions from "./routes/prescription.route.js";
import PatientRegForm from "./routes/patient.route.js";

dotenv.config(); // Default `.env` file at the root

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "*" })); // Use deployed frontend URL in `CLIENT_URL`
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send(`Server is running on port ${process.env.PORT}`);
});
app.use("/api/auth", authRouter);
app.use("/api/posts", dropPostRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/message", MessageRouter);
app.use("/api/add", AdvertiseRouter);
app.use("/api/appointment", Appointments);
app.use("/api/payment", Payment);
app.use("/api/donner", BloodDonner);
app.use("/api/medicine", Medicine);
app.use("/api/prescription", Prescriptions);
app.use("/api/patient", PatientRegForm);
app.use("/api/complainbox", ComplainedBox);

// Database Connection
connectDB()
  .then(() => {
    server.listen(process.env.PORT || 5001, () => {
      console.log(`Server is running on port ${process.env.PORT || 5001}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed!", error);
  });

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
  },
});

const socketIdMap = new Map();

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("joinRoom", ({ userId }) => {
    socketIdMap.set(userId, socket.id);
    socket.join(userId);
  });

  socket.on("offer", ({ offer, to, from }) => {
    io.to(to).emit("offer", { offer, from });
  });

  socket.on("answer", ({ answer, to, from }) => {
    io.to(to).emit("answer", { answer, from });
  });

  socket.on("ice-candidate", ({ candidate, to, from }) => {
    io.to(to).emit("ice-candidate", { candidate, from });
  });

  socket.on("sendMessage", async ({ from, to, message, senderusername, receiverusername, pdfBuffer, pdfContentType }) => {
    try {
      const newMessage = new Message({
        senderId: from,
        receiverId: to,
        message,
        senderusername,
        receiverusername,
        pdfFile:
          pdfBuffer && pdfContentType
            ? {
                data: Buffer.from(pdfBuffer),
                contentType: pdfContentType,
              }
            : null,
      });
      await newMessage.save();

      io.to(to).emit("receiveMessage", newMessage);
      io.to(from).emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error processing PDF:", error.message);
    }
  });


  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    for (let [userId, id] of socketIdMap.entries()) {
      if (id === socket.id) {
        socketIdMap.delete(userId);
        break;
      }
    }
  });
});

export { io, socketIdMap };
