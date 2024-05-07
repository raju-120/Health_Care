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
import authRouter from "./routes/auth.router.js";
/* import userRouter from "./routes/user.routes.js"; */
import dropPostRouter from "./routes/post.routes.js";
import commentsRouter from "./routes/comment.routes.js";

//routes declarations


/* app.use("/api/user",userRouter); */
app.use("/api/auth",authRouter);
app.use("/api/posts", dropPostRouter);
app.use("/api/comments", commentsRouter)
//app.use("/api/advertise",); 




export {app};
