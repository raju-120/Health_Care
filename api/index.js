import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.router.js';
import authRouter from './routes/auth.router.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() =>{
    console.log('Connected to DB.');
}).catch((err) =>{
    console.log(err);
})

//-----------------
const app = express(); 

app.use(express.json());

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

app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});