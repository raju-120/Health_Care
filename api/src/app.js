import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


//routes
import userRouter from "./routes/user.routes.js";
import dropPostRouter from "./routes/post.routes.js";

//routes declarations


app.use("/api/user",userRouter);
/* app.use("/api/auth",);
app.use("/api/advertise",); */
app.use("/api/posts", dropPostRouter);











export {app};
