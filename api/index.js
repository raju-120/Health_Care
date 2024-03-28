import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.router.js';
import advertiseRouter from './routes/advertising.router.js';
//import designationListRouter from './routes/lists.router.js';
import doctorRouter from './routes/doctors.router.js';
import postRouter from "./routes/post.route.js";


dotenv.config();

mongoose.connect(process.env.MONGO).then(() =>{
    console.log('Connected to DB.');
}).catch((err) =>{
    console.log(err);
})

//-----------------
const app = express(); 

app.use(express.json());
//app.use(express.urlencoded({encoded: false}));

app.listen(5000, () =>{
    console.log('Server is running on 5000');
});

app.get('/test', (req, res) =>{
    res.json({
        message: 'Hello World'
    })
});


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter );
app.use("/api/advertise", advertiseRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/post", postRouter);

app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});